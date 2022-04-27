const express = require('express')
const router = express.Router()
const Message = require('../models/message')
const cors = require('cors')
router.use(cors())

let clients = [];

//get from-to messages
router.get('/all/:from/:to', async (req, res) => {
      const messages = await Message.find(
            {
                  "from": {$in: [req.params.from, req.params.to]},
                  "to": {$in: [req.params.from, req.params.to]},
            }).sort({
                  "messageTime": 1
            })
      
      res.end(JSON.stringify(messages))
})

// send new message
router.post('/', async (req, res) => {
      const messageObject = new Message({
            'from': req.body.from,
            'to': req.body.to,
            'messageText': req.body.messageText
      })

      const newMessage = await messageObject.save()
      sendMessage(newMessage)
      res.status(201).json(newMessage)
})

router.get('/start/:from/:to', (req, res) => {
      const headers = {
            'Content-Type': 'text/event-stream',
            'Connection': 'keep-alive',
            'Cache-Control': 'no-cache'
      };

      res.writeHead(200, headers);
      const newClient = {
            from: req.params.from,
            to: req.params.to,
            res
      }
      clients.push(newClient)

      req.on('close', () => {
            clients = clients.filter(
                  client =>
                  (client.from !== req.params.from) && (client.to !== req.params.to)
            );
      });
})

function sendMessage(newMessage) {
      clients.forEach(
            (c) => {
                  if (c.from === newMessage.from && c.to === newMessage.to) {
                        c.res.write(`data: ${JSON.stringify(newMessage)}\n\n`)
                  } else if (c.to === newMessage.from && c.from === newMessage.to) {
                        c.res.write(`data: ${JSON.stringify(newMessage)}\n\n`)
                  }
            })
}

module.exports = router
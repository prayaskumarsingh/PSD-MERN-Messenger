const mongoose = require('mongoose')

const messageSchema = new mongoose.Schema({
      from: {
            type: String,
            required: true
      },
      to: {
            type: String,
            required: true,
      },
      messageText: {
            type: String,
            required: true
      },
      messageTime: {
            type: Date,
            required: true,
            default: Date.now()
      }
})

module.exports = mongoose.model('Message', messageSchema)
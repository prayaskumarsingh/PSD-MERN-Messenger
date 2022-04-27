import  React, {useState} from 'react'

export default function useMessageTextBox({from, to}) {
  const [msg, setMsg] = useState('')

  const _handleKeyPress = (e) => {
    if (e.key === 'Enter' && msg !== '') {
      const messageData = {
        "from": from,
        "to": to,
        "messageText": msg
      }

      fetch('http://localhost:8888/messages', {
        method: 'POST',
        headers: {'content-type': 'application/json'},
        body: JSON.stringify(messageData)
      })

      setMsg('')
    }
  }

  return (
    <input className="message"
      value={msg}
      type="text" 
      placeholder="Your Message" 
      onKeyPress={_handleKeyPress}
      onChange={(e)=>setMsg(e.target.value)}
    />
  )
}

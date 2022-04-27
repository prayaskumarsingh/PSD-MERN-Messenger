import React, { useState } from 'react'
import Header from './header'
import Status from './status'
import Inbox from './inbox'
import MessageTextBox from './messageTextBox'
import "./template.css"

function App() {
  const [from, setFrom] = useState('')
  const [to, setTo] = useState('')
  const [chatBoolean, setChat] = useState(false)
  const [statusNumber, setStatusNumber] = useState()

  function startChat() {
    if(from !== '' && to !== ''){
      setChat(true)
      setStatusNumber(1)
    }
    else
      setStatusNumber(0)
  }

  if (!chatBoolean){
    return (
      <div className="content">
        <Header />
        <Status statusNumber={statusNumber} />
        <form className="fromto">
          <input className="fromtoInput" value={from} type="text" placeholder="from" onChange={(e)=>setFrom(e.target.value)} />
          <input className="fromtoInput" value={to} type="text" placeholder="to" onChange={(e)=>setTo(e.target.value)} />
          <button className="button" type="button" onClick={startChat} >
            Start
          </button>
        </form>
      </div>
    )

  } else{ 

    return (
      <div className="content">
        <Header />
        <Status statusNumber={1} from={from} to={to} />
        <Inbox from={from} to={to} />
        <MessageTextBox from={from} to={to} />
      </div>
    )
  }
}

export default App

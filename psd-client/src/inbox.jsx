import React, {useState, useEffect} from 'react'
import axios from 'axios'

export default function useInbox({from, to}) {
  const [ messages, setMessages ] = useState([]);
  const [ listening, setListening ] = useState(false);
  
  useEffect( () => {
    if (!listening) {
      const events = new EventSource(`http://localhost:8888/messages/start/${from}/${to}`);

      events.onmessage = (event) => {
        const parsedData = JSON.parse(event.data);
        setMessages((messages) => messages.concat(parsedData));
      };

      setListening(true);
    }
  }, [listening, messages]);

  const handleClick = async() => {
    const data = await axios.get(`http://localhost:8888/messages/all/${from}/${to}`)
    console.log(data.data)
    setMessages(data.data)
  }

  return (
    <>    
      <ul>
      <button className="button" type="button"
      onClick={handleClick}
      >
        Load Previous Messages
      </button>
      {
        messages.map((message, i) =>
          <li key={i}>
            <h5>{message.from === from? "You" : "Them"}</h5>
            <p>{message.messageText}</p>
            <div className="time">{message.messageTime}</div>
          </li>
        )
      }
      </ul>
    </>
  );
}

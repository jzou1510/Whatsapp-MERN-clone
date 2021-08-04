import React, {useEffect, useState} from 'react';
import './App.css';
import Sidebar from './Sidebar';
import Chat from './Chat';
import Pusher from 'pusher-js';
import axios from './axios';

function App() {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    axios.get('/messages/sync')
      .then(response => {
        console.log(response.data);
        setMessages(response.data);
      });
  }, []);
  
  useEffect(() => {
    const pusher = new Pusher('b4e76d9da3808453475b', {
      cluster: 'us2'
    });

    const channel = pusher.subscribe('messages'); //the trigger
    channel.bind('inserted', (newMessage) => {
      setMessages([...messages, newMessage]);
    });

    //cleanup function
    return () => {
      channel.unbind_all();
      channel.unsubscribe();
    };
  }, [messages]); //the [messages] is a dependency

  console.log(messages);

  return (
    <div className="app">
      <div className="app__body">
      <Sidebar />
      <Chat messages={messages}/>
      </div>
    </div>
  );
}

export default App;

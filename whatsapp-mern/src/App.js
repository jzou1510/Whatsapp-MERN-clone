import React, {useEffect} from 'react';
import './App.css';
import Sidebar from './Sidebar';
import Chat from './Chat';
import Pusher from 'pusher-js';

function App() {
  
  useEffect(() => {
    const pusher = new Pusher('b4e76d9da3808453475b', {
      cluster: 'us2'
    });

    const channel = pusher.subscribe('messages'); //the trigger
    channel.bind('inserted', (data) => {
      alert(JSON.stringify(data));
    });
  }, []);


  return (
    <div className="app">
      <div className="app__body">
      <Sidebar />
      <Chat />
      </div>
    </div>
  );
}

export default App;

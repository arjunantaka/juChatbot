import React from 'react';
import ChatBox from '../components/chatBox'; // Sesuaikan path-nya
import '../styles/styles.css';

const App: React.FC = () => {
  return (
    <div>
      <h1>JunetChatBot</h1>
      <ChatBox />
    </div>
  );
};

export default App;
import React, { useState, useEffect } from 'react';
import { sendMessage } from '../api/chatApi';

const ChatBox: React.FC = () => {
  const [messages, setMessages] = useState<{ role: string; content: string }[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false); 
  const [currentResponse, setCurrentResponse] = useState('');

  
  useEffect(() => {
    if (!isLoading && currentResponse) {
      setMessages((prevMessages) => [...prevMessages, { role: 'assistant', content: currentResponse }]);
      setCurrentResponse(''); 
    }
  }, [isLoading, currentResponse]);

  const handleSend = async () => {
    if (input.trim()) {
      setMessages((prevMessages) => [...prevMessages, { role: 'user', content: input }]);
      setIsLoading(true); 
      setCurrentResponse(''); 

      try {
        await sendMessage(input, (chunk) => {
          setCurrentResponse((prev) => prev + chunk); 
        });
      } catch (error) {
        console.error('Error:', error);
        setMessages((prevMessages) => [
          ...prevMessages,
          { role: 'assistant', content: 'Maaf, terjadi kesalahan saat memproses pesan.' },
        ]);
      } finally {
        setIsLoading(false); 
      }

      
      setInput('');
    }
  };

  return (
    <div className="chat-box">
      <div className="messages">
        {messages.map((msg, index) => (
          <div key={index} className={`message ${msg.role}`}>
            {msg.content}
          </div>
        ))}
        {isLoading && (
          <div className="message assistant">
            {currentResponse || 'Loading...'} {/* Tampilkan respons streaming atau "Loading..." */}
          </div>
        )}
      </div>
      <div className="input-container">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ketik pesan..."
          onKeyPress={(e) => e.key === 'Enter' && handleSend()}
          disabled={isLoading}
        />
        <button onClick={handleSend} disabled={isLoading}>
          Kirim
        </button>
      </div>
    </div>
  );
};

export default ChatBox;
import React, { useState, useEffect } from 'react'; // Impor useEffect
import { sendMessage } from '../api/chatApi';

const ChatBox: React.FC = () => {
  const [messages, setMessages] = useState<{ role: string; content: string }[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false); // State untuk loading
  const [currentResponse, setCurrentResponse] = useState(''); // State untuk respons streaming

  // Gunakan useEffect untuk menyimpan respons setelah streaming selesai
  useEffect(() => {
    if (!isLoading && currentResponse) {
      setMessages((prevMessages) => [...prevMessages, { role: 'assistant', content: currentResponse }]);
      setCurrentResponse(''); // Reset respons streaming
    }
  }, [isLoading, currentResponse]);

  const handleSend = async () => {
    if (input.trim()) {
      // Tambahkan pesan pengguna ke daftar pesan
      setMessages((prevMessages) => [...prevMessages, { role: 'user', content: input }]);
      setIsLoading(true); // Set loading ke true
      setCurrentResponse(''); // Reset respons streaming

      try {
        // Kirim pesan ke API dan tangani respons streaming
        await sendMessage(input, (chunk) => {
          setCurrentResponse((prev) => prev + chunk); // Tambahkan chunk ke respons saat ini
        });
      } catch (error) {
        console.error('Error:', error);
        setMessages((prevMessages) => [
          ...prevMessages,
          { role: 'assistant', content: 'Maaf, terjadi kesalahan saat memproses pesan.' },
        ]);
      } finally {
        setIsLoading(false); // Set loading ke false
      }

      // Kosongkan input
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
          disabled={isLoading} // Nonaktifkan input saat loading
        />
        <button onClick={handleSend} disabled={isLoading}>
          Kirim
        </button>
      </div>
    </div>
  );
};

export default ChatBox;
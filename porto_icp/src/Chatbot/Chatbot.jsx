import React, { useState } from 'react';
import { MessageCircle, X, Send } from 'lucide-react';
import './chatbot.css';

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { id: 1, text: "Halo! Ada yang bisa saya bantu?", sender: "bot" }
  ]);
  const [inputMessage, setInputMessage] = useState("");

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  const sendMessage = () => {
    if (inputMessage.trim() === "") return;
    
    const newMessage = {
      id: messages.length + 1,
      text: inputMessage,
      sender: "user"
    };
    
    setMessages([...messages, newMessage]);
    
    // Simulate bot response
    setTimeout(() => {
      const botResponse = {
        id: messages.length + 2,
        text: "Terima kasih atas pesan Anda! Saya akan membantu Anda segera.",
        sender: "bot"
      };
      setMessages(prev => [...prev, botResponse]);
    }, 1000);
    
    setInputMessage("");
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      sendMessage();
    }
  };

  return (
    <div className="chatbot-container">
      {/* Chat Window */}
      <div className={`chat-window ${isOpen ? 'open' : ''}`}>
        <div className="chat-header">
          <div className="header-info">
            <div className="bot-avatar">🤖</div>
            <div>
              <h3>Assistant</h3>
              <span className="status">Online</span>
            </div>
          </div>
          <button className="close-btn" onClick={toggleChat}>
            <X size={20} />
          </button>
        </div>
        
        <div className="chat-messages">
          {messages.map((message) => (
            <div key={message.id} className={`message ${message.sender}`}>
              <div className="message-bubble">
                {message.text}
              </div>
            </div>
          ))}
        </div>
        
        <div className="chat-input">
          <input
            type="text"
            placeholder="Ketik pesan Anda..."
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            className="input-field"
          />
          <button className="send-btn" onClick={sendMessage}>
            <Send size={18} />
          </button>
        </div>
      </div>
      
      {/* Chat Toggle Button */}
      <button className="chat-toggle" onClick={toggleChat}>
        {isOpen ? <X size={24} /> : <MessageCircle size={24} />}
      </button>
    </div>
  );
};

export default ChatBot;
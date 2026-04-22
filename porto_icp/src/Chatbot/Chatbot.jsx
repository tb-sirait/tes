import React, { useState, useEffect, useRef } from "react";
import { X, MessageCircle, Send } from "lucide-react";
import fotoBot from "../assets/foto-bot.png";
import botResponses from "./chatbotResponses.json";

import "./chatbot.css";

// ─── Helper: cari respons yang cocok dari JSON ──────────────────────────────
const findBotResponse = (input) => {
  const lowerInput = input.toLowerCase();

  // Cari rule pertama yang keyword-nya cocok dengan input
  const matched = botResponses.find(
    (rule) =>
      rule.id !== "default" &&
      rule.keywords.some((keyword) => lowerInput.includes(keyword)),
  );

  // Jika tidak ada yang cocok, gunakan respons default
  return matched ?? botResponses.find((rule) => rule.id === "default");
};

// ─── Helper: render teks + link dari rule ──────────────────────────────────
const renderBotMessage = (rule) => {
  if (!rule.links || rule.links.length === 0) {
    return <>{rule.response}</>;
  }

  return (
    <>
      {rule.response}{" "}
      {rule.links.map((link, index) => (
        <React.Fragment key={index}>
          <a
            href={link.url}
            target={link.external ? "_blank" : "_self"}
            rel={link.external ? "noopener noreferrer" : undefined}
            style={{
              color: link.color,
              fontWeight: "bold",
              textDecoration: "underline",
            }}
          >
            {link.label}
          </a>
          {index < rule.links.length - 1 && " atau "}
        </React.Fragment>
      ))}
    </>
  );
};

// ─── Komponen utama ────────────────────────────────────────────────────────
const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Halo! Selamat datang di Website Infoduta. Bersama dengan saya DutaBot disini. Ada yang bisa saya bantu?",
      sender: "bot",
    },
  ]);
  const [inputMessage, setInputMessage] = useState("");

  const messagesEndRef = useRef(null);

  const toggleChat = () => setIsOpen((prev) => !prev);

  const sendMessage = () => {
    if (inputMessage.trim() === "") return;

    const userMessage = {
      id: Date.now(),
      text: inputMessage,
      sender: "user",
    };

    setMessages((prev) => [...prev, userMessage]);

    // Cari & render respons bot
    setTimeout(() => {
      const rule = findBotResponse(inputMessage);
      const botMessage = {
        id: Date.now() + 1,
        text: renderBotMessage(rule),
        sender: "bot",
      };
      setMessages((prev) => [...prev, botMessage]);
    }, 500);

    setInputMessage("");
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") sendMessage();
  };

  // Auto-scroll ke pesan terbaru
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="chatbot-container">
      {/* Chat Window */}
      <div className={`chat-window ${isOpen ? "open" : ""}`}>
        <div className="chat-header">
          <div className="header-info">
            <div className="bot-avatar">
              <img
                src={fotoBot}
                alt="DutaBot"
                style={{
                  width: "100%",
                  height: "100%",
                  borderRadius: "50%",
                  objectFit: "cover",
                }}
              />
            </div>
            <div>
              <h3>DutaBot (Assistant)</h3>
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
              <div className="sender-name">
                {message.sender === "bot" ? "DutaBot" : "Anda"}
              </div>
              <div className="message-bubble">{message.text}</div>
            </div>
          ))}
          <div ref={messagesEndRef} />
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
            <Send className="icon-logo" />
          </button>
        </div>
      </div>

      {/* Toggle Button + Tooltip */}
      <div className={`chat-container ${isOpen ? "open" : ""}`}>
        <div className="chatbox-tooltip">Tanya DutaBot</div>
        <button className="chat-toggle" onClick={toggleChat}>
          {isOpen ? (
            <X className="icon-logo" />
          ) : (
            <MessageCircle className="icon-logo" />
          )}
        </button>
      </div>
    </div>
  );
};

export default ChatBot;

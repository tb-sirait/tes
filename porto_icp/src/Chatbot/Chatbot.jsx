import React, { useState, useEffect, useRef } from "react";
import { X, MessageCircle, Send } from "lucide-react";
import fotoBot from "../assets/foto-bot.png";

import "./chatbot.css";

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

  const messagesEndRef = useRef(null); // ref untuk scroll ke bawah

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  const sendMessage = () => {
    if (inputMessage.trim() === "") return;

    const newMessage = {
      id: messages.length + 1,
      text: inputMessage,
      sender: "user",
    };

    setMessages([...messages, newMessage]);

    // Respon bot
    setTimeout(() => {
      let botText =
        "Terima kasih atas pesan Anda! Saya akan membantu Anda segera.";

      if (
        inputMessage.toLowerCase().includes("tanya") ||
        inputMessage.toLowerCase().includes("diskusi") ||
        inputMessage.toLowerCase().includes("menanyakan")
      ) {
        botText = (
          <>
            Silakan tanyakan barang melalui{" "}
            <a
              href="https://wa.me/6285545031039"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: "#25D366", fontWeight: "bold" }}
            >
              WhatsApp ini
            </a>
          </>
        );
      } else if (inputMessage.toLowerCase().includes("software")) {
        botText = (
          <>
            Kamu bisa cek daftar software di{" "}
            <a
              href="/produk/software"
              style={{ color: "#2575fc", fontWeight: "bold" }}
            >
              halaman Software
            </a>
          </>
        );
      } else if (inputMessage.toLowerCase().includes("hardware")) {
        botText = (
          <>
            Kamu bisa cek daftar hardware di{" "}
            <a
              href="/produk/hardware"
              style={{ color: "#2575fc", fontWeight: "bold" }}
            >
              halaman Hardware
            </a>
          </>
        );
      } else if (inputMessage.toLowerCase().includes("laptop")) {
        botText = (
          <>
            Kamu bisa cek daftar laptop di{" "}
            <a
              href="/produk/laptop"
              style={{ color: "#2575fc", fontWeight: "bold" }}
            >
              halaman Laptop
            </a>
          </>
        );
      } else if (
        inputMessage.toLowerCase().includes("smartphone") ||
        inputMessage.toLowerCase().includes("handphone") ||
        inputMessage.toLowerCase().includes("hp") ||
        inputMessage.toLowerCase().includes("ponsel")
      ) {
        botText = (
          <>
            Kamu bisa cek daftar smartphone di{" "}
            <a
              href="/produk/smartphone"
              style={{ color: "#2575fc", fontWeight: "bold" }}
            >
              halaman Smartphone
            </a>
          </>
        );
      } else if (
        inputMessage.toLowerCase().includes("computer") ||
        inputMessage.toLowerCase().includes("komputer") ||
        inputMessage.toLowerCase().includes("pc")
      ) {
        botText = (
          <>
            Kamu bisa cek daftar computer di{" "}
            <a
              href="/produk/computer"
              style={{ color: "#2575fc", fontWeight: "bold" }}
            >
              halaman Komputer
            </a>
          </>
        );
      } else if (inputMessage.toLowerCase().includes("server")) {
        botText = (
          <>
            Kamu bisa cek daftar server di{" "}
            <a
              href="/produk/server"
              style={{ color: "#2575fc", fontWeight: "bold" }}
            >
              halaman Server
            </a>
          </>
        );
      } else if (
        inputMessage.toLowerCase().includes("sparepart") ||
        inputMessage.toLowerCase().includes("part") ||
        inputMessage.toLowerCase().includes("aksesoris")
      ) {
        botText = (
          <>
            Kamu bisa cek daftar sparepart di{" "}
            <a
              href="/produk/sparepart"
              style={{ color: "#2575fc", fontWeight: "bold" }}
            >
              halaman Sparepart
            </a>
          </>
        );
      } else if (
        inputMessage.toLowerCase().includes("produk") ||
        inputMessage.toLowerCase().includes("barang") ||
        inputMessage.toLowerCase().includes("item") ||
        inputMessage.toLowerCase().includes("perangkat") ||
        inputMessage.toLowerCase().includes("device")
      ) {
        botText = (
          <>
            Kami menyediakan berbagai produk IT, kamu bisa cek di{" "}
            <a href="/produk" style={{ color: "#2575fc", fontWeight: "bold" }}>
              halaman produk
            </a>{" "}
            atau kamu bisa tanyakan barang melalui{" "}
            <a
              href="https://wa.me/6285545031039"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: "#25D366", fontWeight: "bold" }}
            >
              WhatsApp ini
            </a>
          </>
        );
      } else if (inputMessage.toLowerCase().includes("layanan")) {
        botText = (
          <>
            Kami menyediakan berbagai layanan IT, kamu bisa cek di{" "}
            <a href="/layanan" style={{ color: "#2575fc", fontWeight: "bold" }}>
              halaman layanan
            </a>
          </>
        );
      } else if (
        inputMessage.toLowerCase().includes("kontak") ||
        inputMessage.toLowerCase().includes("info") ||
        inputMessage.toLowerCase().includes("telepon") ||
        inputMessage.toLowerCase().includes("email") ||
        inputMessage.toLowerCase().includes("hubungi") ||
        inputMessage.toLowerCase().includes("menghubungi") ||
        inputMessage.toLowerCase().includes("whatsapp") ||
        inputMessage.toLowerCase().includes("chat") ||
        inputMessage.toLowerCase().includes("sales") ||
        inputMessage.toLowerCase().includes("customer service")
      ) {
        botText = (
          <>
            Silahkan akses halaman ini untuk mengetahui kontak-kontak yang kami
            sediakan{" "}
            <a
              href="/telusuri-kami"
              style={{ color: "#2575fc", fontWeight: "bold" }}
            >
              di sini
            </a>
          </>
        );
      } else if (
        inputMessage.toLowerCase().includes("tentang") ||
        inputMessage.toLowerCase().includes("perusahaan") ||
        inputMessage.toLowerCase().includes("info perusahaan") ||
        inputMessage.toLowerCase().includes("profil") ||
        inputMessage.toLowerCase().includes("profile") ||
        inputMessage.toLowerCase().includes("about")
      ) {
        botText = (
          <>
            Kami adalah PT. Infoduta Cipta Persada, sebuah perusahaan yang
            bergerak di bidang penyediaan solusi IT. Untuk informasi lebih
            lengkap, silakan kunjungi{" "}
            <a
              href="/tentang"
              style={{ color: "#2575fc", fontWeight: "bold" }}
            >
              halaman tentang kami
            </a>
          </>
        );
      } else if (
        inputMessage.toLowerCase().includes("karir") ||
        inputMessage.toLowerCase().includes("lowongan") || 
        inputMessage.toLowerCase().includes("pekerjaan") ||
        inputMessage.toLowerCase().includes("rekrutmen") ||
        inputMessage.toLowerCase().includes("recruitment") ||
        inputMessage.toLowerCase().includes("career")
      ) {
        botText = (
          <>
            Kami sering membuka kesempatan berkarir di perusahaan kami. Untuk
            informasi lebih lengkap, silakan kunjungi{" "}
            <a
              href="/karir"
              style={{ color: "#2575fc", fontWeight: "bold" }}
            >
              halaman karir
            </a>
          </>
        );
      }
      
      // Jika botText adalah elemen JSX, render sebagai elemen

      const botResponse = {
        id: messages.length + 2,
        text: botText,
        sender: "bot",
      };

      setMessages((prev) => [...prev, botResponse]);
    }, 500);

    setInputMessage("");
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      sendMessage();
    }
  };

  // Scroll otomatis ke bawah setiap ada pesan baru
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
              <div className="message-bubble">
                {typeof message.text === "string" ? message.text : message.text}
              </div>
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

      {/* Chat Toggle Button + Tooltip */}
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
import React, { useState, useEffect } from 'react';
import { Wrench, Hammer, Mail, Phone, Clock } from 'lucide-react';

const MaintenancePage = () => {
  const [currentTime, setCurrentTime] = useState('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const timeString = now.toLocaleString('id-ID', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
      setCurrentTime(timeString);
    };

    updateTime();
    const interval = setInterval(updateTime, 60000);
    return () => clearInterval(interval);
  }, []);

  const handleWarningSignHover = (e) => {
    e.target.style.transform = 'rotate(45deg) scale(1.1)';
    e.target.style.transition = 'transform 0.3s ease';
  };

  const handleWarningSignLeave = (e) => {
    e.target.style.transform = 'rotate(45deg) scale(1)';
  };

  return (
    <div className="maintenance-page" style={{marginTop: '50px'}}>
      <div className="maintenance-container">
        <div 
          className="warning-sign"
          onMouseEnter={handleWarningSignHover}
          onMouseLeave={handleWarningSignLeave}
        >
          <div className="tools">
            <Hammer className="hammer" size={35} />
            <Wrench className="wrench" size={35} />
          </div>
        </div>
        
        <div className="maintenance-text">UNDER</div>
        <div className="main-title">CONSTRUCTION</div>
        <div className="subtitle">(halaman ini sedang dalam perbaikan)</div>
        
        <div className="loading-bar">
          <div className="loading-progress"></div>
        </div>
        
        <div className="description">
          Kami sedang melakukan pemeliharaan dan perbaikan sistem untuk memberikan pengalaman yang lebih baik. 
          Mohon maaf atas ketidaknyamanan ini dan terima kasih atas kesabaran Anda.
        </div>
        
        <div className="contact-info">
          <h3>
            <Clock size={16} className="inline mr-2" />
            Informasi Kontak
          </h3>
          <p>Jika ada keperluan mendesak, silakan hubungi kami:</p>
          <p>
            <Mail size={14} className="inline mr-2" />
            Email: it-support@infoduta.com
          </p>
          <p>
            <Phone size={14} className="inline mr-2" />
            Telepon: (021) 3983-1939
          </p>
        </div>
        
        <div className="footer">
          <div>2025 © <span className="company-name">ICP | Infoduta Computindo Perkasa</span></div>
          <div className="footer-subtitle">
            Kami akan segera kembali dengan layanan yang lebih baik
          </div>
          {currentTime && (
            <div className="current-time">
              Terakhir diperbarui: {currentTime}
            </div>
          )}
        </div>
      </div>
      
      <style jsx>{`
        .maintenance-page {
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          background: linear-gradient(135deg, #f5f5f5 0%, #e8e8e8 100%);
          min-height: 100vh;
          display: flex;
          justify-content: center;
          align-items: center;
          color: #333;
          margin: 0;
          padding: 20px;
        }

        .maintenance-container {
          text-align: center;
          max-width: 600px;
          padding: 40px 20px;
          background: white;
          border-radius: 20px;
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
          position: relative;
          overflow: hidden;
        }

        .maintenance-container::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 5px;
          background: linear-gradient(90deg, #FFD700, #FFA500);
        }

        .warning-sign {
          width: 120px;
          height: 120px;
          background: linear-gradient(135deg, #FFD700 0%, #FFA500 100%);
          border: 4px solid #333;
          border-radius: 15px;
          margin: 0 auto 30px;
          display: flex;
          justify-content: center;
          align-items: center;
          position: relative;
          transform: rotate(45deg);
          animation: pulse 2s infinite;
          cursor: pointer;
        }

        .warning-sign::before {
          content: '';
          position: absolute;
          inset: 8px;
          border: 2px solid #333;
          border-radius: 8px;
        }

        .tools {
          transform: rotate(-45deg);
          color: #333;
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 5px;
        }

        .maintenance-text {
          font-size: 18px;
          font-weight: bold;
          color: #333;
          margin-bottom: 8px;
          letter-spacing: 1px;
        }

        .main-title {
          font-size: 36px;
          font-weight: bold;
          color: #333;
          margin-bottom: 15px;
          letter-spacing: 2px;
        }

        .subtitle {
          font-size: 16px;
          color: #666;
          margin-bottom: 30px;
          font-style: italic;
        }

        .description {
          font-size: 18px;
          color: #555;
          margin-bottom: 30px;
          line-height: 1.6;
        }

        .loading-bar {
          width: 100%;
          height: 6px;
          background: #f0f0f0;
          border-radius: 3px;
          margin: 30px 0;
          overflow: hidden;
        }

        .loading-progress {
          height: 100%;
          background: linear-gradient(90deg, #FFD700, #FFA500);
          border-radius: 3px;
          animation: loading 3s infinite;
        }

        .contact-info {
          margin-top: 20px;
          padding: 20px;
          background: #f8f9fa;
          border-radius: 10px;
          border-left: 4px solid #FFD700;
          text-align: left;
        }

        .contact-info h3 {
          color: #333;
          margin-bottom: 10px;
          font-size: 16px;
          display: flex;
          align-items: center;
        }

        .contact-info p {
          color: #666;
          font-size: 14px;
          margin: 5px 0;
          display: flex;
          align-items: center;
        }

        .footer {
          font-size: 14px;
          color: #888;
          margin-top: 40px;
          padding-top: 20px;
          border-top: 1px solid #eee;
        }

        .company-name {
          font-weight: bold;
          color: #333;
        }

        .footer-subtitle {
          margin-top: 10px;
          color: #aaa;
          font-size: 12px;
        }

        .current-time {
          margin-top: 15px;
          font-size: 12px;
          color: #999;
          font-style: italic;
        }

        .inline {
          display: inline;
        }

        .mr-2 {
          margin-right: 0.5rem;
        }

        @keyframes pulse {
          0%, 100% { transform: rotate(45deg) scale(1); }
          50% { transform: rotate(45deg) scale(1.05); }
        }

        @keyframes loading {
          0% { width: 0%; }
          50% { width: 70%; }
          100% { width: 100%; }
        }

        @media (max-width: 768px) {
          .maintenance-container {
            margin: 20px;
            padding: 30px 15px;
          }
          
          .main-title {
            font-size: 28px;
          }
          
          .warning-sign {
            width: 100px;
            height: 100px;
          }
        }
      `}</style>
    </div>
  );
};

export default MaintenancePage;
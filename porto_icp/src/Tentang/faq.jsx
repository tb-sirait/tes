import React, { useState } from 'react';

const FAQ = () => {
  const [expandedItems, setExpandedItems] = useState({});

  const contactUsMessage = encodeURIComponent("Selamat pagi Ibu, saya ingin berdiskusi terkait pengadaan alat IT PT Infoduta Computindo Perkasa untuk perusahaan saya. Bisakah kita berdiskusi terlebih dahulu?. Terima kasih!");
  const contactUsPhoneNumber = "628975808407";
  const contactUsLink = `https://wa.me/${contactUsPhoneNumber}?text=${contactUsMessage}`;

  const faqData = [
    {
      id: 1,
      question: "Bagaimana cara mengajukan produk IT untuk keperluan perusahaan saya?",
      answer: (
        <>
          Untuk mengajukan produk IT, Anda dapat menghubungi {' '}
          <a 
            href="https://wa.me/628975808407?text=Halo%20saya%20ingin%20bertanya%20tentang%20produk%20IT" 
            target="_blank" 
            rel="noopener noreferrer"
            style={{ color: '#667eea', textDecoration: 'underline' }}
          >
            Customer Service kami via WhatsApp
          </a>
          , atau dapat menghubungi via email ke tim sales kami. Tim kami akan membantu menganalisis kebutuhan perusahaan Anda dan memberikan rekomendasi solusi IT yang tepat.
        </>
      )
    },
    {
      id: 2,
      question: "Berapa lama waktu yang dibutuhkan untuk pengajuan alat IT di Infoduta?",
      answer: "Waktu proses dari yang anda ajukan bervariasi tergantung kompleksitas keperluan dan skala perusahaan. Untuk sistem sederhana, kami dapat menyiapkan perangkat IT paling singkat 2 hari setelah pengajuan (untuk skala kecil). Kami akan memberikan solusi yang detail setelah analisis kebutuhan."
    },
    {
      id: 3,
      question: "Apa saja produk IT yang tersedia di Infoduta?",
      answer: "Kami menyediakan berbagai produk IT dari brand ternama seperti Dell, Lenovo, Cisco, Microsoft, Asus, Samsung, HP, Apple, WD, dan Infocus. Produk yang kami tawarkan meliputi laptop, PC desktop, printer, UPS, server, software, hardware, dan sparepart."
    },
    {
      id: 4,
      question: "Apakah Infoduta menyediakan layanan purna jual?",
      answer: "Ya, kami menyediakan layanan purna jual untuk memastikan produk yang Anda beli berfungsi dengan baik. Tim support kami siap membantu Anda dengan perawatan, perbaikan, dan dukungan teknis lainnya."
    },
    {
      id: 5,
      question: "Bagaimana cara menghubungi tim support jika ada kendala teknis?",
      answer: (
        <>
          Anda dapat menghubungi tim support kami melalui email di {' '}
          <a 
            href="mailto:service@infoduta.com" 
            target="_blank" 
            rel="noopener noreferrer"
            style={{ color: '#667eea', textDecoration: 'underline' }}
          >
            service@infoduta.com
          </a>
          . Tim kami siap membantu Anda untuk menyelesaikan kendala teknis yang Anda hadapi.
        </>
      )
    },
    {
      id: 6,
      question: "Apakah Infoduta menyediakan layanan Jasa Antar (Delivery) produk?",
      answer: "Ya, kami menyediakan layanan Jasa Antar untuk pengiriman produk IT ke lokasi perusahaan Anda untuk area Jakarta dan Sekitarnya. Kami akan memastikan produk sampai dengan aman dan tepat waktu."
    }
  ];

  const toggleExpand = (id) => {
    setExpandedItems(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const styles = {
    container: {
      maxWidth: '1200px',
      margin: '20px auto',
      fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      padding: '10px',   
    },
    faqContainer: {
      backgroundColor: 'white',
      borderRadius: '12px',
      boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)',
      overflow: 'hidden',
      animation: 'fadeInUp 0.6s ease-out'
    },
    header: {
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      color: 'white',
      padding: '20px 20px',
      textAlign: 'center'
    },
    headerTitle: {
      fontSize: '2.5rem',
      fontWeight: '700',
      marginBottom: '10px',
      margin: 0,
      color: '#ffffff'
    },
    headerSubtitle: {
      fontSize: '1.1rem',
      opacity: 0.9,
      margin: 0
    },
    faqList: {
      borderTop: '1px solid #e9ecef'
    },
    faqItem: {
      borderBottom: '1px solid #e9ecef',
      transition: 'all 0.3s ease'
    },
    faqItemHover: {
      backgroundColor: '#f8f9fa'
    },
    questionButton: {
      width: '100%',
      padding: '25px',
      background: 'none',
      border: 'none',
      textAlign: 'left',
      cursor: 'pointer',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      fontSize: '1.1rem',
      fontWeight: '600',
      color: '#343a40',
      transition: 'all 0.3s ease',
      outline: 'none'
    },
    questionButtonHover: {
      color: '#667eea',
      backgroundColor: '#f8f9fa'
    },
    questionText: {
      flex: 1,
      paddingRight: '15px'
    },
    icon: {
      width: '24px',
      height: '24px',
      transition: 'transform 0.3s ease',
      fill: '#6c757d'
    },
    iconExpanded: {
      transform: 'rotate(180deg)'
    },
    iconHover: {
      fill: '#667eea'
    },
    answer: {
      maxHeight: '0',
      overflow: 'hidden',
      transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
      opacity: 0
    },
    answerExpanded: {
      maxHeight: '500px',
      opacity: 1
    },
    answerContent: {
      padding: '0 25px 25px 25px'
    },
    answerBox: {
      background: 'linear-gradient(135deg, #f8f9ff 0%, #e8f2ff 100%)',
      borderLeft: '4px solid #667eea',
      borderRadius: '8px',
      padding: '20px',
      color: '#495057',
      lineHeight: '1.7'
    },
    footer: {
      backgroundColor: '#f8f9fa',
      padding: '20px',
      textAlign: 'center',
      color: '#6c757d'
    },
    contactLink: {
      color: '#667eea',
      fontWeight: '600',
      textDecoration: 'none',
      cursor: 'pointer',
      transition: 'all 0.3s ease'
    }
  };

  // Add keyframes for animation
  const keyframes = `
    @keyframes fadeInUp {
      from {
        opacity: 0;
        transform: translateY(20px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }
  `;

  return (
    <div>
      <style>{keyframes}</style>
      <div style={styles.container}>
        <div style={styles.faqContainer}>
          <div style={styles.header}>
            <h1 style={styles.headerTitle}>FAQ</h1>
            <p style={styles.headerSubtitle}>(Frequently Asked Questions)</p>
          </div>
          
          <div style={styles.faqList}>
            {faqData.map((item) => {
              const isExpanded = expandedItems[item.id];
              
              return (
                <div 
                  key={item.id} 
                  style={styles.faqItem}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = styles.faqItemHover.backgroundColor;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = 'transparent';
                  }}
                >
                  <button
                    style={styles.questionButton}
                    onClick={() => toggleExpand(item.id)}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.color = styles.questionButtonHover.color;
                      e.currentTarget.style.backgroundColor = styles.questionButtonHover.backgroundColor;
                      const icon = e.currentTarget.querySelector('svg');
                      if (icon) icon.style.fill = styles.iconHover.fill;
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.color = styles.questionButton.color;
                      e.currentTarget.style.backgroundColor = 'transparent';
                      const icon = e.currentTarget.querySelector('svg');
                      if (icon) icon.style.fill = styles.icon.fill;
                    }}
                    onFocus={(e) => {
                      e.currentTarget.style.color = styles.questionButtonHover.color;
                      e.currentTarget.style.backgroundColor = styles.questionButtonHover.backgroundColor;
                    }}
                    onBlur={(e) => {
                      e.currentTarget.style.color = styles.questionButton.color;
                      e.currentTarget.style.backgroundColor = 'transparent';
                    }}
                  >
                    <span style={styles.questionText}>
                      {item.question}
                    </span>
                    <svg 
                      style={{
                        ...styles.icon,
                        ...(isExpanded ? styles.iconExpanded : {})
                      }}
                      viewBox="0 0 24 24"
                    >
                      <path d="M7 10l5 5 5-5z"/>
                    </svg>
                  </button>
                  
                  <div
                    style={{
                      ...styles.answer,
                      ...(isExpanded ? styles.answerExpanded : {})
                    }}
                  >
                    <div style={styles.answerContent}>
                      <div style={styles.answerBox}>
                        {item.answer}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          
          <div style={styles.footer}>
            <p>
              Tidak menemukan jawaban yang Anda cari? bisa diskusikan secara langsung dengan {' '}
              <a 
                href={contactUsLink}
                target="_blank" 
                style={styles.contactLink}
                onMouseEnter={(e) => {
                  e.currentTarget.style.textDecoration = 'underline';
                  e.currentTarget.style.color = '#5a6fd8';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.textDecoration = 'none';
                  e.currentTarget.style.color = styles.contactLink.color;
                }}
              >
                menghubungi Tim Marketing kami
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FAQ;
import React, { useState } from 'react';

const FAQ = () => {
  const [expandedItems, setExpandedItems] = useState({});

  const faqData = [
    {
      id: 1,
      question: "Bagaimana cara mengajukan produk IT untuk keperluan perusahaan saya?",
      answer: "Untuk mengajukan produk IT, Anda dapat menghubungi tim sales kami melalui formulir kontak di website atau langsung menelepon ke nomor customer service. Tim kami akan membantu menganalisis kebutuhan perusahaan Anda dan memberikan rekomendasi solusi IT yang tepat."
    },
    {
      id: 2,
      question: "Apa saja layanan IT yang tersedia untuk perusahaan?",
      answer: "Kami menyediakan berbagai layanan IT seperti konsultasi sistem informasi, pengembangan software custom, implementasi sistem ERP, layanan cloud computing, keamanan siber, maintenance server, dan dukungan teknis 24/7."
    },
    {
      id: 3,
      question: "Berapa lama waktu implementasi sistem IT baru?",
      answer: "Waktu implementasi bervariasi tergantung kompleksitas sistem dan skala perusahaan. Untuk sistem sederhana biasanya 2-4 minggu, sistem menengah 1-3 bulan, dan sistem enterprise bisa 3-6 bulan. Kami akan memberikan timeline yang detail setelah analisis kebutuhan."
    },
    {
      id: 4,
      question: "Apakah tersedia layanan maintenance dan support setelah implementasi?",
      answer: "Ya, kami menyediakan layanan maintenance dan support berkelanjutan dengan berbagai paket sesuai kebutuhan. Termasuk monitoring sistem, update software, backup data, troubleshooting, dan dukungan teknis dengan response time yang terjamin."
    },
    {
      id: 5,
      question: "Bagaimana sistem keamanan data perusahaan dijamin?",
      answer: "Kami menerapkan standar keamanan tingkat enterprise dengan enkripsi end-to-end, firewall berlapis, sistem backup otomatis, monitoring 24/7, dan compliance terhadap standar internasional seperti ISO 27001. Data perusahaan Anda akan terlindungi dengan maksimal."
    },
    {
      id: 6,
      question: "Apakah bisa melakukan kustomisasi sesuai kebutuhan spesifik perusahaan?",
      answer: "Tentu saja. Kami mengkhususkan diri dalam pengembangan solusi IT yang disesuaikan dengan kebutuhan unik setiap perusahaan. Tim developer kami akan bekerja sama dengan Anda untuk memastikan sistem yang dikembangkan sesuai dengan workflow dan requirement bisnis Anda."
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
      padding: '20px',
      minHeight: '100vh'
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
            <p style={styles.headerSubtitle}>Frequently Asked Questions</p>
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
              Tidak menemukan jawaban yang Anda cari? 
              <a 
                href="#" 
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
                {' '}Hubungi tim support kami
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FAQ;
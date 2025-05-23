import React, { useState, useEffect } from 'react';

const COOKIE_NAME = 'cookie_consent';

function CookieConsent() {
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem(COOKIE_NAME);
    if (!consent) {
      setShowBanner(true);
    }
  }, []);

  const acceptCookies = () => {
    localStorage.setItem(COOKIE_NAME, 'accepted');
    setShowBanner(false);
  };

  const declineCookies = () => {
    localStorage.setItem(COOKIE_NAME, 'declined');
    setShowBanner(false);
  };

  if (!showBanner) return null;

  return (
    <div style={styles.banner}>
      <p style={styles.text}>
        This website uses cookies to enhance the user experience. By continuing to browse, you agree to our use of cookies.
      </p>
      <div style={styles.buttons}>
        <button onClick={acceptCookies} style={styles.buttonAccept}>Accept</button>
        <button onClick={declineCookies} style={styles.buttonDecline}>Decline</button>
      </div>
    </div>
  );
}

const styles = {
  banner: {
    position: 'fixed',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#003554',
    color: 'white',
    padding: '1rem',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    zIndex: 1000,
    flexWrap: 'wrap',
  },
  text: {
    margin: 0,
    flex: '1 1 300px',
  },
  buttons: {
    display: 'flex',
    gap: '0.5rem',
  },
  buttonAccept: {
    backgroundColor: '#4CAF50',
    border: 'none',
    color: 'white',
    padding: '0.5rem 1rem',
    cursor: 'pointer',
    borderRadius: '4px',
  },
  buttonDecline: {
    backgroundColor: '#f44336',
    border: 'none',
    color: 'white',
    padding: '0.5rem 1rem',
    cursor: 'pointer',
    borderRadius: '4px',
  },
};

export default CookieConsent;

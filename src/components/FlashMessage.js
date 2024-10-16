// src/components/FlashMessage.js
import React from 'react';
import { useSelector } from 'react-redux';

const FlashMessage = () => {
  const message = useSelector((state) => state.auth.message);

  if (!message) return null;

  return (
    <div style={styles.flashMessage}>
      {message}
    </div>
  );
};

const styles = {
  flashMessage: {
    padding: '10px',
    margin: '0px 0',
    backgroundColor: '#f0ad4e',
    color: '#fff',
    textAlign: 'center',
    borderRadius: '1px',
  }
};

export default FlashMessage;

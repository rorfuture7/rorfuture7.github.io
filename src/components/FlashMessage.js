// src/components/FlashMessage.js
import React from 'react';
import { useSelector } from 'react-redux';
import FlashMessage2 from 'react-flash-message';
import "../FlashMessage.css";

const FlashMessage = () => {
  const message = useSelector((state) => state.auth.message);

  if (!message) return null;
  const uniqueKey = `${message}-${Date.now()}`;

  return (
    <FlashMessage2 key={uniqueKey} duration={2000} persistOnHover={true}>
      <div className='flash-class'>
        {message}
      </div>
    </FlashMessage2>
  );
};

export default FlashMessage;

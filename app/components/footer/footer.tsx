'use client'

import React, { useState } from 'react';
import SubscribePopup from './subscribe-popup';
import ArchivePopup from './archive-popup';

// Footer featuring subscription and archive buttons.
const Footer = (): JSX.Element => {

  const [isSubscribeVisible, setIsSubscribeVisible] = useState(false);
  const [isArchiveVisible, setIsArchiveVisible] = useState(false);

  // Handles button press for respective buttons.
  const handleSubscribe = () => setIsSubscribeVisible(true);
  const handleArchive = () => setIsArchiveVisible(true);

  // Callback function to close the popups.
  const handleClosePopup = () => {
    setIsSubscribeVisible(false);
    setIsArchiveVisible(false);
  }

  return (
    <div>
      {isSubscribeVisible && (
        <SubscribePopup
          onClose={handleClosePopup}
      />)}

      {isArchiveVisible && (
        <ArchivePopup
          onClose={handleClosePopup}
      />)}
      <button onClick={handleSubscribe} > Subscribe </button> | <button onClick={handleArchive}> View Archive </button> 
    </div>
  );
};

export default Footer;
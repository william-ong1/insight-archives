'use client'

import React, { useState } from 'react';
import SubscribePopup from './subscribe-popup';
import ArchivePopup from './archive-popup';

const Footer = (): JSX.Element => {

  const [isSubscribeVisible, setIsSubscribeVisible] = useState(false);
  const [isArchiveVisible, setIsArchiveVisible] = useState(false);

  const handleSubscribe = () => setIsSubscribeVisible(true);

  const handleClosePopup = () => {
    setIsSubscribeVisible(false);
    setIsArchiveVisible(false);
  }

  const handleArchive = () => setIsArchiveVisible(true);

  
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
      <button> Like / Dislike </button> | <button onClick={handleSubscribe} > Subscribe </button> | <button onClick={handleArchive}> View Archive </button>   
    </div>
  );
};

export default Footer;
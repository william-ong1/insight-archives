'use client'

import Image from 'next/image';
import React, { useState } from 'react';
import { Input } from '@nextui-org/react';
import closeIcon from '../../images/close-icon.svg';
import rightArrow from '../../images/right-arrow.svg';
import './popup.css';

interface SubscribePopupProps {
  onClose: () => void;
}

const SubscribePopup: React.FC<SubscribePopupProps> = ({ onClose }): JSX.Element => {

  const [message, setMessage] = useState('');
  const [email, setEmail] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    setMessage("");
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      if (!isInvalid && email.length !== 0) {
        setMessage("Subscribed!");
      }
    }
  };

  const handleButtonPress = (e: React.MouseEvent<HTMLImageElement>) => {
    if (!isInvalid && email.length !== 0) {
      setMessage("Subscribed!");
    }
  };

  const validateEmail = (email: string) => email.match(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+.[A-Z]{2,4}$/i);

  const isInvalid = React.useMemo(() => {
    if (email.length === 0) {
      return false;
    }

    return validateEmail(email) ? false : true;
  }, [email]);

  return (
    <div className="overlay fade-in">
      <div className="popup">
        <Image
        src={closeIcon}
        alt=""
        onClick={onClose}
        className="cursor-pointer absolute top-5 right-5 hover:scale-[1.2]"
        />

        <div className="description"> 
          Enhance your day with a dose of insight. 
        </div>

        <div className="description"> 
          Enter your email below to receive daily quotes delivered straight to your inbox.
        </div>

        <Input
          className="text-left"
          id="input-box"
          size="lg"
          radius="lg"
          type="email"
          placeholder="you@example.com"
          value={email}
          onChange={handleChange}
          onKeyDown={handleKeyPress}
          endContent={
            <Image
              src={rightArrow}
              alt=""
              onClick={handleButtonPress}
              className="cursor-pointer absolute right-3 hover:scale-[1.2]"
            />
          }
          color={isInvalid ? "danger" : "success"}
          isInvalid={isInvalid}
          description={message}
          errorMessage="Please enter a valid email"
        />

        <div id="message"> </div>
      </div>
    </div>
  );
}

export default SubscribePopup;
'use client'

import Image from 'next/image';
import React, { useState } from 'react';
import { Input } from '@nextui-org/react';
import closeIcon from '../../images/close-icon.svg';
import rightArrow from '../../images/right-arrow.svg';

interface SubscribePopupProps {
  onClose: () => void;
}

// Popup for 'Subscribe' button. Allows users to subscribe for quotes to be delivered to their email inboxes.
const SubscribePopup: React.FC<SubscribePopupProps> = ({ onClose }): JSX.Element => {

  const [message, setMessage] = useState('');
  const [email, setEmail] = useState('');

  // Handles input change for the email text box.
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    setMessage("");
  };

  // Handles enter key press to submit email.
  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      if (!isInvalid && email.length !== 0) {
        setMessage("Subscribed!");
      }
    }
  };

  // Handles button press to submit email.
  const handleButtonPress = (e: React.MouseEvent<HTMLImageElement>) => {
    if (!isInvalid && email.length !== 0) {
      setMessage("Subscribed!");
    }
  };

  // Checks whether the email is properly formatted.
  const validateEmail = (email: string) => {
    return email.match(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+.[A-Z]{2,4}$/i);
  };

  // Checks whether the email is valid.
  const isInvalid = React.useMemo(() => {
    if (email.length === 0) {
      return false;
    }

    return validateEmail(email) ? false : true;
  }, [email]);

  return (
    <div className="fixed inset-0 flex justify-center items-center z-50 fade-in">
      <div className="bg-carbon p-20 flex flex-col items-start gap-12 relative rounded-3xl leading-10 popup-size">
        <Image
        src={closeIcon}
        width={40}
        alt=""
        onClick={onClose}
        className="cursor-pointer absolute top-5 right-5 hover:scale-[1.2]"
        />

        <div className="font-libre text-left text-3xl font-thin"> 
          Enhance your days with a spark of insight and reflection.
        </div>

        <div className="font-libre text-left text-3xl font-thin"> 
          Enter your email below to receive the daily quote delivered straight to your inbox.
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
              width={24}
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
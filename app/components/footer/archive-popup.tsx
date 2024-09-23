'use client'

import Image from 'next/image';
import React, { useState } from 'react';
import { Calendar } from "@nextui-org/react";
import { parseDate, today, getLocalTimeZone } from '@internationalized/date';
import closeIcon from '../../images/close-icon.svg';
import './popup.css';

interface ArchivePopupProps {
  onClose: () => void;
}

const ArchivePopup: React.FC<ArchivePopupProps> = ({ onClose }): JSX.Element => {

  return (
    <div className="overlay fade-in">
      <div className="popup">
        <Image
        src={closeIcon}
        alt=""
        onClick={onClose}
        className="cursor-pointer absolute top-5 right-5 hover:scale-[1.2]"
        />

        <Calendar
          classNames={{
            grid: "custom-base-class",
            cell: "custom-cell-class",
            cellButton: "custom-cell-button-class",
          }}
          aria-label="Date"
          color="secondary"
          minValue={parseDate("2024-09-17")}
          defaultValue={today(getLocalTimeZone())}
          maxValue={today(getLocalTimeZone())}
          calendarWidth={300}
          hideDisabledDates
        />
      </div>
    </div>
  );
}

export default ArchivePopup;
'use client'

import Image from 'next/image';
import React, { useState } from 'react';
import { Calendar, CalendarDate, select, user } from "@nextui-org/react";
import { parseDate, today, getLocalTimeZone } from '@internationalized/date';
import { dateToString, getQueryDate } from '@/app/utilities';
import closeIcon from '../../images/close-icon.svg';
import './popup.css';

interface ArchivePopupProps {
  onClose: () => void;
}

const ArchivePopup: React.FC<ArchivePopupProps> = ({ onClose }): JSX.Element => {

  const query_date: string = getQueryDate();

  const [selectedDate, setSelectedDate] = useState<CalendarDate>(parseDate(query_date));

  const handleChange = (value: CalendarDate) => {
    setSelectedDate(value);
  };

  const handleTimeTravel = (e: React.MouseEvent<HTMLButtonElement>) => {
    const selected_date: string = dateToString(selectedDate);
    if (query_date === selected_date) {
      return;
    } else if (selected_date === dateToString(today(getLocalTimeZone()))) {
      window.location.href = '/';
    } else {
      window.location.href = `/?date=${selected_date}`;
    }
  };

  return (
    <div className="overlay fade-in">
      <div className="popup archive-popup">
        <Image
        src={closeIcon}
        alt=""
        onClick={onClose}
        className="cursor-pointer absolute top-5 right-5 hover:scale-[1.2]"
        />

        <Calendar
          className="custom-calendar"
          classNames={{
            content: "calendar-width",
            base: "calendar-width text-black",
            title: "text-3xl",
            headerWrapper: "calendar-width",
            gridWrapper: "calendar-width",
            gridHeader: "p-2",
            gridHeaderCell: "text-3xl px-6",
            cell: "text-3xl p-2",
          }}
          calendarWidth={"20em"}
          aria-label="Date"
          color="secondary"
          value={selectedDate}
          onFocusChange={handleChange}
          minValue={parseDate("2024-09-17")}
          maxValue={today(getLocalTimeZone())}
        />

        <button className="time-travel-button" onClick={handleTimeTravel}> Time Travel </button>
      </div>
    </div>
  );
}

export default ArchivePopup;
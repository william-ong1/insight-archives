'use client'

import Image from 'next/image';
import React, { useState } from 'react';
import { Calendar, CalendarDate } from "@nextui-org/react";
import { parseDate, today, getLocalTimeZone } from '@internationalized/date';
import { dateToString, useQueryDate } from '@/app/utils/utilities';
import closeIcon from '../../images/close-icon.svg';

interface ArchivePopupProps {
  onClose: () => void;
}

// Popup for 'View Archive' button. Allows users to view the quote of a different day.
const ArchivePopup: React.FC<ArchivePopupProps> = ({ onClose }): JSX.Element => {

  const query_date: string = useQueryDate();

  const [selectedDate, setSelectedDate] = useState<CalendarDate>(parseDate(query_date));

  // Handles input change on calendar.
  const handleChange = (value: CalendarDate) => {
    setSelectedDate(value);
  };

  // Handles button press to view the quote of another day.
  const handleTimeTravel = (e: React.MouseEvent<HTMLButtonElement>) => {
    const selected_date: string = dateToString(selectedDate);
    if (query_date === selected_date) {
      return;
    } else if (selected_date === dateToString(today(getLocalTimeZone()))) {
      // Redirects to main page without parameters if desired date is the current day.
      window.location.href = '/';
    } else {
      window.location.href = `/?date=${selected_date}`;
    }
  };

  return (
    <div className="fixed inset-0 flex justify-center items-center z-50 fade-in">
      <div className="bg-carbon p-8 flex flex-col items-center justify-center gap-8 relative rounded-3xl leading-10 popup-size">
      <Image
        src={closeIcon}
        width={40}
        alt=""
        onClick={onClose}
        className="cursor-pointer absolute top-5 right-5 hover:scale-[1.2]"
        />

        <Calendar
          className="custom-calendar"
          classNames={{
            content: "calendar-width  bg-white",
            base: "calendar-width text-black",
            title: "text-2xl",
            prevButton: "text-2xl",
            nextButton: "text-2xl",
            headerWrapper: "calendar-width mt-",
            gridWrapper: "calendar-width",
            gridHeader: "p-1",
            gridHeaderCell: "text-2xl px-5",
            cell: "text-2xl p-1 rounded-xl",
            cellButton: "data-[selected=true]:bg-blue-300 data-[selected=true]:text-blue-800 data-[hover=true]:bg-blue-200 data-[hover=true]:text-blue-600 data-[selected=true]:data-[hover=true]:bg-blue-300 data-[selected=true]:data-[hover=true]:text-blue-800 rounded-xl"

          }}
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
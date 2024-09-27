'use client'

import { CalendarDate } from "@nextui-org/react";
import { useSearchParams } from "next/navigation";
import { today, getLocalTimeZone } from '@internationalized/date';

// Converts a CalendarDate to a date in YYYY-MM-DD format.
export const dateToString = (date: CalendarDate): string => {
  const year = date?.year;
  const month = date?.month.toString().padStart(2, '0');
  const day = date.day.toString().padStart(2, '0');

  return `${year}-${month}-${day}`;
};


// Returns the queried date in YYYY-MM-DD format if applicable.
// Otherwise, returns the current date in YYYY-MM-DD format.
export const useQueryDate = (): string => {
  const searchParams = useSearchParams();
  const date_query = searchParams.get('date');
  if (date_query) {
    return date_query;
  }
  return dateToString(today(getLocalTimeZone()));
};

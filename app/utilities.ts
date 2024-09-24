import { CalendarDate } from "@nextui-org/react";
import { useSearchParams } from "next/navigation";
import { today, getLocalTimeZone } from '@internationalized/date';

// TODO: function comment
export const dateToString = (date: CalendarDate): string => {
  const year = date?.year;
  const month = date?.month.toString().padStart(2, '0');
  const day = date.day.toString().padStart(2, '0');

  return `${year}-${month}-${day}`;
};

// TODO: function comment
export const getQueryDate = (): string => {
  const searchParams = useSearchParams();
  const date_query = searchParams.get('date');
  if (date_query) {
    return date_query;
  }
  return dateToString(today(getLocalTimeZone()));
};

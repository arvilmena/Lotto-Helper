export function convertPcsoDateToYmd(dateString: string): string {
  const [month, day, year] = dateString.split('/').map(Number);
  const formattedDate = new Date(year, month - 1, day);
  const formattedYear = formattedDate.getFullYear();
  const formattedMonth = String(formattedDate.getMonth() + 1).padStart(2, '0');
  const formattedDay = String(formattedDate.getDate()).padStart(2, '0');
  return `${formattedYear}-${formattedMonth}-${formattedDay}`;
}

import { DateTime, Settings } from 'luxon';
Settings.defaultZone = 'Asia/Manila';

export function ymdToDateObjAndString(dateString: string): {
  date: Date;
  string: string;
} {
  const date = DateTime.fromFormat(
    `${dateString} 00:00:00`,
    'yyyy-MM-dd HH:mm:ss',
    {
      zone: 'Asia/Manila',
    },
  )
    .set({ millisecond: 0 })
    .toUTC()
    .toJSDate();
  const string = dateString;
  return {
    date,
    string,
  };
}

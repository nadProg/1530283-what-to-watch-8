import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';

dayjs.extend(duration);

export const formatRuntime = (runtime: number): string => dayjs.duration(runtime, 'minutes').format('H[h] mm[m]');

export const formatDatetime = (date: Date): string => dayjs(date).format('YYYY-MM-DD');

export const formatHumanizedDate = (date: Date): string => dayjs(date).format('MMMM D, YYYY');

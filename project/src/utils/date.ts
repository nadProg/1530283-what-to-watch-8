import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
// import relativeTime from 'dayjs/plugin/relativeTime';

dayjs.extend(duration);

export const formatRuntime = (runtime: number): string => dayjs.duration(runtime, 'minutes').format('H[h] mm[m]');

// export const getFullYear = (date) => dayjs(date).format('YYYY');

// export const getReleaseDate = (date) => dayjs(date).format('DD MMMM YYYY');

// export const getRuntime = (minutesAmount) => dayjs().startOf('day').add(minutesAmount, 'minute').format('H[h] mm[m]');


import { EMAIL_REGEX, EMPTY_SPACE, MIN_PASSWORD_LENGTH } from '../constants';
import { User } from '../types/types';

export const getRandomInteger = (a = 0, b = 1): number => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));

  return Math.floor(lower + Math.random() * (upper - lower + 1));
};

export const shuffle = <T>(items: T[]): T[] => items.slice().sort(() => Math.random() - 0.5);

export const getRandomItemFromArray = <T>(items: T[]): T => {
  const index = getRandomInteger(0, items.length - 1);
  return items[index];
};

export const splitArrayInTwo = <T>(items: T[]): [T[], T[]] => {
  const middleIndex = Math.ceil(items.length / 2);
  return [ items.slice(0, middleIndex), items.slice(middleIndex)];
};

export const isAllCasesChecked = (argument: never): never => {
  throw new Error('Not all cases was checked');
};

export const validateFormData = ({email, password}: User): string => {
  if (!email) {
    return 'E-mail is requred';
  }

  if (!EMAIL_REGEX.test(email.toLowerCase())) {
    return 'E-mail is invalid';
  }

  if (!password) {
    return 'Password is required';
  }

  if (password.length < MIN_PASSWORD_LENGTH) {
    return `Password must have at least ${MIN_PASSWORD_LENGTH} symbols`;
  }

  if (password.includes(EMPTY_SPACE)) {
    return 'Password can not containt empty spaces';
  }

  return '';
};

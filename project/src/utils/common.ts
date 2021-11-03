import { EMAIL_REGEX, EMPTY_SPACE, MIN_PASSWORD_LENGTH, Rating, ReviewContent } from '../constants';

export const splitArrayInTwo = <T>(items: T[]): [T[], T[]] => {
  const middleIndex = Math.ceil(items.length / 2);
  return [ items.slice(0, middleIndex), items.slice(middleIndex)];
};

export const isAllCasesChecked = (argument: never): never => {
  throw new Error('Not all cases was checked');
};

export const getEmailValidityMessage = (email: string): string => {
  if (!email) {
    return 'E-mail is required.';
  }

  if (!EMAIL_REGEX.test(email.toLowerCase())) {
    return 'E-mail is invalid.';
  }

  return '';
};

export const getPasswordValidityMessage = (password: string): string => {
  if (!password) {
    return 'Password is required.';
  }

  if (password.length < MIN_PASSWORD_LENGTH) {
    return `Password must have at least ${MIN_PASSWORD_LENGTH} symbols.`;
  }

  if (password.includes(EMPTY_SPACE)) {
    return 'Password can not containt empty spaces.';
  }

  return '';
};

export const validateReviewRating = (rating: number): boolean => {
  if (rating >= Rating.MinValue && rating <= Rating.MaxValue) {
    return true;
  }

  return false;
};

export const validateReviewContent = (content: string): boolean => {
  if (content.length >= ReviewContent.MinLength && content.length <= ReviewContent.MaxLength) {
    return true;
  }

  return false;
};

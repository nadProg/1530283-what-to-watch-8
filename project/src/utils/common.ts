import { EMAIL_REGEX, EMPTY_SPACE, LATIN_REGEX, MIN_PASSWORD_LENGTH, NUMERIC_REGEX, Rating, ReviewContent } from '../constants';

export const splitArrayInTwo = <T>(items: T[]): [T[], T[]] => {
  const middleIndex = Math.ceil(items.length / 2);
  return [ items.slice(0, middleIndex), items.slice(middleIndex)];
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

  if (!NUMERIC_REGEX.test(password.toLowerCase())) {
    return 'Password must contain at least one number.';
  }

  if (!LATIN_REGEX.test(password.toLowerCase())) {
    return 'Password must contain at least one literal symbol.';
  }

  if (password.includes(EMPTY_SPACE)) {
    return 'Password can not contain empty spaces.';
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

export const asyncDelay = (delay: number): Promise<void> => new Promise<void>((resolve) => setTimeout(() => resolve(), delay));

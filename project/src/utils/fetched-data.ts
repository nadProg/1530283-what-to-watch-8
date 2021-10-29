import { FetchStatus } from '../constants';
import { FetchedData, FetchStatusType } from '../types/types';

export const isFetchIdle = (item: FetchedData | FetchStatusType): boolean => {
  const status = typeof item === 'string' ? item : item.status;
  return status === FetchStatus.Idle;
};

export const isFetchNotReady = (item: FetchedData | FetchStatusType): boolean => {
  const status = typeof item === 'string' ? item : item.status;
  return status === FetchStatus.Idle || status === FetchStatus.Loading;
};

export const isFetchError = (item: FetchedData | FetchStatusType): boolean => {
  const status = typeof item === 'string' ? item : item.status;
  return status === FetchStatus.Failed;
};

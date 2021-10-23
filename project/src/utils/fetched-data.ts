import { FetchStatus } from '../constants';
import { FetchedData } from '../types/types';

export const isFetchIdle = (item: FetchedData): boolean => item.status === FetchStatus.Idle;

export const isFetchNotReady = (item: FetchedData): boolean => item.status === FetchStatus.Idle || item.status === FetchStatus.Loading;

export const isFetchError = (item: FetchedData): boolean => !item.data || item.status === FetchStatus.Failed;

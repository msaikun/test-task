import { Truthy } from './types';

export const truthy = <T>(value: T): value is Truthy<T> => !!value;

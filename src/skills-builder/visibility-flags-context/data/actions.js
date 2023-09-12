import {
  SET_ALL_FLAGS,
  SET_DEFAULT_FLAGS,
} from './constants';

export const setAllFlags = (payload) => ({
  type: SET_ALL_FLAGS,
  payload,
});

export const setDefaultFlags = (payload) => ({
  type: SET_DEFAULT_FLAGS,
  payload,
});

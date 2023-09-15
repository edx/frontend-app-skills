import {
  SET_ALL_FLAGS,
  SET_DEFAULT_FLAGS,
  DEFAULT_VISIBILITY_FLAGS,
} from './constants';

export function visibilityFlagsReducer(state, action) {
  switch (action.type) {
    case SET_ALL_FLAGS:
      return {
        ...action.payload,
      };
    case SET_DEFAULT_FLAGS:
      return {
        ...DEFAULT_VISIBILITY_FLAGS,
      };
    default:
      return state;
  }
}

export default visibilityFlagsReducer;

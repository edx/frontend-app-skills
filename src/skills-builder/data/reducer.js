import {
  SET_GOAL,
  SET_CURRENT_JOB_TITLE,
  ADD_CAREER_INTEREST,
  REMOVE_CAREER_INTEREST,
  ADD_TO_EXPANDED_LIST,
  REMOVE_FROM_EXPANDED_LIST,
  SET_EXPANDED_LIST,
} from './constants';

export function skillsReducer(state, action) {
  switch (action.type) {
    case SET_GOAL:
      return {
        ...state,
        currentGoal: action.payload,
      };
    case SET_CURRENT_JOB_TITLE:
      return {
        ...state,
        currentJobTitle: action.payload,
      };
    case ADD_CAREER_INTEREST:
      return {
        ...state,
        careerInterests: [...state.careerInterests, action.payload],
      };
    case REMOVE_CAREER_INTEREST:
      return {
        ...state,
        careerInterests: state.careerInterests.filter(interest => interest !== action.payload),
      };
    case ADD_TO_EXPANDED_LIST:
      return {
        ...state,
        expandedList: [...state.expandedList, action.payload],
      };
    case REMOVE_FROM_EXPANDED_LIST:
      return {
        ...state,
        expandedList: state.expandedList.filter(item => item !== action.payload),
      };
    case SET_EXPANDED_LIST:
      return {
        ...state,
        expandedList: action.payload,
      };
    default:
      return state;
  }
}

export const skillsInitialState = {
  currentGoal: '',
  currentJobTitle: '',
  careerInterests: [],
  expandedList: [],
};

export default skillsReducer;

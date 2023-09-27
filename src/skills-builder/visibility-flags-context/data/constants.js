// Actions for Visibility Flags Context
export const SET_ALL_FLAGS = 'SET_ALL_FLAGS';
export const SET_DEFAULT_FLAGS = 'SET_DEFAULT_FLAGS';

// visibility flag sets
// Default visibility flags - the version that appears if no special flags are set
export const DEFAULT_VISIBILITY_FLAGS = {
  isInteractiveBoxSet: false,
  showCareerInterestCards: true,
  showGoal: true,
  showCurrentJobTitle: true,
  showCareerInterest: true,
  isProgressive: false,
  allowMultipleCareerInterests: true,
  showSkillsBox: true,
  showSkillsList: true,
  showSmallHeader: true,
  showCategorizinator: false,
  sortSkillsByUniquePostings: false,
  filterSkillsWithResults: false,
  showAllSkills: false,
  isClickableSkills: false,
  isClickableSkillsDevMode: false,
};

// Show a single question, and go right to the recommendations
export const ONE_QUESTION_VISIBILITY_FLAGS = {
  isInteractiveBoxSet: true,
  showCareerInterestCards: false,
  showGoal: false,
  showCurrentJobTitle: false,
  showCareerInterest: true,
  isProgressive: true,
  allowMultipleCareerInterests: false,
  showSkillsBox: true,
  showSkillsList: true,
  showSmallHeader: true,
  showCategorizinator: true,
  sortSkillsByUniquePostings: false,
  filterSkillsWithResults: false,
  showAllSkills: true,
  isClickableSkills: true,
  isClickableSkillsDevMode: false,
};

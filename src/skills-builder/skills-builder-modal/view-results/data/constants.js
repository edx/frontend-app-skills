export const COURSE = 'course';
export const BOOT_CAMP = 'boot_camp';
export const EXECUTIVE_EDUCATION = 'executive_education';
export const DEGREE = '2U_degree';
export const PROGRAM = 'program';

export const COURSE_PARAM = 'course';
export const BOOT_CAMP_PARAM = 'boot_camp';
export const EXECUTIVE_EDUCATION_PARAM = 'executive_education';
export const DEGREE_PARAM = '2U_degrees';
export const PROGRAM_PARAM = 'program';

// This array is used to determine the validity of product types as they are passed through the query string
export const productTypeNames = [
  DEGREE,
  BOOT_CAMP,
  EXECUTIVE_EDUCATION,
  PROGRAM,
  COURSE,
];

export const productTypeParams = {};

productTypeParams[COURSE_PARAM] = COURSE;
productTypeParams[BOOT_CAMP_PARAM] = BOOT_CAMP;
productTypeParams[EXECUTIVE_EDUCATION_PARAM] = EXECUTIVE_EDUCATION;
productTypeParams[DEGREE_PARAM] = DEGREE;
productTypeParams[PROGRAM_PARAM] = PROGRAM;

// visibility flag sets
// Default visibility flags - the version that appears if no special flags are set
export const DEFAULT_VISIBILITY_FLAGS = {
  showMatchesFoundAlert: true,
  isInteractiveBoxSet: false,
  showCareerInterestCards: true,
  showGoal: true,
  showCurrentJobTitle: true,
  showCareerInterest: true,
  isProgressive: false,
};

// Show a single question, and go right to the recommendations
export const ONE_QUESTION_VISIBILITY_FLAGS = {
  showMatchesFoundAlert: false,
  isInteractiveBoxSet: true,
  showCareerInterestCards: false,
  showGoal: false,
  showCurrentJobTitle: false,
  showCareerInterest: true,
  isProgressive: true,
};

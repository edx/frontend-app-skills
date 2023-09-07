import { defineMessages } from '@edx/frontend-platform/i18n';

const messages = defineMessages({
  skillsBuilderDescription: {
    id: 'skills.builder.description',
    defaultMessage: 'Find the right courses and programs that help you reach your goals.',
    description: 'Description of what the Skills Builder seeks to accomplish',
  },
  learningGoalPrompt: {
    id: 'learning.goal.prompt',
    defaultMessage: 'First, tell us what you want to achieve (optional)',
    description: 'Prompts the user to select their current goal.',
  },
  selectLearningGoal: {
    id: 'select.learning.goal',
    defaultMessage: 'Select a goal',
    description: 'Placeholder text for the goal selection component.',
  },
  learningGoalStartCareer: {
    id: 'learning.goal.start_career',
    defaultMessage: 'I want to start my career',
    description: 'Selected by user if their goal is to start their career.',
  },
  learningGoalAdvanceCareer: {
    id: 'learning.goal.advance_career',
    defaultMessage: 'I want to advance my career',
    description: 'Selected by user if their goal is to advance their career.',
  },
  learningGoalChangeCareer: {
    id: 'learning.goal.change_career',
    defaultMessage: 'I want to change careers',
    description: 'Selected by user if their goal is to change careers.',
  },
  learningGoalSomethingNew: {
    id: 'learning.goal.something.new',
    defaultMessage: 'I want to learn something new',
    description: 'Selected by user if their goal is to learn something new.',
  },
  learningGoalSomethingElse: {
    id: 'learning.goal.something.else',
    defaultMessage: 'Something else',
    description: 'Selected by user if their goal is not described by the other choices.',
  },
  jobTitlePrompt: {
    id: 'job.title.prompt',
    defaultMessage: 'Next, search and select your current job title (optional)',
    description: 'Prompts the user to select their current job title or occupation.',
  },
  jobTitleInputPlaceholderText: {
    id: 'job.title.input.placeholder.text',
    defaultMessage: 'Search and select a job title',
    description: 'Placeholder text for the job title input control.',
  },
  careerInterestPrompt: {
    id: 'career.interest.prompt',
    defaultMessage: 'What careers are you interested in?',
    description: 'Prompts the user to select careers they are interested in pursuing.',
  },
  careerInterestPromptProgressive: {
    id: 'career.interest.prompt.progressive',
    defaultMessage: 'Select a job from the categories below to see related skills and courses',
    description: 'Prompts the user to select careers they are interested in pursuing for the "Progressive" view.',
  },
  careerInterestInputPlaceholderText: {
    id: 'career.interest.input.placeholder.text',
    defaultMessage: 'Select up to 3 new job titles',
    description: 'Placeholder text for the career interest input control.',
  },
  singleCareerInterestInputPlaceholderText: {
    id: 'single.career.interest.input.placeholder.text',
    defaultMessage: 'Select a new job title',
    description: 'Placeholder text for the career interest input control for one choice.',
  },
  removeCareerInterestButtonAltText: {
    id: 'career.interest.remove.button.alt.text',
    defaultMessage: 'Remove career interest: ',
  },
});

export default messages;

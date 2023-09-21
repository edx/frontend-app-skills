import { defineMessages } from '@edx/frontend-platform/i18n';

const messages = defineMessages({
  skillsBuilderDescription: {
    id: 'skills.builder.description',
    defaultMessage: 'Find the right courses and programs that help you reach your goals.',
    description: 'Description of what the Skills Builder seeks to accomplish',
  },
  learningGoalPrompt: {
    id: 'learning.goal.prompt',
    defaultMessage: 'What is the next step for you? (optional)',
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
  learningGoalExplore: {
    id: 'learning.goal.explore',
    defaultMessage: 'I want to explore',
    description: 'Selected by user if their goal is to explore.',
  },
  jobTitlePrompt: {
    id: 'job.title.prompt',
    defaultMessage: 'Find the career title that best matches your current role (optional)',
    description: 'Prompts the user to select their current job title or occupation.',
  },
  jobTitleInputPlaceholderText: {
    id: 'job.title.input.placeholder.text',
    defaultMessage: 'Search and select a job title',
    description: 'Placeholder text for the job title input control.',
  },
  careerInterestPrompt: {
    id: 'career.interest.prompt',
    defaultMessage: 'What careers interest you? This will focus our recommendations on relevant skills (required)',
    description: 'Prompts the user to select careers they are interested in pursuing.',
  },
  careerInterestPromptProgressive: {
    id: 'career.interest.prompt.progressive',
    defaultMessage: 'Choose a job from the categories for related skills and course recommendations',
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

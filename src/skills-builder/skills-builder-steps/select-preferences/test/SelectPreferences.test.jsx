import {
  screen, render, cleanup, fireEvent, act,
} from '@testing-library/react';
import { mergeConfig } from '@edx/frontend-platform';
import { sendTrackEvent } from '@edx/frontend-platform/analytics';
import {
  SkillsBuilderWrapperWithContext, dispatchMock, contextValue, messages,
} from '../../../test/setupSkillsBuilder';

jest.mock('@edx/frontend-platform/analytics', () => ({
  sendTrackEvent: jest.fn(),
}));

describe('select-preferences', () => {
  beforeAll(() => {
    mergeConfig({
      ALGOLIA_JOBS_INDEX_NAME: 'test-job-index-name',
    });
  });
  beforeEach(() => cleanup());

  describe('render behavior', () => {
    it('should render the second prompt if a goal is selected', async () => {
      render(
        SkillsBuilderWrapperWithContext(
          {
            ...contextValue,
            state: {
              ...contextValue.state,
              currentGoal: messages.learningGoalStartCareer.defaultMessage,
            },
          },
        ),
      );
      const expectedGoal = {
        payload: messages.learningGoalAdvanceCareer.defaultMessage,
        type: 'SET_GOAL',
      };
      const expectedJobTitle = {
        payload: 'Prospector',
        type: 'SET_CURRENT_JOB_TITLE',
      };

      const goalSelect = screen.getByTestId('goal-select-dropdown');
      fireEvent.change(goalSelect, { target: { value: messages.learningGoalAdvanceCareer.defaultMessage } });

      const jobTitleInput = screen.getByTestId('job-title-select');
      act(async () => {
        fireEvent.change(jobTitleInput, { target: { value: 'Prospector' } });
        fireEvent.click(await screen.findByRole('button', { name: 'Prospector' }));

        expect(screen.getByText(messages.careerInterestPrompt.defaultMessage)).toBeTruthy();
        expect(dispatchMock).toHaveBeenCalledWith(expectedGoal);
        expect(dispatchMock).toHaveBeenCalledWith(expectedJobTitle);
        expect(sendTrackEvent).toHaveBeenCalledWith(
          'edx.skills_builder.goal.select',
          {
            app_name: 'skills_builder',
            category: 'skills_builder',
            learner_data: {
              current_goal: messages.learningGoalAdvanceCareer.defaultMessage,
            },
            variation: 'improved_v1.0',
          },
        );
        expect(sendTrackEvent).toHaveBeenCalledWith(
          'edx.skills_builder.current_job.select',
          {
            app_name: 'skills_builder',
            category: 'skills_builder',
            learner_data: {
              current_job_title: 'Prospector',
            },
            variation: 'improved_v1.0',
          },
        );
      });
    });

    it('should render the third prompt if a current job title is selected', () => {
      render(
        SkillsBuilderWrapperWithContext(
          {
            ...contextValue,
            state: {
              ...contextValue.state,
              currentGoal: messages.learningGoalStartCareer.defaultMessage,
              currentJobTitle: 'Goblin Guide',
            },
          },
        ),
      );
      expect(screen.findByText(messages.careerInterestPrompt.defaultMessage)).toBeTruthy();
    });

    it('should render a <CareerInterestCard> for each career interest', () => {
      render(
        SkillsBuilderWrapperWithContext(
          {
            ...contextValue,
            state: {
              ...contextValue.state,
              currentGoal: messages.learningGoalStartCareer.defaultMessage,
              currentJobTitle: 'Goblin Lackey',
              careerInterests: ['Prospector'],
            },
          },
        ),
      );
      expect(screen.findByText('Prospector')).toBeTruthy();

      act(async () => {
        const careerInterestInput = await screen.findByTestId('career-interest-select');
        fireEvent.change(careerInterestInput, { target: { value: 'Mirror Breaker' } });
        fireEvent.click(await screen.findByRole('button', { name: 'Mirror Breaker' }));

        expect(sendTrackEvent).toHaveBeenCalledWith(
          'edx.skills_builder.career_interest.added',
          {
            app_name: 'skills_builder',
            category: 'skills_builder',
            learner_data: {
              career_interest: 'Mirror Breaker',
            },
            variation: 'improved_v1.0',
          },
        );
        expect(dispatchMock).toHaveBeenCalledWith(
          {
            payload: 'Mirror Breaker',
            type: 'ADD_CAREER_INTEREST',
          },
        );
      });
    });
  });

  describe('controlled behavior', () => {
    it('should remove a <CareerInterestCard> when the corresponding close button is selected', () => {
      render(
        SkillsBuilderWrapperWithContext(
          {
            ...contextValue,
            state: {
              ...contextValue.state,
              currentGoal: messages.learningGoalStartCareer.defaultMessage,
              currentJobTitle: 'Goblin Lackey',
              careerInterests: ['Prospector', 'Mirror Breaker', 'Bombardment'],
            },
          },
        ),
      );

      const expected = {
        payload: 'Prospector',
        type: 'REMOVE_CAREER_INTEREST',
      };

      act(async () => {
        fireEvent.click(await screen.findByLabelText('Remove career interest: Prospector'));
        expect(dispatchMock).toHaveBeenCalledWith(expected);
        expect(sendTrackEvent).toHaveBeenCalledWith(
          'edx.skills_builder.career_interest.removed',
          {
            app_name: 'skills_builder',
            category: 'skills_builder',
            learner_data: {
              career_interest: 'Prospector',
            },
            variation: 'improved_v1.0',
          },
        );
      });
    });
  });
});

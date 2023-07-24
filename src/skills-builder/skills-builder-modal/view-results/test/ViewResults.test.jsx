import {
  screen, render, cleanup, fireEvent, act,
} from '@testing-library/react';
import { mergeConfig } from '@edx/frontend-platform';
import { sendTrackEvent } from '@edx/frontend-platform/analytics';
import messages from '../messages';
import { SkillsBuilderWrapperWithContext, contextValue, dispatchMock } from '../../../test/setupSkillsBuilder';
import { getProductRecommendations } from '../../../utils/search';
import { mockData } from '../../../test/__mocks__/jobSkills.mockData';
import { useProductTypes } from '../data/hooks';

jest.mock('@edx/frontend-platform/analytics', () => ({
  sendTrackEvent: jest.fn(),
}));

jest.mock('../data/hooks', () => ({
  useProductTypes: jest.fn(),
}));

const renderSkillsBuilderWrapper = (
  value = {
    ...contextValue,
    state: {
      ...contextValue.state,
      currentGoal: 'I want to start my career',
      currentJobTitle: 'Goblin Lackey',
      careerInterests: ['Prospector', 'Mirror Breaker', 'Bombardment'],
    },
  },
) => {
  render(SkillsBuilderWrapperWithContext(value));
};

describe('view-results', () => {
  beforeAll(async () => {
    mergeConfig({
      ALGOLIA_JOBS_INDEX_NAME: 'test-job-index-name',
    });
  });

  describe('user interface', () => {
    beforeAll(() => {
      useProductTypes.mockImplementation(() => (['2U_degree', 'boot_camp', 'executive_education', 'program', 'course']));
    });

    beforeEach(async () => {
      cleanup();
      // Render the form filled out
      renderSkillsBuilderWrapper();
      // Click the next button to trigger "fetching" the data
      await act(async () => {
        fireEvent.click(screen.getByRole('button', { name: 'Next Step' }));
      });
    });

    afterEach(() => {
      jest.clearAllMocks();
    });

    it('should render a <JobSillsSelectableBox> for each career interest the learner has submitted', () => {
      expect(screen.getByText('Prospector')).toBeTruthy();
      expect(screen.getByText('Mirror Breaker')).toBeTruthy();

      const chipComponents = document.querySelectorAll('.pgn__chip');
      expect(chipComponents[0].textContent).toEqual('finding shiny things');
      expect(chipComponents[1].textContent).toEqual('mining');
      expect(sendTrackEvent).toHaveBeenCalledWith(
        'edx.skills_builder.recommendation.shown',
        {
          app_name: 'skills_builder',
          category: 'skills_builder',
          page: 'skills_builder',
          selected_recommendations: {
            job_id: 0,
            job_name: 'Prospector',
            product_keys: mockData.productKeys,
          },
          is_default: true,
        },
      );
      // called once when "Next Step" button is clicked and then again for above event
      expect(sendTrackEvent).toHaveBeenCalledTimes(2);
    });

    it('changes the recommendations based on the selected job title', () => {
      fireEvent.click(screen.getByRole('radio', { name: 'Mirror Breaker' }));
      expect(screen.getByText('"Mirror Breaker" courses')).toBeTruthy();
      expect(sendTrackEvent).toHaveBeenCalledWith(
        'edx.skills_builder.recommendation.shown',
        {
          app_name: 'skills_builder',
          category: 'skills_builder',
          page: 'skills_builder',
          selected_recommendations: {
            job_id: 1,
            job_name: 'Mirror Breaker',
            product_keys: mockData.productKeys,
          },
          is_default: false,
        },
      );
    });

    it('sends an event when the "Next Step" button is clicked', () => {
      expect(sendTrackEvent).toHaveBeenCalledWith(
        'edx.skills_builder.next_step',
        {
          app_name: 'skills_builder',
          category: 'skills_builder',
          learner_data: {
            current_goal: 'I want to start my career',
            current_job_title: 'Goblin Lackey',
            career_interests: ['Prospector', 'Mirror Breaker', 'Bombardment'],
          },
        },
      );
    });

    it('fires an event when a product recommendation is clicked', () => {
      fireEvent.click(screen.getAllByText('Mining with the Mons')[0]);
      expect(sendTrackEvent).toHaveBeenCalledWith(
        'edx.skills_builder.recommendation.click',
        {
          app_name: 'skills_builder',
          category: 'skills_builder',
          page: 'skills_builder',
          courserun_key: 'MONS101',
          product_line: '2U_degree',
          selected_recommendations: {
            job_id: 0,
            job_name: 'Prospector',
            product_keys: mockData.productKeys,
          },
        },
      );
    });

    it('renders a list of recommendations for each line of business', () => {
      expect(screen.getByText('"Prospector" degrees')).toBeTruthy();
      expect(screen.getByText('"Prospector" bootcamps')).toBeTruthy();
      expect(screen.getByText('"Prospector" executive education')).toBeTruthy();
      expect(screen.getByText('"Prospector" programs')).toBeTruthy();
      expect(screen.getByText('"Prospector" courses')).toBeTruthy();
    });

    it('provides subtitles for each line of business', () => {
      expect(screen.getByText(messages.productTypeDegreeDescription.defaultMessage)).toBeTruthy();
      expect(screen.getByText(messages.productTypeBootCampDescription.defaultMessage)).toBeTruthy();
      expect(screen.getByText(messages.productTypeExecutiveEducationDescription.defaultMessage)).toBeTruthy();
      expect(screen.getByText(messages.productTypeProgramDescription.defaultMessage)).toBeTruthy();
      expect(screen.getByText(messages.productTypeCourseDescription.defaultMessage)).toBeTruthy();
    });
  });

  describe('show all button', () => {
    it('adds product type to the list of recommendations when a dropdown is expanded', async () => {
      renderSkillsBuilderWrapper();
      await act(async () => {
        fireEvent.click(screen.getByRole('button', { name: 'Next Step' }));
      });
      fireEvent.click(screen.getByTestId('course-expand-button'));
      expect(dispatchMock).toHaveBeenCalledWith({
        payload: 'course',
        type: 'ADD_TO_EXPANDED_LIST',
      });
      expect(sendTrackEvent).toHaveBeenCalledWith('edx.skills_builder.show_all.click', {
        app_name: 'skills_builder',
        category: 'skills_builder',
        page: 'skills_builder',
        product_line: 'course',
        number_recommendations: 2,
      });
      expect(sendTrackEvent).toHaveBeenCalledWith('edx.skills_builder.recommendation.expanded.shown', {
        app_name: 'skills_builder',
        category: 'skills_builder',
        page: 'skills_builder',
        product_line: 'course',
        selected_recommendations: {
          job_id: 0,
          job_name: 'Prospector',
          product_keys: mockData.productKeys,
        },
      });
    });

    it('remove product type from the list of recommendations when a dropdown is minimized', async () => {
      render(SkillsBuilderWrapperWithContext({
        ...contextValue,
        state: {
          ...contextValue.state,
          currentGoal: 'I want to start my career',
          currentJobTitle: 'Goblin Lackey',
          careerInterests: ['Prospector', 'Mirror Breaker', 'Bombardment'],
          expandedList: ['course'],
        },
      }));
      await act(async () => {
        fireEvent.click(screen.getByRole('button', { name: 'Next Step' }));
      });
      expect(screen.queryAllByRole('button', { expanded: true })).toHaveLength(1);
      fireEvent.click(screen.getByTestId('course-expand-button'));
      expect(dispatchMock).toHaveBeenCalledWith({
        payload: 'course',
        type: 'REMOVE_FROM_EXPANDED_LIST',
      });
    });
  });

  describe('Product lines are correctly extracted', () => {
    beforeAll(() => {
      useProductTypes.mockImplementation(() => (['boot_camp', 'executive_education', 'course']));
    });
    it('extracts only the product lines returned from the hook', async () => {
      renderSkillsBuilderWrapper();
      await act(async () => {
        fireEvent.click(screen.getByRole('button', { name: 'Next Step' }));
      });
      expect(screen.getByText('"Prospector" bootcamps')).toBeTruthy();
      expect(screen.getByText('"Prospector" executive education')).toBeTruthy();
      expect(screen.getByText('"Prospector" courses')).toBeTruthy();
      expect(screen.queryByText('"Prospector" programs')).toBeNull();
    });
  });

  describe('fetch recommendations', () => {
    beforeEach(() => {
      cleanup();
      // Render the form filled out
      renderSkillsBuilderWrapper();
    });

    it('renders an alert if an error is thrown while fetching', async () => {
      getProductRecommendations.mockImplementationOnce(() => {
        throw new Error();
      });

      // Click the next button to trigger "fetching" the data
      await act(async () => {
        fireEvent.click(screen.getByRole('button', { name: 'Next Step' }));
      });

      expect(screen.getByText('We were not able to retrieve recommendations at this time. Please try again later.')).toBeTruthy();
    });
  });
});

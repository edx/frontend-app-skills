import { IntlProvider } from '@edx/frontend-platform/i18n';
import React from 'react';
import {
  screen, render, act,
} from '@testing-library/react';
import { SkillsBuilder } from '..';
import { SkillsBuilderProvider } from '../skills-builder-context';
import { useVisibilityFlags } from '../visibility-flags-context/data/hooks';
import { DEFAULT_VISIBILITY_FLAGS } from '../visibility-flags-context/data/constants';
import { messages } from './setupSkillsBuilder';

jest.mock('../visibility-flags-context/data/hooks', () => ({
  useVisibilityFlags: jest.fn(),
}));

jest.mock('@edx/frontend-platform/analytics', () => ({
  sendTrackEvent: jest.fn(),
}));

jest.mock('react-instantsearch', () => ({
  InstantSearch: jest.fn(() => (null)),
}));

jest.mock('algoliasearch', () => ({
  algoliasearch: jest.fn(),
}));

describe('skills-builder', () => {
  beforeAll(() => {
    useVisibilityFlags.mockImplementation(() => (DEFAULT_VISIBILITY_FLAGS));
  });

  afterAll(() => {
    jest.clearAllMocks();
  });

  it('should render a Skills Builder with a prompt for the user', () => {
    act(() => {
      render(
        <IntlProvider locale="en">
          <SkillsBuilderProvider>
            <SkillsBuilder />
          </SkillsBuilderProvider>
        </IntlProvider>,
      );
    });
    expect(screen.getByText(messages.skillsBuilderHeaderTitle.defaultMessage)).toBeTruthy();
    expect(screen.getByText(messages.learningGoalPrompt.defaultMessage)).toBeTruthy();
  });
});

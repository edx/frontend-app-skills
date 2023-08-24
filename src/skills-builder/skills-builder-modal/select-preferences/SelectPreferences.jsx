import React, { useContext, useRef } from 'react';
import {
  Stack,
} from '@edx/paragon';
import { useIntl } from '@edx/frontend-platform/i18n';
import { SkillsBuilderContext } from '../../skills-builder-context';
import { useVisibilityFlags } from '../view-results/data/hooks';
import GoalSelect from './GoalSelect';
import JobTitleSelect from './JobTitleSelect';
import CareerInterestSelect from './CareerInterestSelect';
import messages from './messages';

const SelectPreferences = () => {
  const { formatMessage } = useIntl();
  const { state } = useContext(SkillsBuilderContext);
  const { currentGoal, currentJobTitle } = state;
  const visibilityFlags = useRef(useVisibilityFlags());
  const { showGoal, showCurrentJobTitle, alwaysShowCareerInterest } = visibilityFlags.current;

  return (
    <Stack gap={4}>
      <p className="lead">
        {formatMessage(messages.skillsBuilderDescription)}
      </p>
      <Stack gap={4}>
        { showGoal && (
          <GoalSelect />
        )}

        {currentGoal && showCurrentJobTitle && (
          <JobTitleSelect />
        )}

        {(alwaysShowCareerInterest || (currentGoal && currentJobTitle)) && (
          <CareerInterestSelect />
        )}
      </Stack>
    </Stack>
  );
};

export default SelectPreferences;

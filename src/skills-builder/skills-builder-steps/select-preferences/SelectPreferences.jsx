import React, { useRef } from 'react';
import {
  Stack,
} from '@edx/paragon';
import { useVisibilityFlags } from '../view-results/data/hooks';
import GoalSelect from './GoalSelect';
import JobTitleSelect from './JobTitleSelect';
import CareerInterestSelect from './CareerInterestSelect';
import CareerInterestCategorizinator from './CareerInterestCategorizinator';

const SelectPreferences = () => {
  const visibilityFlags = useRef(useVisibilityFlags());
  const { showGoal, showCurrentJobTitle, showCategorizinator } = visibilityFlags.current;

  return (
    <Stack gap={4}>
      <Stack gap={4}>
        {showGoal && (
          <GoalSelect />
        )}

        {showCurrentJobTitle && (
          <JobTitleSelect />
        )}

        {showCategorizinator ? (
          <CareerInterestCategorizinator />
        ) : (
          <CareerInterestSelect />
        )}
      </Stack>
    </Stack>
  );
};

export default SelectPreferences;

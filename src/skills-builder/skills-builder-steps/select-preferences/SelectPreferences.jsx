import React, { useContext } from 'react';
import {
  Stack,
} from '@edx/paragon';
import { VisibilityFlagsContext } from '../../visibility-flags-context';
import GoalSelect from './GoalSelect';
import JobTitleSelect from './JobTitleSelect';
import CareerInterestSelect from './CareerInterestSelect';
import CareerInterestCategorizinator from './CareerInterestCategorizinator';

const SelectPreferences = () => {
  const { state: visibilityFlagsState } = useContext(VisibilityFlagsContext);
  const { showGoal, showCurrentJobTitle, showCategorizinator } = visibilityFlagsState;

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

import React, { useContext } from 'react';
import {
  Form,
} from '@openedx/paragon';
import { useIntl } from '@edx/frontend-platform/i18n';
import { sendTrackEvent } from '@edx/frontend-platform/analytics';
import { setGoal } from '../../skills-builder-context/data/actions';
import { VisibilityFlagsContext } from '../../visibility-flags-context';
import { SkillsBuilderContext } from '../../skills-builder-context';
import messages from './messages';

const GoalDropdown = () => {
  const { formatMessage } = useIntl();
  const { state, dispatch } = useContext(SkillsBuilderContext);
  const { currentGoal } = state;
  const { state: visibilityFlagsState } = useContext(VisibilityFlagsContext);
  const { isProgressive } = visibilityFlagsState;

  const handleGoalSelect = (e) => {
    const { value } = e.target;
    dispatch(setGoal(value));

    sendTrackEvent(
      'edx.skills_builder.goal.select',
      {
        app_name: 'skills_builder',
        category: 'skills_builder',
        learner_data: {
          current_goal: value,
        },
        variation: isProgressive ? 'glide_path' : 'improved_v1.0',
      },
    );
  };

  return (
    <Form.Group>
      <Form.Label>
        <h4>
          {formatMessage(messages.learningGoalPrompt)}
        </h4>
      </Form.Label>
      <Form.Control
        as="select"
        value={currentGoal}
        onChange={handleGoalSelect}
        data-testid="goal-select-dropdown"
      >
        <option value="" disabled={currentGoal}>{formatMessage(messages.selectLearningGoal)}</option>
        <option>{formatMessage(messages.learningGoalStartCareer)}</option>
        <option>{formatMessage(messages.learningGoalAdvanceCareer)}</option>
        <option>{formatMessage(messages.learningGoalChangeCareer)}</option>
        <option>{formatMessage(messages.learningGoalExplore)}</option>
      </Form.Control>
    </Form.Group>
  );
};

export default GoalDropdown;

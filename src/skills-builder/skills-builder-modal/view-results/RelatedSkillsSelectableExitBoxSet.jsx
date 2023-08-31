import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import {
  SelectableBox, Chip, Stack,
} from '@edx/paragon';
import { CloseSmall } from '@edx/paragon/icons';
import { useIntl } from '@edx/frontend-platform/i18n';
import { sendTrackEvent } from '@edx/frontend-platform/analytics';
import { SkillsBuilderContext } from '../../skills-builder-context';
import { removeCareerInterest } from '../../data/actions';
import messages from './messages';

const RelatedSkillsSelectableExitBoxSet = ({ jobSkillsList, selectedJobTitle, onChange }) => {
  const { formatMessage } = useIntl();
  const { dispatch } = useContext(SkillsBuilderContext);

  const renderTopFiveSkills = (skills) => {
    const topFiveSkills = skills.sort((a, b) => b.significance - a.significance).slice(0, 5);
    return (
      topFiveSkills.map(skill => (
        <Chip key={skill.external_id} className="chip-max-width">
          {skill.name}
        </Chip>
      ))
    );
  };

  const handleRemoveCareerInterest = () => {
    dispatch(removeCareerInterest(interest));

    sendTrackEvent(
      'edx.skills_builder.career_interest.removed',
      {
        app_name: 'skills_builder',
        category: 'skills_builder',
        learner_data: {
          career_interest: interest,
        },
      },
    );
  };

  return (
    <SelectableBox.Set
      name="selected job title"
      type="radio"
      value={selectedJobTitle}
      onChange={onChange}
      columns={3}
      className="overflow-scroll-medium"
    >
      {jobSkillsList.map(job => (
        <div>
          <Chip
            iconAfter={CloseSmall}
            onIconAfterClick={() => console.log('Remove Chip')}
          />
          <SelectableBox
            key={job.id}
            type="radio"
            value={job.name}
            aria-label={job.name}
            inputHidden={false}
          >
            <p>{job.name}</p>
            <Stack gap={2} className="align-items-start">
              <p className="heading-label x-small">{formatMessage(messages.relatedSkillsHeading)}</p>
              {renderTopFiveSkills(job.skills)}
            </Stack>
          </SelectableBox>
        </div>
      ))}
    </SelectableBox.Set>
  );
};

RelatedSkillsSelectableExitBoxSet.propTypes = {
  jobSkillsList: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  selectedJobTitle: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default RelatedSkillsSelectableExitBoxSet;

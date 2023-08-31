import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import {
  SelectableBox, Chip, Stack,
} from '@edx/paragon';
import { useIntl } from '@edx/frontend-platform/i18n';
import { useVisibilityFlags } from './data/hooks';
import messages from './messages';

const RelatedSkillsSelectableBoxSet = ({ jobSkillsList, selectedJobTitle, onChange }) => {
  const { formatMessage } = useIntl();
  const visibilityFlags = useRef(useVisibilityFlags());
  const { allowMultipleCareerInterests } = visibilityFlags.current;

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

  return (
    <SelectableBox.Set
      name="selected job title"
      type={allowMultipleCareerInterests ? 'radio' : null}
      value={selectedJobTitle}
      onChange={onChange}
      columns={3}
      className="overflow-scroll-medium"
    >
      {jobSkillsList.map(job => (
        <SelectableBox
          key={job.id}
          type={allowMultipleCareerInterests ? 'radio' : null}
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
      ))}
    </SelectableBox.Set>
  );
};

RelatedSkillsSelectableBoxSet.propTypes = {
  jobSkillsList: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  selectedJobTitle: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default RelatedSkillsSelectableBoxSet;

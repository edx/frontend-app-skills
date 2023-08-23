import React from 'react';
import PropTypes from 'prop-types';
import {
  CardDeck, SelectableBox, Chip, Stack,
} from '@edx/paragon';
import { useIntl } from '@edx/frontend-platform/i18n';
import messages from './messages';

/*
  A variant on the RelatedSkillsSelectableBoxSet that allows for interactive content.
  Instead of a radio select button in the top, there is a close button.
  Since the contents can be interactive, this form will allow for selecting skills to
  drill down for skill-specific recommendations.

  This component needs to be like a CardDeck, but also behave like a radio group.
*/
const RelatedSkillsSelectableBoxSet = ({ jobSkillsList, selectedJobTitle, onChange }) => {
  const { formatMessage } = useIntl();

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

  const selectableBox = (() => {
    return (
      <CardDeck>
        
      </CardDeck>
    );
  })
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

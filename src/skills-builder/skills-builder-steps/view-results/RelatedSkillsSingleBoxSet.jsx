import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import {
  Chip, Card,
} from '@edx/paragon';
import { useIntl } from '@edx/frontend-platform/i18n';
import { useVisibilityFlags } from './data/hooks';
import messages from './messages';

const RelatedSkillsSingleBoxSet = ({ jobSkillsList }) => {
  const { formatMessage } = useIntl();
  const visibilityFlags = useRef(useVisibilityFlags());
  const { showSkillsBox, showSkillsList } = visibilityFlags.current;
  const job = jobSkillsList[0];
  const { name, skills } = job;

  // just a no-op for now.
  // eslint-disable-next-line no-unused-vars
  const handleSkillClick = (skill) => {
    // console.log(skill.name);
  };

  const renderTopFiveSkills = () => {
    const topFiveSkills = skills.sort((a, b) => b.significance - a.significance).slice(0, 5);
    return (
      topFiveSkills.map(skill => (
        // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions
        <span key={skill.external_id} onClick={() => handleSkillClick(skill)}>
          <Chip
            className="chip-max-width"
          >
            {skill.name}
          </Chip>
        </span>
      ))
    );
  };

  return (
    showSkillsBox
    && (
    <Card className="mt-4.5">
      <Card.Header
        title={name}
      />
      { showSkillsList
        && (
        <Card.Section>
          <p className="heading-label x-small">{formatMessage(messages.relatedSkillsHeading)}</p>
          {renderTopFiveSkills(skills)}
        </Card.Section>
        )}
    </Card>
    )
  );
};

RelatedSkillsSingleBoxSet.propTypes = {
  jobSkillsList: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    skills: PropTypes.arrayOf(PropTypes.shape({})),
  })).isRequired,
};

export default RelatedSkillsSingleBoxSet;

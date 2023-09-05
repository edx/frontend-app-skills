import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import {
  Chip, Card, Container,
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
        <span onClick={() => handleSkillClick(skill)}>
          <Chip
            key={skill.external_id}
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
    <Card>
      <Card.Header
        title={name}
        size="sm"
      />
      { showSkillsList
        && (
        <Card.Section>
          <Container
            gap={2}
            className="align-items-start"
            direction="horizontal"
          >
            <p className="heading-label x-small">{formatMessage(messages.relatedSkillsHeading)}</p>
            {renderTopFiveSkills(skills)}
          </Container>
        </Card.Section>
        )}

    </Card>
    )
  );
};

RelatedSkillsSingleBoxSet.propTypes = {
  jobSkillsList: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    skills: PropTypes.arrayOf({}),
  })).isRequired,
};

export default RelatedSkillsSingleBoxSet;

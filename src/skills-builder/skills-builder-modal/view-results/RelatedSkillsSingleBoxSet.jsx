import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import {
  SelectableBox, Chip, Stack, Card, Container,
} from '@edx/paragon';
import { useIntl } from '@edx/frontend-platform/i18n';
import { useVisibilityFlags } from './data/hooks';
import messages from './messages';

const RelatedSkillsSingleBoxSet = ({ jobSkillsList, selectedJobTitle, onChange }) => {
  const { formatMessage } = useIntl();
  const visibilityFlags = useRef(useVisibilityFlags());
  const { allowMultipleCareerInterests, showSkillsBox, showSkillsList } = visibilityFlags.current;

  // just a no-op for now.
  // eslint-disable-next-line no-unused-vars
  const handleSkillClick = (skill) => {
    // console.log(skill.name);
  };

  const renderTopFiveSkills = (skills) => {
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

  // eslint-disable-next-line no-unused-vars
  const singleJobCard = (() => {
    const job = jobSkillsList[0];

    return (
      showSkillsBox
      && (
      <Card>
        <Card.Header
          title={job.name}
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
              {renderTopFiveSkills(job.skills)}
            </Container>
          </Card.Section>
          )}

      </Card>
      )
    );
  }
  );

  const selectableBoxSet = () => (
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

  return (
    allowMultipleCareerInterests ? selectableBoxSet() : singleJobCard()
  );
};

RelatedSkillsSingleBoxSet.propTypes = {
  jobSkillsList: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  selectedJobTitle: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default RelatedSkillsSingleBoxSet;

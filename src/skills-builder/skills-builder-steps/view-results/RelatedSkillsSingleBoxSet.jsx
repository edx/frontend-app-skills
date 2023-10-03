import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import {
  Chip, Card, Button,
} from '@edx/paragon';
import { useIntl } from '@edx/frontend-platform/i18n';
import { VisibilityFlagsContext } from '../../visibility-flags-context';
import messages from './messages';

const RelatedSkillsSingleBoxSet = ({
  jobSkillsList, handleSelectSkill, matchedSkills, selectedSkill,
}) => {
  const { formatMessage } = useIntl();
  const { state: visibilityFlagsState } = useContext(VisibilityFlagsContext);
  const {
    showSkillsBox,
    showSkillsList,
    sortSkillsByUniquePostings,
    filterSkillsWithResults,
    showAllSkills,
    isClickableSkills,
    isClickableSkillsDevMode,
  } = visibilityFlagsState;

  const { name, skills } = jobSkillsList[0];

  const handleSkillClick = (skill) => {
    // Toggle selection if already selected
    if (skill.name === selectedSkill) {
      handleSelectSkill('');
    } else {
      handleSelectSkill(skill.name);
    }
    // TODO send segment event
  };

  // Display the skills as buttons that will set the display to
  // related products for that skill
  const renderSkillButtons = (displayedSkills) => (
    displayedSkills.map(skill => {
      const text = isClickableSkillsDevMode
        ? `${skill.name} (${skill.significance}) [${skill.unique_postings}]`
        : skill.name;
      return (
        <Button
          onClick={() => handleSkillClick(skill)}
        // Change the appearance of the skillsButton depending on its state.
        // This is not very friendly to screen readers, but it is only for experiments
          variant={skill.name === selectedSkill ? 'primary' : 'light'}
          size="sm"
          className="mb-2 mr-2"
          key={skill.external_id}
        >
          {text}
        </Button>
      );
    })
  );

  // Display the skills as non-interactive chips
  const renderSkillChips = (displayedSkills) => (
    displayedSkills.map(skill => (
      <span key={skill.external_id}>
        <Chip
          className="chip-max-width"
        >
          {skill.name}
        </Chip>
      </span>
    ))
  );

  // Get the intersection of skills associated with the job and the products
  const getFilteredRelatedSkills = (() => {
    // find the intersection of the skills lists. These are job skills with a
    // related product entry
    const filteredSkillNames = skills.filter((skill) => matchedSkills.indexOf(skill.name) !== -1);
    return filteredSkillNames;
  });

  // Get the set of skills to display, depending on the settings
  const getSortedAndFilteredSkills = (() => {
    // use either the cross referenced skills, or all the job skills
    const filteredSkills = filterSkillsWithResults ? getFilteredRelatedSkills() : skills;
    // Sort the skills according to the settings
    let skillsToDisplay = [];
    if (sortSkillsByUniquePostings) {
      skillsToDisplay = filteredSkills.sort((a, b) => b.unique_postings - a.unique_postings);
    } else {
      skillsToDisplay = filteredSkills.sort((a, b) => b.significance - a.significance);
    }
    // Either show 5 skills, or all of them
    if (showAllSkills) {
      return skillsToDisplay;
    }
    return skillsToDisplay.slice(0, 5);
  });

  const renderTopSkills = () => {
    const displayedSkills = getSortedAndFilteredSkills();
    return (
      isClickableSkills ? (
        renderSkillButtons(displayedSkills)
      ) : (
        renderSkillChips(displayedSkills)
      )
    );
  };

  return (
    showSkillsBox
    && (
    <Card>
      <Card.Header
        title={name}
      />
      { showSkillsList
        && (
        <Card.Section>
          <p className="heading-label x-small">{formatMessage(messages.relatedSkillsHeading)}</p>
          {renderTopSkills(skills)}
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
  handleSelectSkill: PropTypes.func.isRequired,
  selectedSkill: PropTypes.string.isRequired,
  matchedSkills: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default RelatedSkillsSingleBoxSet;

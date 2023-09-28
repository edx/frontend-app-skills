import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import {
  Card, CardDeck, Chip, Stack,
} from '@edx/paragon';
import { useIntl } from '@edx/frontend-platform/i18n';
import { sendTrackEvent } from '@edx/frontend-platform/analytics';
import { addCareerInterest } from '../../skills-builder-context/data/actions';
import { VisibilityFlagsContext } from '../../visibility-flags-context';
import { SkillsBuilderContext } from '../../skills-builder-context';
import messages from './messages';

/*
  A variant on the RelatedSkillsSelectableBoxSet that allows for interactive content.
  Instead of a radio select button in the top, there is a close button.
  Since the contents can be interactive, this form will allow for selecting skills to
  drill down for skill-specific recommendations.

  This component needs to be like a CardDeck, but also behave like a radio group.
*/
const RelatedSkillsInteractiveBoxSet = ({
  jobSkillsList, //  selectedJobTitle, onChange, // we will need these
}) => {
  const { formatMessage } = useIntl();
  const { state, dispatch } = useContext(SkillsBuilderContext);
  const { careerInterests } = state;
  const { state: visibilityFlagsState } = useContext(VisibilityFlagsContext);
  const { isProgressive } = visibilityFlagsState;

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

  const handleCareerInterestSelect = (value) => {
    if (!careerInterests.includes(value) && careerInterests.length < 3) {
      dispatch(addCareerInterest(value));

      sendTrackEvent(
        'edx.skills_builder.career_interest.added',
        {
          app_name: 'skills_builder',
          category: 'skills_builder',
          learner_data: {
            career_interest: value,
          },
          variation: isProgressive ? 'glide_path' : 'improved_v1.0',
        },
      );
    }
  };

  // eslint-disable-next-line react/prop-types
  const CardComponent = ({ name, skills }) => (
    <Card
      isClickable
      onClick={handleCareerInterestSelect}
      key={name}
      xs={12}
      sm={4}
      className="mb-4"
    >
      <Card.Header
        title={name}
        size="sm"
      />
      <Card.Section>
        <Stack gap={2} className="align-items-start">
          <p className="heading-label x-small">{formatMessage(messages.relatedSkillsHeading)}</p>
          { renderTopFiveSkills(skills) }
        </Stack>
      </Card.Section>
    </Card>
  );

  const interactiveBox = (() => (
    <CardDeck
      hasInteractiveChildren
      hasEqualColumnHeights
      columnSizes={4}
    >
      {jobSkillsList.map(job => (
        <CardComponent
          name={job.name}
          skills={job.skills}
          key={job.name}
        />
      ))}
    </CardDeck>
  ));

  return (
    interactiveBox()
  );
};

RelatedSkillsInteractiveBoxSet.propTypes = {
  jobSkillsList: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  selectedJobTitle: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default RelatedSkillsInteractiveBoxSet;

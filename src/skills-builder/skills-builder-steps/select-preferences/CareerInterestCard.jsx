import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import {
  IconButton, Icon,
} from '@openedx/paragon';
import { useIntl } from '@edx/frontend-platform/i18n';
import { sendTrackEvent } from '@edx/frontend-platform/analytics';
import { Close } from '@openedx/paragon/icons';
import { VisibilityFlagsContext } from '../../visibility-flags-context';
import { SkillsBuilderContext } from '../../skills-builder-context';
import { removeCareerInterest } from '../../skills-builder-context/data/actions';
import messages from './messages';

const CareerInterestCard = ({ interest }) => {
  const { formatMessage } = useIntl();
  const { dispatch } = useContext(SkillsBuilderContext);
  const { state: visibilityFlagsState } = useContext(VisibilityFlagsContext);
  const { isProgressive } = visibilityFlagsState;

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
        variation: isProgressive ? 'glide_path' : 'improved_v1.0',
      },
    );
  };

  return (
    <div className="d-flex justify-content-between align-items-center pb-2 pr-2 pl-4 rounded shadow-sm">
      <p className="pt-4">
        {interest}
      </p>
      <IconButton
        iconAs={Icon}
        src={Close}
        alt={`${formatMessage(messages.removeCareerInterestButtonAltText)} ${interest}`}
        onClick={handleRemoveCareerInterest}
      />
    </div>
  );
};

CareerInterestCard.propTypes = {
  interest: PropTypes.string.isRequired,
};

export default CareerInterestCard;

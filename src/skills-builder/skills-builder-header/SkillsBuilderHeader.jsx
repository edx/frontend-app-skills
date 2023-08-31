import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import { useIntl } from '@edx/frontend-platform/i18n';
import edXLogo from '../images/edX-logo.svg';
import { useVisibilityFlags } from '../skills-builder-modal/view-results/data/hooks';
import messages from './messages';

const SkillsBuilderHeader = ({ isMedium }) => {
  const { formatMessage } = useIntl();
  const visibilityFlags = useRef(useVisibilityFlags());
  const { alwaysSmallHeader } = visibilityFlags.current;

  if (alwaysSmallHeader || isMedium) {
    return (

      <div className="d-flex bg-primary-500 little-hero">
        <img src={edXLogo} alt="edx-logo" className="mt-2 edx-logo" />
        <div className="ml-3 vertical-line" />
        <div className="d-flex align-items-center w-100 ml-3">
          <h1 className="h2 m-0 text-warning-300">
            {formatMessage(messages.skillsBuilderHeaderTitle)}
          </h1>
        </div>
      </div>

    );
  }
  return (
    <div className="d-flex">
      <img src={edXLogo} alt="edx-logo" className="mt-2 h-50" />
      <div className="ml-5 vertical-line" />
      <div className="w-100 ml-5">
        <h1 className="h1 text-warning-300">
          {formatMessage(messages.skillsBuilderHeaderTitle)}
        </h1>
        <p className="h2 text-white">
          {formatMessage(messages.skillsBuilderHeaderSubheading)}
        </p>
      </div>
    </div>
  );
};

SkillsBuilderHeader.propTypes = {
  isMedium: PropTypes.bool.isRequired,
};

export default SkillsBuilderHeader;

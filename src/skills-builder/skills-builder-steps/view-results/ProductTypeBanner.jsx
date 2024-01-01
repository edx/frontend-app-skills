import React from 'react';
import PropTypes from 'prop-types';
import {
  Button, Icon, Stack, useMediaQuery, breakpoints,
} from '@openedx/paragon';
import { KeyboardArrowDown, KeyboardArrowUp } from '@openedx/paragon/icons';
import { useIntl } from '@edx/frontend-platform/i18n';
import messages from './messages';
import {
  DEGREE,
  BOOT_CAMP,
  EXECUTIVE_EDUCATION,
  PROGRAM,
  COURSE,
} from './data/constants';

const ProductTypeBanner = ({
  productTypeName, jobName, numberResults, handleShowAllButtonClick, isExpanded,
}) => {
  const { formatMessage } = useIntl();
  const isLarge = useMediaQuery({ minWidth: breakpoints.large.minWidth });

  const normalizeProductTitle = () => {
    // construct the title text based on the provided productTypeName
    switch (productTypeName) {
      case COURSE:
        return formatMessage(messages.productTypeCourseText);
      case BOOT_CAMP:
        return formatMessage(messages.productTypeBootCampText);
      case EXECUTIVE_EDUCATION:
        return formatMessage(messages.productTypeExecutiveEducationText);
      case DEGREE:
        return formatMessage(messages.productTypeDegreeText);
      case PROGRAM:
        return formatMessage(messages.productTypeProgramText);
      default:
        return '';
    }
  };

  const normalizeProductDescription = () => {
    switch (productTypeName) {
      case COURSE:
        return formatMessage(messages.productTypeCourseDescription);
      case BOOT_CAMP:
        return formatMessage(messages.productTypeBootCampDescription);
      case EXECUTIVE_EDUCATION:
        return formatMessage(messages.productTypeExecutiveEducationDescription);
      case DEGREE:
        return formatMessage(messages.productTypeDegreeDescription);
      case PROGRAM:
        return formatMessage(messages.productTypeProgramDescription);
      default:
        return '';
    }
  };

  const renderTitle = () => {
    const productTypeHeaderText = normalizeProductTitle(productTypeName);
    return (
      <h3>
        {formatMessage(messages.productRecommendationsHeaderText, {
          productTypeHeaderText,
          jobName,
        })}
      </h3>
    );
  };

  const infoStackProps = {
    // props for the Stack with description, number of results, and "Show all" button
    gap: 2,
    direction: isLarge ? 'horizontal' : 'vertical',
    className: 'justify-content-between align-items-start',
  };

  const showAllButtonProps = {
    variant: 'link',
    className: 'p-0',
    onClick: () => handleShowAllButtonClick(productTypeName, numberResults),
    'aria-expanded': isExpanded ? 'true' : 'false',
    'aria-controls': `card-grid-${productTypeName}`,
    'data-testid': `${productTypeName}-expand-button`,
  };

  return (
    <Stack>
      {renderTitle(productTypeName)}
      <span>
        {normalizeProductDescription(productTypeName)}
      </span>
      <Stack {...infoStackProps}>
        <span>
          {formatMessage(messages.productTypeBannerResults, {
            numberResults,
          })}
        </span>
        <Button {...showAllButtonProps}>
          {isExpanded ? (
            formatMessage(messages.productTypeBannerShowLess, {
              numberResults,
              arrowIcon: <Icon src={KeyboardArrowUp} />,
            })
          ) : (
            formatMessage(messages.productTypeBannerShowAll, {
              numberResults,
              arrowIcon: <Icon src={KeyboardArrowDown} />,
            })
          )}
        </Button>
      </Stack>
    </Stack>
  );
};

ProductTypeBanner.propTypes = {
  productTypeName: PropTypes.string.isRequired,
  jobName: PropTypes.string.isRequired,
  numberResults: PropTypes.number.isRequired,
  handleShowAllButtonClick: PropTypes.func.isRequired,
  isExpanded: PropTypes.bool.isRequired,
};

export default ProductTypeBanner;

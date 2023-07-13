import React from 'react';
import PropTypes from 'prop-types';
import {
  Button, Icon, Stack, useMediaQuery, breakpoints,
} from '@edx/paragon';
import { KeyboardArrowDown, KeyboardArrowUp } from '@edx/paragon/icons';
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
  productTypeName, jobName, numberResults, handleShowAllButtonClick, showAllButtonClickedList,
}) => {
  const { formatMessage } = useIntl();
  const isLarge = useMediaQuery({ minWidth: breakpoints.large.minWidth });

  const normalizeProductTitle = () => {
    switch (productTypeName) {
      case COURSE:
        return 'courses';
      case BOOT_CAMP:
        return 'boot camps';
      case EXECUTIVE_EDUCATION:
        return 'executive education';
      case DEGREE:
        return 'degrees';
      case PROGRAM:
        return 'programs';
      default:
        return '';
    }
  };

  const renderTitle = () => {
    const productTypeText = normalizeProductTitle(productTypeName);
    return (
      <h3>
        {formatMessage(messages.productRecommendationsHeaderText, {
          productTypeText,
          jobName,
        })}
      </h3>
    );
  };

  const infoStackProps = {
    gap: 2,
    direction: isLarge ? 'horizontal' : 'vertical',
    className: 'justify-content-between align-items-start',
  };

  const showAllButtonProps = {
    variant: 'link',
    className: 'p-0',
    onClick: () => handleShowAllButtonClick(productTypeName),
  };

  return (
    <Stack>
      {renderTitle(productTypeName)}
      <Stack {...infoStackProps}>
        <span>
          {formatMessage(messages.productTypeBannerResults, {
            numberResults,
          })}
        </span>
        <Button {...showAllButtonProps}>
          {formatMessage(messages.productTypeBannerShowAll, {
            numberResults,
            arrowDownIcon: showAllButtonClickedList.includes(productTypeName)
              ? (
                <Icon src={KeyboardArrowUp} />
              ) : (
                <Icon src={KeyboardArrowDown} />
              ),
          })}
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
  showAllButtonClickedList: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default ProductTypeBanner;

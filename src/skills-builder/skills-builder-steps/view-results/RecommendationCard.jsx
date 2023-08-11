import React from 'react';
import {
  Card, Chip, Hyperlink,
} from '@edx/paragon';
import PropTypes from 'prop-types';
import cardImageCapFallbackSrc from '../../images/card-imagecap-fallback.png';

const RecommendationCard = ({
  rec, productType, handleCourseCardClick, position,
}) => {
  const {
    card_image_url: cardImageUrl,
    marketing_url: marketingUrl,
    active_run_key: courseKey,
    owners,
    organization_short_code_override: organizationShortCodeOverride,
    organization_logo_override: organizationLogoOverride,
    partner,
    title,
    uuid,
  } = rec;

  const schoolName = organizationShortCodeOverride
  || owners?.[0]?.name
  || partner?.[0];
  const schoolLogoUrl = organizationLogoOverride
  || owners[0].logoImageUrl;

  // If this label changes, make sure to duplicate the change in extractProductKeys.js
  const productLabel = courseKey || `${title} [${uuid}]`;

  return (
    <Card
      as={Hyperlink}
      target="_blank"
      showLaunchIcon={false}
      destination={marketingUrl}
      className="product-card"
      onClick={() => handleCourseCardClick(productLabel, productType, position)}
    >
      <Card.ImageCap
        src={cardImageUrl}
        logoSrc={schoolLogoUrl}
        fallbackSrc={cardImageCapFallbackSrc}
        fallbackLogoSrc={cardImageCapFallbackSrc}
        className="card-image-cap"
      />
      <Card.Header title={title} size="sm" />
      <Card.Section>
        <Chip className="chip-max-width">
          {schoolName}
        </Chip>
      </Card.Section>
    </Card>
  );
};

RecommendationCard.propTypes = {
  rec: PropTypes.shape({
    title: PropTypes.string,
    card_image_url: PropTypes.string,
    marketing_url: PropTypes.string,
    partner: PropTypes.arrayOf(PropTypes.string),
    owners: PropTypes.arrayOf(PropTypes.shape({
      key: PropTypes.string,
      logoImageUrl: PropTypes.string,
      name: PropTypes.string,
    })),
    active_run_key: PropTypes.string,
    organization_short_code_override: PropTypes.string,
    organization_logo_override: PropTypes.string,
    uuid: PropTypes.string.isRequired,
  }).isRequired,
  productType: PropTypes.string.isRequired,
  handleCourseCardClick: PropTypes.func.isRequired,
  position: PropTypes.number.isRequired,
};

export default RecommendationCard;

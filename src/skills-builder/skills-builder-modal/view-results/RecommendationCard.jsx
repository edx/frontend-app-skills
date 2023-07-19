import React from 'react';
import {
  Card, Chip, Hyperlink,
} from '@edx/paragon';
import PropTypes from 'prop-types';
import cardImageCapFallbackSrc from '../../images/card-imagecap-fallback.png';

const RecommendationCard = ({
  rec, productType, handleCourseCardClick, indexInList,
}) => {
  const {
    card_image_url: cardImageUrl,
    marketing_url: marketingUrl,
    active_run_key: courseKey,
    owners,
    partner,
    title,
  } = rec;

  const { logoImageUrl } = owners[0];

  return (
    <Card
      as={Hyperlink}
      target="_blank"
      showLaunchIcon={false}
      destination={marketingUrl}
      className="product-card"
      onClick={() => handleCourseCardClick(courseKey, productType, indexInList)}
    >
      <Card.ImageCap
        src={cardImageUrl}
        logoSrc={logoImageUrl}
        fallbackSrc={cardImageCapFallbackSrc}
        fallbackLogoSrc={cardImageCapFallbackSrc}
      />
      <Card.Header title={title} size="sm" />
      <Card.Section>
        {partner.map((orgName, index) => (
          // eslint-disable-next-line react/no-array-index-key
          <Chip key={index} className="chip-max-width">
            {orgName}
          </Chip>
        ))}
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
    })),
    active_run_key: PropTypes.string.isRequired,
  }).isRequired,
  productType: PropTypes.string.isRequired,
  handleCourseCardClick: PropTypes.func.isRequired,
  indexInList: PropTypes.number,
};

RecommendationCard.defaultProps = {
  indexInList: 0,
};

export default RecommendationCard;

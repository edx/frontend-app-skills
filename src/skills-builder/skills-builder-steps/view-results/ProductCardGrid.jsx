import React from 'react';
import PropTypes from 'prop-types';
import { CardGrid } from '@openedx/paragon';
import RecommendationCard from './RecommendationCard';

const ProductCardGrid = ({
  productTypeName, productTypeRecommendations, handleCourseCardClick, isExpanded,
}) => (
  <CardGrid
    columnSizes={{
      xs: 12,
      md: 6,
      lg: 3,
    }}
    hasEqualColumnHeights={false}
  >
    {isExpanded ? (
      productTypeRecommendations?.map((rec, index) => (
        <RecommendationCard
          key={rec.uuid}
          handleCourseCardClick={handleCourseCardClick}
          rec={rec}
          productType={productTypeName}
          position={index}
        />
      ))
    ) : (
      productTypeRecommendations?.slice(0, 4).map((rec, index) => (
        <RecommendationCard
          key={rec.uuid}
          handleCourseCardClick={handleCourseCardClick}
          rec={rec}
          productType={productTypeName}
          position={index}
        />
      ))
    )}
  </CardGrid>
);

ProductCardGrid.propTypes = {
  productTypeRecommendations: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  productTypeName: PropTypes.string.isRequired,
  handleCourseCardClick: PropTypes.func.isRequired,
  isExpanded: PropTypes.bool.isRequired,
};

export default ProductCardGrid;

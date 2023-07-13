import React from 'react';
import PropTypes from 'prop-types';
import { CardGrid } from '@edx/paragon';
import RecommendationCard from './RecommendationCard';

const ProductCardGrid = ({
  productTypeName, productTypeRecommendations, handleCourseCardClick, showAllButtonClickedList,
}) => (
  <CardGrid
    columnSizes={{
      xs: 12,
      md: 6,
      lg: 3,
    }}
    // TODO: figure out if this is working correctly
    hasEqualColumnHeights
  >
    {showAllButtonClickedList.includes(productTypeName) ? (
      productTypeRecommendations?.map(rec => (
        <RecommendationCard
          key={rec.uuid}
          handleCourseCardClick={handleCourseCardClick}
          rec={rec}
          productType={productTypeName}
        />
      ))
    ) : (
      productTypeRecommendations?.slice(0, 4).map(rec => (
        <RecommendationCard
          key={rec.uuid}
          handleCourseCardClick={handleCourseCardClick}
          rec={rec}
          productType={productTypeName}
        />
      ))
    )}
  </CardGrid>
);

ProductCardGrid.propTypes = {
  productTypeRecommendations: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  productTypeName: PropTypes.string.isRequired,
  handleCourseCardClick: PropTypes.func.isRequired,
  showAllButtonClickedList: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default ProductCardGrid;

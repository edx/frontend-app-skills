import React, { useState } from 'react';
import { Stack } from '@edx/paragon';
import { sendTrackEvent } from '@edx/frontend-platform/analytics';
import ProductCardGrid from './ProductCardGrid';
import ProductTypeBanner from './ProductTypeBanner';
import { extractProductKeys } from '../../utils/extractProductKeys';

const RecommendationStack = ({ selectedRecommendations, productTypeNames }) => {
  const [showAllButtonClickedList, setShowButtonClickedList] = useState([]);
  const { id: jobId, name: jobName, recommendations } = selectedRecommendations;

  const handleCourseCardClick = (courseKey, productTypeName) => {
    sendTrackEvent(
      'edx.skills_builder.recommendation.click',
      {
        app_name: 'skills_builder',
        category: 'skills_builder',
        page: 'skills_builder',
        courserun_key: courseKey,
        product_type: productTypeName,
        selected_recommendations: {
          job_id: jobId,
          job_name: jobName,
          courserun_keys: extractProductKeys(recommendations),
        },
      },
    );
  };

  const handleShowAllButtonClick = (type) => {
    if (showAllButtonClickedList.includes(type)) {
      setShowButtonClickedList(prev => prev.filter(item => item !== type));
      return;
    }
    setShowButtonClickedList(prev => [...prev, type]);
  };

  return (
    productTypeNames.map(productTypeName => {
      const productTypeRecommendations = recommendations[productTypeName];
      const numberResults = productTypeRecommendations?.length;
      const isExpanded = showAllButtonClickedList.includes(productTypeName);

      return (
        <Stack gap={2.5} key={productTypeName}>
          <ProductTypeBanner
            productTypeName={productTypeName}
            jobName={jobName}
            numberResults={numberResults}
            handleShowAllButtonClick={handleShowAllButtonClick}
            isExpanded={isExpanded}
          />
          <ProductCardGrid
            productTypeName={productTypeName}
            productTypeRecommendations={productTypeRecommendations}
            handleCourseCardClick={handleCourseCardClick}
            isExpanded={isExpanded}
          />
        </Stack>
      );
    }));
};

export default RecommendationStack;

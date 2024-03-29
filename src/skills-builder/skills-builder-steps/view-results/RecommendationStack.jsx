import React, { useContext } from 'react';
import { Stack } from '@openedx/paragon';
import { sendTrackEvent } from '@edx/frontend-platform/analytics';
import ProductCardGrid from './ProductCardGrid';
import ProductTypeBanner from './ProductTypeBanner';
import { addToExpandedList, removeFromExpandedList } from '../../skills-builder-context/data/actions';
import { SkillsBuilderContext } from '../../skills-builder-context';
import { VisibilityFlagsContext } from '../../visibility-flags-context';
import { extractProductKeys } from '../../utils/extractProductKeys';

const RecommendationStack = ({ selectedRecommendations, productTypeNames, skillFilter }) => {
  const { state, dispatch } = useContext(SkillsBuilderContext);
  const { expandedList } = state;
  const { state: visibilityFlagsState } = useContext(VisibilityFlagsContext);
  const { isProgressive } = visibilityFlagsState;
  const { id: jobId, name: jobName, recommendations } = selectedRecommendations;

  const handleCourseCardClick = (productLabel, productTypeName, index) => {
    // check to see if the grid of recommendations for this product line has been expanded
    if (expandedList.includes(productTypeName)) {
      // fire expanded click event
      sendTrackEvent(
        'edx.skills_builder.recommendation.expanded.click',
        {
          app_name: 'skills_builder',
          category: 'skills_builder',
          page: 'skills_builder',
          label: productLabel,
          product_line: productTypeName,
          position: index,
          selected_recommendations: {
            job_id: jobId,
            job_name: jobName,
            product_keys: extractProductKeys(recommendations, expandedList),
          },
          variation: isProgressive ? 'glide_path' : 'improved_v1.0',
        },
      );
      return;
    }
    // otherwise, fire normal click event
    sendTrackEvent(
      'edx.skills_builder.recommendation.click',
      {
        app_name: 'skills_builder',
        category: 'skills_builder',
        page: 'skills_builder',
        label: productLabel,
        product_line: productTypeName,
        position: index,
        selected_recommendations: {
          job_id: jobId,
          job_name: jobName,
          product_keys: extractProductKeys(recommendations, expandedList),
        },
        variation: isProgressive ? 'glide_path' : 'improved_v1.0',
      },
    );
  };

  const handleShowAllButtonClick = (type, numberResults) => {
    // check if button is expanded
    if (expandedList.includes(type)) {
      dispatch(removeFromExpandedList(type));
      return;
    }
    // if not, add it to the list of expanded product lines
    dispatch(addToExpandedList(type));
    // fire event for clicking the "Show all" button
    sendTrackEvent('edx.skills_builder.show_all.click', {
      app_name: 'skills_builder',
      category: 'skills_builder',
      page: 'skills_builder',
      product_line: type,
      number_recommendations: numberResults,
      variation: isProgressive ? 'glide_path' : 'improved_v1.0',
    });
    // fire separate event for the recommendations that were shown when expanded
    sendTrackEvent('edx.skills_builder.recommendation.expanded.shown', {
      app_name: 'skills_builder',
      category: 'skills_builder',
      page: 'skills_builder',
      product_line: type,
      selected_recommendations: {
        job_id: jobId,
        job_name: jobName,
        product_keys: extractProductKeys(recommendations, [...expandedList, type]),
      },
      variation: isProgressive ? 'glide_path' : 'improved_v1.0',
    });
  };

  const filterBySkill = (currentRecommendations) => {
    if (skillFilter) {
      const filteredRecommendations = currentRecommendations.filter((recommendation) => {
        const filteredSkills = recommendation.skills.filter((currSkill) => currSkill.skill === skillFilter);
        return filteredSkills.length > 0;
      });
      return filteredRecommendations;
    }
    return currentRecommendations;
  };

  return (
    productTypeNames.map(productTypeName => {
      // the recommendations object has a key for each productTypeName
      const productTypeRecommendations = filterBySkill(recommendations[productTypeName]);
      const numberResults = productTypeRecommendations?.length;
      const isExpanded = expandedList.includes(productTypeName);

      if (numberResults === 0) {
        return null;
      }
      return (
        <Stack gap={2.5} key={productTypeName}>
          <ProductTypeBanner
            productTypeName={productTypeName}
            jobName={skillFilter || jobName}
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

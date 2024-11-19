/*
Algolia utility functions used by the Skills Builder feature.
*/
import { useMemo } from 'react';
import { getConfig } from '@edx/frontend-platform';
import { logError } from '@edx/frontend-platform/logging';

import { algoliasearch } from 'algoliasearch';

/*
 * Utility function to create and return an Algolia client, as well as Index objects for our product and job data.
 *
 * @return {SearchClient} searchClient - An instantiated Algolia client
 * @return {SearchIndex} productSearchIndex - An Algolia index of product data. Used to retrieve product
 *  recommendations for learners
 * @return {SearchIndex} jobSearchIndex - An Algolia index of job taxonomy data. Used to retrieve job metadata that a
 *  learner is interested in.
 */
// eslint-disable-next-line import/prefer-default-export
export const useAlgoliaSearch = () => {
  const config = getConfig();

  const [searchClient] = useMemo(
    () => {
      const client = algoliasearch(
        config.ALGOLIA_APP_ID,
        config.ALGOLIA_SEARCH_API_KEY,
      );
      return [client];
    },
    [
      config.ALGOLIA_APP_ID,
      config.ALGOLIA_SEARCH_API_KEY,
    ],
  );
  return [searchClient];
};

/*
 * Utility function used to format a list of data so it matches syntax Algolia expects.
 *
 * @param {String} facetFilterType - A string declaring the facet filter type to prepend each search item (e.g. `name`)
 * @param {Array[String]} data - An array of job or skills used to query data in Algolia.
 *
 * @return {Array[String]} formattedData - The transformed array of data to search prepended with the facet filter type
 */
export function formatFacetFilterData(facetFilterType, data) {
  const formattedData = [];
  if (data) {
    data.forEach(item => formattedData.push(`${facetFilterType}:${item}`));
  }

  return formattedData;
}

/*
 * Utility function responsible for querying and returning job information based on input received from a learner.
 *
 * @param {SearchClient} searchClient - An instantiated Algolia client
 * @param {Array[String]} jobNames - A list of job names a learner is interested in
 *
 * @return {Array[Object]} results - Job information retrieved from Algolia
 */
export const searchJobs = async (searchClient, jobNames) => {
  const formattedJobNames = formatFacetFilterData('name', jobNames);
  try {
    const { hits } = await searchClient.searchSingleIndex({
      indexName: getConfig().ALGOLIA_JOBS_INDEX_NAME,
      searchParams: {
        facetFilters: [
          formattedJobNames,
        ],
      },
    });
    return hits;
  } catch (error) {
    logError(error);
  }

  return [];
};

/*
 * Utility function responsible for returning recommendations on products based on the skills of a job a learner is
 * interested in.
 *
 * @param {SearchClient} searchClient - An instantiated Algolia client
 * @param {String} productType - The type of product information you are trying to retrieve (e.g. `course` or `program`)
 * @param {Array[String]} skills - An array of skill names related to a job/career a learner expressed interest in
 *
 * @return {Array[Object]} results - Product information retrieved from Algolia
 */
export const getProductRecommendations = async (searchClient, productType, skills) => {
  const formattedSkillNames = formatFacetFilterData('skills.skill', skills);
  try {
    const { hits } = await searchClient.searchSingleIndex({
      indexName: getConfig().ALGOLIA_PRODUCT_INDEX_NAME,
      searchParams: {
        filters: `product: "${productType}" AND language: "English"`,
        facetFilters: [
          formattedSkillNames,
        ],
      },
    });
    return hits;
  } catch (error) {
    logError(error);
  }

  return [];
};

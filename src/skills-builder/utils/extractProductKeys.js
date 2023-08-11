import { productTypeNames } from '../skills-builder-steps/view-results/data/constants';

/**
* Utility function for extracting product keys from a list of recommendations.
* This is used to help minimize the payload that is sent with Segment events.
*
* @param
*   @typedef recommendations - an object with a key for each product line
*   @type {object}
*   @property {array[object]} product_line - each object contains many fields for a given recommendation
* @param
*   @typedef expandedList - used to determine which product_lines have been expanded, defaults to empty
*   @type {array}
*
* @return
*   @typedef productKeys - an object with a key for each product line
*   @type {object}
*   @property {array[object]} product_line - each object contains a title, product label, and its position in the list
*/
export const extractProductKeys = (recommendations, expandedList = []) => (
  Object.fromEntries(
    // first map through each productTypeName
    productTypeNames.map(type => {
      // for each type, determine if it is expanded or not
      const recommendationsRefinedList = expandedList.includes(type)
        // if it is, return all recommendations
        ? recommendations[type]
        // if not, only return the first 4
        : recommendations[type]?.slice(0, 4);
      return [
        type,
        // create an array of objects for each product line
        // each object contains a title, product label, and position - rather than the entire response from Algolia
        recommendationsRefinedList?.map((rec, index) => ({
          title: rec.title,
          // If this label changes, make sure to duplicate the change in RecommendationCard.jsx
          label: rec.active_run_key || `${rec.title} [${rec.uuid}]`,
          position: index,
        })),
      ];
    }),
  ));

export default extractProductKeys;

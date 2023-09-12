import { useLocation } from 'react-router-dom';
import {
  productTypeParams, COURSE,
} from './constants';

const defaultSetting = [COURSE];

/*
 * Hook that calls the useLocation() hook from react-router-dom to have a reference to the query string in the URL.
 * The returned array determines the order in which the recommendations will appear to the user.
 *
 * @return {Array[String]} productTypes - An array of strings that represent each line of business
 */
// eslint-disable-next-line import/prefer-default-export
export const useProductTypes = () => {
  const { search } = useLocation();
  const checkedTypes = [];
  const searchParams = new URLSearchParams(search);
  const productTypes = searchParams.get('product_types');

  if (productTypes) {
    const productTypesArray = productTypes.split(',');
    // compare each product type from the query string with a list of accepted product types
    productTypesArray.forEach(productParam => {
      if (productParam in productTypeParams) {
        checkedTypes.push(productTypeParams[productParam]);
      }
    });
  }
  // if no types were set, use default setting
  return checkedTypes.length > 0 ? checkedTypes : defaultSetting;
};

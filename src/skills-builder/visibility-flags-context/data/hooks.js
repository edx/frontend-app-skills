import { useLocation } from 'react-router-dom';
import { DEFAULT_VISIBILITY_FLAGS, ONE_QUESTION_VISIBILITY_FLAGS } from './constants';
/*
  Fetch any params indicating changes to the way the UI behaves.
  All of these checks should be consolidated into something that sets the state.
*/
// eslint-disable-next-line import/prefer-default-export
export const useVisibilityFlags = () => {
  const { search } = useLocation();
  const searchParams = new URLSearchParams(search);
  const visibilityFlag = searchParams.get('viz');
  const productTool = searchParams.get('product_tool');

  const featureFlags = DEFAULT_VISIBILITY_FLAGS;

  // Object.assign() will spread the values from the second argument into the featureFlags object
  if (productTool === 'on') {
    Object.assign(featureFlags, { showProductTool: true });
  }
  if (visibilityFlag === '1q') {
    Object.assign(featureFlags, ONE_QUESTION_VISIBILITY_FLAGS);
  }

  return featureFlags;
};

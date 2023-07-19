import { productTypeNames } from '../skills-builder-modal/view-results/data/constants';

export const extractProductKeys = (recommendations) => (
  Object.fromEntries(
    productTypeNames.map(type => (
      [
        type,
        recommendations[type]?.map(rec => ({
          title: rec.title,
          courserun_key: rec.active_run_key,
        })),
      ]
    )),
  )
);

export default extractProductKeys;

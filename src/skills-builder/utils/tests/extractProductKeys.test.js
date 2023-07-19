import { extractProductKeys } from '../extractProductKeys';
import { mockData } from '../../test/__mocks__/jobSkills.mockData';
import { productTypeNames } from '../../skills-builder-modal/view-results/data/constants';

// Create mock recommendations object with product types as keys and the recommendations as values
const mockRecommendations = Object.fromEntries(
  productTypeNames.map(type => (
    [
      type,
      mockData.productRecommendations,
    ]
  )),
);

// When the values are extracted, each course should only have two values: title and courserun_key
const expectedCourseData = [
  {
    title: 'Mining with the Mons',
    courserun_key: 'MONS101',
  },
  {
    title: 'The Art of Warren Upkeep',
    courserun_key: 'WAR101',
  },
];

// Create an object with product types as keys and filtered recommendations as the values
const expected = Object.fromEntries(
  productTypeNames.map(type => (
    [
      type,
      expectedCourseData,
    ]
  )),
);

describe('extractProductKeys utility', () => {
  it('extracts the title and active_run_key', () => {
    const results = extractProductKeys(mockRecommendations);

    expect(results).toEqual(expected);
  });
});

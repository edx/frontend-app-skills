import { extractProductKeys } from '../extractProductKeys';
import { mockData } from '../../test/__mocks__/jobSkills.mockData';
import { productTypeNames } from '../../skills-builder-steps/view-results/data/constants';

// Create mock recommendations object with product types as keys and the recommendations as values
const mockRecommendations = Object.fromEntries(
  productTypeNames.map(type => (
    [
      type,
      mockData.productRecommendations,
    ]
  )),
);

// When the values are extracted, each course should only have: title, label, and position
const expectedCourseData = [
  {
    title: 'Mining with the Mons',
    label: 'MONS101',
    position: 0,
  },
  {
    title: 'The Art of Warren Upkeep',
    label: 'WAR101',
    position: 1,
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

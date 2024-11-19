import { mergeConfig } from '@edx/frontend-platform';
import {
  formatFacetFilterData,
  getProductRecommendations,
  searchJobs,
} from '../search';

jest.mock('@edx/frontend-platform/logging');

const mockAlgoliaResult = {
  hits: [
    {
      key: 'test-course-key',
      title: 'Test Title',
      skill_names: [
        {
          id: 1,
          name: 'Skill Name',
        },
      ],
    },
  ],
};

const mockClient = {
  searchSingleIndex: jest.fn().mockImplementation(() => mockAlgoliaResult),
};

const mockAlgoliaJobsIndexName = 'jobs-index';
const mockAlgoliaProductIndexName = 'product-index';

describe('Algolias utility function', () => {
  beforeAll(async () => {
    mergeConfig({
      ALGOLIA_JOBS_INDEX_NAME: mockAlgoliaJobsIndexName,
      ALGOLIA_PRODUCT_INDEX_NAME: mockAlgoliaProductIndexName,
    });
  });
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('formatFacetFilterData() should return a new array with data formatted as expected', () => {
    const result = formatFacetFilterData('name', ['Organic Farmer']);
    expect(result).toEqual(['name:Organic Farmer']);
  });

  it('searchJobs() queries Algolia with the expected search parameters', async () => {
    const expectedSearchParameters = {
      facetFilters: [
        ['name:Enchanter'],
      ],
    };

    const results = await searchJobs(mockClient, ['Enchanter']);
    expect(mockClient.searchSingleIndex).toHaveBeenCalledTimes(1);
    expect(mockClient.searchSingleIndex).toHaveBeenCalledWith({
      indexName: mockAlgoliaJobsIndexName,
      searchParams: expectedSearchParameters,
    });
    expect(results).toEqual(mockAlgoliaResult.hits);
  });

  it('searchJobs() returns an empty array when an exception occurs querying Algolia', async () => {
    const results = await searchJobs(null, ['Organic Farmer']);
    expect(results).toEqual([]);
  });

  it('getProductRecommendations() queries Algolia with the expected search parameters', async () => {
    const expectedSearchParameters = {
      filters: 'product: "Course" AND language: "English"',
      facetFilters: [
        ['skills.skill:Sword Lobbing'],
      ],
    };

    const results = await getProductRecommendations(mockClient, 'Course', ['Sword Lobbing']);
    expect(mockClient.searchSingleIndex).toHaveBeenCalledTimes(1);
    expect(mockClient.searchSingleIndex).toHaveBeenCalledWith({
      indexName: mockAlgoliaProductIndexName,
      searchParams: expectedSearchParameters,
    });
    expect(results).toEqual(mockAlgoliaResult.hits);
  });

  it('getProductRecommendations() returns an empty array when an exception occurs querying Algolia', async () => {
    const results = await getProductRecommendations(null, 'Course', ['Management']);
    expect(results).toEqual([]);
  });
});

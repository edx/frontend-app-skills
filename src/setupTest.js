import 'core-js/stable';
import 'regenerator-runtime/runtime';
// import { IntlProvider } from '@edx/frontend-platform/i18n';
// import React from 'react';

// import { SkillsBuilderDefault } from './skills-builder/skills-builder-steps';
// import { SkillsBuilderContext } from './skills-builder/skills-builder-context';
// import { VisibilityFlagsContext } from './skills-builder/visibility-flags-context';
// import { DEFAULT_VISIBILITY_FLAGS } from './skills-builder/visibility-flags-context/data/constants';
// import { skillsInitialState } from './skills-builder/skills-builder-context/data/reducer';
// import { mockData } from './skills-builder/test/__mocks__/jobSkills.mockData';
// import { getProductRecommendations, searchJobs, useAlgoliaSearch } from './skills-builder/utils/search';
// import headerMessages from './skills-builder/skills-builder-header/messages';
// import stepsMessages from './skills-builder/skills-builder-steps/messages';
// import preferencesMessages from './skills-builder/skills-builder-steps/select-preferences/messages';
// import resultsMessages from './skills-builder/skills-builder-steps/view-results/messages';

// jest.mock('@edx/frontend-platform/logging');

// jest.mock('react-instantsearch', () => ({
//   // eslint-disable-next-line react/prop-types, react/jsx-filename-extension
//   InstantSearch: ({ children }) => (<div>{children}</div>),
//   Configure: jest.fn(() => (null)),
//   useSearchBox: jest.fn(() => ({ refine: jest.fn() })),
//   useInstantSearch: jest.fn(() => ({ results: { hits: mockData.hits } })),
// }));

// jest.mock('react-router-dom', () => ({
//   ...jest.requireActual('react-router-dom'),
//   useLocation: jest.fn(() => ({ search: '?query_string=values' })),
// }));

// jest.mock('../utils/search', () => ({
//   searchJobs: jest.fn(),
//   getProductRecommendations: jest.fn(),
//   useAlgoliaSearch: jest.fn(),
// }));

// searchJobs.mockReturnValue(mockData.searchJobs);
// getProductRecommendations.mockReturnValue(mockData.productRecommendations);
// useAlgoliaSearch.mockReturnValue(mockData.useAlgoliaSearch);

// export const dispatchMock = jest.fn();

// export const contextValue = {
//   state: {
//     ...skillsInitialState,
//   },
//   dispatch: dispatchMock,
//   algolia: {
//     // Without this, tests would fail to destructure `searchClient` in the <JobTitleSelect> component
//     searchClient: {},
//     productSearchIndex: {},
//     jobSearchIndex: {},
//   },
// };

// const visibilityContextValue = {
//   state: {
//     ...DEFAULT_VISIBILITY_FLAGS,
//   },
//   dispatch: dispatchMock,
// };

// export const messages = {
//   ...headerMessages,
//   ...stepsMessages,
//   ...preferencesMessages,
//   ...resultsMessages,
// };

// export const SkillsBuilderWrapperWithContext = (value = contextValue) => (
//   <IntlProvider locale="en">
//     <SkillsBuilderContext.Provider value={value}>
//       <VisibilityFlagsContext.Provider value={visibilityContextValue}>
//         <SkillsBuilderDefault />
//       </VisibilityFlagsContext.Provider>
//     </SkillsBuilderContext.Provider>
//   </IntlProvider>
// );

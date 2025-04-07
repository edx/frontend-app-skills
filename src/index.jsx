import 'core-js/stable';
import 'regenerator-runtime/runtime';

import {
  APP_INIT_ERROR, APP_READY, subscribe, initialize, mergeConfig,
} from '@edx/frontend-platform';
import { AppProvider, ErrorPage, PageWrap } from '@edx/frontend-platform/react';
import { createRoot } from 'react-dom/client';
import { Routes, Route } from 'react-router-dom';
import { StrictMode } from 'react';

import Footer from '@edx/frontend-component-footer-edx';
import { SkillsBuilder } from './skills-builder';
import messages from './i18n';

import './index.scss';

const rootNode = createRoot(document.getElementById('root'));
subscribe(APP_READY, () => {
  rootNode.render(
    <StrictMode>
      <AppProvider>
        <main>
          <Routes>
            <Route path="/" element={<PageWrap><SkillsBuilder /></PageWrap>} />
          </Routes>
        </main>
        <Footer />
      </AppProvider>
    </StrictMode>,
  );
});

subscribe(APP_INIT_ERROR, (error) => {
  rootNode.render(<ErrorPage message={error.message} />);
});

initialize({
  messages,
  handlers: {
    config: () => {
      mergeConfig({
        ALGOLIA_APP_ID: process.env.ALGOLIA_APP_ID || null,
        ALGOLIA_JOBS_INDEX_NAME: process.env.ALGOLIA_JOBS_INDEX_NAME || null,
        ALGOLIA_PRODUCT_INDEX_NAME: process.env.ALGOLIA_PRODUCT_INDEX_NAME || null,
        ALGOLIA_SEARCH_API_KEY: process.env.ALGOLIA_SEARCH_API_KEY || null,
        MARKETING_SITE_SEARCH_URL: process.env.SEARCH_CATALOG_URL || null,
      }, 'App loadConfig override handler');
    },
  },
});

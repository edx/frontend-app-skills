import 'core-js/stable';
import 'regenerator-runtime/runtime';

import {
  APP_INIT_ERROR, APP_READY, subscribe, initialize, mergeConfig, getConfig,
} from '@edx/frontend-platform';
import { AppProvider, ErrorPage, PageRoute } from '@edx/frontend-platform/react';
import ReactDOM from 'react-dom';

import { getLoggingService } from '@edx/frontend-platform/logging';
import Footer from '@edx/frontend-component-footer';
import { configure as configureI18n } from '@edx/frontend-platform/i18n/lib';
import { getLocale } from '@edx/frontend-platform/i18n';
import { SkillsBuilder } from './skills-builder';
import messages from './i18n';

import './index.scss';

subscribe(APP_READY, () => {
  ReactDOM.render(
    <AppProvider>
      <PageRoute path="/" component={SkillsBuilder} />
      <Footer />
    </AppProvider>,
    document.getElementById('root'),
  );
});

subscribe(APP_INIT_ERROR, (error) => {
  try {
    getLocale('en');
  } catch (e) {
    configureI18n({
      messages: {},
      config: getConfig(),
      loggingService: getLoggingService(),
    });
  }
  ReactDOM.render(<ErrorPage message={error.message} />, document.getElementById('root'));
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

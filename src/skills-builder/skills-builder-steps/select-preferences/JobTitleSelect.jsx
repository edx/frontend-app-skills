import React, { useContext } from 'react';
import { getConfig } from '@edx/frontend-platform';
import {
  Form, Stack,
} from '@openedx/paragon';
import { useIntl } from '@edx/frontend-platform/i18n';
import { sendTrackEvent } from '@edx/frontend-platform/analytics';
import { InstantSearch } from 'react-instantsearch';
import { setCurrentJobTitle } from '../../skills-builder-context/data/actions';
import { VisibilityFlagsContext } from '../../visibility-flags-context';
import { SkillsBuilderContext } from '../../skills-builder-context';
import JobTitleInstantSearch from './JobTitleInstantSearch';
import messages from './messages';

const JobTitleSelect = () => {
  const { formatMessage } = useIntl();
  const { dispatch, algolia } = useContext(SkillsBuilderContext);
  const { searchClient } = algolia;
  const { state: visibilityFlagsState } = useContext(VisibilityFlagsContext);
  const { isProgressive } = visibilityFlagsState;

  const handleCurrentJobTitleSelect = (value) => {
    dispatch(setCurrentJobTitle(value));
    sendTrackEvent(
      'edx.skills_builder.current_job.select',
      {
        app_name: 'skills_builder',
        category: 'skills_builder',
        learner_data: {
          current_job_title: value,
        },
        variation: isProgressive ? 'glide_path' : 'improved_v1.0',
      },
    );
  };

  return (
    <Stack>
      <Form.Label>
        <h4 className="mb-3">
          {formatMessage(messages.jobTitlePrompt)}
        </h4>
        <InstantSearch searchClient={searchClient} indexName={getConfig().ALGOLIA_JOBS_INDEX_NAME}>
          <JobTitleInstantSearch
            onSelected={handleCurrentJobTitleSelect}
            placeholder={formatMessage(messages.jobTitleInputPlaceholderText)}
            data-testid="job-title-select"
          />
        </InstantSearch>
      </Form.Label>
    </Stack>
  );
};

export default JobTitleSelect;

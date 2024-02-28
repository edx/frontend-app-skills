import React, { useContext } from 'react';
import {
  Button, Container, Form, Hyperlink, useMediaQuery, breakpoints,
} from '@openedx/paragon';
import { getConfig } from '@edx/frontend-platform';
import { useIntl } from '@edx/frontend-platform/i18n';
import { sendTrackEvent } from '@edx/frontend-platform/analytics';
import messages from './messages';
import { VisibilityFlagsContext } from '../visibility-flags-context';
import { SkillsBuilderContext } from '../skills-builder-context';
import { SkillsBuilderHeader } from '../skills-builder-header';
import { SelectPreferences } from './select-preferences';
import ViewResults from './view-results/ViewResults';

const SkillsBuilderProgressive = () => {
  const { formatMessage } = useIntl();
  const isMedium = useMediaQuery({ maxWidth: breakpoints.medium.maxWidth });
  const { state } = useContext(SkillsBuilderContext);
  const { currentGoal, currentJobTitle, careerInterests } = state;
  const { state: visibilityFlagsState } = useContext(VisibilityFlagsContext);
  const { isProgressive } = visibilityFlagsState;

  const sendActionButtonEvent = (eventSuffix) => {
    sendTrackEvent(
      `edx.skills_builder.${eventSuffix}`,
      {
        app_name: 'skills_builder',
        category: 'skills_builder',
        learner_data: {
          current_goal: currentGoal,
          current_job_title: currentJobTitle,
          career_interests: careerInterests,
        },
        variation: isProgressive ? 'glide_path' : 'improved_v1.0',
      },
    );
  };

  const exitButtonHandle = () => {
    sendActionButtonEvent('exit');
  };

  return (
    <>
      <SkillsBuilderHeader isMedium={isMedium} />
      <Container size="md" className="p-4.5 d-flex flex-column">
        <Form className="min-vh-100">

          <SelectPreferences />

          {careerInterests.length > 0 && (
            <ViewResults />
          )}

        </Form>
        <Hyperlink destination={getConfig().MARKETING_SITE_SEARCH_URL} className="align-self-end pt-4.5">
          <Button onClick={exitButtonHandle}>
            {formatMessage(messages.exitButton)}
          </Button>
        </Hyperlink>
      </Container>
    </>

  );
};

export default SkillsBuilderProgressive;

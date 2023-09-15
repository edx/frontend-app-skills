import React, { useState, useContext } from 'react';
import {
  Button, Container, Stepper, Form, Hyperlink, useMediaQuery, breakpoints,
} from '@edx/paragon';
import { getConfig } from '@edx/frontend-platform';
import { useIntl } from '@edx/frontend-platform/i18n';
import { sendTrackEvent } from '@edx/frontend-platform/analytics';
import {
  STEP1, STEP2,
} from './data/constants';
import messages from './messages';

import { SkillsBuilderContext } from '../skills-builder-context';
import { SkillsBuilderHeader } from '../skills-builder-header';
import { SelectPreferences } from './select-preferences';
import ViewResults from './view-results/ViewResults';

const SkillsBuilderDefault = () => {
  const { formatMessage } = useIntl();
  const isMedium = useMediaQuery({ maxWidth: breakpoints.medium.maxWidth });
  const { state } = useContext(SkillsBuilderContext);
  const { currentGoal, currentJobTitle, careerInterests } = state;
  const [currentStep, setCurrentStep] = useState(STEP1);

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
      },
    );
  };

  const nextStepHandle = () => {
    setCurrentStep(STEP2);
    sendActionButtonEvent('next_step');
  };
  const exitButtonHandle = () => {
    sendActionButtonEvent('exit');
  };

  return (
    <div className="min-vh-100 bg-light-200">
      <SkillsBuilderHeader isMedium={isMedium} />
      <Stepper activeKey={currentStep}>

        <Stepper.Header compactWidth="md" className="bg-white mb-4.5" />
        <Container size="md">
          <Form>
            <Stepper.Step eventKey={STEP1} title={formatMessage(messages.selectPreferences)}>
              <SelectPreferences />
            </Stepper.Step>

            <Stepper.Step eventKey={STEP2} title={formatMessage(messages.reviewResults)}>
              <ViewResults />
            </Stepper.Step>

            <Stepper.ActionRow eventKey={STEP1}>
              <Button
                onClick={nextStepHandle}
                disabled={careerInterests.length === 0}
              >
                {formatMessage(messages.nextStepButton)}
              </Button>
            </Stepper.ActionRow>

            <Stepper.ActionRow eventKey={STEP2} className="py-4.5">
              <Button variant="outline-primary" onClick={() => setCurrentStep(STEP1)}>
                {formatMessage(messages.goBackButton)}
              </Button>
              <Stepper.ActionRow.Spacer />
              <Hyperlink destination={getConfig().MARKETING_SITE_SEARCH_URL}>
                <Button onClick={exitButtonHandle}>
                  {formatMessage(messages.exitButton)}
                </Button>
              </Hyperlink>
            </Stepper.ActionRow>
          </Form>
        </Container>
      </Stepper>
    </div>
  );
};

export default SkillsBuilderDefault;

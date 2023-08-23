import React, { useState, useContext } from 'react';
import {
  Button, Container, ModalDialog, Form, Hyperlink, useMediaQuery, breakpoints,
} from '@edx/paragon';
import { getConfig } from '@edx/frontend-platform';
import { useIntl } from '@edx/frontend-platform/i18n';
import { sendTrackEvent } from '@edx/frontend-platform/analytics';
import messages from './messages';

import { SkillsBuilderContext } from '../skills-builder-context';
import { SkillsBuilderHeader } from '../skills-builder-header';
import { SelectPreferences } from './select-preferences';
import ViewResults from './view-results/ViewResults';

import headerImage from '../images/headerImage.png';

const SkillsBuilderProgressive = () => {
  const { formatMessage } = useIntl();
  const isMedium = useMediaQuery({ maxWidth: breakpoints.medium.maxWidth });
  const { state } = useContext(SkillsBuilderContext);
  const { currentGoal, currentJobTitle, careerInterests } = state;

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

  const exitButtonHandle = () => {
    sendActionButtonEvent('exit');
  };
  const closeButtonHandle = () => {
    sendActionButtonEvent('close');
    window.location.href = getConfig().MARKETING_SITE_SEARCH_URL;
  };

  return (
    <ModalDialog
      title="Skills Builder"
      size="fullscreen"
      className="skills-builder-modal bg-light-200"
      isOpen
      onClose={closeButtonHandle}
    >
      <ModalDialog.Hero className="med-min-height">
        <ModalDialog.Hero.Background className="bg-primary-500">
          { !isMedium && <img src={headerImage} alt="" className="h-100" /> }
        </ModalDialog.Hero.Background>
        <ModalDialog.Hero.Content>
          <SkillsBuilderHeader isMedium={isMedium} />
        </ModalDialog.Hero.Content>
      </ModalDialog.Hero>

      <ModalDialog.Body>
        <Container size="md" className="p-4.5">
          <Form>

            <SelectPreferences />

            { careerInterests.length > 0 && (
              <ViewResults />
            )}

          </Form>
        </Container>
      </ModalDialog.Body>

      <ModalDialog.Footer>
        <Hyperlink destination={getConfig().MARKETING_SITE_SEARCH_URL}>
          <Button onClick={exitButtonHandle}>
            {formatMessage(messages.exitButton)}
          </Button>
        </Hyperlink>
      </ModalDialog.Footer>
    </ModalDialog>
  );
};

export default SkillsBuilderProgressive;

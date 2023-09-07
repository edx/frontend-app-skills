import React, { useContext, useRef } from 'react';
import { useIntl } from '@edx/frontend-platform/i18n';
import { sendTrackEvent } from '@edx/frontend-platform/analytics';
import {
  Stack, Row, Col, Form, Dropdown, DropdownButton,
} from '@edx/paragon';
import CareerInterestCard from './CareerInterestCard';
import { addCareerInterest, clearAllCareerInterests } from '../../data/actions';
import { SkillsBuilderContext } from '../../skills-builder-context';
import { useVisibilityFlags } from '../view-results/data/hooks';
import messages from './messages';
import { careerList } from '../../utils/jobsByCategory';

const CareerInterestCategorizinator = () => {
  const { formatMessage } = useIntl();
  const { state, dispatch } = useContext(SkillsBuilderContext);
  const { careerInterests } = state;
  const visibilityFlags = useRef(useVisibilityFlags());
  const { showCareerInterestCards, allowMultipleCareerInterests } = visibilityFlags.current;

  const handleCareerInterestSelect = (value) => {
    if (!allowMultipleCareerInterests && careerInterests.length > 0) {
      dispatch(clearAllCareerInterests(value));
    }

    if (!careerInterests.includes(value) && careerInterests.length < 3) {
      dispatch(addCareerInterest(value));

      sendTrackEvent(
        'edx.skills_builder.career_interest.added',
        {
          app_name: 'skills_builder',
          category: 'skills_builder',
          learner_data: {
            career_interest: value,
          },
        },
      );
    }
  };

  const populateDropdown = (category, title = category) => {
    const currentCategory = careerList[category];

    return (
      <DropdownButton
        id={category}
        title={title}
        variant="light"
      >
        {currentCategory.map((job) => (
          <Dropdown.Item
            key={job.JobTitle}
            onClick={() => handleCareerInterestSelect(job.JobTitle)}
          >
            {job.JobTitle}
          </Dropdown.Item>
        ))}
      </DropdownButton>
    );
  };

  return (
    <Stack gap={2}>
      <Form.Label>
        <h4 className="mb-3">
          {formatMessage(messages.careerInterestPrompt)}
        </h4>
      </Form.Label>
      <Stack
        direction="horizontal"
        gap={2}
        className="flex-wrap"
      >
        {populateDropdown('Coding')}
        {populateDropdown('Business')}
        {populateDropdown('ProductManagement', 'Product Management')}
        {populateDropdown('Data')}
        {populateDropdown('ArtificialIntelligence', 'Artificial Intelligence')}
        {populateDropdown('Communications')}
      </Stack>
      { showCareerInterestCards && (
        <Row>
          {careerInterests.map((interest, index) => (
          // eslint-disable-next-line react/no-array-index-key
            <Col key={index} xs={12} sm={4} className="mb-4">
              <CareerInterestCard interest={interest} />
            </Col>
          ))}
        </Row>
      )}

    </Stack>
  );
};

export default CareerInterestCategorizinator;

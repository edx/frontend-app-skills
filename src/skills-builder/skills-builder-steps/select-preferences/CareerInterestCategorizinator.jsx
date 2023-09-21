import React, { useContext, useState } from 'react';
import { useIntl } from '@edx/frontend-platform/i18n';
import { sendTrackEvent } from '@edx/frontend-platform/analytics';
import {
  Stack, Row, Col, Form, Icon,
} from '@edx/paragon';
import { Verified } from '@edx/paragon/icons';
import CareerInterestCard from './CareerInterestCard';
import { addCareerInterest, clearAllCareerInterests, setExpandedList } from '../../skills-builder-context/data/actions';
import { SkillsBuilderContext } from '../../skills-builder-context';
import messages from './messages';
import careerList from '../data/jobsByCategory.json';
import { VisibilityFlagsContext } from '../../visibility-flags-context';
import { FORM_VALUES } from './data/constants';

const CareerInterestCategorizinator = () => {
  const { formatMessage } = useIntl();
  const { state, dispatch } = useContext(SkillsBuilderContext);
  const { careerInterests } = state;
  const { state: visibilityFlagsState } = useContext(VisibilityFlagsContext);
  const { showCareerInterestCards, allowMultipleCareerInterests, isProgressive } = visibilityFlagsState;

  const handleCareerInterestSelect = (value) => {
    dispatch(setExpandedList([]));
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

  // state for controlling every dropdown menu
  const [dropdownState, setDropdownState] = useState(FORM_VALUES);

  const populateDropdown = (category, title = category) => {
    const currentCategory = careerList[category];
    const controlState = dropdownState[category];

    const handleSelectChange = (e) => {
      const { value } = e.target;
      setDropdownState({
        ...FORM_VALUES,
        [category]: value,
      });
      handleCareerInterestSelect(value);
    };

    return (
      <Form.Control
        as="select"
        value={controlState}
        onChange={handleSelectChange}
        className="select-width"
        leadingElement={controlState && (<Icon src={Verified} />)}
        floatingLabel={controlState && title}
      >
        <option disabled={controlState}>{title}</option>
        {currentCategory.map((job, idx) => (
          // eslint-disable-next-line react/no-array-index-key
          <option key={idx}>{job.jobTitle}</option>
        ))}
      </Form.Control>
    );
  };

  return (
    <Stack>
      <Form.Label>
        {isProgressive ? (
          <p className="lead">
            {formatMessage(messages.careerInterestPromptProgressive)}
          </p>
        ) : (
          <h4 className="mb-3">
            {formatMessage(messages.careerInterestPrompt)}
          </h4>
        )}
      </Form.Label>
      <Stack
        direction="horizontal"
        gap={3}
        className="flex-wrap mb-4.5"
      >
        {populateDropdown('artificialIntelligence', 'Artificial Intelligence')}
        {populateDropdown('business', 'Business')}
        {populateDropdown('coding', 'Coding')}
        {populateDropdown('communications', 'Communications')}
        {populateDropdown('data', 'Data')}
        {populateDropdown('productManagement', 'Product Management')}
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

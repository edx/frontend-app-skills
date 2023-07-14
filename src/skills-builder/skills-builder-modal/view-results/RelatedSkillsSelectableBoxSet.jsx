import { React, useContext } from 'react';
import PropTypes from 'prop-types';
import {
  breakpoints, Button, Chip, OverflowScroll, OverflowScrollContext,
  SelectableBox, Stack, useMediaQuery,
} from '@edx/paragon';
import { useIntl } from '@edx/frontend-platform/i18n';
import messages from './messages';

const RelatedSkillsSelectableBoxSet = ({ jobSkillsList, selectedJobTitle, onChange }) => {
  const { formatMessage } = useIntl();
  const isExtraSmall = useMediaQuery({ maxWidth: breakpoints.medium.maxWidth });

  const renderTopFiveSkills = (skills) => {
    const topFiveSkills = skills.sort((a, b) => b.significance - a.significance).slice(0, 5);
    return (
      topFiveSkills.map(skill => (
        <Chip key={skill.external_id} className="chip-max-width">
          {skill.name}
        </Chip>
      ))
    );
  };

  const jobSelectableBoxList = (setPad = false) => {
    const pad = setPad ? 'mr-2 flex-shrink-0' : null;
    return (
      jobSkillsList.map((job, i, { length }) => (
        <SelectableBox
          key={job.id}
          type="radio"
          value={job.name}
          aria-label={job.name}
          inputHidden={false}
          // don't set pad on last item
          className={(length - 1 !== i) ? pad : null} // what is the correct class to use here?
        >
          <p>{job.name}</p>
          <Stack gap={2} className="align-items-start">
            <p className="heading-label x-small">{formatMessage(messages.relatedSkillsHeading)}</p>
            {renderTopFiveSkills(job.skills)}
          </Stack>
        </SelectableBox>
      ))
    );
  };

  const renderSelectableBoxSet = () => {
    return (
      <SelectableBox.Set
        name="selected job title"
        type="radio"
        value={selectedJobTitle}
        onChange={onChange}
        columns={3}
      >
        {jobSelectableBoxList()}
      </SelectableBox.Set>
    );
  };

  const OverflowScrollContent = () => {
    const { setOverflowRef } = useContext(OverflowScrollContext);
    return (
      <div
        ref={setOverflowRef}
        className="d-flex"
      >
        <OverflowScroll.Items>
          {jobSelectableBoxList(true)}
        </OverflowScroll.Items>
      </div>
    );
  };

  const OverflowScrollControls = () => {
    const {
      isScrolledToStart,
      isScrolledToEnd,
      scrollToPrevious,
      scrollToNext,
    } = useContext(OverflowScrollContext);

    return (
      <div className="mb-3">
        <Button
          onClick={scrollToPrevious}
          disabled={isScrolledToStart}
          size="sm"
          className="mr-2"
        >
          Previous
        </Button>
        <Button
          onClick={scrollToNext}
          disabled={isScrolledToEnd}
          size="sm"
        >
          Next
        </Button>
      </div>
    );
  };

  return (
    <div>
      {
        isExtraSmall ? (
          <OverflowScroll
            ariaLabel="Select Job title to see recommended skills" // put in messages
            hasInteractiveChildren
            offset="2"
            offsetType="fixed"
          >
            <OverflowScrollControls />
            <OverflowScrollContent />
          </OverflowScroll>
        ) : (
          <div>
            {renderSelectableBoxSet()}
          </div>
        )
      }
    </div>
  );
};

RelatedSkillsSelectableBoxSet.propTypes = {
  jobSkillsList: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  selectedJobTitle: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default RelatedSkillsSelectableBoxSet;

import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import {
  Form, Icon,
} from '@edx/paragon';
import { useHits, useSearchBox } from 'react-instantsearch-hooks-web';
import { Search } from '@edx/paragon/icons';

const JobTitleInstantSearch = (props) => {
  const { refine } = useSearchBox(props);
  const { hits } = useHits(props);

  const [jobInput, setJobInput] = useState('');

  const handleAutosuggestChange = (value) => {
    setJobInput(value);
  };

  useEffect(() => {
    refine(jobInput);
  }, [jobInput, refine]);

  return (
    <Form.Autosuggest
      value={jobInput}
      onChange={handleAutosuggestChange}
      name="job-title-suggest"
      autoComplete="off"
      trailingElement={(
        <Icon
          src={Search}
          className="mr-2"
        />
        )}
      {...props}
    >
      {hits.map(job => (
        <Form.AutosuggestOption key={job.id} id={job.name.replaceAll(' ', '-').toLowerCase()}>
          {job.name}
        </Form.AutosuggestOption>
      ))}
    </Form.Autosuggest>
  );
};

JobTitleInstantSearch.propTypes = {
  onSelected: PropTypes.func.isRequired,
};

export default JobTitleInstantSearch;

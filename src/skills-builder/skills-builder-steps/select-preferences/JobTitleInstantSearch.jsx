import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import {
  Form, Icon,
} from '@openedx/paragon';
import { useSearchBox, useInstantSearch } from 'react-instantsearch';
import { Search } from '@openedx/paragon/icons';

const JobTitleInstantSearch = ({ onSelected, ...props }) => {
  const { refine } = useSearchBox(props);
  const { results, status } = useInstantSearch();
  const { hits } = results;

  const [inputValue, setInputValue] = useState({});
  const [jobInput, setJobInput] = useState('');

  const handleAutosuggestChange = (value) => {
    setInputValue(value);
    setJobInput(value.userProvidedText);
    if (value.selectionValue) {
      onSelected(value.selectionValue);
    }
  };

  useEffect(() => {
    refine(jobInput);
  }, [jobInput, refine]);

  return (
    <Form.Autosuggest
      value={inputValue}
      onChange={(v) => handleAutosuggestChange(v)}
      name="job-title-suggest"
      autoComplete="off"
      isLoading={status === 'loading' || status === 'stalled'}
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

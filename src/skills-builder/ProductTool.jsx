import React, { useState, useContext } from 'react';
import {
  Container, Stack, Form, Button,
} from '@openedx/paragon';
import { VisibilityFlagsContext } from './visibility-flags-context';
import { setAllFlags } from './visibility-flags-context/data/actions';

const ProductTool = () => {
  /*
  This component renders a tool that contains a checkbox for each feature flag.
  Setting each checkbox and then clicking the "Configure" button will trigger a rerender of the UI.
  */
  const { state: visibilityFlagsState, dispatch } = useContext(VisibilityFlagsContext);
  const [checkboxState, setCheckboxState] = useState(visibilityFlagsState);

  // click handle for the "Configure" button
  const handleClick = () => {
    // sets all flags to whatever is being held in state
    dispatch(setAllFlags(checkboxState));
  };

  const onCheckboxChange = (e) => {
    // extract `checked` (boolean) and `value` (string) from the target (checkbox)
    const { checked, value } = e.target;
    setCheckboxState(prev => ({
      ...prev,
      // set the key for this flag to whatever `checked` is
      [value]: checked,
    }));
  };

  return (
    <Container className="py-4.5 border-top">
      <Stack direction="horizontal" className="justify-content-around">
        <Form.CheckboxSet
          name="visibility-flags"
          onChange={onCheckboxChange}
          defaultValue={Object.keys(checkboxState).filter(item => checkboxState[item])}
        >
          {Object.keys(visibilityFlagsState).map((item, idx) => (
            // eslint-disable-next-line react/no-array-index-key
            <Form.Checkbox key={idx} value={item}>{item}</Form.Checkbox>
          ))}
        </Form.CheckboxSet>
        <Button onClick={handleClick}>Configure</Button>
      </Stack>
    </Container>
  );
};

export default ProductTool;

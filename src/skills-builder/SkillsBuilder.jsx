import React, { useContext, useState } from 'react';
import {
  Container, Form, Stack, Button,
} from '@edx/paragon';
import { SkillsBuilderDefault } from './skills-builder-steps';
import { VisibilityFlagsContext } from './visibility-flags-context';
import SkillsBuilderProgressive from './skills-builder-steps/SkillsBuilderProgressive';
import { setAllFlags } from './visibility-flags-context/data/actions';

const SkillsBuilder = () => {
  const { state: visibilityFlagsState, dispatch } = useContext(VisibilityFlagsContext);
  const { isProgressive } = visibilityFlagsState;

  const [checkboxState, setCheckboxState] = useState(visibilityFlagsState);

  const handleClick = () => {
    dispatch(setAllFlags(checkboxState));
  };

  const onCheckboxChange = (e) => {
    const { checked, value } = e.target;
    setCheckboxState(prev => ({
      ...prev,
      [value]: checked,
    }));
  };

  const productToolOn = true;

  return (
    <>
      {isProgressive ? (
        <SkillsBuilderProgressive />
      ) : (
        <SkillsBuilderDefault />
      )}
      {/* TODO: find a way to integrate without breaking too many tests */}
      {productToolOn && (
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
      )}
    </>
  );
};

export default SkillsBuilder;

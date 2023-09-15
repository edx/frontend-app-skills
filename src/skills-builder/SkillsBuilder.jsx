import React, { useContext } from 'react';
import { SkillsBuilderDefault } from './skills-builder-steps';
import SkillsBuilderProgressive from './skills-builder-steps/SkillsBuilderProgressive';
import ProductTool from './ProductTool';
import { VisibilityFlagsContext } from './visibility-flags-context';

const SkillsBuilder = () => {
  const { state: visibilityFlagsState } = useContext(VisibilityFlagsContext);
  const { isProgressive, showProductTool } = visibilityFlagsState;

  return (
    <>
      {isProgressive ? (
        <SkillsBuilderProgressive />
      ) : (
        <SkillsBuilderDefault />
      )}
      {showProductTool && (
        <ProductTool />
      )}
    </>
  );
};

export default SkillsBuilder;

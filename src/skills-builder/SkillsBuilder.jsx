import React, { useContext, useEffect } from 'react';
import { sendTrackEvent } from '@edx/frontend-platform/analytics';
import { SkillsBuilderDefault } from './skills-builder-steps';
import SkillsBuilderProgressive from './skills-builder-steps/SkillsBuilderProgressive';
import ProductTool from './ProductTool';
import { VisibilityFlagsContext } from './visibility-flags-context';

const SkillsBuilder = () => {
  const { state: visibilityFlagsState } = useContext(VisibilityFlagsContext);
  const { isProgressive, showProductTool } = visibilityFlagsState;

  useEffect(() => {
    sendTrackEvent('edx.skills_builder.viewed', {
      app_name: 'skills_builder',
      category: 'skills_builder',
      variation: isProgressive ? 'glide_path' : 'improved_v1.0',
    });
  }, [isProgressive]);

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

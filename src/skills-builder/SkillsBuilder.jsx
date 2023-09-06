import React, { useRef } from 'react';
import { SkillsBuilderDefault } from './skills-builder-steps';
import { SkillsBuilderProvider } from './skills-builder-context';
import { useVisibilityFlags } from './skills-builder-steps/view-results/data/hooks';
import SkillsBuilderProgressive from './skills-builder-steps/SkillsBuilderProgressive';

const SkillsBuilder = () => {
  const visibilityFlags = useRef(useVisibilityFlags());
  const { isProgressive } = visibilityFlags.current;

  return (
    <SkillsBuilderProvider>
      { isProgressive ? (
        <SkillsBuilderProgressive />
      ) : (
        <SkillsBuilderDefault />
      )}

    </SkillsBuilderProvider>
  );
};

export default SkillsBuilder;

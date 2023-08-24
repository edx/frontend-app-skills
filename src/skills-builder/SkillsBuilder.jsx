import React, { useRef } from 'react';
import { SkillsBuilderModal } from './skills-builder-modal';
import { SkillsBuilderProvider } from './skills-builder-context';
import { useVisibilityFlags } from './skills-builder-modal/view-results/data/hooks';
import SkillsBuilderProgressive from './skills-builder-modal/SkillsBuilderProgressive';

const SkillsBuilder = () => {
  const visibilityFlags = useRef(useVisibilityFlags());
  const { useProgressive } = visibilityFlags.current;

  return (
    <SkillsBuilderProvider>
      { useProgressive ? (
        <SkillsBuilderProgressive />
      ) : (
        <SkillsBuilderModal />
      )}

    </SkillsBuilderProvider>
  );
};

export default SkillsBuilder;

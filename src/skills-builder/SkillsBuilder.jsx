import React from 'react';
import { SkillsBuilderModal } from './skills-builder-modal';
import { SkillsBuilderProvider } from './skills-builder-context';
import SkillsBuilderProgressive from './skills-builder-modal/SkillsBuilderProgressive';

const SkillsBuilder = () => {
  const useProgressive = true;

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

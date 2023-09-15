import React from 'react';
import { SkillsBuilderProvider } from './skills-builder-context';
import { VisibilityFlagsProvider } from './visibility-flags-context';
import SkillsBuilder from './SkillsBuilder';

const SkillsBuilderContextWrapper = () => (
  <SkillsBuilderProvider>
    <VisibilityFlagsProvider>
      <SkillsBuilder />
    </VisibilityFlagsProvider>
  </SkillsBuilderProvider>
);

export default SkillsBuilderContextWrapper;

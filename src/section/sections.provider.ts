import { Section } from './section.entity';

export const sectionProviders = [
  { provide: 'SectionRepository', useValue: Section },
];

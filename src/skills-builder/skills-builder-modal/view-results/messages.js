import { defineMessages } from '@edx/frontend-platform/i18n';

const messages = defineMessages({
  matchesFoundSuccessAlert: {
    id: 'matches.found.success.alert',
    defaultMessage: 'We found skills and courses that match your preferences!',
    description: 'Success alert message to display when recommendations are presented to the learner.',
  },
  matchesNotFoundDangerAlert: {
    id: 'matches.not.found.danger.alert',
    defaultMessage: 'We were not able to retrieve recommendations at this time. Please try again later.',
    description: 'Danger alert message to display when the component fails to get recommendations.',
  },
  relatedSkillsHeading: {
    id: 'related.skills.heading',
    defaultMessage: 'Related Skills',
    description: 'Heading text for a selectable box that displays related skills for a corresponding selected job title.',
  },
  relatedSkillsSelectableBoxLabelText: {
    id: 'related.skills.selectable.box.label.text',
    defaultMessage: 'Related skills:',
    description: 'Label text for a selectable box that displays related skills for a corresponding selected job title.',
  },
  productRecommendationsHeaderText: {
    id: 'product.recommendations.header.text',
    defaultMessage: '"{jobName}" {productTypeHeaderText}',
    description: 'Header text for a carousel of product recommendations.',
  },
  productTypeBannerResults: {
    id: 'product.type.banner.results',
    defaultMessage: '{numberResults} results on edX',
    description: 'The number of total results',
  },
  productTypeBannerShowAll: {
    id: 'product.type.banner.show.all',
    defaultMessage: 'Show all ({numberResults}) {arrowIcon}',
    description: 'Show all button text',
  },
  productTypeBannerShowLess: {
    id: 'product.type.banner.show.less',
    defaultMessage: 'Show less ({numberResults}) {arrowIcon}',
    description: 'Show less button text',
  },
  productTypeCourseText: {
    id: 'product.type.course.text',
    defaultMessage: 'courses',
    description: 'Header text for courses',
  },
  productTypeProgramText: {
    id: 'product.type.program.text',
    defaultMessage: 'programs',
    description: 'Header text for programs',
  },
  productTypeBootCampText: {
    id: 'product.type.boot_camp.text',
    defaultMessage: 'bootcamps',
    description: 'Header text for bootcamps',
  },
  productTypeExecutiveEducationText: {
    id: 'product.type.executive_education.text',
    defaultMessage: 'executive education',
    description: 'Header text for executive education',
  },
  productTypeDegreeText: {
    id: 'product.type.degree.text',
    defaultMessage: 'degrees',
    description: 'Header text for degrees',
  },
});

export default messages;

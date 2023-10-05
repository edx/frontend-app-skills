/* eslint-disable import/prefer-default-export */
import { searchJobs, getProductRecommendations } from '../../../utils/search';

export async function getRecommendations(jobSearchIndex, productSearchIndex, careerInterests, productTypes) {
  const jobInfo = await searchJobs(jobSearchIndex, careerInterests);

  const results = await Promise.all(jobInfo.map(async (job) => {
    const formattedSkills = job.skills.map(skill => skill.name);

    // create a data object for each job
    const data = {
      id: job.id,
      name: job.name,
      recommendations: {},
      matchedSkills: [],
    };

    // get recommendations for each product type based on the skills for the current job

    await Promise.all(productTypes.map(async (productType) => {
      const formattedProductType = productType.replace('_', ' ');
      const response = await getProductRecommendations(productSearchIndex, formattedProductType, formattedSkills);

      // add a new key to the recommendations object and set the value to the response
      data.recommendations[productType] = response;

      // Get the list of skills for this job that intersect with the skills for the products returned
      const productSkillsList = {};
      response.forEach(product => {
        const skills = product?.skills;
        if (skills) {
          skills.forEach((skill) => {
            const jobSkill = skill?.skill;
            if (jobSkill) {
              // Upsert an entry with the skill name and update the number
              // of times the skill is found in the results
              productSkillsList[jobSkill] = (productSkillsList[jobSkill] || 0) + 1;
            }
          });
        }
      });
      data.matchedSkills = formattedSkills.filter((skillName) => skillName in productSkillsList);
    }));

    return data;
  }));

  return {
    jobInfo,
    results,
  };
}

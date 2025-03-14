import React, {
  useContext, useEffect, useState, useRef,
} from 'react';
import {
  Stack, Row, Alert, Spinner,
} from '@openedx/paragon';
import { logError } from '@edx/frontend-platform/logging';
import { sendTrackEvent } from '@edx/frontend-platform/analytics';
import { useIntl } from '@edx/frontend-platform/i18n';
import { ErrorOutline } from '@openedx/paragon/icons';
import { SkillsBuilderContext } from '../../skills-builder-context';
import { VisibilityFlagsContext } from '../../visibility-flags-context';
import RelatedSkillsSelectableBoxSet from './RelatedSkillsSelectableBoxSet';
import RelatedSkillsSingleBoxSet from './RelatedSkillsSingleBoxSet';
import messages from './messages';
import RecommendationStack from './RecommendationStack';

import { getRecommendations } from './data/service';
import { useProductTypes } from './data/hooks';
import { extractProductKeys } from '../../utils/extractProductKeys';
import { setExpandedList } from '../../skills-builder-context/data/actions';

const ViewResults = () => {
  const { formatMessage } = useIntl();
  const { algolia, state, dispatch } = useContext(SkillsBuilderContext);
  const { searchClient } = algolia;
  const { careerInterests } = state;
  const [selectedJobTitle, setSelectedJobTitle] = useState('');
  const [jobSkillsList, setJobSkillsList] = useState([]);
  const [productRecommendations, setProductRecommendations] = useState([]);
  const [selectedRecommendations, setSelectedRecommendations] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [fetchError, setFetchError] = useState(false);
  // String that is set to only show products related to a specific skill
  const [skillFilter, setSkillFilter] = useState('');

  const productTypes = useRef(useProductTypes());
  const { state: visibilityFlagsState } = useContext(VisibilityFlagsContext);
  const { allowMultipleCareerInterests, isProgressive } = visibilityFlagsState;

  useEffect(() => {
    const getAllRecommendations = async () => {
      setIsLoading(true);
      // eslint-disable-next-line max-len
      const { jobInfo, results } = await getRecommendations(searchClient, careerInterests, productTypes.current);
      if (results[0]) {
        setFetchError(false);
        setJobSkillsList(jobInfo);
        setSelectedJobTitle(results[0]?.name);
        setProductRecommendations(results);
        setSkillFilter('');
        sendTrackEvent('edx.skills_builder.recommendation.shown', {
          app_name: 'skills_builder',
          category: 'skills_builder',
          page: 'skills_builder',
          selected_recommendations: {
            job_id: results[0]?.id,
            job_name: results[0]?.name,
            /* Extract a product label, title, and position for each recommendation */
            product_keys: extractProductKeys(results[0]?.recommendations),
          },
          is_default: true,
          variation: isProgressive ? 'glide_path' : 'improved_v1.0',
        });
      } else {
        logError(`No results for ${careerInterests[0]}`);
        setFetchError(true);
      }
      setIsLoading(false);

      // Check if any LOB doesn't have a recommendation for a job
      results.forEach((jobResult) => {
        let hasAnyRecommendations = false;
        productTypes.current.forEach((lob) => {
          if (jobResult.recommendations[lob].length === 0) {
            logError(`Job [${jobResult.name}] has no recommendations for ${lob}`);
          } else {
            hasAnyRecommendations = true;
          }
        });
        if (!hasAnyRecommendations) {
          logError(`Job [${jobResult.name}] has no recommendations for any LOB in [${productTypes.current}]`);
        }
      });
    };

    getAllRecommendations()
      .catch((err) => {
        logError(err);
        setFetchError(true);
        setIsLoading(false);
      });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [careerInterests, searchClient]);

  useEffect(() => {
    setSelectedRecommendations(productRecommendations.find(rec => rec.name === selectedJobTitle));
  }, [productRecommendations, selectedJobTitle]);

  const handleJobTitleChange = (e) => {
    const { value } = e.target;
    // check if the clicked target is different than the currently selected job title box
    if (selectedJobTitle !== value) {
      // clear the skill filter
      if (skillFilter) {
        setSkillFilter('');
      }
      // set the expanded list to an empty array so each grid will render un-expanded
      dispatch(setExpandedList([]));
      setSelectedJobTitle(value);
      const currentSelection = productRecommendations.find(rec => rec.name === value);
      const { id: jobId, name: jobName, recommendations } = currentSelection;
      /*
        The is_default value will be set to false for any selections made by the user.
        This code is intentionally duplicated from the event that fires in the useEffect for fetching recommendations.
        This proved less clunky than refactoring to make things DRY as we have to ensure the first call fires only once.
        The previous implementation wrapped the event in an additional useEffect that was looping unnecessarily.
        We have plans to refactor all of the event code as part of APER-2392, where we will revisit this approach.
      */
      sendTrackEvent('edx.skills_builder.recommendation.shown', {
        app_name: 'skills_builder',
        category: 'skills_builder',
        page: 'skills_builder',
        selected_recommendations: {
          job_id: jobId,
          job_name: jobName,
          product_keys: extractProductKeys(recommendations),
        },
        is_default: false,
        variation: isProgressive ? 'glide_path' : 'improved_v1.0',
      });
    }
  };

  if (fetchError) {
    return (
      <Alert
        variant="danger"
        icon={ErrorOutline}
      >
        <Alert.Heading>
          {formatMessage(messages.matchesNotFoundDangerAlert)}
        </Alert.Heading>
      </Alert>
    );
  }

  return (
    isLoading ? (
      <Row className="vh-100">
        <Spinner
          animation="border"
          screenReaderText="loading"
          className="mx-auto"
        />
      </Row>
    ) : (
      <Stack gap={4.5}>
        { jobSkillsList.length > 0 && (
          allowMultipleCareerInterests ? (
            <RelatedSkillsSelectableBoxSet
              jobSkillsList={jobSkillsList}
              selectedJobTitle={selectedJobTitle}
              onChange={handleJobTitleChange}
            />
          ) : (
            <RelatedSkillsSingleBoxSet
              jobSkillsList={jobSkillsList}
              matchedSkills={selectedRecommendations?.matchedSkills}
              handleSelectSkill={setSkillFilter}
              selectedSkill={skillFilter}
            />
          )
        )}

        {selectedRecommendations
        && (
        <RecommendationStack
          selectedRecommendations={selectedRecommendations}
          productTypeNames={productTypes.current}
          skillFilter={skillFilter}
        />
        )}
      </Stack>
    )
  );
};

export default ViewResults;

import React, {
  useContext, useEffect, useState, useRef,
} from 'react';
import {
  Stack, Row, Alert, Spinner,
} from '@edx/paragon';
import { logError } from '@edx/frontend-platform/logging';
import { sendTrackEvent } from '@edx/frontend-platform/analytics';
import { useIntl } from '@edx/frontend-platform/i18n';
import { CheckCircle, ErrorOutline } from '@edx/paragon/icons';
import { SkillsBuilderContext } from '../../skills-builder-context';
import RelatedSkillsSelectableBoxSet from './RelatedSkillsSelectableBoxSet';
import RelatedSkillsInteractiveBoxSet from './RelatedSkillsInteractiveBoxSet';
import messages from './messages';
import RecommendationStack from './RecommendationStack';

import { getRecommendations } from './data/service';
import { useProductTypes, useVisibilityFlags } from './data/hooks';
import { extractProductKeys } from '../../utils/extractProductKeys';
import { setExpandedList } from '../../data/actions';

const ViewResults = () => {
  const { formatMessage } = useIntl();
  const { algolia, state, dispatch } = useContext(SkillsBuilderContext);
  const { jobSearchIndex, productSearchIndex } = algolia;
  const { careerInterests } = state;
  const [selectedJobTitle, setSelectedJobTitle] = useState('');
  const [jobSkillsList, setJobSkillsList] = useState([]);
  const [productRecommendations, setProductRecommendations] = useState([]);
  const [selectedRecommendations, setSelectedRecommendations] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [fetchError, setFetchError] = useState(false);

  const productTypes = useRef(useProductTypes());
  const visibilityFlags = useRef(useVisibilityFlags());
  const { showMatchesFoundAlert, useInteractiveBoxSet } = visibilityFlags.current;

  useEffect(() => {
    const getAllRecommendations = async () => {
      // eslint-disable-next-line max-len
      const { jobInfo, results } = await getRecommendations(jobSearchIndex, productSearchIndex, careerInterests, productTypes.current);

      setJobSkillsList(jobInfo);
      setSelectedJobTitle(results[0].name);
      setProductRecommendations(results);
      setIsLoading(false);
      sendTrackEvent('edx.skills_builder.recommendation.shown', {
        app_name: 'skills_builder',
        category: 'skills_builder',
        page: 'skills_builder',
        selected_recommendations: {
          job_id: results[0].id,
          job_name: results[0].name,
          /* Extract a product label, title, and position for each recommendation */
          product_keys: extractProductKeys(results[0].recommendations),
        },
        is_default: true,
      });

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
  }, [careerInterests, jobSearchIndex, productSearchIndex]);

  useEffect(() => {
    setSelectedRecommendations(productRecommendations.find(rec => rec.name === selectedJobTitle));
  }, [productRecommendations, selectedJobTitle]);

  const handleJobTitleChange = (e) => {
    const { value } = e.target;
    // check if the clicked target is different than the currently selected job title box
    if (selectedJobTitle !== value) {
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
      <Row>
        <Spinner
          animation="border"
          screenReaderText="loading"
          className="mx-auto"
        />
      </Row>
    ) : (
      <Stack gap={4.5} className="pb-4.5">
        { showMatchesFoundAlert && (
          <Alert
            variant="success"
            icon={CheckCircle}
          >
            <Alert.Heading>
              {formatMessage(messages.matchesFoundSuccessAlert)}
            </Alert.Heading>
          </Alert>
        )}
        { /* This should just pass the useInteractiveBoxSet flag to the component */ }
        { useInteractiveBoxSet ? (
          <RelatedSkillsInteractiveBoxSet
            jobSkillsList={jobSkillsList}
            selectedJobTitle={selectedJobTitle}
            onChange={handleJobTitleChange}
            useInteractiveBoxSet={useInteractiveBoxSet}
          />
        ) : (
          <RelatedSkillsSelectableBoxSet
            jobSkillsList={jobSkillsList}
            selectedJobTitle={selectedJobTitle}
            onChange={handleJobTitleChange}
          />
        )}

        {selectedRecommendations
        && (
        <RecommendationStack
          selectedRecommendations={selectedRecommendations}
          productTypeNames={productTypes.current}
        />
        )}
      </Stack>
    )
  );
};

export default ViewResults;

import React from 'react';
import { getEvaluationDescription } from '../utils/helpers';

/**
 * PositionEvaluation Component
 * Displays detailed position evaluation information
 */
const PositionEvaluation = ({ evaluation }) => {
  return (
    <div className="panel">
      <h3 className="panel-header">Position Evaluation</h3>
      <div className="text-sm text-gray-600 leading-relaxed">
        {getEvaluationDescription(evaluation)}
      </div>
    </div>
  );
};

export default PositionEvaluation;

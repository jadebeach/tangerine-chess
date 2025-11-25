import React from 'react';
import { formatEvaluation, getEvaluationPercentage } from '../utils/helpers';

/**
 * EvaluationBar Component
 * Displays position evaluation as a vertical bar
 */
const EvaluationBar = ({ evaluation }) => {
  const percentage = getEvaluationPercentage(evaluation);
  const displayText = formatEvaluation(evaluation);

  return (
    <div className="w-8 h-full max-h-[560px] bg-gray-800 relative rounded-sm overflow-hidden shadow-xl">
      <div 
        className="absolute bottom-0 left-0 right-0 bg-gray-100 transition-all duration-500 ease-out"
        style={{ height: `${percentage}%` }}
      />
      <div 
        className={`
          absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 
          -rotate-90 text-[11px] font-bold font-mono whitespace-nowrap pointer-events-none
          ${percentage > 50 ? 'text-gray-800' : 'text-gray-100'}
        `}
        style={{ textShadow: '0 1px 2px rgba(0,0,0,0.3)' }}
      >
        {displayText}
      </div>
    </div>
  );
};

export default EvaluationBar;

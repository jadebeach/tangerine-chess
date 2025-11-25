import React from 'react';

/**
 * AITutorPanel Component
 * Displays AI tutor suggestions during gameplay
 */
const AITutorPanel = ({ tutorAdvice, isActive }) => {
  if (!isActive || !tutorAdvice) return null;

  return (
    <div className="bg-amber-50 border-2 border-orange-400 rounded p-4 mt-4 shadow-lg animate-slide-in">
      <div className="flex items-center gap-2 mb-2">
        <span className="text-xl">🎓</span>
        <h3 className="m-0 text-base font-semibold text-orange-900">
          AI Tutor Suggestion
        </h3>
      </div>
      <p className="m-0 text-sm leading-relaxed text-amber-900">
        {tutorAdvice}
      </p>
    </div>
  );
};

export default AITutorPanel;

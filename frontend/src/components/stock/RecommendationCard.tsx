import React, { useState } from 'react';
import { Card } from '../ui/card';
import ReactMarkdown from 'react-markdown';
import { Lightbulb, ChevronDown, ChevronUp } from 'lucide-react';

interface RecommendationCardProps {
  recommendation: string;
  recommendationDetails?: string;
}

const getRecommendationColor = (recommendation: string) => {
  const rec = recommendation.toLowerCase();
  if (rec.includes('buy') || rec.includes('strong buy')) return 'border-green-400 bg-green-50';
  if (rec.includes('sell') || rec.includes('strong sell')) return 'border-red-400 bg-red-50';
  if (rec.includes('hold')) return 'border-yellow-400 bg-yellow-50';
  return 'border-blue-400 bg-blue-50';
};

const RecommendationCard: React.FC<RecommendationCardProps> = ({
  recommendation,
  recommendationDetails,
}) => {
  const [showDetails, setShowDetails] = useState(false);

  return (
    <Card className={`p-6 border-l-4 ${getRecommendationColor(recommendation)} shadow-md text-center`}>
      <div className="flex flex-col items-center mb-4">
        <Lightbulb className="h-6 w-6 text-gray-700 mb-2" strokeWidth={1.5} />
        <h3 className="text-xl font-semibold text-gray-800">
          Investment Recommendation
        </h3>
      </div>
      <div className="prose max-w-none bg-white rounded-lg p-4 border border-gray-200 mx-auto text-left">
        <ReactMarkdown>{recommendation}</ReactMarkdown>
      </div>
      {recommendationDetails && (
        <div className="mt-4 text-left">
          <button
            className="flex items-center gap-2 text-blue-600 hover:underline focus:outline-none"
            onClick={() => setShowDetails((prev) => !prev)}
            aria-expanded={showDetails}
            aria-controls="recommendation-details"
          >
            {showDetails ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
            <span>Recommendation Details</span>
          </button>
          {showDetails && (
            <div
              id="recommendation-details"
              className="prose max-w-none bg-gray-50 rounded-lg p-4 border border-gray-200 mt-2"
            >
              <ReactMarkdown>{recommendationDetails}</ReactMarkdown>
            </div>
          )}
        </div>
      )}
    </Card>
  );
};

export default RecommendationCard;
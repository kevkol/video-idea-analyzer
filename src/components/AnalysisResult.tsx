import React, { useState } from 'react';
import { ThumbsUp, ThumbsDown, Save } from 'lucide-react';

interface AnalysisResultProps {
  result: {
    problems: Array<{ problem: string; marketAnalysis: string }>;
    ideas: Array<{ idea: string; marketAnalysis: string }>;
  };
  onSave: () => void;
}

const AnalysisResult: React.FC<AnalysisResultProps> = ({ result, onSave }) => {
  const [ratings, setRatings] = useState<{[key: string]: 'like' | 'dislike' | null}>({});

  const handleRate = (item: string, rating: 'like' | 'dislike') => {
    setRatings(prev => ({...prev, [item]: rating}));
  };

  const RatingButtons: React.FC<{item: string}> = ({ item }) => (
    <div className="flex space-x-2 mt-2">
      <button
        onClick={() => handleRate(item, 'like')}
        className={`p-1 rounded ${ratings[item] === 'like' ? 'bg-green-500 text-white' : 'bg-gray-700 text-gray-300'}`}
      >
        <ThumbsUp size={16} />
      </button>
      <button
        onClick={() => handleRate(item, 'dislike')}
        className={`p-1 rounded ${ratings[item] === 'dislike' ? 'bg-red-500 text-white' : 'bg-gray-700 text-gray-300'}`}
      >
        <ThumbsDown size={16} />
      </button>
    </div>
  );

  return (
    <div className="bg-gray-800 shadow rounded-lg p-6">
      <h2 className="text-2xl font-bold mb-4 text-purple-400">Erkannte Probleme und Ideen</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div className="bg-gray-700 p-4 rounded">
          <h3 className="font-bold mb-2 text-yellow-400">Probleme & Marktanalyse</h3>
          <ul className="space-y-4">
            {result.problems.map(({ problem, marketAnalysis }, index) => (
              <li key={index} className="flex flex-col">
                <span className="text-white font-semibold">{problem}</span>
                <RatingButtons item={`problem-${index}`} />
                <p className="mt-2 text-gray-300 text-sm">{marketAnalysis}</p>
              </li>
            ))}
          </ul>
        </div>
        <div className="bg-gray-700 p-4 rounded">
          <h3 className="font-bold mb-2 text-yellow-400">Ideen & Marktanalyse</h3>
          <ul className="space-y-4">
            {result.ideas.map(({ idea, marketAnalysis }, index) => (
              <li key={index} className="flex flex-col">
                <span className="text-white font-semibold">{idea}</span>
                <RatingButtons item={`idea-${index}`} />
                <p className="mt-2 text-gray-300 text-sm">{marketAnalysis}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="flex justify-end">
        <button
          onClick={onSave}
          className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded flex items-center"
        >
          <Save className="mr-2" /> Ergebnis speichern
        </button>
      </div>
    </div>
  );
};

export default AnalysisResult;
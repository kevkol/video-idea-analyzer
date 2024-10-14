import React, { useState } from "react";
import {
  ThumbsUp,
  ThumbsDown,
  Save,
  ChevronDown,
  ChevronUp,
} from "lucide-react";

interface AnalysisResultProps {
  result: {
    problems: Array<{ problem: string; marketAnalysis: string }>;
    ideas: Array<{ idea: string; marketAnalysis: string }>;
  };
  onSave: () => void;
}

interface ItemProps {
  title: string;
  analysis: string;
  itemKey: string;
  ratings: { [key: string]: "like" | "dislike" | null };
  handleRate: (item: string, rating: "like" | "dislike") => void;
}

const Item: React.FC<ItemProps> = ({
  title,
  analysis,
  itemKey,
  ratings,
  handleRate,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <li className="bg-gray-700 p-4 rounded shadow-md mb-4">
      <div className="flex justify-between items-start">
        <span className="text-white font-semibold flex-grow">{title}</span>
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="ml-2 text-gray-400 hover:text-white focus:outline-none"
        >
          {isExpanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
        </button>
      </div>
      {isExpanded && <p className="mt-2 text-gray-300 text-sm">{analysis}</p>}
      <div className="flex justify-between items-center mt-2">
        <div className="flex space-x-2">
          <button
            onClick={() => handleRate(itemKey, "like")}
            className={`p-1 rounded transition-colors duration-200 ${ratings[itemKey] === "like" ? "bg-green-500 text-white" : "bg-gray-600 text-gray-300 hover:bg-gray-500"}`}
          >
            <ThumbsUp size={16} />
          </button>
          <button
            onClick={() => handleRate(itemKey, "dislike")}
            className={`p-1 rounded transition-colors duration-200 ${ratings[itemKey] === "dislike" ? "bg-red-500 text-white" : "bg-gray-600 text-gray-300 hover:bg-gray-500"}`}
          >
            <ThumbsDown size={16} />
          </button>
        </div>
      </div>
    </li>
  );
};

const AnalysisResult: React.FC<AnalysisResultProps> = ({ result, onSave }) => {
  const [ratings, setRatings] = useState<{
    [key: string]: "like" | "dislike" | null;
  }>({});

  const handleRate = (item: string, rating: "like" | "dislike") => {
    setRatings((prev) => ({
      ...prev,
      [item]: prev[item] === rating ? null : rating,
    }));
  };

  return (
    <div className="bg-gray-800 shadow rounded-lg p-6">
      <h2 className="text-2xl font-bold mb-4 text-purple-400">
        Erkannte Probleme und Ideen
      </h2>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <div>
          <h3 className="font-bold mb-2 text-yellow-400">
            Probleme & Marktanalyse
          </h3>
          <ul>
            {result.problems.map(({ problem, marketAnalysis }, index) => (
              <Item
                key={index}
                title={problem}
                analysis={marketAnalysis}
                itemKey={`problem-${index}`}
                ratings={ratings}
                handleRate={handleRate}
              />
            ))}
          </ul>
        </div>
        <div>
          <h3 className="font-bold mb-2 text-yellow-400">
            Ideen & Marktanalyse
          </h3>
          <ul>
            {result.ideas.map(({ idea, marketAnalysis }, index) => (
              <Item
                key={index}
                title={idea}
                analysis={marketAnalysis}
                itemKey={`idea-${index}`}
                ratings={ratings}
                handleRate={handleRate}
              />
            ))}
          </ul>
        </div>
      </div>
      <div className="flex justify-end">
        <button
          onClick={onSave}
          className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded flex items-center transition-colors duration-200"
        >
          <Save className="mr-2" /> Ergebnis speichern
        </button>
      </div>
    </div>
  );
};

export default AnalysisResult;

import React, { useState } from 'react';
import { Youtube } from 'lucide-react';
import Header from './components/Header';
import InputForm from './components/InputForm';
import AnalysisResult from './components/AnalysisResult';
import Footer from './components/Footer';

function App() {
  const [analysisResult, setAnalysisResult] = useState<null | {
    problems: Array<{ problem: string; marketAnalysis: string }>;
    ideas: Array<{ idea: string; marketAnalysis: string }>;
  }>(null);
  const [error, setError] = useState<string | null>(null);

  const handleAnalyze = (url: string) => {
    // Simulating API call
    setError(null);
    if (url.includes('noTranscript')) {
      setError('Dieses Video enthält kein Transkript.');
      return;
    }
    setAnalysisResult({
      problems: [
        { 
          problem: 'Problem 1', 
          marketAnalysis: 'Market analysis for Problem 1' 
        },
        { 
          problem: 'Problem 2', 
          marketAnalysis: 'Market analysis for Problem 2' 
        }
      ],
      ideas: [
        {
          idea: 'Idea 1',
          marketAnalysis: 'Market analysis for Idea 1'
        },
        {
          idea: 'Idea 2',
          marketAnalysis: 'Market analysis for Idea 2'
        }
      ],
    });
  };

  const handleSave = () => {
    console.log('Saving result...');
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8">
        <InputForm onAnalyze={handleAnalyze} error={error} />
        {analysisResult && (
          <AnalysisResult
            result={analysisResult}
            onSave={handleSave}
          />
        )}
      </main>
      <Footer />
    </div>
  );
}

export default App;
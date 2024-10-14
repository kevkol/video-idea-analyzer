import React from 'react';
import { Youtube } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <header className="bg-gray-800 shadow">
      <div className="container mx-auto px-4 py-6">
        <h1 className="text-3xl font-bold text-purple-400 flex items-center">
          <Youtube className="mr-2 text-yellow-400" /> Video Idea Analyzer
        </h1>
        <p className="mt-2 text-gray-300">
          Automatische Analyse von YouTube-Videos zur Erkennung von Kernproblemen und Ideen. 
          Erhalte sofortige, textbasierte Pitches und eine kurze Marktanalyse.
        </p>
      </div>
    </header>
  );
};

export default Header;
import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-800 text-gray-300 py-4">
      <div className="container mx-auto px-4 flex justify-between items-center">
        <p>© 2024 Video Idea Analyzer – Entwickelt, um Ideen zu entdecken</p>
        <div>
          <a href="#" className="text-purple-400 hover:text-purple-300 mr-4">Datenschutz</a>
          <a href="#" className="text-purple-400 hover:text-purple-300">Nutzungsbedingungen</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
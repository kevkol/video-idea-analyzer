import React, { useState } from 'react';

interface InputFormProps {
  onAnalyze: (url: string) => void;
  error: string | null;
}

const InputForm: React.FC<InputFormProps> = ({ onAnalyze, error }) => {
  const [url, setUrl] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAnalyze(url);
  };

  return (
    <form onSubmit={handleSubmit} className="mb-8">
      <div className="mb-4">
        <label htmlFor="video-url" className="block text-purple-300 font-bold mb-2">
          YouTube-Video-URL eingeben
        </label>
        <input
          type="text"
          id="video-url"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          className="w-full px-3 py-2 bg-gray-700 text-white border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
          placeholder="https://www.youtube.com/watch?v=..."
          required
        />
      </div>
      <button
        type="submit"
        className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded"
      >
        Video analysieren
      </button>
      {error && <p className="mt-2 text-red-400">{error}</p>}
    </form>
  );
};

export default InputForm;
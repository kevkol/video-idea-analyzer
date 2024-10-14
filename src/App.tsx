import React, { useState } from "react";
import { Youtube } from "lucide-react";
import Header from "./components/Header";
import InputForm from "./components/InputForm";
import AnalysisResult from "./components/AnalysisResult";
import Footer from "./components/Footer";

type AnalysisResultType = {
  problems: Array<{ problem: string; marketAnalysis: string }>;
  ideas: Array<{ idea: string; marketAnalysis: string }>;
};

function App() {
  const [analysisResult, setAnalysisResult] =
    useState<AnalysisResultType | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleAnalyze = async (url: string) => {
    console.log("handleAnalyze started with URL:", url);
    setError(null);
    setIsLoading(true);

    try {
      // Extrahieren der video_id aus der URL
      const videoId = new URL(url).searchParams.get("v");
      console.log("Extracted video ID:", videoId);

      if (!videoId) {
        throw new Error(
          "Ungültige YouTube-URL. Bitte stellen Sie sicher, dass die URL eine gültige video_id enthält.",
        );
      }

      const apiUrl = `https://790f21bc-73e1-4ac9-baa2-5ecba6340906-00-2j8md0o1cbjz7.kirk.replit.dev:8099/process_video?video_id=${videoId}`;
      console.log("API URL:", apiUrl);

      console.log("Initiating fetch request...");
      const response = await fetch(apiUrl);
      //console.log("Fetch response received:", response);

      if (!response.ok) {
        console.error("HTTP error details:", {
          status: response.status,
          statusText: response.statusText,
          headers: Object.fromEntries(response.headers.entries()),
        });
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      console.log("Parsing JSON response...");
      const data = await response.json();
      console.log("Parsed data:", data);

      setAnalysisResult(data);
    } catch (err) {
      console.error("Error in handleAnalyze:", err);
      if (err instanceof Error) {
        console.error("Error name:", err.name);
        console.error("Error message:", err.message);
        console.error("Error stack:", err.stack);
      }
      setError(
        err instanceof Error
          ? err.message
          : "Ein unerwarteter Fehler ist aufgetreten.",
      );
    } finally {
      setIsLoading(false);
      console.log("handleAnalyze completed");
    }
  };

  const handleSave = () => {
    console.log("Saving result...");
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8">
        <InputForm onAnalyze={handleAnalyze} error={error} />
        {isLoading && <p>Analysiere Video...</p>}
        {analysisResult && (
          <AnalysisResult result={analysisResult} onSave={handleSave} />
        )}
      </main>
      <Footer />
    </div>
  );
}

export default App;

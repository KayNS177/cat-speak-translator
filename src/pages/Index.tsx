import { useState } from "react";
import { LandingPage } from "@/components/LandingPage";
import { AudioUploadRecord } from "@/components/AudioUploadRecord";
import { ResultsPage } from "@/components/ResultsPage";

type AppState = "landing" | "upload" | "results";

const Index = () => {
  const [currentState, setCurrentState] = useState<AppState>("landing");
  const [analysisResult, setAnalysisResult] = useState<string>("");
  const [audioUrl, setAudioUrl] = useState<string>("");

  const handleStartAnalysis = () => {
    setCurrentState("upload");
  };

  const handleAnalysisComplete = (result: string, url: string) => {
    setAnalysisResult(result);
    setAudioUrl(url);
    setCurrentState("results");
  };

  const handleBackToLanding = () => {
    setCurrentState("landing");
    setAnalysisResult("");
    setAudioUrl("");
  };

  const handleTryAnother = () => {
    setCurrentState("upload");
    setAnalysisResult("");
    setAudioUrl("");
  };

  const handleBackToUpload = () => {
    setCurrentState("upload");
  };

  switch (currentState) {
    case "landing":
      return <LandingPage onStartAnalysis={handleStartAnalysis} />;
    
    case "upload":
      return (
        <AudioUploadRecord 
          onBack={handleBackToLanding}
          onAnalysisComplete={handleAnalysisComplete}
        />
      );
    
    case "results":
      return (
        <ResultsPage 
          interpretation={analysisResult}
          audioUrl={audioUrl}
          onBack={handleBackToUpload}
          onTryAnother={handleTryAnother}
        />
      );
    
    default:
      return <LandingPage onStartAnalysis={handleStartAnalysis} />;
  }
};

export default Index;

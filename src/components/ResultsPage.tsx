import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { 
  ArrowLeft, 
  RotateCcw, 
  Play, 
  Pause, 
  Heart,
  Info,
  Sparkles
} from "lucide-react";

interface ResultsPageProps {
  interpretation: string;
  audioUrl: string;
  onBack: () => void;
  onTryAnother: () => void;
}

export const ResultsPage = ({ interpretation, audioUrl, onBack, onTryAnother }: ResultsPageProps) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [audio] = useState(new Audio(audioUrl));

  const togglePlayback = () => {
    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
    } else {
      audio.play();
      setIsPlaying(true);
    }
  };

  // Set up audio event listeners
  audio.onended = () => setIsPlaying(false);

  // Cat behavior tips based on interpretation
  const getCatTip = (interpretation: string) => {
    if (interpretation.includes("hungry")) {
      return "💡 Tip: Try feeding your cat at regular intervals to reduce demanding meows.";
    } else if (interpretation.includes("content") || interpretation.includes("purr")) {
      return "💡 Tip: Your cat is happy! Continue what you're doing to maintain this positive mood.";
    } else if (interpretation.includes("attention")) {
      return "💡 Tip: Spend some quality time playing or petting your cat to satisfy their social needs.";
    } else if (interpretation.includes("distressed") || interpretation.includes("anxious")) {
      return "💡 Tip: Check for stressors in your cat's environment and provide a safe, quiet space.";
    } else if (interpretation.includes("greeting") || interpretation.includes("hello")) {
      return "💡 Tip: Respond to your cat's greeting with gentle words or pets to strengthen your bond.";
    } else if (interpretation.includes("territorial") || interpretation.includes("hiss")) {
      return "💡 Tip: Give your cat space and time to calm down. Avoid forcing interactions.";
    }
    return "💡 Tip: Every cat is unique! Observe your cat's body language alongside their vocalizations.";
  };

  const getEmotionIcon = (interpretation: string) => {
    if (interpretation.includes("content") || interpretation.includes("purr") || interpretation.includes("happy")) {
      return "😸";
    } else if (interpretation.includes("hungry")) {
      return "🍽️";
    } else if (interpretation.includes("attention") || interpretation.includes("greeting")) {
      return "👋";
    } else if (interpretation.includes("distressed") || interpretation.includes("anxious")) {
      return "😿";
    } else if (interpretation.includes("excited")) {
      return "😺";
    } else if (interpretation.includes("territorial") || interpretation.includes("hiss")) {
      return "😾";
    }
    return "🐱";
  };

  return (
    <div className="min-h-screen bg-gradient-soft flex flex-col p-6">
      {/* Header */}
      <div className="max-w-2xl mx-auto w-full">
        <Button 
          variant="whisper" 
          onClick={onBack} 
          className="mb-6"
        >
          <ArrowLeft className="mr-2 w-4 h-4" />
          Back
        </Button>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex items-center justify-center">
        <div className="max-w-2xl mx-auto w-full space-y-8 animate-fade-in-up">
          {/* Header */}
          <div className="text-center space-y-4">
            <div className="flex justify-center mb-4">
              <div className="p-4 bg-gradient-warm rounded-full shadow-warm">
                <Sparkles className="w-8 h-8 text-white" />
              </div>
            </div>
            <h2 className="text-3xl font-light text-foreground">
              Analysis Complete
            </h2>
            <p className="text-cat-whisper">
              Here's what your cat is trying to communicate
            </p>
          </div>

          {/* Results Card */}
          <Card className="p-8 bg-card/80 backdrop-blur-sm border-border/50 space-y-6">
            {/* Emotion Display */}
            <div className="text-center space-y-4">
              <div className="text-6xl mb-4">
                {getEmotionIcon(interpretation)}
              </div>
              <div className="space-y-2">
                <h3 className="text-xl font-medium text-foreground">
                  Your Cat Says:
                </h3>
                <p className="text-lg text-cat-whisper leading-relaxed bg-cat-soft/30 p-4 rounded-xl border border-border/30">
                  {interpretation}
                </p>
              </div>
            </div>

            {/* Audio Playback */}
            <div className="flex justify-center border-t border-border/30 pt-6">
              <Button
                variant="soft"
                size="lg"
                onClick={togglePlayback}
                className="px-8"
              >
                {isPlaying ? (
                  <>
                    <Pause className="mr-2 w-4 h-4" />
                    Pause Audio
                  </>
                ) : (
                  <>
                    <Play className="mr-2 w-4 h-4" />
                    Replay Audio
                  </>
                )}
              </Button>
            </div>
          </Card>

          {/* Cat Tip Card */}
          <Card className="p-6 bg-accent/30 backdrop-blur-sm border-border/50">
            <div className="flex items-start space-x-4">
              <div className="p-2 bg-primary/10 rounded-full">
                <Info className="w-5 h-5 text-primary" />
              </div>
              <div className="flex-1">
                <h4 className="font-medium text-foreground mb-2">Understanding Your Cat</h4>
                <p className="text-sm text-cat-whisper leading-relaxed">
                  {getCatTip(interpretation)}
                </p>
              </div>
            </div>
          </Card>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <Button
              variant="purr"
              size="lg"
              onClick={onTryAnother}
              className="flex-1"
            >
              <RotateCcw className="mr-2 w-4 h-4" />
              Analyze Another Sound
            </Button>
            
            <Button
              variant="soft"
              size="lg"
              className="flex-1"
              onClick={() => {
                // Future feature: Save/share results
                alert("Feature coming soon: Save and share your cat's translations!");
              }}
            >
              <Heart className="mr-2 w-4 h-4" />
              Save Translation
            </Button>
          </div>

          {/* Footer Note */}
          <div className="text-center pt-8">
            <p className="text-xs text-cat-whisper/60">
              These interpretations are based on common cat behavior patterns. 
              Every cat is unique and may have individual communication styles.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
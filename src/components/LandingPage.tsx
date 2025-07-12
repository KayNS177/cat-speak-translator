import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Cat, Mic, Upload } from "lucide-react";

interface LandingPageProps {
  onStartAnalysis: () => void;
}

export const LandingPage = ({ onStartAnalysis }: LandingPageProps) => {
  return (
    <div className="min-h-screen bg-gradient-soft flex flex-col items-center justify-center p-6">
      <div className="max-w-2xl mx-auto text-center space-y-8 animate-fade-in-up">
        {/* Hero Icon */}
        <div className="flex justify-center mb-8">
          <div className="p-6 bg-gradient-warm rounded-full shadow-warm animate-gentle-bounce">
            <Cat className="w-12 h-12 text-white" />
          </div>
        </div>

        {/* Brand Name */}
        <div className="mb-2">
          <h2 className="text-2xl md:text-3xl font-medium text-primary tracking-wide">
            Pawlinggo
          </h2>
        </div>

        {/* Main Heading */}
        <div className="space-y-4">
          <h1 className="text-4xl md:text-5xl font-light text-foreground leading-tight">
            What is your cat trying to say?
          </h1>
          <p className="text-lg md:text-xl text-cat-whisper font-light max-w-lg mx-auto leading-relaxed">
            Upload or record your cat's sounds and discover the emotions and meanings behind their vocalizations.
          </p>
        </div>

        {/* Call to Action */}
        <div className="pt-6">
          <Button 
            variant="purr" 
            size="lg" 
            onClick={onStartAnalysis}
            className="text-lg px-8 py-4 h-auto font-medium"
          >
            <Upload className="mr-2" />
            Upload or Record a Cat Sound
          </Button>
        </div>

        {/* Feature Cards */}
        <div className="grid md:grid-cols-2 gap-6 pt-12 max-w-lg mx-auto">
          <Card className="p-6 bg-card/80 backdrop-blur-sm border-border/50 hover:shadow-gentle transition-all duration-300">
            <div className="text-center space-y-3">
              <div className="p-3 bg-primary/10 rounded-full w-fit mx-auto">
                <Mic className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-medium text-foreground">Record Live</h3>
              <p className="text-sm text-cat-whisper">Use your microphone to capture sounds in real-time</p>
            </div>
          </Card>
          
          <Card className="p-6 bg-card/80 backdrop-blur-sm border-border/50 hover:shadow-gentle transition-all duration-300">
            <div className="text-center space-y-3">
              <div className="p-3 bg-primary/10 rounded-full w-fit mx-auto">
                <Upload className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-medium text-foreground">Upload File</h3>
              <p className="text-sm text-cat-whisper">Choose an existing audio file from your device</p>
            </div>
          </Card>
        </div>

        {/* Subtle Footer */}
        <div className="pt-12 text-center">
          <p className="text-sm text-cat-whisper/60">
            Understanding your feline friend, one meow at a time
          </p>
        </div>
      </div>
    </div>
  );
};
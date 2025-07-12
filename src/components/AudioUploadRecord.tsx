import { useState, useRef, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/hooks/use-toast";
import { 
  Upload, 
  Mic, 
  Square, 
  Play, 
  Pause, 
  ArrowLeft, 
  Loader2 
} from "lucide-react";

interface AudioUploadRecordProps {
  onBack: () => void;
  onAnalysisComplete: (result: string, audioUrl: string) => void;
}

export const AudioUploadRecord = ({ onBack, onAnalysisComplete }: AudioUploadRecordProps) => {
  const [isRecording, setIsRecording] = useState(false);
  const [audioFile, setAudioFile] = useState<File | null>(null);
  const [audioUrl, setAudioUrl] = useState<string>("");
  const [isPlaying, setIsPlaying] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisProgress, setAnalysisProgress] = useState(0);
  
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const audioElementRef = useRef<HTMLAudioElement | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const { toast } = useToast();

  // Mock cat sound interpretations
  const catInterpretations = [
    "This sounds like a hungry meow - your cat is asking for food!",
    "A content purr - your cat is feeling relaxed and happy.",
    "An attention-seeking chirp - your cat wants to interact with you.",
    "A distressed yowl - your cat might be feeling anxious or uncomfortable.",
    "A greeting trill - your cat is saying hello in their special way!",
    "A demanding meow - your cat wants something specific and isn't taking no for an answer.",
    "A gentle purr - your cat is in a peaceful, loving mood.",
    "An excited chatter - your cat has spotted something interesting!",
    "A soft mew - your cat is making a gentle request or showing affection.",
    "A territorial hiss - your cat is feeling defensive or threatened."
  ];

  const startRecording = useCallback(async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      audioChunksRef.current = [];

      mediaRecorder.ondataavailable = (event) => {
        audioChunksRef.current.push(event.data);
      };

      mediaRecorder.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/wav' });
        const file = new File([audioBlob], 'recording.wav', { type: 'audio/wav' });
        setAudioFile(file);
        setAudioUrl(URL.createObjectURL(audioBlob));
        stream.getTracks().forEach(track => track.stop());
      };

      mediaRecorder.start();
      setIsRecording(true);
      toast({
        title: "Recording started",
        description: "Speak or play your cat's sounds now...",
      });
    } catch (error) {
      toast({
        title: "Recording failed",
        description: "Could not access microphone. Please check permissions.",
        variant: "destructive",
      });
    }
  }, [toast]);

  const stopRecording = useCallback(() => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      toast({
        title: "Recording completed",
        description: "Your audio has been captured successfully!",
      });
    }
  }, [isRecording, toast]);

  const handleFileUpload = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.type.startsWith('audio/')) {
        setAudioFile(file);
        setAudioUrl(URL.createObjectURL(file));
        toast({
          title: "File uploaded",
          description: "Audio file ready for analysis!",
        });
      } else {
        toast({
          title: "Invalid file type",
          description: "Please upload an audio file (MP3, WAV, etc.)",
          variant: "destructive",
        });
      }
    }
  }, [toast]);

  const togglePlayback = useCallback(() => {
    if (audioElementRef.current) {
      if (isPlaying) {
        audioElementRef.current.pause();
        setIsPlaying(false);
      } else {
        audioElementRef.current.play();
        setIsPlaying(true);
      }
    }
  }, [isPlaying]);

  const analyzeSound = useCallback(async () => {
    if (!audioFile) return;

    setIsAnalyzing(true);
    setAnalysisProgress(0);

    // Simulate analysis progress
    const progressInterval = setInterval(() => {
      setAnalysisProgress(prev => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        return prev + Math.random() * 15;
      });
    }, 200);

    // Simulate AI processing time
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Select random interpretation
    const interpretation = catInterpretations[Math.floor(Math.random() * catInterpretations.length)];
    
    clearInterval(progressInterval);
    setAnalysisProgress(100);
    
    setTimeout(() => {
      onAnalysisComplete(interpretation, audioUrl);
    }, 500);
  }, [audioFile, audioUrl, onAnalysisComplete]);

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
          <div className="text-center space-y-2">
            <h2 className="text-3xl font-light text-foreground">
              Upload or Record Cat Sounds
            </h2>
            <p className="text-cat-whisper">
              Choose your preferred method to capture your cat's vocalizations
            </p>
          </div>

          {/* Recording/Upload Section */}
          <div className="grid md:grid-cols-2 gap-6">
            {/* Record Card */}
            <Card className="p-8 bg-card/80 backdrop-blur-sm border-border/50 text-center space-y-6">
              <div className="space-y-4">
                <div className="p-4 bg-primary/10 rounded-full w-fit mx-auto">
                  <Mic className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-xl font-medium text-foreground">Record Live</h3>
                <p className="text-cat-whisper text-sm">
                  Capture your cat's sounds in real-time using your microphone
                </p>
              </div>
              
              <Button
                variant={isRecording ? "destructive" : "soft"}
                size="lg"
                onClick={isRecording ? stopRecording : startRecording}
                className="w-full"
                disabled={isAnalyzing}
              >
                {isRecording ? (
                  <>
                    <Square className="mr-2 w-4 h-4" />
                    Stop Recording
                  </>
                ) : (
                  <>
                    <Mic className="mr-2 w-4 h-4" />
                    Start Recording
                  </>
                )}
              </Button>
            </Card>

            {/* Upload Card */}
            <Card className="p-8 bg-card/80 backdrop-blur-sm border-border/50 text-center space-y-6">
              <div className="space-y-4">
                <div className="p-4 bg-primary/10 rounded-full w-fit mx-auto">
                  <Upload className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-xl font-medium text-foreground">Upload File</h3>
                <p className="text-cat-whisper text-sm">
                  Choose an existing audio file from your device
                </p>
              </div>
              
              <input
                ref={fileInputRef}
                type="file"
                accept="audio/*"
                onChange={handleFileUpload}
                className="hidden"
              />
              <Button
                variant="soft"
                size="lg"
                onClick={() => fileInputRef.current?.click()}
                className="w-full"
                disabled={isAnalyzing}
              >
                <Upload className="mr-2 w-4 h-4" />
                Choose Audio File
              </Button>
            </Card>
          </div>

          {/* Audio Preview & Analysis */}
          {audioFile && (
            <Card className="p-6 bg-card/80 backdrop-blur-sm border-border/50 space-y-6 animate-fade-in-up">
              <div className="text-center space-y-2">
                <h3 className="text-lg font-medium text-foreground">Audio Ready</h3>
                <p className="text-sm text-cat-whisper">
                  {audioFile.name} • {(audioFile.size / 1024 / 1024).toFixed(2)} MB
                </p>
              </div>

              {/* Audio Player */}
              <div className="flex justify-center">
                <Button
                  variant="whisper"
                  size="lg"
                  onClick={togglePlayback}
                  disabled={isAnalyzing}
                >
                  {isPlaying ? (
                    <Pause className="mr-2 w-4 h-4" />
                  ) : (
                    <Play className="mr-2 w-4 h-4" />
                  )}
                  {isPlaying ? "Pause" : "Play"} Preview
                </Button>
              </div>

              {/* Analysis Section */}
              {isAnalyzing ? (
                <div className="space-y-4">
                  <div className="text-center">
                    <Loader2 className="w-6 h-6 animate-spin text-primary mx-auto mb-2" />
                    <p className="text-sm text-cat-whisper">Analyzing your cat's sounds...</p>
                  </div>
                  <Progress value={analysisProgress} className="w-full" />
                </div>
              ) : (
                <div className="text-center">
                  <Button
                    variant="purr"
                    size="lg"
                    onClick={analyzeSound}
                    className="px-8"
                  >
                    Analyze Sound
                  </Button>
                </div>
              )}

              <audio
                ref={audioElementRef}
                src={audioUrl}
                onEnded={() => setIsPlaying(false)}
                className="hidden"
              />
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};
import { Navigation } from "@/components/layout/Navigation";
import { StudyMaterialInput } from "@/components/study/StudyMaterialInput";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const CreateSession = () => {
  const navigate = useNavigate();
  const [isProcessing, setIsProcessing] = useState(false);

  const handleMaterialSubmit = async (material: string, type: 'text' | 'file') => {
    setIsProcessing(true);
    
    // Simulate AI processing time
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Navigate to study session with the material
    navigate('/study-session', { 
      state: { 
        material, 
        type,
        sessionId: Date.now() // Mock session ID
      } 
    });
  };

  if (isProcessing) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <div className="container mx-auto px-6 pt-24 pb-12">
          <div className="max-w-2xl mx-auto text-center space-y-8">
            <div className="space-y-4">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto animate-pulse">
                <div className="w-8 h-8 bg-primary rounded-full animate-bounce" />
              </div>
              <h2 className="text-3xl font-bold">Processing Your Study Material</h2>
              <p className="text-muted-foreground text-lg">
                Our AI is analyzing your content and generating summaries, quizzes, and explanations...
              </p>
            </div>
            
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-left max-w-md mx-auto">
                <div className="w-2 h-2 bg-success rounded-full animate-pulse" />
                <span className="text-sm">Extracting key concepts...</span>
              </div>
              <div className="flex items-center gap-3 text-left max-w-md mx-auto">
                <div className="w-2 h-2 bg-success rounded-full animate-pulse delay-300" />
                <span className="text-sm">Generating summary points...</span>
              </div>
              <div className="flex items-center gap-3 text-left max-w-md mx-auto">
                <div className="w-2 h-2 bg-primary rounded-full animate-pulse delay-700" />
                <span className="text-sm">Creating quiz questions...</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="container mx-auto px-6 pt-24 pb-12">
        <StudyMaterialInput onMaterialSubmit={handleMaterialSubmit} />
      </main>
    </div>
  );
};

export default CreateSession;
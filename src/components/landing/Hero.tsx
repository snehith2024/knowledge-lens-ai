import { Button } from "@/components/ui/button";
import { Brain, BookOpen, Zap } from "lucide-react";
import heroImage from "@/assets/hero-study.jpg";

export const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-primary-light/20 to-background overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-background/80 to-transparent z-10" />
      
      <div className="container mx-auto px-6 relative z-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-primary font-medium">
                <Brain className="w-5 h-5" />
                <span>AI-Powered Learning</span>
              </div>
              <h1 className="text-5xl lg:text-7xl font-bold leading-tight">
                AI Study <span className="text-primary">Buddy</span>
                <span className="text-2xl ml-2">📚🤖</span>
              </h1>
              <p className="text-xl text-muted-foreground max-w-lg">
                Transform your notes into summaries, quizzes, and clear explanations. 
                Study smarter, not harder with AI assistance.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button variant="hero" size="lg" className="text-lg px-8 py-6 h-auto">
                <BookOpen className="w-5 h-5" />
                Start Studying Free
              </Button>
              <Button variant="outline" size="lg" className="text-lg px-8 py-6 h-auto">
                <Zap className="w-5 h-5" />
                See How It Works
              </Button>
            </div>

            <div className="flex items-center gap-8 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-success rounded-full" />
                <span>Instant Summaries</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-success rounded-full" />
                <span>Smart Quizzes</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-success rounded-full" />
                <span>Concept Explanations</span>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="absolute -inset-4 bg-gradient-to-r from-primary/20 to-accent/20 rounded-3xl blur-2xl" />
            <img 
              src={heroImage}
              alt="AI Study Buddy helping students learn"
              className="relative rounded-2xl shadow-2xl w-full object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
};
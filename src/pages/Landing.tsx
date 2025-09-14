import { Navigation } from "@/components/layout/Navigation";
import { Hero } from "@/components/landing/Hero";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Brain, FileText, Zap, Target, Clock, Trophy } from "lucide-react";

const Landing = () => {
  const features = [
    {
      icon: FileText,
      title: "Instant Summaries",
      description: "Get AI-powered bullet-point summaries of your study material in seconds."
    },
    {
      icon: Brain,
      title: "Smart Quizzes",
      description: "Auto-generated multiple choice quizzes to test your knowledge and retention."
    },
    {
      icon: Zap,
      title: "Concept Explanations", 
      description: "Ask about any concept and get simple, clear explanations with examples."
    },
    {
      icon: Target,
      title: "Focused Learning",
      description: "Identify key concepts and focus your study time on what matters most."
    },
    {
      icon: Clock,
      title: "Save Time",
      description: "Reduce study time by 50% with AI-assisted learning and active recall."
    },
    {
      icon: Trophy,
      title: "Better Retention",
      description: "Improve knowledge retention through interactive quizzes and explanations."
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main>
        <Hero />
        
        {/* Features Section */}
        <section className="py-24 bg-muted/30">
          <div className="container mx-auto px-6">
            <div className="text-center space-y-4 mb-16">
              <h2 className="text-4xl font-bold">Why Students Love AI Study Buddy</h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Transform your study routine with AI-powered tools designed for modern learners
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {features.map((feature, index) => {
                const Icon = feature.icon;
                return (
                  <Card key={index} className="text-center hover:shadow-lg transition-shadow duration-300">
                    <CardHeader>
                      <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                        <Icon className="w-6 h-6 text-primary" />
                      </div>
                      <CardTitle className="text-xl">{feature.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <CardDescription className="text-base leading-relaxed">
                        {feature.description}
                      </CardDescription>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-24">
          <div className="container mx-auto px-6">
            <div className="max-w-3xl mx-auto text-center space-y-8">
              <h2 className="text-4xl font-bold">Ready to Study Smarter?</h2>
              <p className="text-xl text-muted-foreground">
                Join thousands of students who have transformed their learning with AI Study Buddy
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button variant="hero" size="lg" className="text-lg px-8 py-6 h-auto">
                  <Brain className="w-5 h-5" />
                  Start Your Free Study Session
                </Button>
                <Button variant="outline" size="lg" className="text-lg px-8 py-6 h-auto">
                  View Sample Session
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-border py-12 bg-muted/20">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center gap-2 mb-4 md:mb-0">
              <Brain className="w-6 h-6 text-primary" />
              <span className="font-bold text-lg">AI Study Buddy</span>
            </div>
            <div className="text-sm text-muted-foreground">
              © 2024 AI Study Buddy. Built with Lovable. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
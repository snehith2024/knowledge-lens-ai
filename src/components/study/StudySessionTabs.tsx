import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, XCircle, Brain, FileText, HelpCircle } from "lucide-react";
import { useState } from "react";

interface StudySessionTabsProps {
  studyMaterial: string;
}

export const StudySessionTabs = ({ studyMaterial }: StudySessionTabsProps) => {
  const [selectedAnswers, setSelectedAnswers] = useState<{[key: number]: number}>({});
  const [showResults, setShowResults] = useState(false);
  const [explanationQuery, setExplanationQuery] = useState("");
  const [explanation, setExplanation] = useState("");

  // Mock data - in real app this would come from AI
  const summary = [
    "Key concepts include fundamental principles of the subject matter",
    "Important relationships between different components were identified", 
    "Critical processes and their outcomes are highlighted",
    "Practical applications and real-world examples are provided",
    "Common misconceptions and clarifications are addressed"
  ];

  const quizQuestions = [
    {
      question: "What is the main concept discussed in the material?",
      options: [
        "Advanced theoretical frameworks",
        "Basic foundational principles", 
        "Historical development",
        "Future implications"
      ],
      correct: 1
    },
    {
      question: "Which aspect is most emphasized?",
      options: [
        "Practical applications",
        "Theoretical background",
        "Mathematical formulas",
        "Case studies"
      ],
      correct: 0
    },
    {
      question: "What is the key relationship mentioned?",
      options: [
        "Cause and effect",
        "Comparison and contrast",
        "Sequential process",
        "Hierarchical structure"
      ],
      correct: 2
    }
  ];

  const handleAnswerSelect = (questionIndex: number, answerIndex: number) => {
    setSelectedAnswers(prev => ({
      ...prev,
      [questionIndex]: answerIndex
    }));
  };

  const handleSubmitQuiz = () => {
    setShowResults(true);
  };

  const handleExplanationSubmit = () => {
    // Mock explanation - in real app this would call AI
    setExplanation(`${explanationQuery} is a fundamental concept that involves multiple interconnected principles. For example, it can be understood as a process where specific inputs lead to predictable outputs through well-defined mechanisms. This concept is widely applicable in various fields and helps explain complex phenomena in simple terms.`);
  };

  const calculateScore = () => {
    let correct = 0;
    quizQuestions.forEach((q, index) => {
      if (selectedAnswers[index] === q.correct) correct++;
    });
    return correct;
  };

  return (
    <div className="max-w-4xl mx-auto">
      <Tabs defaultValue="summary" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="summary" className="flex items-center gap-2">
            <FileText className="w-4 h-4" />
            Summary
          </TabsTrigger>
          <TabsTrigger value="quiz" className="flex items-center gap-2">
            <Brain className="w-4 h-4" />
            Quiz Me
          </TabsTrigger>
          <TabsTrigger value="explain" className="flex items-center gap-2">
            <HelpCircle className="w-4 h-4" />
            Explain
          </TabsTrigger>
        </TabsList>

        <TabsContent value="summary" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="w-5 h-5 text-primary" />
                AI-Generated Summary
              </CardTitle>
              <CardDescription>
                Key points extracted from your study material
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {summary.map((point, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                    <p className="text-foreground leading-relaxed">{point}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="quiz" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Brain className="w-5 h-5 text-primary" />
                Knowledge Check Quiz
              </CardTitle>
              <CardDescription>
                Test your understanding with these AI-generated questions
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {quizQuestions.map((question, qIndex) => (
                <div key={qIndex} className="space-y-4">
                  <h3 className="font-medium text-lg">
                    {qIndex + 1}. {question.question}
                  </h3>
                  <div className="grid gap-2">
                    {question.options.map((option, oIndex) => (
                      <Button
                        key={oIndex}
                        variant="quiz"
                        className={`justify-start text-left h-auto py-3 px-4 ${
                          selectedAnswers[qIndex] === oIndex
                            ? "bg-primary/10 border-primary"
                            : ""
                        } ${
                          showResults
                            ? oIndex === question.correct
                              ? "bg-success-light border-success text-success-foreground"
                              : selectedAnswers[qIndex] === oIndex && oIndex !== question.correct
                              ? "bg-destructive/10 border-destructive"
                              : ""
                            : ""
                        }`}
                        onClick={() => !showResults && handleAnswerSelect(qIndex, oIndex)}
                        disabled={showResults}
                      >
                        <div className="flex items-center gap-3 w-full">
                          <span className="w-6 h-6 rounded-full border-2 border-current flex items-center justify-center text-xs font-medium">
                            {String.fromCharCode(65 + oIndex)}
                          </span>
                          <span className="flex-1">{option}</span>
                          {showResults && oIndex === question.correct && (
                            <CheckCircle className="w-5 h-5 text-success" />
                          )}
                          {showResults && selectedAnswers[qIndex] === oIndex && oIndex !== question.correct && (
                            <XCircle className="w-5 h-5 text-destructive" />
                          )}
                        </div>
                      </Button>
                    ))}
                  </div>
                </div>
              ))}

              {!showResults && (
                <Button 
                  onClick={handleSubmitQuiz}
                  disabled={Object.keys(selectedAnswers).length < quizQuestions.length}
                  className="w-full"
                >
                  Submit Quiz
                </Button>
              )}

              {showResults && (
                <Card className="bg-primary/5 border-primary/20">
                  <CardContent className="pt-6">
                    <div className="text-center space-y-4">
                      <div className="text-3xl font-bold text-primary">
                        {calculateScore()}/{quizQuestions.length}
                      </div>
                      <p className="text-lg font-medium">
                        You got {calculateScore()} out of {quizQuestions.length} questions correct!
                      </p>
                      <Badge variant="outline" className="text-sm">
                        {calculateScore() >= quizQuestions.length * 0.8 ? "Excellent Work!" : 
                         calculateScore() >= quizQuestions.length * 0.6 ? "Good Job!" : "Keep Studying!"}
                      </Badge>
                    </div>
                  </CardContent>
                </Card>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="explain" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <HelpCircle className="w-5 h-5 text-primary" />
                Concept Explanation
              </CardTitle>
              <CardDescription>
                Get simple explanations for any concept from your material
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex gap-2">
                <Input
                  placeholder="Enter a concept to explain (e.g., photosynthesis, derivatives, etc.)"
                  value={explanationQuery}
                  onChange={(e) => setExplanationQuery(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleExplanationSubmit()}
                />
                <Button onClick={handleExplanationSubmit} disabled={!explanationQuery.trim()}>
                  Explain
                </Button>
              </div>

              {explanation && (
                <Card className="bg-muted/30">
                  <CardContent className="pt-6">
                    <div className="space-y-3">
                      <h4 className="font-medium text-primary">Explanation:</h4>
                      <p className="leading-relaxed">{explanation}</p>
                    </div>
                  </CardContent>
                </Card>
              )}

              {!explanation && (
                <div className="text-center py-8 text-muted-foreground">
                  <HelpCircle className="w-12 h-12 mx-auto mb-3 text-muted-foreground/50" />
                  <p>Enter a concept above to get a simple explanation</p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};
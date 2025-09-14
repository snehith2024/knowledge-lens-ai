import { Navigation } from "@/components/layout/Navigation";
import { StudySessionTabs } from "@/components/study/StudySessionTabs";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Save, Share2 } from "lucide-react";
import { useLocation, Link } from "react-router-dom";

const StudySession = () => {
  const location = useLocation();
  const { material, type, sessionId } = location.state || {};

  if (!material) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <div className="container mx-auto px-6 pt-24 pb-12">
          <div className="max-w-2xl mx-auto text-center space-y-4">
            <h2 className="text-3xl font-bold">No Study Material Found</h2>
            <p className="text-muted-foreground">
              Please go back and upload some study material to continue.
            </p>
            <Link to="/create-session">
              <Button variant="default">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Create Session
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="container mx-auto px-6 pt-24 pb-12 space-y-8">
        {/* Session Header */}
        <div className="space-y-6">
          <div className="flex items-center gap-4">
            <Link to="/dashboard">
              <Button variant="outline" size="sm">
                <ArrowLeft className="w-4 h-4" />
                Back to Dashboard
              </Button>
            </Link>
            <div className="flex-1" />
            <Button variant="outline" size="sm">
              <Save className="w-4 h-4 mr-2" />
              Save Session
            </Button>
            <Button variant="outline" size="sm">
              <Share2 className="w-4 h-4 mr-2" />
              Share
            </Button>
          </div>
          
          <Card className="bg-gradient-to-r from-primary/5 to-accent/5 border-primary/20">
            <CardHeader>
              <CardTitle className="text-2xl">
                Study Session #{sessionId?.toString().slice(-4) || '0001'}
              </CardTitle>
              <CardDescription className="text-base">
                Material type: <span className="capitalize font-medium">{type}</span> • 
                Generated on {new Date().toLocaleDateString()}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="bg-background/50 rounded-lg p-4 max-h-32 overflow-y-auto">
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {material.length > 200 ? `${material.slice(0, 200)}...` : material}
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Study Session Tabs */}
        <StudySessionTabs studyMaterial={material} />
      </main>
    </div>
  );
};

export default StudySession;
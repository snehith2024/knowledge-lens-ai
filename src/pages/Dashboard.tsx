import { Navigation } from "@/components/layout/Navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Plus, FileText, Calendar, Clock, Brain, BarChart3 } from "lucide-react";
import { Link } from "react-router-dom";

const Dashboard = () => {
  // Mock data for study sessions
  const studySessions = [
    {
      id: 1,
      title: "Biology Chapter 12: Photosynthesis",
      date: "2024-01-15",
      type: "PDF Upload",
      status: "Completed",
      score: "8/10",
      duration: "25 min"
    },
    {
      id: 2,
      title: "Chemistry Notes: Organic Compounds",
      date: "2024-01-14", 
      type: "Text Input",
      status: "Completed",
      score: "6/8",
      duration: "18 min"
    },
    {
      id: 3,
      title: "Physics: Newton's Laws of Motion",
      date: "2024-01-13",
      type: "PDF Upload", 
      status: "In Progress",
      score: "—",
      duration: "12 min"
    },
    {
      id: 4,
      title: "History: World War II Timeline",
      date: "2024-01-12",
      type: "Text Input",
      status: "Completed",
      score: "10/12",
      duration: "32 min"
    }
  ];

  const stats = [
    {
      title: "Total Sessions",
      value: "24",
      icon: FileText,
      trend: "+3 this week"
    },
    {
      title: "Average Score",
      value: "85%",
      icon: BarChart3,
      trend: "+12% improvement"
    },
    {
      title: "Study Time",
      value: "8.5h",
      icon: Clock,
      trend: "This week"
    },
    {
      title: "Concepts Learned",
      value: "127",
      icon: Brain,
      trend: "+15 this week"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="container mx-auto px-6 pt-24 pb-12 space-y-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-4xl font-bold">Study Dashboard</h1>
            <p className="text-muted-foreground mt-2">
              Track your learning progress and continue your study sessions
            </p>
          </div>
          <Link to="/create-session">
            <Button variant="hero" size="lg" className="gap-2">
              <Plus className="w-5 h-5" />
              New Study Session
            </Button>
          </Link>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <Card key={index} className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">
                        {stat.title}
                      </p>
                      <p className="text-2xl font-bold mt-1">{stat.value}</p>
                      <p className="text-xs text-success mt-1">{stat.trend}</p>
                    </div>
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                      <Icon className="w-6 h-6 text-primary" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Recent Sessions */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="w-5 h-5" />
              Recent Study Sessions
            </CardTitle>
            <CardDescription>
              Your latest study sessions and progress
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {studySessions.map((session) => (
                <div
                  key={session.id}
                  className="flex items-center justify-between p-4 border border-border rounded-lg hover:bg-muted/30 transition-colors cursor-pointer"
                >
                  <div className="flex-1">
                    <h3 className="font-medium text-lg">{session.title}</h3>
                    <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        {new Date(session.date).toLocaleDateString()}
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {session.duration}
                      </div>
                      <Badge variant="outline" className="text-xs">
                        {session.type}
                      </Badge>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <Badge
                        variant={session.status === 'Completed' ? 'default' : 'secondary'}
                        className="mb-1"
                      >
                        {session.status}
                      </Badge>
                      <div className="text-sm font-medium">{session.score}</div>
                    </div>
                    <Button variant="outline" size="sm">
                      {session.status === 'Completed' ? 'Review' : 'Continue'}
                    </Button>
                  </div>
                </div>
              ))}
            </div>
            
            {studySessions.length === 0 && (
              <div className="text-center py-12">
                <FileText className="w-12 h-12 mx-auto text-muted-foreground/50 mb-4" />
                <h3 className="font-medium text-lg mb-2">No study sessions yet</h3>
                <p className="text-muted-foreground mb-4">
                  Create your first study session to get started with AI-powered learning
                </p>
                <Link to="/create-session">
                  <Button variant="default">
                    <Plus className="w-4 h-4 mr-2" />
                    Create First Session
                  </Button>
                </Link>
              </div>
            )}
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default Dashboard;
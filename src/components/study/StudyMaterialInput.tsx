import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Upload, FileText, Type } from "lucide-react";
import { useState, useRef } from "react";

interface StudyMaterialInputProps {
  onMaterialSubmit: (material: string, type: 'text' | 'file') => void;
}

export const StudyMaterialInput = ({ onMaterialSubmit }: StudyMaterialInputProps) => {
  const [textInput, setTextInput] = useState("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [activeTab, setActiveTab] = useState<'text' | 'file'>('text');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type === 'application/pdf') {
      setSelectedFile(file);
    }
  };

  const handleSubmit = () => {
    if (activeTab === 'text' && textInput.trim()) {
      onMaterialSubmit(textInput, 'text');
    } else if (activeTab === 'file' && selectedFile) {
      // In real app, this would extract text from PDF
      onMaterialSubmit(`Content from ${selectedFile.name}: This is sample extracted text from the PDF file. In a real implementation, this would be the actual text content extracted from the uploaded PDF document.`, 'file');
    }
  };

  const isSubmitDisabled = 
    (activeTab === 'text' && !textInput.trim()) || 
    (activeTab === 'file' && !selectedFile);

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="text-center space-y-2">
        <h2 className="text-3xl font-bold">Start Your Study Session</h2>
        <p className="text-muted-foreground">
          Upload your study material to get AI-powered summaries, quizzes, and explanations
        </p>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <Button
          variant={activeTab === 'text' ? 'default' : 'outline'}
          onClick={() => setActiveTab('text')}
          className="h-auto py-4 flex-col gap-2"
        >
          <Type className="w-6 h-6" />
          <div>
            <div className="font-medium">Paste Text</div>
            <div className="text-xs opacity-75">Copy and paste your notes</div>
          </div>
        </Button>
        
        <Button
          variant={activeTab === 'file' ? 'default' : 'outline'}
          onClick={() => setActiveTab('file')}
          className="h-auto py-4 flex-col gap-2"
        >
          <Upload className="w-6 h-6" />
          <div>
            <div className="font-medium">Upload PDF</div>
            <div className="text-xs opacity-75">Upload a PDF document</div>
          </div>
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            {activeTab === 'text' ? (
              <>
                <Type className="w-5 h-5" />
                Paste Your Study Material
              </>
            ) : (
              <>
                <Upload className="w-5 h-5" />
                Upload PDF File
              </>
            )}
          </CardTitle>
          <CardDescription>
            {activeTab === 'text' 
              ? "Copy and paste your lecture notes, textbook excerpts, or any study material"
              : "Upload a PDF file containing your study material (Max 20MB)"
            }
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {activeTab === 'text' ? (
            <Textarea
              placeholder="Paste your study material here... (lecture notes, textbook excerpts, research papers, etc.)"
              value={textInput}
              onChange={(e) => setTextInput(e.target.value)}
              className="min-h-[200px] resize-none"
            />
          ) : (
            <div className="space-y-4">
              <input
                ref={fileInputRef}
                type="file"
                accept=".pdf"
                onChange={handleFileSelect}
                className="hidden"
              />
              
              <div
                onClick={() => fileInputRef.current?.click()}
                className="border-2 border-dashed border-border rounded-lg p-8 text-center cursor-pointer hover:border-primary/50 transition-colors"
              >
                {selectedFile ? (
                  <div className="space-y-2">
                    <FileText className="w-12 h-12 mx-auto text-primary" />
                    <div className="font-medium">{selectedFile.name}</div>
                    <div className="text-sm text-muted-foreground">
                      {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                    </div>
                  </div>
                ) : (
                  <div className="space-y-2">
                    <Upload className="w-12 h-12 mx-auto text-muted-foreground" />
                    <div className="font-medium">Click to upload PDF</div>
                    <div className="text-sm text-muted-foreground">
                      Or drag and drop your PDF file here
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          <Button 
            onClick={handleSubmit}
            disabled={isSubmitDisabled}
            className="w-full"
            size="lg"
          >
            Generate Study Materials
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { X, Check, RefreshCw, Brain, FileText, Scale } from "lucide-react";

interface ContractClause {
  id: number;
  section: string;
  title: string;
  content: string;
  riskLevel: 'low' | 'medium' | 'high';
  suggested?: string;
  reasoning?: string;
}

interface ClauseEditDrawerProps {
  clauseData: ContractClause | undefined;
  onClose: () => void;
  comparisonMode: 'template' | 'lastVersion' | 'industry';
}

const ClauseEditDrawer = ({ clauseData, onClose, comparisonMode }: ClauseEditDrawerProps) => {
  const [editedContent, setEditedContent] = useState(clauseData?.content || "");
  const [activeTab, setActiveTab] = useState("edit");

  if (!clauseData) return null;

  const firmTemplate = "All work product, including but not limited to source code, documentation, and derivative works, shall be the exclusive property of Company.";
  const industryStandard = "All work product shall be jointly owned by both parties with Company retaining first right of use for business purposes.";

  const getComparisonText = () => {
    switch (comparisonMode) {
      case 'template': return firmTemplate;
      case 'industry': return industryStandard;
      case 'lastVersion': return clauseData.content;
      default: return clauseData.content;
    }
  };

  const handleAcceptSuggestion = () => {
    if (clauseData.suggested) {
      setEditedContent(clauseData.suggested);
    }
  };

  const handleApplyTemplate = (templateType: 'firm' | 'industry') => {
    const template = templateType === 'firm' ? firmTemplate : industryStandard;
    setEditedContent(template);
  };

  return (
    <div className="fixed right-0 top-0 bottom-0 w-96 bg-card border-l border-border shadow-2xl z-50 flex flex-col">
      {/* Header */}
      <div className="p-4 border-b border-border">
        <div className="flex items-center justify-between mb-2">
          <h3 className="font-semibold text-foreground">
            Edit Clause {clauseData.section}
          </h3>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="w-4 h-4" />
          </Button>
        </div>
        <p className="text-sm text-muted-foreground">{clauseData.title}</p>
        <div className="flex items-center space-x-2 mt-2">
          <Badge variant={clauseData.riskLevel === 'high' ? 'destructive' : clauseData.riskLevel === 'medium' ? 'secondary' : 'outline'}>
            {clauseData.riskLevel.toUpperCase()} RISK
          </Badge>
          {clauseData.suggested && (
            <Badge variant="outline" className="text-primary">
              AI SUGGESTION AVAILABLE
            </Badge>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="h-full flex flex-col">
          <TabsList className="grid w-full grid-cols-3 m-4 mb-0">
            <TabsTrigger value="edit">Edit</TabsTrigger>
            <TabsTrigger value="compare">Compare</TabsTrigger>
            <TabsTrigger value="reasoning">AI Insight</TabsTrigger>
          </TabsList>

          {/* Edit Tab */}
          <TabsContent value="edit" className="flex-1 p-4 space-y-4">
            <div>
              <label className="text-sm font-medium text-foreground mb-2 block">
                Current Clause
              </label>
              <Textarea
                value={editedContent}
                onChange={(e) => setEditedContent(e.target.value)}
                className="min-h-32 resize-none"
                placeholder="Edit clause content..."
              />
            </div>

            {clauseData.suggested && (
              <div className="space-y-2">
                <label className="text-sm font-medium text-primary mb-2 block flex items-center space-x-2">
                  <Brain className="w-4 h-4" />
                  <span>AI Suggested Revision</span>
                </label>
                <div className="p-3 bg-primary/5 border border-primary/20 rounded-lg">
                  <p className="text-sm text-foreground/80">{clauseData.suggested}</p>
                </div>
                <Button
                  onClick={handleAcceptSuggestion}
                  className="w-full flex items-center space-x-2"
                  size="sm"
                >
                  <Check className="w-4 h-4" />
                  <span>Accept AI Suggestion</span>
                </Button>
              </div>
            )}

            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground mb-2 block">
                Quick Templates
              </label>
              <div className="space-y-2">
                <Button
                  variant="outline"
                  onClick={() => handleApplyTemplate('firm')}
                  className="w-full justify-start text-sm"
                  size="sm"
                >
                  <FileText className="w-4 h-4 mr-2" />
                  Apply Firm Template
                </Button>
                <Button
                  variant="outline"
                  onClick={() => handleApplyTemplate('industry')}
                  className="w-full justify-start text-sm"
                  size="sm"
                >
                  <Scale className="w-4 h-4 mr-2" />
                  Apply Industry Standard
                </Button>
              </div>
            </div>
          </TabsContent>

          {/* Compare Tab */}
          <TabsContent value="compare" className="flex-1 p-4 space-y-4">
            <div className="space-y-4">
              <div>
                <h4 className="text-sm font-medium text-foreground mb-2">Current Version</h4>
                <div className="p-3 bg-muted/50 rounded-lg">
                  <p className="text-sm text-foreground/80">{clauseData.content}</p>
                </div>
              </div>

              <div>
                <h4 className="text-sm font-medium text-foreground mb-2">
                  {comparisonMode === 'template' ? 'Firm Template' : 
                   comparisonMode === 'industry' ? 'Industry Standard' : 'Previous Version'}
                </h4>
                <div className="p-3 bg-primary/5 border border-primary/20 rounded-lg">
                  <p className="text-sm text-foreground/80">{getComparisonText()}</p>
                </div>
              </div>

              {clauseData.suggested && (
                <div>
                  <h4 className="text-sm font-medium text-primary mb-2 flex items-center space-x-2">
                    <Brain className="w-4 h-4" />
                    <span>AI Recommendation</span>
                  </h4>
                  <div className="p-3 bg-green-500/5 border border-green-500/20 rounded-lg">
                    <p className="text-sm text-foreground/80">{clauseData.suggested}</p>
                  </div>
                </div>
              )}
            </div>
          </TabsContent>

          {/* Reasoning Tab */}
          <TabsContent value="reasoning" className="flex-1 p-4 space-y-4">
            {clauseData.reasoning ? (
              <div className="space-y-4">
                <div>
                  <h4 className="text-sm font-medium text-foreground mb-2 flex items-center space-x-2">
                    <Brain className="w-4 h-4 text-primary" />
                    <span>Why This Change?</span>
                  </h4>
                  <div className="p-3 bg-muted/50 rounded-lg">
                    <p className="text-sm text-foreground/80">{clauseData.reasoning}</p>
                  </div>
                </div>

                <div>
                  <h4 className="text-sm font-medium text-foreground mb-2">Risk Analysis</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Business Impact</span>
                      <span className={`font-medium ${clauseData.riskLevel === 'high' ? 'text-destructive' : clauseData.riskLevel === 'medium' ? 'text-yellow-500' : 'text-green-500'}`}>
                        {clauseData.riskLevel === 'high' ? 'Critical' : clauseData.riskLevel === 'medium' ? 'Moderate' : 'Low'}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Negotiation Priority</span>
                      <span className="font-medium">
                        {clauseData.riskLevel === 'high' ? 'High' : clauseData.riskLevel === 'medium' ? 'Medium' : 'Low'}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Industry Compliance</span>
                      <span className="font-medium text-green-500">Standard</span>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center py-8">
                <Brain className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-sm text-muted-foreground">No AI reasoning available for this clause</p>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>

      {/* Footer Actions */}
      <div className="p-4 border-t border-border space-y-2">
        <Button className="w-full" size="sm">
          <Check className="w-4 h-4 mr-2" />
          Save Changes
        </Button>
        <Button variant="outline" className="w-full" size="sm" onClick={onClose}>
          Cancel
        </Button>
      </div>
    </div>
  );
};

export default ClauseEditDrawer;

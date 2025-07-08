
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Edit, RefreshCw, Brain, AlertTriangle, CheckCircle } from "lucide-react";
import ClauseEditDrawer from "./ClauseEditDrawer";

interface ContractClause {
  id: number;
  section: string;
  title: string;
  content: string;
  riskLevel: 'low' | 'medium' | 'high';
  suggested?: string;
  reasoning?: string;
}

interface FullDocumentEditorProps {
  showInlineHighlights: boolean;
  trackChanges: boolean;
  comparisonMode: 'template' | 'lastVersion' | 'industry';
}

const FullDocumentEditor = ({ showInlineHighlights, trackChanges, comparisonMode }: FullDocumentEditorProps) => {
  const [editingClause, setEditingClause] = useState<number | null>(null);
  const [hoveredClause, setHoveredClause] = useState<number | null>(null);
  
  const contractClauses: ContractClause[] = [
    {
      id: 1,
      section: "1",
      title: "PARTIES",
      content: "This Agreement is entered into between ABC Corporation, a Delaware corporation ('Company'), and XYZ Services LLC, a New York limited liability company ('Contractor').",
      riskLevel: 'low'
    },
    {
      id: 2,
      section: "2", 
      title: "SCOPE OF WORK",
      content: "Contractor shall provide software development services as detailed in Exhibit A, including but not limited to web application development, database management, and system integration services.",
      riskLevel: 'low'
    },
    {
      id: 3,
      section: "3",
      title: "PAYMENT TERMS", 
      content: "Company shall pay Contractor a total fee of $150,000, payable in monthly installments of $25,000. Payment shall be due within 45 days of invoice receipt.",
      riskLevel: 'medium',
      suggested: "Company shall pay Contractor a total fee of $150,000, payable in monthly installments of $25,000. Payment shall be due within 30 days of invoice receipt.",
      reasoning: "45-day payment terms are unusually long. Industry standard is 30 days to improve cash flow."
    },
    {
      id: 4,
      section: "4",
      title: "INTELLECTUAL PROPERTY",
      content: "All work product, including but not limited to source code, documentation, and derivative works, shall remain the exclusive property of Contractor unless explicitly transferred in writing.",
      riskLevel: 'high',
      suggested: "All work product, including but not limited to source code, documentation, and derivative works, shall be the exclusive property of Company upon payment.",
      reasoning: "Current clause gives all IP rights to contractor, which poses significant business risk. Standard practice is for hiring company to retain IP rights."
    },
    {
      id: 5,
      section: "5",
      title: "CONFIDENTIALITY",
      content: "Both parties agree to maintain confidentiality of proprietary information shared during the course of this engagement for a period of two (2) years following termination.",
      riskLevel: 'medium',
      suggested: "Both parties agree to maintain confidentiality of proprietary information shared during the course of this engagement for a period of five (5) years following termination.",
      reasoning: "Two-year confidentiality period may be insufficient for proprietary technology. Industry standard for tech companies is typically 5 years."
    },
    {
      id: 6,
      section: "6",
      title: "TERMINATION",
      content: "Either party may terminate this agreement with thirty (30) days written notice. Upon termination, all work product shall be delivered to Company.",
      riskLevel: 'low'
    }
  ];

  const getRiskColor = (risk: 'low' | 'medium' | 'high') => {
    if (!showInlineHighlights) return 'border-border';
    
    switch (risk) {
      case 'high': return 'border-l-4 border-destructive bg-destructive/5';
      case 'medium': return 'border-l-4 border-yellow-500 bg-yellow-500/5';
      case 'low': return 'border-l-4 border-green-500 bg-green-500/5';
    }
  };

  const getRiskIcon = (risk: 'low' | 'medium' | 'high') => {
    switch (risk) {
      case 'high': return <AlertTriangle className="w-4 h-4 text-destructive" />;
      case 'medium': return <AlertTriangle className="w-4 h-4 text-yellow-500" />;
      case 'low': return <CheckCircle className="w-4 h-4 text-green-500" />;
    }
  };

  const handleEditClause = (clauseId: number) => {
    setEditingClause(clauseId);
  };

  const handleCloseEditor = () => {
    setEditingClause(null);
  };

  const getClauseData = (id: number) => {
    return contractClauses.find(clause => clause.id === id);
  };

  return (
    <div className="h-full relative">
      {/* Document Header */}
      <div className="p-6 border-b border-border bg-card/50 sticky top-0 z-10">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-foreground mb-2">SOFTWARE DEVELOPMENT SERVICES AGREEMENT</h1>
          <p className="text-muted-foreground">ABC Corporation & XYZ Services LLC</p>
          <p className="text-sm text-muted-foreground mt-1">Effective Date: January 15, 2024 • Draft v2.1</p>
          {trackChanges && (
            <Badge variant="outline" className="mt-2">
              Track Changes: ON • Comparing to {comparisonMode === 'template' ? 'Firm Template' : comparisonMode === 'lastVersion' ? 'Last Version' : 'Industry Average'}
            </Badge>
          )}
        </div>
      </div>

      {/* Scrollable Document Content */}
      <div className="flex-1 overflow-y-auto">
        <div className="max-w-4xl mx-auto p-6 space-y-6">
          {contractClauses.map((clause) => (
            <div
              key={clause.id}
              className={`relative group rounded-lg border transition-all duration-200 ${getRiskColor(clause.riskLevel)} ${
                hoveredClause === clause.id ? 'shadow-lg scale-[1.01]' : 'shadow-sm'
              }`}
              onMouseEnter={() => setHoveredClause(clause.id)}
              onMouseLeave={() => setHoveredClause(null)}
            >
              {/* Risk Level Sidebar Marker */}
              {showInlineHighlights && (
                <div className="absolute -left-8 top-4 flex flex-col items-center space-y-1">
                  {getRiskIcon(clause.riskLevel)}
                  <div className="text-xs text-muted-foreground transform -rotate-90 whitespace-nowrap">
                    {clause.section}
                  </div>
                </div>
              )}

              <div className="p-6">
                {/* Clause Header */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    {showInlineHighlights && getRiskIcon(clause.riskLevel)}
                    <h3 className="text-lg font-semibold text-foreground">
                      {clause.section}. {clause.title}
                    </h3>
                    {showInlineHighlights && (
                      <Badge variant="outline" className="text-xs">
                        {clause.riskLevel.toUpperCase()}
                      </Badge>
                    )}
                  </div>

                  {/* Hover Actions */}
                  {hoveredClause === clause.id && (
                    <div className="flex items-center space-x-2 opacity-100 transition-opacity">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleEditClause(clause.id)}
                        className="flex items-center space-x-1"
                      >
                        <Edit className="w-4 h-4" />
                        <span className="text-xs">Edit</span>
                      </Button>
                      
                      {clause.suggested && (
                        <Button
                          variant="ghost"
                          size="sm"
                          className="flex items-center space-x-1"
                        >
                          <RefreshCw className="w-4 h-4" />
                          <span className="text-xs">AI Suggestion</span>
                        </Button>
                      )}
                      
                      {clause.reasoning && (
                        <Button
                          variant="ghost"
                          size="sm"
                          className="flex items-center space-x-1"
                        >
                          <Brain className="w-4 h-4" />
                          <span className="text-xs">Reasoning</span>
                        </Button>
                      )}
                    </div>
                  )}
                </div>

                {/* Clause Content */}
                <div className="prose prose-sm max-w-none">
                  <p className="text-foreground/90 leading-relaxed">
                    {clause.content}
                  </p>
                </div>

                {/* AI Suggestion Preview */}
                {clause.suggested && showInlineHighlights && (
                  <div className="mt-4 p-3 bg-primary/5 border border-primary/20 rounded-lg">
                    <div className="flex items-center space-x-2 mb-2">
                      <Brain className="w-4 h-4 text-primary" />
                      <span className="text-sm font-medium text-primary">AI Suggested Revision</span>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {clause.suggested}
                    </p>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Clause Edit Drawer */}
      {editingClause && (
        <ClauseEditDrawer
          clauseData={getClauseData(editingClause)}
          onClose={handleCloseEditor}
          comparisonMode={comparisonMode}
        />
      )}
    </div>
  );
};

export default FullDocumentEditor;

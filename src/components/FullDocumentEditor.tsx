
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Edit, RefreshCw, Brain, AlertTriangle, CheckCircle, 
  Bold, Italic, Underline, Undo, Redo, MessageSquare,
  Eye, FileText, GitCompare, Save, Lock
} from "lucide-react";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator
} from "@/components/ui/dropdown-menu";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
  ContextMenuSeparator
} from "@/components/ui/context-menu";
import ClauseEditDrawer from "./ClauseEditDrawer";

interface ContractClause {
  id: number;
  section: string;
  title: string;
  content: string;
  riskLevel: 'low' | 'medium' | 'high';
  suggested?: string;
  reasoning?: string;
  hasChanges?: boolean;
  changeType?: 'added' | 'modified' | 'deleted';
  aiNote?: string;
}

interface FullDocumentEditorProps {
  showInlineHighlights: boolean;
  trackChanges: boolean;
  comparisonMode: 'template' | 'lastVersion' | 'industry';
}

const FullDocumentEditor = ({ showInlineHighlights, trackChanges, comparisonMode }: FullDocumentEditorProps) => {
  const [editingClause, setEditingClause] = useState<number | null>(null);
  const [hoveredClause, setHoveredClause] = useState<number | null>(null);
  const [documentMode, setDocumentMode] = useState<'view' | 'suggest' | 'compare'>('view');
  const [contractScore, setContractScore] = useState(72);
  
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
      reasoning: "45-day payment terms are unusually long. Industry standard is 30 days to improve cash flow.",
      hasChanges: true,
      changeType: 'modified',
      aiNote: "Industry standard is 30 days. Consider renegotiating to reduce cash flow risk."
    },
    {
      id: 4,
      section: "4",
      title: "INTELLECTUAL PROPERTY",
      content: "All work product, including but not limited to source code, documentation, and derivative works, shall remain the exclusive property of Contractor unless explicitly transferred in writing.",
      riskLevel: 'high',
      suggested: "All work product, including but not limited to source code, documentation, and derivative works, shall be the exclusive property of Company upon payment completion.",
      reasoning: "Current clause gives all IP rights to contractor, which poses significant business risk. Standard practice is for hiring company to retain IP rights.",
      aiNote: "This clause grants all IP to the contractor. This is atypical for client-owned projects."
    },
    {
      id: 5,
      section: "5",
      title: "CONFIDENTIALITY",
      content: "Both parties agree to maintain confidentiality of proprietary information shared during the course of this engagement for a period of two (2) years following termination.",
      riskLevel: 'medium',
      suggested: "Both parties agree to maintain confidentiality of proprietary information shared during the course of this engagement for a period of five (5) years following termination.",
      reasoning: "Two-year confidentiality period may be insufficient for proprietary technology. Industry standard for tech companies is typically 5 years.",
      aiNote: "Some firms extend this to 3–5 years depending on data type."
    },
    {
      id: 6,
      section: "6",
      title: "TERMINATION",
      content: "Either party may terminate this agreement with thirty (30) days written notice. Upon termination, all work product shall be delivered to Company.",
      riskLevel: 'low'
    },
    {
      id: 7,
      section: "7",
      title: "LIMITATION OF LIABILITY",
      content: "Contractor's total liability under this Agreement shall not exceed the total fees paid by Company under this Agreement. Contractor shall not be liable for any indirect, incidental, or consequential damages.",
      riskLevel: 'high',
      suggested: "Both parties' total liability under this Agreement shall not exceed the total fees paid under this Agreement. Neither party shall be liable for any indirect, incidental, or consequential damages.",
      reasoning: "One-sided limitation in favour of Contractor. Recommend negotiating mutual limitations.",
      aiNote: "One-sided limitation in favour of Contractor. Recommend negotiating mutual limitations."
    },
    {
      id: 8,
      section: "8",
      title: "GOVERNING LAW",
      content: "This Agreement shall be governed by and construed in accordance with the laws of the State of New York, without regard to its conflict of law provisions.",
      riskLevel: 'low'
    }
  ];

  const getRiskHighlight = (risk: 'low' | 'medium' | 'high') => {
    if (!showInlineHighlights) return '';
    
    switch (risk) {
      case 'high': return 'bg-red-500/10 border-l-4 border-red-500';
      case 'medium': return 'bg-yellow-500/10 border-l-4 border-yellow-500';
      case 'low': return 'bg-green-500/10 border-l-4 border-green-500';
    }
  };

  const getChangeHighlight = (clause: ContractClause) => {
    if (!trackChanges || !clause.hasChanges) return '';
    
    switch (clause.changeType) {
      case 'added': return 'bg-green-500/20 border-green-500';
      case 'modified': return 'bg-blue-500/20 border-blue-500';
      case 'deleted': return 'bg-red-500/20 border-red-500 line-through';
      default: return '';
    }
  };

  const handleAcceptChange = (clauseId: number) => {
    console.log('Accepting change for clause:', clauseId);
    setContractScore(prev => prev + 2);
  };

  const handleRejectChange = (clauseId: number) => {
    console.log('Rejecting change for clause:', clauseId);
  };

  const handleInlineEdit = (clauseId: number) => {
    console.log('Starting inline edit for clause:', clauseId);
  };

  const handleAcceptSuggestion = (clauseId: number) => {
    console.log('Accepting AI suggestion for clause:', clauseId);
    setContractScore(prev => prev + 3);
  };

  const getClauseData = (id: number) => {
    return contractClauses.find(clause => clause.id === id);
  };

  return (
    <div className="h-full flex bg-background">
      {/* Main Document Area */}
      <div className="flex-1 flex flex-col">
        {/* Document Toolbar */}
        <div className="border-b border-border bg-card/30 p-3 flex items-center justify-between sticky top-0 z-20">
          <div className="flex items-center space-x-1">
            {/* Mode Selector */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="flex items-center space-x-2">
                  {documentMode === 'view' && <Eye className="w-4 h-4" />}
                  {documentMode === 'suggest' && <FileText className="w-4 h-4" />}
                  {documentMode === 'compare' && <GitCompare className="w-4 h-4" />}
                  <span className="capitalize">{documentMode} Mode</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem onClick={() => setDocumentMode('view')}>
                  <Eye className="w-4 h-4 mr-2" />
                  View Mode
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setDocumentMode('suggest')}>
                  <FileText className="w-4 h-4 mr-2" />
                  Suggest Mode
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setDocumentMode('compare')}>
                  <GitCompare className="w-4 h-4 mr-2" />
                  Compare Mode
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <div className="w-px h-6 bg-border mx-2" />

            {/* Text Formatting */}
            <Button variant="ghost" size="sm">
              <Bold className="w-4 h-4" />
            </Button>
            <Button variant="ghost" size="sm">
              <Italic className="w-4 h-4" />
            </Button>
            <Button variant="ghost" size="sm">
              <Underline className="w-4 h-4" />
            </Button>

            <div className="w-px h-6 bg-border mx-2" />

            {/* History */}
            <Button variant="ghost" size="sm">
              <Undo className="w-4 h-4" />
            </Button>
            <Button variant="ghost" size="sm">
              <Redo className="w-4 h-4" />
            </Button>

            <div className="w-px h-6 bg-border mx-2" />

            {/* Comment */}
            <Button variant="ghost" size="sm">
              <MessageSquare className="w-4 h-4" />
            </Button>
          </div>

          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm">
              <Save className="w-4 h-4 mr-2" />
              Save Draft
            </Button>
            <Button size="sm" className="bg-gradient-to-r from-primary to-primary/80">
              <Lock className="w-4 h-4 mr-2" />
              Finalize Document
            </Button>
          </div>
        </div>

        {/* Document Header */}
        <div className="p-8 pb-4 border-b border-border/50">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-3xl font-bold text-foreground mb-3">SOFTWARE DEVELOPMENT SERVICES AGREEMENT</h1>
            <p className="text-lg text-muted-foreground mb-2">ABC Corporation & XYZ Services LLC</p>
            <p className="text-sm text-muted-foreground">Effective Date: January 15, 2024 • Draft v2.1</p>
            {trackChanges && (
              <Badge variant="outline" className="mt-3">
                Track Changes: ON • Comparing to {comparisonMode === 'template' ? 'Firm Template' : comparisonMode === 'lastVersion' ? 'Last Version' : 'Industry Average'}
              </Badge>
            )}
          </div>
        </div>

        {/* Scrollable Document Content */}
        <div className="flex-1 overflow-y-auto">
          <div className="max-w-4xl mx-auto p-8 space-y-8">
            {contractClauses.map((clause) => (
              <ContextMenu key={clause.id}>
                <ContextMenuTrigger>
                  <div
                    className={`
                      relative group cursor-text transition-all duration-200 p-6 rounded-lg
                      ${getRiskHighlight(clause.riskLevel)}
                      ${getChangeHighlight(clause)}
                      ${hoveredClause === clause.id ? 'shadow-lg ring-1 ring-primary/20' : ''}
                    `}
                    onMouseEnter={() => setHoveredClause(clause.id)}
                    onMouseLeave={() => setHoveredClause(null)}
                  >
                    {/* Section Header */}
                    <div className="flex items-center justify-between mb-4">
                      <h2 className="text-xl font-semibold text-foreground">
                        {clause.section}. {clause.title}
                      </h2>
                      
                      {/* Hover Actions */}
                      {hoveredClause === clause.id && (
                        <div className="flex items-center space-x-1 opacity-100 transition-opacity">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleInlineEdit(clause.id)}
                          >
                            <Edit className="w-4 h-4" />
                          </Button>
                          
                          {clause.suggested && (
                            <Button 
                              variant="ghost" 
                              size="sm"
                              onClick={() => handleAcceptSuggestion(clause.id)}
                            >
                              <RefreshCw className="w-4 h-4" />
                            </Button>
                          )}
                          
                          <Button variant="ghost" size="sm">
                            <GitCompare className="w-4 h-4" />
                          </Button>
                          
                          {clause.reasoning && (
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => setEditingClause(clause.id)}
                            >
                              <Brain className="w-4 h-4" />
                            </Button>
                          )}
                        </div>
                      )}
                    </div>

                    {/* Clause Content - Editable */}
                    <div
                      className="prose prose-sm max-w-none text-foreground/90 leading-relaxed focus:outline-none"
                      contentEditable={documentMode === 'suggest'}
                      suppressContentEditableWarning={true}
                    >
                      {clause.content}
                    </div>

                    {/* AI Note Display */}
                    {clause.aiNote && showInlineHighlights && (
                      <div className={`mt-3 p-3 rounded-lg border-l-4 ${
                        clause.riskLevel === 'high' ? 'bg-red-500/10 border-red-500' :
                        clause.riskLevel === 'medium' ? 'bg-yellow-500/10 border-yellow-500' :
                        'bg-green-500/10 border-green-500'
                      }`}>
                        <div className="flex items-start space-x-2">
                          {clause.riskLevel === 'high' ? (
                            <span className="text-red-500 font-bold">🔴</span>
                          ) : clause.riskLevel === 'medium' ? (
                            <span className="text-yellow-500 font-bold">🟡</span>
                          ) : (
                            <span className="text-green-500 font-bold">🟢</span>
                          )}
                          <div>
                            <span className="text-sm font-medium text-muted-foreground">
                              {clause.riskLevel === 'high' ? 'AI Risk: ' : 'AI Note: '}
                            </span>
                            <span className="text-sm text-muted-foreground italic">
                              {clause.aiNote}
                            </span>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* AI Suggestion Preview */}
                    {clause.suggested && showInlineHighlights && documentMode === 'suggest' && (
                      <div className="mt-4 p-4 bg-primary/5 border border-primary/20 rounded-lg">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center space-x-2">
                            <span className="text-green-500 font-bold">✅</span>
                            <span className="text-sm font-medium text-primary">Suggested Revision</span>
                          </div>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleAcceptSuggestion(clause.id)}
                          >
                            <CheckCircle className="w-4 h-4 mr-1" />
                            Accept
                          </Button>
                        </div>
                        <p className="text-sm text-muted-foreground italic">
                          {clause.suggested}
                        </p>
                      </div>
                    )}

                    {/* Change Indicators */}
                    {trackChanges && clause.hasChanges && (
                      <div className="mt-4 flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                        <div className="flex items-center space-x-2">
                          <Badge variant="outline" className="text-xs">
                            {clause.changeType?.toUpperCase()}
                          </Badge>
                          <span className="text-sm text-muted-foreground">
                            {clause.changeType === 'modified' ? 'Payment terms adjusted' : 'Change detected'}
                          </span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleAcceptChange(clause.id)}
                          >
                            <CheckCircle className="w-4 h-4 mr-1" />
                            Accept
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleRejectChange(clause.id)}
                          >
                            Reject
                          </Button>
                        </div>
                      </div>
                    )}
                  </div>
                </ContextMenuTrigger>
                
                <ContextMenuContent>
                  <ContextMenuItem onClick={() => handleInlineEdit(clause.id)}>
                    <Edit className="w-4 h-4 mr-2" />
                    Edit Clause
                  </ContextMenuItem>
                  {clause.suggested && (
                    <ContextMenuItem onClick={() => handleAcceptSuggestion(clause.id)}>
                      <RefreshCw className="w-4 h-4 mr-2" />
                      Accept AI Suggestion
                    </ContextMenuItem>
                  )}
                  <ContextMenuItem>
                    <GitCompare className="w-4 h-4 mr-2" />
                    Compare to Template
                  </ContextMenuItem>
                  {clause.reasoning && (
                    <ContextMenuItem onClick={() => setEditingClause(clause.id)}>
                      <Brain className="w-4 h-4 mr-2" />
                      View Reasoning
                    </ContextMenuItem>
                  )}
                  <ContextMenuSeparator />
                  <ContextMenuItem>
                    <MessageSquare className="w-4 h-4 mr-2" />
                    Add Comment
                  </ContextMenuItem>
                  {trackChanges && clause.hasChanges && (
                    <>
                      <ContextMenuSeparator />
                      <ContextMenuItem onClick={() => handleAcceptChange(clause.id)}>
                        <CheckCircle className="w-4 h-4 mr-2" />
                        Accept Change
                      </ContextMenuItem>
                      <ContextMenuItem onClick={() => handleRejectChange(clause.id)}>
                        Reject Change
                      </ContextMenuItem>
                    </>
                  )}
                </ContextMenuContent>
              </ContextMenu>
            ))}
          </div>
        </div>
      </div>

      {/* Sidebar - Contract Intelligence */}
      <div className="w-80 border-l border-border bg-card/30 sticky top-0 h-screen overflow-y-auto">
        <div className="p-4 border-b border-border">
          <h3 className="font-semibold text-foreground mb-2">Contract Analysis</h3>
          <div className="flex items-center space-x-2">
            <div className="flex-1 bg-muted rounded-full h-2">
              <div 
                className="bg-gradient-to-r from-primary to-primary/80 h-2 rounded-full transition-all duration-500"
                style={{ width: `${contractScore}%` }}
              />
            </div>
            <span className="text-sm font-medium text-foreground">{contractScore}%</span>
          </div>
        </div>

        <div className="p-4 space-y-4">
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">High Risk Clauses</span>
              <span className="text-destructive font-medium">2</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Medium Risk</span>
              <span className="text-yellow-500 font-medium">2</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Low Risk</span>
              <span className="text-green-500 font-medium">4</span>
            </div>
          </div>

          <div className="pt-4 border-t border-border">
            <Button variant="outline" className="w-full justify-start">
              <Brain className="w-4 h-4 mr-2" />
              Ask AI about this section
            </Button>
          </div>

          <div className="pt-4 space-y-2">
            <h4 className="text-sm font-medium text-foreground">Key Risk Areas</h4>
            <div className="text-xs text-muted-foreground space-y-2">
              <div className="p-2 bg-red-500/10 rounded border-l-2 border-red-500">
                <div className="font-medium text-red-500">IP Rights Issue</div>
                <div>Section 4: Contractor retains all IP</div>
              </div>
              <div className="p-2 bg-red-500/10 rounded border-l-2 border-red-500">
                <div className="font-medium text-red-500">Liability Imbalance</div>
                <div>Section 7: One-sided limitations</div>
              </div>
              <div className="p-2 bg-yellow-500/10 rounded border-l-2 border-yellow-500">
                <div className="font-medium text-yellow-500">Payment Terms</div>
                <div>Section 3: 45-day payment period</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Clause Edit Drawer */}
      {editingClause && (
        <ClauseEditDrawer
          clauseData={getClauseData(editingClause)}
          onClose={() => setEditingClause(null)}
          comparisonMode={comparisonMode}
        />
      )}
    </div>
  );
};

export default FullDocumentEditor;

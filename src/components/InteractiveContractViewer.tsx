
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Brain, Edit, FileText, AlertTriangle, CheckCircle, MessageCircle, ChevronDown, ChevronRight } from "lucide-react";

interface ContractClause {
  id: number;
  section: string;
  title: string;
  content: string;
  riskLevel: 'low' | 'medium' | 'high';
  comments: number;
  isExpanded: boolean;
}

interface InteractiveContractViewerProps {
  selectedClause: number | null;
  onClauseSelect: (id: number | null) => void;
  viewMode: 'tree' | 'list';
}

const InteractiveContractViewer = ({ selectedClause, onClauseSelect, viewMode }: InteractiveContractViewerProps) => {
  const [expandedClauses, setExpandedClauses] = useState<Set<number>>(new Set([1, 2, 3, 4, 5, 6]));
  
  const contractClauses: ContractClause[] = [
    {
      id: 1,
      section: "1",
      title: "PARTIES",
      content: "This Agreement is entered into between ABC Corporation, a Delaware corporation ('Company'), and XYZ Services LLC, a New York limited liability company ('Contractor').",
      riskLevel: 'low',
      comments: 0,
      isExpanded: true
    },
    {
      id: 2,
      section: "2",
      title: "SCOPE OF WORK",
      content: "Contractor shall provide software development services as detailed in Exhibit A, including but not limited to web application development, database management, and system integration services.",
      riskLevel: 'low',
      comments: 1,
      isExpanded: true
    },
    {
      id: 3,
      section: "3",
      title: "PAYMENT TERMS",
      content: "Company shall pay Contractor a total fee of $150,000, payable in monthly installments of $25,000. Payment shall be due within 45 days of invoice receipt.",
      riskLevel: 'medium',
      comments: 2,
      isExpanded: true
    },
    {
      id: 4,
      section: "4",
      title: "INTELLECTUAL PROPERTY",
      content: "All work product, including but not limited to source code, documentation, and derivative works, shall remain the exclusive property of Contractor unless explicitly transferred in writing.",
      riskLevel: 'high',
      comments: 3,
      isExpanded: true
    },
    {
      id: 5,
      section: "5",
      title: "CONFIDENTIALITY",
      content: "Both parties agree to maintain confidentiality of proprietary information shared during the course of this engagement for a period of two (2) years following termination.",
      riskLevel: 'medium',
      comments: 1,
      isExpanded: true
    },
    {
      id: 6,
      section: "6",
      title: "TERMINATION",
      content: "Either party may terminate this agreement with thirty (30) days written notice. Upon termination, all work product shall be delivered to Company.",
      riskLevel: 'low',
      comments: 0,
      isExpanded: true
    }
  ];

  const getRiskColor = (risk: 'low' | 'medium' | 'high') => {
    switch (risk) {
      case 'high': return 'bg-destructive/20 border-l-4 border-destructive hover:bg-destructive/30';
      case 'medium': return 'bg-yellow-500/20 border-l-4 border-yellow-500 hover:bg-yellow-500/30';
      case 'low': return 'bg-green-500/20 border-l-4 border-green-500 hover:bg-green-500/30';
    }
  };

  const getRiskIcon = (risk: 'low' | 'medium' | 'high') => {
    switch (risk) {
      case 'high': return <AlertTriangle className="w-4 h-4 text-destructive" />;
      case 'medium': return <AlertTriangle className="w-4 h-4 text-yellow-500" />;
      case 'low': return <CheckCircle className="w-4 h-4 text-green-500" />;
    }
  };

  const toggleExpanded = (clauseId: number) => {
    const newExpanded = new Set(expandedClauses);
    if (newExpanded.has(clauseId)) {
      newExpanded.delete(clauseId);
    } else {
      newExpanded.add(clauseId);
    }
    setExpandedClauses(newExpanded);
  };

  return (
    <div className="h-full flex flex-col">
      {/* Contract Header */}
      <div className="p-6 border-b border-border bg-card/50">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-foreground mb-2">SOFTWARE DEVELOPMENT SERVICES AGREEMENT</h1>
          <p className="text-muted-foreground">ABC Corporation & XYZ Services LLC</p>
          <p className="text-sm text-muted-foreground mt-1">Effective Date: January 15, 2024 • Draft v2.1</p>
        </div>
      </div>

      {/* Contract Content */}
      <div className="flex-1 overflow-y-auto p-6">
        <div className="max-w-4xl mx-auto space-y-4">
          {contractClauses.map((clause) => (
            <div 
              key={clause.id}
              className={`rounded-lg shadow-sm transition-all duration-200 cursor-pointer ${getRiskColor(clause.riskLevel)} ${
                selectedClause === clause.id ? 'ring-2 ring-primary shadow-lg' : ''
              }`}
              onClick={() => onClauseSelect(selectedClause === clause.id ? null : clause.id)}
            >
              <div className="p-4">
                {/* Clause Header */}
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-3">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleExpanded(clause.id);
                      }}
                      className="p-1 h-6 w-6"
                    >
                      {expandedClauses.has(clause.id) ? 
                        <ChevronDown className="w-4 h-4" /> : 
                        <ChevronRight className="w-4 h-4" />
                      }
                    </Button>
                    
                    {getRiskIcon(clause.riskLevel)}
                    
                    <h3 className="font-semibold text-foreground">
                      {clause.section}. {clause.title}
                    </h3>
                    
                    <Badge variant="outline" className="text-xs">
                      {clause.riskLevel.toUpperCase()}
                    </Badge>
                  </div>

                  <div className="flex items-center space-x-2">
                    {clause.comments > 0 && (
                      <div className="flex items-center space-x-1 text-xs text-muted-foreground">
                        <MessageCircle className="w-3 h-3" />
                        <span>{clause.comments}</span>
                      </div>
                    )}
                    
                    <div className="flex items-center space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                        <Brain className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                        <FileText className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </div>

                {/* Clause Content */}
                {expandedClauses.has(clause.id) && (
                  <div className="pl-10">
                    <p className="text-foreground/90 leading-relaxed text-sm">
                      {clause.content}
                    </p>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default InteractiveContractViewer;

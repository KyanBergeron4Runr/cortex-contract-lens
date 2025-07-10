
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Edit, RefreshCw, Brain, CheckCircle, GitCompare, MessageSquare
} from "lucide-react";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
  ContextMenuSeparator
} from "@/components/ui/context-menu";

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

interface ContractClauseProps {
  clause: ContractClause;
  hoveredClause: number | null;
  setHoveredClause: (id: number | null) => void;
  showInlineHighlights: boolean;
  trackChanges: boolean;
  documentMode: 'view' | 'suggest' | 'compare';
  onEdit: (id: number) => void;
  onAcceptSuggestion: (id: number) => void;
  onAcceptChange: (id: number) => void;
  onRejectChange: (id: number) => void;
  onViewReasoning: (id: number) => void;
}

const ContractClause = ({
  clause,
  hoveredClause,
  setHoveredClause,
  showInlineHighlights,
  trackChanges,
  documentMode,
  onEdit,
  onAcceptSuggestion,
  onAcceptChange,
  onRejectChange,
  onViewReasoning
}: ContractClauseProps) => {
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

  return (
    <ContextMenu>
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
                  onClick={() => onEdit(clause.id)}
                >
                  <Edit className="w-4 h-4" />
                </Button>
                
                {clause.suggested && (
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={() => onAcceptSuggestion(clause.id)}
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
                    onClick={() => onViewReasoning(clause.id)}
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
                  onClick={() => onAcceptSuggestion(clause.id)}
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
                  onClick={() => onAcceptChange(clause.id)}
                >
                  <CheckCircle className="w-4 h-4 mr-1" />
                  Accept
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => onRejectChange(clause.id)}
                >
                  Reject
                </Button>
              </div>
            </div>
          )}
        </div>
      </ContextMenuTrigger>
      
      <ContextMenuContent>
        <ContextMenuItem onClick={() => onEdit(clause.id)}>
          <Edit className="w-4 h-4 mr-2" />
          Edit Clause
        </ContextMenuItem>
        {clause.suggested && (
          <ContextMenuItem onClick={() => onAcceptSuggestion(clause.id)}>
            <RefreshCw className="w-4 h-4 mr-2" />
            Accept AI Suggestion
          </ContextMenuItem>
        )}
        <ContextMenuItem>
          <GitCompare className="w-4 h-4 mr-2" />
          Compare to Template
        </ContextMenuItem>
        {clause.reasoning && (
          <ContextMenuItem onClick={() => onViewReasoning(clause.id)}>
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
            <ContextMenuItem onClick={() => onAcceptChange(clause.id)}>
              <CheckCircle className="w-4 h-4 mr-2" />
              Accept Change
            </ContextMenuItem>
            <ContextMenuItem onClick={() => onRejectChange(clause.id)}>
              Reject Change
            </ContextMenuItem>
          </>
        )}
      </ContextMenuContent>
    </ContextMenu>
  );
};

export default ContractClause;

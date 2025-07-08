
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { 
  Download, 
  FileText, 
  Archive, 
  PenTool, 
  List, 
  TreePine, 
  FolderOpen, 
  Clock, 
  Tag,
  BarChart3,
  ChevronUp,
  AlertTriangle,
  CheckCircle,
  Eye,
  GitBranch,
  Highlighter
} from "lucide-react";

interface ActionControlsFooterProps {
  viewMode: 'tree' | 'list';
  onViewModeChange: (mode: 'tree' | 'list') => void;
  showInlineHighlights: boolean;
  onHighlightsToggle: (show: boolean) => void;
  trackChanges: boolean;
  onTrackChangesToggle: (track: boolean) => void;
  comparisonMode: 'template' | 'lastVersion' | 'industry';
  onComparisonModeChange: (mode: 'template' | 'lastVersion' | 'industry') => void;
}

const ActionControlsFooter = ({ 
  viewMode, 
  onViewModeChange,
  showInlineHighlights,
  onHighlightsToggle,
  trackChanges,
  onTrackChangesToggle,
  comparisonMode,
  onComparisonModeChange
}: ActionControlsFooterProps) => {
  const [showSummary, setShowSummary] = useState(false);

  return (
    <div className="bg-card border-t border-border">
      {/* Contract Analysis Summary (Expandable) */}
      {showSummary && (
        <div className="p-4 border-b border-border bg-muted/30">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-4 gap-6">
              <div className="space-y-2">
                <h4 className="text-sm font-medium flex items-center space-x-2">
                  <AlertTriangle className="w-4 h-4 text-destructive" />
                  <span>High Risk Clauses</span>
                  <Badge variant="destructive" className="text-xs">1</Badge>
                </h4>
                <div className="text-xs text-muted-foreground">
                  • Section 4: Intellectual Property
                </div>
              </div>
              
              <div className="space-y-2">
                <h4 className="text-sm font-medium flex items-center space-x-2">
                  <AlertTriangle className="w-4 h-4 text-yellow-500" />
                  <span>Medium Risk</span>
                  <Badge variant="secondary" className="text-xs">2</Badge>
                </h4>
                <div className="text-xs text-muted-foreground">
                  • Section 3: Payment Terms<br/>
                  • Section 5: Confidentiality
                </div>
              </div>
              
              <div className="space-y-2">
                <h4 className="text-sm font-medium flex items-center space-x-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span>Low Risk</span>
                  <Badge variant="outline" className="text-xs">3</Badge>
                </h4>
                <div className="text-xs text-muted-foreground">
                  • Section 1: Parties<br/>
                  • Section 2: Scope<br/>
                  • Section 6: Termination
                </div>
              </div>
              
              <div className="space-y-2">
                <h4 className="text-sm font-medium flex items-center space-x-2">
                  <BarChart3 className="w-4 h-4 text-primary" />
                  <span>Overall Score</span>
                </h4>
                <div className="text-lg font-bold text-destructive">65/100</div>
                <div className="text-xs text-muted-foreground">Requires Review</div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Main Footer Controls */}
      <div className="p-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Left Side - Analysis Summary */}
          <div className="flex items-center space-x-4">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowSummary(!showSummary)}
              className="flex items-center space-x-2"
            >
              <BarChart3 className="w-4 h-4" />
              <span>Contract Analysis Summary</span>
              <ChevronUp className={`w-4 h-4 transition-transform ${showSummary ? 'rotate-180' : ''}`} />
            </Button>
            
            <div className="flex items-center space-x-2 text-sm text-muted-foreground">
              <span>6 clauses analyzed</span>
              <span>•</span>
              <span className="text-destructive">1 high risk</span>
              <span>•</span>
              <span className="text-yellow-500">2 medium risk</span>
            </div>
          </div>

          {/* Center - View & Editing Controls */}
          <div className="flex items-center space-x-4">
            {/* View Mode Toggle */}
            <div className="flex items-center space-x-2">
              <span className="text-sm text-muted-foreground">View:</span>
              <Button
                variant={viewMode === 'list' ? 'default' : 'outline'}
                size="sm"
                onClick={() => onViewModeChange('list')}
                className="flex items-center space-x-1"
              >
                <List className="w-4 h-4" />
                <span>List</span>
              </Button>
              <Button
                variant={viewMode === 'tree' ? 'default' : 'outline'}
                size="sm"
                onClick={() => onViewModeChange('tree')}
                className="flex items-center space-x-1"
              >
                <TreePine className="w-4 h-4" />
                <span>Tree</span>
              </Button>
            </div>

            {/* Editing Controls */}
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <Highlighter className="w-4 h-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">Highlights</span>
                <Switch
                  checked={showInlineHighlights}
                  onCheckedChange={onHighlightsToggle}
                />
              </div>

              <div className="flex items-center space-x-2">
                <GitBranch className="w-4 h-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">Track Changes</span>
                <Switch
                  checked={trackChanges}
                  onCheckedChange={onTrackChangesToggle}
                />
              </div>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm" className="flex items-center space-x-2">
                    <Eye className="w-4 h-4" />
                    <span>Compare to</span>
                    <span className="capitalize text-primary">{comparisonMode === 'template' ? 'Template' : comparisonMode === 'lastVersion' ? 'Last Version' : 'Industry'}</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="center">
                  <DropdownMenuItem onClick={() => onComparisonModeChange('template')}>
                    <FileText className="w-4 h-4 mr-2" />
                    Firm Template
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => onComparisonModeChange('lastVersion')}>
                    <Clock className="w-4 h-4 mr-2" />
                    Last Version
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => onComparisonModeChange('industry')}>
                    <BarChart3 className="w-4 h-4 mr-2" />
                    Industry Average
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>

          {/* Right Side - Actions */}
          <div className="flex items-center space-x-2">
            {/* Quick Access Buttons */}
            <Button variant="outline" size="sm" className="flex items-center space-x-1">
              <FolderOpen className="w-4 h-4" />
              <span>Clause Library</span>
            </Button>
            
            <Button variant="outline" size="sm" className="flex items-center space-x-1">
              <Clock className="w-4 h-4" />
              <span>Past Contracts</span>
            </Button>
            
            <Button variant="outline" size="sm" className="flex items-center space-x-1">
              <Tag className="w-4 h-4" />
              <span>Tag Editor</span>
            </Button>

            {/* Export Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button className="flex items-center space-x-2 bg-gradient-to-r from-primary to-primary/80">
                  <Download className="w-4 h-4" />
                  <span>Export Contract</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                <DropdownMenuItem className="flex items-center space-x-2">
                  <FileText className="w-4 h-4" />
                  <span>Export as PDF</span>
                </DropdownMenuItem>
                <DropdownMenuItem className="flex items-center space-x-2">
                  <FileText className="w-4 h-4" />
                  <span>Export as DOCX</span>
                </DropdownMenuItem>
                <DropdownMenuItem className="flex items-center space-x-2">
                  <PenTool className="w-4 h-4" />
                  <span>Send to E-signature</span>
                </DropdownMenuItem>
                <DropdownMenuItem className="flex items-center space-x-2">
                  <Archive className="w-4 h-4" />
                  <span>Archive to Internal System</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ActionControlsFooter;

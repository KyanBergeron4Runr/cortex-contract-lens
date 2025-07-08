
import { useState } from "react";
import InteractiveContractViewer from "@/components/InteractiveContractViewer";
import ClauseIntelligencePanel from "@/components/ClauseIntelligencePanel";
import ActionControlsFooter from "@/components/ActionControlsFooter";
import { Button } from "@/components/ui/button";

const Index = () => {
  const [selectedClause, setSelectedClause] = useState<number | null>(null);
  const [activeTab, setActiveTab] = useState<'chat' | 'comparison' | 'memory'>('chat');
  const [viewMode, setViewMode] = useState<'tree' | 'list'>('list');

  return (
    <div className="min-h-screen bg-background text-foreground font-['Inter',sans-serif] flex flex-col">
      {/* Header */}
      <header className="bg-card border-b border-border px-6 py-4 shadow-sm">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-primary to-primary/80 rounded-xl flex items-center justify-center shadow-lg">
              <span className="text-primary-foreground font-bold text-lg">4R</span>
            </div>
            <div>
              <h1 className="text-2xl font-semibold text-foreground">4Runr Cortex</h1>
              <span className="text-sm text-muted-foreground">AI-Powered Legal Contract Analysis</span>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <Button variant="outline" size="sm">
              New Analysis
            </Button>
            <Button size="sm" className="bg-gradient-to-r from-primary to-primary/80">
              Save Project
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <div className="flex-1 flex">
        {/* Zone 1: Interactive Contract Viewer (Left 60%) */}
        <div className="flex-1 w-3/5 bg-card/30 border-r border-border">
          <InteractiveContractViewer 
            selectedClause={selectedClause}
            onClauseSelect={setSelectedClause}
            viewMode={viewMode}
          />
        </div>

        {/* Zone 2: Clause Intelligence Panel (Right 40%) */}
        <div className="w-2/5 bg-card/50">
          <ClauseIntelligencePanel 
            selectedClause={selectedClause}
            activeTab={activeTab}
            onTabChange={setActiveTab}
          />
        </div>
      </div>

      {/* Zone 3: Footer & Action Controls */}
      <ActionControlsFooter 
        viewMode={viewMode}
        onViewModeChange={setViewMode}
      />
    </div>
  );
};

export default Index;

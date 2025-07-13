
import React, { useState } from 'react';
import { MessageSquare, Bot, Send, AlertTriangle, CheckCircle, Eye, EyeOff, Edit, BookOpen, Plus, BarChart3, Users, Calendar, FileText, Settings, Highlighter, GitBranch, Download, List, TreePine, FolderOpen, Clock, Tag, PenTool, Archive } from 'lucide-react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Switch } from './ui/switch';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from './ui/dropdown-menu';
import { Tabs, TabsList, TabsTrigger } from './ui/tabs';
import ActionControlsFooter from './ActionControlsFooter';

interface FullDocumentEditorProps {
  showInlineHighlights: boolean;
  trackChanges: boolean;
  comparisonMode: 'template' | 'lastVersion' | 'industry';
}

const FullDocumentEditor = ({ showInlineHighlights, trackChanges, comparisonMode }: FullDocumentEditorProps) => {
  const [showLeftSidebar, setShowLeftSidebar] = useState(true);
  const [showRightSidebar, setShowRightSidebar] = useState(true);
  const [showFloatingAI, setShowFloatingAI] = useState(false);
  const [documentViewMode, setDocumentViewMode] = useState<'blocks' | 'document'>('document');

  // Simulate responsive behavior
  React.useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width < 1536) { // 2xl breakpoint
        setShowLeftSidebar(false);
        setShowFloatingAI(true);
      } else {
        setShowLeftSidebar(true);
        setShowFloatingAI(false);
      }
      
      if (width < 1280) { // xl breakpoint
        setShowRightSidebar(false);
      } else {
        setShowRightSidebar(true);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const clauses = [
    { id: 1, title: 'Parties and Definitions', status: 'low', content: 'This Agreement is entered into between TechCorp Inc. ("Company") and ServicePro LLC ("Service Provider"). The Company is a Delaware corporation with its principal place of business at 123 Business Ave, San Francisco, CA 94105.' },
    { id: 2, title: 'Scope of Services', status: 'low', content: 'Service Provider shall provide software development services including web application development, API integration, and technical consulting services as detailed in Exhibit A attached hereto and incorporated by reference.' },
    { id: 3, title: 'Payment Terms', status: 'medium', content: 'Company agrees to pay Service Provider $50,000 per month, payable within 30 days of invoice receipt. Late payments shall incur a 1.5% monthly service charge. All payments shall be made in U.S. dollars.' },
    { id: 4, title: 'Intellectual Property Rights', status: 'high', content: 'All intellectual property created during the term of this Agreement shall be owned exclusively by the Company. Service Provider hereby assigns all rights, title, and interest in any work product to Company.' },
    { id: 5, title: 'Confidentiality', status: 'medium', content: 'Both parties acknowledge they may have access to confidential information. Each party agrees to maintain confidentiality and not disclose such information to third parties without prior written consent.' },
    { id: 6, title: 'Termination', status: 'low', content: 'Either party may terminate this Agreement with 30 days written notice. Upon termination, all confidential information must be returned and all outstanding payments become due immediately.' }
  ];

  const getClauseStatusColor = (status: string) => {
    switch (status) {
      case 'high': return 'bg-red-50 border-red-200 text-red-900';
      case 'medium': return 'bg-yellow-50 border-yellow-200 text-yellow-900';
      case 'low': return 'bg-green-50 border-green-200 text-green-900';
      default: return 'bg-gray-50 border-gray-200 text-gray-900';
    }
  };

  return (
    <div className="h-full flex flex-col bg-background">
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
            <Tabs value={documentViewMode} onValueChange={(value) => setDocumentViewMode(value as 'blocks' | 'document')}>
              <TabsList>
                <TabsTrigger value="blocks">Clause Blocks</TabsTrigger>
                <TabsTrigger value="document">Full Document</TabsTrigger>
              </TabsList>
            </Tabs>
            <Button variant="outline" size="sm">
              New Analysis
            </Button>
            <Button size="sm" className="bg-gradient-to-r from-primary to-primary/80">
              Save Project
            </Button>
          </div>
        </div>
      </header>

      {/* Top Toolbar */}
      <div className="bg-card/50 border-b border-border px-6 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <span className="text-sm font-medium text-foreground">Mode:</span>
              <Button variant="default" size="sm" className="text-xs">Review Mode</Button>
              <Switch />
              <span className="text-xs text-muted-foreground">Edit Mode</span>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm">
              <Edit className="w-4 h-4 mr-1" />
              Format
            </Button>
            <Button variant="outline" size="sm">
              <FileText className="w-4 h-4 mr-1" />
              Save Draft
            </Button>
            <Button size="sm" className="bg-gradient-to-r from-primary to-primary/80">
              <CheckCircle className="w-4 h-4 mr-1" />
              Finalize Document
            </Button>
          </div>
        </div>
      </div>

      <div className="flex-1 flex overflow-hidden">
        {/* Left Sidebar - Contract Analysis */}
        {showLeftSidebar && (
          <div className="w-80 bg-card/30 border-r border-border p-6 overflow-y-auto">
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-foreground mb-4">Contract Analysis</h3>
                
                {/* Progress */}
                <div className="mb-6">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-foreground">Analysis Progress</span>
                    <span className="text-sm font-bold text-primary">72%</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div className="bg-primary h-2 rounded-full" style={{ width: '72%' }}></div>
                  </div>
                </div>

                {/* Risk Counters */}
                <div className="grid grid-cols-3 gap-3 mb-6">
                  <div className="bg-red-50 border border-red-200 rounded-lg p-3 text-center">
                    <div className="text-2xl font-bold text-red-600">1</div>
                    <div className="text-xs text-red-600">High Risk</div>
                  </div>
                  <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 text-center">
                    <div className="text-2xl font-bold text-yellow-600">2</div>
                    <div className="text-xs text-yellow-600">Medium Risk</div>
                  </div>
                  <div className="bg-green-50 border border-green-200 rounded-lg p-3 text-center">
                    <div className="text-2xl font-bold text-green-600">3</div>
                    <div className="text-xs text-green-600">Low Risk</div>
                  </div>
                </div>

                {/* Ask AI Button */}
                <Button className="w-full mb-6 bg-gradient-to-r from-primary to-primary/80">
                  <Bot className="w-4 h-4 mr-2" />
                  Ask AI about this section
                </Button>

                {/* Key Risk Tags */}
                <div>
                  <h4 className="text-sm font-medium text-foreground mb-3">Key Risk Areas</h4>
                  <div className="space-y-2">
                    <Badge variant="destructive" className="cursor-pointer hover:bg-red-600">
                      IP Ownership Clause
                    </Badge>
                    <Badge variant="secondary" className="cursor-pointer hover:bg-yellow-600 hover:text-white">
                      Payment Terms
                    </Badge>
                    <Badge variant="secondary" className="cursor-pointer hover:bg-yellow-600 hover:text-white">
                      Confidentiality
                    </Badge>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Main Document Area */}
        <div className="flex-1 overflow-y-auto">
          <div className="p-8 max-w-4xl mx-auto">
            <div className="bg-white shadow-lg rounded-lg p-8 space-y-8">
              <div className="text-center mb-8">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">Service Agreement</h1>
                <p className="text-gray-600">Contract Analysis & Review</p>
              </div>

              {clauses.map((clause) => (
                <div key={clause.id} 
                     className={`p-6 rounded-lg border-2 transition-all hover:shadow-md group ${getClauseStatusColor(clause.status)}`}>
                  <div className="flex items-start justify-between mb-4">
                    <h3 className="text-xl font-semibold">{clause.title}</h3>
                    <div className="flex items-center space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Button variant="ghost" size="sm">
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <MessageSquare className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Plus className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                  <p className="text-base leading-relaxed">
                    {clause.content}
                  </p>
                  {clause.status === 'high' && (
                    <div className="mt-4 p-3 bg-red-100 border border-red-200 rounded">
                      <div className="flex items-center text-red-800">
                        <AlertTriangle className="w-4 h-4 mr-2" />
                        <span className="text-sm font-medium">High Risk: IP assignment may be too broad</span>
                      </div>
                    </div>
                  )}
                  {clause.status === 'medium' && (
                    <div className="mt-4 p-3 bg-yellow-100 border border-yellow-200 rounded">
                      <div className="flex items-center text-yellow-800">
                        <AlertTriangle className="w-4 h-4 mr-2" />
                        <span className="text-sm font-medium">Medium Risk: Consider adding penalty caps</span>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Sidebar - Clause Intelligence */}
        {showRightSidebar && (
          <div className="w-96 bg-card/50 border-l border-border flex flex-col">
            {/* Tab Navigation */}
            <div className="border-b border-border">
              <div className="flex">
                <button className="flex-1 px-4 py-3 text-sm font-medium bg-primary text-primary-foreground">
                  AI Chat
                </button>
                <button className="flex-1 px-4 py-3 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted/50">
                  Compare
                </button>
                <button className="flex-1 px-4 py-3 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted/50">
                  Memory
                </button>
              </div>
            </div>

            {/* Chat Content */}
            <div className="flex-1 p-4 overflow-y-auto space-y-4">
              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                  <Bot className="w-4 h-4 text-primary-foreground" />
                </div>
                <div className="flex-1">
                  <div className="bg-muted rounded-lg p-3 text-sm">
                    I've analyzed your contract and identified several key areas that need attention. The intellectual property clause in Section 4 poses significant risk.
                  </div>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                  <Bot className="w-4 h-4 text-primary-foreground" />
                </div>
                <div className="flex-1">
                  <div className="bg-muted rounded-lg p-3 text-sm">
                    <p className="mb-3">Here are the key risks I found:</p>
                    <ul className="space-y-2 text-xs">
                      <li className="flex items-center text-red-600">
                        <AlertTriangle className="w-3 h-3 mr-2" />
                        Broad IP assignment without limitations
                      </li>
                      <li className="flex items-center text-yellow-600">
                        <AlertTriangle className="w-3 h-3 mr-2" />
                        No penalty caps on late payments
                      </li>
                      <li className="flex items-center text-yellow-600">
                        <AlertTriangle className="w-3 h-3 mr-2" />
                        Confidentiality terms lack specificity
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                  <Bot className="w-4 h-4 text-primary-foreground" />
                </div>
                <div className="flex-1">
                  <div className="bg-muted rounded-lg p-3 text-sm">
                    <p className="mb-3">My recommendations:</p>
                    <div className="space-y-2">
                      <Button variant="outline" size="sm" className="w-full justify-start text-xs">
                        <CheckCircle className="w-3 h-3 mr-2" />
                        Add IP assignment limitations
                      </Button>
                      <Button variant="outline" size="sm" className="w-full justify-start text-xs">
                        <CheckCircle className="w-3 h-3 mr-2" />
                        Cap late payment penalties
                      </Button>
                      <Button variant="outline" size="sm" className="w-full justify-start text-xs">
                        <CheckCircle className="w-3 h-3 mr-2" />
                        Define confidential information
                      </Button>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                  <Bot className="w-4 h-4 text-primary-foreground" />
                </div>
                <div className="flex-1">
                  <div className="bg-muted rounded-lg p-3 text-sm">
                    Would you like me to analyze any specific clause in more detail or suggest alternative language?
                  </div>
                  <div className="mt-2 space-x-2">
                    <Button size="sm" className="text-xs">
                      Yes, analyze IP clause
                    </Button>
                    <Button variant="outline" size="sm" className="text-xs">
                      Suggest alternatives
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            {/* Chat Input */}
            <div className="border-t border-border p-4">
              <div className="flex items-center space-x-2">
                <input 
                  type="text" 
                  placeholder="Ask about this contract..."
                  className="flex-1 px-3 py-2 text-sm border border-border rounded-md bg-background focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                />
                <Button size="sm">
                  <Send className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Floating AI Button */}
      {showFloatingAI && (
        <div className="fixed bottom-6 right-6 z-50">
          <Button 
            className="w-14 h-14 rounded-full bg-gradient-to-r from-primary to-primary/80 shadow-lg hover:shadow-xl transition-shadow"
            onClick={() => setShowRightSidebar(!showRightSidebar)}
          >
            <MessageSquare className="w-6 h-6" />
          </Button>
        </div>
      )}

      {/* Footer Controls */}
      <ActionControlsFooter 
        viewMode="list"
        onViewModeChange={() => {}}
        showInlineHighlights={showInlineHighlights}
        onHighlightsToggle={() => {}}
        trackChanges={trackChanges}
        onTrackChangesToggle={() => {}}
        comparisonMode={comparisonMode}
        onComparisonModeChange={() => {}}
      />
    </div>
  );
};

export default FullDocumentEditor;

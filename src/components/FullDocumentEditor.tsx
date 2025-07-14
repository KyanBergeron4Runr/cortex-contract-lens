import React, { useState } from 'react';
import { MessageSquare, Bot, Send, AlertTriangle, CheckCircle, Eye, EyeOff, Edit, BookOpen, Plus, BarChart3, Users, Calendar, FileText, Settings, Highlighter, GitBranch, Download, List, TreePine, FolderOpen, Clock, Tag, PenTool, Archive, ChevronUp } from 'lucide-react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Switch } from './ui/switch';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from './ui/dropdown-menu';
import { Tabs, TabsList, TabsTrigger } from './ui/tabs';

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
  const [isEditMode, setIsEditMode] = useState(false);
  const [highlights, setHighlights] = useState(showInlineHighlights);
  const [trackingChanges, setTrackingChanges] = useState(trackChanges);
  const [currentComparisonMode, setCurrentComparisonMode] = useState(comparisonMode);
  const [chatInput, setChatInput] = useState('');
  const [showAnalysisSummary, setShowAnalysisSummary] = useState(false);

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
      case 'high': return 'bg-red-50 border-red-200 text-red-900 dark:bg-red-950 dark:border-red-800 dark:text-red-100';
      case 'medium': return 'bg-yellow-50 border-yellow-200 text-yellow-900 dark:bg-yellow-950 dark:border-yellow-800 dark:text-yellow-100';
      case 'low': return 'bg-green-50 border-green-200 text-green-900 dark:bg-green-950 dark:border-green-800 dark:text-green-100';
      default: return 'bg-muted border-border text-foreground';
    }
  };

  const handleChatSubmit = () => {
    if (chatInput.trim()) {
      console.log('Chat message:', chatInput);
      setChatInput('');
    }
  };

  const handleClauseEdit = (clauseId: number) => {
    console.log('Editing clause:', clauseId);
  };

  const handleExportContract = () => {
    console.log('Exporting contract...');
  };

  const handleNewAnalysis = () => {
    console.log('Starting new analysis...');
  };

  const handleSaveProject = () => {
    console.log('Saving project...');
  };

  return (
    <div className="h-full flex flex-col bg-background text-foreground">
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
            <Button variant="outline" size="sm" onClick={handleNewAnalysis}>
              New Analysis
            </Button>
            <Button size="sm" className="bg-gradient-to-r from-primary to-primary/80" onClick={handleSaveProject}>
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
              <Button 
                variant={isEditMode ? "outline" : "default"} 
                size="sm" 
                className="text-xs"
                onClick={() => setIsEditMode(!isEditMode)}
              >
                {isEditMode ? "Edit Mode" : "Review Mode"}
              </Button>
              <Switch 
                checked={isEditMode}
                onCheckedChange={setIsEditMode}
              />
              <span className="text-xs text-muted-foreground">Edit Mode</span>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm" onClick={() => console.log('Format clicked')}>
              <Edit className="w-4 h-4 mr-1" />
              Format
            </Button>
            <Button variant="outline" size="sm" onClick={() => console.log('Save draft clicked')}>
              <FileText className="w-4 h-4 mr-1" />
              Save Draft
            </Button>
            <Button size="sm" className="bg-gradient-to-r from-primary to-primary/80" onClick={() => console.log('Finalize document clicked')}>
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
                  <div className="bg-red-950 border border-red-800 rounded-lg p-3 text-center">
                    <div className="text-2xl font-bold text-red-400">1</div>
                    <div className="text-xs text-red-400">High Risk</div>
                  </div>
                  <div className="bg-yellow-950 border border-yellow-800 rounded-lg p-3 text-center">
                    <div className="text-2xl font-bold text-yellow-400">2</div>
                    <div className="text-xs text-yellow-400">Medium Risk</div>
                  </div>
                  <div className="bg-green-950 border border-green-800 rounded-lg p-3 text-center">
                    <div className="text-2xl font-bold text-green-400">3</div>
                    <div className="text-xs text-green-400">Low Risk</div>
                  </div>
                </div>

                {/* Ask AI Button */}
                <Button className="w-full mb-6 bg-gradient-to-r from-primary to-primary/80" onClick={() => console.log('Ask AI clicked')}>
                  <Bot className="w-4 h-4 mr-2" />
                  Ask AI about this section
                </Button>

                {/* Key Risk Tags */}
                <div>
                  <h4 className="text-sm font-medium text-foreground mb-3">Key Risk Areas</h4>
                  <div className="space-y-2">
                    <Badge variant="destructive" className="cursor-pointer hover:bg-red-600" onClick={() => console.log('IP Ownership clicked')}>
                      IP Ownership Clause
                    </Badge>
                    <Badge variant="secondary" className="cursor-pointer hover:bg-yellow-600 hover:text-white" onClick={() => console.log('Payment Terms clicked')}>
                      Payment Terms
                    </Badge>
                    <Badge variant="secondary" className="cursor-pointer hover:bg-yellow-600 hover:text-white" onClick={() => console.log('Confidentiality clicked')}>
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
            <div className="bg-card shadow-lg rounded-lg p-8 space-y-8 border border-border">
              <div className="text-center mb-8">
                <h1 className="text-3xl font-bold text-foreground mb-2">Service Agreement</h1>
                <p className="text-muted-foreground">Contract Analysis & Review</p>
              </div>

              {clauses.map((clause) => (
                <div key={clause.id} 
                     className={`p-6 rounded-lg border-2 transition-all hover:shadow-md group ${getClauseStatusColor(clause.status)}`}>
                  <div className="flex items-start justify-between mb-4">
                    <h3 className="text-xl font-semibold">{clause.title}</h3>
                    <div className="flex items-center space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Button variant="ghost" size="sm" onClick={() => handleClauseEdit(clause.id)}>
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="sm" onClick={() => console.log('Comment on clause:', clause.id)}>
                        <MessageSquare className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="sm" onClick={() => console.log('Add to clause:', clause.id)}>
                        <Plus className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                  <p className="text-base leading-relaxed">
                    {clause.content}
                  </p>
                  {clause.status === 'high' && (
                    <div className="mt-4 p-3 bg-red-100 dark:bg-red-950 border border-red-200 dark:border-red-800 rounded">
                      <div className="flex items-center text-red-800 dark:text-red-200">
                        <AlertTriangle className="w-4 h-4 mr-2" />
                        <span className="text-sm font-medium">High Risk: IP assignment may be too broad</span>
                      </div>
                    </div>
                  )}
                  {clause.status === 'medium' && (
                    <div className="mt-4 p-3 bg-yellow-100 dark:bg-yellow-950 border border-yellow-200 dark:border-yellow-800 rounded">
                      <div className="flex items-center text-yellow-800 dark:text-yellow-200">
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
                  <div className="bg-muted rounded-lg p-3 text-sm text-foreground">
                    I've analyzed your contract and identified several key areas that need attention. The intellectual property clause in Section 4 poses significant risk.
                  </div>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                  <Bot className="w-4 h-4 text-primary-foreground" />
                </div>
                <div className="flex-1">
                  <div className="bg-muted rounded-lg p-3 text-sm text-foreground">
                    <p className="mb-3">Here are the key risks I found:</p>
                    <ul className="space-y-2 text-xs">
                      <li className="flex items-center text-red-600 dark:text-red-400">
                        <AlertTriangle className="w-3 h-3 mr-2" />
                        Broad IP assignment without limitations
                      </li>
                      <li className="flex items-center text-yellow-600 dark:text-yellow-400">
                        <AlertTriangle className="w-3 h-3 mr-2" />
                        No penalty caps on late payments
                      </li>
                      <li className="flex items-center text-yellow-600 dark:text-yellow-400">
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
                  <div className="bg-muted rounded-lg p-3 text-sm text-foreground">
                    <p className="mb-3">My recommendations:</p>
                    <div className="space-y-2">
                      <Button variant="outline" size="sm" className="w-full justify-start text-xs" onClick={() => console.log('Add IP limitations')}>
                        <CheckCircle className="w-3 h-3 mr-2" />
                        Add IP assignment limitations
                      </Button>
                      <Button variant="outline" size="sm" className="w-full justify-start text-xs" onClick={() => console.log('Cap penalties')}>
                        <CheckCircle className="w-3 h-3 mr-2" />
                        Cap late payment penalties
                      </Button>
                      <Button variant="outline" size="sm" className="w-full justify-start text-xs" onClick={() => console.log('Define confidential info')}>
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
                  <div className="bg-muted rounded-lg p-3 text-sm text-foreground">
                    Would you like me to analyze any specific clause in more detail or suggest alternative language?
                  </div>
                  <div className="mt-2 space-x-2">
                    <Button size="sm" className="text-xs" onClick={() => console.log('Analyze IP clause')}>
                      Yes, analyze IP clause
                    </Button>
                    <Button variant="outline" size="sm" className="text-xs" onClick={() => console.log('Suggest alternatives')}>
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
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleChatSubmit()}
                  className="flex-1 px-3 py-2 text-sm border border-border rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                />
                <Button size="sm" onClick={handleChatSubmit}>
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

      {/* Footer Controls - ActionControlsFooter equivalent */}
      <footer className="bg-card/50 border-t border-border">
        <div className="p-4">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            {/* Left section - Analysis Summary */}
            <div className="flex items-center space-x-4">
              <Button 
                className="flex items-center space-x-2" 
                variant="outline"
                onClick={() => setShowAnalysisSummary(!showAnalysisSummary)}
              >
                <BarChart3 className="w-4 h-4" />
                <span>Contract Analysis Summary</span>
                <ChevronUp className={`w-4 h-4 transition-transform ${showAnalysisSummary ? 'rotate-180' : ''}`} />
              </Button>

              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                <span>6 clauses analyzed</span>
                <span>•</span>
                <span className="text-destructive">1 high risk</span>
                <span>•</span>
                <span className="text-yellow-500">2 medium risk</span>
              </div>
            </div>

            {/* Center section - View controls */}
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <span className="text-sm text-muted-foreground">View:</span>
                <Button 
                  variant="default" 
                  size="sm" 
                  className="flex items-center space-x-1"
                  onClick={() => console.log('List view selected')}
                >
                  <List className="w-4 h-4" />
                  <span>List</span>
                </Button>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="flex items-center space-x-1"
                  onClick={() => console.log('Tree view selected')}
                >
                  <TreePine className="w-4 h-4" />
                  <span>Tree</span>
                </Button>
              </div>

              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <Highlighter className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">Highlights</span>
                  <Switch 
                    checked={highlights}
                    onCheckedChange={setHighlights}
                  />
                </div>

                <div className="flex items-center space-x-2">
                  <GitBranch className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">Track Changes</span>
                  <Switch 
                    checked={trackingChanges}
                    onCheckedChange={setTrackingChanges}
                  />
                </div>

                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" className="flex items-center space-x-2">
                      <Eye className="w-4 h-4" />
                      <span>Compare to</span>
                      <span className="capitalize text-primary">{currentComparisonMode}</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="bg-popover border border-border">
                    <DropdownMenuItem onClick={() => setCurrentComparisonMode('template')} className="text-popover-foreground hover:bg-accent hover:text-accent-foreground">
                      Template
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setCurrentComparisonMode('lastVersion')} className="text-popover-foreground hover:bg-accent hover:text-accent-foreground">
                      Last Version
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setCurrentComparisonMode('industry')} className="text-popover-foreground hover:bg-accent hover:text-accent-foreground">
                      Industry Standard
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>

            {/* Right section - Action buttons */}
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm" className="flex items-center space-x-1" onClick={() => console.log('Clause Library clicked')}>
                <FolderOpen className="w-4 h-4" />
                <span>Clause Library</span>
              </Button>

              <Button variant="outline" size="sm" className="flex items-center space-x-1" onClick={() => console.log('Past Contracts clicked')}>
                <Clock className="w-4 h-4" />
                <span>Past Contracts</span>
              </Button>

              <Button variant="outline" size="sm" className="flex items-center space-x-1" onClick={() => console.log('Tag Editor clicked')}>
                <Tag className="w-4 h-4" />
                <span>Tag Editor</span>
              </Button>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button className="flex items-center space-x-2 bg-gradient-to-r from-primary to-primary/80">
                    <Download className="w-4 h-4" />
                    <span>Export Contract</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="bg-popover border border-border">
                  <DropdownMenuItem onClick={() => console.log('Export as PDF')} className="text-popover-foreground hover:bg-accent hover:text-accent-foreground">
                    Export as PDF
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => console.log('Export as Word')} className="text-popover-foreground hover:bg-accent hover:text-accent-foreground">
                    Export as Word
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => console.log('Export as HTML')} className="text-popover-foreground hover:bg-accent hover:text-accent-foreground">
                    Export as HTML
                  </DropdownMenuItem>
                </DropdownMenuContent>
                </DropdownMenu>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default FullDocumentEditor;

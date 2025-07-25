import React, { useState, useEffect } from 'react';
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
  const [activeRightTab, setActiveRightTab] = useState<'chat' | 'compare' | 'memory'>('chat');

  // Simulate responsive behavior
  useEffect(() => {
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
      case 'high': return 'bg-red-950 border-red-800 text-red-100';
      case 'medium': return 'bg-yellow-950 border-yellow-800 text-yellow-100';
      case 'low': return 'bg-green-950 border-green-800 text-green-100';
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

  const handleAskAI = () => {
    console.log('Ask AI clicked');
  };

  const handleFormatClick = () => {
    console.log('Format clicked');
  };

  const handleSaveDraft = () => {
    console.log('Save draft clicked');
  };

  const handleFinalizeDocument = () => {
    console.log('Finalize document clicked');
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
            <Button variant="outline" size="sm" onClick={handleFormatClick}>
              <Edit className="w-4 h-4 mr-1" />
              Format
            </Button>
            <Button variant="outline" size="sm" onClick={handleSaveDraft}>
              <FileText className="w-4 h-4 mr-1" />
              Save Draft
            </Button>
            <Button size="sm" className="bg-gradient-to-r from-primary to-primary/80" onClick={handleFinalizeDocument}>
              <CheckCircle className="w-4 h-4 mr-1" />
              Finalize Document
            </Button>
          </div>
        </div>
      </div>

      <div className="flex-1 flex overflow-hidden">
        {/* Left Sidebar - Contract Analysis */}
        {showLeftSidebar && (
          <div className="w-80 bg-card/30 border-r border-border p-6 overflow-y-auto custom-scrollbar">
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
                <Button className="w-full mb-6 bg-gradient-to-r from-primary to-primary/80" onClick={handleAskAI}>
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
        <div className="flex-1 overflow-y-auto bg-[#0e1015] custom-scrollbar">
          <div className="flex justify-center">
            <div className="w-full max-w-5xl p-8">
              {documentViewMode === 'document' ? (
                <div className="bg-[#1a1d29] shadow-lg rounded-lg p-8 space-y-8 border border-gray-800">
                  <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-white mb-2">Service Agreement</h1>
                    <p className="text-gray-400">Contract Analysis & Review</p>
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
                        <div className="mt-4 p-3 bg-red-950 border border-red-800 rounded">
                          <div className="flex items-center text-red-200">
                            <AlertTriangle className="w-4 h-4 mr-2" />
                            <span className="text-sm font-medium">High Risk: IP assignment may be too broad</span>
                          </div>
                        </div>
                      )}
                      {clause.status === 'medium' && (
                        <div className="mt-4 p-3 bg-yellow-950 border border-yellow-800 rounded">
                          <div className="flex items-center text-yellow-200">
                            <AlertTriangle className="w-4 h-4 mr-2" />
                            <span className="text-sm font-medium">Medium Risk: Consider adding penalty caps</span>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <div className="bg-[#1a1d29] shadow-lg rounded-lg p-8 space-y-6 border border-gray-800">
                  <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-white mb-2">Clause Blocks View</h1>
                    <p className="text-gray-400">Interactive Clause Analysis</p>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {clauses.map((clause) => (
                      <div key={clause.id} 
                           className={`p-4 rounded-lg border-2 transition-all hover:shadow-md cursor-pointer ${getClauseStatusColor(clause.status)}`}>
                        <h3 className="text-lg font-semibold mb-2">{clause.title}</h3>
                        <p className="text-sm opacity-80 line-clamp-3">{clause.content}</p>
                        <div className="mt-3 flex justify-between items-center">
                          <Badge variant={clause.status === 'high' ? 'destructive' : clause.status === 'medium' ? 'secondary' : 'outline'}>
                            {clause.status} risk
                          </Badge>
                          <Button variant="ghost" size="sm" onClick={() => handleClauseEdit(clause.id)}>
                            <Edit className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right Sidebar - Clause Intelligence */}
        {showRightSidebar && (
          <div className="w-96 bg-card/50 border-l border-border flex flex-col">
            {/* Tab Navigation */}
            <div className="border-b border-border">
              <div className="flex">
                <button 
                  className={`flex-1 px-4 py-3 text-sm font-medium ${activeRightTab === 'chat' ? 'bg-primary text-primary-foreground' : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'}`}
                  onClick={() => setActiveRightTab('chat')}
                >
                  AI Chat
                </button>
                <button 
                  className={`flex-1 px-4 py-3 text-sm font-medium ${activeRightTab === 'compare' ? 'bg-primary text-primary-foreground' : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'}`}
                  onClick={() => setActiveRightTab('compare')}
                >
                  Compare
                </button>
                <button 
                  className={`flex-1 px-4 py-3 text-sm font-medium ${activeRightTab === 'memory' ? 'bg-primary text-primary-foreground' : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'}`}
                  onClick={() => setActiveRightTab('memory')}
                >
                  Memory
                </button>
              </div>
            </div>

            {/* Tab Content */}
            <div className="flex-1 overflow-y-auto custom-scrollbar">
              {activeRightTab === 'chat' && (
                <div className="p-4 space-y-4">
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
              )}

              {activeRightTab === 'compare' && (
                <div className="p-4 space-y-4">
                  <h4 className="font-medium text-sm">Smart Clause Comparison</h4>
                  
                  <div className="space-y-3">
                    <div className="bg-card border border-border rounded-lg p-3">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs font-medium text-foreground">Current Clause</span>
                        <Badge variant="destructive" className="text-xs">High Risk</Badge>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        All work product shall remain the exclusive property of Contractor...
                      </p>
                    </div>
                    
                    <div className="bg-card border border-border rounded-lg p-3">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs font-medium text-foreground">Firm Template</span>
                        <Badge variant="outline" className="text-xs">Safe</Badge>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        All work product shall be the exclusive property of Company...
                      </p>
                    </div>
                    
                    <div className="bg-card border border-border rounded-lg p-3">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs font-medium text-foreground">Industry Standard</span>
                        <Badge variant="secondary" className="text-xs">Standard</Badge>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        Joint ownership of work product with transfer rights...
                      </p>
                    </div>
                  </div>
                  
                  <div className="bg-muted/50 rounded-lg p-3">
                    <h5 className="text-xs font-medium mb-2">AI Feedback Score</h5>
                    <div className="space-y-2">
                      <div className="flex justify-between text-xs">
                        <span>Clarity</span>
                        <span className="text-yellow-500">6/10</span>
                      </div>
                      <div className="flex justify-between text-xs">
                        <span>Deviation</span>
                        <span className="text-destructive">High</span>
                      </div>
                      <div className="flex justify-between text-xs">
                        <span>Risk Level</span>
                        <span className="text-destructive">Critical</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeRightTab === 'memory' && (
                <div className="p-4 space-y-4">
                  <h4 className="font-medium text-sm">Suggestion Reasoning & Memory</h4>
                  
                  <div className="space-y-3">
                    <div className="bg-card border border-border rounded-lg p-3">
                      <div className="flex items-center space-x-2 mb-2">
                        <MessageSquare className="w-4 h-4 text-primary" />
                        <span className="text-xs font-medium">Why this suggestion?</span>
                      </div>
                      <p className="text-xs text-muted-foreground mb-2">
                        Based on analysis of 1,247 similar tech contracts, 89% retain IP rights with the hiring company.
                      </p>
                      <div className="flex items-center space-x-2">
                        <Button size="sm" variant="outline" className="text-xs">
                          Approve & Log
                        </Button>
                        <Button size="sm" variant="ghost" className="text-xs">
                          Update Memory
                        </Button>
                      </div>
                    </div>
                    
                    <div className="bg-card border border-border rounded-lg p-3">
                      <span className="text-xs font-medium">Previous Edits</span>
                      <div className="mt-2 space-y-1">
                        <div className="text-xs text-muted-foreground">• March 2024: Similar clause modified in TechCorp deal</div>
                        <div className="text-xs text-muted-foreground">• Feb 2024: IP transfer negotiated successfully</div>
                        <div className="text-xs text-muted-foreground">• Jan 2024: Added jurisdiction clause</div>
                      </div>
                    </div>
                    
                    <div className="bg-muted/50 rounded-lg p-3">
                      <span className="text-xs font-medium">Memory Database</span>
                      <div className="mt-2 space-y-1">
                        <div className="text-xs text-muted-foreground">• 1,247 analyzed contracts</div>
                        <div className="text-xs text-muted-foreground">• 89% IP retention rate</div>
                        <div className="text-xs text-muted-foreground">• 15 successful negotiations</div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Chat Input - only show for chat tab */}
            {activeRightTab === 'chat' && (
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
            )}
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
        <div className="px-2 py-3">
          <div className="max-w-full mx-auto">
            {/* Mobile-first responsive layout */}
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-3 lg:space-y-0">
              
              {/* Left section - Analysis Summary */}
              <div className="flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-3">
                <Button 
                  className="flex items-center justify-center space-x-1 text-xs" 
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    console.log('Contract Analysis Summary clicked');
                    setShowAnalysisSummary(!showAnalysisSummary);
                  }}
                >
                  <BarChart3 className="w-3 h-3" />
                  <span className="hidden sm:inline">Contract Analysis Summary</span>
                  <span className="sm:hidden">Analysis</span>
                  <ChevronUp className={`w-3 h-3 transition-transform ${showAnalysisSummary ? 'rotate-180' : ''}`} />
                </Button>

                <div className="flex items-center justify-center sm:justify-start space-x-2 text-xs text-muted-foreground">
                  <span>6 clauses</span>
                  <span>•</span>
                  <span className="text-destructive">1 high</span>
                  <span>•</span>
                  <span className="text-yellow-500">2 medium</span>
                </div>
              </div>

              {/* Center section - View controls */}
              <div className="flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-3">
                <div className="flex items-center justify-center space-x-2">
                  <span className="text-xs text-muted-foreground">View:</span>
                  <Button 
                    variant="default" 
                    size="sm" 
                    className="flex items-center space-x-1 text-xs px-2 py-1"
                    onClick={() => console.log('List view selected')}
                  >
                    <List className="w-3 h-3" />
                    <span>List</span>
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="flex items-center space-x-1 text-xs px-2 py-1"
                    onClick={() => console.log('Tree view selected')}
                  >
                    <TreePine className="w-3 h-3" />
                    <span>Tree</span>
                  </Button>
                </div>

                <div className="flex flex-wrap items-center justify-center gap-3">
                  <div className="flex items-center space-x-1">
                    <Highlighter className="w-3 h-3 text-muted-foreground" />
                    <span className="text-xs text-muted-foreground hidden sm:inline">Highlights</span>
                    <Switch 
                      checked={highlights}
                      onCheckedChange={setHighlights}
                    />
                  </div>

                  <div className="flex items-center space-x-1">
                    <GitBranch className="w-3 h-3 text-muted-foreground" />
                    <span className="text-xs text-muted-foreground hidden sm:inline">Track</span>
                    <Switch 
                      checked={trackingChanges}
                      onCheckedChange={setTrackingChanges}
                    />
                  </div>

                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline" size="sm" className="flex items-center space-x-1 text-xs px-2 py-1">
                        <Eye className="w-3 h-3" />
                        <span className="hidden sm:inline">Compare to</span>
                        <span className="capitalize text-primary text-xs">{currentComparisonMode}</span>
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
              <div className="flex flex-wrap items-center justify-center gap-1">
                <Button variant="outline" size="sm" className="flex items-center space-x-1 text-xs px-2 py-1" onClick={() => console.log('Clause Library clicked')}>
                  <FolderOpen className="w-3 h-3" />
                  <span className="hidden lg:inline">Library</span>
                </Button>

                <Button variant="outline" size="sm" className="flex items-center space-x-1 text-xs px-2 py-1" onClick={() => console.log('Past Contracts clicked')}>
                  <Clock className="w-3 h-3" />
                  <span className="hidden lg:inline">Past</span>
                </Button>

                <Button variant="outline" size="sm" className="flex items-center space-x-1 text-xs px-2 py-1" onClick={() => console.log('Tag Editor clicked')}>
                  <Tag className="w-3 h-3" />
                  <span className="hidden lg:inline">Tags</span>
                </Button>

                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button size="sm" className="flex items-center space-x-1 bg-gradient-to-r from-primary to-primary/80 text-xs px-2 py-1">
                      <Download className="w-3 h-3" />
                      <span>Export</span>
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
        </div>
      </footer>
    </div>
  );
};

export default FullDocumentEditor;

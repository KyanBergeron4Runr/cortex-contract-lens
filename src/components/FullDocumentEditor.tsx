
import { useState } from "react";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import { 
  Edit, Eye, FileText, GitCompare, Bold, Italic, Underline, 
  Undo, Redo, MessageSquare, Save, Lock, Brain, BarChart3,
  AlertTriangle, Users, Clock, CheckCircle, XCircle, Star,
  MessageCircle, BookOpen, Zap, TrendingUp, Activity,
  Copy, RefreshCw, Send, Scale, FileSearch, Lightbulb,
  Settings, Plus
} from "lucide-react";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
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

interface ChatMessage {
  id: number;
  type: 'user' | 'bot';
  content: string;
  timestamp: string;
  hasButtons?: boolean;
}

interface FullDocumentEditorProps {
  showInlineHighlights: boolean;
  trackChanges: boolean;
  comparisonMode: 'template' | 'lastVersion' | 'industry';
}

const FullDocumentEditor = ({ showInlineHighlights, trackChanges, comparisonMode }: FullDocumentEditorProps) => {
  const [selectedClause, setSelectedClause] = useState<number | null>(3);
  const [documentMode, setDocumentMode] = useState<'view' | 'suggest' | 'compare'>('view');
  const [contractScore, setContractScore] = useState(72);
  const [isEditMode, setIsEditMode] = useState(false);
  const [activeIntelligenceTab, setActiveIntelligenceTab] = useState<'chat' | 'comparison' | 'memory'>('chat');
  const [chatInput, setChatInput] = useState("");
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

  const chatMessages: ChatMessage[] = [
    {
      id: 1,
      type: 'bot',
      content: "I've completed my analysis of your contract. I found 2 high-risk clauses that need immediate attention, particularly the IP ownership in Section 4. Would you like me to provide detailed recommendations?",
      timestamp: "2:30 PM",
      hasButtons: true
    },
    {
      id: 2,
      type: 'user',
      content: "Yes, please analyze the IP clause and suggest alternatives.",
      timestamp: "2:32 PM"
    },
    {
      id: 3,
      type: 'bot',
      content: "The IP clause in Section 4 is problematic because:\n\n• Contractor retains all intellectual property\n• No transfer provisions for paid work\n• Creates significant business risk\n• Deviates from industry standard (89% of similar contracts assign IP to client)\n\nRecommendation: Modify clause to assign all work product to your company upon payment completion.",
      timestamp: "2:33 PM",
      hasButtons: true
    }
  ];

  const handleClauseClick = (clauseId: number) => {
    setSelectedClause(selectedClause === clauseId ? null : clauseId);
  };

  const handleSendMessage = () => {
    if (!chatInput.trim()) return;
    setChatInput("");
    // Simulate sending message
  };

  return (
    <div className="h-full flex bg-[#0e1015] text-white overflow-hidden relative">
      {/* Main Document Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Document Toolbar */}
        <div className="border-b border-gray-800 bg-[#0e1015] p-2 xl:p-4 flex items-center justify-between sticky top-0 z-30">
          <div className="flex items-center space-x-1 xl:space-x-2">
            {/* Mode Selector */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="flex items-center space-x-1 xl:space-x-2 border-gray-700 text-gray-300 hover:bg-gray-800 text-xs xl:text-sm px-2 xl:px-3">
                  {documentMode === 'view' && <Eye className="w-3 h-3 xl:w-4 xl:h-4" />}
                  {documentMode === 'suggest' && <FileText className="w-3 h-3 xl:w-4 xl:h-4" />}
                  {documentMode === 'compare' && <GitCompare className="w-3 h-3 xl:w-4 xl:h-4" />}
                  <span className="capitalize hidden sm:inline">{documentMode} Mode</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="bg-gray-900 border-gray-700 z-50">
                <DropdownMenuItem onClick={() => setDocumentMode('view')} className="text-gray-300 hover:bg-gray-800">
                  <Eye className="w-4 h-4 mr-2" />
                  View Mode
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setDocumentMode('suggest')} className="text-gray-300 hover:bg-gray-800">
                  <FileText className="w-4 h-4 mr-2" />
                  Suggest Mode
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setDocumentMode('compare')} className="text-gray-300 hover:bg-gray-800">
                  <GitCompare className="w-4 h-4 mr-2" />
                  Compare Mode
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <div className="w-px h-4 xl:h-6 bg-gray-700 mx-1 xl:mx-2" />

            {/* Text Formatting */}
            <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white hover:bg-gray-800 p-1 xl:p-2">
              <Bold className="w-3 h-3 xl:w-4 xl:h-4" />
            </Button>
            <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white hover:bg-gray-800 p-1 xl:p-2">
              <Italic className="w-3 h-3 xl:w-4 xl:h-4" />
            </Button>
            <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white hover:bg-gray-800 p-1 xl:p-2">
              <Underline className="w-3 h-3 xl:w-4 xl:h-4" />
            </Button>

            <div className="w-px h-4 xl:h-6 bg-gray-700 mx-1 xl:mx-2" />

            {/* History */}
            <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white hover:bg-gray-800 p-1 xl:p-2">
              <Undo className="w-3 h-3 xl:w-4 xl:h-4" />
            </Button>
            <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white hover:bg-gray-800 p-1 xl:p-2">
              <Redo className="w-3 h-3 xl:w-4 xl:h-4" />
            </Button>

            <div className="w-px h-4 xl:h-6 bg-gray-700 mx-1 xl:mx-2" />

            {/* Comment */}
            <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white hover:bg-gray-800 p-1 xl:p-2">
              <MessageSquare className="w-3 h-3 xl:w-4 xl:h-4" />
            </Button>
          </div>

          <div className="flex items-center space-x-1 xl:space-x-2">
            <Button variant="outline" size="sm" className="border-gray-700 text-gray-300 hover:bg-gray-800 text-xs xl:text-sm px-2 xl:px-3">
              <Save className="w-3 h-3 xl:w-4 xl:h-4 mr-1 xl:mr-2" />
              <span className="hidden sm:inline">Save Draft</span>
            </Button>
            <Button size="sm" className="bg-gradient-to-r from-purple-600 to-purple-700 text-white hover:from-purple-700 hover:to-purple-800 text-xs xl:text-sm px-2 xl:px-3">
              <Lock className="w-3 h-3 xl:w-4 xl:h-4 mr-1 xl:mr-2" />
              <span className="hidden sm:inline">Finalize Document</span>
            </Button>
          </div>
        </div>

        {/* Document Header */}
        <div className="p-4 xl:p-8 pb-2 xl:pb-4 border-b border-gray-800">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-xl xl:text-3xl font-bold text-white mb-2 xl:mb-3">SOFTWARE DEVELOPMENT SERVICES AGREEMENT</h1>
            <p className="text-sm xl:text-lg text-gray-300 mb-1 xl:mb-2">ABC Corporation & XYZ Services LLC</p>
            <p className="text-xs xl:text-sm text-gray-400">Effective Date: January 15, 2024 • Draft v2.1</p>
            {trackChanges && (
              <Badge variant="outline" className="mt-2 xl:mt-3 border-purple-500 text-purple-300 text-xs">
                Track Changes: ON • Comparing to {comparisonMode === 'template' ? 'Firm Template' : comparisonMode === 'lastVersion' ? 'Last Version' : 'Industry Average'}
              </Badge>
            )}
          </div>
        </div>

        {/* Mode Toggle */}
        <div className="px-4 xl:px-8 py-2 xl:py-3 border-b border-gray-800 flex justify-end">
          <div className="flex items-center space-x-2 xl:space-x-3">
            <span className="text-xs xl:text-sm text-gray-400">Review Mode</span>
            <Switch 
              checked={isEditMode}
              onCheckedChange={setIsEditMode}
            />
            <span className="text-xs xl:text-sm text-gray-400">Edit Mode</span>
          </div>
        </div>

        {/* Scrollable Document Content */}
        <div className="flex-1 overflow-y-auto custom-scrollbar">
          <div className="max-w-4xl mx-auto p-4 xl:p-8 space-y-4 xl:space-y-6">
            {contractClauses.map((clause) => (
              <ContextMenu key={clause.id}>
                <ContextMenuTrigger>
                  <div
                    className={`group relative transition-all duration-200 hover:scale-[1.01] hover:shadow-lg p-4 xl:p-6 rounded-lg border-l-4 cursor-pointer ${
                      clause.riskLevel === 'high' ? 'bg-red-500/10 border-red-500' :
                      clause.riskLevel === 'medium' ? 'bg-yellow-500/10 border-yellow-500' :
                      'bg-green-500/10 border-green-500'
                    } ${selectedClause === clause.id ? 'ring-2 ring-primary/30' : ''}`}
                    onClick={() => handleClauseClick(clause.id)}
                    onMouseEnter={() => setHoveredClause(clause.id)}
                    onMouseLeave={() => setHoveredClause(null)}
                  >
                    <div className="flex items-center justify-between mb-2 xl:mb-4">
                      <h2 className="text-base xl:text-xl font-semibold text-white">
                        {clause.section}. {clause.title}
                      </h2>

                      {/* Hover Action Icons */}
                      {hoveredClause === clause.id && (
                        <div className="flex items-center space-x-1 opacity-100 transition-opacity">
                          <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white hover:bg-gray-800 p-1.5">
                            <Edit className="w-3 h-3" />
                          </Button>
                          <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white hover:bg-gray-800 p-1.5">
                            <Brain className="w-3 h-3" />
                          </Button>
                          <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white hover:bg-gray-800 p-1.5">
                            <MessageSquare className="w-3 h-3" />
                          </Button>
                        </div>
                      )}
                    </div>

                    <div className="prose prose-sm max-w-none text-gray-300 leading-relaxed text-sm xl:text-base">
                      {clause.content}
                    </div>

                    {/* AI Note Display */}
                    {clause.aiNote && (
                      <div className={`mt-2 xl:mt-3 p-2 xl:p-3 rounded-lg border-l-4 ${
                        clause.riskLevel === 'high' ? 'bg-red-500/10 border-red-500' :
                        clause.riskLevel === 'medium' ? 'bg-yellow-500/10 border-yellow-500' :
                        'bg-green-500/10 border-green-500'
                      }`}>
                        <div className="flex items-start space-x-2">
                          <div className={`w-2 h-2 rounded-full mt-1 ${
                            clause.riskLevel === 'high' ? 'bg-red-500' :
                            clause.riskLevel === 'medium' ? 'bg-yellow-500' :
                            'bg-green-500'
                          }`}></div>
                          <div>
                            <span className="text-xs xl:text-sm font-medium text-gray-300">
                              {clause.riskLevel === 'high' ? 'AI Risk: ' : 'AI Note: '}
                            </span>
                            <span className="text-xs xl:text-sm text-gray-400 italic">
                              {clause.aiNote}
                            </span>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </ContextMenuTrigger>
                
                <ContextMenuContent className="bg-gray-900 border-gray-700 z-50">
                  <ContextMenuItem className="text-gray-300 hover:bg-gray-800">
                    <Edit className="w-4 h-4 mr-2" />
                    Edit Clause
                  </ContextMenuItem>
                  <ContextMenuItem className="text-gray-300 hover:bg-gray-800">
                    <Copy className="w-4 h-4 mr-2" />
                    Copy Text
                  </ContextMenuItem>
                  {clause.suggested && (
                    <ContextMenuItem className="text-gray-300 hover:bg-gray-800">
                      <RefreshCw className="w-4 h-4 mr-2" />
                      Accept AI Suggestion
                    </ContextMenuItem>
                  )}
                  <ContextMenuItem className="text-gray-300 hover:bg-gray-800">
                    <GitCompare className="w-4 h-4 mr-2" />
                    Compare to Template
                  </ContextMenuItem>
                  {clause.reasoning && (
                    <ContextMenuItem className="text-gray-300 hover:bg-gray-800">
                      <Brain className="w-4 h-4 mr-2" />
                      View AI Reasoning
                    </ContextMenuItem>
                  )}
                  <ContextMenuSeparator />
                  <ContextMenuItem className="text-gray-300 hover:bg-gray-800">
                    <MessageSquare className="w-4 h-4 mr-2" />
                    Add Comment
                  </ContextMenuItem>
                </ContextMenuContent>
              </ContextMenu>
            ))}
          </div>
        </div>
      </div>

      {/* Contract Analysis Sidebar */}
      <div className="w-64 xl:w-80 border-l border-gray-800 bg-[#0e1015] flex-shrink-0 hidden lg:block">
        <div className="p-3 xl:p-4 border-b border-gray-800">
          <h3 className="font-semibold text-white mb-2 text-sm xl:text-base">Contract Analysis</h3>
          <div className="flex items-center space-x-2 mb-3">
            <div className="flex-1 bg-gray-800 rounded-full h-2">
              <div 
                className="bg-gradient-to-r from-purple-500 to-purple-600 h-2 rounded-full transition-all duration-500"
                style={{ width: `${contractScore}%` }}
              />
            </div>
            <span className="text-xs xl:text-sm font-medium text-white">{contractScore}%</span>
          </div>
        </div>

        <div className="p-3 xl:p-4 space-y-3 xl:space-y-4">
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs xl:text-sm">
              <span className="text-gray-400">High Risk Clauses</span>
              <span className="text-red-400 font-medium">2</span>
            </div>
            <div className="flex items-center justify-between text-xs xl:text-sm">
              <span className="text-gray-400">Medium Risk</span>
              <span className="text-yellow-400 font-medium">2</span>
            </div>
            <div className="flex items-center justify-between text-xs xl:text-sm">
              <span className="text-gray-400">Low Risk</span>
              <span className="text-green-400 font-medium">4</span>
            </div>
          </div>

          <div className="pt-3 xl:pt-4 border-t border-gray-800">
            <Button variant="outline" className="w-full justify-start border-gray-700 text-gray-300 hover:bg-gray-800 text-xs xl:text-sm">
              <Brain className="w-3 h-3 xl:w-4 xl:h-4 mr-2" />
              Ask AI about this section
            </Button>
          </div>

          <div className="pt-3 xl:pt-4 space-y-2">
            <h4 className="text-xs xl:text-sm font-medium text-white">Key Risk Areas</h4>
            <div className="text-xs text-gray-300 space-y-2">
              <div className="p-2 bg-red-500/10 rounded border-l-2 border-red-500 cursor-pointer hover:bg-red-500/20 transition-colors">
                <div className="font-medium text-red-400 text-xs">IP Rights Issue</div>
                <div className="text-gray-400 text-xs">Section 4: Contractor retains all IP</div>
              </div>
              <div className="p-2 bg-red-500/10 rounded border-l-2 border-red-500 cursor-pointer hover:bg-red-500/20 transition-colors">
                <div className="font-medium text-red-400 text-xs">Liability Imbalance</div>
                <div className="text-gray-400 text-xs">Section 7: One-sided limitations</div>
              </div>
              <div className="p-2 bg-yellow-500/10 rounded border-l-2 border-yellow-500 cursor-pointer hover:bg-yellow-500/20 transition-colors">
                <div className="font-medium text-yellow-400 text-xs">Payment Terms</div>
                <div className="text-gray-400 text-xs">Section 3: 45-day payment period</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Clause Intelligence Panel */}
      <div className="w-64 xl:w-96 border-l border-gray-800 bg-[#0e1015] flex-shrink-0 hidden xl:block">
        <div className="h-full flex flex-col">
          <div className="p-3 xl:p-4 border-b border-gray-800">
            <h3 className="font-semibold text-white mb-2 text-sm xl:text-base">Clause Intelligence</h3>
            {selectedClause && (
              <p className="text-xs xl:text-sm text-gray-400">
                Analyzing Section {contractClauses.find(c => c.id === selectedClause)?.section}
              </p>
            )}
          </div>

          <Tabs value={activeIntelligenceTab} onValueChange={(value) => setActiveIntelligenceTab(value as 'chat' | 'comparison' | 'memory')} className="flex-1 flex flex-col">
            <TabsList className="grid w-full grid-cols-3 bg-gray-800 m-2">
              <TabsTrigger value="chat" className="text-xs">AI Chat</TabsTrigger>
              <TabsTrigger value="comparison" className="text-xs">Compare</TabsTrigger>
              <TabsTrigger value="memory" className="text-xs">Memory</TabsTrigger>
            </TabsList>

            <TabsContent value="chat" className="flex-1 flex flex-col m-0">
              <div className="flex-1 overflow-y-auto p-3 xl:p-4 space-y-3 xl:space-y-4">
                {chatMessages.map((message) => (
                  <div key={message.id} className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                    <div className={`flex items-start space-x-2 max-w-[85%] ${message.type === 'user' ? 'flex-row-reverse space-x-reverse' : 'flex-row'}`}>
                      <div className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 ${
                        message.type === 'user' 
                          ? 'bg-primary' 
                          : 'bg-gradient-to-br from-purple-500 to-purple-600'
                      }`}>
                        {message.type === 'user' ? (
                          <div className="w-3 h-3 bg-white rounded-full" />
                        ) : (
                          <Brain className="w-3 h-3 text-white" />
                        )}
                      </div>
                      <div className={`rounded-lg p-3 ${
                        message.type === 'user' 
                          ? 'bg-primary text-primary-foreground' 
                          : 'bg-gray-800/50 text-gray-300'
                      }`}>
                        <div className="text-xs xl:text-sm whitespace-pre-line">{message.content}</div>
                        
                        {message.hasButtons && message.type === 'bot' && (
                          <div className="mt-2 space-y-1">
                            <Button size="sm" variant="outline" className="text-xs w-full justify-start border-gray-600 text-gray-300 hover:bg-gray-700">
                              Yes, analyze the risks
                            </Button>
                            <Button size="sm" variant="outline" className="text-xs w-full justify-start border-gray-600 text-gray-300 hover:bg-gray-700">
                              Show me alternatives
                            </Button>
                          </div>
                        )}
                        
                        <p className="text-xs opacity-60 mt-2">{message.timestamp}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              {/* Quick Questions */}
              <div className="p-3 xl:p-4 border-t border-gray-800 bg-gray-900/30">
                <p className="text-xs text-gray-400 mb-2">💡 Quick Questions:</p>
                <div className="space-y-1">
                  <Button variant="ghost" size="sm" className="w-full justify-start text-xs h-7 text-gray-400 hover:text-white hover:bg-gray-800">
                    Is this clause typical for our firm?
                  </Button>
                  <Button variant="ghost" size="sm" className="w-full justify-start text-xs h-7 text-gray-400 hover:text-white hover:bg-gray-800">
                    What's the risk level here?
                  </Button>
                  <Button variant="ghost" size="sm" className="w-full justify-start text-xs h-7 text-gray-400 hover:text-white hover:bg-gray-800">
                    Compare to industry standard
                  </Button>
                </div>
              </div>

              {/* Chat Input */}
              <div className="p-3 xl:p-4 border-t border-gray-800">
                <div className="flex space-x-2">
                  <Input
                    placeholder="Ask about contract risks..."
                    value={chatInput}
                    onChange={(e) => setChatInput(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                    className="flex-1 text-xs xl:text-sm bg-gray-800 border-gray-700 text-white placeholder-gray-400"
                  />
                  <Button size="sm" onClick={handleSendMessage} className="bg-purple-600 hover:bg-purple-700">
                    <Send className="w-3 h-3 xl:w-4 xl:h-4" />
                  </Button>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="comparison" className="flex-1 m-0 p-3 xl:p-4">
              <div className="space-y-4">
                <h4 className="font-medium text-sm">Smart Clause Comparison</h4>
                
                <div className="space-y-3">
                  <div className="bg-gray-800/30 rounded p-3">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-xs font-medium text-gray-300">vs. Firm Template</span>
                      <Badge variant="destructive" className="text-xs">-35%</Badge>
                    </div>
                    <Progress value={35} className="h-1" />
                  </div>
                  
                  <div className="bg-gray-800/30 rounded p-3">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-xs font-medium text-gray-300">vs. Industry Standard</span>
                      <Badge variant="outline" className="text-yellow-400 border-yellow-400 text-xs">58%</Badge>
                    </div>
                    <Progress value={58} className="h-1" />
                  </div>
                  
                  <div className="bg-gray-800/30 rounded p-3">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-xs font-medium text-gray-300">Legal Compliance</span>
                      <Badge variant="outline" className="text-green-400 border-green-400 text-xs">89%</Badge>
                    </div>
                    <Progress value={89} className="h-1" />
                  </div>
                </div>

                <div className="mt-4">
                  <h5 className="text-xs font-medium text-white mb-2">Key Differences</h5>
                  <div className="space-y-2 text-xs">
                    <div className="bg-red-500/10 rounded p-2 border-l-2 border-red-500">
                      <span className="text-red-400 font-medium">Payment Terms:</span>
                      <span className="text-gray-400 ml-1">45 days vs 30 days standard</span>
                    </div>
                    <div className="bg-yellow-500/10 rounded p-2 border-l-2 border-yellow-500">
                      <span className="text-yellow-400 font-medium">IP Assignment:</span>
                      <span className="text-gray-400 ml-1">Contractor retains vs client owns</span>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="memory" className="flex-1 m-0 p-3 xl:p-4">
              <div className="space-y-4">
                <div>
                  <h4 className="text-sm font-medium text-white mb-2">Project Context</h4>
                  <div className="space-y-2 text-xs text-gray-400">
                    <div className="bg-gray-800/30 rounded p-2">
                      <span className="text-purple-400">Client:</span> ABC Corporation (Delaware Corp)
                    </div>
                    <div className="bg-gray-800/30 rounded p-2">
                      <span className="text-purple-400">Service:</span> Software Development
                    </div>
                    <div className="bg-gray-800/30 rounded p-2">
                      <span className="text-purple-400">Value:</span> $150,000 total
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="text-sm font-medium text-white mb-2">Previous Analysis</h4>
                  <div className="space-y-2 text-xs">
                    <div className="bg-gray-800/30 rounded p-2">
                      <div className="flex items-center space-x-2 mb-1">
                        <Clock className="w-3 h-3 text-gray-400" />
                        <span className="text-gray-400">2 hours ago</span>
                      </div>
                      <p className="text-gray-300">Flagged IP ownership issues in Section 4</p>
                    </div>
                    <div className="bg-gray-800/30 rounded p-2">
                      <div className="flex items-center space-x-2 mb-1">
                        <Clock className="w-3 h-3 text-gray-400" />
                        <span className="text-gray-400">1 day ago</span>
                      </div>
                      <p className="text-gray-300">Suggested liability cap adjustments</p>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="text-sm font-medium text-white mb-2">Related Documents</h4>
                  <div className="space-y-1 text-xs">
                    <div className="flex items-center space-x-2 p-2 bg-gray-800/30 rounded cursor-pointer hover:bg-gray-700/30">
                      <BookOpen className="w-3 h-3 text-gray-400" />
                      <span className="text-gray-300">Standard Dev Template v2.1</span>
                    </div>
                    <div className="flex items-center space-x-2 p-2 bg-gray-800/30 rounded cursor-pointer hover:bg-gray-700/30">
                      <BookOpen className="w-3 h-3 text-gray-400" />
                      <span className="text-gray-300">ABC Corp - Previous Contract</span>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>

      {/* Floating AI Chat Button */}
      <div className="fixed bottom-6 right-6 z-50">
        <Button
          size="lg"
          className="w-14 h-14 rounded-full bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 shadow-lg hover:shadow-xl transition-all duration-200"
        >
          <MessageCircle className="w-6 h-6" />
        </Button>
      </div>
    </div>
  );
};

export default FullDocumentEditor;

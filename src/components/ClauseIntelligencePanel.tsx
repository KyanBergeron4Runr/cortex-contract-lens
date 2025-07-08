
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Bot, User, Send, Brain, Scale, FileText, CheckCircle, AlertTriangle, MessageSquare } from "lucide-react";

interface ClauseIntelligencePanelProps {
  selectedClause: number | null;
  activeTab: 'chat' | 'comparison' | 'memory';
  onTabChange: (tab: 'chat' | 'comparison' | 'memory') => void;
}

interface BotMessage {
  id: number;
  type: "bot";
  content: string;
  timestamp: string;
  analysis: {
    summary: string;
    comparison: string;
    recommendation: string;
  };
}

interface UserMessage {
  id: number;
  type: "user";
  content: string;
  timestamp: string;
}

type Message = BotMessage | UserMessage;

const ClauseIntelligencePanel = ({ selectedClause, activeTab, onTabChange }: ClauseIntelligencePanelProps) => {
  const [chatInput, setChatInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      type: "bot",
      content: "I've analyzed your contract and identified several key risks. The IP clause in Section 4 requires immediate attention. How can I help you today?",
      timestamp: "2:30 PM",
      analysis: {
        summary: "High-risk IP clause detected",
        comparison: "89% of your previous contracts retain IP rights with the company",
        recommendation: "Negotiate for joint ownership or full IP transfer to protect business interests"
      }
    }
  ]);

  const handleSendMessage = () => {
    if (!chatInput.trim()) return;
    
    const newMessage: UserMessage = {
      id: messages.length + 1,
      type: "user",
      content: chatInput,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    
    setMessages([...messages, newMessage]);
    setChatInput("");
    
    // Simulate AI response
    setTimeout(() => {
      const aiResponse: BotMessage = {
        id: messages.length + 2,
        type: "bot",
        content: "Based on your query, I'm analyzing the clause against our database of similar contracts...",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        analysis: {
          summary: "Clause analysis in progress",
          comparison: "Comparing against 1,250+ similar contracts",
          recommendation: "Detailed recommendation will be provided shortly"
        }
      };
      setMessages(prev => [...prev, aiResponse]);
    }, 1000);
  };

  return (
    <div className="h-full flex flex-col">
      {/* Panel Header */}
      <div className="p-4 border-b border-border bg-card/80">
        <div className="flex items-center space-x-3 mb-3">
          <div className="w-8 h-8 bg-gradient-to-br from-primary to-primary/80 rounded-lg flex items-center justify-center">
            <Brain className="w-4 h-4 text-primary-foreground" />
          </div>
          <div>
            <h3 className="font-semibold text-foreground">Clause Intelligence</h3>
            <p className="text-xs text-muted-foreground">
              {selectedClause ? `Analyzing Section ${selectedClause}` : 'Select a clause to analyze'}
            </p>
          </div>
        </div>
        
        <Tabs value={activeTab} onValueChange={(value) => onTabChange(value as 'chat' | 'comparison' | 'memory')}>
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="chat" className="text-xs">AI Chat</TabsTrigger>
            <TabsTrigger value="comparison" className="text-xs">Compare</TabsTrigger>
            <TabsTrigger value="memory" className="text-xs">Memory</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      {/* Panel Content */}
      <div className="flex-1">
        <Tabs value={activeTab} className="h-full flex flex-col">
          {/* AI Chat Tab */}
          <TabsContent value="chat" className="flex-1 flex flex-col m-0">
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((message) => (
                <div key={message.id} className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`flex items-start space-x-2 max-w-[85%] ${message.type === 'user' ? 'flex-row-reverse space-x-reverse' : 'flex-row'}`}>
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 ${
                      message.type === 'user' 
                        ? 'bg-primary' 
                        : 'bg-gradient-to-br from-primary to-primary/80'
                    }`}>
                      {message.type === 'user' ? (
                        <User className="w-3 h-3 text-primary-foreground" />
                      ) : (
                        <Bot className="w-3 h-3 text-primary-foreground" />
                      )}
                    </div>
                    <div className={`rounded-lg p-3 ${
                      message.type === 'user' 
                        ? 'bg-primary text-primary-foreground' 
                        : 'bg-muted text-foreground'
                    }`}>
                      <div className="text-sm">{message.content}</div>
                      
                      {message.type === 'bot' && (
                        <div className="mt-3 space-y-2 border-t border-border/50 pt-2">
                          <div className="flex items-center space-x-2">
                            <Brain className="w-3 h-3 text-primary" />
                            <span className="text-xs font-medium">Analysis Summary</span>
                          </div>
                          <p className="text-xs text-muted-foreground">{message.analysis.summary}</p>
                          
                          <div className="flex items-center space-x-2">
                            <Scale className="w-3 h-3 text-primary" />
                            <span className="text-xs font-medium">Comparison</span>
                          </div>
                          <p className="text-xs text-muted-foreground">{message.analysis.comparison}</p>
                          
                          <div className="flex items-center space-x-2">
                            <CheckCircle className="w-3 h-3 text-primary" />
                            <span className="text-xs font-medium">AI Recommendation</span>
                          </div>
                          <p className="text-xs text-muted-foreground">{message.analysis.recommendation}</p>
                          
                          <Button size="sm" variant="outline" className="mt-2 text-xs">
                            Accept Suggestion
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
            <div className="p-4 border-t border-border bg-card/50">
              <p className="text-xs text-muted-foreground mb-2">💡 Quick Questions:</p>
              <div className="space-y-1">
                <Button variant="ghost" size="sm" className="w-full justify-start text-xs h-8">
                  Is this clause typical for our firm?
                </Button>
                <Button variant="ghost" size="sm" className="w-full justify-start text-xs h-8">
                  What's the risk level here?
                </Button>
                <Button variant="ghost" size="sm" className="w-full justify-start text-xs h-8">
                  Compare to industry standard
                </Button>
              </div>
            </div>

            {/* Chat Input */}
            <div className="p-4 border-t border-border">
              <div className="flex space-x-2">
                <Input
                  placeholder="Ask about contract risks..."
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  className="flex-1 text-sm"
                />
                <Button size="sm" onClick={handleSendMessage}>
                  <Send className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </TabsContent>

          {/* Comparison Tab */}
          <TabsContent value="comparison" className="flex-1 m-0 p-4">
            <div className="space-y-4">
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
          </TabsContent>

          {/* Memory Tab */}
          <TabsContent value="memory" className="flex-1 m-0 p-4">
            <div className="space-y-4">
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
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default ClauseIntelligencePanel;

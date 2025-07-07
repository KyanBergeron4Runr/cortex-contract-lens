
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Send, Bot, User, Search, Paperclip, CheckCircle } from "lucide-react";

const AIAssistant = () => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: "bot",
      content: "Hello! I'm your 4Runr Legal Assistant. I've analyzed your contract and identified several key risks. How can I help you today?",
      timestamp: "2:30 PM"
    },
    {
      id: 2,
      type: "user",
      content: "Is this clause typical for our firm?",
      timestamp: "2:31 PM"
    },
    {
      id: 3,
      type: "bot",
      content: "🔍 **Analysis Summary**: The IP clause in Section 4 is highly atypical for your firm's standards.\n\n📎 **Comparison**: 89% of your previous contracts retain IP rights with the company.\n\n✅ **AI Recommendation**: Negotiate for joint ownership or full IP transfer to protect your business interests.",
      timestamp: "2:31 PM",
      hasAnalysis: true
    }
  ]);

  const [inputMessage, setInputMessage] = useState("");

  const handleSendMessage = () => {
    if (inputMessage.trim()) {
      const newMessage = {
        id: messages.length + 1,
        type: "user" as const,
        content: inputMessage,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages([...messages, newMessage]);
      setInputMessage("");

      // Simulate AI response
      setTimeout(() => {
        const aiResponse = {
          id: messages.length + 2,
          type: "bot" as const,
          content: "🔍 **Analyzing your request...** Let me review that clause against our database and provide recommendations.",
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          hasAnalysis: false
        };
        setMessages(prev => [...prev, aiResponse]);
      }, 1000);
    }
  };

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="p-4 border-b border-purple-900/30 bg-gradient-to-r from-purple-900/40 to-purple-800/40 backdrop-blur-sm">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 bg-gradient-to-br from-purple-600 to-purple-800 rounded-full flex items-center justify-center shadow-lg shadow-purple-500/20">
            <Bot className="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 className="font-semibold text-white">4Runr Legal Assistant</h3>
            <p className="text-sm text-green-400 flex items-center">
              <div className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse"></div>
              AI Active
            </p>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-black/20">
        {messages.map((message) => (
          <div key={message.id} className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`flex items-start space-x-2 max-w-[85%] ${message.type === 'user' ? 'flex-row-reverse space-x-reverse' : 'flex-row'}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                message.type === 'user' 
                  ? 'bg-gradient-to-br from-blue-600 to-blue-700 shadow-blue-500/20' 
                  : 'bg-gradient-to-br from-purple-600 to-purple-700 shadow-purple-500/20'
              } shadow-lg`}>
                {message.type === 'user' ? (
                  <User className="w-4 h-4 text-white" />
                ) : (
                  <Bot className="w-4 h-4 text-white" />
                )}
              </div>
              <div className={`rounded-xl p-3 shadow-lg backdrop-blur-sm ${
                message.type === 'user' 
                  ? 'bg-gradient-to-br from-blue-600/90 to-blue-700/90 text-white border border-blue-500/30' 
                  : 'bg-gradient-to-br from-gray-800/90 to-gray-900/90 text-gray-100 border border-purple-500/20'
              }`}>
                <div className="text-sm whitespace-pre-line">{message.content}</div>
                
                {/* Analysis indicators for bot messages */}
                {message.type === 'bot' && message.hasAnalysis && (
                  <div className="flex items-center space-x-3 mt-2 pt-2 border-t border-purple-500/20">
                    <div className="flex items-center space-x-1 text-xs text-purple-300">
                      <Search className="w-3 h-3" />
                      <span>Analysis</span>
                    </div>
                    <div className="flex items-center space-x-1 text-xs text-purple-300">
                      <Paperclip className="w-3 h-3" />
                      <span>Reference</span>
                    </div>
                    <div className="flex items-center space-x-1 text-xs text-purple-300">
                      <CheckCircle className="w-3 h-3" />
                      <span>Recommendation</span>
                    </div>
                  </div>
                )}
                
                <p className={`text-xs mt-2 ${
                  message.type === 'user' ? 'text-blue-100' : 'text-gray-400'
                }`}>
                  {message.timestamp}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="p-4 border-t border-purple-900/30 bg-black/30">
        <p className="text-xs text-purple-300 mb-3">💡 Quick Questions:</p>
        <div className="space-y-2">
          <Button variant="ghost" size="sm" className="w-full justify-start text-xs text-gray-300 hover:bg-purple-600/20 hover:text-white">
            What clauses are missing from this contract?
          </Button>
          <Button variant="ghost" size="sm" className="w-full justify-start text-xs text-gray-300 hover:bg-purple-600/20 hover:text-white">
            Explain the payment terms risk level
          </Button>
          <Button variant="ghost" size="sm" className="w-full justify-start text-xs text-gray-300 hover:bg-purple-600/20 hover:text-white">
            Compare to our standard template
          </Button>
        </div>
      </div>

      {/* Input */}
      <div className="p-4 border-t border-purple-900/30 bg-gradient-to-r from-black/50 to-purple-950/30">
        <div className="flex space-x-2">
          <Input
            placeholder="Ask about contract risks..."
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
            className="flex-1 bg-black/50 border-purple-600/50 text-white placeholder:text-gray-400 focus:border-purple-400"
          />
          <Button 
            size="sm" 
            onClick={handleSendMessage}
            className="bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 shadow-lg shadow-purple-500/20"
          >
            <Send className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AIAssistant;

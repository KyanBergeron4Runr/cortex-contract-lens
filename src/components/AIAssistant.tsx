
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Send, Bot, User } from "lucide-react";

const AIAssistant = () => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: "bot",
      content: "Hello! I'm your 4Runr Legal Assistant. I've analyzed your contract and found several key issues. Feel free to ask me about specific clauses or risks.",
      timestamp: "2:30 PM"
    },
    {
      id: 2,
      type: "user",
      content: "What's the risk in Section 4?",
      timestamp: "2:31 PM"
    },
    {
      id: 3,
      type: "bot",
      content: "Section 4 (Intellectual Property) presents a HIGH RISK. The clause states that all work product remains with the Contractor, which is unusual for work-for-hire arrangements. Typically, companies retain IP rights for paid development work. I recommend negotiating either joint ownership or full transfer to your company.",
      timestamp: "2:31 PM"
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
          content: "I understand your question. Let me analyze that clause for you...",
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };
        setMessages(prev => [...prev, aiResponse]);
      }, 1000);
    }
  };

  return (
    <div className="h-full flex flex-col border-l border-gray-200">
      {/* Header */}
      <div className="p-4 border-b border-gray-200 bg-gray-50">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
            <Bot className="w-5 h-5 text-white" />
          </div>
          <div>
            <h3 className="font-semibold text-gray-900">4Runr Legal Assistant</h3>
            <p className="text-sm text-green-600">● Online</p>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div key={message.id} className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`flex items-start space-x-2 max-w-[80%] ${message.type === 'user' ? 'flex-row-reverse space-x-reverse' : 'flex-row'}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                message.type === 'user' ? 'bg-blue-600' : 'bg-gray-200'
              }`}>
                {message.type === 'user' ? (
                  <User className="w-4 h-4 text-white" />
                ) : (
                  <Bot className="w-4 h-4 text-gray-600" />
                )}
              </div>
              <div className={`rounded-lg p-3 ${
                message.type === 'user' 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-gray-100 text-gray-900'
              }`}>
                <p className="text-sm">{message.content}</p>
                <p className={`text-xs mt-1 ${
                  message.type === 'user' ? 'text-blue-100' : 'text-gray-500'
                }`}>
                  {message.timestamp}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="p-4 border-t border-gray-100">
        <p className="text-xs text-gray-500 mb-2">Quick Questions:</p>
        <div className="space-y-1">
          <Button variant="ghost" size="sm" className="w-full justify-start text-xs">
            What clauses are missing?
          </Button>
          <Button variant="ghost" size="sm" className="w-full justify-start text-xs">
            Explain payment terms risk
          </Button>
          <Button variant="ghost" size="sm" className="w-full justify-start text-xs">
            Compare to standard template
          </Button>
        </div>
      </div>

      {/* Input */}
      <div className="p-4 border-t border-gray-200">
        <div className="flex space-x-2">
          <Input
            placeholder="Ask about contract risks..."
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
            className="flex-1"
          />
          <Button size="sm" onClick={handleSendMessage}>
            <Send className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AIAssistant;

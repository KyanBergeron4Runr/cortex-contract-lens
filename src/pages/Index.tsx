
import { useState } from "react";
import ContractViewer from "@/components/ContractViewer";
import AIAssistant from "@/components/AIAssistant";
import SummaryPanel from "@/components/SummaryPanel";
import { Button } from "@/components/ui/button";
import { ChevronUp, ChevronDown } from "lucide-react";

const Index = () => {
  const [isSummaryExpanded, setIsSummaryExpanded] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50 font-['Inter',sans-serif]">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-6 py-4 shadow-sm">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">4R</span>
            </div>
            <div>
              <h1 className="text-xl font-semibold text-gray-900">4Runr Cortex</h1>
              <span className="text-sm text-gray-500">Demo</span>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <Button variant="outline" size="sm">
              New Review
            </Button>
            <Button size="sm">
              Save Analysis
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex h-[calc(100vh-80px)]">
        {/* Left Panel - Contract Viewer */}
        <div className="flex-1 bg-white border-r border-gray-200">
          <ContractViewer />
        </div>

        {/* Right Panel - AI Assistant */}
        <div className="w-96 bg-white">
          <AIAssistant />
        </div>
      </div>

      {/* Bottom Drawer - Summary Panel */}
      <div className={`fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg transition-all duration-300 ${
        isSummaryExpanded ? 'h-80' : 'h-16'
      }`}>
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
          <h3 className="font-semibold text-gray-900">Contract Analysis Summary</h3>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsSummaryExpanded(!isSummaryExpanded)}
          >
            {isSummaryExpanded ? <ChevronDown size={16} /> : <ChevronUp size={16} />}
          </Button>
        </div>
        {isSummaryExpanded && <SummaryPanel />}
      </div>
    </div>
  );
};

export default Index;

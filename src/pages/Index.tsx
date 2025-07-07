
import { useState } from "react";
import ContractViewer from "@/components/ContractViewer";
import AIAssistant from "@/components/AIAssistant";
import SummaryPanel from "@/components/SummaryPanel";
import { Button } from "@/components/ui/button";
import { ChevronUp, ChevronDown } from "lucide-react";

const Index = () => {
  const [isSummaryExpanded, setIsSummaryExpanded] = useState(false);

  return (
    <div className="min-h-screen bg-[#0C0C0F] text-white font-['Inter',sans-serif]">
      {/* Header */}
      <header className="bg-black/50 border-b border-purple-900/30 px-6 py-4 backdrop-blur-sm">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-purple-600 to-purple-800 rounded-xl flex items-center justify-center shadow-lg shadow-purple-500/20">
              <span className="text-white font-bold text-lg">4R</span>
            </div>
            <div>
              <h1 className="text-2xl font-semibold text-white">4Runr Cortex</h1>
              <span className="text-sm text-purple-300">Preview Mode</span>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <Button variant="outline" size="sm" className="border-purple-600/50 text-purple-300 hover:bg-purple-600/20">
              New Review
            </Button>
            <Button size="sm" className="bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800">
              Save Analysis
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex h-[calc(100vh-80px)]">
        {/* Left Panel - Contract Viewer */}
        <div className="flex-1 bg-black/30 border-r border-purple-900/30">
          <ContractViewer />
        </div>

        {/* Right Panel - AI Assistant */}
        <div className="w-96 bg-black/40 backdrop-blur-sm">
          <AIAssistant />
        </div>
      </div>

      {/* Bottom Drawer - Summary Panel */}
      <div className={`fixed bottom-0 left-0 right-0 bg-gradient-to-r from-black via-purple-950/90 to-black border-t border-purple-500/30 shadow-2xl shadow-purple-500/20 transition-all duration-300 backdrop-blur-sm ${
        isSummaryExpanded ? 'h-80' : 'h-16'
      }`}>
        <div className="flex items-center justify-between px-6 py-4 border-b border-purple-500/20">
          <h3 className="font-semibold text-white flex items-center space-x-2">
            <span>Contract Analysis Summary</span>
            <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse"></div>
          </h3>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsSummaryExpanded(!isSummaryExpanded)}
            className="text-purple-300 hover:text-white hover:bg-purple-600/30"
          >
            {isSummaryExpanded ? <ChevronDown size={16} /> : <ChevronUp size={16} />}
          </Button>
        </div>
        {isSummaryExpanded && <SummaryPanel />}
      </div>

      {/* Prototype Watermark */}
      <div className="fixed bottom-4 right-4 bg-black/70 border border-purple-500/30 rounded-lg px-3 py-1 backdrop-blur-sm">
        <p className="text-xs text-purple-300">Prototype – Not Final AI Output</p>
      </div>
    </div>
  );
};

export default Index;

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Brain, Paperclip, Save, X, Lightbulb, Scale, FileText } from "lucide-react";

interface ClauseData {
  id: number;
  title: string;
  content: string;
  risk: string;
}

interface ClauseEditorProps {
  clauseData?: ClauseData;
  onClose?: () => void;
  isEmbedded?: boolean;
}

const ClauseEditor = ({ clauseData, onClose, isEmbedded = false }: ClauseEditorProps) => {
  const [acceptSuggestion, setAcceptSuggestion] = useState(true);
  const [selectedTemplate, setSelectedTemplate] = useState("");
  const [suggestedRevision, setSuggestedRevision] = useState(
    clauseData?.id === 4 
      ? "All work product, including but not limited to source code, documentation, and derivative works, shall be the exclusive property of Company. Upon termination of this agreement, Contractor shall transfer all intellectual property rights to Company within five (5) business days."
      : clauseData?.content || "Enter your revised clause here..."
  );

  const originalClause = "All work product, including but not limited to source code, documentation, and derivative works, shall remain the exclusive property of Contractor unless explicitly transferred in writing.";

  const smartSuggestions = [
    {
      icon: <Brain className="w-4 h-4" />,
      text: "Most of your contracts include IP transfer on termination",
      type: "insight"
    },
    {
      icon: <Scale className="w-4 h-4" />,
      text: "Consider adding jurisdiction-specific IP protections",
      type: "legal"
    },
    {
      icon: <Paperclip className="w-4 h-4" />,
      text: "Use standard clause from March 2024 deal",
      type: "template"
    },
    {
      icon: <Lightbulb className="w-4 h-4" />,
      text: "AI Insight: Matches 87% of your recent contracts",
      type: "analysis"
    }
  ];

  if (!isEmbedded) {
    return (
      <div className="bg-gradient-to-r from-black via-purple-950/40 to-black border-t border-purple-500/30 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto p-6">
          <div className="mb-6">
            <h2 className="text-2xl font-semibold text-white mb-2">Clause Customization & Document Editing</h2>
            <p className="text-purple-300">Modify and enhance contract clauses with AI-powered suggestions</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Main Editing Panel */}
            <div className="lg:col-span-3 space-y-6">
              <div className="bg-black/50 border border-purple-500/30 rounded-xl p-6 shadow-2xl shadow-purple-500/10 backdrop-blur-sm">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-white">Edit Clause – Intellectual Property</h3>
                  <div className="flex items-center space-x-2 text-sm text-purple-300">
                    <span>Section 4</span>
                    <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse"></div>
                  </div>
                </div>

                {/* Original Clause */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-purple-200 mb-2">Original Clause</label>
                  <div className="bg-gray-800/50 border border-gray-600/50 rounded-lg p-4">
                    <p className="text-gray-300 text-sm leading-relaxed">{originalClause}</p>
                  </div>
                </div>

                {/* Suggested Revision */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-purple-200 mb-2">Suggested Revision</label>
                  <Textarea
                    value={suggestedRevision}
                    onChange={(e) => setSuggestedRevision(e.target.value)}
                    className="bg-black/30 border-purple-500/50 text-white placeholder:text-gray-400 focus:border-purple-400 focus:ring-purple-400/20 rounded-lg min-h-[120px] resize-none"
                    placeholder="Enter your revised clause..."
                  />
                </div>

                {/* Controls */}
                <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-2">
                      <Switch 
                        checked={acceptSuggestion}
                        onCheckedChange={setAcceptSuggestion}
                        className="data-[state=checked]:bg-purple-600"
                      />
                      <span className="text-sm text-purple-200">Accept AI Suggestion</span>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Select value={selectedTemplate} onValueChange={setSelectedTemplate}>
                      <SelectTrigger className="w-48 bg-black/30 border-purple-500/50 text-white">
                        <SelectValue placeholder="Insert from Template" />
                      </SelectTrigger>
                      <SelectContent className="bg-black border-purple-500/50">
                        <SelectItem value="nda">NDA Template</SelectItem>
                        <SelectItem value="noncompete">Non-Compete Template</SelectItem>
                        <SelectItem value="jurisdiction">Jurisdiction Template</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center space-x-4">
                <Button 
                  className="bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white px-6 py-2 shadow-lg shadow-purple-500/20 hover:shadow-purple-500/30 transition-all duration-200"
                >
                  <Save className="w-4 h-4 mr-2" />
                  Save Changes
                </Button>
                <Button 
                  variant="outline" 
                  className="border-purple-500/50 text-purple-300 hover:bg-purple-600/20 hover:border-purple-400"
                >
                  <X className="w-4 h-4 mr-2" />
                  Discard Edits
                </Button>
              </div>
            </div>

            {/* Smart Tips Sidebar */}
            <div className="space-y-4">
              <h4 className="text-lg font-semibold text-white mb-4">Smart Suggestions</h4>
              {/*smartTips.map((tip, index) => (
                <div 
                  key={index}
                  className="bg-gradient-to-r from-purple-900/60 to-purple-800/60 border border-purple-500/30 rounded-lg p-4 backdrop-blur-sm shadow-lg shadow-purple-500/10"
                >
                  <div className="flex items-start space-x-3">
                    <span className="text-lg">{tip.icon}</span>
                    <p className="text-sm text-purple-100 leading-relaxed">{tip.text}</p>
                  </div>
                </div>
              ))*/}

              <div className="bg-gradient-to-r from-black via-purple-900/40 to-black border border-purple-500/20 rounded-lg p-4 backdrop-blur-sm">
                <div className="flex items-center space-x-2 mb-2">
                  <Brain className="w-4 h-4 text-purple-400" />
                  <span className="text-sm font-medium text-purple-200">AI Insight</span>
                </div>
                <p className="text-xs text-purple-100">This clause modification aligns with 87% of similar tech service agreements in our database.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col p-6 overflow-y-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-6 pb-4 border-b border-purple-500/30">
        <div>
          <h2 className="text-xl font-semibold text-white">Editing Clause</h2>
          <p className="text-purple-300 text-sm">{clauseData?.title || "Unknown Section"}</p>
        </div>
        {onClose && (
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="text-purple-400 hover:text-white hover:bg-purple-600/30"
          >
            <X className="w-4 h-4" />
          </Button>
        )}
      </div>

      {/* Original Clause */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-purple-200 mb-2">Original Clause</label>
        <div className="bg-gray-800/50 border border-gray-600/50 rounded-lg p-4">
          <p className="text-gray-300 text-sm leading-relaxed">
            {clauseData?.content || "No original clause available"}
          </p>
        </div>
      </div>

      {/* Suggested Revision */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-purple-200 mb-2">Suggested Revision</label>
        <Textarea
          value={suggestedRevision}
          onChange={(e) => setSuggestedRevision(e.target.value)}
          className="bg-black/30 border-purple-500/50 text-white placeholder:text-gray-400 focus:border-purple-400 focus:ring-purple-400/20 rounded-lg min-h-[120px] resize-none"
          placeholder="Enter your revised clause..."
        />
      </div>

      {/* Controls */}
      <div className="mb-6 space-y-4">
        <div className="flex items-center space-x-2">
          <Switch 
            checked={acceptSuggestion}
            onCheckedChange={setAcceptSuggestion}
            className="data-[state=checked]:bg-purple-600"
          />
          <span className="text-sm text-purple-200">✅ Accept AI Suggestion</span>
        </div>

        <Select value={selectedTemplate} onValueChange={setSelectedTemplate}>
          <SelectTrigger className="bg-black/30 border-purple-500/50 text-white">
            <div className="flex items-center space-x-2">
              <FileText className="w-4 h-4" />
              <SelectValue placeholder="📎 Insert from Template" />
            </div>
          </SelectTrigger>
          <SelectContent className="bg-black border-purple-500/50">
            <SelectItem value="ip-transfer">IP Transfer Template</SelectItem>
            <SelectItem value="nda">Standard NDA Template</SelectItem>
            <SelectItem value="noncompete">Non-Compete Template</SelectItem>
            <SelectItem value="jurisdiction">Jurisdiction Template</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Smart Suggestions */}
      <div className="mb-6">
        <h4 className="text-sm font-medium text-purple-200 mb-3">Smart Suggestions</h4>
        <div className="space-y-2">
          {smartSuggestions.map((suggestion, index) => (
            <button
              key={index}
              className="w-full text-left p-3 bg-gradient-to-r from-purple-900/40 to-purple-800/40 border border-purple-500/20 rounded-lg hover:border-purple-400/50 hover:bg-purple-800/60 transition-all duration-200 backdrop-blur-sm"
            >
              <div className="flex items-start space-x-3">
                <div className="text-purple-400 mt-0.5">{suggestion.icon}</div>
                <p className="text-xs text-purple-100 leading-relaxed">{suggestion.text}</p>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="mt-auto pt-4 border-t border-purple-500/30 space-y-3">
        <Button 
          className="w-full bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white shadow-lg shadow-purple-500/20 hover:shadow-purple-500/30 transition-all duration-200"
        >
          <Save className="w-4 h-4 mr-2" />
          Save Changes
        </Button>
        <Button 
          variant="outline" 
          className="w-full border-purple-500/50 text-purple-300 hover:bg-purple-600/20 hover:border-purple-400"
          onClick={onClose}
        >
          Discard Edits
        </Button>
      </div>

      {/* AI Insight Box */}
      <div className="mt-4 bg-gradient-to-r from-black via-purple-900/40 to-black border border-purple-500/20 rounded-lg p-4 backdrop-blur-sm">
        <div className="flex items-center space-x-2 mb-2">
          <Brain className="w-4 h-4 text-purple-400" />
          <span className="text-sm font-medium text-purple-200">AI Analysis</span>
        </div>
        <p className="text-xs text-purple-100">
          This clause modification aligns with 87% of similar tech service agreements in our database. 
          Risk level reduced from HIGH to MEDIUM with suggested changes.
        </p>
      </div>
    </div>
  );
};

export default ClauseEditor;

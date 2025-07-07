
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { AlertTriangle, FileText, BarChart3, TrendingDown, XCircle, Zap } from "lucide-react";

const SummaryPanel = () => {
  const riskData = [
    { category: "Intellectual Property", risk: "High", color: "bg-red-500", icon: "🔴" },
    { category: "Payment Terms", risk: "Medium", color: "bg-yellow-500", icon: "🟡" },
    { category: "Confidentiality", risk: "Medium", color: "bg-yellow-500", icon: "🟡" },
  ];

  const missingClauses = [
    "Arbitration Clause",
    "Jurisdiction & Governing Law",
  ];

  const deviationMetrics = [
    { label: "vs. Firm Standard", score: 35, color: "bg-red-400" },
    { label: "Industry Benchmark", score: 58, color: "bg-yellow-400" },
    { label: "Legal Compliance", score: 72, color: "bg-purple-400" }
  ];

  return (
    <div className="p-6 h-64 overflow-y-auto">
      <div className="grid grid-cols-3 gap-6">
        {/* High-Risk Clauses */}
        <div className="space-y-4">
          <div className="flex items-center space-x-2">
            <AlertTriangle className="w-5 h-5 text-red-400" />
            <h4 className="font-semibold text-white">High-Risk Clauses Detected</h4>
            <Badge className="bg-red-500/20 text-red-300 border-red-500/30">3</Badge>
          </div>
          
          <div className="space-y-3">
            {riskData.map((item, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-black/40 border border-purple-500/20 rounded-lg backdrop-blur-sm">
                <div className="flex items-center space-x-2">
                  <span className="text-lg">{item.icon}</span>
                  <span className="text-sm text-gray-200">{item.category}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className={`w-2 h-2 rounded-full ${item.color}`}></div>
                  <span className="text-xs text-gray-400">{item.risk}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Missing Clauses */}
        <div className="space-y-4">
          <div className="flex items-center space-x-2">
            <FileText className="w-5 h-5 text-orange-400" />
            <h4 className="font-semibold text-white">Missing Clauses</h4>
            <Badge className="bg-orange-500/20 text-orange-300 border-orange-500/30">2</Badge>
          </div>
          
          <div className="space-y-2">
            {missingClauses.map((clause, index) => (
              <div key={index} className="flex items-center space-x-2 p-3 bg-orange-500/10 border border-orange-500/20 rounded-lg backdrop-blur-sm">
                <XCircle className="w-4 h-4 text-orange-400" />
                <span className="text-sm text-gray-200">{clause}</span>
              </div>
            ))}
          </div>
          
          <div className="mt-4 p-3 bg-gradient-to-r from-orange-900/40 to-red-900/40 border border-orange-500/30 rounded-lg backdrop-blur-sm">
            <div className="flex items-center space-x-2 mb-1">
              <Zap className="w-4 h-4 text-orange-400" />
              <span className="text-sm font-medium text-orange-200">Critical Gap</span>
            </div>
            <p className="text-xs text-orange-100">Missing arbitration clause could lead to expensive litigation costs.</p>
          </div>
        </div>

        {/* Deviation Score */}
        <div className="space-y-4">
          <div className="flex items-center space-x-2">
            <TrendingDown className="w-5 h-5 text-purple-400" />
            <h4 className="font-semibold text-white">Deviation Score</h4>
            <div className="text-2xl font-bold text-red-400">65%</div>
          </div>
          
          <div className="space-y-4">
            {deviationMetrics.map((metric, index) => (
              <div key={index} className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-200">{metric.label}</span>
                  <span className="text-sm font-medium text-white">{metric.score}%</span>
                </div>
                <Progress value={metric.score} className="h-2 bg-black/50" />
              </div>
            ))}
          </div>

          <div className="mt-4 p-3 bg-gradient-to-r from-purple-900/60 to-blue-900/60 border border-purple-500/30 rounded-lg backdrop-blur-sm">
            <div className="flex items-center space-x-2 mb-1">
              <BarChart3 className="w-4 h-4 text-purple-300" />
              <span className="text-sm font-medium text-purple-200">AI Recommendation</span>
            </div>
            <p className="text-xs text-purple-100">Contract deviates significantly from firm standards. Recommend legal review before signing.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SummaryPanel;

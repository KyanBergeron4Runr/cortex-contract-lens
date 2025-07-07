
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { AlertTriangle, FileText, BarChart3, CheckCircle, XCircle, Clock } from "lucide-react";

const SummaryPanel = () => {
  const riskData = [
    { category: "Intellectual Property", risk: "High", color: "bg-red-500" },
    { category: "Payment Terms", risk: "Medium", color: "bg-yellow-500" },
    { category: "Confidentiality", risk: "Medium", color: "bg-yellow-500" },
    { category: "Termination", risk: "Low", color: "bg-green-500" }
  ];

  const missingClauses = [
    "Arbitration Clause",
    "Jurisdiction & Governing Law",
    "Force Majeure",
    "Liability Limitation"
  ];

  const complianceMetrics = [
    { label: "Overall Compliance", score: 72, color: "bg-blue-500" },
    { label: "Risk Assessment", score: 45, color: "bg-red-500" },
    { label: "Completeness", score: 68, color: "bg-yellow-500" }
  ];

  return (
    <div className="p-6 h-64 overflow-y-auto">
      <div className="grid grid-cols-3 gap-6">
        {/* Risks Detected */}
        <div className="space-y-4">
          <div className="flex items-center space-x-2">
            <AlertTriangle className="w-5 h-5 text-red-500" />
            <h4 className="font-semibold text-gray-900">Risks Detected</h4>
            <Badge variant="destructive">3</Badge>
          </div>
          
          <div className="space-y-3">
            {riskData.map((item, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <span className="text-sm text-gray-700">{item.category}</span>
                <div className="flex items-center space-x-2">
                  <div className={`w-2 h-2 rounded-full ${item.color}`}></div>
                  <span className="text-xs text-gray-500">{item.risk}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Missing Clauses */}
        <div className="space-y-4">
          <div className="flex items-center space-x-2">
            <FileText className="w-5 h-5 text-orange-500" />
            <h4 className="font-semibold text-gray-900">Missing Clauses</h4>
            <Badge variant="secondary">4</Badge>
          </div>
          
          <div className="space-y-2">
            {missingClauses.map((clause, index) => (
              <div key={index} className="flex items-center space-x-2 p-2 bg-orange-50 rounded-lg">
                <XCircle className="w-4 h-4 text-orange-500" />
                <span className="text-sm text-gray-700">{clause}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Compliance Metrics */}
        <div className="space-y-4">
          <div className="flex items-center space-x-2">
            <BarChart3 className="w-5 h-5 text-blue-500" />
            <h4 className="font-semibold text-gray-900">Compliance Score</h4>
          </div>
          
          <div className="space-y-4">
            {complianceMetrics.map((metric, index) => (
              <div key={index} className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-700">{metric.label}</span>
                  <span className="text-sm font-medium text-gray-900">{metric.score}%</span>
                </div>
                <Progress value={metric.score} className="h-2" />
              </div>
            ))}
          </div>

          <div className="mt-4 p-3 bg-blue-50 rounded-lg">
            <div className="flex items-center space-x-2 mb-1">
              <Clock className="w-4 h-4 text-blue-600" />
              <span className="text-sm font-medium text-blue-800">Recommendation</span>
            </div>
            <p className="text-xs text-blue-700">Address IP clause before signing. Consider legal review.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SummaryPanel;


import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Edit, GitCompare, Download, MessageCircle, AlertTriangle, CheckCircle } from "lucide-react";

const ContractViewer = () => {
  const [activeComment, setActiveComment] = useState<number | null>(null);

  const contractSections = [
    {
      id: 1,
      title: "1. PARTIES",
      content: "This Agreement is entered into between ABC Corporation, a Delaware corporation ('Company'), and XYZ Services LLC, a New York limited liability company ('Contractor').",
      risk: "standard",
      hasComment: false
    },
    {
      id: 2,
      title: "2. SCOPE OF WORK",
      content: "Contractor shall provide software development services as detailed in Exhibit A, including but not limited to web application development, database management, and system integration services.",
      risk: "standard",
      hasComment: false
    },
    {
      id: 3,
      title: "3. PAYMENT TERMS",
      content: "Company shall pay Contractor a total fee of $150,000, payable in monthly installments of $25,000. Payment shall be due within 45 days of invoice receipt.",
      risk: "deviation",
      hasComment: true,
      comment: "45-day payment terms are unusually long for this type of contract. Industry standard is typically 30 days."
    },
    {
      id: 4,
      title: "4. INTELLECTUAL PROPERTY",
      content: "All work product, including but not limited to source code, documentation, and derivative works, shall remain the exclusive property of Contractor unless explicitly transferred in writing.",
      risk: "high",
      hasComment: true,
      comment: "HIGH RISK: This clause gives all IP rights to the contractor, which is unusual for work-for-hire arrangements. Consider negotiating joint ownership or full transfer to Company."
    },
    {
      id: 5,
      title: "5. CONFIDENTIALITY",
      content: "Both parties agree to maintain confidentiality of proprietary information shared during the course of this engagement for a period of two (2) years following termination.",
      risk: "deviation",
      hasComment: true,
      comment: "Two-year confidentiality period may be insufficient for proprietary technology. Consider extending to 5 years."
    },
    {
      id: 6,
      title: "6. TERMINATION",
      content: "Either party may terminate this agreement with thirty (30) days written notice. Upon termination, all work product shall be delivered to Company.",
      risk: "standard",
      hasComment: false
    }
  ];

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case "high": return "bg-red-50 border-l-4 border-red-500";
      case "deviation": return "bg-yellow-50 border-l-4 border-yellow-500";
      case "standard": return "bg-green-50 border-l-4 border-green-500";
      default: return "bg-gray-50";
    }
  };

  const getRiskIcon = (risk: string) => {
    switch (risk) {
      case "high": return <AlertTriangle className="w-4 h-4 text-red-500" />;
      case "deviation": return <AlertTriangle className="w-4 h-4 text-yellow-500" />;
      case "standard": return <CheckCircle className="w-4 h-4 text-green-500" />;
      default: return null;
    }
  };

  return (
    <div className="h-full flex flex-col">
      {/* Toolbar */}
      <div className="flex items-center justify-between p-4 border-b border-gray-200 bg-gray-50">
        <div className="flex items-center space-x-2">
          <h2 className="font-semibold text-gray-900">Service Agreement - ABC Corp & XYZ Services</h2>
          <span className="text-sm text-gray-500">• Draft v2.1</span>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm">
            <Edit className="w-4 h-4 mr-2" />
            Edit
          </Button>
          <Button variant="outline" size="sm">
            <GitCompare className="w-4 h-4 mr-2" />
            Compare
          </Button>
          <Button variant="outline" size="sm">
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      {/* Contract Content */}
      <div className="flex-1 overflow-y-auto p-6">
        <div className="max-w-4xl mx-auto space-y-6">
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold text-gray-900 mb-2">SOFTWARE DEVELOPMENT SERVICES AGREEMENT</h1>
            <p className="text-gray-600">Effective Date: January 15, 2024</p>
          </div>

          {contractSections.map((section) => (
            <div key={section.id} className="relative">
              <div className={`p-4 rounded-lg ${getRiskColor(section.risk)}`}>
                <div className="flex items-start justify-between mb-3">
                  <h3 className="font-semibold text-gray-900 flex items-center">
                    {getRiskIcon(section.risk)}
                    <span className="ml-2">{section.title}</span>
                  </h3>
                  {section.hasComment && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setActiveComment(activeComment === section.id ? null : section.id)}
                      className="text-blue-600 hover:text-blue-700"
                    >
                      <MessageCircle className="w-4 h-4" />
                    </Button>
                  )}
                </div>
                <p className="text-gray-700 leading-relaxed">{section.content}</p>
              </div>

              {/* Comment Bubble */}
              {section.hasComment && activeComment === section.id && (
                <div className="mt-3 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                  <div className="flex items-start space-x-2">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                    <div>
                      <p className="text-sm font-medium text-blue-800 mb-1">AI Analysis</p>
                      <p className="text-sm text-blue-700">{section.comment}</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ContractViewer;

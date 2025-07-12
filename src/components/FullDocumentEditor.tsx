import { useState } from "react";
import { Switch } from "@/components/ui/switch";
import DocumentToolbar from "./DocumentToolbar";
import DocumentHeader from "./DocumentHeader";
import ContractClauseComponent from "./ContractClause";
import ContractSidebar from "./ContractSidebar";
import ClauseEditDrawer from "./ClauseEditDrawer";
import ClauseIntelligencePanel from "./ClauseIntelligencePanel";

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

interface FullDocumentEditorProps {
  showInlineHighlights: boolean;
  trackChanges: boolean;
  comparisonMode: 'template' | 'lastVersion' | 'industry';
}

const FullDocumentEditor = ({ showInlineHighlights, trackChanges, comparisonMode }: FullDocumentEditorProps) => {
  const [editingClause, setEditingClause] = useState<number | null>(null);
  const [hoveredClause, setHoveredClause] = useState<number | null>(null);
  const [selectedClause, setSelectedClause] = useState<number | null>(null);
  const [documentMode, setDocumentMode] = useState<'view' | 'suggest' | 'compare'>('view');
  const [contractScore, setContractScore] = useState(72);
  const [isEditMode, setIsEditMode] = useState(false);
  const [activeIntelligenceTab, setActiveIntelligenceTab] = useState<'chat' | 'comparison' | 'memory'>('chat');
  
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

  const handleAcceptChange = (clauseId: number) => {
    console.log('Accepting change for clause:', clauseId);
    setContractScore(prev => prev + 2);
  };

  const handleRejectChange = (clauseId: number) => {
    console.log('Rejecting change for clause:', clauseId);
  };

  const handleInlineEdit = (clauseId: number) => {
    console.log('Starting inline edit for clause:', clauseId);
  };

  const handleAcceptSuggestion = (clauseId: number) => {
    console.log('Accepting AI suggestion for clause:', clauseId);
    setContractScore(prev => prev + 3);
  };

  const getClauseData = (id: number) => {
    return contractClauses.find(clause => clause.id === id);
  };

  const handleClauseClick = (clauseId: number) => {
    setSelectedClause(clauseId);
  };

  return (
    <div className="h-full flex bg-[#0e1015] text-white">
      {/* Main Document Area */}
      <div className="flex-1 flex flex-col">
        <DocumentToolbar 
          documentMode={documentMode}
          setDocumentMode={setDocumentMode}
        />

        <DocumentHeader 
          trackChanges={trackChanges}
          comparisonMode={comparisonMode}
        />

        {/* Mode Toggle */}
        <div className="px-8 py-4 border-b border-gray-800 flex justify-end">
          <div className="flex items-center space-x-3">
            <span className="text-sm text-gray-400">Review Mode</span>
            <Switch 
              checked={isEditMode}
              onCheckedChange={setIsEditMode}
            />
            <span className="text-sm text-gray-400">Edit Mode</span>
          </div>
        </div>

        {/* Scrollable Document Content with Custom Scrollbar */}
        <div className="flex-1 overflow-y-auto custom-scrollbar">
          <div className="max-w-4xl mx-auto p-8 space-y-6">
            {contractClauses.map((clause) => (
              <div
                key={clause.id}
                className={`group transition-all duration-200 hover:scale-[1.01] hover:shadow-lg p-6 rounded-lg border-l-4 cursor-pointer ${
                  clause.riskLevel === 'high' ? 'bg-red-500/10 border-red-500' :
                  clause.riskLevel === 'medium' ? 'bg-yellow-500/10 border-yellow-500' :
                  'bg-green-500/10 border-green-500'
                } ${selectedClause === clause.id ? 'ring-2 ring-primary/30' : ''}`}
                onMouseEnter={() => setHoveredClause(clause.id)}
                onMouseLeave={() => setHoveredClause(null)}
                onClick={() => handleClauseClick(clause.id)}
              >
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-semibold text-white">
                    {clause.section}. {clause.title}
                  </h2>
                </div>

                <div className="prose prose-sm max-w-none text-gray-300 leading-relaxed">
                  {clause.content}
                </div>

                {/* AI Note Display */}
                {clause.aiNote && (
                  <div className={`mt-3 p-3 rounded-lg border-l-4 ${
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
                        <span className="text-sm font-medium text-gray-300">
                          {clause.riskLevel === 'high' ? 'AI Risk: ' : 'AI Note: '}
                        </span>
                        <span className="text-sm text-gray-400 italic">
                          {clause.aiNote}
                        </span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Contract Analysis Sidebar */}
      <ContractSidebar contractScore={contractScore} />

      {/* Clause Intelligence Panel */}
      <div className="w-80 border-l border-gray-800 bg-[#0e1015]">
        <ClauseIntelligencePanel 
          selectedClause={selectedClause}
          activeTab={activeIntelligenceTab}
          onTabChange={setActiveIntelligenceTab}
        />
      </div>

      {/* Clause Edit Drawer */}
      {editingClause && (
        <ClauseEditDrawer
          clauseData={getClauseData(editingClause)}
          onClose={() => setEditingClause(null)}
          comparisonMode={comparisonMode}
        />
      )}
    </div>
  );
};

export default FullDocumentEditor;

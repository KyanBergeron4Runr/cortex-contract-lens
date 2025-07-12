
import { Badge } from "@/components/ui/badge";

interface DocumentHeaderProps {
  trackChanges: boolean;
  comparisonMode: 'template' | 'lastVersion' | 'industry';
}

const DocumentHeader = ({ trackChanges, comparisonMode }: DocumentHeaderProps) => {
  return (
    <div className="p-8 pb-4 border-b border-gray-800">
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-3xl font-bold text-white mb-3">SOFTWARE DEVELOPMENT SERVICES AGREEMENT</h1>
        <p className="text-lg text-gray-300 mb-2">ABC Corporation & XYZ Services LLC</p>
        <p className="text-sm text-gray-400">Effective Date: January 15, 2024 • Draft v2.1</p>
        {trackChanges && (
          <Badge variant="outline" className="mt-3 border-purple-500 text-purple-300">
            Track Changes: ON • Comparing to {comparisonMode === 'template' ? 'Firm Template' : comparisonMode === 'lastVersion' ? 'Last Version' : 'Industry Average'}
          </Badge>
        )}
      </div>
    </div>
  );
};

export default DocumentHeader;

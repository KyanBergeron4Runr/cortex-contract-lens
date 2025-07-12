
import { Button } from "@/components/ui/button";
import { Brain } from "lucide-react";

interface ContractSidebarProps {
  contractScore: number;
}

const ContractSidebar = ({ contractScore }: ContractSidebarProps) => {
  return (
    <div className="w-80 border-l border-gray-800 bg-[#0e1015] sticky top-0 h-screen overflow-y-auto">
      <div className="p-4 border-b border-gray-800">
        <h3 className="font-semibold text-white mb-2">Contract Analysis</h3>
        <div className="flex items-center space-x-2">
          <div className="flex-1 bg-gray-800 rounded-full h-2">
            <div 
              className="bg-gradient-to-r from-purple-500 to-purple-600 h-2 rounded-full transition-all duration-500"
              style={{ width: `${contractScore}%` }}
            />
          </div>
          <span className="text-sm font-medium text-white">{contractScore}%</span>
        </div>
      </div>

      <div className="p-4 space-y-4">
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-400">High Risk Clauses</span>
            <span className="text-red-400 font-medium">2</span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-400">Medium Risk</span>
            <span className="text-yellow-400 font-medium">2</span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-400">Low Risk</span>
            <span className="text-green-400 font-medium">4</span>
          </div>
        </div>

        <div className="pt-4 border-t border-gray-800">
          <Button variant="outline" className="w-full justify-start border-gray-700 text-gray-300 hover:bg-gray-800">
            <Brain className="w-4 h-4 mr-2" />
            Ask AI about this section
          </Button>
        </div>

        <div className="pt-4 space-y-2">
          <h4 className="text-sm font-medium text-white">Key Risk Areas</h4>
          <div className="text-xs text-gray-300 space-y-2">
            <div className="p-2 bg-red-500/10 rounded border-l-2 border-red-500">
              <div className="font-medium text-red-400">IP Rights Issue</div>
              <div className="text-gray-400">Section 4: Contractor retains all IP</div>
            </div>
            <div className="p-2 bg-red-500/10 rounded border-l-2 border-red-500">
              <div className="font-medium text-red-400">Liability Imbalance</div>
              <div className="text-gray-400">Section 7: One-sided limitations</div>
            </div>
            <div className="p-2 bg-yellow-500/10 rounded border-l-2 border-yellow-500">
              <div className="font-medium text-yellow-400">Payment Terms</div>
              <div className="text-gray-400">Section 3: 45-day payment period</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContractSidebar;

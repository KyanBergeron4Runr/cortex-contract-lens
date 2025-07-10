
import { Button } from "@/components/ui/button";
import { Brain } from "lucide-react";

interface ContractSidebarProps {
  contractScore: number;
}

const ContractSidebar = ({ contractScore }: ContractSidebarProps) => {
  return (
    <div className="w-80 border-l border-border bg-card/30 sticky top-0 h-screen overflow-y-auto">
      <div className="p-4 border-b border-border">
        <h3 className="font-semibold text-foreground mb-2">Contract Analysis</h3>
        <div className="flex items-center space-x-2">
          <div className="flex-1 bg-muted rounded-full h-2">
            <div 
              className="bg-gradient-to-r from-primary to-primary/80 h-2 rounded-full transition-all duration-500"
              style={{ width: `${contractScore}%` }}
            />
          </div>
          <span className="text-sm font-medium text-foreground">{contractScore}%</span>
        </div>
      </div>

      <div className="p-4 space-y-4">
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">High Risk Clauses</span>
            <span className="text-destructive font-medium">2</span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Medium Risk</span>
            <span className="text-yellow-500 font-medium">2</span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Low Risk</span>
            <span className="text-green-500 font-medium">4</span>
          </div>
        </div>

        <div className="pt-4 border-t border-border">
          <Button variant="outline" className="w-full justify-start">
            <Brain className="w-4 h-4 mr-2" />
            Ask AI about this section
          </Button>
        </div>

        <div className="pt-4 space-y-2">
          <h4 className="text-sm font-medium text-foreground">Key Risk Areas</h4>
          <div className="text-xs text-muted-foreground space-y-2">
            <div className="p-2 bg-red-500/10 rounded border-l-2 border-red-500">
              <div className="font-medium text-red-500">IP Rights Issue</div>
              <div>Section 4: Contractor retains all IP</div>
            </div>
            <div className="p-2 bg-red-500/10 rounded border-l-2 border-red-500">
              <div className="font-medium text-red-500">Liability Imbalance</div>
              <div>Section 7: One-sided limitations</div>
            </div>
            <div className="p-2 bg-yellow-500/10 rounded border-l-2 border-yellow-500">
              <div className="font-medium text-yellow-500">Payment Terms</div>
              <div>Section 3: 45-day payment period</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContractSidebar;

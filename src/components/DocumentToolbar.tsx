
import { Button } from "@/components/ui/button";
import { 
  Edit, Eye, FileText, GitCompare, Bold, Italic, Underline, 
  Undo, Redo, MessageSquare, Save, Lock
} from "lucide-react";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface DocumentToolbarProps {
  documentMode: 'view' | 'suggest' | 'compare';
  setDocumentMode: (mode: 'view' | 'suggest' | 'compare') => void;
}

const DocumentToolbar = ({ documentMode, setDocumentMode }: DocumentToolbarProps) => {
  return (
    <div className="border-b border-border bg-card/30 p-3 flex items-center justify-between sticky top-0 z-20">
      <div className="flex items-center space-x-1">
        {/* Mode Selector */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm" className="flex items-center space-x-2">
              {documentMode === 'view' && <Eye className="w-4 h-4" />}
              {documentMode === 'suggest' && <FileText className="w-4 h-4" />}
              {documentMode === 'compare' && <GitCompare className="w-4 h-4" />}
              <span className="capitalize">{documentMode} Mode</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem onClick={() => setDocumentMode('view')}>
              <Eye className="w-4 h-4 mr-2" />
              View Mode
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setDocumentMode('suggest')}>
              <FileText className="w-4 h-4 mr-2" />
              Suggest Mode
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setDocumentMode('compare')}>
              <GitCompare className="w-4 h-4 mr-2" />
              Compare Mode
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <div className="w-px h-6 bg-border mx-2" />

        {/* Text Formatting */}
        <Button variant="ghost" size="sm">
          <Bold className="w-4 h-4" />
        </Button>
        <Button variant="ghost" size="sm">
          <Italic className="w-4 h-4" />
        </Button>
        <Button variant="ghost" size="sm">
          <Underline className="w-4 h-4" />
        </Button>

        <div className="w-px h-6 bg-border mx-2" />

        {/* History */}
        <Button variant="ghost" size="sm">
          <Undo className="w-4 h-4" />
        </Button>
        <Button variant="ghost" size="sm">
          <Redo className="w-4 h-4" />
        </Button>

        <div className="w-px h-6 bg-border mx-2" />

        {/* Comment */}
        <Button variant="ghost" size="sm">
          <MessageSquare className="w-4 h-4" />
        </Button>
      </div>

      <div className="flex items-center space-x-2">
        <Button variant="outline" size="sm">
          <Save className="w-4 h-4 mr-2" />
          Save Draft
        </Button>
        <Button size="sm" className="bg-gradient-to-r from-primary to-primary/80">
          <Lock className="w-4 h-4 mr-2" />
          Finalize Document
        </Button>
      </div>
    </div>
  );
};

export default DocumentToolbar;

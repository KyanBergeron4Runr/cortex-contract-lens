
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
    <div className="border-b border-gray-800 bg-[#0e1015] p-3 flex items-center justify-between sticky top-0 z-20">
      <div className="flex items-center space-x-1">
        {/* Mode Selector */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm" className="flex items-center space-x-2 border-gray-700 text-gray-300 hover:bg-gray-800">
              {documentMode === 'view' && <Eye className="w-4 h-4" />}
              {documentMode === 'suggest' && <FileText className="w-4 h-4" />}
              {documentMode === 'compare' && <GitCompare className="w-4 h-4" />}
              <span className="capitalize">{documentMode} Mode</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="bg-gray-900 border-gray-700">
            <DropdownMenuItem onClick={() => setDocumentMode('view')} className="text-gray-300 hover:bg-gray-800">
              <Eye className="w-4 h-4 mr-2" />
              View Mode
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setDocumentMode('suggest')} className="text-gray-300 hover:bg-gray-800">
              <FileText className="w-4 h-4 mr-2" />
              Suggest Mode
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setDocumentMode('compare')} className="text-gray-300 hover:bg-gray-800">
              <GitCompare className="w-4 h-4 mr-2" />
              Compare Mode
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <div className="w-px h-6 bg-gray-700 mx-2" />

        {/* Text Formatting */}
        <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white hover:bg-gray-800">
          <Bold className="w-4 h-4" />
        </Button>
        <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white hover:bg-gray-800">
          <Italic className="w-4 h-4" />
        </Button>
        <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white hover:bg-gray-800">
          <Underline className="w-4 h-4" />
        </Button>

        <div className="w-px h-6 bg-gray-700 mx-2" />

        {/* History */}
        <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white hover:bg-gray-800">
          <Undo className="w-4 h-4" />
        </Button>
        <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white hover:bg-gray-800">
          <Redo className="w-4 h-4" />
        </Button>

        <div className="w-px h-6 bg-gray-700 mx-2" />

        {/* Comment */}
        <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white hover:bg-gray-800">
          <MessageSquare className="w-4 h-4" />
        </Button>
      </div>

      <div className="flex items-center space-x-2">
        <Button variant="outline" size="sm" className="border-gray-700 text-gray-300 hover:bg-gray-800">
          <Save className="w-4 h-4 mr-2" />
          Save Draft
        </Button>
        <Button size="sm" className="bg-gradient-to-r from-purple-600 to-purple-700 text-white hover:from-purple-700 hover:to-purple-800">
          <Lock className="w-4 h-4 mr-2" />
          Finalize Document
        </Button>
      </div>
    </div>
  );
};

export default DocumentToolbar;

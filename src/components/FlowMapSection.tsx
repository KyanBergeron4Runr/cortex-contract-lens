
import { GitBranch, Workflow, ArrowRight } from "lucide-react";

const FlowMapSection = () => {
  return (
    <section className="mb-20">
      <div className="text-center mb-12">
        <div className="flex items-center justify-center mb-4">
          <GitBranch className="w-8 h-8 mr-3 text-primary" />
          <h2 className="text-3xl font-semibold text-foreground">
            Cortex Workflow Architecture
          </h2>
        </div>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Explore the intelligent workflow that powers our AI-driven contract analysis, 
          from document ingestion to final recommendations.
        </p>
      </div>
      
      <div className="relative group">
        <div className="bg-gradient-to-r from-primary/20 to-primary/10 rounded-2xl p-1">
          <div className="bg-card/40 backdrop-blur-sm rounded-xl overflow-hidden shadow-2xl">
            <div className="relative aspect-video">
              <iframe
                className="w-full h-full rounded-xl"
                src="https://miro.com/app/live-embed/uXjVKzzjNkM=/?moveToViewport=-2393,-1229,5430,2739&embedId=861016749574"
                title="4Runr Cortex Workflow Diagram"
                frameBorder="0"
                scrolling="no"
                allow="fullscreen; clipboard-read; clipboard-write"
                allowFullScreen
              ></iframe>
              
              {/* Overlay for interaction hint */}
              <div className="absolute inset-0 bg-muted/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none rounded-xl">
                <div className="bg-primary/90 backdrop-blur-sm rounded-full p-4">
                  <Workflow className="w-8 h-8 text-primary-foreground" />
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Process highlights */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="flex items-center p-4 bg-card/20 backdrop-blur-sm rounded-xl border border-border/30">
            <div className="w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center mr-3">
              <span className="text-sm font-bold text-primary">1</span>
            </div>
            <div>
              <div className="text-sm font-medium text-foreground">Document Intake</div>
              <div className="text-xs text-muted-foreground">PDF & Text Processing</div>
            </div>
          </div>
          
          <div className="flex items-center p-4 bg-card/20 backdrop-blur-sm rounded-xl border border-border/30">
            <div className="w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center mr-3">
              <span className="text-sm font-bold text-primary">2</span>
            </div>
            <div>
              <div className="text-sm font-medium text-foreground">AI Analysis</div>
              <div className="text-xs text-muted-foreground">Risk & Clause Detection</div>
            </div>
          </div>
          
          <div className="flex items-center p-4 bg-card/20 backdrop-blur-sm rounded-xl border border-border/30">
            <div className="w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center mr-3">
              <span className="text-sm font-bold text-primary">3</span>
            </div>
            <div>
              <div className="text-sm font-medium text-foreground">Smart Suggestions</div>
              <div className="text-xs text-muted-foreground">Legal Recommendations</div>
            </div>
          </div>
          
          <div className="flex items-center p-4 bg-card/20 backdrop-blur-sm rounded-xl border border-border/30">
            <div className="w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center mr-3">
              <span className="text-sm font-bold text-primary">4</span>
            </div>
            <div>
              <div className="text-sm font-medium text-foreground">Export & Review</div>
              <div className="text-xs text-muted-foreground">Final Documentation</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FlowMapSection;

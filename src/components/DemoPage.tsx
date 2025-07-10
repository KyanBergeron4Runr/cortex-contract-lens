
import { ArrowRight, Play, GitBranch } from "lucide-react";
import FullDocumentEditor from "./FullDocumentEditor";
import VideoSection from "./VideoSection";
import FlowMapSection from "./FlowMapSection";

const DemoPage = () => {
  return (
    <div className="min-h-screen bg-[#0e1015] text-foreground">
      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-6 py-20">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
            4Runr Cortex Demo
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Experience the future of AI-powered legal contract analysis. See how Cortex transforms 
            complex legal documents into actionable insights for law firms and enterprise clients.
          </p>
          <div className="flex items-center justify-center mt-8">
            <ArrowRight className="w-5 h-5 mr-2 text-primary" />
            <span className="text-sm text-muted-foreground">Live Interactive Demo Below</span>
          </div>
        </div>

        {/* Section 1: UI Showcase */}
        <section className="mb-32">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-semibold mb-4 text-foreground">
              Interactive Contract Analysis
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Experience our full-featured contract editor with real-time AI analysis, 
              risk detection, and intelligent suggestions.
            </p>
          </div>
          
          <div className="bg-card/20 backdrop-blur-sm rounded-2xl border border-border/50 overflow-hidden shadow-2xl">
            <FullDocumentEditor 
              showInlineHighlights={true}
              trackChanges={false}
              comparisonMode="template"
            />
          </div>
        </section>

        {/* Section 2: Video Showcase */}
        <VideoSection />

        {/* Section 3: Flow Map */}
        <FlowMapSection />
      </div>
    </div>
  );
};

export default DemoPage;

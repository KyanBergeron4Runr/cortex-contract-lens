
import { ArrowRight, Play, GitBranch, Monitor } from "lucide-react";
import DemoHeader from "./DemoHeader";
import DemoFooter from "./DemoFooter";
import FullDocumentEditor from "./FullDocumentEditor";
import VideoSection from "./VideoSection";
import FlowMapSection from "./FlowMapSection";

const DemoPage = () => {
  return (
    <div className="min-h-screen bg-[#0e1015] text-foreground">
      <DemoHeader />
      
      {/* Hero Section */}
      <div className="max-w-full mx-auto px-6 py-20">
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

        {/* Section 1: Interactive Contract Analysis in Fake Browser - Hidden on Mobile */}
        <section className="mb-32 hidden lg:block">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center mb-4">
              <Monitor className="w-8 h-8 mr-3 text-primary" />
              <h2 className="text-3xl font-semibold text-foreground">
                Interactive Contract Analysis
              </h2>
            </div>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Experience our full-featured contract editor with real-time AI analysis, 
              risk detection, and intelligent suggestions.
            </p>
          </div>
          
          {/* Fake Browser Frame - Much Bigger */}
          <div className="bg-gradient-to-r from-primary/20 to-primary/10 rounded-2xl p-1 max-w-[95vw] mx-auto">
            <div className="bg-card/40 backdrop-blur-sm rounded-xl overflow-hidden shadow-2xl">
              {/* Browser Header */}
              <div className="bg-muted/50 px-6 py-4 flex items-center space-x-3 border-b border-border/30">
                <div className="flex space-x-3">
                  <div className="w-4 h-4 bg-red-500 rounded-full"></div>
                  <div className="w-4 h-4 bg-yellow-500 rounded-full"></div>
                  <div className="w-4 h-4 bg-green-500 rounded-full"></div>
                </div>
                <div className="flex-1 mx-6">
                  <div className="bg-background/50 rounded px-4 py-2 text-sm text-muted-foreground">
                    https://cortex.4runr.com/contract-analysis
                  </div>
                </div>
              </div>
              
              {/* Contract Editor - Much Bigger Height */}
              <div className="h-[1200px] xl:h-[1400px] 2xl:h-[1600px] overflow-hidden">
                <div className="h-full w-full">
                  <FullDocumentEditor 
                    showInlineHighlights={true}
                    trackChanges={false}
                    comparisonMode="template"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Mobile Notice - Only shown on mobile and tablet */}
        <section className="mb-32 lg:hidden">
          <div className="text-center">
            <div className="flex items-center justify-center mb-4">
              <Monitor className="w-8 h-8 mr-3 text-primary" />
              <h2 className="text-3xl font-semibold text-foreground">
                Interactive Contract Analysis
              </h2>
            </div>
            <div className="bg-muted/20 rounded-lg p-8 border border-border/30">
              <p className="text-lg text-muted-foreground mb-4">
                The interactive contract analysis demo is best experienced on desktop devices.
              </p>
              <p className="text-sm text-muted-foreground">
                Please visit this page on a larger screen to interact with our full-featured contract editor.
              </p>
            </div>
          </div>
        </section>

        {/* Section 2: Video Showcase */}
        <VideoSection />

        {/* Section 3: Flow Map */}
        <FlowMapSection />
      </div>

      <DemoFooter />
    </div>
  );
};

export default DemoPage;

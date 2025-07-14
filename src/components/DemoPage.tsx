
import { ArrowRight, Play, GitBranch, Monitor, TrendingUp } from "lucide-react";
import DemoHeader from "./DemoHeader";
import DemoFooter from "./DemoFooter";
import FullDocumentEditor from "./FullDocumentEditor";
import VideoSection from "./VideoSection";
import FlowMapSection from "./FlowMapSection";
import { Button } from "@/components/ui/button";

const DemoPage = () => {
  return (
    <div className="min-h-screen bg-[#0e1015] text-foreground">
      <DemoHeader />
      
      {/* Hero Section */}
      <div className="max-w-full mx-auto px-6 py-20">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
            4Runr Legal Infrastructure Demo
          </h1>
          <p className="text-xl text-muted-foreground max-w-4xl mx-auto leading-relaxed mb-8">
            Experience the future of AI-powered contract analysis. See how our self-hosted infrastructure 
            turns legal documents into fast, actionable insight for law firms and enterprise clients — 
            without sending your data to third-party tools.
          </p>
          <div className="flex items-center justify-center mt-8">
            <ArrowRight className="w-5 h-5 mr-2 text-primary" />
            <span className="text-sm text-muted-foreground">Live Interactive Demo Below</span>
          </div>
        </div>

        {/* Intro Paragraph */}
        <div className="max-w-4xl mx-auto mb-20">
          <div className="bg-card/20 backdrop-blur-sm rounded-xl p-8 border border-border/30">
            <p className="text-lg text-foreground leading-relaxed mb-4">
              Most AI tools look impressive but don't integrate with how real legal teams actually work. 
              What you're seeing here is different — this is legal infrastructure.
            </p>
            <p className="text-lg text-foreground leading-relaxed mb-4">
              We've built a system that reads your contracts, flags risks, explains legal language in plain English, 
              and learns from your team's preferences over time.
            </p>
            <p className="text-lg text-foreground leading-relaxed">
              It's fast, private, and fully tailored to your workflow.
            </p>
          </div>
        </div>

        {/* Section 1: Interactive Contract Analysis in Fake Browser - Hidden on Mobile */}
        <section className="mb-32 hidden lg:block">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center mb-4">
              <Monitor className="w-8 h-8 mr-3 text-primary" />
              <h2 className="text-3xl font-semibold text-foreground">
                Live Contract System Demo
              </h2>
            </div>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Interact with the AI-powered contract editor below — including live clause analysis, 
              risk detection, and smart guidance. All built on real infrastructure, not a front-end toy.
            </p>
          </div>
          
          {/* Fake Browser Frame - Much Bigger */}
          <div className="bg-gradient-to-r from-primary/20 to-primary/10 rounded-2xl p-1 max-w-[98vw] mx-auto">
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
              
              {/* Contract Editor - Much Bigger Height with proper dark theme */}
              <div className="h-[1400px] xl:h-[1600px] 2xl:h-[1800px] overflow-hidden bg-[#0e1015]">
                <div className="h-full w-full text-foreground">
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
                Live Contract System Demo
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

        {/* Section Divider */}
        <div className="flex items-center justify-center mb-32">
          <div className="h-px bg-gradient-to-r from-transparent via-border to-transparent flex-1 max-w-md"></div>
          <div className="px-6">
            <div className="w-3 h-3 bg-primary rounded-full"></div>
          </div>
          <div className="h-px bg-gradient-to-r from-transparent via-border to-transparent flex-1 max-w-md"></div>
        </div>

        {/* Section 2: Flow Map */}
        <section className="mb-32">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center mb-4">
              <GitBranch className="w-8 h-8 mr-3 text-primary" />
              <h2 className="text-3xl font-semibold text-foreground">
                How It Works: Under the Hood
              </h2>
            </div>
            <div className="max-w-3xl mx-auto">
              <p className="text-lg text-muted-foreground mb-4">
                This system is more than just a chatbot. It's a legal intelligence layer connected to your 
                documents, preferences, and firm-specific logic.
              </p>
              <p className="text-lg text-muted-foreground">
                Visualize the full infrastructure in the flowchart below — including data input, model behavior, 
                memory, risk detection, and live recommendations.
              </p>
            </div>
          </div>
          
          <FlowMapSection />
        </section>

        {/* Section 3: Video Showcase */}
        <section className="mb-32">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center mb-4">
              <Play className="w-8 h-8 mr-3 text-primary" />
              <h2 className="text-3xl font-semibold text-foreground">
                Watch It in Action
              </h2>
            </div>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              See how the system thinks. These video examples walk through real contract reviews — 
              with risk identification, clause summaries, and firm-specific fallback suggestions.
            </p>
          </div>
          
          <VideoSection />
        </section>

        {/* ROI + Business Case Section */}
        <section className="mb-32">
          <div className="text-center mb-16">
            <div className="flex items-center justify-center mb-4">
              <TrendingUp className="w-8 h-8 mr-3 text-primary" />
              <h2 className="text-3xl font-semibold text-foreground">
                Return on Investment – Why Firms Invest in 4Runr Legal Infrastructure
              </h2>
            </div>
            <p className="text-lg text-muted-foreground max-w-4xl mx-auto">
              This isn't a dashboard or chatbot — it's a system built to improve your legal operations at the core. 
              Here's what that means in real terms:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {/* ROI Point 1 */}
            <div className="bg-card/20 backdrop-blur-sm rounded-xl p-6 border border-border/30">
              <div className="text-2xl font-bold text-primary mb-3">50–80%</div>
              <h3 className="text-lg font-semibold text-foreground mb-3">Cut Contract Review Time</h3>
              <p className="text-sm text-muted-foreground">
                Firms using contract AI systems report time savings of 60–80% when reviewing standard agreements 
                (McKinsey Legal Tech Report, 2023). This means faster turnaround, less partner time spent on triage, 
                and more room for growth.
              </p>
            </div>

            {/* ROI Point 2 */}
            <div className="bg-card/20 backdrop-blur-sm rounded-xl p-6 border border-border/30">
              <div className="text-2xl font-bold text-primary mb-3">Faster</div>
              <h3 className="text-lg font-semibold text-foreground mb-3">Reduce Negotiation Waste</h3>
              <p className="text-sm text-muted-foreground">
                By surfacing risks and fallback terms instantly, teams reduce unnecessary redlines and calls — 
                accelerating deal velocity without sacrificing compliance.
              </p>
            </div>

            {/* ROI Point 3 */}
            <div className="bg-card/20 backdrop-blur-sm rounded-xl p-6 border border-border/30">
              <div className="text-2xl font-bold text-primary mb-3">Memory</div>
              <h3 className="text-lg font-semibold text-foreground mb-3">Preserve Institutional Knowledge</h3>
              <p className="text-sm text-muted-foreground">
                The system captures your firm's reasoning and preferences over time, turning tribal knowledge 
                into structured intelligence. This is especially valuable across turnover, onboarding, or firm expansion.
              </p>
            </div>

            {/* ROI Point 4 */}
            <div className="bg-card/20 backdrop-blur-sm rounded-xl p-6 border border-border/30">
              <div className="text-2xl font-bold text-primary mb-3">Scale</div>
              <h3 className="text-lg font-semibold text-foreground mb-3">Augment Staff Without Hiring</h3>
              <p className="text-sm text-muted-foreground">
                Junior lawyers get contextual guidance. Senior lawyers avoid low-leverage work. This helps you 
                scale capacity without increasing headcount — and ensures quality stays high.
              </p>
            </div>

            {/* ROI Point 5 */}
            <div className="bg-card/20 backdrop-blur-sm rounded-xl p-6 border border-border/30">
              <div className="text-2xl font-bold text-primary mb-3">Risk</div>
              <h3 className="text-lg font-semibold text-foreground mb-3">Catch Legal Risk Earlier</h3>
              <p className="text-sm text-muted-foreground">
                Missed protections, hidden clauses, and outlier terms can lead to costly problems post-signature. 
                Flagging them in real-time avoids expensive amendments or liability later.
              </p>
            </div>

            {/* ROI Point 6 - Spanning remaining space */}
            <div className="bg-card/20 backdrop-blur-sm rounded-xl p-6 border border-border/30 md:col-span-2 lg:col-span-1">
              <div className="text-2xl font-bold text-primary mb-3">Now</div>
              <h3 className="text-lg font-semibold text-foreground mb-3">Why Now?</h3>
              <p className="text-sm text-muted-foreground">
                Legal work is changing — not because it's broken, but because the demands are higher. 
                Clients expect speed. Teams face growing pressure. And AI is no longer optional — it's becoming standard.
              </p>
            </div>
          </div>

          {/* Why Now Section */}
          <div className="bg-gradient-to-r from-primary/10 to-primary/5 rounded-2xl p-8 border border-primary/20 text-center">
            <p className="text-lg text-foreground mb-4">
              This system helps firms stop guessing and start scaling — with the confidence that their logic, 
              privacy, and workflows are fully integrated.
            </p>
          </div>
        </section>
      </div>

      {/* Enhanced Footer with CTA */}
      <footer className="border-t border-border/30 bg-card/20 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto px-6 py-16">
          <div className="text-center">
            <h3 className="text-2xl font-semibold text-foreground mb-4">
              Want to see what this would look like for your firm?
            </h3>
            <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
              Book a custom walkthrough or request a tailored buildout.
            </p>
            <Button 
              size="lg" 
              className="bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 text-white px-8 py-3 rounded-lg font-medium transition-all duration-200 hover:shadow-lg"
              onClick={() => {
                console.log('Opening contact page...');
                window.open('https://4runrtech.com/contact', '_blank');
              }}
            >
              Get Started Today
            </Button>
          </div>
        </div>
      </footer>

      <DemoFooter />
    </div>
  );
};

export default DemoPage;


import { Play, Video } from "lucide-react";

const VideoSection = () => {
  return (
    <section className="mb-32">
      <div className="text-center mb-12">
        <div className="flex items-center justify-center mb-4">
          <Video className="w-8 h-8 mr-3 text-primary" />
          <h2 className="text-3xl font-semibold text-foreground">
            See Cortex in Action
          </h2>
        </div>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Watch how legal professionals use 4Runr Cortex to analyze contracts 10x faster 
          with AI-powered insights and automated risk assessment.
        </p>
      </div>
      
      <div className="relative group">
        <div className="bg-gradient-to-r from-primary/20 to-primary/10 rounded-2xl p-1">
          <div className="bg-card/40 backdrop-blur-sm rounded-xl overflow-hidden shadow-2xl">
            <div className="relative aspect-video">
              <iframe
                className="w-full h-full rounded-xl"
                src="https://www.youtube.com/embed/PAYwOES6AjU"
                title="4Runr Cortex Demo Video"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              ></iframe>
              
              {/* Overlay for loading state */}
              <div className="absolute inset-0 bg-muted/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none rounded-xl">
                <div className="bg-primary/90 backdrop-blur-sm rounded-full p-4">
                  <Play className="w-8 h-8 text-primary-foreground" />
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Video stats */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center p-6 bg-card/20 backdrop-blur-sm rounded-xl border border-border/30">
            <div className="text-2xl font-bold text-primary mb-2">10x</div>
            <div className="text-sm text-muted-foreground">Faster Analysis</div>
          </div>
          <div className="text-center p-6 bg-card/20 backdrop-blur-sm rounded-xl border border-border/30">
            <div className="text-2xl font-bold text-primary mb-2">99.2%</div>
            <div className="text-sm text-muted-foreground">Accuracy Rate</div>
          </div>
          <div className="text-center p-6 bg-card/20 backdrop-blur-sm rounded-xl border border-border/30">
            <div className="text-2xl font-bold text-primary mb-2">500+</div>
            <div className="text-sm text-muted-foreground">Law Firms Trust Us</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default VideoSection;

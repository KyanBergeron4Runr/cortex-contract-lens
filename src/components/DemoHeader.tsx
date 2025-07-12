
import { Button } from "@/components/ui/button";

const DemoHeader = () => {
  const navItems = [
    { name: "Home", url: "https://4runrtech.com/" },
    { name: "Services", url: "https://4runrtech.com/ai-infrastructure-automation-services" },
    { name: "About Us", url: "https://4runrtech.com/about" },
    { name: "Contact Us", url: "https://4runrtech.com/contact" }
  ];

  return (
    <header className="bg-background/95 backdrop-blur-sm border-b border-border/50 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="text-2xl font-bold bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
              4Runr
            </div>
            <span className="text-sm text-muted-foreground">Cortex</span>
          </div>
          
          <nav className="flex items-center space-x-8">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors duration-200"
              >
                {item.name}
              </a>
            ))}
          </nav>
        </div>
      </div>
    </header>
  );
};

export default DemoHeader;

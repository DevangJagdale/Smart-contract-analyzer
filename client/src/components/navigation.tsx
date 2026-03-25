import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, Rocket, ExternalLink, FileText, Brain } from "lucide-react";
import { Link, useLocation } from "wouter";

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [location] = useLocation();

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsOpen(false);
  };

  const navItems = [
    { id: 'document-parse', label: 'Document Parse', path: '/#document-parse' },
    { id: 'info-extract', label: 'Information Extract', path: '/#info-extract' },
    { id: 'solar-llm', label: 'Gemini Chat', path: '/#solar-llm' },
    { id: 'getting-started', label: 'Getting Started', path: '/#getting-started' },
  ];

  const appItems = [
    { path: '/contract-analyzer', label: 'Contract Analyzer', icon: FileText },
  ];

  return (
    <nav className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link href="/contract-analyzer">
              <div className="text-2xl font-bold text-primary flex items-center cursor-pointer">
                <Rocket className="mr-2 h-6 w-6" />
                Smart Contract Analyzer
              </div>
            </Link>
          </div>
          
          <div className="hidden md:flex items-center space-x-8">
            {/* App Navigation */}
            {appItems.map((item) => (
              <Link key={item.path} href={item.path}>
                <Button 
                  variant={location === item.path ? "default" : "ghost"}
                  className="flex items-center gap-2"
                >
                  <item.icon className="h-4 w-4" />
                  {item.label}
                </Button>
              </Link>
            ))}
            
            {/* Section Navigation (only on home page) */}
            {location === '/home' && navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className="text-gray-700 hover:text-primary transition-colors font-medium"
              >
                {item.label}
              </button>
            ))}
            
            <Button
              onClick={() => window.open('https://aistudio.google.com/app/apikey', '_blank')}
              className="bg-primary hover:bg-blue-700"
            >
              <ExternalLink className="mr-2 h-4 w-4" />
              Get API Key
            </Button>
          </div>
          
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="sm" className="md:hidden">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent>
              <div className="flex flex-col space-y-4 mt-8">
                {/* App Navigation */}
                {appItems.map((item) => (
                  <Link key={item.path} href={item.path}>
                    <Button 
                      variant={location === item.path ? "default" : "ghost"}
                      className="w-full justify-start"
                      onClick={() => setIsOpen(false)}
                    >
                      <item.icon className="mr-2 h-4 w-4" />
                      {item.label}
                    </Button>
                  </Link>
                ))}
                
                {/* Section Navigation (only on home page) */}
                {location === '/home' && (
                  <>
                    <div className="border-t pt-4">
                      <div className="text-sm font-medium text-gray-500 mb-2">Demo Sections</div>
                      {navItems.map((item) => (
                        <button
                          key={item.id}
                          onClick={() => scrollToSection(item.id)}
                          className="text-left text-gray-700 hover:text-primary transition-colors font-medium py-2 w-full"
                        >
                          {item.label}
                        </button>
                      ))}
                    </div>
                  </>
                )}
                
                <Button
                  onClick={() => window.open('https://aistudio.google.com/app/apikey', '_blank')}
                  className="bg-primary hover:bg-blue-700 w-full mt-4"
                >
                  <ExternalLink className="mr-2 h-4 w-4" />
                  Get API Key
                </Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
}
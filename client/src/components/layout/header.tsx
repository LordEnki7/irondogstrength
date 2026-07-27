import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Dumbbell, Menu, Shield } from "lucide-react";

export default function Header() {
  const [location] = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navigation = [
    { name: "Home", href: "/" },
    { name: "Programs", href: "/programs" },
    { name: "The Grind", href: "/the-grind" },
    { name: "Motivation", href: "/motivation" },
    { name: "About Coach", href: "/about" },
    { name: "Schedule", href: "/schedule" },
    { name: "Contact", href: "/contact" },
  ];

  const isActive = (href: string) => {
    if (href === "/" && location === "/") return true;
    if (href !== "/" && location.startsWith(href)) return true;
    return false;
  };

  return (
    <header className="bg-white/95 backdrop-blur-md shadow-lg border-b border-iron-blue-100 sticky top-0 z-50">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-18">
          <Link href="/" className="flex items-center space-x-4 group">
            <div className="relative">
              <img 
                src="/iron-dog-logo.jpg" 
                alt="Iron Dog Strength Logo" 
                className="w-12 h-12 rounded-xl shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-105 object-cover"
              />
            </div>
            <div>
              <h1 className="text-2xl font-black text-iron-blue-800 group-hover:text-iron-blue-600 transition-colors duration-300">
                Iron Dog Strength
              </h1>
              <p className="text-sm text-iron-blue-600 font-semibold tracking-wide uppercase">
                Training & Conditioning
              </p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`relative font-semibold transition-all duration-300 group px-3 py-2 rounded-lg ${
                  isActive(item.href)
                    ? "text-iron-blue-700 bg-iron-blue-50"
                    : "text-slate-700 hover:text-iron-blue-600 hover:bg-iron-blue-50"
                }`}
              >
                {item.name}
                <div className={`absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-iron-blue-500 to-iron-blue-600 transform transition-transform duration-300 ${
                  isActive(item.href) ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                }`}></div>
              </Link>
            ))}
            <a href="/signup">
              <Button className="bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white font-bold border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 mr-3">
                Sign Up
              </Button>
            </a>
            <Link href="/schedule">
              <Button className="bg-gradient-to-r from-iron-blue-600 to-iron-blue-700 hover:from-iron-blue-700 hover:to-iron-blue-800 text-white font-bold px-6 py-2.5 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
                Book Session
              </Button>
            </Link>
          </div>

          {/* Mobile Navigation */}
          <div className="md:hidden">
            <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-72">
                <div className="flex flex-col space-y-4 mt-8">
                  {navigation.map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      className={`text-lg font-medium transition-colors ${
                        isActive(item.href)
                          ? "text-iron-blue-600"
                          : "text-muted-foreground hover:text-iron-blue-600"
                      }`}
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {item.name}
                    </Link>
                  ))}
                  <Link href="/schedule" onClick={() => setMobileMenuOpen(false)}>
                    <Button className="w-full bg-iron-blue-600 hover:bg-iron-blue-700 text-white mt-4">
                      Book Session
                    </Button>
                  </Link>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </nav>
    </header>
  );
}

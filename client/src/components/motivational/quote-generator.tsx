import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RefreshCw, Quote } from "lucide-react";

interface MotivationalQuote {
  text: string;
  author: string;
  category: "strength" | "mindset" | "perseverance" | "discipline" | "self-defense" | "transformation";
}

const motivationalQuotes: MotivationalQuote[] = [
  // Strength & Training
  { text: "Strength does not come from physical capacity. It comes from an indomitable will.", author: "Mahatma Gandhi", category: "strength" },
  { text: "The successful warrior is the average person with laser-like focus.", author: "Bruce Lee", category: "strength" },
  { text: "Champions aren't made in the gyms. Champions are made from something deep inside them - a desire, a dream, a vision.", author: "Muhammad Ali", category: "strength" },
  { text: "Don't limit your challenges, challenge your limits.", author: "Jerry Dunn", category: "strength" },
  { text: "The iron never lies to you. You can walk outside and listen to all kinds of talk, get told you're a god or a total bastard. The iron will always kick you the real deal.", author: "Henry Rollins", category: "strength" },
  
  // Mindset & Mental Strength
  { text: "Whether you think you can or you think you can't, you're right.", author: "Henry Ford", category: "mindset" },
  { text: "The mind is everything. What you think you become.", author: "Buddha", category: "mindset" },
  { text: "Your limitation—it's only your imagination.", author: "Unknown", category: "mindset" },
  { text: "The only impossible journey is the one you never begin.", author: "Tony Robbins", category: "mindset" },
  { text: "Believe you can and you're halfway there.", author: "Theodore Roosevelt", category: "mindset" },
  
  // Perseverance & Endurance
  { text: "It is during our darkest moments that we must focus to see the light.", author: "Aristotle", category: "perseverance" },
  { text: "Fall seven times, stand up eight.", author: "Japanese Proverb", category: "perseverance" },
  { text: "Success is not final, failure is not fatal: it is the courage to continue that counts.", author: "Winston Churchill", category: "perseverance" },
  { text: "The difference between ordinary and extraordinary is that little extra.", author: "Jimmy Johnson", category: "perseverance" },
  { text: "Difficult roads often lead to beautiful destinations.", author: "Zig Ziglar", category: "perseverance" },
  
  // Discipline & Dedication
  { text: "Discipline is the bridge between goals and accomplishment.", author: "Jim Rohn", category: "discipline" },
  { text: "We are what we repeatedly do. Excellence, then, is not an act, but a habit.", author: "Aristotle", category: "discipline" },
  { text: "The grind is a debt that you pay daily.", author: "Coach Dess", category: "discipline" },
  { text: "Success isn't given. It's earned in the gym, on the field, in every training session.", author: "Unknown", category: "discipline" },
  { text: "Motivation gets you started. Habit keeps you going.", author: "Jim Ryun", category: "discipline" },
  
  // Self-Defense & Protection
  { text: "The best defense is a good offense, but the best offense is a great defense.", author: "Unknown", category: "self-defense" },
  { text: "Be like water making its way through cracks. Do not be assertive, but adjust to the object, and you shall find a way around or through it.", author: "Bruce Lee", category: "self-defense" },
  { text: "A warrior's greatest weapon is patience.", author: "Unknown", category: "self-defense" },
  { text: "The ultimate aim of martial arts is not having to use them.", author: "Miyamoto Musashi", category: "self-defense" },
  { text: "Confidence is a weapon more powerful than any martial art.", author: "Unknown", category: "self-defense" },
  
  // Transformation & Growth
  { text: "The cave you fear to enter holds the treasure you seek.", author: "Joseph Campbell", category: "transformation" },
  { text: "May I stumble upon excellence in my pursuit of perfection.", author: "Coach Dess", category: "transformation" },
  { text: "You are never too old to set another goal or to dream a new dream.", author: "C.S. Lewis", category: "transformation" },
  { text: "The only person you are destined to become is the person you decide to be.", author: "Ralph Waldo Emerson", category: "transformation" },
  { text: "Progress, not perfection.", author: "Unknown", category: "transformation" }
];

interface QuoteGeneratorProps {
  category?: MotivationalQuote["category"];
  showCategory?: boolean;
  autoRefresh?: boolean;
  refreshInterval?: number; // in seconds
}

export default function QuoteGenerator({ 
  category, 
  showCategory = true, 
  autoRefresh = false, 
  refreshInterval = 30 
}: QuoteGeneratorProps) {
  const [currentQuote, setCurrentQuote] = useState<MotivationalQuote | null>(null);
  const [isAnimating, setIsAnimating] = useState(false);

  const getRandomQuote = () => {
    const filteredQuotes = category 
      ? motivationalQuotes.filter(q => q.category === category)
      : motivationalQuotes;
    
    const randomIndex = Math.floor(Math.random() * filteredQuotes.length);
    return filteredQuotes[randomIndex];
  };

  const generateNewQuote = () => {
    setIsAnimating(true);
    setTimeout(() => {
      setCurrentQuote(getRandomQuote());
      setIsAnimating(false);
    }, 300);
  };

  useEffect(() => {
    // Generate initial quote
    setCurrentQuote(getRandomQuote());
  }, [category]);

  useEffect(() => {
    if (autoRefresh && refreshInterval > 0) {
      const interval = setInterval(generateNewQuote, refreshInterval * 1000);
      return () => clearInterval(interval);
    }
  }, [autoRefresh, refreshInterval]);

  const getCategoryColor = (cat: MotivationalQuote["category"]) => {
    switch (cat) {
      case "strength": return "text-red-600";
      case "mindset": return "text-purple-600";
      case "perseverance": return "text-blue-600";
      case "discipline": return "text-green-600";
      case "self-defense": return "text-orange-600";
      case "transformation": return "text-indigo-600";
      default: return "text-iron-blue-600";
    }
  };

  const getCategoryBadge = (cat: MotivationalQuote["category"]) => {
    switch (cat) {
      case "strength": return "bg-red-100 text-red-800";
      case "mindset": return "bg-purple-100 text-purple-800";
      case "perseverance": return "bg-blue-100 text-blue-800";
      case "discipline": return "bg-green-100 text-green-800";
      case "self-defense": return "bg-orange-100 text-orange-800";
      case "transformation": return "bg-indigo-100 text-indigo-800";
      default: return "bg-iron-blue-100 text-iron-blue-800";
    }
  };

  if (!currentQuote) return null;

  return (
    <Card className="border-2 border-iron-blue-200 shadow-lg" style={{
      background: `linear-gradient(135deg, 
        rgba(255, 255, 255, 0.95) 0%, 
        rgba(219, 234, 254, 0.8) 50%,
        rgba(255, 255, 255, 0.95) 100%)`
    }}>
      <CardContent className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center space-x-2">
            <Quote className="w-6 h-6 text-iron-blue-600" />
            <h3 className="text-lg font-bold text-iron-blue-900">Daily Motivation</h3>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={generateNewQuote}
            className="flex items-center space-x-1 hover:bg-iron-blue-50"
          >
            <RefreshCw className={`w-4 h-4 ${isAnimating ? 'animate-spin' : ''}`} />
            <span>New Quote</span>
          </Button>
        </div>

        <div className={`transition-all duration-300 ${isAnimating ? 'opacity-0 transform scale-95' : 'opacity-100 transform scale-100'}`}>
          <blockquote className="text-lg font-medium text-iron-blue-800 mb-4 italic leading-relaxed">
            "{currentQuote.text}"
          </blockquote>
          
          <div className="flex items-center justify-between">
            <cite className="text-iron-blue-700 font-semibold">
              — {currentQuote.author}
            </cite>
            
            {showCategory && (
              <span className={`px-3 py-1 rounded-full text-xs font-medium ${getCategoryBadge(currentQuote.category)}`}>
                {currentQuote.category.charAt(0).toUpperCase() + currentQuote.category.slice(1)}
              </span>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

// Export the quotes for use in other components
export { motivationalQuotes, type MotivationalQuote };
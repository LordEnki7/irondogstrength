import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import QuoteGenerator, { motivationalQuotes, type MotivationalQuote } from "@/components/motivational/quote-generator";
import { Dumbbell, Brain, Shield, Target, Zap, Heart, MapPin, Clock, Phone } from "lucide-react";
import { useContent, getContentValue } from "@/hooks/use-content";

export default function WorkoutMotivation() {
  const [selectedCategory, setSelectedCategory] = useState<MotivationalQuote["category"] | "all">("all");
  const { data: content } = useContent();

  const categories = [
    { value: "all" as const, label: "All Categories", icon: Zap, color: "bg-gradient-to-r from-blue-500 to-purple-500" },
    { value: "strength" as const, label: "Strength", icon: Dumbbell, color: "bg-red-500" },
    { value: "mindset" as const, label: "Mindset", icon: Brain, color: "bg-purple-500" },
    { value: "perseverance" as const, label: "Perseverance", icon: Target, color: "bg-blue-500" },
    { value: "discipline" as const, label: "Discipline", icon: Heart, color: "bg-green-500" },
    { value: "self-defense" as const, label: "Self-Defense", icon: Shield, color: "bg-orange-500" },
    { value: "transformation" as const, label: "Transformation", icon: Zap, color: "bg-indigo-500" }
  ];

  const getQuotesByCategory = (category: MotivationalQuote["category"] | "all") => {
    if (category === "all") return motivationalQuotes;
    return motivationalQuotes.filter(quote => quote.category === category);
  };

  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="py-20 relative overflow-hidden" style={{
        background: `linear-gradient(135deg, 
          rgba(219, 234, 254, 0.9) 0%, 
          rgba(147, 197, 253, 0.8) 25%,
          rgba(191, 219, 254, 0.85) 50%,
          rgba(186, 230, 253, 0.9) 100%)`
      }}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="mb-8 flex justify-center">
            <img 
              src="/iron-dog-logo.jpg" 
              alt="Iron Dog Strength Logo" 
              className="w-20 h-20 md:w-24 md:h-24 rounded-xl shadow-lg object-cover"
            />
          </div>
          <h1 className="text-5xl font-bold mb-6 text-iron-blue-900">{getContentValue(content, "motivation_page_title", "Workout Motivation")}</h1>
          <p className="text-xl text-iron-blue-700 mb-8">
            {getContentValue(content, "motivation_page_subtitle", "Fuel your training sessions with powerful quotes from champions, warriors, and visionaries")}
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-20" style={{
        background: `linear-gradient(135deg, 
          rgba(255, 255, 255, 0.8) 0%, 
          rgba(219, 234, 254, 0.4) 50%,
          rgba(255, 255, 255, 0.9) 100%)`
      }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Category Selection */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-iron-blue-900 mb-6 text-center">{getContentValue(content, "motivation_category_title", "Choose Your Inspiration")}</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
              {categories.map((category) => {
                const IconComponent = category.icon;
                return (
                  <Button
                    key={category.value}
                    variant={selectedCategory === category.value ? "default" : "outline"}
                    className={`flex flex-col items-center p-4 h-auto ${
                      selectedCategory === category.value 
                        ? `${category.color} text-white hover:opacity-90` 
                        : "hover:bg-iron-blue-50"
                    }`}
                    onClick={() => setSelectedCategory(category.value)}
                  >
                    <IconComponent className="w-6 h-6 mb-2" />
                    <span className="text-sm font-medium">{category.label}</span>
                  </Button>
                );
              })}
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Interactive Quote Generator */}
            <div>
              <h3 className="text-xl font-bold text-iron-blue-900 mb-4">{getContentValue(content, "motivation_generator_title", "Daily Motivation Generator")}</h3>
              <QuoteGenerator 
                category={selectedCategory === "all" ? undefined : selectedCategory}
                showCategory={true}
                autoRefresh={false}
              />
            </div>

            {/* Pre-Workout Ritual */}
            <div>
              <Card className="border-2 border-iron-blue-200" style={{
                background: `linear-gradient(135deg, 
                  rgba(255, 255, 255, 0.95) 0%, 
                  rgba(219, 234, 254, 0.8) 50%,
                  rgba(255, 255, 255, 0.95) 100%)`
              }}>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Zap className="mr-2 text-iron-blue-600" />
                    {getContentValue(content, "motivation_ritual_title", "Pre-Workout Ritual")}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex items-start space-x-3">
                      <div className="w-6 h-6 bg-iron-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0 mt-0.5">
                        1
                      </div>
                      <div>
                        <h4 className="font-semibold text-iron-blue-900">{getContentValue(content, "motivation_step_1_title", "Read Your Quote")}</h4>
                        <p className="text-sm text-iron-blue-700">{getContentValue(content, "motivation_step_1_description", "Take a moment to absorb the message and let it fuel your determination.")}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start space-x-3">
                      <div className="w-6 h-6 bg-iron-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0 mt-0.5">
                        2
                      </div>
                      <div>
                        <h4 className="font-semibold text-iron-blue-900">{getContentValue(content, "motivation_step_2_title", "Visualize Success")}</h4>
                        <p className="text-sm text-iron-blue-700">{getContentValue(content, "motivation_step_2_description", "Picture yourself completing your workout with strength and confidence.")}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start space-x-3">
                      <div className="w-6 h-6 bg-iron-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0 mt-0.5">
                        3
                      </div>
                      <div>
                        <h4 className="font-semibold text-iron-blue-900">{getContentValue(content, "motivation_step_3_title", "Set Your Intention")}</h4>
                        <p className="text-sm text-iron-blue-700">{getContentValue(content, "motivation_step_3_description", "Focus on what you want to achieve in this session and beyond.")}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start space-x-3">
                      <div className="w-6 h-6 bg-iron-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0 mt-0.5">
                        4
                      </div>
                      <div>
                        <h4 className="font-semibold text-iron-blue-900">{getContentValue(content, "motivation_step_4_title", "Begin with Power")}</h4>
                        <p className="text-sm text-iron-blue-700">{getContentValue(content, "motivation_step_4_description", "Start your training with the mindset of a champion.")}</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Quote Collection by Category */}
          <div className="mt-16">
            <h3 className="text-xl font-bold text-iron-blue-900 mb-6">
              {selectedCategory === "all" ? getContentValue(content, "motivation_all_quotes_title", "All Motivational Quotes") : `${selectedCategory.charAt(0).toUpperCase() + selectedCategory.slice(1)} Quotes`}
            </h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {getQuotesByCategory(selectedCategory).map((quote, index) => (
                <Card key={index} className="border border-iron-blue-200 hover:shadow-lg transition-shadow" style={{
                  background: `linear-gradient(135deg, 
                    rgba(255, 255, 255, 0.9) 0%, 
                    rgba(219, 234, 254, 0.6) 50%,
                    rgba(255, 255, 255, 0.95) 100%)`
                }}>
                  <CardContent className="p-4">
                    <blockquote className="text-sm font-medium text-iron-blue-800 mb-3 italic leading-relaxed">
                      "{quote.text}"
                    </blockquote>
                    <div className="flex items-center justify-between">
                      <cite className="text-xs text-iron-blue-700 font-semibold">
                        — {quote.author}
                      </cite>
                      <Badge variant="secondary" className="text-xs">
                        {quote.category}
                      </Badge>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Call to Action */}
          <div className="mt-16 text-center">
            <Card className="border-2 border-iron-blue-200 max-w-2xl mx-auto" style={{
              background: `linear-gradient(135deg, 
                rgba(255, 255, 255, 0.95) 0%, 
                rgba(219, 234, 254, 0.8) 50%,
                rgba(255, 255, 255, 0.95) 100%)`
            }}>
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold text-iron-blue-900 mb-4">{getContentValue(content, "motivation_cta_title", "Ready to Transform?")}</h3>
                <p className="text-iron-blue-700 mb-6">
                  {getContentValue(content, "motivation_cta_description", "Let these words fuel your journey. Book your next training session and turn inspiration into action.")}
                </p>
                <div className="space-x-4">
                  <a href="/schedule">
                    <Button className="bg-gradient-to-r from-iron-blue-700 to-iron-blue-800 hover:from-iron-blue-800 hover:to-iron-blue-900 text-white font-bold shadow-lg hover:shadow-xl transition-all duration-300">
                      <Dumbbell className="mr-2" size={16} />
                      Book Training Session
                    </Button>
                  </a>
                  <a href="/portal">
                    <Button className="bg-gradient-to-r from-iron-blue-700 to-iron-blue-800 hover:from-iron-blue-800 hover:to-iron-blue-900 text-white font-bold shadow-lg hover:shadow-xl transition-all duration-300">
                      View Client Portal
                    </Button>
                  </a>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Contact Information */}
          <div className="mt-16">
            <Card className="border-2 border-iron-blue-200 max-w-4xl mx-auto" style={{
              background: `linear-gradient(135deg, 
                rgba(255, 255, 255, 0.95) 0%, 
                rgba(219, 234, 254, 0.8) 50%,
                rgba(255, 255, 255, 0.95) 100%)`
            }}>
              <CardContent className="p-8">
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold text-iron-blue-900 mb-4">Contact Iron Dog Strength</h3>
                  <p className="text-iron-blue-700">
                    Ready to begin your transformation? Get in touch with our training team.
                  </p>
                </div>
                
                <div className="grid md:grid-cols-2 gap-8">
                  {/* Location & Hours */}
                  <div className="space-y-4">
                    <div className="flex items-center mb-4">
                      <div className="w-10 h-10 bg-iron-blue-100 rounded-lg flex items-center justify-center mr-3">
                        <MapPin className="text-iron-blue-600" size={18} />
                      </div>
                      <h4 className="text-lg font-bold text-iron-blue-900">Training Location</h4>
                    </div>
                    <div className="ml-13">
                      <p className="font-semibold text-iron-blue-900">Iron Dog Strength Training Facility</p>
                      <p className="text-iron-blue-700">35840 Chester Rd., Avon, OH 44011</p>
                    </div>
                    <div className="space-y-2 ml-13">
                      <div className="flex items-center text-iron-blue-700">
                        <Clock className="text-iron-blue-500 mr-2" size={14} />
                        <span className="text-sm">Saturday-Sunday: 1:30 PM - 5:00 PM</span>
                      </div>
                      <div className="flex items-center text-iron-blue-700">
                        <Clock className="text-iron-blue-500 mr-2" size={14} />
                        <span className="text-sm">Monday: 8:00 PM - 10:00 PM</span>
                      </div>
                      <div className="flex items-center text-iron-blue-700">
                        <Clock className="text-iron-blue-500 mr-2" size={14} />
                        <span className="text-sm">Tuesday: 6:30 PM - 8:00 PM</span>
                      </div>
                      <div className="flex items-center text-iron-blue-700">
                        <Clock className="text-iron-blue-500 mr-2" size={14} />
                        <span className="text-sm">Wednesday: Closed</span>
                      </div>
                      <div className="flex items-center text-iron-blue-700">
                        <Clock className="text-iron-blue-500 mr-2" size={14} />
                        <span className="text-sm">Thursday: 8:00 PM - 10:00 PM</span>
                      </div>
                      <div className="flex items-center text-iron-blue-700">
                        <Clock className="text-iron-blue-500 mr-2" size={14} />
                        <span className="text-sm">Friday: 6:30 PM - 8:30 PM</span>
                      </div>
                    </div>
                  </div>

                  {/* Contact Details */}
                  <div className="space-y-4">
                    <div className="flex items-center mb-4">
                      <div className="w-10 h-10 bg-iron-blue-100 rounded-lg flex items-center justify-center mr-3">
                        <Phone className="text-iron-blue-600" size={18} />
                      </div>
                      <h4 className="text-lg font-bold text-iron-blue-900">Contact Numbers</h4>
                    </div>
                    <div className="space-y-3 ml-13">
                      <div>
                        <p className="font-semibold text-iron-blue-900">Master Dessie L. Cheers</p>
                        <p className="text-iron-blue-700">(440) 281-7930</p>
                      </div>
                      <div>
                        <p className="font-semibold text-iron-blue-900">Jaden Matias - Assistant Trainer</p>
                        <p className="text-iron-blue-700">(440) 420-7694</p>
                      </div>
                      <div>
                        <p className="font-semibold text-iron-blue-900">Email</p>
                        <p className="text-iron-blue-700">train@irondogstrength.com</p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
}
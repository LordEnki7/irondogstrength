import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Star, Medal, Users, Target, Shield, MapPin, Mail, Phone, ArrowRight } from "lucide-react";
import { DailyMotivationPlayer } from "@/components/audio/daily-motivation-player";
import CaduceusSymbol from "@/components/symbols/caduceus";
import ScalesSymbol from "@/components/symbols/scales";
import AnkhSymbol from "@/components/symbols/ankh";
import WasScepterSymbol from "@/components/symbols/was-scepter";
import EyeOfRaSymbol from "@/components/symbols/eye-of-ra";
import EgyptianSilhouetteSymbol from "@/components/symbols/egyptian-silhouette";
import bookCoverImage from "@assets/book cover_1752980997909.jpg";
import { useContent } from "@/hooks/use-content";

export default function About() {
  const { data: content, isLoading } = useContent();
  
  const achievements = [
    { icon: Users, label: "Students Trained", value: "500+" },
    { icon: Target, label: "Success Rate", value: "95%" },
    { icon: Medal, label: "Years Experience", value: content?.experience_description || "15+" },
    { icon: Shield, label: "Certifications", value: "Multiple" }
  ];

  const philosophies = [
    {
      title: content?.philosophy_title_1 || "Mind-Body Connection",
      description: "True strength begins in the mind. We develop mental resilience alongside physical power to create lasting transformation."
    },
    {
      title: content?.philosophy_title_2 || "Overcoming Adversity",
      description: "Every challenge is an opportunity to grow stronger. We embrace difficulties as stepping stones to greatness."
    },
    {
      title: content?.philosophy_title_3 || "Personal Excellence",
      description: "We don't just train bodies—we forge character, build confidence, and unlock the warrior spirit within."
    },
    {
      title: content?.philosophy_title_4 || "Holistic Wellness",
      description: "Balance in all things. We integrate physical training, mental coaching, and spiritual growth for complete wellness."
    }
  ];

  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="py-20 relative overflow-hidden" style={{
        background: `linear-gradient(135deg, 
          rgba(219, 234, 254, 0.9) 0%, 
          rgba(147, 197, 253, 0.8) 25%,
          rgba(191, 219, 254, 0.85) 50%,
          rgba(165, 210, 255, 0.9) 75%,
          rgba(186, 230, 253, 0.95) 100%)`,
        backdropFilter: 'blur(10px)',
        boxShadow: 'inset 0 1px 0 rgba(255, 255, 255, 0.6), inset 0 -1px 0 rgba(0, 0, 0, 0.1)'
      }}>
        {/* Egyptian Symbols Background */}
        <div className="absolute inset-0 opacity-8">
          <div className="absolute top-20 right-20 w-40 h-40 text-iron-blue-500/30 rotate-12">
            <CaduceusSymbol />
          </div>
          <div className="absolute bottom-32 left-32 w-36 h-36 text-iron-blue-600/25 -rotate-12">
            <ScalesSymbol />
          </div>
          <div className="absolute top-1/3 left-2/3 w-56 h-56 opacity-12 -rotate-6">
            <EgyptianSilhouetteSymbol />
          </div>
        </div>
        
        {/* Glossy overlay effect */}
        <div className="absolute inset-0 bg-gradient-to-br from-transparent via-white/10 to-transparent pointer-events-none"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="flex items-center mb-6">
                <img 
                  src="/iron-dog-logo.jpg" 
                  alt="Iron Dog Strength Logo" 
                  className="w-16 h-16 rounded-xl shadow-lg object-cover mr-4"
                />
                <h1 className="text-4xl font-bold text-iron-blue-900">{content?.about_page_title || "Meet Your Coach"}</h1>
              </div>
              
              <h2 className="text-3xl font-semibold text-iron-blue-900 mb-4">{content?.coach_name || "Master Dessie L. Cheers"}</h2>
              <p className="text-iron-blue-700 text-xl mb-6 leading-relaxed">
                {content?.coach_title || "Master Motivator, Strength Coach & Private Self Defense Instructor"}
              </p>
              
              <div className="space-y-4 mb-8">
                <p className="text-iron-blue-700 leading-relaxed">
                  {content?.coach_bio || "Dessie Cheers is a Motivational Speaker, Certified Sports Performance Coach, Black Belt Martial Artist, Author, Corporate Wellness Trainer and CEO of Iron Dog 7 LLC, a privately owned wellness company located in Lorain, OH. He has over 25 years of Small and Large Group Facilitator experience. Dessie specializes in the areas of Conflict Management, Leadership and Cultural Diversity. He eloquently articulates concepts such as 'Organizational Metabolism,' and how 'Discipline Determines Destiny.' Dessie provides creative solutions to enhance organizational wellness and details the path to organizational cultural competence."}
                </p>
              </div>
              
              <div className="grid grid-cols-2 gap-6 mb-8">
                {achievements.slice(0, 2).map((achievement, index) => (
                  <Card key={index} className="ice-blue-glass border-iron-blue-300/40">
                    <CardContent className="p-4 text-center">
                      <achievement.icon className="text-iron-blue-700 mx-auto mb-2" size={24} />
                      <div className="text-2xl font-bold text-iron-blue-900">{achievement.value}</div>
                      <div className="text-iron-blue-700 text-sm">{achievement.label}</div>
                    </CardContent>
                  </Card>
                ))}
              </div>
              
              <blockquote className="border-l-4 border-iron-blue-600 pl-6 py-4 ice-blue-glass rounded-r-xl">
                <p className="text-iron-blue-900 italic mb-2 text-lg">
                  "True strength comes from overcoming the battles within yourself. Every challenge is an 
                  opportunity to grow stronger, and every setback is a setup for a comeback."
                </p>
                <footer className="text-iron-blue-700 font-semibold">— Master Dessie L. Cheers</footer>
              </blockquote>
            </div>
            
            <div className="relative">
              <img 
                src="/coach-photo.jpg" 
                alt="Master Dessie L. Cheers - Iron Dog Strength Founder" 
                className="w-full h-auto object-contain rounded-2xl shadow-2xl bg-gradient-to-br from-iron-blue-50 to-iron-blue-100"
              />
              <div className="absolute -bottom-6 -right-6 w-16 h-16 bg-iron-blue-500 rounded-full flex items-center justify-center shadow-lg">
                <Medal className="text-white" size={24} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Philosophy Section */}
      <section className="py-20 relative overflow-hidden" style={{
        background: `linear-gradient(135deg, 
          #6ba5c8 0%, 
          #5895b9 50%,
          #4a7fa0 100%)`
      }}>
        {/* Egyptian Symbols Background */}
        <div className="absolute inset-0 opacity-3">
          <div className="absolute top-40 left-20 w-32 h-32 text-iron-blue-400 rotate-45">
            <ScalesSymbol />
          </div>
          <div className="absolute bottom-20 right-20 w-28 h-28 text-iron-blue-500 -rotate-45">
            <CaduceusSymbol />
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">Training Philosophy</h2>
            <p className="text-xl text-slate-100 max-w-3xl mx-auto">
              Built on the foundation of ancient wisdom and modern science, our approach creates complete transformation
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            {philosophies.map((philosophy, index) => (
              <Card key={index} className="bg-white/95 border-white/30 hover:shadow-2xl transition-all hover:border-white/50 backdrop-blur-sm">
                <CardContent className="p-8">
                  <h3 className="text-2xl font-bold text-slate-800 mb-4">{philosophy.title}</h3>
                  <p className="text-slate-600 leading-relaxed">{philosophy.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Published Work Section */}
      <section className="py-20 relative overflow-hidden" style={{
        background: `linear-gradient(135deg, 
          rgba(219, 234, 254, 0.9) 0%, 
          rgba(147, 197, 253, 0.8) 25%,
          rgba(191, 219, 254, 0.85) 50%,
          rgba(165, 210, 255, 0.9) 75%,
          rgba(186, 230, 253, 0.95) 100%)`,
        backdropFilter: 'blur(10px)'
      }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-iron-blue-900 mb-4">Published Author</h2>
            <p className="text-xl text-iron-blue-700 max-w-3xl mx-auto">
              Master Cheers shares his transformational insights through written work
            </p>
          </div>
          
          <div className="max-w-4xl mx-auto">
            <Card className="overflow-hidden bg-white/90 backdrop-blur-sm border-2 border-iron-blue-200 shadow-2xl">
              <CardContent className="p-0">
                <div className="grid md:grid-cols-2 gap-0">
                  <div className="relative">
                    <img 
                      src={bookCoverImage} 
                      alt="Can't Weight For Loss Book Cover by Dessie L. Cheers"
                      className="w-full h-auto object-contain bg-gradient-to-br from-iron-blue-50 to-iron-blue-100"
                    />
                    <div className="absolute top-4 left-4 bg-gradient-to-r from-yellow-500 to-orange-500 text-white px-3 py-1 rounded-full text-sm font-bold shadow-lg">
                      Published Author
                    </div>
                  </div>
                  <div className="p-8 md:p-12 flex flex-col justify-center">
                    <h3 className="text-3xl font-bold text-iron-blue-900 mb-4">Can't Weight For Loss</h3>
                    <div className="flex items-center mb-4">
                      <div className="text-3xl font-bold text-iron-blue-700 mr-4">$12.00</div>
                      <div className="ml-3 bg-gradient-to-r from-green-500 to-green-600 text-white px-3 py-1 rounded-full text-sm font-bold">
                        Available Now
                      </div>
                    </div>
                    <p className="text-iron-blue-700 mb-6 leading-relaxed">
                      An insightful, motivating book that inspires human transformation. Master Cheers shares 
                      personal experiences along with client success stories, while offering innovative strategies 
                      to release negative people or environments that hold you back from reaching your goals.
                    </p>
                    <div className="space-y-3 mb-8">
                      <div className="flex items-center text-iron-blue-800">
                        <div className="w-2 h-2 bg-yellow-500 rounded-full mr-3"></div>
                        <span>70 pages of transformational insights</span>
                      </div>
                      <div className="flex items-center text-iron-blue-800">
                        <div className="w-2 h-2 bg-yellow-500 rounded-full mr-3"></div>
                        <span>Real client success stories</span>
                      </div>
                      <div className="flex items-center text-iron-blue-800">
                        <div className="w-2 h-2 bg-yellow-500 rounded-full mr-3"></div>
                        <span>Innovative weight loss strategies</span>
                      </div>
                      <div className="flex items-center text-iron-blue-800">
                        <div className="w-2 h-2 bg-yellow-500 rounded-full mr-3"></div>
                        <span>Mind and body transformation</span>
                      </div>
                    </div>
                    <a 
                      href="https://www.amazon.com/Cant-Weight-Loss-Dessie-Cheers-ebook/dp/B083T9TJSH" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="block"
                    >
                      <Button className="w-full bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white font-bold px-6 py-4 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 text-lg">
                        Get the Book on Amazon - $12.00
                        <ArrowRight className="ml-2" size={20} />
                      </Button>
                    </a>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Inspirational Message - Never Give Up */}
      <section className="py-20 relative overflow-hidden" style={{
        background: `linear-gradient(135deg, 
          rgba(71, 85, 105, 0.95) 0%, 
          rgba(51, 65, 85, 0.9) 25%,
          rgba(30, 41, 59, 0.9) 50%,
          rgba(15, 23, 42, 0.95) 75%,
          rgba(2, 6, 23, 1) 100%)`,
        backdropFilter: 'blur(10px)'
      }}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-white mb-4">Never Give Up</h2>
            <p className="text-xl text-slate-200 max-w-3xl mx-auto">
              Master Cheers' personal message of resilience and determination
            </p>
          </div>
          
          <div className="max-w-4xl mx-auto">
            <Card className="overflow-hidden bg-black/60 backdrop-blur-lg border-2 border-slate-700 shadow-2xl">
              <CardContent className="p-0">
                <div className="relative">
                  <div className="aspect-video">
                    <iframe
                      className="w-full h-full rounded-t-lg"
                      src="https://www.youtube.com/embed/wxEPReKImq0"
                      title="Never Give Up - Motivational Message"
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      allowFullScreen
                    />
                  </div>
                  <div className="absolute top-4 right-4 bg-gradient-to-r from-red-600 to-red-700 text-white px-3 py-1 rounded-full text-sm font-bold shadow-lg">
                    Inspirational Message
                  </div>
                </div>
                <div className="p-8">
                  <h3 className="text-2xl font-bold text-white mb-4">Words of Perseverance</h3>
                  <p className="text-slate-300 mb-6 leading-relaxed">
                    In this powerful message, Master Cheers shares his personal philosophy about never giving up, 
                    no matter what challenges life presents. Drawing from years of experience in training and 
                    transformation, he inspires others to push through adversity and find their inner strength.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <span className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-3 py-1 rounded-full text-sm font-medium">
                      Motivation
                    </span>
                    <span className="bg-gradient-to-r from-purple-600 to-purple-700 text-white px-3 py-1 rounded-full text-sm font-medium">
                      Perseverance
                    </span>
                    <span className="bg-gradient-to-r from-green-600 to-green-700 text-white px-3 py-1 rounded-full text-sm font-medium">
                      Inner Strength
                    </span>
                    <span className="bg-gradient-to-r from-orange-600 to-orange-700 text-white px-3 py-1 rounded-full text-sm font-medium">
                      Transformation
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Achievements & Stats */}
      <section className="py-20 relative overflow-hidden" style={{
        background: `linear-gradient(135deg, 
          #fdf2c4 0%, 
          #f9e79f 50%,
          #f4d03f 100%)`
      }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-slate-800 mb-4">Proven Results</h2>
            <p className="text-xl text-slate-700">
              Years of dedication to excellence in training and transformation
            </p>
          </div>
          
          <div className="grid md:grid-cols-4 gap-8">
            {achievements.map((achievement, index) => (
              <Card key={index} className="text-center bg-white/90 border-yellow-200 hover:shadow-2xl transition-all hover:border-yellow-300 backdrop-blur-sm">
                <CardContent className="p-8">
                  <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <achievement.icon className="text-yellow-700" size={32} />
                  </div>
                  <div className="text-3xl font-bold text-slate-800 mb-2">{achievement.value}</div>
                  <div className="text-slate-600">{achievement.label}</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Specializations */}
      <section className="py-20 relative overflow-hidden" style={{
        background: `linear-gradient(135deg, 
          #f4a460 0%, 
          #e67e22 40%,
          #d2691e 70%,
          #cd853f 100%)`
      }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">Areas of Expertise</h2>
            <p className="text-xl text-orange-100">
              Comprehensive training across multiple disciplines for complete development
            </p>
          </div>
          
          <div className="grid lg:grid-cols-3 gap-8">
            <Card className="bg-white/95 border-orange-200 hover:shadow-2xl transition-all hover:border-orange-300 backdrop-blur-sm">
              <CardContent className="p-8">
                <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center mb-4 p-2">
                  <div className="w-full h-full text-orange-700">
                    <WasScepterSymbol />
                  </div>
                </div>
                <h3 className="text-2xl font-bold text-slate-800 mb-4">Self Defense & Martial Arts</h3>
                <p className="text-slate-600 mb-4">
                  Master practical self-defense techniques, situational awareness, and combat readiness. 
                  Build confidence through proven martial arts principles.
                </p>
                <div className="space-y-2">
                  <Badge variant="secondary" className="bg-orange-100 text-orange-800">Practical Combat Techniques</Badge>
                  <Badge variant="secondary" className="bg-orange-100 text-orange-800">Situational Awareness</Badge>
                  <Badge variant="secondary" className="bg-orange-100 text-orange-800">Conflict Resolution</Badge>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white/95 border-orange-200 hover:shadow-2xl transition-all hover:border-orange-300 backdrop-blur-sm">
              <CardContent className="p-8">
                <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center mb-4 p-2">
                  <div className="w-full h-full text-orange-700">
                    <AnkhSymbol />
                  </div>
                </div>
                <h3 className="text-2xl font-bold text-slate-800 mb-4">Strength & Conditioning</h3>
                <p className="text-slate-600 mb-4">
                  Progressive resistance training designed to build functional strength, endurance, and 
                  physical resilience through scientifically-proven methods.
                </p>
                <div className="space-y-2">
                  <Badge variant="secondary" className="bg-orange-100 text-orange-800">Progressive Overload</Badge>
                  <Badge variant="secondary" className="bg-orange-100 text-orange-800">Functional Movement</Badge>
                  <Badge variant="secondary" className="bg-orange-100 text-orange-800">Performance Optimization</Badge>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white/95 border-orange-200 hover:shadow-2xl transition-all hover:border-orange-300 backdrop-blur-sm">
              <CardContent className="p-8">
                <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center mb-4 p-2">
                  <div className="w-full h-full text-orange-700">
                    <EyeOfRaSymbol />
                  </div>
                </div>
                <h3 className="text-2xl font-bold text-slate-800 mb-4">Mindset & Motivation</h3>
                <p className="text-slate-600 mb-4">
                  Develop mental toughness, overcome limiting beliefs, and build the warrior mindset 
                  needed for success in all areas of life.
                </p>
                <div className="space-y-2">
                  <Badge variant="secondary" className="bg-orange-100 text-orange-800">Mental Resilience</Badge>
                  <Badge variant="secondary" className="bg-orange-100 text-orange-800">Goal Achievement</Badge>
                  <Badge variant="secondary" className="bg-orange-100 text-orange-800">Adversity Training</Badge>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Location & Contact */}
      <section className="py-20 relative overflow-hidden" style={{
        background: `linear-gradient(135deg, 
          rgba(219, 234, 254, 0.7) 0%, 
          rgba(191, 219, 254, 0.8) 30%,
          rgba(147, 197, 253, 0.6) 60%,
          rgba(186, 230, 253, 0.9) 100%)`
      }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl font-bold text-iron-blue-900 mb-6">Contact & Training</h2>
              <Card className="border-2 border-iron-blue-200" style={{
                background: `linear-gradient(135deg, 
                  rgba(255, 255, 255, 0.9) 0%, 
                  rgba(219, 234, 254, 0.6) 50%,
                  rgba(255, 255, 255, 0.95) 100%)`
              }}>
                <CardContent className="p-8">
                  <div className="flex items-center mb-4">
                    <Mail className="text-iron-blue-600 mr-3" size={24} />
                    <h3 className="text-2xl font-bold text-iron-blue-900">Iron Dog Strength Training</h3>
                  </div>
                  <p className="text-iron-blue-700 mb-6">
                    Private training sessions available<br />
                    Location details provided upon booking
                  </p>
                  <div className="space-y-3">
                    <div className="flex items-center text-iron-blue-700">
                      <div className="w-2 h-2 bg-iron-blue-600 rounded-full mr-3" />
                      <span>Flexible scheduling available</span>
                    </div>
                    <div className="flex items-center text-iron-blue-700">
                      <div className="w-2 h-2 bg-iron-blue-600 rounded-full mr-3" />
                      <span>One-on-one and small group sessions</span>
                    </div>
                    <div className="flex items-center text-iron-blue-700">
                      <div className="w-2 h-2 bg-iron-blue-600 rounded-full mr-3" />
                      <span>Support: Available for all clients</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <div className="text-center">
              <h3 className="text-2xl font-bold text-iron-blue-900 mb-6">Ready to Begin Your Transformation?</h3>
              <p className="text-iron-blue-700 mb-8 text-lg">
                Join hundreds of successful students who have transformed their lives through proven training methods
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a 
                  href="/schedule"
                  className="bg-iron-blue-600 hover:bg-iron-blue-700 text-white px-8 py-4 rounded-lg font-bold text-lg transition-colors inline-block"
                >
                  Schedule Consultation
                </a>
                <a 
                  href="/contact"
                  className="bg-transparent border-2 border-iron-blue-600 text-iron-blue-600 hover:bg-iron-blue-600 hover:text-white px-8 py-4 rounded-lg font-bold text-lg transition-colors inline-block"
                >
                  Get In Touch
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Daily Motivation Audio Player - Floating */}
      <DailyMotivationPlayer />
    </div>
  );
}

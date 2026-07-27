import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Dumbbell, 
  Shield, 
  Brain, 
  Star, 
  ArrowRight, 
  Users, 
  Clock, 
  Target,
  Scale,
  Medal
} from "lucide-react";
import QuoteGenerator from "@/components/motivational/quote-generator";
import { DailyMotivationPlayer } from "@/components/audio/daily-motivation-player";
import CaduceusSymbol from "@/components/symbols/caduceus";
import ScalesSymbol from "@/components/symbols/scales";
import AnkhSymbol from "@/components/symbols/ankh";
import WasScepterSymbol from "@/components/symbols/was-scepter";
import EyeOfRaSymbol from "@/components/symbols/eye-of-ra";
import EgyptianSilhouetteSymbol from "@/components/symbols/egyptian-silhouette";
import { useContent, getContentValue } from "@/hooks/use-content";

export default function Home() {
  const { data: content } = useContent();
  const stats = [
    { label: "Lives Transformed", value: getContentValue(content, "lives_transformed", "500+"), icon: Users },
    { label: "Years Experience", value: getContentValue(content, "years_experience", "15+"), icon: Clock },
    { label: "Success Rate", value: getContentValue(content, "success_rate", "95%"), icon: Target },
  ];

  const programs = [
    {
      title: getContentValue(content, "strength_training_title", "Strength Training"),
      description: getContentValue(content, "strength_training_description", "Build unbreakable physical and mental strength through progressive resistance training and mindset coaching."),
      price: getContentValue(content, "strength_training_price", "$125"),
      duration: getContentValue(content, "strength_training_duration", "Per Month"),
      icon: AnkhSymbol,
      features: [
        getContentValue(content, "strength_training_feature_1", "Personalized Training Plans"), 
        getContentValue(content, "strength_training_feature_2", "Nutrition Guidance"), 
        getContentValue(content, "strength_training_feature_3", "Progress Tracking")
      ]
    },
    {
      title: getContentValue(content, "self_defense_title", "Self Defense"),
      description: getContentValue(content, "self_defense_description", "Master practical self-defense techniques while building confidence and situational awareness."),
      price: getContentValue(content, "self_defense_price", "Custom"),
      duration: getContentValue(content, "self_defense_duration", "Flexible"),
      icon: WasScepterSymbol,
      features: [
        getContentValue(content, "self_defense_feature_1", "Practical Combat Techniques"), 
        getContentValue(content, "self_defense_feature_2", "Situational Awareness"), 
        getContentValue(content, "self_defense_feature_3", "Confidence Building")
      ]
    },
    {
      title: getContentValue(content, "mindset_coaching_title", "Mindset Coaching"),
      description: getContentValue(content, "mindset_coaching_description", "Overcome mental barriers and develop the warrior mindset needed for lasting transformation."),
      price: getContentValue(content, "mindset_coaching_price", "$50"),
      duration: getContentValue(content, "mindset_coaching_duration", "Per Half Hour"),
      icon: EyeOfRaSymbol,
      features: [
        getContentValue(content, "mindset_coaching_feature_1", "Mental Resilience Training"), 
        getContentValue(content, "mindset_coaching_feature_2", "Goal Achievement"), 
        getContentValue(content, "mindset_coaching_feature_3", "Adversity Overcoming")
      ]
    }
  ];

  const testimonials = [
    {
      name: getContentValue(content, "cathy_name", "Cathy Nadolski"),
      program: getContentValue(content, "cathy_program", "11+ Year Transformation Journey"),
      rating: 5,
      text: getContentValue(content, "cathy_testimonial", "My journey with Dessie and IDS began in 2013 at age 54. Over the years, Dessie has transformed me in ways that I didn't know I was capable of doing. He always believed in me! He would ask me 'why are you working out?' I told him I needed to be healthy for my special needs daughter and my aging mother as I care for them both. Over the years I was able to squat 205#, an accomplishment that still amazes me. A couple years ago I got the call from my mom stating she needed help because she fell and couldn't get up. I was able to help her because of my training with Dessie."),
      initials: getContentValue(content, "cathy_name", "Cathy Nadolski").split(' ').map(n => n[0]).join('')
    },
    {
      name: getContentValue(content, "jessica_name", "Jessica Davis"),
      program: getContentValue(content, "jessica_program", "Strength Training Graduate"),
      rating: 5,
      text: getContentValue(content, "jessica_testimonial", "Master Cheers didn't just transform my body—he transformed my entire mindset. I went from feeling defeated to feeling unstoppable."),
      initials: "JD"
    },
    {
      name: getContentValue(content, "marcus_name", "Marcus Thompson"),
      program: getContentValue(content, "marcus_program", "Self Defense Student"),
      rating: 5,
      text: getContentValue(content, "marcus_testimonial", "The self-defense training gave me confidence I never knew I had. It taught me how to face any challenge in life with courage."),
      initials: getContentValue(content, "marcus_name", "Marcus Thompson").split(' ').map(n => n[0]).join('')
    },
    {
      name: getContentValue(content, "angela_name", "Angela Rodriguez"),
      program: getContentValue(content, "angela_program", "Complete Transformation"),
      rating: 5,
      text: getContentValue(content, "angela_testimonial", "I lost 40 pounds, but what I really gained was my life back. The mindset coaching helped me overcome impossible obstacles."),
      initials: "AR"
    }
  ];

  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 hero-gradient"></div>
        <div className="absolute inset-0 strength-pattern"></div>
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-20"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1534438327276-14e5300c3a48?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&h=1080')"
          }}
        />
        
        {/* Animated floating elements */}
        <div className="absolute top-20 left-20 w-2 h-2 bg-iron-blue-400 rounded-full animate-ping opacity-60"></div>
        <div className="absolute top-40 right-32 w-1 h-1 bg-iron-blue-300 rounded-full animate-pulse opacity-40"></div>
        <div className="absolute bottom-32 left-40 w-1.5 h-1.5 bg-iron-blue-500 rounded-full animate-bounce opacity-50"></div>
        
        <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="max-w-4xl mx-auto">
            {/* Iron Dog Strength Logo */}
            <div className="mb-8 flex justify-center">
              <img 
                src="/iron-dog-logo.jpg" 
                alt="Iron Dog Strength Logo" 
                className="w-32 h-32 md:w-40 md:h-40 rounded-2xl shadow-2xl object-cover border-4 border-white/20 backdrop-blur-sm"
              />
            </div>
            
            <h1 className="text-6xl md:text-8xl font-black text-white mb-6 tracking-tight leading-none">
              {getContentValue(content, "hero_title", "TRANSFORM YOUR MIND AND BODY")}
            </h1>
            <p className="text-xl md:text-2xl text-slate-100 mb-8 font-light max-w-3xl mx-auto leading-relaxed opacity-90">
              {getContentValue(content, "coach_name", "Master Dessie L. Cheers")}
              <span className="block mt-2 text-iron-blue-200 font-medium">
                {getContentValue(content, "hero_subtitle", "Overcome Adversity. Build Inexorable Confidence.")}
              </span>
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <Link href="/schedule">
                <Button 
                  size="lg"
                  className="relative bg-gradient-to-r from-iron-blue-600 to-iron-blue-700 hover:from-iron-blue-700 hover:to-iron-blue-800 text-white px-10 py-5 text-lg font-bold shadow-2xl transform hover:scale-105 transition-all duration-300 border-0 overflow-hidden group"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
                  <span className="relative z-10 flex items-center">
                    Start Your Journey
                    <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform duration-300" size={20} />
                  </span>
                </Button>
              </Link>
              <Link href="/about">
                <Button 
                  variant="outline"
                  size="lg"
                  className="glass-effect text-white border-iron-blue-300/30 px-10 py-5 text-lg font-bold hover:bg-white/20 backdrop-blur-sm relative group overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-iron-blue-400/20 to-iron-blue-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <span className="relative z-10">Meet Your Coach</span>
                </Button>
              </Link>
            </div>
            
            {/* Stats */}
            <div className="grid grid-cols-3 gap-8 mt-20 max-w-3xl mx-auto">
              {stats.map((stat, index) => (
                <div key={index} className="text-center group">
                  <div className="glass-effect rounded-2xl p-6 hover:bg-white/20 transition-all duration-300 group-hover:scale-105">
                    <div className="w-12 h-12 bg-gradient-to-br from-iron-blue-400 to-iron-blue-600 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:rotate-12 transition-transform duration-300">
                      <stat.icon className="text-white" size={24} />
                    </div>
                    <div className="text-3xl font-black text-white mb-2 group-hover:text-iron-blue-300 transition-colors duration-300">
                      {stat.value}
                    </div>
                    <div className="text-slate-200 text-sm font-medium uppercase tracking-wide">
                      {stat.label}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Programs Section */}
      <section className="py-24 relative overflow-hidden" style={{
        background: `linear-gradient(135deg, 
          rgba(219, 234, 254, 0.7) 0%, 
          rgba(191, 219, 254, 0.8) 30%,
          rgba(147, 197, 253, 0.6) 60%,
          rgba(186, 230, 253, 0.9) 100%)`
      }}>
        {/* Egyptian Symbols Background */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-20 right-20 w-32 h-32 text-iron-blue-400 rotate-12">
            <CaduceusSymbol />
          </div>
          <div className="absolute bottom-32 left-32 w-28 h-28 text-iron-blue-500 -rotate-12">
            <ScalesSymbol />
          </div>
          <div className="absolute top-60 left-20 w-20 h-20 text-iron-blue-300 rotate-45">
            <AnkhSymbol />
          </div>
          <div className="absolute bottom-60 right-40 w-24 h-24 text-iron-blue-400 -rotate-30">
            <WasScepterSymbol />
          </div>
          <div className="absolute top-40 left-60 w-18 h-18 text-iron-blue-300 rotate-90">
            <EyeOfRaSymbol />
          </div>
          <div className="absolute top-1/2 right-1/4 w-48 h-48 opacity-20 rotate-12">
            <EgyptianSilhouetteSymbol />
          </div>
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
          <div className="text-center mb-20">
            <h2 className="text-5xl md:text-6xl font-black text-iron-blue-900 mb-6 leading-tight">
              <span className="bg-gradient-to-r from-iron-blue-700 to-iron-blue-800 bg-clip-text text-transparent">
                Transform Through Training
              </span>
            </h2>
            <p className="text-xl text-iron-blue-700 max-w-3xl mx-auto leading-relaxed">
              Choose your path to physical and mental excellence with our proven training programs
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {programs.map((program, index) => (
              <Card key={index} className="group relative overflow-hidden bg-white/70 backdrop-blur-md border-2 border-iron-blue-200 hover:border-iron-blue-400 hover:shadow-2xl transition-all duration-500 hover:-translate-y-2" style={{
                background: `linear-gradient(135deg, 
                  rgba(255, 255, 255, 0.8) 0%, 
                  rgba(219, 234, 254, 0.6) 50%,
                  rgba(255, 255, 255, 0.9) 100%)`
              }}>
                <div className="absolute inset-0 bg-gradient-to-br from-iron-blue-100/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <CardContent className="relative p-8">
                  <div className="flex items-center mb-6">
                    <div className="relative">
                      <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center mr-4 group-hover:scale-110 transition-transform duration-300 shadow-lg p-3 border-2 border-iron-blue-200">
                        <div className="w-full h-full text-iron-blue-700">
                          <program.icon />
                        </div>
                      </div>
                      <div className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full opacity-80"></div>
                    </div>
                    <h3 className="text-3xl font-black text-iron-blue-900 group-hover:text-iron-blue-700 transition-colors duration-300">
                      {program.title}
                    </h3>
                  </div>
                  
                  <p className="text-iron-blue-700 mb-8 leading-relaxed text-lg">
                    {program.description}
                  </p>
                  
                  <div className="space-y-4 mb-8">
                    {program.features.map((feature, idx) => (
                      <div key={idx} className="flex items-center text-iron-blue-800 group-hover:text-iron-blue-900 transition-colors duration-300">
                        <div className="w-3 h-3 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-full mr-4 shadow-sm" />
                        <span className="font-medium">{feature}</span>
                      </div>
                    ))}
                  </div>
                  
                  <div className="border-t-2 border-iron-blue-200 pt-6">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <div className="text-4xl font-black text-iron-blue-700 mb-1">{program.price}</div>
                        <div className="text-iron-blue-600 font-semibold">{program.duration}</div>
                      </div>
                    </div>
                    <Link href="/schedule">
                      <Button className="w-full bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white font-bold py-4 text-lg shadow-lg hover:shadow-xl transition-all duration-300 group-hover:scale-105 border-0">
                        Start Training
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* About Preview Section */}
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
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-72 h-72 opacity-15">
            <EgyptianSilhouetteSymbol />
          </div>
        </div>
        
        {/* Glossy overlay effect */}
        <div className="absolute inset-0 bg-gradient-to-br from-transparent via-white/10 to-transparent pointer-events-none"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-iron-blue-500/20 rounded-xl flex items-center justify-center mr-4">
                  <Star className="text-iron-blue-600" size={24} />
                </div>
                <h2 className="text-4xl font-bold text-iron-blue-900">{getContentValue(content, "meet_coach_title", "Meet Your Coach")}</h2>
              </div>
              
              <h3 className="text-2xl font-semibold text-iron-blue-900 mb-4">{getContentValue(content, "coach_name", "Master Dessie L. Cheers")}</h3>
              <p className="text-iron-blue-700 text-lg mb-6 leading-relaxed">
                {getContentValue(content, "coach_title", "Private Self Defense Instructor & Motivational Coach")}
              </p>
              
              <p className="text-iron-blue-700 leading-relaxed mb-8">
                With over {getContentValue(content, "experience_description", "15+")} of experience in martial arts and strength conditioning, Master Cheers has 
                dedicated his life to helping others overcome their limitations and achieve extraordinary results. 
                Located at Iron Dog Strength Training Facility in Avon, Ohio.
              </p>
              
              <blockquote className="border-l-4 border-iron-blue-600 pl-6 py-4 ice-blue-glass rounded-r-xl mb-8">
                <p className="text-iron-blue-900 italic mb-2">
                  "{getContentValue(content, "coach_quote", "True strength comes from overcoming the battles within yourself. Every challenge is an opportunity to grow stronger.")}"
                </p>
                <footer className="text-iron-blue-700 font-semibold">— {getContentValue(content, "coach_name", "Master Dessie L. Cheers")}</footer>
              </blockquote>
              
              <Link href="/about">
                <Button variant="outline" className="border-iron-blue-600 text-iron-blue-700 hover:bg-iron-blue-600 hover:text-white bg-white/60 backdrop-blur-sm">
                  Learn More About Coach
                  <ArrowRight className="ml-2" size={16} />
                </Button>
              </Link>
            </div>
            
            <div className="relative">
              <img 
                src="/coach-photo.jpg" 
                alt="Master Dessie L. Cheers - Iron Dog Strength Founder" 
                className="w-full h-auto object-contain rounded-2xl shadow-2xl bg-gradient-to-br from-iron-blue-50 to-iron-blue-100"
              />
              <div className="absolute -bottom-6 -right-6 w-16 h-16 bg-iron-blue-600 rounded-full flex items-center justify-center shadow-lg">
                <Medal className="text-white" size={24} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-24 relative overflow-hidden" style={{
        background: `linear-gradient(135deg, 
          rgba(147, 197, 253, 0.3) 0%, 
          rgba(219, 234, 254, 0.5) 30%,
          rgba(191, 219, 254, 0.4) 60%,
          rgba(186, 230, 253, 0.6) 100%)`
      }}>
        <div className="absolute inset-0">
          <div className="absolute top-20 left-20 w-96 h-96 bg-iron-blue-600 rounded-full mix-blend-screen filter blur-3xl opacity-20 animate-pulse"></div>
          <div className="absolute bottom-20 right-20 w-80 h-80 bg-purple-600 rounded-full mix-blend-screen filter blur-3xl opacity-15 animate-pulse animation-delay-2000"></div>
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-5xl md:text-6xl font-black mb-6 leading-tight text-iron-blue-900">
              Transformation Stories
            </h2>
            <p className="text-xl text-iron-blue-700 max-w-3xl mx-auto leading-relaxed">
              Real results from real people who chose to transform their lives
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="group relative overflow-hidden backdrop-blur-md border-2 border-iron-blue-200 shadow-2xl hover:shadow-3xl transition-all duration-500 hover:-translate-y-3" style={{
                background: `linear-gradient(135deg, 
                  rgba(255, 255, 255, 0.9) 0%, 
                  rgba(219, 234, 254, 0.8) 50%,
                  rgba(255, 255, 255, 0.95) 100%)`
              }}>
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-iron-blue-400 via-purple-400 to-pink-400"></div>
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    <div className="flex text-yellow-400 space-x-1">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} size={16} fill="currentColor" className="drop-shadow-sm" />
                      ))}
                    </div>
                  </div>
                  <blockquote className={`text-iron-blue-800 mb-6 leading-relaxed text-base font-medium relative ${testimonial.name === 'Cathy Nadolski' ? 'h-32 overflow-y-auto scrollbar-thin scrollbar-thumb-iron-blue-300 scrollbar-track-transparent hover:scrollbar-thumb-iron-blue-400' : ''}`}>
                    <div className="absolute -top-1 -left-1 text-4xl text-iron-blue-400 font-serif opacity-60">"</div>
                    <div className="relative z-10 pl-4">
                      {testimonial.text}
                    </div>
                  </blockquote>
                  <div className="flex items-center">
                    <div className="w-12 h-12 bg-gradient-to-br from-iron-blue-500 to-iron-blue-700 rounded-xl flex items-center justify-center mr-3 shadow-lg group-hover:scale-110 transition-transform duration-300">
                      <span className="font-black text-white text-sm">{testimonial.initials}</span>
                    </div>
                    <div>
                      <div className="font-bold text-iron-blue-900 text-base">{testimonial.name}</div>
                      <div className="text-iron-blue-700 font-semibold text-xs uppercase tracking-wide">{testimonial.program}</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 relative overflow-hidden" style={{
        background: `linear-gradient(135deg, 
          rgba(30, 58, 138, 0.95) 0%, 
          rgba(37, 99, 235, 0.9) 50%,
          rgba(29, 78, 216, 0.95) 100%)`
      }}>
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.3)_1px,transparent_1px)] bg-[length:60px_60px]"></div>
        </div>
        <div className="relative max-w-5xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-6xl md:text-7xl font-black mb-6 leading-tight text-white drop-shadow-lg">
            Ready to Transform Your Life?
          </h2>
          <p className="text-2xl text-white mb-12 leading-relaxed max-w-3xl mx-auto drop-shadow-md font-medium">
            Take the first step towards becoming the strongest version of yourself
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Link href="/schedule">
              <Button 
                size="lg"
                className="relative bg-gradient-to-r from-iron-blue-600 to-iron-blue-700 hover:from-iron-blue-700 hover:to-iron-blue-800 text-white px-12 py-6 text-xl font-black shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-105 overflow-hidden group border-0"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
                <span className="relative z-10">Schedule Your Session</span>
              </Button>
            </Link>
            <Link href="/contact">
              <Button 
                variant="outline"
                size="lg"
                className="border-2 border-yellow-400 text-yellow-400 hover:bg-yellow-400 hover:text-iron-blue-900 px-12 py-6 text-xl font-black hover:scale-105 transition-all duration-300 bg-transparent"
              >
                Get In Touch
              </Button>
            </Link>
          </div>
        </div>
      </section>
      
      {/* Daily Motivation Audio Player - Floating */}
      <DailyMotivationPlayer />
    </div>
  );
}

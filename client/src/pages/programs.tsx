import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link } from "wouter";
import { 
  Dumbbell, 
  Shield, 
  Brain, 
  Users, 
  Clock, 
  Target, 
  CheckCircle, 
  Star,
  ArrowRight
} from "lucide-react";
import EgyptianSilhouetteSymbol from "@/components/symbols/egyptian-silhouette";

export default function Programs() {
  const programs = [
    {
      id: "strength",
      title: "Strength & Conditioning",
      subtitle: "Build Unbreakable Power",
      price: "$375",
      duration: "16 Total Sessions",
      paymentPlan: "1st session: $185 | 6th session: $115 | 10th session: $75",
      description: "Transform your body and mind through progressive resistance training combined with motivational coaching. Build functional strength, endurance, and mental resilience.",
      icon: Dumbbell,
      features: [
        "16 personalized training sessions",
        "Progressive resistance training",
        "Nutrition guidance and meal planning",
        "Mental resilience coaching",
        "Progress tracking and assessments",
        "24-hour cancellation policy (emergencies exempt)",
        "Consistent scheduling priority"
      ],
      benefits: [
        "Increased functional strength",
        "Improved body composition",
        "Enhanced mental toughness",
        "Better sleep and energy",
        "Injury prevention techniques",
        "Confidence building"
      ],
      image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600"
    },
    {
      id: "self-defense",
      title: "Self Defense Training",
      subtitle: "Master Personal Protection",
      price: "Custom Pricing",
      duration: "Flexible Scheduling",
      paymentPlan: "Contact for personalized pricing",
      description: "Learn practical self-defense techniques while building confidence and situational awareness. Master the skills needed to protect yourself and others.",
      icon: Shield,
      features: [
        "Practical combat techniques",
        "Situational awareness training",
        "Conflict de-escalation strategies",
        "Self-defense psychology",
        "Confidence building exercises",
        "Scenario-based training",
        "Personal safety planning"
      ],
      benefits: [
        "Increased personal safety",
        "Enhanced confidence",
        "Better situational awareness",
        "Stress management skills",
        "Physical fitness improvement",
        "Mental preparedness"
      ],
      image: "https://images.unsplash.com/photo-1555597673-b21d5c935865?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600"
    },
    {
      id: "mindset",
      title: "Mindset Coaching",
      subtitle: "Develop Warrior Mental Strength",
      price: "$150",
      duration: "Per Session",
      paymentPlan: "Individual sessions or package deals available",
      description: "Overcome mental barriers and develop the warrior mindset needed for lasting transformation in all areas of life.",
      icon: Brain,
      features: [
        "Mental resilience training",
        "Goal setting and achievement strategies",
        "Adversity overcoming techniques",
        "Limiting belief elimination",
        "Visualization and mental rehearsal",
        "Stress management coaching",
        "Performance optimization"
      ],
      benefits: [
        "Improved mental toughness",
        "Enhanced focus and clarity",
        "Better stress management",
        "Increased motivation",
        "Goal achievement success",
        "Emotional regulation"
      ],
      image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600"
    }
  ];

  const packageDeals = [
    {
      title: "Complete Transformation",
      description: "Strength Training + Mindset Coaching",
      originalPrice: "$525",
      packagePrice: "$450",
      savings: "$75",
      features: [
        "16 Strength Training Sessions",
        "4 Mindset Coaching Sessions", 
        "Nutrition Guidance",
        "Progress Tracking",
        "Priority Scheduling"
      ]
    },
    {
      title: "Warrior Package",
      description: "All Programs Combined",
      originalPrice: "Custom",
      packagePrice: "Contact for Pricing",
      savings: "Significant Savings",
      features: [
        "Strength & Conditioning",
        "Self Defense Training",
        "Mindset Coaching",
        "Personalized Plan",
        "Flexible Scheduling"
      ]
    }
  ];

  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="py-20 relative overflow-hidden" style={{
        background: `linear-gradient(135deg, 
          rgba(219, 234, 254, 0.7) 0%, 
          rgba(191, 219, 254, 0.8) 30%,
          rgba(147, 197, 253, 0.6) 60%,
          rgba(186, 230, 253, 0.9) 100%)`
      }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="mb-8 flex justify-center">
            <img 
              src="/iron-dog-logo.jpg" 
              alt="Iron Dog Strength Logo" 
              className="w-20 h-20 md:w-24 md:h-24 rounded-xl shadow-lg object-cover"
            />
          </div>
          <h1 className="text-5xl font-bold mb-6 text-iron-blue-900">Training Programs</h1>
          <p className="text-xl text-iron-blue-700 max-w-3xl mx-auto mb-8">
            Choose your path to transformation with our proven training programs designed to build both physical and mental strength
          </p>
          <div className="flex justify-center items-center space-x-8 text-iron-blue-600">
            <div className="flex items-center">
              <Users className="mr-2" size={20} />
              <span>500+ Transformations</span>
            </div>
            <div className="flex items-center">
              <Clock className="mr-2" size={20} />
              <span>15+ Years Experience</span>
            </div>
            <div className="flex items-center">
              <Target className="mr-2" size={20} />
              <span>95% Success Rate</span>
            </div>
          </div>
        </div>
      </section>

      {/* Programs Section */}
      <section className="py-20 relative overflow-hidden" style={{
        background: `linear-gradient(135deg, 
          rgba(255, 255, 255, 0.8) 0%, 
          rgba(219, 234, 254, 0.4) 50%,
          rgba(255, 255, 255, 0.9) 100%)`
      }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-16">
            {programs.map((program, index) => (
              <div key={program.id} className={`grid lg:grid-cols-2 gap-12 items-center ${
                index % 2 === 1 ? 'lg:grid-flow-col-dense' : ''
              }`}>
                <div className={index % 2 === 1 ? 'lg:col-start-2' : ''}>
                  <div className="flex items-center mb-6">
                    <div className="w-12 h-12 bg-iron-blue-100 rounded-xl flex items-center justify-center mr-4">
                      <program.icon className="text-iron-blue-600" size={24} />
                    </div>
                    <div>
                      <h2 className="text-3xl font-bold text-foreground">{program.title}</h2>
                      <p className="text-iron-blue-600 font-semibold">{program.subtitle}</p>
                    </div>
                  </div>

                  <p className="text-muted-foreground text-lg mb-6 leading-relaxed">
                    {program.description}
                  </p>

                  <div className="grid md:grid-cols-2 gap-6 mb-8">
                    <Card className="border">
                      <CardContent className="p-6">
                        <h4 className="font-bold text-foreground mb-4">What's Included</h4>
                        <div className="space-y-2">
                          {program.features.slice(0, 4).map((feature, idx) => (
                            <div key={idx} className="flex items-start">
                              <CheckCircle className="text-emerald-500 mr-2 mt-0.5 flex-shrink-0" size={16} />
                              <span className="text-sm text-muted-foreground">{feature}</span>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>

                    <Card className="border">
                      <CardContent className="p-6">
                        <h4 className="font-bold text-foreground mb-4">Key Benefits</h4>
                        <div className="space-y-2">
                          {program.benefits.slice(0, 4).map((benefit, idx) => (
                            <div key={idx} className="flex items-start">
                              <Star className="text-yellow-500 mr-2 mt-0.5 flex-shrink-0" size={16} />
                              <span className="text-sm text-muted-foreground">{benefit}</span>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  <div className="bg-slate-50 rounded-xl p-6 mb-6">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <div className="text-3xl font-bold text-foreground">{program.price}</div>
                        <div className="text-muted-foreground">{program.duration}</div>
                      </div>
                      <Badge className="bg-iron-blue-100 text-iron-blue-600 hover:bg-iron-blue-100">
                        Popular Choice
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mb-4">
                      Payment Plan: {program.paymentPlan}
                    </p>
                    <Link href="/schedule">
                      <Button className="w-full bg-iron-blue-600 hover:bg-iron-blue-700 text-white">
                        Start {program.title}
                        <ArrowRight className="ml-2" size={16} />
                      </Button>
                    </Link>
                  </div>
                </div>

                <div className={index % 2 === 1 ? 'lg:col-start-1 lg:row-start-1' : ''}>
                  <div 
                    className="w-full h-96 bg-cover bg-center rounded-2xl shadow-lg"
                    style={{ backgroundImage: `url('${program.image}')` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Package Deals */}
      <section className="py-20 relative overflow-hidden" style={{
        background: `linear-gradient(135deg, 
          rgba(255, 255, 255, 0.8) 0%, 
          rgba(219, 234, 254, 0.4) 50%,
          rgba(255, 255, 255, 0.9) 100%)`
      }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-foreground mb-4">Package Deals</h2>
            <p className="text-xl text-muted-foreground">
              Combine programs for maximum results and savings
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {packageDeals.map((deal, index) => (
              <Card key={index} className="border-2 border-iron-blue-200 shadow-lg" style={{
                background: `linear-gradient(135deg, 
                  rgba(255, 255, 255, 0.9) 0%, 
                  rgba(219, 234, 254, 0.6) 50%,
                  rgba(255, 255, 255, 0.95) 100%)`
              }}>
                <CardContent className="p-8">
                  <div className="text-center mb-6">
                    <h3 className="text-2xl font-bold text-foreground mb-2">{deal.title}</h3>
                    <p className="text-muted-foreground">{deal.description}</p>
                  </div>

                  <div className="text-center mb-6">
                    <div className="flex items-center justify-center space-x-4 mb-2">
                      <span className="text-lg text-muted-foreground line-through">{deal.originalPrice}</span>
                      <span className="text-3xl font-bold text-iron-blue-600">{deal.packagePrice}</span>
                    </div>
                    <Badge className="bg-emerald-100 text-emerald-600 hover:bg-emerald-100">
                      Save {deal.savings}
                    </Badge>
                  </div>

                  <div className="space-y-3 mb-8">
                    {deal.features.map((feature, idx) => (
                      <div key={idx} className="flex items-center">
                        <CheckCircle className="text-emerald-500 mr-3 flex-shrink-0" size={16} />
                        <span className="text-muted-foreground">{feature}</span>
                      </div>
                    ))}
                  </div>

                  <Link href="/schedule">
                    <Button className="w-full bg-gradient-to-r from-iron-blue-600 to-iron-blue-700 hover:from-iron-blue-700 hover:to-iron-blue-800 text-white font-bold shadow-lg hover:shadow-xl transition-all duration-300 border-0">
                      Get This Package
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Training Agreement Info */}
      <section className="py-20 relative overflow-hidden" style={{
        background: `linear-gradient(135deg, 
          rgba(219, 234, 254, 0.7) 0%, 
          rgba(191, 219, 254, 0.8) 30%,
          rgba(147, 197, 253, 0.6) 60%,
          rgba(186, 230, 253, 0.9) 100%)`
      }}>
        {/* Egyptian Silhouette Background */}
        <div className="absolute inset-0 opacity-8">
          <div className="absolute top-1/3 right-1/4 w-64 h-64 opacity-10 rotate-6">
            <EgyptianSilhouetteSymbol />
          </div>
        </div>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-foreground mb-4">Training Terms & Policies</h2>
            <p className="text-xl text-muted-foreground">
              Clear guidelines to ensure the best training experience for everyone
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <Card className="border-2 border-iron-blue-200" style={{
              background: `linear-gradient(135deg, 
                rgba(255, 255, 255, 0.9) 0%, 
                rgba(219, 234, 254, 0.6) 50%,
                rgba(255, 255, 255, 0.95) 100%)`
            }}>
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold text-foreground mb-4">Scheduling Policies</h3>
                <div className="space-y-3">
                  <div className="flex items-start">
                    <CheckCircle className="text-emerald-500 mr-3 mt-0.5 flex-shrink-0" size={16} />
                    <span className="text-muted-foreground">24-hour cancellation notice required</span>
                  </div>
                  <div className="flex items-start">
                    <CheckCircle className="text-emerald-500 mr-3 mt-0.5 flex-shrink-0" size={16} />
                    <span className="text-muted-foreground">Emergency and illness exceptions</span>
                  </div>
                  <div className="flex items-start">
                    <CheckCircle className="text-emerald-500 mr-3 mt-0.5 flex-shrink-0" size={16} />
                    <span className="text-muted-foreground">Consistent scheduling encouraged</span>
                  </div>
                  <div className="flex items-start">
                    <CheckCircle className="text-emerald-500 mr-3 mt-0.5 flex-shrink-0" size={16} />
                    <span className="text-muted-foreground">20-minute late policy</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-2 border-iron-blue-200" style={{
              background: `linear-gradient(135deg, 
                rgba(255, 255, 255, 0.9) 0%, 
                rgba(219, 234, 254, 0.6) 50%,
                rgba(255, 255, 255, 0.95) 100%)`
            }}>
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold text-foreground mb-4">Safety & Liability</h3>
                <div className="space-y-3">
                  <div className="flex items-start">
                    <Shield className="text-iron-blue-500 mr-3 mt-0.5 flex-shrink-0" size={16} />
                    <span className="text-muted-foreground">Liability waiver required</span>
                  </div>
                  <div className="flex items-start">
                    <Shield className="text-iron-blue-500 mr-3 mt-0.5 flex-shrink-0" size={16} />
                    <span className="text-muted-foreground">Medical condition disclosure</span>
                  </div>
                  <div className="flex items-start">
                    <Shield className="text-iron-blue-500 mr-3 mt-0.5 flex-shrink-0" size={16} />
                    <span className="text-muted-foreground">Professional instruction provided</span>
                  </div>
                  <div className="flex items-start">
                    <Shield className="text-iron-blue-500 mr-3 mt-0.5 flex-shrink-0" size={16} />
                    <span className="text-muted-foreground">Safe training environment</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Training Schedule */}
          <div className="mt-16 mb-12">
            <Card className="border-2 border-iron-blue-200 shadow-lg" style={{
              background: `linear-gradient(135deg, 
                rgba(255, 255, 255, 0.9) 0%, 
                rgba(219, 234, 254, 0.6) 50%,
                rgba(255, 255, 255, 0.95) 100%)`
            }}>
              <CardContent className="p-8">
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold text-iron-blue-900 mb-4">Training Schedule</h3>
                  <p className="text-iron-blue-700">
                    Schedule your sessions during our available training hours
                  </p>
                </div>
                
                <div className="max-w-2xl mx-auto">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-3">
                      <div className="flex items-center text-iron-blue-700">
                        <Clock className="text-iron-blue-500 mr-3" size={16} />
                        <span>Saturday-Sunday: 1:30 PM - 5:00 PM</span>
                      </div>
                      <div className="flex items-center text-iron-blue-700">
                        <Clock className="text-iron-blue-500 mr-3" size={16} />
                        <span>Monday: 8:00 PM - 10:00 PM</span>
                      </div>
                      <div className="flex items-center text-iron-blue-700">
                        <Clock className="text-iron-blue-500 mr-3" size={16} />
                        <span>Tuesday: 6:30 PM - 8:00 PM</span>
                      </div>
                    </div>
                    <div className="space-y-3">
                      <div className="flex items-center text-iron-blue-700">
                        <Clock className="text-iron-blue-500 mr-3" size={16} />
                        <span>Wednesday: Closed</span>
                      </div>
                      <div className="flex items-center text-iron-blue-700">
                        <Clock className="text-iron-blue-500 mr-3" size={16} />
                        <span>Thursday: 8:00 PM - 10:00 PM</span>
                      </div>
                      <div className="flex items-center text-iron-blue-700">
                        <Clock className="text-iron-blue-500 mr-3" size={16} />
                        <span>Friday: 6:30 PM - 8:30 PM</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="text-center mt-12">
            <p className="text-iron-blue-700 mb-8 text-lg font-medium">
              All training requires a signed agreement and liability waiver. Digital signing available during booking.
            </p>
            <div className="bg-gradient-to-r from-iron-blue-50 to-ice-blue-50 rounded-2xl p-8 shadow-xl border-2 border-iron-blue-200">
              <h3 className="text-2xl font-bold text-iron-blue-900 mb-4">Ready to Start Your Transformation?</h3>
              <p className="text-iron-blue-700 mb-6 text-lg">
                Take the first step towards building inexorable confidence and strength.
              </p>
              <Link href="/schedule">
                <Button 
                  size="lg" 
                  className="bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white font-bold text-xl px-12 py-6 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 border-0 rounded-xl"
                >
                  Book Your Session Today
                  <ArrowRight className="ml-3" size={24} />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

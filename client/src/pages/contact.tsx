import { useState } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import { contactApi } from "@/lib/api";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  Shield, 
  MessageCircle,
  CheckCircle
} from "lucide-react";
import EgyptianSilhouetteSymbol from "@/components/symbols/egyptian-silhouette";

export default function Contact() {
  const { toast } = useToast();
  
  // Fetch dynamic content
  const { data: content } = useQuery({
    queryKey: ["/api/content"],
  });
  
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    interests: [] as string[],
    message: "",
  });

  const sendMessageMutation = useMutation({
    mutationFn: contactApi.send,
    onSuccess: () => {
      toast({
        title: "Message Sent!",
        description: "Thank you for your message. We'll get back to you within 24 hours.",
      });
      // Reset form
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        interests: [],
        message: "",
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to send message. Please try again.",
        variant: "destructive",
      });
    },
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleInterestChange = (interest: string, checked: boolean) => {
    setFormData(prev => ({
      ...prev,
      interests: checked 
        ? [...prev.interests, interest]
        : prev.interests.filter(i => i !== interest)
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.firstName || !formData.lastName || !formData.email || !formData.message) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    sendMessageMutation.mutate({
      ...formData,
      interests: JSON.stringify(formData.interests),
    });
  };

  const interestOptions = [
    "Strength Training",
    "Self Defense",
    "Mindset Coaching",
    "Weight Loss",
    "Muscle Building",
    "Athletic Performance",
    "Injury Recovery",
    "General Fitness"
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
        {/* Egyptian Silhouette Background */}
        <div className="absolute inset-0 opacity-8">
          <div className="absolute top-1/2 left-1/3 w-56 h-56 opacity-12 -rotate-12">
            <EgyptianSilhouetteSymbol />
          </div>
        </div>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="mb-8 flex justify-center">
            <img 
              src="/iron-dog-logo.jpg" 
              alt="Iron Dog Strength Logo" 
              className="w-20 h-20 md:w-24 md:h-24 rounded-xl shadow-lg object-cover"
            />
          </div>
          <h1 className="text-5xl font-bold mb-6 text-iron-blue-900">
            {(content as any)?.contact_page_title || "GET IN TOUCH"}
          </h1>
          <p className="text-xl text-iron-blue-700 mb-8">
            {(content as any)?.contact_page_subtitle || "Ready to Transform Your Life?"}
          </p>
          <div className="flex justify-center items-center space-x-8 text-iron-blue-600">
            <div className="flex items-center">
              <MessageCircle className="mr-2" size={20} />
              <span>{(content as any)?.quick_response_text || "Quick Response"}</span>
            </div>
            <div className="flex items-center">
              <CheckCircle className="mr-2" size={20} />
              <span>{(content as any)?.free_consultation_text || "Free Consultation"}</span>
            </div>
            <div className="flex items-center">
              <Shield className="mr-2" size={20} />
              <span>{(content as any)?.no_obligation_text || "No Obligation"}</span>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 relative overflow-hidden" style={{
        background: `linear-gradient(135deg, 
          rgba(255, 255, 255, 0.8) 0%, 
          rgba(219, 234, 254, 0.4) 50%,
          rgba(255, 255, 255, 0.9) 100%)`
      }}>
        {/* Egyptian Silhouette Background */}
        <div className="absolute inset-0 opacity-8">
          <div className="absolute bottom-1/4 right-1/3 w-48 h-48 opacity-10 rotate-15">
            <EgyptianSilhouetteSymbol />
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16">
            {/* Contact Information */}
            <div>
              <h2 className="text-3xl font-bold text-foreground mb-8">{(content as any)?.contact_info_header || "Contact Information"}</h2>
              
              {/* Location */}
              <Card className="mb-8 border">
                <CardContent className="p-8">
                  <div className="flex items-center mb-4">
                    <MapPin className="text-iron-blue-500 mr-3" size={24} />
                    <h3 className="text-2xl font-bold text-foreground">{(content as any)?.training_location_title || "Training Location"}</h3>
                  </div>
                  <div className="mb-6">
                    <h4 className="font-bold text-lg text-foreground">{(content as any)?.facility_name || "Iron Dog Strength Training Facility"}</h4>
                    <p className="text-muted-foreground">
                      35840 Chester Rd.<br />
                      Avon, OH 44011
                    </p>
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-center text-muted-foreground">
                      <Clock className="text-iron-blue-500 mr-3" size={16} />
                      <span>Saturday-Sunday: 1:30 PM - 5:00 PM</span>
                    </div>
                    <div className="flex items-center text-muted-foreground">
                      <Clock className="text-iron-blue-500 mr-3" size={16} />
                      <span>Monday: 8:00 PM - 10:00 PM</span>
                    </div>
                    <div className="flex items-center text-muted-foreground">
                      <Clock className="text-iron-blue-500 mr-3" size={16} />
                      <span>Tuesday: 6:30 PM - 8:00 PM</span>
                    </div>
                    <div className="flex items-center text-muted-foreground">
                      <Clock className="text-iron-blue-500 mr-3" size={16} />
                      <span>Wednesday: Closed</span>
                    </div>
                    <div className="flex items-center text-muted-foreground">
                      <Clock className="text-iron-blue-500 mr-3" size={16} />
                      <span>Thursday: 8:00 PM - 10:00 PM</span>
                    </div>
                    <div className="flex items-center text-muted-foreground">
                      <Clock className="text-iron-blue-500 mr-3" size={16} />
                      <span>Friday: 6:30 PM - 8:30 PM</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Contact Details */}
              <div className="space-y-6">
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-iron-blue-100 rounded-xl flex items-center justify-center mr-4">
                    <Phone className="text-iron-blue-600" size={20} />
                  </div>
                  <div>
                    <div className="font-semibold text-foreground">Master Dessie L. Cheers</div>
                    <div className="text-muted-foreground">{(content as any)?.contact_phone || "(440) 281-7930"}</div>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-iron-blue-100 rounded-xl flex items-center justify-center mr-4">
                    <Phone className="text-iron-blue-600" size={20} />
                  </div>
                  <div>
                    <div className="font-semibold text-foreground">Jaden Matias - Assistant Trainer</div>
                    <div className="text-muted-foreground">(440) 420-7694</div>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-iron-blue-100 rounded-xl flex items-center justify-center mr-4">
                    <Mail className="text-iron-blue-600" size={20} />
                  </div>
                  <div>
                    <div className="font-semibold text-foreground">Email</div>
                    <div className="text-muted-foreground">{(content as any)?.contact_email || "train@irondogstrength.com"}</div>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-iron-blue-100 rounded-xl flex items-center justify-center mr-4">
                    <Shield className="text-iron-blue-600" size={20} />
                  </div>
                  <div>
                    <div className="font-semibold text-foreground">Emergency Policy</div>
                    <div className="text-muted-foreground">24/7 support for current clients</div>
                  </div>
                </div>
              </div>

              {/* Quick Facts */}
              <Card className="mt-8 bg-iron-blue-50 border-iron-blue-200">
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold text-foreground mb-4">{(content as any)?.why_choose_header || "Why Choose Iron Dog Strength?"}</h3>
                  <div className="space-y-3">
                    <div className="flex items-center">
                      <CheckCircle className="text-emerald-500 mr-3" size={16} />
                      <span className="text-muted-foreground">15+ years of proven experience</span>
                    </div>
                    <div className="flex items-center">
                      <CheckCircle className="text-emerald-500 mr-3" size={16} />
                      <span className="text-muted-foreground">500+ successful transformations</span>
                    </div>
                    <div className="flex items-center">
                      <CheckCircle className="text-emerald-500 mr-3" size={16} />
                      <span className="text-muted-foreground">Personalized training programs</span>
                    </div>
                    <div className="flex items-center">
                      <CheckCircle className="text-emerald-500 mr-3" size={16} />
                      <span className="text-muted-foreground">Complete mind-body approach</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Contact Form */}
            <div>
              <Card className="border-2 border-iron-blue-200 shadow-lg" style={{
                background: `linear-gradient(135deg, 
                  rgba(255, 255, 255, 0.9) 0%, 
                  rgba(219, 234, 254, 0.6) 50%,
                  rgba(255, 255, 255, 0.95) 100%)`
              }}>
                <CardContent className="p-8">
                  <h2 className="text-3xl font-bold text-foreground mb-6">{(content as any)?.send_message_header || "Send Us a Message"}</h2>
                  
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-foreground mb-2">
                          {(content as any)?.first_name_label || "First Name *"}
                        </label>
                        <Input
                          type="text"
                          value={formData.firstName}
                          onChange={(e) => handleInputChange("firstName", e.target.value)}
                          placeholder="Enter your first name"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-foreground mb-2">
                          {(content as any)?.last_name_label || "Last Name *"}
                        </label>
                        <Input
                          type="text"
                          value={formData.lastName}
                          onChange={(e) => handleInputChange("lastName", e.target.value)}
                          placeholder="Enter your last name"
                          required
                        />
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        {(content as any)?.email_label || "Email Address *"}
                      </label>
                      <Input
                        type="email"
                        value={formData.email}
                        onChange={(e) => handleInputChange("email", e.target.value)}
                        placeholder="Enter your email"
                        required
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        {(content as any)?.phone_label || "Phone Number"}
                      </label>
                      <Input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => handleInputChange("phone", e.target.value)}
                        placeholder="Enter your phone number"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-3">
                        I'm interested in: (Select all that apply)
                      </label>
                      <div className="grid grid-cols-2 gap-3">
                        {interestOptions.map((interest) => (
                          <div key={interest} className="flex items-center space-x-2">
                            <Checkbox
                              id={interest}
                              checked={formData.interests.includes(interest)}
                              onCheckedChange={(checked) => 
                                handleInterestChange(interest, checked as boolean)
                              }
                            />
                            <label 
                              htmlFor={interest}
                              className="text-sm text-muted-foreground cursor-pointer"
                            >
                              {interest}
                            </label>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        Tell us about your goals *
                      </label>
                      <Textarea
                        rows={4}
                        value={formData.message}
                        onChange={(e) => handleInputChange("message", e.target.value)}
                        placeholder="What do you want to achieve? What challenges are you facing? Any questions about our programs?"
                        required
                      />
                    </div>
                    
                    <Button 
                      type="submit" 
                      className="w-full bg-iron-blue-600 hover:bg-iron-blue-700 text-white py-4"
                      disabled={sendMessageMutation.isPending}
                    >
                      {sendMessageMutation.isPending ? (
                        <>
                          <LoadingSpinner size="sm" className="mr-2" />
                          Sending Message...
                        </>
                      ) : (
                        "Send Message"
                      )}
                    </Button>
                    
                    <p className="text-xs text-muted-foreground text-center">
                      We typically respond within 24 hours. For urgent matters, please call us directly.
                    </p>
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-foreground mb-4">Frequently Asked Questions</h2>
            <p className="text-xl text-muted-foreground">
              Quick answers to common questions about our training programs
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            <Card className="border">
              <CardContent className="p-6">
                <h3 className="text-lg font-bold text-foreground mb-3">
                  Do I need experience to start training?
                </h3>
                <p className="text-muted-foreground">
                  Not at all! Our programs are designed for all fitness levels. Master Cheers will 
                  create a personalized plan that matches your current abilities and goals.
                </p>
              </CardContent>
            </Card>
            
            <Card className="border">
              <CardContent className="p-6">
                <h3 className="text-lg font-bold text-foreground mb-3">
                  What should I bring to my first session?
                </h3>
                <p className="text-muted-foreground">
                  Just comfortable workout clothes, water, and a positive attitude! All equipment 
                  is provided at the facility.
                </p>
              </CardContent>
            </Card>
            
            <Card className="border">
              <CardContent className="p-6">
                <h3 className="text-lg font-bold text-foreground mb-3">
                  How often should I train?
                </h3>
                <p className="text-muted-foreground">
                  Most clients see best results with 2-3 sessions per week. We'll work together 
                  to create a schedule that fits your lifestyle and goals.
                </p>
              </CardContent>
            </Card>
            
            <Card className="border">
              <CardContent className="p-6">
                <h3 className="text-lg font-bold text-foreground mb-3">
                  Can I cancel or reschedule sessions?
                </h3>
                <p className="text-muted-foreground">
                  Yes, with 24-hour advance notice. Emergency situations and sudden illness 
                  are exempt from this policy.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
}

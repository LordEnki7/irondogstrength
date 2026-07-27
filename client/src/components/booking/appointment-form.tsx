import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { User, Phone, Mail, MapPin, Heart, Target } from "lucide-react";

interface AppointmentFormProps {
  onSubmit: (data: any) => void;
  isLoading: boolean;
}

export default function AppointmentForm({ onSubmit, isLoading }: AppointmentFormProps) {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    emergencyContact: "",
    emergencyPhone: "",
    medicalConditions: "",
    goals: "",
    program: "",
    notes: "",
    agreementAccepted: false,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: "" }));
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.firstName.trim()) newErrors.firstName = "First name is required";
    if (!formData.lastName.trim()) newErrors.lastName = "Last name is required";
    if (!formData.email.trim()) newErrors.email = "Email is required";
    if (!formData.phone.trim()) newErrors.phone = "Phone number is required";
    if (!formData.program) newErrors.program = "Please select a program";
    if (!formData.agreementAccepted) newErrors.agreementAccepted = "You must accept the training agreement";

    // Email validation
    if (formData.email && !/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    // Phone validation (basic)
    if (formData.phone && !/^\(?[\d\s\-\+\(\)]{10,}$/.test(formData.phone.replace(/\s/g, ''))) {
      newErrors.phone = "Please enter a valid phone number";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      onSubmit(formData);
    }
  };

  const programs = [
    { value: "strength", label: "Strength Training - $375 (16 sessions)" },
    { value: "self-defense", label: "Self Defense Training - Custom Pricing" },
    { value: "mindset", label: "Mindset Coaching - $150 per session" },
    { value: "combination", label: "Combination Program - Contact for Pricing" },
  ];

  return (
    <Card className="border">
      <CardHeader>
        <CardTitle className="flex items-center">
          <User className="mr-2 text-iron-blue-600" size={20} />
          Your Information
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Personal Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-foreground flex items-center">
              <User className="mr-2 text-iron-blue-500" size={18} />
              Personal Details
            </h3>
            
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  First Name *
                </label>
                <Input
                  type="text"
                  value={formData.firstName}
                  onChange={(e) => handleInputChange("firstName", e.target.value)}
                  placeholder="Enter your first name"
                  className={errors.firstName ? "border-destructive" : ""}
                />
                {errors.firstName && (
                  <p className="text-sm text-destructive mt-1">{errors.firstName}</p>
                )}
              </div>
              
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Last Name *
                </label>
                <Input
                  type="text"
                  value={formData.lastName}
                  onChange={(e) => handleInputChange("lastName", e.target.value)}
                  placeholder="Enter your last name"
                  className={errors.lastName ? "border-destructive" : ""}
                />
                {errors.lastName && (
                  <p className="text-sm text-destructive mt-1">{errors.lastName}</p>
                )}
              </div>
            </div>
          </div>

          {/* Contact Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-foreground flex items-center">
              <Phone className="mr-2 text-iron-blue-500" size={18} />
              Contact Information
            </h3>
            
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Email Address *
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={16} />
                <Input
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  placeholder="Enter your email address"
                  className={`pl-10 ${errors.email ? "border-destructive" : ""}`}
                />
              </div>
              {errors.email && (
                <p className="text-sm text-destructive mt-1">{errors.email}</p>
              )}
            </div>
            
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Phone Number *
              </label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={16} />
                <Input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => handleInputChange("phone", e.target.value)}
                  placeholder="Enter your phone number"
                  className={`pl-10 ${errors.phone ? "border-destructive" : ""}`}
                />
              </div>
              {errors.phone && (
                <p className="text-sm text-destructive mt-1">{errors.phone}</p>
              )}
            </div>
            
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Address (Optional)
              </label>
              <div className="relative">
                <MapPin className="absolute left-3 top-3 text-muted-foreground" size={16} />
                <Textarea
                  value={formData.address}
                  onChange={(e) => handleInputChange("address", e.target.value)}
                  placeholder="Enter your address"
                  className="pl-10"
                  rows={2}
                />
              </div>
            </div>
          </div>

          {/* Emergency Contact */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-foreground">Emergency Contact (Optional)</h3>
            
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Emergency Contact Name
                </label>
                <Input
                  type="text"
                  value={formData.emergencyContact}
                  onChange={(e) => handleInputChange("emergencyContact", e.target.value)}
                  placeholder="Name of emergency contact"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Emergency Contact Phone
                </label>
                <Input
                  type="tel"
                  value={formData.emergencyPhone}
                  onChange={(e) => handleInputChange("emergencyPhone", e.target.value)}
                  placeholder="Emergency contact phone"
                />
              </div>
            </div>
          </div>

          {/* Health & Goals */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-foreground flex items-center">
              <Heart className="mr-2 text-iron-blue-500" size={18} />
              Health & Goals
            </h3>
            
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Medical Conditions or Injuries (Optional)
              </label>
              <Textarea
                value={formData.medicalConditions}
                onChange={(e) => handleInputChange("medicalConditions", e.target.value)}
                placeholder="Please describe any medical conditions, injuries, or physical limitations we should know about..."
                rows={3}
              />
              <p className="text-xs text-muted-foreground mt-1">
                This information helps us create a safe and effective training program for you.
              </p>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Training Goals *
              </label>
              <div className="relative">
                <Target className="absolute left-3 top-3 text-muted-foreground" size={16} />
                <Textarea
                  value={formData.goals}
                  onChange={(e) => handleInputChange("goals", e.target.value)}
                  placeholder="What do you want to achieve? (e.g., lose weight, build strength, learn self-defense, improve confidence...)"
                  className="pl-10"
                  rows={3}
                />
              </div>
            </div>
          </div>

          {/* Program Selection */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-foreground">Program Selection</h3>
            
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Choose Your Program *
              </label>
              <Select value={formData.program} onValueChange={(value) => handleInputChange("program", value)}>
                <SelectTrigger className={errors.program ? "border-destructive" : ""}>
                  <SelectValue placeholder="Select a training program" />
                </SelectTrigger>
                <SelectContent>
                  {programs.map((program) => (
                    <SelectItem key={program.value} value={program.value}>
                      {program.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.program && (
                <p className="text-sm text-destructive mt-1">{errors.program}</p>
              )}
            </div>
            
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Additional Notes (Optional)
              </label>
              <Textarea
                value={formData.notes}
                onChange={(e) => handleInputChange("notes", e.target.value)}
                placeholder="Any additional information you'd like to share with your coach..."
                rows={2}
              />
            </div>
          </div>

          {/* Agreement */}
          <div className="space-y-4 pt-6 border-t border-border">
            <div className="flex items-start space-x-3">
              <Checkbox
                id="agreement"
                checked={formData.agreementAccepted}
                onCheckedChange={(checked) => 
                  handleInputChange("agreementAccepted", checked as boolean ? "true" : "false")
                }
                className={errors.agreementAccepted ? "border-destructive" : ""}
              />
              <div className="grid gap-1.5 leading-none">
                <label 
                  htmlFor="agreement"
                  className="text-sm text-muted-foreground cursor-pointer"
                >
                  I understand and agree to the training terms and conditions, including the 24-hour 
                  cancellation policy and liability waiver requirements. I will complete the digital 
                  agreement in the next step.
                </label>
              </div>
            </div>
            {errors.agreementAccepted && (
              <p className="text-sm text-destructive">{errors.agreementAccepted}</p>
            )}
          </div>

          {/* Submit Button */}
          <Button 
            type="submit" 
            className="w-full bg-iron-blue-600 hover:bg-iron-blue-700 text-white py-4"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <LoadingSpinner size="sm" className="mr-2" />
                Processing...
              </>
            ) : (
              "Continue to Agreement"
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}

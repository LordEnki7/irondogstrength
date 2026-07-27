import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { clientApi } from "@/lib/api";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { User, Mail, Phone, MapPin, Heart, Target, ArrowRight, CheckCircle } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { insertClientSchema, type InsertClient } from "@shared/schema";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";

export default function Signup() {
  const { toast } = useToast();
  const [isSuccess, setIsSuccess] = useState(false);
  const [createdClient, setCreatedClient] = useState<any>(null);

  const form = useForm<InsertClient>({
    resolver: zodResolver(insertClientSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      address: "",
      emergencyContact: "",
      emergencyPhone: "",
      medicalConditions: "",
      goals: "",
    },
  });

  const createClientMutation = useMutation({
    mutationFn: clientApi.create,
    onSuccess: (client) => {
      setCreatedClient(client);
      setIsSuccess(true);
      toast({
        title: "Account Created Successfully!",
        description: "Welcome to Iron Dog Strength. You can now access your client portal.",
      });
    },
    onError: (error: any) => {
      toast({
        title: "Registration Failed",
        description: error.message || "Failed to create account. Please try again.",
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: InsertClient) => {
    createClientMutation.mutate(data);
  };

  if (isSuccess && createdClient) {
    return (
      <div className="w-full">
        {/* Success Section */}
        <section className="py-20 relative overflow-hidden" style={{
          background: `linear-gradient(135deg, 
            rgba(34, 197, 94, 0.9) 0%, 
            rgba(22, 163, 74, 0.8) 50%,
            rgba(21, 128, 61, 0.9) 100%)`
        }}>
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="flex justify-center mb-8">
              <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                <CheckCircle className="text-white" size={48} />
              </div>
            </div>
            <h1 className="text-5xl font-bold mb-6 text-white">Welcome to Iron Dog Strength!</h1>
            <p className="text-xl text-green-100 mb-8">
              Your account has been created successfully, {createdClient.firstName}!
            </p>
          </div>
        </section>

        {/* Next Steps */}
        <section className="py-20" style={{
          background: `linear-gradient(135deg, 
            rgba(255, 255, 255, 0.8) 0%, 
            rgba(219, 234, 254, 0.4) 50%,
            rgba(255, 255, 255, 0.9) 100%)`
        }}>
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-iron-blue-900 mb-4">What's Next?</h2>
              <p className="text-iron-blue-700">You're all set up! Here's what you can do now:</p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <Card className="border-2 border-iron-blue-200" style={{
                background: `linear-gradient(135deg, 
                  rgba(255, 255, 255, 0.95) 0%, 
                  rgba(219, 234, 254, 0.8) 50%,
                  rgba(255, 255, 255, 0.95) 100%)`
              }}>
                <CardHeader>
                  <CardTitle className="flex items-center text-iron-blue-900">
                    <Target className="mr-3" size={24} />
                    Schedule Your First Session
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-iron-blue-700 mb-4">
                    Book your first training session and begin your transformation journey.
                  </p>
                  <a href="/schedule">
                    <Button className="w-full bg-iron-blue-600 hover:bg-iron-blue-700 text-white">
                      Book Session
                      <ArrowRight className="ml-2" size={16} />
                    </Button>
                  </a>
                </CardContent>
              </Card>

              <Card className="border-2 border-iron-blue-200" style={{
                background: `linear-gradient(135deg, 
                  rgba(255, 255, 255, 0.95) 0%, 
                  rgba(219, 234, 254, 0.8) 50%,
                  rgba(255, 255, 255, 0.95) 100%)`
              }}>
                <CardHeader>
                  <CardTitle className="flex items-center text-iron-blue-900">
                    <User className="mr-3" size={24} />
                    Access Your Portal
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-iron-blue-700 mb-4">
                    Use your email ({createdClient.email}) to access your personal training dashboard.
                  </p>
                  <a href="/portal">
                    <Button variant="outline" className="w-full border-iron-blue-600 text-iron-blue-700 hover:bg-iron-blue-600 hover:text-white">
                      Enter Portal
                      <ArrowRight className="ml-2" size={16} />
                    </Button>
                  </a>
                </CardContent>
              </Card>
            </div>

            {/* Account Details */}
            <Card className="mt-8 border-2 border-iron-blue-200" style={{
              background: `linear-gradient(135deg, 
                rgba(255, 255, 255, 0.95) 0%, 
                rgba(219, 234, 254, 0.8) 50%,
                rgba(255, 255, 255, 0.95) 100%)`
            }}>
              <CardHeader>
                <CardTitle className="text-iron-blue-900">Your Account Details</CardTitle>
              </CardHeader>
              <CardContent className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Name</label>
                  <p className="text-foreground">{createdClient.firstName} {createdClient.lastName}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Email</label>
                  <p className="text-foreground">{createdClient.email}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Phone</label>
                  <p className="text-foreground">{createdClient.phone}</p>
                </div>
                {createdClient.goals && (
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Goals</label>
                    <p className="text-foreground">{createdClient.goals}</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </section>
      </div>
    );
  }

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
          <h1 className="text-5xl font-bold mb-6 text-iron-blue-900">Join Iron Dog Strength</h1>
          <p className="text-xl text-iron-blue-700 mb-8">
            Create your account and start your transformation journey today
          </p>
        </div>
      </section>

      {/* Registration Form */}
      <section className="py-20" style={{
        background: `linear-gradient(135deg, 
          rgba(255, 255, 255, 0.8) 0%, 
          rgba(219, 234, 254, 0.4) 50%,
          rgba(255, 255, 255, 0.9) 100%)`
      }}>
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <Card className="border-2 border-iron-blue-200 shadow-lg" style={{
            background: `linear-gradient(135deg, 
              rgba(255, 255, 255, 0.95) 0%, 
              rgba(219, 234, 254, 0.8) 50%,
              rgba(255, 255, 255, 0.95) 100%)`
          }}>
            <CardHeader className="text-center">
              <CardTitle className="text-2xl font-bold text-iron-blue-900">Create Your Account</CardTitle>
              <p className="text-iron-blue-700">
                Fill out your information to get started with your fitness journey
              </p>
            </CardHeader>
            <CardContent className="p-6">
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  {/* Personal Information */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-iron-blue-900 flex items-center">
                      <User className="mr-2" size={20} />
                      Personal Information
                    </h3>
                    
                    <div className="grid md:grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="firstName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>First Name</FormLabel>
                            <FormControl>
                              <Input placeholder="John" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="lastName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Last Name</FormLabel>
                            <FormControl>
                              <Input placeholder="Doe" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="flex items-center">
                            <Mail className="mr-1" size={16} />
                            Email Address
                          </FormLabel>
                          <FormControl>
                            <Input type="email" placeholder="john@example.com" {...field} />
                          </FormControl>
                          <FormDescription>
                            This will be used to access your client portal
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="phone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="flex items-center">
                            <Phone className="mr-1" size={16} />
                            Phone Number
                          </FormLabel>
                          <FormControl>
                            <Input placeholder="(555) 123-4567" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="address"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="flex items-center">
                            <MapPin className="mr-1" size={16} />
                            Address (Optional)
                          </FormLabel>
                          <FormControl>
                            <Input placeholder="123 Main St, City, State 12345" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  {/* Emergency Contact */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-iron-blue-900">Emergency Contact (Optional)</h3>
                    
                    <div className="grid md:grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="emergencyContact"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Emergency Contact Name</FormLabel>
                            <FormControl>
                              <Input placeholder="Jane Doe" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="emergencyPhone"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Emergency Contact Phone</FormLabel>
                            <FormControl>
                              <Input placeholder="(555) 987-6543" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>

                  {/* Health & Goals */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-iron-blue-900 flex items-center">
                      <Heart className="mr-2" size={20} />
                      Health & Fitness Goals
                    </h3>
                    
                    <FormField
                      control={form.control}
                      name="medicalConditions"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Medical Conditions (Optional)</FormLabel>
                          <FormControl>
                            <Textarea 
                              placeholder="Any medical conditions, injuries, or limitations we should know about..."
                              className="min-h-[80px]"
                              {...field} 
                            />
                          </FormControl>
                          <FormDescription>
                            This information helps us create a safe and effective training plan
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="goals"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="flex items-center">
                            <Target className="mr-1" size={16} />
                            Fitness Goals (Optional)
                          </FormLabel>
                          <FormControl>
                            <Textarea 
                              placeholder="What do you want to achieve? (e.g., lose weight, build strength, learn self-defense, improve confidence...)"
                              className="min-h-[100px]"
                              {...field} 
                            />
                          </FormControl>
                          <FormDescription>
                            Help us understand what you want to accomplish
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <Button 
                    type="submit" 
                    className="w-full bg-iron-blue-600 hover:bg-iron-blue-700 text-white text-lg py-3"
                    disabled={createClientMutation.isPending}
                  >
                    {createClientMutation.isPending ? (
                      <>
                        <LoadingSpinner size="sm" className="mr-2" />
                        Creating Account...
                      </>
                    ) : (
                      <>
                        Create My Account
                        <ArrowRight className="ml-2" size={16} />
                      </>
                    )}
                  </Button>
                </form>
              </Form>

              <div className="mt-6 pt-6 border-t border-border text-center">
                <p className="text-sm text-muted-foreground">
                  Already have an account? 
                  <a href="/portal" className="text-iron-blue-600 hover:underline ml-1">
                    Access your portal
                  </a>
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}
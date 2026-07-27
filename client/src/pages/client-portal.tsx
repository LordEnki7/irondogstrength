import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Separator } from "@/components/ui/separator";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import QuoteGenerator from "@/components/motivational/quote-generator";
import { DailyMotivationPlayer } from "@/components/audio/daily-motivation-player";
import { clientApi, appointmentApi, agreementApi } from "@/lib/api";
import { 
  User, 
  Calendar, 
  Clock, 
  MapPin, 
  Phone, 
  Mail, 
  FileText, 
  AlertCircle,
  CheckCircle,
  Dumbbell,
  Shield,
  Search,
  Target,
  TrendingUp,
  CreditCard,
  BarChart3,
  Award,
  Zap,
  PlayCircle
} from "lucide-react";
import EgyptianSilhouetteSymbol from "@/components/symbols/egyptian-silhouette";
import type { Client, Appointment, Agreement, WorkoutPlan, ProgressTracking, Payment, ClientGoal } from "@shared/schema";

export default function ClientPortal() {
  const { toast } = useToast();
  const [email, setEmail] = useState("");
  const [client, setClient] = useState<Client | null>(null);
  const [isSearching, setIsSearching] = useState(false);

  // Fetch client appointments
  const { data: appointments, isLoading: appointmentsLoading } = useQuery({
    queryKey: ["/api/appointments/client", client?.id],
    enabled: !!client?.id,
  });

  // Fetch client agreements
  const { data: agreements, isLoading: agreementsLoading } = useQuery({
    queryKey: ["/api/agreements/client", client?.id],
    enabled: !!client?.id,
  });

  // Fetch workout plans
  const { data: workoutPlans, isLoading: workoutPlansLoading } = useQuery({
    queryKey: ["/api/workout-plans/client", client?.id],
    enabled: !!client?.id,
  });

  // Fetch progress tracking
  const { data: progressData, isLoading: progressLoading } = useQuery({
    queryKey: ["/api/progress/client", client?.id],
    enabled: !!client?.id,
  });

  // Fetch client goals
  const { data: clientGoals, isLoading: goalsLoading } = useQuery({
    queryKey: ["/api/goals/client", client?.id],
    enabled: !!client?.id,
  });

  // Fetch payments
  const { data: payments, isLoading: paymentsLoading } = useQuery({
    queryKey: ["/api/payments/client", client?.id],
    enabled: !!client?.id,
  });

  const handleClientSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email.trim()) {
      toast({
        title: "Email Required",
        description: "Please enter your email address to access your portal.",
        variant: "destructive",
      });
      return;
    }

    setIsSearching(true);
    
    try {
      const foundClient = await clientApi.getByEmail(email.trim());
      setClient(foundClient);
      toast({
        title: "Welcome back!",
        description: `Hi ${foundClient.firstName}, here's your training information.`,
      });
    } catch (error) {
      toast({
        title: "Client Not Found",
        description: "No account found with that email address. Please check your email or contact us.",
        variant: "destructive",
      });
    } finally {
      setIsSearching(false);
    }
  };

  const getStatusBadgeVariant = (status: string) => {
    switch (status) {
      case "completed":
        return "default";
      case "scheduled":
        return "secondary";
      case "cancelled":
        return "destructive";
      default:
        return "secondary";
    }
  };

  const getProgramIcon = (program: string) => {
    switch (program) {
      case "strength":
        return <Dumbbell size={16} />;
      case "self-defense":
        return <Shield size={16} />;
      default:
        return <Dumbbell size={16} />;
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const formatTime = (timeString: string) => {
    const [hours, minutes] = timeString.split(':');
    const hour = parseInt(hours);
    const ampm = hour >= 12 ? 'PM' : 'AM';
    const displayHour = hour % 12 || 12;
    return `${displayHour}:${minutes} ${ampm}`;
  };

  const calculateGoalProgress = (goal: ClientGoal) => {
    if (!goal.targetValue || goal.targetValue === "0") return 0;
    const progress = (parseFloat(goal.currentValue || "0") / parseFloat(goal.targetValue)) * 100;
    return Math.min(progress, 100);
  };

  const getRecentProgress = () => {
    if (!progressData) return [];
    return (progressData as ProgressTracking[])
      .sort((a, b) => new Date(b.completedAt || 0).getTime() - new Date(a.completedAt || 0).getTime())
      .slice(0, 3);
  };

  const getTotalSessionsCompleted = () => {
    if (!appointments) return 0;
    return (appointments as Appointment[]).filter(apt => apt.status === "completed").length;
  };

  const getUpcomingAppointments = () => {
    if (!appointments) return [];
    const now = new Date();
    return (appointments as Appointment[])
      .filter(apt => {
        const aptDate = new Date(apt.date);
        return aptDate >= now && apt.status === "scheduled";
      })
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
      .slice(0, 3);
  };

  if (!client) {
    return (
      <div className="w-full">
        {/* Hero Section */}
        <section className="py-20 relative overflow-hidden" style={{
          background: `linear-gradient(135deg, 
            rgba(30, 58, 138, 0.95) 0%, 
            rgba(37, 99, 235, 0.9) 50%,
            rgba(29, 78, 216, 0.95) 100%)`
        }}>
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="flex justify-center mb-8">
              <img 
                src="/iron-dog-logo.jpg" 
                alt="Iron Dog Strength Logo" 
                className="w-20 h-20 md:w-24 md:h-24 rounded-xl shadow-lg object-cover border-2 border-white/30"
              />
            </div>
            <h1 className="text-5xl font-bold mb-6">{(content as any)?.portal_hero_title || "Client Portal"}</h1>
            <p className="text-xl text-white mb-8">
              {(content as any)?.portal_hero_subtitle || "Access your training schedule, view progress, and manage your appointments"}
            </p>
          </div>
        </section>

        {/* Login Section */}
        <section className="py-20 relative overflow-hidden" style={{
          background: `linear-gradient(135deg, 
            rgba(219, 234, 254, 0.7) 0%, 
            rgba(191, 219, 254, 0.8) 30%,
            rgba(147, 197, 253, 0.6) 60%,
            rgba(186, 230, 253, 0.9) 100%)`
        }}>

          <div className="max-w-md mx-auto px-4 sm:px-6 lg:px-8">
            <Card className="border-2 border-iron-blue-200 shadow-lg" style={{
              background: `linear-gradient(135deg, 
                rgba(255, 255, 255, 0.9) 0%, 
                rgba(219, 234, 254, 0.6) 50%,
                rgba(255, 255, 255, 0.95) 100%)`
            }}>
              <CardHeader className="text-center">
                <CardTitle className="text-2xl font-bold text-foreground">{(content as any)?.access_portal_header || "Access Your Portal"}</CardTitle>
                <p className="text-muted-foreground">
                  {(content as any)?.access_portal_description || "Enter the email address you used when booking your appointment"}
                </p>
              </CardHeader>
              <CardContent className="p-6">
                <form onSubmit={handleClientSearch} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      {(content as any)?.email_input_label || "Email Address"}
                    </label>
                    <Input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder={(content as any)?.email_placeholder || "Enter your email address"}
                      required
                    />
                  </div>
                  
                  <Button 
                    type="submit" 
                    className="w-full bg-iron-blue-600 hover:bg-iron-blue-700 text-white"
                    disabled={isSearching}
                  >
                    {isSearching ? (
                      <>
                        <LoadingSpinner size="sm" className="mr-2" />
                        Searching...
                      </>
                    ) : (
                      <>
                        <Search className="mr-2" size={16} />
                        {(content as any)?.access_button_text || "Access Portal"}
                      </>
                    )}
                  </Button>
                </form>
                
                <div className="mt-6 pt-6 border-t border-border">
                  <p className="text-sm text-muted-foreground text-center">
                    {(content as any)?.no_account_text || "Don't have an account?"} 
                    <a href="/signup" className="text-iron-blue-600 hover:underline ml-1">
                      {(content as any)?.create_account_text || "Create your account"}
                    </a>
                    {" or "}
                    <a href="/schedule" className="text-iron-blue-600 hover:underline">
                      {(content as any)?.book_session_text || "book a session"}
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

  return (
    <div className="w-full">
      {/* Header */}
      <section className="py-12 relative overflow-hidden" style={{
        background: `linear-gradient(135deg, 
          rgba(30, 58, 138, 0.95) 0%, 
          rgba(37, 99, 235, 0.9) 50%,
          rgba(29, 78, 216, 0.95) 100%)`
      }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold mb-2">Welcome back, {client.firstName}!</h1>
              <p className="text-white">Here's your training overview</p>
            </div>
            <Button 
              variant="outline" 
              onClick={() => {
                setClient(null);
                setEmail("");
              }}
              className="border-white text-white hover:bg-white hover:text-slate-900"
            >
              Sign Out
            </Button>
          </div>
        </div>
      </section>

      {/* Dashboard */}
      <section className="py-12 relative overflow-hidden" style={{
        background: `linear-gradient(135deg, 
          rgba(219, 234, 254, 0.7) 0%, 
          rgba(191, 219, 254, 0.8) 30%,
          rgba(147, 197, 253, 0.6) 60%,
          rgba(186, 230, 253, 0.9) 100%)`
      }}>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Card className="border-2 border-iron-blue-200" style={{
              background: `linear-gradient(135deg, 
                rgba(255, 255, 255, 0.9) 0%, 
                rgba(219, 234, 254, 0.6) 50%,
                rgba(255, 255, 255, 0.95) 100%)`
            }}>
              <CardContent className="p-6">
                <div className="flex items-center">
                  <Award className="h-8 w-8 text-iron-blue-600" />
                  <div className="ml-4">
                    <p className="text-sm font-medium text-muted-foreground">Sessions Completed</p>
                    <p className="text-2xl font-bold text-foreground">{getTotalSessionsCompleted()}</p>
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
              <CardContent className="p-6">
                <div className="flex items-center">
                  <Target className="h-8 w-8 text-iron-blue-600" />
                  <div className="ml-4">
                    <p className="text-sm font-medium text-muted-foreground">Active Goals</p>
                    <p className="text-2xl font-bold text-foreground">
                      {clientGoals ? (clientGoals as ClientGoal[]).filter(g => g.status === "active").length : 0}
                    </p>
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
              <CardContent className="p-6">
                <div className="flex items-center">
                  <Zap className="h-8 w-8 text-iron-blue-600" />
                  <div className="ml-4">
                    <p className="text-sm font-medium text-muted-foreground">Workout Plans</p>
                    <p className="text-2xl font-bold text-foreground">
                      {workoutPlans ? (workoutPlans as WorkoutPlan[]).filter(p => p.isActive).length : 0}
                    </p>
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
              <CardContent className="p-6">
                <div className="flex items-center">
                  <TrendingUp className="h-8 w-8 text-iron-blue-600" />
                  <div className="ml-4">
                    <p className="text-sm font-medium text-muted-foreground">Progress Entries</p>
                    <p className="text-2xl font-bold text-foreground">
                      {progressData ? (progressData as ProgressTracking[]).length : 0}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Profile Information */}
            <div className="lg:col-span-1">
              <Card className="border-2 border-iron-blue-200" style={{
                background: `linear-gradient(135deg, 
                  rgba(255, 255, 255, 0.9) 0%, 
                  rgba(219, 234, 254, 0.6) 50%,
                  rgba(255, 255, 255, 0.95) 100%)`
              }}>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <User className="mr-2 text-iron-blue-600" size={20} />
                    Profile Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Name</label>
                    <p className="text-foreground">{client.firstName} {client.lastName}</p>
                  </div>
                  
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Email</label>
                    <div className="flex items-center">
                      <Mail className="mr-2 text-muted-foreground" size={16} />
                      <p className="text-foreground">{client.email}</p>
                    </div>
                  </div>
                  
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Phone</label>
                    <div className="flex items-center">
                      <Phone className="mr-2 text-muted-foreground" size={16} />
                      <p className="text-foreground">{client.phone}</p>
                    </div>
                  </div>
                  
                  {client.goals && (
                    <div>
                      <label className="text-sm font-medium text-muted-foreground">Goals</label>
                      <p className="text-foreground text-sm">{client.goals}</p>
                    </div>
                  )}

                  {client.medicalConditions && (
                    <div>
                      <label className="text-sm font-medium text-muted-foreground">Medical Conditions</label>
                      <p className="text-foreground text-sm">{client.medicalConditions}</p>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Quick Actions */}
              <Card className="border-2 border-iron-blue-200 mt-6" style={{
                background: `linear-gradient(135deg, 
                  rgba(255, 255, 255, 0.9) 0%, 
                  rgba(219, 234, 254, 0.6) 50%,
                  rgba(255, 255, 255, 0.95) 100%)`
              }}>
                <CardHeader>
                  <CardTitle>Quick Actions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <a href="/schedule">
                    <Button className="w-full bg-iron-blue-600 hover:bg-iron-blue-700 text-white">
                      <Calendar className="mr-2" size={16} />
                      Book New Session
                    </Button>
                  </a>
                  <a href="/contact">
                    <Button variant="outline" className="w-full">
                      <Mail className="mr-2" size={16} />
                      Contact Coach
                    </Button>
                  </a>
                  <a href="/checkout">
                    <Button variant="outline" className="w-full">
                      <CreditCard className="mr-2" size={16} />
                      Make Payment
                    </Button>
                  </a>
                </CardContent>
              </Card>
            </div>

            {/* Main Dashboard */}
            <div className="lg:col-span-2 space-y-8">
              <Tabs defaultValue="appointments" className="w-full">
                <TabsList className="grid w-full grid-cols-5">
                  <TabsTrigger value="appointments">Appointments</TabsTrigger>
                  <TabsTrigger value="workouts">Workouts</TabsTrigger>
                  <TabsTrigger value="progress">Progress</TabsTrigger>
                  <TabsTrigger value="goals">Goals</TabsTrigger>
                  <TabsTrigger value="payments">Payments</TabsTrigger>
                </TabsList>

                <TabsContent value="appointments" className="mt-6">
                  <Card className="border-2 border-iron-blue-200" style={{
                    background: `linear-gradient(135deg, 
                      rgba(255, 255, 255, 0.9) 0%, 
                      rgba(219, 234, 254, 0.6) 50%,
                      rgba(255, 255, 255, 0.95) 100%)`
                  }}>
                    <CardHeader>
                      <CardTitle className="flex items-center">
                        <Calendar className="mr-2 text-iron-blue-600" size={20} />
                        Your Appointments
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      {appointmentsLoading ? (
                        <div className="flex justify-center py-8">
                          <LoadingSpinner />
                        </div>
                      ) : appointments && appointments.length > 0 ? (
                        <div className="space-y-4">
                          {(appointments as Appointment[])
                            .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
                            .map((appointment) => (
                            <div key={appointment.id} className="p-4 border border-border rounded-lg">
                              <div className="flex items-center justify-between mb-3">
                                <div className="flex items-center space-x-3">
                                  {getProgramIcon(appointment.program)}
                                  <div>
                                    <h4 className="font-semibold text-foreground capitalize">
                                      {appointment.program.replace('-', ' ')} Training
                                    </h4>
                                    <p className="text-sm text-muted-foreground">
                                      {appointment.duration} minutes
                                    </p>
                                  </div>
                                </div>
                                <Badge variant={getStatusBadgeVariant(appointment.status)}>
                                  {appointment.status}
                                </Badge>
                              </div>
                              
                              <div className="grid md:grid-cols-2 gap-4 text-sm">
                                <div className="flex items-center text-muted-foreground">
                                  <Calendar className="mr-2" size={16} />
                                  {formatDate(appointment.date)}
                                </div>
                                <div className="flex items-center text-muted-foreground">
                                  <Clock className="mr-2" size={16} />
                                  {formatTime(appointment.time)}
                                </div>
                              </div>
                              
                              <div className="flex items-center text-muted-foreground text-sm mt-2">
                                <MapPin className="mr-2" size={16} />
                                Private training location - details provided upon booking
                              </div>
                              
                              {appointment.notes && (
                                <div className="mt-3 p-3 bg-slate-50 rounded">
                                  <p className="text-sm text-muted-foreground">
                                    <strong>Notes:</strong> {appointment.notes}
                                  </p>
                                </div>
                              )}
                            </div>
                          ))}
                        </div>
                      ) : (
                        <Alert>
                          <AlertCircle className="h-4 w-4" />
                          <AlertDescription>
                            No appointments found. Ready to schedule your first session?
                            <a href="/schedule" className="text-iron-blue-600 hover:underline ml-1">
                              Book now
                            </a>
                          </AlertDescription>
                        </Alert>
                      )}
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="workouts" className="mt-6 space-y-6">
                  {/* Motivational Quote Generator */}
                  <QuoteGenerator 
                    category="strength" 
                    showCategory={true}
                    autoRefresh={false}
                  />
                  
                  <Card className="border-2 border-iron-blue-200" style={{
                    background: `linear-gradient(135deg, 
                      rgba(255, 255, 255, 0.9) 0%, 
                      rgba(219, 234, 254, 0.6) 50%,
                      rgba(255, 255, 255, 0.95) 100%)`
                  }}>
                    <CardHeader>
                      <CardTitle className="flex items-center">
                        <Dumbbell className="mr-2 text-iron-blue-600" size={20} />
                        Workout Plans
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      {workoutPlansLoading ? (
                        <div className="flex justify-center py-8">
                          <LoadingSpinner />
                        </div>
                      ) : workoutPlans && workoutPlans.length > 0 ? (
                        <div className="space-y-4">
                          {(workoutPlans as WorkoutPlan[]).map((plan) => (
                            <div key={plan.id} className="p-4 border border-border rounded-lg">
                              <div className="flex items-center justify-between mb-3">
                                <div>
                                  <h4 className="font-semibold text-foreground">{plan.name}</h4>
                                  <p className="text-sm text-muted-foreground">{plan.description}</p>
                                </div>
                                <div className="flex items-center space-x-2">
                                  <Badge variant="secondary">{plan.difficulty}</Badge>
                                  <Badge variant="outline">{plan.category}</Badge>
                                </div>
                              </div>
                              <div className="text-sm text-muted-foreground">
                                Duration: {plan.duration} minutes
                              </div>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <Alert>
                          <AlertCircle className="h-4 w-4" />
                          <AlertDescription>
                            No workout plans assigned yet. Your coach will create personalized plans for you.
                          </AlertDescription>
                        </Alert>
                      )}
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="progress" className="mt-6">
                  <Card className="border-2 border-iron-blue-200" style={{
                    background: `linear-gradient(135deg, 
                      rgba(255, 255, 255, 0.9) 0%, 
                      rgba(219, 234, 254, 0.6) 50%,
                      rgba(255, 255, 255, 0.95) 100%)`
                  }}>
                    <CardHeader>
                      <CardTitle className="flex items-center">
                        <BarChart3 className="mr-2 text-iron-blue-600" size={20} />
                        Progress Tracking
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      {progressLoading ? (
                        <div className="flex justify-center py-8">
                          <LoadingSpinner />
                        </div>
                      ) : progressData && progressData.length > 0 ? (
                        <div className="space-y-4">
                          {getRecentProgress().map((progress) => (
                            <div key={progress.id} className="p-4 border border-border rounded-lg">
                              <div className="flex items-center justify-between mb-3">
                                <div>
                                  <h4 className="font-semibold text-foreground">Session Progress</h4>
                                  <p className="text-sm text-muted-foreground">
                                    {new Date(progress.completedAt || '').toLocaleDateString()}
                                  </p>
                                </div>
                                {progress.rating && (
                                  <Badge variant="secondary">
                                    {progress.rating}/10
                                  </Badge>
                                )}
                              </div>
                              {progress.notes && (
                                <p className="text-sm text-muted-foreground">{progress.notes}</p>
                              )}
                            </div>
                          ))}
                        </div>
                      ) : (
                        <Alert>
                          <AlertCircle className="h-4 w-4" />
                          <AlertDescription>
                            No progress data yet. Progress will be tracked during your training sessions.
                          </AlertDescription>
                        </Alert>
                      )}
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="goals" className="mt-6">
                  <Card className="border-2 border-iron-blue-200" style={{
                    background: `linear-gradient(135deg, 
                      rgba(255, 255, 255, 0.9) 0%, 
                      rgba(219, 234, 254, 0.6) 50%,
                      rgba(255, 255, 255, 0.95) 100%)`
                  }}>
                    <CardHeader>
                      <CardTitle className="flex items-center">
                        <Target className="mr-2 text-iron-blue-600" size={20} />
                        Fitness Goals
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      {goalsLoading ? (
                        <div className="flex justify-center py-8">
                          <LoadingSpinner />
                        </div>
                      ) : clientGoals && clientGoals.length > 0 ? (
                        <div className="space-y-4">
                          {(clientGoals as ClientGoal[]).map((goal) => (
                            <div key={goal.id} className="p-4 border border-border rounded-lg">
                              <div className="flex items-center justify-between mb-3">
                                <div>
                                  <h4 className="font-semibold text-foreground">{goal.title}</h4>
                                  <p className="text-sm text-muted-foreground">{goal.description}</p>
                                </div>
                                <Badge variant={goal.status === "achieved" ? "default" : "secondary"}>
                                  {goal.status}
                                </Badge>
                              </div>
                              {goal.targetValue && (
                                <div className="space-y-2">
                                  <div className="flex justify-between text-sm">
                                    <span>Progress</span>
                                    <span>{goal.currentValue} / {goal.targetValue} {goal.unit}</span>
                                  </div>
                                  <Progress value={calculateGoalProgress(goal)} className="h-2" />
                                </div>
                              )}
                            </div>
                          ))}
                        </div>
                      ) : (
                        <Alert>
                          <AlertCircle className="h-4 w-4" />
                          <AlertDescription>
                            No goals set yet. Work with your coach to establish fitness goals.
                          </AlertDescription>
                        </Alert>
                      )}
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="payments" className="mt-6">
                  <Card className="border-2 border-iron-blue-200" style={{
                    background: `linear-gradient(135deg, 
                      rgba(255, 255, 255, 0.9) 0%, 
                      rgba(219, 234, 254, 0.6) 50%,
                      rgba(255, 255, 255, 0.95) 100%)`
                  }}>
                    <CardHeader>
                      <CardTitle className="flex items-center">
                        <CreditCard className="mr-2 text-iron-blue-600" size={20} />
                        Payment History
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      {paymentsLoading ? (
                        <div className="flex justify-center py-8">
                          <LoadingSpinner />
                        </div>
                      ) : payments && payments.length > 0 ? (
                        <div className="space-y-4">
                          {(payments as Payment[]).map((payment) => (
                            <div key={payment.id} className="p-4 border border-border rounded-lg">
                              <div className="flex items-center justify-between mb-3">
                                <div>
                                  <h4 className="font-semibold text-foreground">${payment.amount}</h4>
                                  <p className="text-sm text-muted-foreground">{payment.description}</p>
                                </div>
                                <Badge variant={payment.status === "completed" ? "default" : "secondary"}>
                                  {payment.status}
                                </Badge>
                              </div>
                              <div className="text-sm text-muted-foreground">
                                {new Date(payment.createdAt || '').toLocaleDateString()}
                              </div>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <Alert>
                          <AlertCircle className="h-4 w-4" />
                          <AlertDescription>
                            No payment history found.
                            <a href="/checkout" className="text-iron-blue-600 hover:underline ml-1">
                              Make a payment
                            </a>
                          </AlertDescription>
                        </Alert>
                      )}
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>
      </section>
      
      {/* Daily Motivation Audio Player - Floating (only show when client is logged in) */}
      {client && <DailyMotivationPlayer />}
    </div>
  );
}

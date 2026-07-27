import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { queryClient } from "@/lib/queryClient";
import Calendar from "@/components/booking/calendar";
import AppointmentForm from "@/components/booking/appointment-form";
import DigitalSignature from "@/components/agreement/digital-signature";
import { appointmentApi, clientApi, agreementApi } from "@/lib/api";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import CaduceusSymbol from "@/components/symbols/caduceus";
import ScalesSymbol from "@/components/symbols/scales";
import { ArrowRight } from "lucide-react";
import { useContent, getContentValue } from "@/hooks/use-content";

import type { InsertClient, InsertAppointment, InsertAgreement } from "@shared/schema";

export default function Schedule() {
  const { toast } = useToast();
  const { data: content } = useContent();
  const [selectedDate, setSelectedDate] = useState<string>("");
  const [selectedTime, setSelectedTime] = useState<string>("");
  const [step, setStep] = useState<"calendar" | "form" | "agreement">("calendar");
  const [isTimeSelected, setIsTimeSelected] = useState<boolean>(false);
  const [clientData, setClientData] = useState<InsertClient | null>(null);
  const [appointmentData, setAppointmentData] = useState<InsertAppointment | null>(null);

  // Fetch available time slots for selected date
  const { data: availableSlots, isLoading: slotsLoading } = useQuery({
    queryKey: ["/api/available-slots", selectedDate],
    enabled: !!selectedDate,
  });

  // Create client mutation
  const createClientMutation = useMutation({
    mutationFn: clientApi.create,
    onSuccess: (client) => {
      setClientData({ ...clientData!, id: client.id } as any);
      setStep("agreement");
    },
    onError: (error: any) => {
      if (error.message.includes("already exists")) {
        // Try to get existing client
        getExistingClient();
      } else {
        toast({
          title: "Error",
          description: "Failed to create client profile. Please try again.",
          variant: "destructive",
        });
      }
    },
  });

  // Get existing client
  const getExistingClient = async () => {
    if (!clientData?.email) return;
    
    try {
      const client = await clientApi.getByEmail(clientData.email);
      setClientData({ ...clientData, id: client.id } as any);
      setStep("agreement");
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to retrieve client information.",
        variant: "destructive",
      });
    }
  };

  // Create appointment mutation
  const createAppointmentMutation = useMutation({
    mutationFn: appointmentApi.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/available-slots"] });
      toast({
        title: "Success!",
        description: "Your appointment has been scheduled successfully.",
      });
      // Reset form
      setStep("calendar");
      setSelectedDate("");
      setSelectedTime("");
      setClientData(null);
      setAppointmentData(null);
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to schedule appointment. Please try again.",
        variant: "destructive",
      });
    },
  });

  // Create agreement mutation
  const createAgreementMutation = useMutation({
    mutationFn: agreementApi.create,
    onSuccess: () => {
      // After agreement is signed, create the appointment
      if (appointmentData && clientData?.id) {
        createAppointmentMutation.mutate({
          ...appointmentData,
          clientId: clientData.id,
        });
      }
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to save agreement. Please try again.",
        variant: "destructive",
      });
    },
  });

  const handleTimeSelect = (time: string) => {
    console.log('Time selected:', time);
    setSelectedTime(time);
    setIsTimeSelected(true);
  };

  const handleDateTimeSelect = (date: string, time: string) => {
    setSelectedDate(date);
    setSelectedTime(time);
    setStep("form");
  };

  const handleContinueToForm = () => {
    if (selectedDate && selectedTime) {
      setStep("form");
    }
  };

  const handleFormSubmit = (formData: any) => {
    const client: InsertClient = {
      firstName: formData.firstName,
      lastName: formData.lastName,
      email: formData.email,
      phone: formData.phone,
      address: formData.address || "",
      emergencyContact: formData.emergencyContact || "",
      emergencyPhone: formData.emergencyPhone || "",
      medicalConditions: formData.medicalConditions || "",
      goals: formData.goals || "",
    };

    const appointment: InsertAppointment = {
      clientId: 0, // Will be set after client creation
      date: selectedDate,
      time: selectedTime,
      program: formData.program,
      duration: 60,
      status: "scheduled",
      notes: formData.notes || "",
    };

    setClientData(client);
    setAppointmentData(appointment);
    createClientMutation.mutate(client);
  };

  const handleAgreementSign = (signatureData: string) => {
    if (!clientData?.id) return;

    const agreement: InsertAgreement = {
      clientId: clientData.id,
      agreementType: "training-agreement",
      signatureData,
    };

    createAgreementMutation.mutate(agreement);
  };

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

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="mb-8 flex justify-center">
            <img 
              src="/iron-dog-logo.jpg" 
              alt="Iron Dog Strength Logo" 
              className="w-20 h-20 md:w-24 md:h-24 rounded-xl shadow-lg object-cover"
            />
          </div>
          <h1 className="text-5xl font-bold mb-6 text-iron-blue-900">{getContentValue(content, "schedule_page_title", "Schedule Your Session")}</h1>
          <p className="text-xl text-iron-blue-700 mb-8">
            {getContentValue(content, "schedule_page_subtitle", "Take the first step towards your transformation. Select your preferred time and complete your booking.")}
          </p>
          
          {/* Progress Steps */}
          <div className="flex justify-center items-center space-x-8 mb-8">
            <div className={`flex items-center ${step === "calendar" ? "text-iron-blue-700" : "text-iron-blue-500"}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center mr-2 text-white ${
                step === "calendar" ? "bg-iron-blue-600" : "bg-iron-blue-400"
              }`}>
                1
              </div>
              <span>{getContentValue(content, "schedule_step_1", "Select Time")}</span>
            </div>
            <div className="w-8 h-0.5 bg-iron-blue-400"></div>
            <div className={`flex items-center ${step === "form" ? "text-iron-blue-700" : "text-iron-blue-500"}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center mr-2 text-white ${
                step === "form" ? "bg-iron-blue-600" : "bg-iron-blue-400"
              }`}>
                2
              </div>
              <span>{getContentValue(content, "schedule_step_2", "Your Details")}</span>
            </div>
            <div className="w-8 h-0.5 bg-iron-blue-400"></div>
            <div className={`flex items-center ${step === "agreement" ? "text-iron-blue-700" : "text-iron-blue-500"}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center mr-2 text-white ${
                step === "agreement" ? "bg-iron-blue-600" : "bg-iron-blue-400"
              }`}>
                3
              </div>
              <span>{getContentValue(content, "schedule_step_3", "Agreement")}</span>
            </div>
          </div>
        </div>
      </section>

      {/* Booking Section */}
      <section className="py-20 relative overflow-hidden" style={{
        background: `linear-gradient(135deg, 
          rgba(255, 255, 255, 0.8) 0%, 
          rgba(219, 234, 254, 0.4) 50%,
          rgba(255, 255, 255, 0.9) 100%)`
      }}>
        {/* Egyptian Pattern Background */}
        <div className="absolute inset-0 opacity-8 pointer-events-none">
          <div className="absolute top-10 left-10 w-32 h-32 rotate-12 text-iron-blue-300">
            <CaduceusSymbol />
          </div>
          <div className="absolute bottom-20 right-20 w-28 h-28 -rotate-12 text-iron-blue-400">
            <ScalesSymbol />
          </div>
          <div className="absolute top-1/2 left-16 w-24 h-24 rotate-45 text-iron-blue-300">
            <CaduceusSymbol />
          </div>

        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {step === "calendar" && (
            <div>
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-iron-blue-900 mb-4">{getContentValue(content, "schedule_time_title", "Choose Your Preferred Time")}</h2>
                <p className="text-lg text-iron-blue-700">
                  {getContentValue(content, "schedule_time_description", "Select a date from the calendar, then click on any available time slot to continue")}
                </p>
              </div>
              
              <div className="grid lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2">
                  <Calendar 
                    selectedDate={selectedDate}
                    onDateSelect={setSelectedDate}
                  />
                  
                  {selectedDate && (
                    <Card className="mt-8 border-2 border-iron-blue-200" style={{
                      background: `linear-gradient(135deg, 
                        rgba(255, 255, 255, 0.9) 0%, 
                        rgba(219, 234, 254, 0.7) 50%,
                        rgba(255, 255, 255, 0.95) 100%)`
                    }}>
                      <CardContent className="p-6">
                        <h3 className="text-xl font-bold mb-4 text-iron-blue-900">
                          Available Times for {new Date(selectedDate).toLocaleDateString()}
                        </h3>
                        <p className="text-sm text-iron-blue-600 mb-4">
                          Click on any time slot below to select it and continue with your booking
                        </p>
                        
                        {slotsLoading ? (
                          <div className="flex justify-center py-8">
                            <LoadingSpinner />
                          </div>
                        ) : availableSlots?.availableSlots.length === 0 ? (
                          <div className="text-center py-8">
                            <p className="text-iron-blue-600 mb-4">No available times for this date</p>
                            <p className="text-sm text-iron-blue-500">Please select a different date</p>
                          </div>
                        ) : (
                          <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
                            {availableSlots?.availableSlots.map((time: string) => {
                              const formatTime = (timeString: string) => {
                                const [hours, minutes] = timeString.split(':');
                                const hour = parseInt(hours);
                                const ampm = hour >= 12 ? 'PM' : 'AM';
                                const displayHour = hour % 12 || 12;
                                return `${displayHour}:${minutes} ${ampm}`;
                              };
                              
                              const isSelected = selectedTime === time;
                              
                              return (
                                <button
                                  key={time}
                                  type="button"
                                  onClick={(e) => {
                                    e.preventDefault();
                                    e.stopPropagation();
                                    console.log('Button clicked:', time);
                                    handleTimeSelect(time);
                                  }}
                                  className={`time-slot ${isSelected ? 'selected' : ''}`}
                                  style={{ 
                                    pointerEvents: 'auto',
                                    zIndex: 10,
                                    position: 'relative'
                                  }}
                                >
                                  {formatTime(time)}
                                </button>
                              );
                            })}
                          </div>
                        )}
                        
                        {/* Selected Time Confirmation */}
                        {selectedTime && selectedDate && (
                          <div className="mt-6 p-4 bg-green-50 border-2 border-green-200 rounded-lg">
                            <div className="flex items-center justify-between">
                              <div>
                                <p className="text-sm font-medium text-green-800">
                                  ✓ Selected Time:
                                </p>
                                <p className="text-lg font-bold text-green-700">
                                  {new Date(selectedDate).toLocaleDateString()} at {(() => {
                                    const [hours, minutes] = selectedTime.split(':');
                                    const hour = parseInt(hours);
                                    const ampm = hour >= 12 ? 'PM' : 'AM';
                                    const displayHour = hour % 12 || 12;
                                    return `${displayHour}:${minutes} ${ampm}`;
                                  })()}
                                </p>
                              </div>
                              <Button 
                                onClick={handleContinueToForm}
                                className="bg-green-600 hover:bg-green-700 text-white"
                              >
                                Continue to Details
                                <ArrowRight className="ml-2" size={16} />
                              </Button>
                            </div>
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  )}
                </div>
                
                <div>
                  <Card className="sticky top-8 border-2 border-iron-blue-200" style={{
                    background: `linear-gradient(135deg, 
                      rgba(255, 255, 255, 0.9) 0%, 
                      rgba(219, 234, 254, 0.7) 50%,
                      rgba(255, 255, 255, 0.95) 100%)`
                  }}>
                    <CardContent className="p-6">
                      <h3 className="text-xl font-bold mb-4 text-iron-blue-900">Session Information</h3>
                      <div className="space-y-4">
                        <div>
                          <div className="font-semibold text-iron-blue-800">Duration</div>
                          <div className="text-iron-blue-700">{getContentValue(content, "session_duration", "60 minutes")}</div>
                        </div>
                        <div>
                          <div className="font-semibold text-iron-blue-800">Location</div>
                          <div className="text-iron-blue-700">
                            {getContentValue(content, "facility_name", "Iron Dog Strength Training Facility")}<br />
                            {getContentValue(content, "facility_address", "35840 Chester Rd., Avon, OH 44011")}
                          </div>
                        </div>
                        <div>
                          <div className="font-semibold text-iron-blue-800">Cancellation Policy</div>
                          <div className="text-iron-blue-700 text-sm">
                            24-hour advance notice required. Emergency exceptions apply.
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          )}

          {step === "form" && (
            <div>
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-iron-blue-900 mb-4">{getContentValue(content, "schedule_info_title", "Your Information")}</h2>
                <p className="text-lg text-iron-blue-700">
                  {getContentValue(content, "schedule_info_description", "Tell us about yourself and your fitness goals")}
                </p>
              </div>
              
              <div className="max-w-2xl mx-auto">
                <Card className="mb-6 border-2 border-iron-blue-200" style={{
                  background: `linear-gradient(135deg, 
                    rgba(255, 255, 255, 0.9) 0%, 
                    rgba(219, 234, 254, 0.7) 50%,
                    rgba(255, 255, 255, 0.95) 100%)`
                }}>
                  <CardContent className="p-6">
                    <h3 className="text-lg font-semibold mb-2 text-iron-blue-900">Selected Appointment</h3>
                    <p className="text-iron-blue-700">
                      {new Date(selectedDate).toLocaleDateString()} at {selectedTime}
                    </p>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => setStep("calendar")}
                      className="mt-2 border-iron-blue-300 text-iron-blue-200 hover:bg-iron-blue-500 hover:text-white"
                    >
                      Change Time
                    </Button>
                  </CardContent>
                </Card>
                
                <AppointmentForm 
                  onSubmit={handleFormSubmit}
                  isLoading={createClientMutation.isPending}
                />
              </div>
            </div>
          )}

          {step === "agreement" && clientData && (
            <div>
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-iron-blue-900 mb-4">{getContentValue(content, "schedule_agreement_title", "Training Agreement")}</h2>
                <p className="text-lg text-iron-blue-700">
                  {getContentValue(content, "schedule_agreement_description", "Please review and sign the training agreement to complete your booking")}
                </p>
              </div>
              
              <div className="max-w-4xl mx-auto">
                <DigitalSignature
                  clientName={`${clientData.firstName} ${clientData.lastName}`}
                  onSign={handleAgreementSign}
                  isLoading={createAgreementMutation.isPending || createAppointmentMutation.isPending}
                />
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

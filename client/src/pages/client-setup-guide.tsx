import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { User, Calendar, Mail, ArrowRight, CheckCircle } from "lucide-react";

export default function ClientSetupGuide() {
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
          <h1 className="text-5xl font-bold mb-6 text-iron-blue-900">Client Portal Setup Guide</h1>
          <p className="text-xl text-iron-blue-700 mb-8">
            Follow these simple steps to access your personal training dashboard
          </p>
        </div>
      </section>

      {/* Setup Steps */}
      <section className="py-20" style={{
        background: `linear-gradient(135deg, 
          rgba(255, 255, 255, 0.8) 0%, 
          rgba(219, 234, 254, 0.4) 50%,
          rgba(255, 255, 255, 0.9) 100%)`
      }}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-8">
            
            {/* Step 1 */}
            <Card className="border-2 border-iron-blue-200" style={{
              background: `linear-gradient(135deg, 
                rgba(255, 255, 255, 0.95) 0%, 
                rgba(219, 234, 254, 0.8) 50%,
                rgba(255, 255, 255, 0.95) 100%)`
            }}>
              <CardContent className="p-8">
                <div className="flex items-start space-x-6">
                  <div className="w-12 h-12 bg-iron-blue-600 text-white rounded-full flex items-center justify-center text-xl font-bold flex-shrink-0">
                    1
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-iron-blue-900 mb-4 flex items-center">
                      <Calendar className="mr-3" size={24} />
                      Book Your First Session
                    </h3>
                    <p className="text-iron-blue-700 mb-4 text-lg">
                      Schedule your training session using the booking system. Make sure to use a valid email address as this will be your portal login.
                    </p>
                    <a href="/schedule">
                      <Button className="bg-iron-blue-600 hover:bg-iron-blue-700 text-white">
                        Schedule Session
                        <ArrowRight className="ml-2" size={16} />
                      </Button>
                    </a>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Step 2 */}
            <Card className="border-2 border-iron-blue-200" style={{
              background: `linear-gradient(135deg, 
                rgba(255, 255, 255, 0.95) 0%, 
                rgba(219, 234, 254, 0.8) 50%,
                rgba(255, 255, 255, 0.95) 100%)`
            }}>
              <CardContent className="p-8">
                <div className="flex items-start space-x-6">
                  <div className="w-12 h-12 bg-iron-blue-600 text-white rounded-full flex items-center justify-center text-xl font-bold flex-shrink-0">
                    2
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-iron-blue-900 mb-4 flex items-center">
                      <Mail className="mr-3" size={24} />
                      Use Your Email to Access Portal
                    </h3>
                    <p className="text-iron-blue-700 mb-4 text-lg">
                      After booking, go to the Client Portal and enter the same email address you used during booking. This will give you access to your training dashboard.
                    </p>
                    <a href="/portal">
                      <Button variant="outline" className="border-iron-blue-600 text-iron-blue-700 hover:bg-iron-blue-600 hover:text-white">
                        Access Portal
                        <ArrowRight className="ml-2" size={16} />
                      </Button>
                    </a>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Step 3 */}
            <Card className="border-2 border-iron-blue-200" style={{
              background: `linear-gradient(135deg, 
                rgba(255, 255, 255, 0.95) 0%, 
                rgba(219, 234, 254, 0.8) 50%,
                rgba(255, 255, 255, 0.95) 100%)`
            }}>
              <CardContent className="p-8">
                <div className="flex items-start space-x-6">
                  <div className="w-12 h-12 bg-iron-blue-600 text-white rounded-full flex items-center justify-center text-xl font-bold flex-shrink-0">
                    3
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-iron-blue-900 mb-4 flex items-center">
                      <User className="mr-3" size={24} />
                      Manage Your Training
                    </h3>
                    <p className="text-iron-blue-700 mb-4 text-lg">
                      Once logged in, you can view your appointments, access workout plans, track progress, set goals, and manage payments - all from your personal dashboard.
                    </p>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="flex items-center text-iron-blue-700">
                        <CheckCircle className="mr-2 text-green-600" size={20} />
                        View upcoming appointments
                      </div>
                      <div className="flex items-center text-iron-blue-700">
                        <CheckCircle className="mr-2 text-green-600" size={20} />
                        Access workout plans
                      </div>
                      <div className="flex items-center text-iron-blue-700">
                        <CheckCircle className="mr-2 text-green-600" size={20} />
                        Track your progress
                      </div>
                      <div className="flex items-center text-iron-blue-700">
                        <CheckCircle className="mr-2 text-green-600" size={20} />
                        Get daily motivation
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Demo Credentials */}
            <Card className="border-2 border-green-200 bg-green-50" style={{
              background: `linear-gradient(135deg, 
                rgba(240, 253, 244, 0.95) 0%, 
                rgba(220, 252, 231, 0.8) 50%,
                rgba(240, 253, 244, 0.95) 100%)`
            }}>
              <CardHeader>
                <CardTitle className="text-green-800">Demo Account</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-green-700 mb-4">
                  Want to try the portal without booking? Use this demo email address:
                </p>
                <div className="bg-white p-4 rounded-lg border border-green-200">
                  <code className="text-green-800 font-mono">demo@irondog.com</code>
                </div>
                <p className="text-sm text-green-600 mt-2">
                  This account has sample data to show you how the portal works.
                </p>
              </CardContent>
            </Card>

          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 text-center" style={{
        background: `linear-gradient(135deg, 
          rgba(219, 234, 254, 0.9) 0%, 
          rgba(147, 197, 253, 0.8) 25%,
          rgba(191, 219, 254, 0.85) 50%,
          rgba(186, 230, 253, 0.9) 100%)`
      }}>
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-iron-blue-900 mb-4">Ready to Start Your Journey?</h2>
          <p className="text-xl text-iron-blue-700 mb-8">
            Join hundreds of clients who have transformed their lives through our training programs.
          </p>
          <div className="space-x-4">
            <a href="/schedule">
              <Button className="bg-iron-blue-600 hover:bg-iron-blue-700 text-white text-lg px-8 py-3">
                Book Your First Session
              </Button>
            </a>
            <a href="/contact">
              <Button variant="outline" className="border-iron-blue-600 text-iron-blue-700 hover:bg-iron-blue-600 hover:text-white text-lg px-8 py-3">
                Contact Coach
              </Button>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
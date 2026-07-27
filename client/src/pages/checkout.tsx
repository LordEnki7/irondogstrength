// Stripe imports temporarily removed to reduce bundle size
// import { useStripe, Elements, PaymentElement, useElements } from '@stripe/react-stripe-js';
// import { loadStripe } from '@stripe/stripe-js';
import { useEffect, useState } from 'react';
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { ArrowLeft, CreditCard } from "lucide-react";
import EgyptianSilhouetteSymbol from "@/components/symbols/egyptian-silhouette";

// Make sure to call `loadStripe` outside of a component's render to avoid
// recreating the `Stripe` object on every render.
const stripePublicKey = import.meta.env.VITE_STRIPE_PUBLIC_KEY;
const stripePromise = stripePublicKey ? loadStripe(stripePublicKey) : null;

const CheckoutForm = ({ amount, description, onBack }: { amount: number; description: string; onBack: () => void }) => {
  const stripe = useStripe();
  const elements = useElements();
  const { toast } = useToast();
  const [isProcessing, setIsProcessing] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setIsProcessing(true);

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `${window.location.origin}/client-portal?payment=success`,
      },
    });

    if (error) {
      toast({
        title: "Payment Failed",
        description: error.message,
        variant: "destructive",
      });
    } else {
      toast({
        title: "Payment Successful",
        description: "Thank you for your payment!",
      });
    }

    setIsProcessing(false);
  };

  return (
    <Card className="border-2 border-iron-blue-200 max-w-md mx-auto" style={{
      background: `linear-gradient(135deg, 
        rgba(255, 255, 255, 0.9) 0%, 
        rgba(219, 234, 254, 0.6) 50%,
        rgba(255, 255, 255, 0.95) 100%)`
    }}>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <Button
            variant="ghost"
            onClick={onBack}
            className="p-0 h-auto text-iron-blue-600 hover:text-iron-blue-700"
          >
            <ArrowLeft size={20} />
          </Button>
          <div className="flex items-center">
            <CreditCard className="mr-2 text-iron-blue-600" size={20} />
            Secure Payment
          </div>
        </CardTitle>
        <div className="text-center pt-4">
          <p className="text-2xl font-bold text-foreground">${amount}</p>
          <p className="text-muted-foreground">{description}</p>
        </div>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <PaymentElement />
          <Button 
            type="submit" 
            className="w-full bg-iron-blue-600 hover:bg-iron-blue-700 text-white"
            disabled={!stripe || isProcessing}
          >
            {isProcessing ? (
              <>
                <LoadingSpinner size="sm" className="mr-2" />
                Processing...
              </>
            ) : (
              `Pay $${amount}`
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default function Checkout() {
  const [clientSecret, setClientSecret] = useState("");
  const [amount, setAmount] = useState(75); // Default session fee
  const [description, setDescription] = useState("Training Session Payment");
  const [showPaymentForm, setShowPaymentForm] = useState(false);
  const { toast } = useToast();

  const createPaymentIntent = async () => {
    if (!stripePublicKey) {
      toast({
        title: "Payment Not Available",
        description: "Payment processing is currently being set up. Please contact us directly for payment.",
        variant: "destructive",
      });
      return;
    }

    try {
      const response = await apiRequest("POST", "/api/create-payment-intent", { 
        amount, 
        description 
      });
      const data = await response.json();
      setClientSecret(data.clientSecret);
      setShowPaymentForm(true);
    } catch (error) {
      console.error("Error creating payment intent:", error);
      toast({
        title: "Payment Error",
        description: "Unable to process payment. Please try again or contact us.",
        variant: "destructive",
      });
    }
  };

  if (!showPaymentForm) {
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
            <h1 className="text-5xl font-bold mb-6">Payment</h1>
            <p className="text-xl text-white mb-8">
              Secure payment processing for your training sessions
            </p>
          </div>
        </section>

        {/* Payment Setup */}
        <section className="py-20 relative overflow-hidden" style={{
          background: `linear-gradient(135deg, 
            rgba(219, 234, 254, 0.7) 0%, 
            rgba(191, 219, 254, 0.8) 30%,
            rgba(147, 197, 253, 0.6) 60%,
            rgba(186, 230, 253, 0.9) 100%)`
        }}>
          {/* Egyptian Silhouette Background */}
          <div className="absolute inset-0 opacity-8">
            <div className="absolute top-1/2 right-1/4 w-48 h-48 opacity-12 rotate-10">
              <EgyptianSilhouetteSymbol />
            </div>
          </div>
          <div className="max-w-md mx-auto px-4 sm:px-6 lg:px-8">
            <Card className="border-2 border-iron-blue-200 shadow-lg" style={{
              background: `linear-gradient(135deg, 
                rgba(255, 255, 255, 0.9) 0%, 
                rgba(219, 234, 254, 0.6) 50%,
                rgba(255, 255, 255, 0.95) 100%)`
            }}>
              <CardHeader className="text-center">
                <CardTitle className="text-2xl font-bold text-foreground">Training Session Payment</CardTitle>
                <p className="text-muted-foreground">
                  Secure payment for your Iron Dog Strength training
                </p>
              </CardHeader>
              <CardContent className="p-6 space-y-4">
                <div className="text-center">
                  <p className="text-3xl font-bold text-foreground">${amount}</p>
                  <p className="text-muted-foreground">{description}</p>
                </div>
                
                <Button 
                  onClick={createPaymentIntent}
                  className="w-full bg-iron-blue-600 hover:bg-iron-blue-700 text-white"
                  disabled={!stripePublicKey}
                >
                  <CreditCard className="mr-2" size={16} />
                  {!stripePublicKey ? "Payment Setup in Progress" : "Proceed to Payment"}
                </Button>
                
                {!stripePublicKey && (
                  <div className="text-center text-sm text-muted-foreground">
                    <p>Payment processing is being configured.</p>
                    <p>Please contact us directly at train@irondogstrength.com</p>
                  </div>
                )}
                
                <div className="text-center text-sm text-muted-foreground">
                  <p>Secure payments powered by Stripe</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>
      </div>
    );
  }

  if (!clientSecret) {
    return (
      <div className="h-screen flex items-center justify-center">
        <div className="text-center">
          <LoadingSpinner className="mx-auto mb-4" />
          <p>Setting up secure payment...</p>
        </div>
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
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-3xl font-bold mb-2">Complete Your Payment</h1>
          <p className="text-white">Secure payment processing</p>
        </div>
      </section>

      {/* Payment Form */}
      <section className="py-20 relative overflow-hidden" style={{
        background: `linear-gradient(135deg, 
          rgba(219, 234, 254, 0.7) 0%, 
          rgba(191, 219, 254, 0.8) 30%,
          rgba(147, 197, 253, 0.6) 60%,
          rgba(186, 230, 253, 0.9) 100%)`
      }}>
        {/* Egyptian Silhouette Background */}
        <div className="absolute inset-0 opacity-8">
          <div className="absolute bottom-1/4 left-1/3 w-56 h-56 opacity-10 -rotate-8">
            <EgyptianSilhouetteSymbol />
          </div>
        </div>
        <div className="max-w-md mx-auto px-4 sm:px-6 lg:px-8">
          {stripePromise ? (
            <Elements stripe={stripePromise} options={{ clientSecret }}>
              <CheckoutForm 
                amount={amount}
                description={description}
                onBack={() => setShowPaymentForm(false)}
              />
            </Elements>
          ) : (
            <Card className="border-2 border-iron-blue-200" style={{
              background: `linear-gradient(135deg, 
                rgba(255, 255, 255, 0.9) 0%, 
                rgba(219, 234, 254, 0.6) 50%,
                rgba(255, 255, 255, 0.95) 100%)`
            }}>
              <CardContent className="p-6 text-center">
                <h3 className="text-lg font-semibold mb-4">Payment Not Available</h3>
                <p className="text-muted-foreground mb-4">
                  Payment processing is currently being set up. Please contact us directly.
                </p>
                <Button 
                  onClick={() => setShowPaymentForm(false)}
                  variant="outline"
                  className="w-full"
                >
                  <ArrowLeft className="mr-2" size={16} />
                  Go Back
                </Button>
              </CardContent>
            </Card>
          )}
        </div>
      </section>
    </div>
  );
}
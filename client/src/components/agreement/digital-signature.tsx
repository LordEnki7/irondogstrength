import { useState, useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { FileText, PenTool, RotateCcw, Check } from "lucide-react";
import { cn } from "@/lib/utils";

interface DigitalSignatureProps {
  clientName: string;
  onSign: (signatureData: string) => void;
  isLoading: boolean;
}

export default function DigitalSignature({ clientName, onSign, isLoading }: DigitalSignatureProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [hasSignature, setHasSignature] = useState(false);

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    setIsDrawing(true);
    
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let x, y;
    if ('touches' in e) {
      x = e.touches[0].clientX - rect.left;
      y = e.touches[0].clientY - rect.top;
    } else {
      x = e.clientX - rect.left;
      y = e.clientY - rect.top;
    }

    ctx.beginPath();
    ctx.moveTo(x, y);
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let x, y;
    if ('touches' in e) {
      e.preventDefault();
      x = e.touches[0].clientX - rect.left;
      y = e.touches[0].clientY - rect.top;
    } else {
      x = e.clientX - rect.left;
      y = e.clientY - rect.top;
    }

    ctx.lineWidth = 2;
    ctx.lineCap = 'round';
    ctx.strokeStyle = '#1e40af'; // Iron blue color
    ctx.lineTo(x, y);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(x, y);

    setHasSignature(true);
  };

  const stopDrawing = () => {
    setIsDrawing(false);
  };

  const clearSignature = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    setHasSignature(false);
  };

  const handleSign = () => {
    const canvas = canvasRef.current;
    if (!canvas || !hasSignature) return;

    const signatureData = canvas.toDataURL('image/png');
    onSign(signatureData);
  };

  const agreementText = `
IRON DOG STRENGTH TRAINING AGREEMENT

Effective Date: ${new Date().toLocaleDateString()}

Sports Performance Coach/Martial Arts Master: Dessie L. Cheers
Located at: Private Training Facility
Location details provided upon booking
Lorain OH, 44052

Client: ${clientName}

TERMS AND CONDITIONS:

1. CANCELLATION POLICY
If a training session is not cancelled with twenty-four hour advance notice, the client will be charged. However, emergencies or sudden illness will be exempt.

2. COMMUNICATION
Please maintain communication with the Strength Coach. A lapse of more than seven days will result in a lost time slot.

3. RESCHEDULING
Rescheduling a session time slot will be accommodated on a first come, first serve basis. It is very important for a client to have a consistent schedule.

4. LATE POLICY
If a client is more than twenty minutes late for a training session and has not notified the Strength Coach, the client will be considered a no show and will be charged for the session without participating. If this happens consistently, your training may be discontinued.

5. TIME SLOTS
Time slots cannot be guaranteed after lengthy vacations or time away without prior communication.

6. PAYMENT
The client may not participate in training sessions with an overdue account.

7. LIABILITY WAIVER
I understand that participating in a strength and conditioning program could be injurious to my health. Having such knowledge, I hereby release Iron Dog Strength, its agents, and successors from liability for accidental injury or illness while participating in the said physical activity. I hereby assume all risk and consent to participate in said program. I agree to disclose any physical limitations, disabilities, ailments or impediments that affect my ability to participate in said fitness program.

8. APPLICABLE LAW
This contract shall be governed by the laws of the State of Ohio in Lorain County and any applicable Federal Law.

By signing below, I acknowledge that I have read, understood, and agree to all terms and conditions of this agreement.
  `;

  return (
    <div className="space-y-6">
      <Card className="border">
        <CardHeader>
          <CardTitle className="flex items-center">
            <FileText className="mr-2 text-iron-blue-600" size={20} />
            Training Agreement
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-96 w-full border rounded-lg p-4 bg-slate-50">
            <div className="whitespace-pre-line text-sm text-foreground leading-relaxed">
              {agreementText}
            </div>
          </ScrollArea>
        </CardContent>
      </Card>

      <Card className="border">
        <CardHeader>
          <CardTitle className="flex items-center">
            <PenTool className="mr-2 text-iron-blue-600" size={20} />
            Digital Signature
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="text-center">
            <p className="text-sm text-muted-foreground mb-4">
              Please sign below using your mouse, trackpad, or finger on touch devices
            </p>
            
            <div className="relative mx-auto max-w-md">
              <canvas
                ref={canvasRef}
                width={400}
                height={200}
                className={cn(
                  "signature-pad border-2 border-dashed rounded-lg cursor-crosshair",
                  "touch-none select-none"
                )}
                onMouseDown={startDrawing}
                onMouseMove={draw}
                onMouseUp={stopDrawing}
                onMouseLeave={stopDrawing}
                onTouchStart={startDrawing}
                onTouchMove={draw}
                onTouchEnd={stopDrawing}
              />
              
              {!hasSignature && (
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <div className="text-center text-muted-foreground">
                    <PenTool className="mx-auto mb-2" size={24} />
                    <p className="text-sm">Sign here</p>
                  </div>
                </div>
              )}
            </div>

            <div className="flex justify-center space-x-4 mt-4">
              <Button 
                variant="outline" 
                onClick={clearSignature}
                disabled={!hasSignature}
                className="flex items-center"
              >
                <RotateCcw className="mr-2" size={16} />
                Clear
              </Button>
            </div>
          </div>

          <div className="bg-slate-50 rounded-lg p-4">
            <div className="text-sm text-muted-foreground space-y-2">
              <p><strong>Client Name:</strong> {clientName}</p>
              <p><strong>Date:</strong> {new Date().toLocaleDateString()}</p>
              <p><strong>IP Address:</strong> {window.location.hostname}</p>
            </div>
          </div>

          <div className="flex justify-center">
            <Button 
              onClick={handleSign}
              disabled={!hasSignature || isLoading}
              className="bg-iron-blue-600 hover:bg-iron-blue-700 text-white px-8 py-3"
            >
              {isLoading ? (
                <>
                  <LoadingSpinner size="sm" className="mr-2" />
                  Completing Booking...
                </>
              ) : (
                <>
                  <Check className="mr-2" size={16} />
                  Sign Agreement & Complete Booking
                </>
              )}
            </Button>
          </div>

          <p className="text-xs text-muted-foreground text-center">
            By clicking "Sign Agreement", you acknowledge that you have read and agree to all terms 
            and conditions outlined in the training agreement above.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}

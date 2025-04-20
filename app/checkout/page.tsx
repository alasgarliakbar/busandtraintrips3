"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { CreditCard, Wallet, ArrowLeft, Check } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

export default function CheckoutPage() {
  const router = useRouter()
  const { toast } = useToast()
  const [isProcessing, setIsProcessing] = useState(false)
  const [paymentMethod, setPaymentMethod] = useState("new-card")

  // Mock booking details - in a real app, this would come from state or context
  const bookingDetails = {
    from: "London",
    to: "Paris",
    date: "May 15, 2025",
    time: "08:30",
    passengers: 1,
    type: "train",
    operator: "Eurostar",
    price: 75,
    serviceFee: 5,
    total: 80,
  }

  const handlePayment = async () => {
    setIsProcessing(true)

    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false)

      toast({
        title: "Payment successful!",
        description: "Your booking has been confirmed.",
      })

      // Redirect to confirmation page
      router.push("/booking-confirmation")
    }, 2000)
  }

  return (
    <div className="container py-10">
      <Button variant="ghost" className="mb-6" onClick={() => router.back()}>
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to search results
      </Button>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Payment Method</CardTitle>
              <CardDescription>Select your preferred payment method</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod} className="space-y-4">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="saved-card" id="saved-card" />
                  <Label htmlFor="saved-card" className="flex items-center">
                    <CreditCard className="mr-2 h-4 w-4" />
                    Use saved card (Visa ending in 4242)
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="new-card" id="new-card" />
                  <Label htmlFor="new-card" className="flex items-center">
                    <CreditCard className="mr-2 h-4 w-4" />
                    Add new card
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="paypal" id="paypal" />
                  <Label htmlFor="paypal" className="flex items-center">
                    <Wallet className="mr-2 h-4 w-4" />
                    PayPal
                  </Label>
                </div>
              </RadioGroup>

              {paymentMethod === "new-card" && (
                <div className="space-y-4 pt-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Cardholder Name</Label>
                    <Input id="name" placeholder="John Doe" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="number">Card Number</Label>
                    <Input id="number" placeholder="4242 4242 4242 4242" />
                  </div>
                  <div className="grid grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="month">Expiry Month</Label>
                      <Select>
                        <SelectTrigger id="month">
                          <SelectValue placeholder="Month" />
                        </SelectTrigger>
                        <SelectContent>
                          {Array.from({ length: 12 }, (_, i) => i + 1).map((month) => (
                            <SelectItem key={month} value={month.toString()}>
                              {month.toString().padStart(2, "0")}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="year">Expiry Year</Label>
                      <Select>
                        <SelectTrigger id="year">
                          <SelectValue placeholder="Year" />
                        </SelectTrigger>
                        <SelectContent>
                          {Array.from({ length: 10 }, (_, i) => new Date().getFullYear() + i).map((year) => (
                            <SelectItem key={year} value={year.toString()}>
                              {year}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="cvc">CVC</Label>
                      <Input id="cvc" placeholder="123" />
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Passenger Information</CardTitle>
              <CardDescription>Enter details for all passengers</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h3 className="font-medium">Passenger 1 (Adult)</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="first-name">First Name</Label>
                    <Input id="first-name" placeholder="John" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="last-name">Last Name</Label>
                    <Input id="last-name" placeholder="Doe" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" placeholder="john.doe@example.com" />
                  <p className="text-xs text-muted-foreground">We'll send your tickets to this email address</p>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input id="phone" placeholder="+1 (555) 123-4567" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Booking Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="font-medium">Trip</span>
                  <span>
                    {bookingDetails.from} → {bookingDetails.to}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">Date</span>
                  <span>{bookingDetails.date}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">Time</span>
                  <span>{bookingDetails.time}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">Passengers</span>
                  <span>{bookingDetails.passengers} Adult</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">Transport</span>
                  <span>
                    {bookingDetails.type === "train" ? "Train" : "Bus"} ({bookingDetails.operator})
                  </span>
                </div>
              </div>

              <Separator />

              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Ticket Price</span>
                  <span>€{bookingDetails.price.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Service Fee</span>
                  <span>€{bookingDetails.serviceFee.toFixed(2)}</span>
                </div>
                <Separator />
                <div className="flex justify-between font-bold">
                  <span>Total</span>
                  <span>€{bookingDetails.total.toFixed(2)}</span>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full" size="lg" onClick={handlePayment} disabled={isProcessing}>
                {isProcessing ? (
                  <>Processing...</>
                ) : (
                  <>
                    <Check className="mr-2 h-4 w-4" />
                    Pay €{bookingDetails.total.toFixed(2)}
                  </>
                )}
              </Button>
            </CardFooter>
          </Card>

          <div className="text-sm text-muted-foreground space-y-2">
            <p>
              By proceeding with the payment, you agree to our{" "}
              <a href="/terms" className="text-primary hover:underline">
                Terms of Service
              </a>{" "}
              and{" "}
              <a href="/privacy" className="text-primary hover:underline">
                Privacy Policy
              </a>
              .
            </p>
            <p>All payments are secure and encrypted. We do not store your card details.</p>
          </div>
        </div>
      </div>
    </div>
  )
}

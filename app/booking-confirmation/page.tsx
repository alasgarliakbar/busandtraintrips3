"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { CheckCircle, Download, Calendar, Share2, ArrowRight } from "lucide-react"

export default function BookingConfirmationPage() {
  // Mock booking details - in a real app, this would come from state or API
  const booking = {
    id: "TE-123456",
    from: "London",
    to: "Paris",
    date: "May 15, 2025",
    time: "08:30",
    arrivalTime: "11:45",
    passengers: 1,
    type: "train",
    operator: "Eurostar",
    platform: "9",
    total: 80,
    status: "confirmed",
  }

  return (
    <div className="container max-w-3xl py-10">
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
          <CheckCircle className="h-8 w-8 text-primary" />
        </div>
        <h1 className="text-3xl font-bold mb-2">Booking Confirmed!</h1>
        <p className="text-muted-foreground">Your booking has been confirmed and your tickets are ready.</p>
      </div>

      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Booking Details</CardTitle>
          <CardDescription>Booking reference: {booking.id}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">From</p>
              <p className="font-medium">{booking.from}</p>
              <p className="text-sm">{booking.time}</p>
            </div>
            <div className="flex flex-col items-center justify-center">
              <div className="w-full h-px bg-border my-2 relative">
                <div className="absolute inset-0 flex items-center justify-center">
                  <ArrowRight className="h-4 w-4 bg-background" />
                </div>
              </div>
              <p className="text-sm text-muted-foreground">
                {booking.type === "train" ? "Train" : "Bus"} • {booking.operator}
              </p>
            </div>
            <div className="space-y-1 text-right">
              <p className="text-sm text-muted-foreground">To</p>
              <p className="font-medium">{booking.to}</p>
              <p className="text-sm">{booking.arrivalTime}</p>
            </div>
          </div>

          <Separator />

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">Date</p>
              <p className="font-medium">{booking.date}</p>
            </div>
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">Passengers</p>
              <p className="font-medium">{booking.passengers} Adult</p>
            </div>
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">Platform</p>
              <p className="font-medium">{booking.platform}</p>
            </div>
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">Status</p>
              <p className="font-medium capitalize">{booking.status}</p>
            </div>
          </div>

          <Separator />

          <div className="flex justify-between">
            <span className="font-medium">Total Paid</span>
            <span className="font-bold">€{booking.total.toFixed(2)}</span>
          </div>
        </CardContent>
        <CardFooter className="flex flex-wrap gap-4">
          <Button className="flex-1">
            <Download className="mr-2 h-4 w-4" />
            Download Ticket
          </Button>
          <Button variant="outline" className="flex-1">
            <Calendar className="mr-2 h-4 w-4" />
            Add to Calendar
          </Button>
          <Button variant="outline" className="flex-1">
            <Share2 className="mr-2 h-4 w-4" />
            Share Itinerary
          </Button>
        </CardFooter>
      </Card>

      <div className="space-y-6">
        <h2 className="text-xl font-bold">What's Next?</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card>
            <CardContent className="p-6">
              <h3 className="font-medium mb-2">Before Your Trip</h3>
              <ul className="space-y-2 text-sm">
                <li>• Check travel documents and ID</li>
                <li>• Arrive at the station 30 minutes before departure</li>
                <li>• Download your ticket to your phone</li>
                <li>• Check for any travel advisories or delays</li>
              </ul>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <h3 className="font-medium mb-2">During Your Trip</h3>
              <ul className="space-y-2 text-sm">
                <li>• Have your ticket and ID ready</li>
                <li>• Follow boarding announcements</li>
                <li>• Store luggage in designated areas</li>
                <li>• Enjoy onboard amenities and services</li>
              </ul>
            </CardContent>
          </Card>
        </div>

        <div className="text-center mt-8">
          <p className="text-muted-foreground mb-4">
            Need help with your booking? Our customer service team is available 24/7.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button variant="outline" asChild>
              <Link href="/help">Help Center</Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="/contact">Contact Us</Link>
            </Button>
            <Button asChild>
              <Link href="/dashboard">Go to Dashboard</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

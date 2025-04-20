import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CalendarClock, MapPin, Train, Bus, Download, ExternalLink } from "lucide-react"

export default function UpcomingTrips() {
  // This would normally be fetched from your API
  const trips = [
    {
      id: "trip-1",
      from: "London",
      to: "Paris",
      date: "May 15, 2025",
      time: "08:30",
      type: "train",
      status: "confirmed",
      ticketCode: "EURTR-12345",
    },
    {
      id: "trip-2",
      from: "Paris",
      to: "Amsterdam",
      date: "May 20, 2025",
      time: "10:15",
      type: "train",
      status: "confirmed",
      ticketCode: "EURTR-67890",
    },
    {
      id: "trip-3",
      from: "Amsterdam",
      to: "Berlin",
      date: "May 25, 2025",
      time: "09:00",
      type: "bus",
      status: "pending",
      ticketCode: "EURBS-54321",
    },
  ]

  if (trips.length === 0) {
    return (
      <Card>
        <CardContent className="flex flex-col items-center justify-center py-10">
          <div className="text-center space-y-2">
            <h3 className="text-lg font-medium">No upcoming trips</h3>
            <p className="text-sm text-muted-foreground">
              You don&apos;t have any upcoming trips. Start planning your next adventure!
            </p>
            <Button asChild className="mt-4">
              <Link href="/search">Search Tickets</Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-4">
      {trips.map((trip) => (
        <Card key={trip.id}>
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <h3 className="font-semibold text-lg">
                    {trip.from} to {trip.to}
                  </h3>
                  <Badge variant={trip.status === "confirmed" ? "default" : "outline"}>{trip.status}</Badge>
                </div>
                <div className="flex items-center text-sm text-muted-foreground">
                  <CalendarClock className="mr-1 h-4 w-4" />
                  {trip.date} at {trip.time}
                </div>
                <div className="flex items-center text-sm text-muted-foreground">
                  <MapPin className="mr-1 h-4 w-4" />
                  {trip.from} Station → {trip.to} Station
                </div>
              </div>
              <div className="flex items-center gap-2">
                {trip.type === "train" ? <Train className="h-5 w-5" /> : <Bus className="h-5 w-5" />}
                <div className="text-sm">
                  <div className="font-medium">Ticket #{trip.ticketCode}</div>
                  <div className="text-muted-foreground">{trip.type === "train" ? "Train" : "Bus"} ticket</div>
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter className="bg-muted/50 px-6 py-3">
            <div className="flex flex-wrap items-center gap-2 w-full">
              <Button size="sm" variant="outline" className="h-8">
                <Download className="mr-2 h-4 w-4" />
                Download Ticket
              </Button>
              <Button size="sm" variant="outline" className="h-8">
                <ExternalLink className="mr-2 h-4 w-4" />
                View Details
              </Button>
              <div className="ml-auto text-xs text-muted-foreground">Booked on April 20, 2025</div>
            </div>
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}

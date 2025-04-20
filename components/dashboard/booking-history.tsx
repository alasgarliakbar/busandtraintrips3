import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Download, ExternalLink } from "lucide-react"

export default function BookingHistory() {
  // This would normally be fetched from your API
  const bookings = [
    {
      id: "booking-1",
      from: "London",
      to: "Paris",
      date: "January 10, 2025",
      price: "€75.00",
      status: "completed",
    },
    {
      id: "booking-2",
      from: "Paris",
      to: "Brussels",
      date: "February 15, 2025",
      price: "€45.00",
      status: "completed",
    },
    {
      id: "booking-3",
      from: "Brussels",
      to: "Amsterdam",
      date: "March 20, 2025",
      price: "€35.00",
      status: "completed",
    },
    {
      id: "booking-4",
      from: "Amsterdam",
      to: "Berlin",
      date: "April 5, 2025",
      price: "€65.00",
      status: "cancelled",
    },
  ]

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Trip</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {bookings.map((booking) => (
            <TableRow key={booking.id}>
              <TableCell className="font-medium">
                {booking.from} → {booking.to}
              </TableCell>
              <TableCell>{booking.date}</TableCell>
              <TableCell>{booking.price}</TableCell>
              <TableCell>
                <Badge variant={booking.status === "completed" ? "default" : "destructive"}>{booking.status}</Badge>
              </TableCell>
              <TableCell className="text-right">
                <div className="flex justify-end gap-2">
                  <Button size="icon" variant="ghost" className="h-8 w-8">
                    <Download className="h-4 w-4" />
                    <span className="sr-only">Download</span>
                  </Button>
                  <Button size="icon" variant="ghost" className="h-8 w-8">
                    <ExternalLink className="h-4 w-4" />
                    <span className="sr-only">View</span>
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

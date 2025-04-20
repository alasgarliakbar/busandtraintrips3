import { NextResponse } from "next/server"
import { getServerSession } from "next-auth/next"
import { db } from "@/lib/db"
import { z } from "zod"

const bookingSchema = z.object({
  fromLocation: z.string(),
  toLocation: z.string(),
  departureDate: z.string(),
  departureTime: z.string().optional(),
  transportType: z.enum(["train", "bus", "both"]),
  passengers: z.number().int().positive(),
  totalPrice: z.number().positive(),
})

export async function POST(req: Request) {
  try {
    const session = await getServerSession()

    if (!session?.user) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
    }

    const body = await req.json()
    const validatedData = bookingSchema.parse(body)

    // Create booking in database
    const booking = await db.booking.create({
      data: {
        userId: session.user.id,
        fromLocation: validatedData.fromLocation,
        toLocation: validatedData.toLocation,
        departureDate: new Date(validatedData.departureDate),
        departureTime: validatedData.departureTime,
        transportType: validatedData.transportType,
        passengers: validatedData.passengers,
        totalPrice: validatedData.totalPrice,
        status: "confirmed",
      },
    })

    // Generate a ticket code
    const ticketCode = `TE-${Math.floor(100000 + Math.random() * 900000)}`

    // Create ticket in database
    const ticket = await db.ticket.create({
      data: {
        bookingId: booking.id,
        ticketCode,
        status: "active",
      },
    })

    return NextResponse.json(
      {
        message: "Booking created successfully",
        booking,
        ticket,
      },
      { status: 201 },
    )
  } catch (error) {
    console.error("Booking error:", error)

    if (error instanceof z.ZodError) {
      return NextResponse.json({ message: "Invalid input data", errors: error.errors }, { status: 400 })
    }

    return NextResponse.json({ message: "Internal server error" }, { status: 500 })
  }
}

export async function GET(req: Request) {
  try {
    const session = await getServerSession()

    if (!session?.user) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
    }

    const bookings = await db.booking.findMany({
      where: {
        userId: session.user.id,
      },
      include: {
        ticket: true,
      },
      orderBy: {
        departureDate: "asc",
      },
    })

    return NextResponse.json(bookings)
  } catch (error) {
    console.error("Error fetching bookings:", error)
    return NextResponse.json({ message: "Internal server error" }, { status: 500 })
  }
}

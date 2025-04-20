import { NextResponse } from "next/server"
import { getServerSession } from "next-auth/next"
import { db } from "@/lib/db"
import { z } from "zod"

// This would be replaced with actual Stripe/PayPal integration
const processPayment = async (amount: number, paymentMethod: string) => {
  // Simulate payment processing
  return {
    success: true,
    transactionId: `txn_${Math.random().toString(36).substring(2, 10)}`,
  }
}

const paymentSchema = z.object({
  bookingId: z.string(),
  amount: z.number().positive(),
  currency: z.string().default("EUR"),
  method: z.string(),
  paymentDetails: z
    .object({
      cardNumber: z.string().optional(),
      expiryMonth: z.string().optional(),
      expiryYear: z.string().optional(),
      cvc: z.string().optional(),
      cardholderName: z.string().optional(),
    })
    .optional(),
})

export async function POST(req: Request) {
  try {
    const session = await getServerSession()

    if (!session?.user) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
    }

    const body = await req.json()
    const validatedData = paymentSchema.parse(body)

    // Process payment with payment provider
    const paymentResult = await processPayment(validatedData.amount, validatedData.method)

    if (!paymentResult.success) {
      return NextResponse.json({ message: "Payment failed" }, { status: 400 })
    }

    // Record payment in database
    const payment = await db.payment.create({
      data: {
        userId: session.user.id,
        bookingId: validatedData.bookingId,
        amount: validatedData.amount,
        currency: validatedData.currency,
        method: validatedData.method,
        status: "completed",
      },
    })

    // Update booking status
    await db.booking.update({
      where: { id: validatedData.bookingId },
      data: { status: "confirmed" },
    })

    return NextResponse.json(
      {
        message: "Payment processed successfully",
        payment,
        transactionId: paymentResult.transactionId,
      },
      { status: 200 },
    )
  } catch (error) {
    console.error("Payment error:", error)

    if (error instanceof z.ZodError) {
      return NextResponse.json({ message: "Invalid input data", errors: error.errors }, { status: 400 })
    }

    return NextResponse.json({ message: "Internal server error" }, { status: 500 })
  }
}

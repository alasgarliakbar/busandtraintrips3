"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { CreditCard, Plus, Trash2 } from "lucide-react"

export default function PaymentMethods() {
  const [showAddCard, setShowAddCard] = useState(false)

  // This would normally be fetched from your API
  const paymentMethods = [
    {
      id: "card-1",
      type: "Visa",
      last4: "4242",
      expiry: "05/28",
      isDefault: true,
    },
    {
      id: "card-2",
      type: "Mastercard",
      last4: "5555",
      expiry: "09/26",
      isDefault: false,
    },
  ]

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium">Your Payment Methods</h3>
        <Button onClick={() => setShowAddCard(!showAddCard)}>
          <Plus className="mr-2 h-4 w-4" />
          Add Payment Method
        </Button>
      </div>

      {showAddCard && (
        <Card>
          <CardHeader>
            <CardTitle>Add New Card</CardTitle>
            <CardDescription>Add a new credit or debit card to your account</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
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
            <RadioGroup defaultValue="card" className="grid grid-cols-3 gap-4">
              <div>
                <RadioGroupItem value="default" id="default" className="peer sr-only" />
                <Label
                  htmlFor="default"
                  className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                >
                  Set as default
                </Label>
              </div>
            </RadioGroup>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline" onClick={() => setShowAddCard(false)}>
              Cancel
            </Button>
            <Button>Save Card</Button>
          </CardFooter>
        </Card>
      )}

      <div className="space-y-4">
        {paymentMethods.map((method) => (
          <Card key={method.id}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <CreditCard className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="font-medium">
                      {method.type} ending in {method.last4}
                      {method.isDefault && <span className="ml-2 text-xs text-primary">Default</span>}
                    </p>
                    <p className="text-sm text-muted-foreground">Expires {method.expiry}</p>
                  </div>
                </div>
                <Button variant="ghost" size="icon">
                  <Trash2 className="h-4 w-4" />
                  <span className="sr-only">Remove</span>
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

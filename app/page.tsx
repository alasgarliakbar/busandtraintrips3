import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { CalendarIcon, MapPin, Train, Bus, ArrowRight } from "lucide-react"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"

export default function Home() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-primary/5 z-10" />
        <div
          className="h-[500px] bg-cover bg-center"
          style={{ backgroundImage: "url('/placeholder.svg?height=500&width=1200')" }}
        />
        <div className="absolute inset-0 flex items-center z-20">
          <div className="container">
            <div className="max-w-xl space-y-5">
              <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">Travel Europe by Train & Bus</h1>
              <p className="text-xl">Book tickets for 1000+ destinations across Europe at the best prices</p>
              <div className="flex flex-wrap gap-4">
                <Button size="lg" asChild>
                  <Link href="/search">Search Tickets</Link>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <Link href="/how-it-works">How It Works</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Search Form */}
      <section className="container py-12">
        <Card className="w-full max-w-4xl mx-auto -mt-24 relative z-30 shadow-lg">
          <CardContent className="p-6">
            <div className="space-y-6">
              <div className="flex items-center space-x-4">
                <Button variant="ghost" className="rounded-full">
                  <Train className="mr-2 h-4 w-4" />
                  Train
                </Button>
                <Button variant="ghost" className="rounded-full">
                  <Bus className="mr-2 h-4 w-4" />
                  Bus
                </Button>
                <Button variant="ghost" className="rounded-full">
                  <Train className="mr-2 h-4 w-4" />
                  <Bus className="ml-1 mr-2 h-4 w-4" />
                  Both
                </Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="from">From</Label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input id="from" placeholder="City or Station" className="pl-9" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="to">To</Label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input id="to" placeholder="City or Station" className="pl-9" />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-2">
                  <Label>Departure Date</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant="outline" className="w-full justify-start text-left font-normal">
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        <span>Pick a date</span>
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar mode="single" initialFocus />
                    </PopoverContent>
                  </Popover>
                </div>
                <div className="space-y-2">
                  <Label>Passengers</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="1 Adult" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">1 Adult</SelectItem>
                      <SelectItem value="2">2 Adults</SelectItem>
                      <SelectItem value="3">3 Adults</SelectItem>
                      <SelectItem value="4">4 Adults</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex items-end">
                  <Button className="w-full">
                    Search
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Popular Destinations */}
      <section className="container py-12">
        <h2 className="text-3xl font-bold tracking-tight mb-8">Popular Destinations</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {[
            { name: "Paris", image: "/placeholder.svg?height=200&width=300", price: "€29" },
            { name: "Amsterdam", image: "/placeholder.svg?height=200&width=300", price: "€35" },
            { name: "Berlin", image: "/placeholder.svg?height=200&width=300", price: "€25" },
            { name: "Barcelona", image: "/placeholder.svg?height=200&width=300", price: "€45" },
          ].map((destination) => (
            <Link href={`/search?to=${destination.name}`} key={destination.name}>
              <Card className="overflow-hidden h-full transition-all hover:shadow-md">
                <div className="h-40 bg-cover bg-center" style={{ backgroundImage: `url(${destination.image})` }} />
                <CardContent className="p-4">
                  <div className="flex justify-between items-center">
                    <h3 className="font-semibold">{destination.name}</h3>
                    <p className="text-sm font-medium">from {destination.price}</p>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </section>

      {/* Features */}
      <section className="bg-muted py-16">
        <div className="container">
          <h2 className="text-3xl font-bold tracking-tight text-center mb-12">Why Choose TravelEase</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Best Prices",
                description: "We compare hundreds of transport providers to find you the best deals",
                icon: "💰",
              },
              {
                title: "Easy Booking",
                description: "Book your journey in just a few clicks with our simple booking process",
                icon: "🎫",
              },
              {
                title: "24/7 Support",
                description: "Our customer service team is available around the clock to help you",
                icon: "🌐",
              },
            ].map((feature) => (
              <Card key={feature.title} className="bg-background">
                <CardContent className="p-6 text-center">
                  <div className="text-4xl mb-4">{feature.icon}</div>
                  <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

"use client"

import { useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CalendarIcon, MapPin, Train, Bus, ArrowRight, Clock, Filter } from "lucide-react"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { format } from "date-fns"
import { Badge } from "@/components/ui/badge"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"

export default function SearchPage() {
  const router = useRouter()
  const searchParams = useSearchParams()

  const [date, setDate] = useState<Date | undefined>(undefined)
  const [transportType, setTransportType] = useState("both")
  const [from, setFrom] = useState(searchParams.get("from") || "")
  const [to, setTo] = useState(searchParams.get("to") || "")
  const [priceRange, setPriceRange] = useState([0, 200])
  const [directOnly, setDirectOnly] = useState(false)

  // Mock search results - in a real app, this would come from an API
  const searchResults = [
    {
      id: "result-1",
      from: from || "London",
      to: to || "Paris",
      departureDate: "May 15, 2025",
      departureTime: "08:30",
      arrivalTime: "11:45",
      duration: "3h 15m",
      price: 75,
      type: "train",
      operator: "Eurostar",
      transfers: 0,
    },
    {
      id: "result-2",
      from: from || "London",
      to: to || "Paris",
      departureDate: "May 15, 2025",
      departureTime: "10:00",
      arrivalTime: "13:15",
      duration: "3h 15m",
      price: 85,
      type: "train",
      operator: "TGV",
      transfers: 0,
    },
    {
      id: "result-3",
      from: from || "London",
      to: to || "Paris",
      departureDate: "May 15, 2025",
      departureTime: "09:00",
      arrivalTime: "16:30",
      duration: "7h 30m",
      price: 45,
      type: "bus",
      operator: "FlixBus",
      transfers: 1,
    },
    {
      id: "result-4",
      from: from || "London",
      to: to || "Paris",
      departureDate: "May 15, 2025",
      departureTime: "12:30",
      arrivalTime: "15:45",
      duration: "3h 15m",
      price: 95,
      type: "train",
      operator: "Eurostar",
      transfers: 0,
    },
  ]

  const filteredResults = searchResults.filter((result) => {
    if (transportType !== "both" && result.type !== transportType) return false
    if (result.price < priceRange[0] || result.price > priceRange[1]) return false
    if (directOnly && result.transfers > 0) return false
    return true
  })

  return (
    <div className="container py-10">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* Search Form */}
        <div className="md:col-span-1">
          <div className="sticky top-24 space-y-6">
            <Card>
              <CardContent className="p-6">
                <Tabs defaultValue="search" className="space-y-4">
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="search">Search</TabsTrigger>
                    <TabsTrigger value="filter">Filter</TabsTrigger>
                  </TabsList>
                  <TabsContent value="search" className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="from">From</Label>
                      <div className="relative">
                        <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="from"
                          placeholder="City or Station"
                          className="pl-9"
                          value={from}
                          onChange={(e) => setFrom(e.target.value)}
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="to">To</Label>
                      <div className="relative">
                        <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="to"
                          placeholder="City or Station"
                          className="pl-9"
                          value={to}
                          onChange={(e) => setTo(e.target.value)}
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label>Departure Date</Label>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button variant="outline" className="w-full justify-start text-left font-normal">
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {date ? format(date, "PPP") : <span>Pick a date</span>}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0">
                          <Calendar mode="single" selected={date} onSelect={setDate} initialFocus />
                        </PopoverContent>
                      </Popover>
                    </div>
                    <div className="space-y-2">
                      <Label>Passengers</Label>
                      <Select defaultValue="1">
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
                    <div className="flex items-center space-x-4 pt-2">
                      <Button
                        variant="outline"
                        className={`flex-1 ${transportType === "train" ? "bg-primary text-primary-foreground" : ""}`}
                        onClick={() => setTransportType("train")}
                      >
                        <Train className="mr-2 h-4 w-4" />
                        Train
                      </Button>
                      <Button
                        variant="outline"
                        className={`flex-1 ${transportType === "bus" ? "bg-primary text-primary-foreground" : ""}`}
                        onClick={() => setTransportType("bus")}
                      >
                        <Bus className="mr-2 h-4 w-4" />
                        Bus
                      </Button>
                      <Button
                        variant="outline"
                        className={`flex-1 ${transportType === "both" ? "bg-primary text-primary-foreground" : ""}`}
                        onClick={() => setTransportType("both")}
                      >
                        Both
                      </Button>
                    </div>
                    <Button className="w-full">
                      Search
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </TabsContent>
                  <TabsContent value="filter" className="space-y-4">
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label>Price Range</Label>
                        <div className="pt-4">
                          <Slider
                            defaultValue={[0, 200]}
                            max={200}
                            step={5}
                            value={priceRange}
                            onValueChange={setPriceRange}
                          />
                          <div className="flex items-center justify-between mt-2">
                            <span className="text-sm">€{priceRange[0]}</span>
                            <span className="text-sm">€{priceRange[1]}</span>
                          </div>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label>Departure Time</Label>
                        <Select defaultValue="any">
                          <SelectTrigger>
                            <SelectValue placeholder="Any Time" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="any">Any Time</SelectItem>
                            <SelectItem value="morning">Morning (6AM - 12PM)</SelectItem>
                            <SelectItem value="afternoon">Afternoon (12PM - 6PM)</SelectItem>
                            <SelectItem value="evening">Evening (After 6PM)</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Switch id="direct-only" checked={directOnly} onCheckedChange={setDirectOnly} />
                        <Label htmlFor="direct-only">Direct trips only</Label>
                      </div>
                      <div className="space-y-2">
                        <Label>Sort By</Label>
                        <Select defaultValue="price">
                          <SelectTrigger>
                            <SelectValue placeholder="Price (Lowest first)" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="price">Price (Lowest first)</SelectItem>
                            <SelectItem value="duration">Duration (Shortest first)</SelectItem>
                            <SelectItem value="departure">Departure (Earliest first)</SelectItem>
                            <SelectItem value="arrival">Arrival (Earliest first)</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <Button className="w-full">Apply Filters</Button>
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Search Results */}
        <div className="md:col-span-3">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-2xl font-bold">
              {from || "London"} to {to || "Paris"}
            </h1>
            <div className="flex items-center">
              <p className="text-sm text-muted-foreground mr-4">{filteredResults.length} results found</p>
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="outline" size="sm" className="md:hidden">
                    <Filter className="h-4 w-4 mr-2" />
                    Filters
                  </Button>
                </SheetTrigger>
                <SheetContent>
                  <SheetHeader>
                    <SheetTitle>Filters</SheetTitle>
                    <SheetDescription>Adjust your search parameters</SheetDescription>
                  </SheetHeader>
                  <div className="py-4 space-y-4">
                    <div className="space-y-2">
                      <Label>Price Range</Label>
                      <div className="pt-4">
                        <Slider
                          defaultValue={[0, 200]}
                          max={200}
                          step={5}
                          value={priceRange}
                          onValueChange={setPriceRange}
                        />
                        <div className="flex items-center justify-between mt-2">
                          <span className="text-sm">€{priceRange[0]}</span>
                          <span className="text-sm">€{priceRange[1]}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Switch id="direct-only-mobile" checked={directOnly} onCheckedChange={setDirectOnly} />
                      <Label htmlFor="direct-only-mobile">Direct trips only</Label>
                    </div>
                    <Button className="w-full">Apply Filters</Button>
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>

          <div className="space-y-4">
            {filteredResults.length > 0 ? (
              filteredResults.map((result) => (
                <Card key={result.id} className="overflow-hidden">
                  <CardContent className="p-0">
                    <div className="grid grid-cols-1 md:grid-cols-4 border-b">
                      <div className="p-6 md:col-span-3 space-y-4">
                        <div className="flex items-center">
                          <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center mr-4">
                            {result.type === "train" ? <Train className="h-5 w-5" /> : <Bus className="h-5 w-5" />}
                          </div>
                          <div>
                            <p className="font-medium">{result.operator}</p>
                            <p className="text-sm text-muted-foreground">
                              {result.type === "train" ? "Train" : "Bus"} •
                              {result.transfers === 0
                                ? " Direct"
                                : ` ${result.transfers} transfer${result.transfers > 1 ? "s" : ""}`}
                            </p>
                          </div>
                        </div>
                        <div className="grid grid-cols-3 gap-4">
                          <div>
                            <p className="text-2xl font-bold">{result.departureTime}</p>
                            <p className="text-sm text-muted-foreground">{result.from}</p>
                          </div>
                          <div className="flex flex-col items-center justify-center">
                            <div className="text-sm text-muted-foreground flex items-center">
                              <Clock className="h-3 w-3 mr-1" />
                              {result.duration}
                            </div>
                            <div className="w-full h-px bg-border my-2 relative">
                              <div className="absolute inset-0 flex items-center justify-center">
                                <ArrowRight className="h-3 w-3 bg-background" />
                              </div>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="text-2xl font-bold">{result.arrivalTime}</p>
                            <p className="text-sm text-muted-foreground">{result.to}</p>
                          </div>
                        </div>
                      </div>
                      <div className="bg-muted/30 p-6 flex flex-col justify-between">
                        <div className="text-right">
                          <p className="text-2xl font-bold">€{result.price}</p>
                          <p className="text-sm text-muted-foreground">per person</p>
                        </div>
                        <Button className="w-full mt-4">Select</Button>
                      </div>
                    </div>
                    <div className="p-4 flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Badge variant="outline">WiFi</Badge>
                        <Badge variant="outline">Power Outlets</Badge>
                        {result.type === "train" && <Badge variant="outline">Food Service</Badge>}
                      </div>
                      <Button variant="link" size="sm">
                        View Details
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))
            ) : (
              <Card>
                <CardContent className="p-6 text-center">
                  <h3 className="text-lg font-medium mb-2">No results found</h3>
                  <p className="text-muted-foreground">Try adjusting your search criteria or filters</p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

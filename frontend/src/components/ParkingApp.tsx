"use client"

import { useState, useEffect } from "react"
import { Button } from "./ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card"
import { Input } from "./ui/input"
import { Badge } from "./ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs"
import { Switch } from "./ui/switch"
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "./ui/dialog"
import { Label } from "./ui/label"
import {
  Car,
  MapPin,
  Clock,
  User,
  Search,
  Plus,
  Star,
  Navigation,
  CreditCard,
  Bell,
  Settings,
  Moon,
  Sun,
  LogOut,
  Camera,
  Shield,
  MapIcon,
} from "lucide-react"

// Types
interface ParkingSpot {
  id: number
  location: string
  address: string
  status: "available" | "occupied" | "reserved"
  price: number
  distance: string
  rating: number
  features: string[]
}

interface Booking {
  id: number
  spotId: number
  location: string
  date: string
  time: string
  duration: string
  status: "active" | "completed" | "upcoming"
  totalCost: number
}

interface UserProfile {
  id: string
  name: string
  email: string
  phone: string
  avatar: string
  joinDate: string
  totalBookings: number
  totalSavings: number
  preferredPayment: string
  notifications: {
    email: boolean
    push: boolean
    sms: boolean
  }
}

// Mock data
const mockParkingSpots: ParkingSpot[] = [
  {
    id: 1,
    location: "Downtown Mall",
    address: "123 Main St, Downtown",
    status: "available",
    price: 5,
    distance: "0.2 km",
    rating: 4.5,
    features: ["Covered", "Security", "EV Charging"],
  },
  {
    id: 2,
    location: "Office Complex A",
    address: "456 Business Ave",
    status: "occupied",
    price: 8,
    distance: "0.5 km",
    rating: 4.2,
    features: ["24/7 Access", "Security"],
  },
  {
    id: 3,
    location: "Shopping Center",
    address: "789 Commerce Blvd",
    status: "available",
    price: 6,
    distance: "0.8 km",
    rating: 4.0,
    features: ["Covered", "Wheelchair Access"],
  },
  {
    id: 4,
    location: "Hospital Parking",
    address: "321 Health St",
    status: "available",
    price: 10,
    distance: "1.2 km",
    rating: 4.8,
    features: ["Valet Service", "Security", "24/7 Access"],
  },
  {
    id: 5,
    location: "Airport Terminal",
    address: "555 Airport Rd",
    status: "reserved",
    price: 15,
    distance: "2.1 km",
    rating: 4.3,
    features: ["Shuttle Service", "Long-term", "Security"],
  },
  {
    id: 6,
    location: "University Campus",
    address: "100 College Ave",
    status: "available",
    price: 3,
    distance: "1.5 km",
    rating: 3.8,
    features: ["Student Discount", "Bike Parking"],
  },
]

const mockBookings: Booking[] = [
  {
    id: 1,
    spotId: 1,
    location: "Downtown Mall",
    date: "2024-01-15",
    time: "10:00 AM",
    duration: "2 hours",
    status: "active",
    totalCost: 12,
  },
  {
    id: 2,
    spotId: 2,
    location: "Office Complex A",
    date: "2024-01-14",
    time: "9:00 AM",
    duration: "8 hours",
    status: "completed",
    totalCost: 66,
  },
  {
    id: 3,
    spotId: 4,
    location: "Hospital Parking",
    date: "2024-01-16",
    time: "2:00 PM",
    duration: "3 hours",
    status: "upcoming",
    totalCost: 32,
  },
]

export default function ParkingApp() {
  const [currentView, setCurrentView] = useState("login")
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedSpot, setSelectedSpot] = useState<ParkingSpot | null>(null)
  const [isDarkMode, setIsDarkMode] = useState(false)
  const [showProfileDialog, setShowProfileDialog] = useState(false)
  const [showSettingsDialog, setShowSettingsDialog] = useState(false)
  const [bookingForm, setBookingForm] = useState({
    date: "",
    time: "",
    duration: 2,
  })

  const [userProfile, setUserProfile] = useState<UserProfile>({
    id: "user_123",
    name: "Saurav",
    email: "saurav@example.com",
    phone: "+91 7577978050",
    avatar: "",
    joinDate: "January 2023",
    totalBookings: 47,
    totalSavings: 145,
    preferredPayment: "Credit Card",
    notifications: {
      email: true,
      push: true,
      sms: false,
    },
  })

  // Dark mode effect
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark")
    } else {
      document.documentElement.classList.remove("dark")
    }
  }, [isDarkMode])

  const filteredSpots = mockParkingSpots.filter(
    (spot) =>
      spot.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      spot.address.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const getStatusBadge = (status: string) => {
    const variants = {
      available: "bg-green-100 text-green-800 border-green-200 dark:bg-green-900 dark:text-green-300",
      occupied: "bg-red-100 text-red-800 border-red-200 dark:bg-red-900 dark:text-red-300",
      reserved: "bg-yellow-100 text-yellow-800 border-yellow-200 dark:bg-yellow-900 dark:text-yellow-300",
    }
    return (
      <Badge className={`${variants[status as keyof typeof variants]} border`}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </Badge>
    )
  }

  const getBookingStatusBadge = (status: string) => {
    const variants = {
      active: "bg-blue-100 text-blue-800 border-blue-200 dark:bg-blue-900 dark:text-blue-300",
      completed: "bg-gray-100 text-gray-800 border-gray-200 dark:bg-gray-800 dark:text-gray-300",
      upcoming: "bg-purple-100 text-purple-800 border-purple-200 dark:bg-purple-900 dark:text-purple-300",
    }
    return (
      <Badge className={`${variants[status as keyof typeof variants]} border`}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </Badge>
    )
  }

  const handleBooking = () => {
    if (selectedSpot) {
      const newBooking: Booking = {
        id: Date.now(),
        spotId: selectedSpot.id,
        location: selectedSpot.location,
        date: bookingForm.date,
        time: bookingForm.time,
        duration: `${bookingForm.duration} hours`,
        status: "upcoming",
        totalCost: selectedSpot.price * bookingForm.duration + 2,
      }

      console.log("New booking:", newBooking)
      setSelectedSpot(null)
      setCurrentView("bookings")
      setBookingForm({ date: "", time: "", duration: 2 })
    }
  }

  const handleLogout = () => {
    setCurrentView("login")
    // Reset any user data if needed
    console.log("User logged out")
  }

  const handleProfileUpdate = (updatedProfile: Partial<UserProfile>) => {
    setUserProfile((prev) => ({ ...prev, ...updatedProfile }))
    setShowProfileDialog(false)
  }

  const handleNotificationUpdate = (type: keyof UserProfile["notifications"], value: boolean) => {
    setUserProfile((prev) => ({
      ...prev,
      notifications: {
        ...prev.notifications,
        [type]: value,
      },
    }))
  }

  // Login Screen
  if (currentView === "login") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-blue-900 dark:to-purple-900 flex items-center justify-center p-4">
        <Card className="w-full max-w-md shadow-xl border-0">
          <CardHeader className="text-center pb-8">
            <div className="mx-auto mb-6 w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg">
              <Car className="w-8 h-8 text-white" />
            </div>
            <CardTitle className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Levi-Park
            </CardTitle>
            <CardDescription className="text-lg text-gray-600 dark:text-gray-300">
              Find and reserve parking spots instantly
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <Input type="email" placeholder="Enter your email" className="h-12 text-lg" />
              <Input type="password" placeholder="Enter your password" className="h-12 text-lg" />
            </div>
            <Button
              className="w-full h-12 text-lg bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
              onClick={() => setCurrentView("dashboard")}
            >
              Sign In
            </Button>
            <div className="text-center space-y-2">
              <Button variant="link" className="text-gray-600 dark:text-gray-300">
                Forgot password?
              </Button>
              <div className="text-sm text-gray-500 dark:text-gray-400">
                Don't have an account?{" "}
                <Button variant="link" className="text-blue-600 p-1">
                  Sign up
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 shadow-sm border-b dark:border-gray-700 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center mr-3">
                <Car className="w-6 h-6 text-white" />
              </div>
              <h1 className="text-xl font-bold text-gray-900 dark:text-white">Levi-Park</h1>
            </div>
            <div className="flex items-center space-x-4">
              {/* Notifications */}
              <Button variant="ghost" size="icon" className="relative">
                <Bell className="w-5 h-5" />
                <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>
              </Button>

              {/* Profile Dropdown */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={userProfile.avatar || "/placeholder.svg"} alt={userProfile.name} />
                      <AvatarFallback className="bg-blue-600 text-white">
                        {userProfile.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end" forceMount>
                  <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium leading-none">{userProfile.name}</p>
                      <p className="text-xs leading-none text-muted-foreground">{userProfile.email}</p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />

                  <DropdownMenuItem onClick={() => setShowProfileDialog(true)}>
                    <User className="mr-2 h-4 w-4" />
                    <span>Profile</span>
                  </DropdownMenuItem>

                  <DropdownMenuItem onClick={() => setShowSettingsDialog(true)}>
                    <Settings className="mr-2 h-4 w-4" />
                    <span>Settings</span>
                  </DropdownMenuItem>

                  <DropdownMenuItem onClick={() => setIsDarkMode(!isDarkMode)}>
                    {isDarkMode ? <Sun className="mr-2 h-4 w-4" /> : <Moon className="mr-2 h-4 w-4" />}
                    <span>{isDarkMode ? "Light Mode" : "Dark Mode"}</span>
                  </DropdownMenuItem>

                  <DropdownMenuSeparator />

                  <DropdownMenuItem onClick={handleLogout} className="text-red-600 dark:text-red-400">
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Log out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <Tabs value={currentView} onValueChange={setCurrentView} className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-8">
            <TabsTrigger value="dashboard" className="text-sm">
              Dashboard
            </TabsTrigger>
            <TabsTrigger value="search" className="text-sm">
              Find Parking
            </TabsTrigger>
            <TabsTrigger value="bookings" className="text-sm">
              My Bookings
            </TabsTrigger>
          </TabsList>

          {/* Dashboard Tab */}
          <TabsContent value="dashboard" className="space-y-6">
            {/* Welcome Section */}
            <Card className="bg-gradient-to-r from-blue-600 to-purple-600 text-white border-0">
              <CardContent className="p-6">
                <div className="flex justify-between items-center">
                  <div>
                    <h2 className="text-2xl font-bold mb-2">Welcome back, {userProfile.name}!</h2>
                    <p className="text-blue-100">Ready to find your perfect parking spot?</p>
                  </div>
                  <div className="text-right">
                    <p className="text-blue-100 text-sm">Total Savings</p>
                    <p className="text-3xl font-bold">${userProfile.totalSavings}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-gray-600 dark:text-gray-300">
                    Available Spots
                  </CardTitle>
                  <div className="w-8 h-8 bg-green-100 dark:bg-green-900 rounded-lg flex items-center justify-center">
                    <MapPin className="h-4 w-4 text-green-600 dark:text-green-400" />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-gray-900 dark:text-white">
                    {mockParkingSpots.filter((spot) => spot.status === "available").length}
                  </div>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Near your location</p>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-gray-600 dark:text-gray-300">
                    Active Bookings
                  </CardTitle>
                  <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center">
                    <Clock className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-gray-900 dark:text-white">
                    {mockBookings.filter((booking) => booking.status === "active").length}
                  </div>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Currently reserved</p>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-gray-600 dark:text-gray-300">This Month</CardTitle>
                  <div className="w-8 h-8 bg-purple-100 dark:bg-purple-900 rounded-lg flex items-center justify-center">
                    <CreditCard className="h-4 w-4 text-purple-600 dark:text-purple-400" />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-gray-900 dark:text-white">$89</div>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Total spent</p>
                </CardContent>
              </Card>
            </div>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
                <CardDescription>Get started with common parking tasks</CardDescription>
              </CardHeader>
              <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Button
                  className="h-24 flex-col space-y-3 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800"
                  onClick={() => setCurrentView("search")}
                >
                  <Search className="w-6 h-6" />
                  <span className="font-medium">Find Parking Now</span>
                </Button>
                <Button
                  variant="outline"
                  className="h-24 flex-col space-y-3 border-2 hover:bg-gray-50 dark:hover:bg-gray-800 bg-transparent"
                  onClick={() => setCurrentView("bookings")}
                >
                  <Clock className="w-6 h-6" />
                  <span className="font-medium">View My Bookings</span>
                </Button>
              </CardContent>
            </Card>

            {/* Recent Activity */}
            <Card>
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
                <CardDescription>Your latest parking activities</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockBookings.slice(0, 3).map((booking) => (
                    <div
                      key={booking.id}
                      className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg"
                    >
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center">
                          <Car className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                        </div>
                        <div>
                          <p className="font-medium text-gray-900 dark:text-white">{booking.location}</p>
                          <p className="text-sm text-gray-500 dark:text-gray-400">
                            {booking.date} • {booking.duration}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        {getBookingStatusBadge(booking.status)}
                        <p className="text-sm font-medium text-gray-900 dark:text-white mt-1">${booking.totalCost}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Search Tab */}
          <TabsContent value="search" className="space-y-6">
            {/* Search Header */}
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <Input
                  placeholder="Search by location or address..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="h-12 text-lg"
                />
              </div>
              <Button className="h-12 px-8">
                <Search className="w-4 h-4 mr-2" />
                Search
              </Button>
            </div>

            {/* Filters */}
            <Card>
              <CardContent className="p-4">
                <div className="flex flex-wrap gap-2">
                  <Button variant="outline" size="sm">
                    All Spots
                  </Button>
                  <Button variant="outline" size="sm">
                    Available Now
                  </Button>
                  <Button variant="outline" size="sm">
                    Under $10
                  </Button>
                  <Button variant="outline" size="sm">
                    Covered
                  </Button>
                  <Button variant="outline" size="sm">
                    EV Charging
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Parking Spots Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredSpots.map((spot) => (
                <Card
                  key={spot.id}
                  className="hover:shadow-lg transition-all duration-200 border-2 hover:border-blue-200 dark:hover:border-blue-700"
                >
                  <CardHeader className="pb-3">
                    <div className="flex justify-between items-start mb-2">
                      <div className="flex-1">
                        <CardTitle className="text-lg font-bold text-gray-900 dark:text-white">
                          {spot.location}
                        </CardTitle>
                        <CardDescription className="flex items-center mt-1 text-gray-600 dark:text-gray-300">
                          <MapPin className="w-4 h-4 mr-1" />
                          {spot.address}
                        </CardDescription>
                      </div>
                      {getStatusBadge(spot.status)}
                    </div>

                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center text-gray-600 dark:text-gray-300">
                        <Navigation className="w-4 h-4 mr-1" />
                        {spot.distance}
                      </div>
                      <div className="flex items-center text-yellow-600 dark:text-yellow-400">
                        <Star className="w-4 h-4 mr-1 fill-current" />
                        {spot.rating}
                      </div>
                    </div>
                  </CardHeader>

                  <CardContent className="pt-0">
                    <div className="flex flex-wrap gap-1 mb-4">
                      {spot.features.slice(0, 2).map((feature) => (
                        <Badge key={feature} variant="secondary" className="text-xs">
                          {feature}
                        </Badge>
                      ))}
                      {spot.features.length > 2 && (
                        <Badge variant="secondary" className="text-xs">
                          +{spot.features.length - 2} more
                        </Badge>
                      )}
                    </div>

                    <div className="flex justify-between items-center">
                      <div>
                        <span className="text-2xl font-bold text-gray-900 dark:text-white">${spot.price}</span>
                        <span className="text-gray-600 dark:text-gray-300">/hr</span>
                      </div>
                      <Button
                        disabled={spot.status !== "available"}
                        onClick={() => setSelectedSpot(spot)}
                        className={spot.status === "available" ? "bg-blue-600 hover:bg-blue-700" : ""}
                      >
                        {spot.status === "available" ? "Reserve Now" : "Unavailable"}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {filteredSpots.length === 0 && (
              <Card className="text-center py-12">
                <CardContent>
                  <Search className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">No parking spots found</h3>
                  <p className="text-gray-600 dark:text-gray-300">Try adjusting your search criteria or location.</p>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          {/* Bookings Tab */}
          <TabsContent value="bookings" className="space-y-6">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">My Bookings</h2>
                <p className="text-gray-600 dark:text-gray-300">Manage your parking reservations</p>
              </div>
              <Button onClick={() => setCurrentView("search")}>
                <Plus className="w-4 h-4 mr-2" />
                New Booking
              </Button>
            </div>

            {/* Booking Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card>
                <CardContent className="p-4 text-center">
                  <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                    {mockBookings.filter((b) => b.status === "active").length}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-300">Active</div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4 text-center">
                  <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                    {mockBookings.filter((b) => b.status === "upcoming").length}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-300">Upcoming</div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4 text-center">
                  <div className="text-2xl font-bold text-gray-600 dark:text-gray-400">
                    {mockBookings.filter((b) => b.status === "completed").length}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-300">Completed</div>
                </CardContent>
              </Card>
            </div>

            {/* Bookings List */}
            <div className="space-y-4">
              {mockBookings.map((booking) => (
                <Card key={booking.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex flex-col md:flex-row md:items-center justify-between">
                      <div className="flex-1 space-y-3">
                        <div className="flex items-center justify-between">
                          <h3 className="font-bold text-lg text-gray-900 dark:text-white">{booking.location}</h3>
                          {getBookingStatusBadge(booking.status)}
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-600 dark:text-gray-300">
                          <div className="flex items-center">
                            <Clock className="w-4 h-4 mr-2" />
                            {booking.date} at {booking.time}
                          </div>
                          <div className="flex items-center">
                            <Car className="w-4 h-4 mr-2" />
                            Duration: {booking.duration}
                          </div>
                          <div className="flex items-center">
                            <CreditCard className="w-4 h-4 mr-2" />
                            Total: ${booking.totalCost}
                          </div>
                        </div>
                      </div>

                      <div className="flex flex-col md:flex-row gap-2 mt-4 md:mt-0">
                        {booking.status === "active" && (
                          <>
                            <Button variant="outline" size="sm">
                              Extend Time
                            </Button>
                            <Button variant="outline" size="sm">
                              End Early
                            </Button>
                          </>
                        )}
                        {booking.status === "upcoming" && (
                          <>
                            <Button variant="outline" size="sm">
                              Modify
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              className="text-red-600 border-red-200 hover:bg-red-50 dark:text-red-400 dark:border-red-800 dark:hover:bg-red-900 bg-transparent"
                            >
                              Cancel
                            </Button>
                          </>
                        )}
                        {booking.status === "completed" && (
                          <Button variant="outline" size="sm">
                            Book Again
                          </Button>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {mockBookings.length === 0 && (
              <Card className="text-center py-12">
                <CardContent>
                  <Clock className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">No bookings yet</h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">
                    Start by finding and reserving a parking spot.
                  </p>
                  <Button onClick={() => setCurrentView("search")}>Find Parking Spots</Button>
                </CardContent>
              </Card>
            )}
          </TabsContent>
        </Tabs>
      </main>

      {/* Profile Dialog */}
      <Dialog open={showProfileDialog} onOpenChange={setShowProfileDialog}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Profile Settings</DialogTitle>
            <DialogDescription>Update your profile information and preferences.</DialogDescription>
          </DialogHeader>
          <div className="space-y-6 py-4">
            {/* Avatar Section */}
            <div className="flex items-center space-x-4">
              <Avatar className="h-20 w-20">
                <AvatarImage src={userProfile.avatar || "/placeholder.svg"} alt={userProfile.name} />
                <AvatarFallback className="bg-blue-600 text-white text-xl">
                  {userProfile.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
              <div className="space-y-2">
                <Button variant="outline" size="sm">
                  <Camera className="w-4 h-4 mr-2" />
                  Change Photo
                </Button>
                <p className="text-xs text-gray-500 dark:text-gray-400">JPG, PNG or GIF. Max size 2MB.</p>
              </div>
            </div>

            {/* Profile Information */}
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    value={userProfile.name}
                    onChange={(e) => setUserProfile((prev) => ({ ...prev, name: e.target.value }))}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone</Label>
                  <Input
                    id="phone"
                    value={userProfile.phone}
                    onChange={(e) => setUserProfile((prev) => ({ ...prev, phone: e.target.value }))}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={userProfile.email}
                  onChange={(e) => setUserProfile((prev) => ({ ...prev, email: e.target.value }))}
                />
              </div>
            </div>

            {/* Account Stats */}
            <div className="grid grid-cols-2 gap-4 pt-4 border-t">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">{userProfile.totalBookings}</div>
                <div className="text-sm text-gray-600 dark:text-gray-300">Total Bookings</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600 dark:text-green-400">${userProfile.totalSavings}</div>
                <div className="text-sm text-gray-600 dark:text-gray-300">Total Savings</div>
              </div>
            </div>

            <div className="flex justify-end space-x-2">
              <Button variant="outline" onClick={() => setShowProfileDialog(false)}>
                Cancel
              </Button>
              <Button onClick={() => handleProfileUpdate(userProfile)}>Save Changes</Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Settings Dialog */}
      <Dialog open={showSettingsDialog} onOpenChange={setShowSettingsDialog}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Settings</DialogTitle>
            <DialogDescription>Manage your app preferences and notifications.</DialogDescription>
          </DialogHeader>
          <div className="space-y-6 py-4">
            {/* Appearance */}
            <div className="space-y-4">
              <h4 className="text-sm font-medium">Appearance</h4>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Dark Mode</Label>
                  <p className="text-xs text-gray-500 dark:text-gray-400">Switch between light and dark themes</p>
                </div>
                <Switch checked={isDarkMode} onCheckedChange={setIsDarkMode} />
              </div>
            </div>

            {/* Notifications */}
            <div className="space-y-4">
              <h4 className="text-sm font-medium">Notifications</h4>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Email Notifications</Label>
                  <p className="text-xs text-gray-500 dark:text-gray-400">Receive booking confirmations via email</p>
                </div>
                <Switch
                  checked={userProfile.notifications.email}
                  onCheckedChange={(checked) => handleNotificationUpdate("email", checked)}
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Push Notifications</Label>
                  <p className="text-xs text-gray-500 dark:text-gray-400">Get notified about booking updates</p>
                </div>
                <Switch
                  checked={userProfile.notifications.push}
                  onCheckedChange={(checked) => handleNotificationUpdate("push", checked)}
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>SMS Notifications</Label>
                  <p className="text-xs text-gray-500 dark:text-gray-400">Receive text messages for urgent updates</p>
                </div>
                <Switch
                  checked={userProfile.notifications.sms}
                  onCheckedChange={(checked) => handleNotificationUpdate("sms", checked)}
                />
              </div>
            </div>

            {/* Account */}
            <div className="space-y-4">
              <h4 className="text-sm font-medium">Account</h4>
              <div className="space-y-2">
                <Button variant="outline" className="w-full justify-start bg-transparent">
                  <Shield className="w-4 h-4 mr-2" />
                  Change Password
                </Button>
                <Button variant="outline" className="w-full justify-start bg-transparent">
                  <CreditCard className="w-4 h-4 mr-2" />
                  Payment Methods
                </Button>
                <Button variant="outline" className="w-full justify-start bg-transparent">
                  <MapIcon className="w-4 h-4 mr-2" />
                  Saved Locations
                </Button>
              </div>
            </div>

            <div className="flex justify-end space-x-2 pt-4 border-t">
              <Button variant="outline" onClick={() => setShowSettingsDialog(false)}>
                Close
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Reservation Modal */}
      {selectedSpot && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <Card className="w-full max-w-md max-h-[90vh] overflow-y-auto">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                Reserve Parking Spot
                <Button variant="ghost" size="icon" onClick={() => setSelectedSpot(null)} className="h-6 w-6">
                  ×
                </Button>
              </CardTitle>
              <CardDescription>
                <div className="space-y-1">
                  <div className="font-medium text-gray-900 dark:text-white">{selectedSpot.location}</div>
                  <div className="text-sm text-gray-600 dark:text-gray-300">{selectedSpot.address}</div>
                  <div className="flex items-center gap-2 mt-2">
                    <div className="flex items-center text-yellow-600 dark:text-yellow-400">
                      <Star className="w-4 h-4 mr-1 fill-current" />
                      {selectedSpot.rating}
                    </div>
                    <div className="flex items-center text-gray-600 dark:text-gray-300">
                      <Navigation className="w-4 h-4 mr-1" />
                      {selectedSpot.distance}
                    </div>
                  </div>
                </div>
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Features */}
              <div>
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 block">Features</label>
                <div className="flex flex-wrap gap-2">
                  {selectedSpot.features.map((feature) => (
                    <Badge key={feature} variant="secondary">
                      {feature}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Date and Time */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 block">Date</label>
                  <Input
                    type="date"
                    value={bookingForm.date}
                    onChange={(e) => setBookingForm({ ...bookingForm, date: e.target.value })}
                    min={new Date().toISOString().split("T")[0]}
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 block">Time</label>
                  <Input
                    type="time"
                    value={bookingForm.time}
                    onChange={(e) => setBookingForm({ ...bookingForm, time: e.target.value })}
                  />
                </div>
              </div>

              {/* Duration */}
              <div>
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 block">
                  Duration: {bookingForm.duration} hours
                </label>
                <input
                  type="range"
                  min="1"
                  max="24"
                  value={bookingForm.duration}
                  onChange={(e) => setBookingForm({ ...bookingForm, duration: Number.parseInt(e.target.value) })}
                  className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer"
                />
                <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-1">
                  <span>1hr</span>
                  <span>12hrs</span>
                  <span>24hrs</span>
                </div>
              </div>

              {/* Cost Breakdown */}
              <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Rate:</span>
                  <span>${selectedSpot.price}/hour</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Duration:</span>
                  <span>{bookingForm.duration} hours</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Subtotal:</span>
                  <span>${selectedSpot.price * bookingForm.duration}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Service Fee:</span>
                  <span>$2.00</span>
                </div>
                <div className="border-t pt-2 mt-2">
                  <div className="flex justify-between font-bold">
                    <span>Total:</span>
                    <span>${selectedSpot.price * bookingForm.duration + 2}</span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3">
                <Button variant="outline" className="flex-1 bg-transparent" onClick={() => setSelectedSpot(null)}>
                  Cancel
                </Button>
                <Button
                  className="flex-1 bg-blue-600 hover:bg-blue-700"
                  onClick={handleBooking}
                  disabled={!bookingForm.date || !bookingForm.time}
                >
                  Confirm Booking
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}

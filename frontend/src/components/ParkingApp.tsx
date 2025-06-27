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
  BarChart3,
  Users,
  DollarSign,
  TrendingUp,
  Calendar,
  Download,
  Receipt,
  Wallet,
  Eye,
  Edit,
  CheckCircle,
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
  totalSpots: number
  occupiedSpots: number
}

interface Booking {
  id: number
  spotId: number
  location: string
  date: string
  time: string
  duration: string
  status: "active" | "completed" | "upcoming" | "cancelled"
  totalCost: number
  paymentStatus: "paid" | "pending" | "failed"
  paymentMethod: string
  userId: string
  userName: string
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
  role: "user" | "admin"
  notifications: {
    email: boolean
    push: boolean
    sms: boolean
  }
}

interface AdminStats {
  totalRevenue: number
  totalBookings: number
  totalUsers: number
  totalParkingSpots: number
  occupancyRate: number
  averageBookingValue: number
  monthlyGrowth: number
  topLocations: Array<{ name: string; bookings: number; revenue: number }>
  recentActivity: Array<{ id: string; action: string; user: string; time: string }>
}

interface PaymentMethod {
  id: string
  type: "card" | "paypal" | "apple_pay" | "google_pay"
  last4?: string
  brand?: string
  isDefault: boolean
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
    totalSpots: 50,
    occupiedSpots: 32,
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
    totalSpots: 100,
    occupiedSpots: 95,
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
    totalSpots: 75,
    occupiedSpots: 45,
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
    totalSpots: 200,
    occupiedSpots: 150,
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
    totalSpots: 500,
    occupiedSpots: 480,
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
    totalSpots: 300,
    occupiedSpots: 180,
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
    paymentStatus: "paid",
    paymentMethod: "Credit Card",
    userId: "user_123",
    userName: "Saurav",
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
    paymentStatus: "paid",
    paymentMethod: "PayPal",
    userId: "user_123",
    userName: "Saurav",
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
    paymentStatus: "pending",
    paymentMethod: "Apple Pay",
    userId: "user_123",
    userName: "Saurav",
  },
  {
    id: 4,
    spotId: 3,
    location: "Shopping Center",
    date: "2024-01-13",
    time: "3:00 PM",
    duration: "4 hours",
    status: "completed",
    totalCost: 26,
    paymentStatus: "paid",
    paymentMethod: "Credit Card",
    userId: "user_456",
    userName: "John Smith",
  },
  {
    id: 5,
    spotId: 5,
    location: "Airport Terminal",
    date: "2024-01-12",
    time: "6:00 AM",
    duration: "12 hours",
    status: "completed",
    totalCost: 182,
    paymentStatus: "paid",
    paymentMethod: "Credit Card",
    userId: "user_789",
    userName: "Alice Johnson",
  },
]

const mockAdminStats: AdminStats = {
  totalRevenue: 15420,
  totalBookings: 1247,
  totalUsers: 892,
  totalParkingSpots: 1225,
  occupancyRate: 78.5,
  averageBookingValue: 12.37,
  monthlyGrowth: 15.2,
  topLocations: [
    { name: "Airport Terminal", bookings: 245, revenue: 4890 },
    { name: "Downtown Mall", bookings: 198, revenue: 2376 },
    { name: "Hospital Parking", bookings: 167, revenue: 3340 },
    { name: "Office Complex A", bookings: 134, revenue: 2144 },
  ],
  recentActivity: [
    { id: "1", action: "New booking created", user: "Saurav", time: "2 minutes ago" },
    { id: "2", action: "Payment completed", user: "John Smith", time: "5 minutes ago" },
    { id: "3", action: "Booking cancelled", user: "Alice Johnson", time: "10 minutes ago" },
    { id: "4", action: "New user registered", user: "Mike Wilson", time: "15 minutes ago" },
    { id: "5", action: "Booking extended", user: "Sarah Davis", time: "20 minutes ago" },
  ],
}

const mockPaymentMethods: PaymentMethod[] = [
  {
    id: "pm_1",
    type: "card",
    last4: "4242",
    brand: "Visa",
    isDefault: true,
  },
  {
    id: "pm_2",
    type: "card",
    last4: "5555",
    brand: "Mastercard",
    isDefault: false,
  },
  {
    id: "pm_3",
    type: "paypal",
    isDefault: false,
  },
]

export default function ParkingApp() {
  const [currentView, setCurrentView] = useState("login")
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedSpot, setSelectedSpot] = useState<ParkingSpot | null>(null)
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null)
  const [isDarkMode, setIsDarkMode] = useState(false)
  const [showProfileDialog, setShowProfileDialog] = useState(false)
  const [showSettingsDialog, setShowSettingsDialog] = useState(false)
  const [showPaymentDialog, setShowPaymentDialog] = useState(false)
  const [showReceiptDialog, setShowReceiptDialog] = useState(false)
  const [bookingForm, setBookingForm] = useState({
    date: "",
    time: "",
    duration: 2,
    paymentMethod: "",
  })

  const [userProfile, setUserProfile] = useState<UserProfile>(() => {
    const savedProfile = localStorage.getItem("userProfile")
    if (savedProfile) {
      return JSON.parse(savedProfile)
    }
    return {
      id: "user_123",
      name: "Saurav",
      email: "saurav@example.com",
      phone: "+1 (555) 123-4567",
      avatar: "",
      joinDate: "January 2023",
      totalBookings: 47,
      totalSavings: 145,
      preferredPayment: "Credit Card",
      role: "user", // Change to "admin" to see admin dashboard
      notifications: {
        email: true,
        push: true,
        sms: false,
      },
    }
  })

  // Dark mode effect
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark")
    } else {
      document.documentElement.classList.remove("dark")
    }
  }, [isDarkMode])

  // Save profile to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("userProfile", JSON.stringify(userProfile))
  }, [userProfile])

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
      cancelled: "bg-red-100 text-red-800 border-red-200 dark:bg-red-900 dark:text-red-300",
    }
    return (
      <Badge className={`${variants[status as keyof typeof variants]} border`}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </Badge>
    )
  }

  const getPaymentStatusBadge = (status: string) => {
    const variants = {
      paid: "bg-green-100 text-green-800 border-green-200 dark:bg-green-900 dark:text-green-300",
      pending: "bg-yellow-100 text-yellow-800 border-yellow-200 dark:bg-yellow-900 dark:text-yellow-300",
      failed: "bg-red-100 text-red-800 border-red-200 dark:bg-red-900 dark:text-red-300",
    }
    return (
      <Badge className={`${variants[status as keyof typeof variants]} border`}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </Badge>
    )
  }

  const handleBooking = () => {
    if (selectedSpot && bookingForm.paymentMethod) {
      setShowPaymentDialog(true)
    }
  }

  const handlePaymentSuccess = () => {
    const newBooking: Booking = {
      id: Date.now(),
      spotId: selectedSpot!.id,
      location: selectedSpot!.location,
      date: bookingForm.date,
      time: bookingForm.time,
      duration: `${bookingForm.duration} hours`,
      status: "upcoming",
      totalCost: selectedSpot!.price * bookingForm.duration + 2,
      paymentStatus: "paid",
      paymentMethod: bookingForm.paymentMethod,
      userId: userProfile.id,
      userName: userProfile.name,
    }

    console.log("New booking:", newBooking)
    setShowPaymentDialog(false)
    setSelectedSpot(null)
    setSelectedBooking(newBooking)
    setShowReceiptDialog(true)
    setCurrentView("bookings")
    setBookingForm({ date: "", time: "", duration: 2, paymentMethod: "" })
  }

  const handleLogout = () => {
    setCurrentView("login")
    console.log("User logged out")
  }

  const handleProfileUpdate = (updatedProfile: Partial<UserProfile>) => {
    const newProfile = { ...userProfile, ...updatedProfile }
    setUserProfile(newProfile)
    localStorage.setItem("userProfile", JSON.stringify(newProfile))
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

  const toggleUserRole = () => {
    setUserProfile((prev) => ({
      ...prev,
      role: prev.role === "user" ? "admin" : "user",
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
              onClick={() => setCurrentView(userProfile.role === "admin" ? "admin-dashboard" : "dashboard")}
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
              <div className="pt-4 border-t">
                <Button variant="outline" onClick={toggleUserRole} className="text-xs bg-transparent">
                  Switch to {userProfile.role === "user" ? "Admin" : "User"} Mode
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  // Admin Dashboard
  if (userProfile.role === "admin" && currentView === "admin-dashboard") {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
        {/* Admin Header */}
        <header className="bg-white dark:bg-gray-800 shadow-sm border-b dark:border-gray-700 sticky top-0 z-40">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <div className="flex items-center">
                <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center mr-3">
                  <BarChart3 className="w-6 h-6 text-white" />
                </div>
                <h1 className="text-xl font-bold text-gray-900 dark:text-white">Levi-Park Admin</h1>
              </div>
              <div className="flex items-center space-x-4">
                <Button variant="ghost" size="icon" className="relative">
                  <Bell className="w-5 h-5" />
                  <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>
                </Button>

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
                        <p className="text-xs leading-none text-muted-foreground">Administrator</p>
                      </div>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
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

        {/* Admin Content */}
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Dashboard Overview</h2>
            <p className="text-gray-600 dark:text-gray-300">Monitor your parking management system</p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600 dark:text-gray-300">Total Revenue</p>
                    <p className="text-3xl font-bold text-gray-900 dark:text-white">
                      ${mockAdminStats.totalRevenue.toLocaleString()}
                    </p>
                    <p className="text-sm text-green-600 dark:text-green-400">
                      +{mockAdminStats.monthlyGrowth}% from last month
                    </p>
                  </div>
                  <div className="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-lg flex items-center justify-center">
                    <DollarSign className="w-6 h-6 text-green-600 dark:text-green-400" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600 dark:text-gray-300">Total Bookings</p>
                    <p className="text-3xl font-bold text-gray-900 dark:text-white">{mockAdminStats.totalBookings}</p>
                    <p className="text-sm text-blue-600 dark:text-blue-400">Active this month</p>
                  </div>
                  <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center">
                    <Calendar className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600 dark:text-gray-300">Total Users</p>
                    <p className="text-3xl font-bold text-gray-900 dark:text-white">{mockAdminStats.totalUsers}</p>
                    <p className="text-sm text-purple-600 dark:text-purple-400">Registered users</p>
                  </div>
                  <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900 rounded-lg flex items-center justify-center">
                    <Users className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600 dark:text-gray-300">Occupancy Rate</p>
                    <p className="text-3xl font-bold text-gray-900 dark:text-white">{mockAdminStats.occupancyRate}%</p>
                    <p className="text-sm text-orange-600 dark:text-orange-400">Current utilization</p>
                  </div>
                  <div className="w-12 h-12 bg-orange-100 dark:bg-orange-900 rounded-lg flex items-center justify-center">
                    <TrendingUp className="w-6 h-6 text-orange-600 dark:text-orange-400" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            {/* Top Locations */}
            <Card>
              <CardHeader>
                <CardTitle>Top Performing Locations</CardTitle>
                <CardDescription>Highest revenue generating parking spots</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockAdminStats.topLocations.map((location, index) => (
                    <div
                      key={location.name}
                      className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg"
                    >
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center">
                          <span className="text-sm font-bold text-blue-600 dark:text-blue-400">{index + 1}</span>
                        </div>
                        <div>
                          <p className="font-medium text-gray-900 dark:text-white">{location.name}</p>
                          <p className="text-sm text-gray-500 dark:text-gray-400">{location.bookings} bookings</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-gray-900 dark:text-white">${location.revenue}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Recent Activity */}
            <Card>
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
                <CardDescription>Latest system activities and user actions</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockAdminStats.recentActivity.map((activity) => (
                    <div key={activity.id} className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                      <div className="flex-1">
                        <p className="text-sm text-gray-900 dark:text-white">{activity.action}</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          by {activity.user} • {activity.time}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* All Bookings Table */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>All Bookings</CardTitle>
                <CardDescription>Manage all parking reservations</CardDescription>
              </div>
              <Button>
                <Download className="w-4 h-4 mr-2" />
                Export
              </Button>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left p-2">Booking ID</th>
                      <th className="text-left p-2">User</th>
                      <th className="text-left p-2">Location</th>
                      <th className="text-left p-2">Date & Time</th>
                      <th className="text-left p-2">Duration</th>
                      <th className="text-left p-2">Amount</th>
                      <th className="text-left p-2">Status</th>
                      <th className="text-left p-2">Payment</th>
                      <th className="text-left p-2">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {mockBookings.map((booking) => (
                      <tr key={booking.id} className="border-b hover:bg-gray-50 dark:hover:bg-gray-800">
                        <td className="p-2 font-mono text-sm">#{booking.id}</td>
                        <td className="p-2">{booking.userName}</td>
                        <td className="p-2">{booking.location}</td>
                        <td className="p-2">
                          {booking.date} {booking.time}
                        </td>
                        <td className="p-2">{booking.duration}</td>
                        <td className="p-2 font-bold">${booking.totalCost}</td>
                        <td className="p-2">{getBookingStatusBadge(booking.status)}</td>
                        <td className="p-2">{getPaymentStatusBadge(booking.paymentStatus)}</td>
                        <td className="p-2">
                          <div className="flex space-x-1">
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                              <Eye className="w-4 h-4" />
                            </Button>
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                              <Edit className="w-4 h-4" />
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </main>
      </div>
    )
  }

  // User Dashboard
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
              <Button variant="ghost" size="icon" className="relative">
                <Bell className="w-5 h-5" />
                <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>
              </Button>

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

                  <DropdownMenuItem onClick={() => setCurrentView("payment-methods")}>
                    <Wallet className="mr-2 h-4 w-4" />
                    <span>Payment Methods</span>
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
        {/* Payment Methods View */}
        {currentView === "payment-methods" && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Payment Methods</h2>
                <p className="text-gray-600 dark:text-gray-300">Manage your payment options</p>
              </div>
              <div className="flex space-x-2">
                <Button variant="outline" onClick={() => setCurrentView("dashboard")}>
                  Back to Dashboard
                </Button>
                <Button>
                  <Plus className="w-4 h-4 mr-2" />
                  Add Payment Method
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {mockPaymentMethods.map((method) => (
                <Card key={method.id} className={`${method.isDefault ? "ring-2 ring-blue-500" : ""}`}>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        {method.type === "card" && <CreditCard className="w-8 h-8 text-gray-600" />}
                        {method.type === "paypal" && <Wallet className="w-8 h-8 text-blue-600" />}
                        {method.type === "apple_pay" && <Wallet className="w-8 h-8 text-gray-900" />}
                        {method.type === "google_pay" && <Wallet className="w-8 h-8 text-green-600" />}
                        <div>
                          <p className="font-medium">
                            {method.type === "card" ? `${method.brand} ****${method.last4}` : method.type}
                          </p>
                          {method.isDefault && <Badge variant="secondary">Default</Badge>}
                        </div>
                      </div>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <Settings className="w-4 h-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                          <DropdownMenuItem>Set as Default</DropdownMenuItem>
                          <DropdownMenuItem>Edit</DropdownMenuItem>
                          <DropdownMenuItem className="text-red-600">Remove</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Regular Dashboard */}
        {currentView !== "payment-methods" && (
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
                <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-4">
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
                  <Button
                    variant="outline"
                    className="h-24 flex-col space-y-3 border-2 hover:bg-gray-50 dark:hover:bg-gray-800 bg-transparent"
                    onClick={() => setCurrentView("payment-methods")}
                  >
                    <Wallet className="w-6 h-6" />
                    <span className="font-medium">Payment Methods</span>
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
                    {mockBookings
                      .filter((booking) => booking.userId === userProfile.id)
                      .slice(0, 3)
                      .map((booking) => (
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
                            <p className="text-sm font-medium text-gray-900 dark:text-white mt-1">
                              ${booking.totalCost}
                            </p>
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

                      <div className="text-sm text-gray-600 dark:text-gray-300">
                        <span className="font-medium">
                          {spot.totalSpots - spot.occupiedSpots}/{spot.totalSpots}
                        </span>{" "}
                        spots available
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
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <Card>
                  <CardContent className="p-4 text-center">
                    <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                      {mockBookings.filter((b) => b.status === "active" && b.userId === userProfile.id).length}
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-300">Active</div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4 text-center">
                    <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                      {mockBookings.filter((b) => b.status === "upcoming" && b.userId === userProfile.id).length}
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-300">Upcoming</div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4 text-center">
                    <div className="text-2xl font-bold text-gray-600 dark:text-gray-400">
                      {mockBookings.filter((b) => b.status === "completed" && b.userId === userProfile.id).length}
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-300">Completed</div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4 text-center">
                    <div className="text-2xl font-bold text-green-600 dark:text-green-400">
                      $
                      {mockBookings.filter((b) => b.userId === userProfile.id).reduce((sum, b) => sum + b.totalCost, 0)}
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-300">Total Spent</div>
                  </CardContent>
                </Card>
              </div>

              {/* Bookings List */}
              <div className="space-y-4">
                {mockBookings
                  .filter((booking) => booking.userId === userProfile.id)
                  .map((booking) => (
                    <Card key={booking.id} className="hover:shadow-md transition-shadow">
                      <CardContent className="p-6">
                        <div className="flex flex-col md:flex-row md:items-center justify-between">
                          <div className="flex-1 space-y-3">
                            <div className="flex items-center justify-between">
                              <h3 className="font-bold text-lg text-gray-900 dark:text-white">{booking.location}</h3>
                              <div className="flex space-x-2">
                                {getBookingStatusBadge(booking.status)}
                                {getPaymentStatusBadge(booking.paymentStatus)}
                              </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-sm text-gray-600 dark:text-gray-300">
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
                                {booking.paymentMethod}
                              </div>
                              <div className="flex items-center">
                                <DollarSign className="w-4 h-4 mr-2" />
                                Total: ${booking.totalCost}
                              </div>
                            </div>
                          </div>

                          <div className="flex flex-col md:flex-row gap-2 mt-4 md:mt-0">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => {
                                setSelectedBooking(booking)
                                setShowReceiptDialog(true)
                              }}
                            >
                              <Receipt className="w-4 h-4 mr-2" />
                              Receipt
                            </Button>
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

              {mockBookings.filter((booking) => booking.userId === userProfile.id).length === 0 && (
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
        )}
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

      {/* Payment Dialog */}
      <Dialog open={showPaymentDialog} onOpenChange={setShowPaymentDialog}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Complete Payment</DialogTitle>
            <DialogDescription>Secure payment for your parking reservation</DialogDescription>
          </DialogHeader>
          <div className="space-y-6 py-4">
            {/* Booking Summary */}
            <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg space-y-2">
              <h4 className="font-medium">Booking Summary</h4>
              <div className="space-y-1 text-sm">
                <div className="flex justify-between">
                  <span>Location:</span>
                  <span>{selectedSpot?.location}</span>
                </div>
                <div className="flex justify-between">
                  <span>Date & Time:</span>
                  <span>
                    {bookingForm.date} at {bookingForm.time}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Duration:</span>
                  <span>{bookingForm.duration} hours</span>
                </div>
                <div className="flex justify-between">
                  <span>Rate:</span>
                  <span>${selectedSpot?.price}/hour</span>
                </div>
                <div className="flex justify-between">
                  <span>Subtotal:</span>
                  <span>${selectedSpot ? selectedSpot.price * bookingForm.duration : 0}</span>
                </div>
                <div className="flex justify-between">
                  <span>Service Fee:</span>
                  <span>$2.00</span>
                </div>
                <div className="border-t pt-2 mt-2">
                  <div className="flex justify-between font-bold">
                    <span>Total:</span>
                    <span>${selectedSpot ? selectedSpot.price * bookingForm.duration + 2 : 0}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Payment Method Selection */}
            <div className="space-y-3">
              <Label>Payment Method</Label>
              <div className="space-y-2">
                {mockPaymentMethods.map((method) => (
                  <div
                    key={method.id}
                    className={`p-3 border rounded-lg cursor-pointer transition-colors ${
                      bookingForm.paymentMethod === method.id
                        ? "border-blue-500 bg-blue-50 dark:bg-blue-900/20"
                        : "border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800"
                    }`}
                    onClick={() => setBookingForm((prev) => ({ ...prev, paymentMethod: method.id }))}
                  >
                    <div className="flex items-center space-x-3">
                      {method.type === "card" && <CreditCard className="w-5 h-5" />}
                      {method.type === "paypal" && <Wallet className="w-5 h-5 text-blue-600" />}
                      <div className="flex-1">
                        <p className="font-medium">
                          {method.type === "card" ? `${method.brand} ****${method.last4}` : "PayPal"}
                        </p>
                        {method.isDefault && (
                          <Badge variant="secondary" className="text-xs">
                            Default
                          </Badge>
                        )}
                      </div>
                      <div className="w-4 h-4 border rounded-full flex items-center justify-center">
                        {bookingForm.paymentMethod === method.id && (
                          <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Security Notice */}
            <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
              <Shield className="w-4 h-4" />
              <span>Your payment information is secure and encrypted</span>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3">
              <Button variant="outline" className="flex-1 bg-transparent" onClick={() => setShowPaymentDialog(false)}>
                Cancel
              </Button>
              <Button
                className="flex-1 bg-blue-600 hover:bg-blue-700"
                onClick={handlePaymentSuccess}
                disabled={!bookingForm.paymentMethod}
              >
                <CreditCard className="w-4 h-4 mr-2" />
                Pay ${selectedSpot ? selectedSpot.price * bookingForm.duration + 2 : 0}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Receipt Dialog */}
      <Dialog open={showReceiptDialog} onOpenChange={setShowReceiptDialog}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Payment Receipt</DialogTitle>
            <DialogDescription>Your booking has been confirmed</DialogDescription>
          </DialogHeader>
          <div className="space-y-6 py-4">
            {/* Success Icon */}
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-8 h-8 text-green-600 dark:text-green-400" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 dark:text-white">Payment Successful!</h3>
              <p className="text-gray-600 dark:text-gray-300">Your parking spot has been reserved</p>
            </div>

            {/* Receipt Details */}
            {selectedBooking && (
              <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg space-y-3">
                <div className="flex justify-between items-center border-b pb-2">
                  <span className="font-medium">Receipt #</span>
                  <span className="font-mono text-sm">#{selectedBooking.id}</span>
                </div>

                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Location:</span>
                    <span>{selectedBooking.location}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Date & Time:</span>
                    <span>
                      {selectedBooking.date} at {selectedBooking.time}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Duration:</span>
                    <span>{selectedBooking.duration}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Payment Method:</span>
                    <span>{selectedBooking.paymentMethod}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Status:</span>
                    <span>{getPaymentStatusBadge(selectedBooking.paymentStatus)}</span>
                  </div>
                  <div className="border-t pt-2 mt-2">
                    <div className="flex justify-between font-bold">
                      <span>Total Paid:</span>
                      <span>${selectedBooking.totalCost}</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex gap-3">
              <Button variant="outline" className="flex-1 bg-transparent">
                <Download className="w-4 h-4 mr-2" />
                Download PDF
              </Button>
              <Button className="flex-1" onClick={() => setShowReceiptDialog(false)}>
                Done
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
                  Continue to Payment
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}

export interface ParkingSpot {
  id: number
  name: string
  address: string
  status: "available" | "occupied" | "reserved"
  price: number
  distance: string
  rating: number
  features: string[]
  totalSpots: number
  occupiedSpots: number
  image: string
  category: "mall" | "office" | "airport" | "event" | "hospital" | "university"
}

export interface Booking {
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

export interface UserProfile {
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

export interface PaymentMethod {
  id: string
  type: "card" | "paypal" | "apple_pay" | "google_pay"
  last4?: string
  brand?: string
  isDefault: boolean
}

export interface BookingForm {
  date: string
  time: string
  duration: number
  paymentMethod: string
}

export type ViewType =
  | "landing"
  | "signin"
  | "home"
  | "search"
  | "reservations"
  | "profile"
  | "payment-methods"
  | "notifications"

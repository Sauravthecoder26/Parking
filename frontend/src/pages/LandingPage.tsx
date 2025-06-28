"use client"

import { Button } from "../components/ui/button"
import { Card, CardContent } from "../components/ui/card"
import { Car, Search, Clock, CreditCard } from "lucide-react"
import type { ViewType } from "../types/index"

interface LandingPageProps {
  onViewChange: (view: ViewType) => void
}

export default function LandingPage({ onViewChange }: LandingPageProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 via-purple-600 to-blue-800">
      {/* Header */}
      <header className="px-4 py-6 text-white">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-lg">
              <Car className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <h1 className="text-2xl font-bold leading-tight">PARK</h1>
              <h1 className="text-2xl font-bold leading-tight -mt-1">EASY</h1>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <Button
              variant="outline"
              className="bg-white/20 border-white/30 text-white hover:bg-white/30 backdrop-blur-sm rounded-2xl"
              onClick={() => onViewChange("signin")}
            >
              Sign In
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <div className="px-4 py-12 text-center text-white">
        <h1 className="text-4xl md:text-6xl font-bold mb-6">
          Find Parking
          <br />
          <span className="text-yellow-300">Anywhere</span>
        </h1>
        <p className="text-xl md:text-2xl mb-8 opacity-90">
          Reserve parking spots instantly with our smart parking solution
        </p>
        <Button
          className="bg-white text-blue-600 hover:bg-gray-100 text-lg px-8 py-4 rounded-2xl shadow-lg"
          onClick={() => onViewChange("signin")}
        >
          Get Started
        </Button>
      </div>

      {/* Features */}
      <div className="px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <Card className="bg-white/10 backdrop-blur-sm border-white/20 text-white rounded-2xl">
            <CardContent className="p-6 text-center">
              <Search className="w-12 h-12 mx-auto mb-4 text-yellow-300" />
              <h3 className="text-xl font-bold mb-2">Easy Search</h3>
              <p className="opacity-90">Find available parking spots near your destination instantly</p>
            </CardContent>
          </Card>
          <Card className="bg-white/10 backdrop-blur-sm border-white/20 text-white rounded-2xl">
            <CardContent className="p-6 text-center">
              <Clock className="w-12 h-12 mx-auto mb-4 text-yellow-300" />
              <h3 className="text-xl font-bold mb-2">Quick Booking</h3>
              <p className="opacity-90">Reserve your spot in seconds with our streamlined booking process</p>
            </CardContent>
          </Card>
          <Card className="bg-white/10 backdrop-blur-sm border-white/20 text-white rounded-2xl">
            <CardContent className="p-6 text-center">
              <CreditCard className="w-12 h-12 mx-auto mb-4 text-yellow-300" />
              <h3 className="text-xl font-bold mb-2">Secure Payment</h3>
              <p className="opacity-90">Pay safely with multiple payment options and get instant confirmation</p>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Footer */}
      <footer className="px-4 py-8 text-center text-white/80">
        <p>&copy; 2024 ParkEasy. All rights reserved.</p>
      </footer>
    </div>
  )
}

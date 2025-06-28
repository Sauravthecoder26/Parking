"use client"

import { Button } from "./ui/button"
import { Card, CardContent } from "./ui/card"
import { Badge } from "./ui/badge"
import { MapPin, Navigation, Star } from "lucide-react"
import type { ParkingSpot } from "../types/index"

interface ParkingSpotCardProps {
  spot: ParkingSpot
  onReserve: (spot: ParkingSpot) => void
}

export default function ParkingSpotCard({ spot, onReserve }: ParkingSpotCardProps) {
  const getStatusBadge = (status: string) => {
    const variants = {
      available: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300",
      occupied: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300",
      reserved: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300",
    }
    return (
      <Badge className={variants[status as keyof typeof variants]}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </Badge>
    )
  }

  return (
    <Card className="shadow-md border-0 hover:shadow-lg transition-shadow rounded-xl">
      <CardContent className="p-3 sm:p-4">
        <div className="flex space-x-3 sm:space-x-4">
          <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-blue-500 to-purple-500 rounded-xl flex items-center justify-center text-lg sm:text-2xl flex-shrink-0">
            {spot.image}
          </div>

          <div className="flex-1 space-y-2 min-w-0">
            <div className="flex items-start justify-between">
              <div className="min-w-0 flex-1">
                <h3 className="font-bold text-sm sm:text-base text-gray-900 dark:text-white truncate">{spot.name}</h3>
                <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 flex items-center">
                  <MapPin className="w-3 h-3 sm:w-4 sm:h-4 mr-1 flex-shrink-0" />
                  <span className="truncate">{spot.address}</span>
                </p>
              </div>
              <div className="ml-2 flex-shrink-0">{getStatusBadge(spot.status)}</div>
            </div>

            <div className="flex items-center justify-between text-xs sm:text-sm">
              <div className="flex items-center space-x-2 sm:space-x-4">
                <span className="flex items-center text-gray-600 dark:text-gray-400">
                  <Navigation className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
                  {spot.distance}
                </span>
                <span className="flex items-center text-yellow-600 dark:text-yellow-400">
                  <Star className="w-3 h-3 sm:w-4 sm:h-4 mr-1 fill-current" />
                  {spot.rating}
                </span>
              </div>
              <span className="text-gray-600 dark:text-gray-400 text-xs">
                {spot.totalSpots - spot.occupiedSpots}/{spot.totalSpots} available
              </span>
            </div>

            <div className="flex flex-wrap gap-1">
              {spot.features.slice(0, 3).map((feature) => (
                <Badge key={feature} variant="secondary" className="text-xs rounded-full">
                  {feature}
                </Badge>
              ))}
            </div>

            <div className="flex items-center justify-between pt-2">
              <div>
                <span className="text-lg sm:text-2xl font-bold text-gray-900 dark:text-white">${spot.price}</span>
                <span className="text-sm text-gray-600 dark:text-gray-300">/hr</span>
              </div>
              <Button
                disabled={spot.status !== "available"}
                onClick={() => onReserve(spot)}
                className="bg-blue-600 hover:bg-blue-700 disabled:opacity-50 rounded-xl text-xs sm:text-sm px-3 sm:px-4 h-8 sm:h-10"
              >
                {spot.status === "available" ? "Reserve" : "Unavailable"}
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

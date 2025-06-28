"use client"

import { Button } from "./ui/button"
import { Card, CardContent } from "./ui/card"
import { Badge } from "./ui/badge"
import { Clock, Car, CreditCard, Receipt } from "lucide-react"
import type { Booking } from "../types/index"

interface BookingCardProps {
  booking: Booking
  onViewReceipt: (booking: Booking) => void
  onCancel?: (booking: Booking) => void
}

export default function BookingCard({ booking, onViewReceipt, onCancel }: BookingCardProps) {
  const getBookingStatusBadge = (status: string) => {
    const variants = {
      active: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300",
      completed: "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300",
      upcoming: "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300",
      cancelled: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300",
    }
    return (
      <Badge className={variants[status as keyof typeof variants]}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </Badge>
    )
  }

  return (
    <Card className="shadow-md border-0 rounded-xl">
      <CardContent className="p-3 sm:p-4">
        <div className="flex justify-between items-start mb-3">
          <h3 className="font-bold text-sm sm:text-base text-gray-900 dark:text-white truncate flex-1 mr-2">
            {booking.location}
          </h3>
          {getBookingStatusBadge(booking.status)}
        </div>

        <div className="space-y-2 text-xs sm:text-sm text-gray-600 dark:text-gray-300">
          <div className="flex items-center">
            <Clock className="w-3 h-3 sm:w-4 sm:h-4 mr-2 flex-shrink-0" />
            <span>
              {booking.date} at {booking.time}
            </span>
          </div>
          <div className="flex items-center">
            <Car className="w-3 h-3 sm:w-4 sm:h-4 mr-2 flex-shrink-0" />
            <span>Duration: {booking.duration}</span>
          </div>
          <div className="flex items-center">
            <CreditCard className="w-3 h-3 sm:w-4 sm:h-4 mr-2 flex-shrink-0" />
            <span className="truncate">{booking.paymentMethod}</span>
          </div>
        </div>

        <div className="flex items-center justify-between mt-4 pt-3 border-t">
          <span className="font-bold text-base sm:text-lg text-gray-900 dark:text-white">${booking.totalCost}</span>
          <div className="flex space-x-2">
            <Button
              variant="outline"
              size="sm"
              className="rounded-xl bg-transparent text-xs sm:text-sm px-2 sm:px-3 h-8 sm:h-9"
              onClick={() => onViewReceipt(booking)}
            >
              <Receipt className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
              Receipt
            </Button>
            {booking.status === "upcoming" && onCancel && (
              <Button
                variant="outline"
                size="sm"
                className="text-red-600 bg-transparent rounded-xl text-xs sm:text-sm px-2 sm:px-3 h-8 sm:h-9"
                onClick={() => onCancel(booking)}
              >
                Cancel
              </Button>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

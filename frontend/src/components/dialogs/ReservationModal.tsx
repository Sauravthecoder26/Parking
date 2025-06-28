"use client"

import type React from "react"

import { Button } from "../ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card"
import { Input } from "../ui/input"
import { Label } from "../ui/label"
import type { ParkingSpot, BookingForm } from "../../types/index"

interface ReservationModalProps {
  spot: ParkingSpot | null
  bookingForm: BookingForm
  onBookingFormChange: (form: BookingForm) => void
  onClose: () => void
  onContinue: () => void
}

export default function ReservationModal({
  spot,
  bookingForm,
  onBookingFormChange,
  onClose,
  onContinue,
}: ReservationModalProps) {
  if (!spot) return null

  const handleDurationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onBookingFormChange({
      ...bookingForm,
      duration: Number.parseInt(e.target.value),
    })
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <Card className="w-full max-w-md max-h-[90vh] overflow-y-auto rounded-xl">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            Reserve Parking Spot
            <Button variant="ghost" size="icon" onClick={onClose} className="rounded-2xl">
              ×
            </Button>
          </CardTitle>
          <CardDescription>
            <div className="space-y-1">
              <div className="font-medium text-gray-900 dark:text-white">{spot.name}</div>
              <div className="text-sm text-gray-600 dark:text-gray-300">{spot.address}</div>
            </div>
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>Date</Label>
              <Input
                type="date"
                value={bookingForm.date}
                onChange={(e) => onBookingFormChange({ ...bookingForm, date: e.target.value })}
                min={new Date().toISOString().split("T")[0]}
                className="rounded-xl"
              />
            </div>
            <div>
              <Label>Time</Label>
              <Input
                type="time"
                value={bookingForm.time}
                onChange={(e) => onBookingFormChange({ ...bookingForm, time: e.target.value })}
                className="rounded-xl"
              />
            </div>
          </div>

          <div>
            <Label>Duration: {bookingForm.duration} hours</Label>
            <input
              type="range"
              min="1"
              max="24"
              value={bookingForm.duration}
              onChange={handleDurationChange}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer mt-2"
            />
            <div className="flex justify-between text-xs text-gray-500 mt-1">
              <span>1 hour</span>
              <span>24 hours</span>
            </div>
          </div>

          <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-xl space-y-2">
            <div className="flex justify-between">
              <span>Rate:</span>
              <span>${spot.price}/hour</span>
            </div>
            <div className="flex justify-between">
              <span>Duration:</span>
              <span>{bookingForm.duration} hours</span>
            </div>
            <div className="flex justify-between">
              <span>Subtotal:</span>
              <span>${spot.price * bookingForm.duration}</span>
            </div>
            <div className="flex justify-between">
              <span>Service Fee:</span>
              <span>$2.00</span>
            </div>
            <div className="border-t pt-2">
              <div className="flex justify-between font-bold">
                <span>Total:</span>
                <span>${spot.price * bookingForm.duration + 2}</span>
              </div>
            </div>
          </div>

          <div className="flex gap-3">
            <Button variant="outline" className="flex-1 bg-transparent rounded-xl" onClick={onClose}>
              Cancel
            </Button>
            <Button
              className="flex-1 bg-blue-600 hover:bg-blue-700 rounded-xl text-white"
              onClick={onContinue}
              disabled={!bookingForm.date || !bookingForm.time}
            >
              Continue to Payment
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

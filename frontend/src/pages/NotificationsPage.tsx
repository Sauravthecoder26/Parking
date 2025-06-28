"use client"

import { Button } from "../components/ui/button"
import { Card, CardContent } from "../components/ui/card"
import { ChevronRight } from "lucide-react"
import type { ViewType } from "../types/index"

interface NotificationsPageProps {
  currentView: ViewType
  onViewChange: (view: ViewType) => void
}

export default function NotificationsPage({ currentView, onViewChange }: NotificationsPageProps) {
  const notifications = [
    {
      id: 1,
      title: "Booking Confirmed",
      message: "Your parking reservation at Downtown Mall has been confirmed.",
      time: "2 hours ago",
      isRead: false,
    },
    {
      id: 2,
      title: "Payment Successful",
      message: "Payment of $26.00 has been processed successfully.",
      time: "3 hours ago",
      isRead: true,
    },
    {
      id: 3,
      title: "Reminder",
      message: "Your parking session will expire in 30 minutes.",
      time: "1 day ago",
      isRead: true,
    },
  ]

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <header className="bg-white dark:bg-gray-800 shadow-sm border-b dark:border-gray-700 sticky top-0 z-40">
        <div className="px-3 sm:px-4 py-3 sm:py-4">
          <div className="flex items-center space-x-2 sm:space-x-3">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => onViewChange("profile")}
              className="rounded-2xl h-8 w-8 sm:h-10 sm:w-10"
            >
              <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 rotate-180" />
            </Button>
            <h1 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white">Notifications</h1>
          </div>
        </div>
      </header>

      <div className="px-3 sm:px-4 py-4 sm:py-6 space-y-3 sm:space-y-4">
        {notifications.map((notification) => (
          <Card key={notification.id} className="rounded-xl">
            <CardContent className="p-3 sm:p-4">
              <div className="flex items-start space-x-3">
                <div
                  className={`w-2 h-2 rounded-full mt-2 ${notification.isRead ? "bg-gray-300" : "bg-blue-600"}`}
                ></div>
                <div className="flex-1">
                  <h3 className="font-medium text-sm sm:text-base text-gray-900 dark:text-white">
                    {notification.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 mt-1">{notification.message}</p>
                  <p className="text-xs text-gray-500 mt-2">{notification.time}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

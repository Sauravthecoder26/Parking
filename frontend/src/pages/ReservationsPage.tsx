import Header from "../components/Header"
import BottomNavigation from "../components/BottomNavigation"
import BookingCard from "../components/BookingCard"
import StatsCard from "../components/StatsCard"
import { mockBookings } from "../data/mockData"
import type { ViewType, Booking } from "../types/index"

interface ReservationsPageProps {
  currentView: ViewType
  onViewChange: (view: ViewType) => void
  onViewReceipt: (booking: Booking) => void
}

export default function ReservationsPage({ currentView, onViewChange, onViewReceipt }: ReservationsPageProps) {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Header
        currentView={currentView}
        searchQuery=""
        onSearchChange={() => {}}
        onSearchSubmit={() => {}}
        onViewChange={onViewChange}
        title="My Reservations"
        showBackButton={true}
        showNotifications={true}
      />

      {/* Content */}
      <div className="px-3 sm:px-4 py-4 sm:py-6 pb-20 sm:pb-24">
        <div className="space-y-4 sm:space-y-6">
          {/* Stats */}
          <div className="grid grid-cols-2 gap-3 sm:gap-4">
            <StatsCard
              value={mockBookings.filter((b) => b.status === "active").length}
              label="Active"
              className="text-blue-600 dark:text-blue-400"
            />
            <StatsCard
              value={mockBookings.filter((b) => b.status === "upcoming").length}
              label="Upcoming"
              className="text-purple-600 dark:text-purple-400"
            />
          </div>

          {/* Bookings */}
          <div className="space-y-3 sm:space-y-4">
            {mockBookings.length > 0 ? (
              mockBookings.map((booking) => (
                <BookingCard key={booking.id} booking={booking} onViewReceipt={onViewReceipt} />
              ))
            ) : (
              <div className="text-center py-8 sm:py-12">
                <p className="text-gray-500 dark:text-gray-400 text-sm sm:text-base">No reservations found</p>
              </div>
            )}
          </div>
        </div>
      </div>

      <BottomNavigation currentView={currentView} onViewChange={onViewChange} />
    </div>
  )
}

import { Button } from "../components/ui/button"
import Header from "../components/Header"
import BottomNavigation from "../components/BottomNavigation"
import ParkingSpotCard from "../components/ParkingSpotCard"
import { mockParkingSpots } from "../data/mockData"
import type { ViewType } from "../types/index"

interface SearchPageProps {
  currentView: ViewType
  searchQuery: string
  onSearchChange: (query: string) => void
  onSearchSubmit: () => void
  onViewChange: (view: ViewType) => void
    onSpotSelect: (spot: ParkingSpot) => void
}

export default function SearchPage({
  currentView,
  searchQuery,
  onSearchChange,
  onSearchSubmit,
  onViewChange,
  onSpotSelect,
}: SearchPageProps) {
  const filteredSpots = mockParkingSpots.filter(
    (spot) =>
      spot.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      spot.address.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Header
        currentView={currentView}
        searchQuery={searchQuery}
        onSearchChange={onSearchChange}
        onSearchSubmit={onSearchSubmit}
        onViewChange={onViewChange}
        title="Find Parking"
        showBackButton={true}
        showSearch={true}
        showNotifications={true}
      />

      {/* Filters */}
      <div className="px-3 sm:px-4 py-3 sm:py-4 bg-white dark:bg-gray-800 border-b dark:border-gray-700">
        <div className="flex space-x-2 overflow-x-auto pb-2">
          {["All", "Available Now", "Under $10", "Covered", "EV Charging", "24/7"].map((filter) => (
            <Button
              key={filter}
              variant="outline"
              size="sm"
              className="whitespace-nowrap bg-transparent rounded-full text-xs sm:text-sm px-3 sm:px-4 h-8 sm:h-9"
            >
              {filter}
            </Button>
          ))}
        </div>
      </div>

      {/* Parking Spots */}
      <div className="px-3 sm:px-4 py-4 sm:py-6 space-y-3 sm:space-y-4 pb-20 sm:pb-24">
        {filteredSpots.length > 0 ? (
          filteredSpots.map((spot) => <ParkingSpotCard key={spot.id} spot={spot} onReserve={onSpotSelect} />)
        ) : (
          <div className="text-center py-8 sm:py-12">
            <p className="text-gray-500 dark:text-gray-400 text-sm sm:text-base">
              No parking spots found for "{searchQuery}"
            </p>
          </div>
        )}
      </div>

      <BottomNavigation currentView={currentView} onViewChange={onViewChange} />
    </div>
  )
}

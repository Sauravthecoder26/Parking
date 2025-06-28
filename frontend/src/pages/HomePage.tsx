import { Card, CardContent } from "../components/ui/card"
import { Building2, Music, Video, Plane, Navigation } from "lucide-react"
import Header from "../components/Header"
import BottomNavigation from "../components/BottomNavigation"
import StatsCard from "../components/StatsCard"
import { ChevronRight } from "lucide-react"
import { mockParkingSpots } from "../data/mockData"
import type { ViewType } from "../types/index"

interface HomePageProps {
  currentView: ViewType
  searchQuery: string
  onSearchChange: (query: string) => void
  onSearchSubmit: () => void
  onViewChange: (view: ViewType) => void
  onLogoClick: () => void
}

export default function HomePage({
  currentView,
  searchQuery,
  onSearchChange,
  onSearchSubmit,
  onViewChange,
  onLogoClick,
}: HomePageProps) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-600 to-blue-800">
      <Header
        currentView={currentView}
        searchQuery={searchQuery}
        onSearchChange={onSearchChange}
        onSearchSubmit={onSearchSubmit}
        onViewChange={onViewChange}
        onLogoClick={onLogoClick}
        showNotifications={true}
        showWallet={true}
      />

      {/* Main Content */}
      <div className="bg-gray-50 dark:bg-gray-900 min-h-screen rounded-t-3xl px-3 sm:px-4 py-4 sm:py-6 space-y-6 sm:space-y-8">
        {/* You Might Like Section */}
        <div className="px-1">
          <h2 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white mb-3 sm:mb-4">You Might Like</h2>
          <Card className="shadow-lg border-0 overflow-hidden hover:shadow-xl transition-all duration-300 rounded-2xl">
            <CardContent className="p-3 sm:p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3 sm:space-x-4 flex-1 min-w-0">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center flex-shrink-0">
                    <Building2 className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-sm sm:text-base text-gray-900 dark:text-white truncate">
                      Parking for Work
                    </h3>
                    <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
                      Compare rates and book a spot near your office ahead of time.
                    </p>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400 flex-shrink-0 ml-2" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Find Event Parking */}
        <div>
          <h2 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white mb-3 sm:mb-4">
            Find Event Parking
          </h2>
          <div className="grid grid-cols-2 gap-3 sm:gap-4">
            <Card className="shadow-md border-0 overflow-hidden hover:shadow-lg transition-shadow rounded-2xl">
              <div className="relative h-24 sm:h-32 bg-gradient-to-br from-purple-600 to-pink-600 flex items-center justify-center">
                <div className="absolute inset-0 bg-black/20"></div>
                <div className="relative text-center text-white">
                  <Music className="w-6 h-6 sm:w-8 sm:h-8 mx-auto mb-1 sm:mb-2" />
                  <p className="text-xs font-medium">Live Music</p>
                </div>
              </div>
              <CardContent className="p-2 sm:p-3">
                <h3 className="font-semibold text-xs sm:text-sm text-gray-900 dark:text-white">Concert Arena</h3>
                <p className="text-xs text-gray-600 dark:text-gray-400">Downtown District</p>
              </CardContent>
            </Card>

            <Card className="shadow-md border-0 overflow-hidden hover:shadow-lg transition-shadow rounded-2xl">
              <div className="relative h-24 sm:h-32 bg-gradient-to-br from-red-600 to-orange-600 flex items-center justify-center">
                <div className="absolute inset-0 bg-black/20"></div>
                <div className="relative text-center text-white">
                  <Video className="w-6 h-6 sm:w-8 sm:h-8 mx-auto mb-1 sm:mb-2" />
                  <p className="text-xs font-medium">Theatre</p>
                </div>
              </div>
              <CardContent className="p-2 sm:p-3">
                <h3 className="font-semibold text-xs sm:text-sm text-gray-900 dark:text-white">Grand Theatre</h3>
                <p className="text-xs text-gray-600 dark:text-gray-400">Arts District</p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Find Airport Parking */}
        <div>
          <h2 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white mb-3 sm:mb-4">
            Find Airport Parking
          </h2>
          <div className="grid grid-cols-2 gap-3 sm:gap-4">
            <Card className="shadow-md border-0 overflow-hidden hover:shadow-lg transition-shadow rounded-2xl">
              <div className="relative h-24 sm:h-32 bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center">
                <div className="absolute inset-0 bg-black/10"></div>
                <div className="relative text-center text-white">
                  <Plane className="w-6 h-6 sm:w-8 sm:h-8 mx-auto mb-1 sm:mb-2" />
                  <p className="text-xs font-medium">International</p>
                </div>
              </div>
              <CardContent className="p-2 sm:p-3">
                <h3 className="font-semibold text-xs sm:text-sm text-gray-900 dark:text-white">Main Airport</h3>
                <p className="text-xs text-gray-600 dark:text-gray-400">Terminal 1-3</p>
              </CardContent>
            </Card>

            <Card className="shadow-md border-0 overflow-hidden hover:shadow-lg transition-shadow rounded-2xl">
              <div className="relative h-24 sm:h-32 bg-gradient-to-br from-green-500 to-teal-500 flex items-center justify-center">
                <div className="absolute inset-0 bg-black/10"></div>
                <div className="relative text-center text-white">
                  <Navigation className="w-6 h-6 sm:w-8 sm:h-8 mx-auto mb-1 sm:mb-2" />
                  <p className="text-xs font-medium">Regional</p>
                </div>
              </div>
              <CardContent className="p-2 sm:p-3">
                <h3 className="font-semibold text-xs sm:text-sm text-gray-900 dark:text-white">City Airport</h3>
                <p className="text-xs text-gray-600 dark:text-gray-400">Domestic Flights</p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-3 gap-3 sm:gap-4">
          <StatsCard
            value={mockParkingSpots.filter((spot) => spot.status === "available").length}
            label="Available Now"
            className="text-blue-600 dark:text-blue-400"
          />
          <StatsCard value="$5-20" label="Price Range" className="text-green-600 dark:text-green-400" />
          <StatsCard value="24/7" label="Available" className="text-purple-600 dark:text-purple-400" />
        </div>

        {/* Bottom spacing for navigation */}
        <div className="h-16 sm:h-20"></div>
      </div>

      <BottomNavigation currentView={currentView} onViewChange={onViewChange} />
    </div>
  )
}

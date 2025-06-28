"use client"

import { Button } from "../components/ui/button"
import { Card, CardContent } from "../components/ui/card"
import { Avatar, AvatarFallback } from "../components/ui/avatar"
import { Bell, ChevronRight, Wallet, Settings, User, LogOut, Moon, Sun } from "lucide-react"
import BottomNavigation from "../components/BottomNavigation"
import StatsCard from "../components/StatsCard"
import type { ViewType, UserProfile } from "../types/index"

interface ProfilePageProps {
  currentView: ViewType
  userProfile: UserProfile
  isDarkMode: boolean
  onViewChange: (view: ViewType) => void
  onToggleDarkMode: () => void
  onShowProfileDialog: () => void
  onShowSettingsDialog: () => void
  onSignOut: () => void
}

export default function ProfilePage({
  currentView,
  userProfile,
  isDarkMode,
  onViewChange,
  onToggleDarkMode,
  onShowProfileDialog,
  onShowSettingsDialog,
  onSignOut,
}: ProfilePageProps) {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <header className="bg-white dark:bg-gray-800 shadow-sm border-b dark:border-gray-700 sticky top-0 z-40">
        <div className="px-3 py-3 sm:px-4 sm:py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2 sm:space-x-3">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => onViewChange("home")}
                className="h-8 w-8 sm:h-10 sm:w-10 rounded-2xl"
              >
                <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 rotate-180" />
              </Button>
              <h1 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white">Profile</h1>
            </div>
            <div className="flex items-center space-x-2">
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 sm:h-10 sm:w-10 rounded-2xl"
                onClick={onToggleDarkMode}
              >
                {isDarkMode ? <Sun className="w-4 h-4 sm:w-5 sm:h-5" /> : <Moon className="w-4 h-4 sm:w-5 sm:h-5" />}
              </Button>
              <Button variant="ghost" size="icon" className="relative h-8 w-8 sm:h-10 sm:w-10 rounded-2xl">
                <Bell className="w-4 h-4 sm:w-5 sm:h-5" />
                <span className="absolute -top-1 -right-1 w-2 h-2 sm:w-3 sm:h-3 bg-red-500 rounded-full"></span>
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="px-3 py-4 sm:px-4 sm:py-6 space-y-4 sm:space-y-6 pb-20 sm:pb-24">
        {/* Profile Card */}
        <Card className="rounded-2xl shadow-lg border-0 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20">
          <CardContent className="p-4 sm:p-6">
            <div className="flex items-center space-x-3 sm:space-x-4">
              <Avatar className="h-12 w-12 sm:h-16 sm:w-16 ring-4 ring-white shadow-lg">
                <AvatarFallback className="bg-gradient-to-r from-blue-600 to-purple-600 text-white text-sm sm:text-xl font-bold">
                  {userProfile.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <h3 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white truncate">
                  {userProfile.name}
                </h3>
                <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 truncate">{userProfile.email}</p>
                <p className="text-xs sm:text-sm text-gray-500">Member since {userProfile.joinDate}</p>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={onShowProfileDialog}
                className="rounded-xl bg-white/80 backdrop-blur-sm border-white/50 hover:bg-white/90 text-xs sm:text-sm px-2 sm:px-3"
              >
                Edit
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-3 sm:gap-4">
          <StatsCard
            value={userProfile.totalBookings}
            label="Total Bookings"
            className="bg-gradient-to-br from-blue-500 to-blue-600 text-white"
          />
          <StatsCard
            value={`$${userProfile.totalSavings}`}
            label="Total Savings"
            className="bg-gradient-to-br from-green-500 to-green-600 text-white"
          />
        </div>

        {/* Account Section */}
        <div className="space-y-3 sm:space-y-4">
          <h2 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white px-1">Account</h2>
          <div className="space-y-2">
            <Button
              variant="ghost"
              className="w-full justify-start h-12 sm:h-14 rounded-2xl bg-white dark:bg-gray-800 shadow-sm border border-gray-100 dark:border-gray-700 hover:shadow-md transition-all"
              onClick={() => onViewChange("payment-methods")}
            >
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-blue-100 dark:bg-blue-900 rounded-xl flex items-center justify-center mr-3">
                <Wallet className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600 dark:text-blue-400" />
              </div>
              <span className="text-sm sm:text-base font-medium">Payment Methods</span>
              <ChevronRight className="w-4 h-4 ml-auto text-gray-400" />
            </Button>
            <Button
              variant="ghost"
              className="w-full justify-start h-12 sm:h-14 rounded-2xl bg-white dark:bg-gray-800 shadow-sm border border-gray-100 dark:border-gray-700 hover:shadow-md transition-all"
              onClick={() => onViewChange("notifications")}
            >
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-purple-100 dark:bg-purple-900 rounded-xl flex items-center justify-center mr-3">
                <Bell className="w-4 h-4 sm:w-5 sm:h-5 text-purple-600 dark:text-purple-400" />
              </div>
              <span className="text-sm sm:text-base font-medium">Notifications</span>
              <ChevronRight className="w-4 h-4 ml-auto text-gray-400" />
            </Button>
          </div>
        </div>

        {/* Settings Section */}
        <div className="space-y-3 sm:space-y-4">
          <h2 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white px-1">Settings</h2>
          <div className="space-y-2">
            <Button
              variant="ghost"
              className="w-full justify-start h-12 sm:h-14 rounded-2xl bg-white dark:bg-gray-800 shadow-sm border border-gray-100 dark:border-gray-700 hover:shadow-md transition-all"
              onClick={onShowSettingsDialog}
            >
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-green-100 dark:bg-green-900 rounded-xl flex items-center justify-center mr-3">
                <Settings className="w-4 h-4 sm:w-5 sm:h-5 text-green-600 dark:text-green-400" />
              </div>
              <span className="text-sm sm:text-base font-medium">App Settings</span>
              <ChevronRight className="w-4 h-4 ml-auto text-gray-400" />
            </Button>
            <Button
              variant="ghost"
              className="w-full justify-start h-12 sm:h-14 rounded-2xl bg-white dark:bg-gray-800 shadow-sm border border-gray-100 dark:border-gray-700 hover:shadow-md transition-all"
            >
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-orange-100 dark:bg-orange-900 rounded-xl flex items-center justify-center mr-3">
                <User className="w-4 h-4 sm:w-5 sm:h-5 text-orange-600 dark:text-orange-400" />
              </div>
              <span className="text-sm sm:text-base font-medium">Privacy & Security</span>
              <ChevronRight className="w-4 h-4 ml-auto text-gray-400" />
            </Button>
          </div>
        </div>

        {/* Support Section */}
        <div className="space-y-3 sm:space-y-4">
          <h2 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white px-1">Support</h2>
          <div className="space-y-2">
            <Button
              variant="ghost"
              className="w-full justify-start h-12 sm:h-14 rounded-2xl bg-white dark:bg-gray-800 shadow-sm border border-gray-100 dark:border-gray-700 hover:shadow-md transition-all"
            >
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-cyan-100 dark:bg-cyan-900 rounded-xl flex items-center justify-center mr-3">
                <Settings className="w-4 h-4 sm:w-5 sm:h-5 text-cyan-600 dark:text-cyan-400" />
              </div>
              <span className="text-sm sm:text-base font-medium">Help Center</span>
              <ChevronRight className="w-4 h-4 ml-auto text-gray-400" />
            </Button>
            <Button
              variant="ghost"
              className="w-full justify-start h-12 sm:h-14 rounded-2xl bg-white dark:bg-gray-800 shadow-sm border border-gray-100 dark:border-gray-700 hover:shadow-md transition-all"
            >
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-indigo-100 dark:bg-indigo-900 rounded-xl flex items-center justify-center mr-3">
                <Settings className="w-4 h-4 sm:w-5 sm:h-5 text-indigo-600 dark:text-indigo-400" />
              </div>
              <span className="text-sm sm:text-base font-medium">Contact Support</span>
              <ChevronRight className="w-4 h-4 ml-auto text-gray-400" />
            </Button>
            <Button
              variant="ghost"
              className="w-full justify-start h-12 sm:h-14 rounded-2xl bg-white dark:bg-gray-800 shadow-sm border border-gray-100 dark:border-gray-700 hover:shadow-md transition-all"
            >
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-pink-100 dark:bg-pink-900 rounded-xl flex items-center justify-center mr-3">
                <Settings className="w-4 h-4 sm:w-5 sm:h-5 text-pink-600 dark:text-pink-400" />
              </div>
              <span className="text-sm sm:text-base font-medium">Terms & Conditions</span>
              <ChevronRight className="w-4 h-4 ml-auto text-gray-400" />
            </Button>
          </div>
        </div>

        {/* Sign Out */}
        <div className="pt-2">
          <Button
            variant="ghost"
            className="w-full justify-start h-12 sm:h-14 rounded-2xl bg-red-50 dark:bg-red-900/20 border border-red-100 dark:border-red-800 text-red-600 dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-900/30 transition-all"
            onClick={onSignOut}
          >
            <div className="w-8 h-8 sm:w-10 sm:h-10 bg-red-100 dark:bg-red-900 rounded-xl flex items-center justify-center mr-3">
              <LogOut className="w-4 h-4 sm:w-5 sm:h-5 text-red-600 dark:text-red-400" />
            </div>
            <span className="text-sm sm:text-base font-medium">Sign Out</span>
          </Button>
        </div>
      </div>

      <BottomNavigation currentView={currentView} onViewChange={onViewChange} />
    </div>
  )
}

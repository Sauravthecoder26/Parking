"use client"

import type React from "react"

import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { Car, Bell, Wallet, Search, ChevronRight } from "lucide-react"
import type { ViewType } from "../types/index"

interface HeaderProps {
  currentView: ViewType
  searchQuery: string
  onSearchChange: (query: string) => void
  onSearchSubmit: () => void
  onViewChange: (view: ViewType) => void
  onLogoClick?: () => void
  title?: string
  showBackButton?: boolean
  showSearch?: boolean
  showNotifications?: boolean
  showWallet?: boolean
}

export default function Header({
  currentView,
  searchQuery,
  onSearchChange,
  onSearchSubmit,
  onViewChange,
  onLogoClick,
  title,
  showBackButton = false,
  showSearch = false,
  showNotifications = true,
  showWallet = false,
}: HeaderProps) {
  const handleSearchKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      onSearchSubmit()
    }
  }

  // Home page header with gradient background
  if (currentView === "home") {
    return (
      <header className="px-3 sm:px-4 py-4 sm:py-6 text-white">
        <div className="flex items-center justify-between mb-6 sm:mb-8">
          <div
            className="flex items-center space-x-2 cursor-pointer hover:opacity-80 transition-opacity"
            onClick={onLogoClick}
          >
            <div className="w-8 h-8 sm:w-10 sm:h-10 bg-white rounded-lg sm:rounded-xl flex items-center justify-center shadow-lg">
              <Car className="w-4 h-4 sm:w-6 sm:h-6 text-blue-600" />
            </div>
            <div>
              <h1 className="text-lg sm:text-xl font-bold leading-tight">PARK</h1>
              <h1 className="text-lg sm:text-xl font-bold leading-tight -mt-1">EASY</h1>
            </div>
          </div>
          <div className="flex items-center space-x-2 sm:space-x-3">
            {showNotifications && (
              <Button
                variant="ghost"
                size="icon"
                className="relative text-white hover:bg-white/20 rounded-2xl h-8 w-8 sm:h-10 sm:w-10"
                onClick={() => onViewChange("notifications")}
              >
                <Bell className="w-4 h-4 sm:w-5 sm:h-5" />
                <span className="absolute -top-1 -right-1 w-2 h-2 sm:w-3 sm:h-3 bg-red-500 rounded-full"></span>
              </Button>
            )}
            {showWallet && (
              <Button
                variant="outline"
                className="bg-white/20 border-white/30 text-white hover:bg-white/30 backdrop-blur-sm rounded-2xl text-xs sm:text-sm px-2 sm:px-3 h-8 sm:h-10"
                onClick={() => onViewChange("payment-methods")}
              >
                <Wallet className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                <span className="hidden sm:inline">Wallet</span>
              </Button>
            )}
          </div>
        </div>

        {/* Search Bar */}
        <div className="relative">
          <Search className="absolute left-3 sm:left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 sm:w-5 sm:h-5" />
          <Input
            placeholder="Address, Venue, or Airport"
            className="pl-10 sm:pl-12 h-12 sm:h-14 text-base sm:text-lg bg-white/95 backdrop-blur-sm border-0 shadow-lg text-gray-900 placeholder:text-gray-500 rounded-2xl"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            onKeyPress={handleSearchKeyPress}
          />
          <Button
            className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl h-8 sm:h-10 px-3 sm:px-4 text-xs sm:text-sm"
            onClick={onSearchSubmit}
          >
            Search
          </Button>
        </div>
      </header>
    )
  }

  // Standard header for other pages
  return (
    <header className="bg-white dark:bg-gray-800 shadow-sm border-b dark:border-gray-700 sticky top-0 z-40">
      <div className="px-3 sm:px-4 py-3 sm:py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2 sm:space-x-3">
            {showBackButton && (
              <Button
                variant="ghost"
                size="icon"
                onClick={() => onViewChange("home")}
                className="rounded-2xl h-8 w-8 sm:h-10 sm:w-10"
              >
                <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 rotate-180" />
              </Button>
            )}
            {title && <h1 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white">{title}</h1>}
          </div>

          <div className="flex items-center space-x-2 sm:space-x-3">
            {showNotifications && (
              <Button variant="ghost" size="icon" className="relative rounded-2xl h-8 w-8 sm:h-10 sm:w-10">
                <Bell className="w-4 h-4 sm:w-5 sm:h-5" />
                <span className="absolute -top-1 -right-1 w-2 h-2 sm:w-3 sm:h-3 bg-red-500 rounded-full"></span>
              </Button>
            )}
          </div>
        </div>

        {/* Search bar for search page */}
        {showSearch && (
          <div className="relative mt-3 sm:mt-4">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 sm:w-5 sm:h-5" />
            <Input
              placeholder="Search by location or address..."
              className="pl-10 sm:pl-12 h-10 sm:h-12 text-base sm:text-lg rounded-xl"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              onKeyPress={handleSearchKeyPress}
            />
          </div>
        )}
      </div>
    </header>
  )
}

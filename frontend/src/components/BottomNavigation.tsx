"use client"

import { Button } from "./ui/button"
import { Home, BookOpen, Search, User } from "lucide-react"
import type { ViewType } from "../types/index"

interface BottomNavigationProps {
  currentView: ViewType
  onViewChange: (view: ViewType) => void
}

export default function BottomNavigation({ currentView, onViewChange }: BottomNavigationProps) {
  const navItems = [
    {
      id: "home" as ViewType,
      icon: Home,
      label: "Home",
      isActive: currentView === "home",
    },
    {
      id: "reservations" as ViewType,
      icon: BookOpen,
      label: "Reservations",
      isActive: currentView === "reservations",
    },
    {
      id: "search" as ViewType,
      icon: Search,
      label: "Search",
      isActive: currentView === "search",
      isCenter: true,
    },
    {
      id: "profile" as ViewType,
      icon: User,
      label: "Profile",
      isActive: currentView === "profile",
    },
  ]

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white/95 dark:bg-gray-800/95 backdrop-blur-lg border-t border-gray-200/50 dark:border-gray-700/50 px-2 py-2 safe-area-pb shadow-lg">
      <div className="flex justify-around items-center max-w-md mx-auto">
        {navItems.map((item) => {
          const Icon = item.icon

          if (item.isCenter) {
            return (
              <Button
                key={item.id}
                variant="ghost"
                className="flex-col space-y-1 h-auto py-2 px-3 rounded-2xl hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-all duration-200 group"
                onClick={() => onViewChange(item.id)}
              >
                <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center -mt-4 shadow-lg group-hover:shadow-xl transition-all duration-200 group-hover:scale-105">
                  <Icon className="w-5 h-5 text-white" />
                </div>
                <span className={`text-xs font-medium mt-1 ${item.isActive ? "text-blue-600" : "text-blue-600"}`}>
                  {item.label}
                </span>
              </Button>
            )
          }

          return (
            <Button
              key={item.id}
              variant="ghost"
              className={`flex-col space-y-1 h-auto py-2 px-3 rounded-2xl transition-all duration-200 group ${
                item.isActive
                  ? "hover:bg-blue-50 dark:hover:bg-blue-900/20"
                  : "hover:bg-gray-100 dark:hover:bg-gray-700"
              }`}
              onClick={() => onViewChange(item.id)}
            >
              <div
                className={`w-8 h-8 rounded-2xl flex items-center justify-center transition-all duration-200 ${
                  item.isActive
                    ? "bg-blue-600 shadow-md group-hover:shadow-lg"
                    : "bg-gray-100 dark:bg-gray-700 group-hover:bg-gray-200 dark:group-hover:bg-gray-600"
                }`}
              >
                <Icon className={`w-4 h-4 ${item.isActive ? "text-white" : "text-gray-600 dark:text-gray-300"}`} />
              </div>
              <span
                className={`text-xs ${
                  item.isActive ? "font-medium text-blue-600" : "text-gray-600 dark:text-gray-300"
                }`}
              >
                {item.label}
              </span>
            </Button>
          )
        })}
      </div>
    </div>
  )
}

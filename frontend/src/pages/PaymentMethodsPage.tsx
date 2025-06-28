"use client"

import { Button } from "../components/ui/button"
import { Card, CardContent } from "../components/ui/card"
import { CreditCard, Wallet, Plus, MoreHorizontal, ChevronRight } from "lucide-react"
import { Badge } from "../components/ui/badge"
import { mockPaymentMethods } from "../data/mockData"
import type { ViewType } from "../types/index"

interface PaymentMethodsPageProps {
  currentView: ViewType
  onViewChange: (view: ViewType) => void
}

export default function PaymentMethodsPage({ currentView, onViewChange }: PaymentMethodsPageProps) {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <header className="bg-white dark:bg-gray-800 shadow-sm border-b dark:border-gray-700 sticky top-0 z-40">
        <div className="px-3 sm:px-4 py-3 sm:py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2 sm:space-x-3">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => onViewChange("profile")}
                className="rounded-2xl h-8 w-8 sm:h-10 sm:w-10"
              >
                <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 rotate-180" />
              </Button>
              <h1 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white">Payment Methods</h1>
            </div>
            <Button className="rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs sm:text-sm px-3 sm:px-4 h-8 sm:h-10">
              <Plus className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
              Add
            </Button>
          </div>
        </div>
      </header>

      <div className="px-3 sm:px-4 py-4 sm:py-6 space-y-3 sm:space-y-4">
        {mockPaymentMethods.map((method) => (
          <Card
            key={method.id}
            className={`shadow-md border-0 rounded-xl ${method.isDefault ? "ring-2 ring-blue-500" : ""}`}
          >
            <CardContent className="p-3 sm:p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  {method.type === "card" && <CreditCard className="w-6 h-6 sm:w-8 sm:h-8 text-gray-600" />}
                  {method.type === "paypal" && <Wallet className="w-6 h-6 sm:w-8 sm:h-8 text-blue-600" />}
                  <div>
                    <p className="font-medium text-sm sm:text-base text-gray-900 dark:text-white">
                      {method.type === "card" ? `${method.brand} ****${method.last4}` : "PayPal"}
                    </p>
                    {method.isDefault && (
                      <Badge variant="secondary" className="text-xs mt-1">
                        Default
                      </Badge>
                    )}
                  </div>
                </div>
                <Button variant="ghost" size="icon" className="rounded-2xl h-8 w-8 sm:h-10 sm:w-10">
                  <MoreHorizontal className="w-4 h-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

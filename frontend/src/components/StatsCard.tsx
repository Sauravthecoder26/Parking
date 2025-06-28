import type React from "react"
import { Card, CardContent } from "./ui/card"

interface StatsCardProps {
  value: string | number
  label: string
  className?: string
  icon?: React.ReactNode
}

export default function StatsCard({ value, label, className = "", icon }: StatsCardProps) {
  return (
    <Card className={`shadow-md border-0 rounded-2xl ${className}`}>
      <CardContent className="p-3 sm:p-4 text-center">
        {icon && <div className="flex justify-center mb-2">{icon}</div>}
        <div className="text-xl sm:text-2xl font-bold">{value}</div>
        <div className="text-xs sm:text-sm opacity-90">{label}</div>
      </CardContent>
    </Card>
  )
}

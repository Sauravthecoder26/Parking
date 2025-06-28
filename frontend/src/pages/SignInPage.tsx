"use client"

import { useState } from "react"
import { Button } from "../components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card"
import { Input } from "../components/ui/input"
import { Label } from "../components/ui/label"
import { Car, ArrowLeft, Eye, EyeOff } from "lucide-react"
import type { ViewType } from "../types/index"

interface SignInPageProps {
  onViewChange: (view: ViewType) => void
  onSignIn: () => void
}

export default function SignInPage({ onViewChange, onSignIn }: SignInPageProps) {
  const [showPassword, setShowPassword] = useState(false)

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 via-blue-700 to-purple-800 flex items-center justify-center p-4">
      <Card className="w-full max-w-sm shadow-2xl border-0 bg-white/95 backdrop-blur-sm">
        <CardHeader className="text-center pb-8 pt-8">
          <Button
            variant="ghost"
            className="absolute top-4 left-4 text-gray-600 hover:text-gray-800"
            onClick={() => onViewChange("landing")}
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div
            className="mx-auto mb-6 w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg cursor-pointer"
            onClick={() => onViewChange("landing")}
          >
            <Car className="w-8 h-8 text-white" />
          </div>
          <CardTitle
            className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent cursor-pointer"
            onClick={() => onViewChange("landing")}
          >
            PARK EASY
          </CardTitle>
          <CardDescription className="text-lg text-gray-600 dark:text-gray-300 mt-2">
            Find and reserve parking spots instantly
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6 px-8 pb-8">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-sm font-medium text-gray-700">
                Email
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                className="h-12 text-base border-gray-300 focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password" className="text-sm font-medium text-gray-700">
                Password
              </Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  className="h-12 text-base border-gray-300 focus:border-blue-500 focus:ring-blue-500 pr-12"
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8 text-gray-400 hover:text-gray-600"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </Button>
              </div>
            </div>
          </div>

          <Button
            className="w-full h-12 text-base font-medium bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-lg rounded-2xl"
            onClick={onSignIn}
          >
            Sign In
          </Button>

          <div className="text-center space-y-3">
            <Button variant="link" className="text-blue-600 hover:text-blue-700 text-sm">
              Forgot password?
            </Button>
            <div className="text-sm text-gray-500">
              Don't have an account?{" "}
              <Button variant="link" className="text-blue-600 hover:text-blue-700 p-0 h-auto font-medium">
                Sign up
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

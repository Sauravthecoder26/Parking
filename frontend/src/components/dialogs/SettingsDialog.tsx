"use client"

import { Button } from "../ui/button"
import { Label } from "../ui/label"
import { Switch } from "../ui/switch"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "../ui/dialog"
import { Moon, Sun } from "lucide-react"
import type { UserProfile } from "../../types/index"

interface SettingsDialogProps {
  isOpen: boolean
  onClose: () => void
  isDarkMode: boolean
  onToggleDarkMode: () => void
  userProfile: UserProfile
  onUpdateProfile: (profile: UserProfile) => void
}

export default function SettingsDialog({
  isOpen,
  onClose,
  isDarkMode,
  onToggleDarkMode,
  userProfile,
  onUpdateProfile,
}: SettingsDialogProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px] rounded-xl">
        <DialogHeader>
          <DialogTitle>App Settings</DialogTitle>
          <DialogDescription>Manage your app preferences</DialogDescription>
        </DialogHeader>
        <div className="space-y-6 py-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label className="flex items-center space-x-2">
                {isDarkMode ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
                <span>Dark Mode</span>
              </Label>
              <p className="text-xs text-gray-500">Switch between light and dark themes</p>
            </div>
            <Switch checked={isDarkMode} onCheckedChange={onToggleDarkMode} />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Push Notifications</Label>
              <p className="text-xs text-gray-500">Get notified about booking updates</p>
            </div>
            <Switch
              checked={userProfile.notifications.push}
              onCheckedChange={(checked) =>
                onUpdateProfile({
                  ...userProfile,
                  notifications: { ...userProfile.notifications, push: checked },
                })
              }
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Email Notifications</Label>
              <p className="text-xs text-gray-500">Receive booking confirmations via email</p>
            </div>
            <Switch
              checked={userProfile.notifications.email}
              onCheckedChange={(checked) =>
                onUpdateProfile({
                  ...userProfile,
                  notifications: { ...userProfile.notifications, email: checked },
                })
              }
            />
          </div>

          <div className="flex justify-end">
            <Button onClick={onClose} className="rounded-xl bg-blue-600 hover:bg-blue-700 text-white">
              Close
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

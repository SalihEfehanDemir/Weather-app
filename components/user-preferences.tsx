"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { Settings, User, Bell, Thermometer } from "lucide-react"

export function UserPreferences() {
  const [preferences, setPreferences] = useState({
    temperatureUnit: "fahrenheit",
    theme: "system",
    notifications: {
      email: true,
      push: true,
      severe: true,
      daily: false,
    },
    dashboard: {
      autoRefresh: true,
      refreshInterval: "5",
    },
  })

  const handlePreferenceChange = (key: string, value: any) => {
    setPreferences((prev) => ({
      ...prev,
      [key]: value,
    }))
  }

  const handleNotificationChange = (key: string, value: boolean) => {
    setPreferences((prev) => ({
      ...prev,
      notifications: {
        ...prev.notifications,
        [key]: value,
      },
    }))
  }

  const handleDashboardChange = (key: string, value: any) => {
    setPreferences((prev) => ({
      ...prev,
      dashboard: {
        ...prev.dashboard,
        [key]: value,
      },
    }))
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <User className="h-5 w-5" />
            Profile Settings
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="displayName">Display Name</Label>
              <input
                id="displayName"
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                defaultValue="John Doe"
              />
            </div>
            <div>
              <Label htmlFor="email">Email</Label>
              <input
                id="email"
                type="email"
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                defaultValue="john.doe@example.com"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Thermometer className="h-5 w-5" />
            Display Preferences
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <Label>Temperature Unit</Label>
              <p className="text-sm text-muted-foreground">Choose your preferred temperature scale</p>
            </div>
            <Select
              value={preferences.temperatureUnit}
              onValueChange={(value) => handlePreferenceChange("temperatureUnit", value)}
            >
              <SelectTrigger className="w-32">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="fahrenheit">°F</SelectItem>
                <SelectItem value="celsius">°C</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Separator />

          <div className="flex items-center justify-between">
            <div>
              <Label>Theme</Label>
              <p className="text-sm text-muted-foreground">Choose your preferred theme</p>
            </div>
            <Select value={preferences.theme} onValueChange={(value) => handlePreferenceChange("theme", value)}>
              <SelectTrigger className="w-32">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="light">Light</SelectItem>
                <SelectItem value="dark">Dark</SelectItem>
                <SelectItem value="system">System</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bell className="h-5 w-5" />
            Notification Settings
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <Label>Email Notifications</Label>
              <p className="text-sm text-muted-foreground">Receive weather alerts via email</p>
            </div>
            <Switch
              checked={preferences.notifications.email}
              onCheckedChange={(checked) => handleNotificationChange("email", checked)}
            />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <Label>Push Notifications</Label>
              <p className="text-sm text-muted-foreground">Receive push notifications</p>
            </div>
            <Switch
              checked={preferences.notifications.push}
              onCheckedChange={(checked) => handleNotificationChange("push", checked)}
            />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <Label>Severe Weather Alerts</Label>
              <p className="text-sm text-muted-foreground">Get notified of severe weather conditions</p>
            </div>
            <Switch
              checked={preferences.notifications.severe}
              onCheckedChange={(checked) => handleNotificationChange("severe", checked)}
            />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <Label>Daily Weather Summary</Label>
              <p className="text-sm text-muted-foreground">Receive daily weather briefings</p>
            </div>
            <Switch
              checked={preferences.notifications.daily}
              onCheckedChange={(checked) => handleNotificationChange("daily", checked)}
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Settings className="h-5 w-5" />
            Dashboard Settings
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <Label>Auto Refresh</Label>
              <p className="text-sm text-muted-foreground">Automatically refresh weather data</p>
            </div>
            <Switch
              checked={preferences.dashboard.autoRefresh}
              onCheckedChange={(checked) => handleDashboardChange("autoRefresh", checked)}
            />
          </div>

          {preferences.dashboard.autoRefresh && (
            <div className="flex items-center justify-between">
              <div>
                <Label>Refresh Interval</Label>
                <p className="text-sm text-muted-foreground">How often to refresh data</p>
              </div>
              <Select
                value={preferences.dashboard.refreshInterval}
                onValueChange={(value) => handleDashboardChange("refreshInterval", value)}
              >
                <SelectTrigger className="w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">1 minute</SelectItem>
                  <SelectItem value="5">5 minutes</SelectItem>
                  <SelectItem value="10">10 minutes</SelectItem>
                  <SelectItem value="30">30 minutes</SelectItem>
                </SelectContent>
              </Select>
            </div>
          )}
        </CardContent>
      </Card>

      <div className="flex justify-end gap-2">
        <Button variant="outline">Reset to Defaults</Button>
        <Button>Save Changes</Button>
      </div>
    </div>
  )
}

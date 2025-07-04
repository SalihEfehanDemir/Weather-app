"use client"

import { useState } from "react"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Palette } from "lucide-react"

export function DisplayPreferencesSection() {
  const [settings, setSettings] = useState({
    temperatureUnit: "fahrenheit",
    theme: "dark",
    language: "en",
    timeFormat: "12h",
  })

  const handleSettingChange = (key: string, value: any) => {
    setSettings((prev) => ({ ...prev, [key]: value }))
  }

  return (
    <div className="glass-strong rounded-2xl sm:rounded-3xl p-4 sm:p-6 animate-fade-in">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 glass-subtle rounded-xl">
          <Palette className="h-5 w-5 text-purple-400" />
        </div>
        <div>
          <h2 className="text-xl font-semibold text-white">Display Preferences</h2>
          <p className="text-sm text-gray-400">Customize how weather information is displayed</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div className="glass-subtle rounded-xl p-4">
            <div className="flex items-center justify-between mb-3">
              <div>
                <Label className="text-white font-medium">Temperature Unit</Label>
                <p className="text-xs text-gray-400">Choose your preferred temperature scale</p>
              </div>
              <Select
                value={settings.temperatureUnit}
                onValueChange={(value) => handleSettingChange("temperatureUnit", value)}
              >
                <SelectTrigger className="w-32 glass-subtle border-white/20">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="glass-strong border-white/20">
                  <SelectItem value="fahrenheit">°F (Fahrenheit)</SelectItem>
                  <SelectItem value="celsius">°C (Celsius)</SelectItem>
                  <SelectItem value="kelvin">K (Kelvin)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="glass-subtle rounded-xl p-4">
            <div className="flex items-center justify-between mb-3">
              <div>
                <Label className="text-white font-medium">Theme</Label>
                <p className="text-xs text-gray-400">Choose your preferred theme</p>
              </div>
              <Select value={settings.theme} onValueChange={(value) => handleSettingChange("theme", value)}>
                <SelectTrigger className="w-32 glass-subtle border-white/20">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="glass-strong border-white/20">
                  <SelectItem value="dark">Dark</SelectItem>
                  <SelectItem value="light">Light</SelectItem>
                  <SelectItem value="auto">Auto</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div className="glass-subtle rounded-xl p-4">
            <div className="flex items-center justify-between mb-3">
              <div>
                <Label className="text-white font-medium">Language</Label>
                <p className="text-xs text-gray-400">Select your preferred language</p>
              </div>
              <Select value={settings.language} onValueChange={(value) => handleSettingChange("language", value)}>
                <SelectTrigger className="w-32 glass-subtle border-white/20">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="glass-strong border-white/20">
                  <SelectItem value="en">English</SelectItem>
                  <SelectItem value="es">Español</SelectItem>
                  <SelectItem value="fr">Français</SelectItem>
                  <SelectItem value="de">Deutsch</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="glass-subtle rounded-xl p-4">
            <div className="flex items-center justify-between mb-3">
              <div>
                <Label className="text-white font-medium">Time Format</Label>
                <p className="text-xs text-gray-400">Choose 12-hour or 24-hour format</p>
              </div>
              <Select value={settings.timeFormat} onValueChange={(value) => handleSettingChange("timeFormat", value)}>
                <SelectTrigger className="w-32 glass-subtle border-white/20">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="glass-strong border-white/20">
                  <SelectItem value="12h">12 Hour</SelectItem>
                  <SelectItem value="24h">24 Hour</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 
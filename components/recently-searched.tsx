"use client"

import { ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"

export function RecentlySearched() {
  const recentLocations = [
    {
      name: "Liverpool, UK",
      condition: "Partly Cloudy",
      temp: "16°",
      icon: "⛅",
    },
    {
      name: "Palermo, Italy",
      condition: "Rain/Thunder",
      temp: "-2°",
      icon: "⛈️",
    },
  ]

  return (
    <div className="h-full flex flex-col">
      <div className="flex items-center justify-between mb-6">
        <span className="text-gray-400 text-sm">Recently Searched</span>
        <Button variant="ghost" className="text-gray-400 hover:text-white text-xs p-0 h-auto">
          See All <ChevronRight className="h-3 w-3 ml-1" />
        </Button>
      </div>

      <div className="space-y-4">
        {recentLocations.map((location, index) => (
          <div
            key={index}
            className="glass-morphism-dark rounded-2xl p-4 hover:bg-white/10 transition-colors cursor-pointer"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="text-xl">{location.icon}</div>
                <div>
                  <div className="text-white font-medium text-sm">{location.name}</div>
                  <div className="text-gray-400 text-xs">{location.condition}</div>
                </div>
              </div>
              <div className="text-white font-medium text-sm">{location.temp}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

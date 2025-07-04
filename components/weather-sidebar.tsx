"use client"

import { useState } from "react"
import { MoreHorizontal } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

export function WeatherSidebar() {
  const [selectedLocation, setSelectedLocation] = useState("Brooklyn, New York, USA")

  return (
    <div className="glass-morphism-dark rounded-3xl p-6 h-full flex flex-col min-h-[600px]">
      {/* Status Section */}
      <div className="mb-6">
        <div className="text-sm text-gray-400 mb-3">Status</div>
        <div className="flex items-center justify-between mb-4">
          <div className="text-sm text-gray-300">↗ 23.8%</div>
          <MoreHorizontal className="h-4 w-4 text-gray-400" />
        </div>

        <div className="mb-4">
          <Badge variant="secondary" className="bg-white text-black rounded-full px-3 py-1 text-xs font-medium">
            Dangerous
          </Badge>
        </div>

        <div className="mb-4">
          <svg viewBox="0 0 200 60" className="w-full h-12">
            <path d="M 20 40 Q 60 15 100 25 T 180 20" stroke="#00d4ff" strokeWidth="2" fill="none" />
            <path d="M 20 40 Q 60 30 100 35 T 180 30" stroke="#ff6b35" strokeWidth="2" fill="none" />
          </svg>
        </div>

        <Button variant="ghost" className="text-white hover:bg-white/10 text-xs p-0 h-auto">
          See More details →
        </Button>
      </div>

      {/* Map Section */}
      <div className="flex-1 flex flex-col">
        <div className="text-sm text-gray-400 mb-3">Select Area</div>
        <div className="flex-1 flex flex-col justify-center">
          <div className="w-full h-32 rounded-2xl overflow-hidden bg-gradient-to-br from-amber-900/50 to-orange-800/50 relative mb-3">
            <div className="absolute inset-0 bg-gradient-to-br from-amber-900/30 to-orange-800/30">
              <div className="absolute top-4 left-4 w-2 h-2 bg-white rounded-full"></div>
              <div className="absolute top-6 right-6 w-2 h-2 bg-white rounded-full"></div>
              <div className="absolute bottom-8 left-8 w-2 h-2 bg-white rounded-full"></div>
            </div>
          </div>
          <div className="flex justify-center gap-2 mb-4">
            <div className="w-2 h-2 bg-white rounded-full"></div>
            <div className="w-2 h-2 bg-white/40 rounded-full"></div>
            <div className="w-2 h-2 bg-white/40 rounded-full"></div>
          </div>
        </div>

        <div className="text-center mt-auto">
          <div className="text-white font-medium text-sm">{selectedLocation}</div>
        </div>
      </div>
    </div>
  )
}

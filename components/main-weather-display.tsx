"use client"

import { MapPin } from "lucide-react"

export function MainWeatherDisplay() {
  return (
    <div className="h-full flex flex-col justify-center">
      {/* Location Header */}
      <div className="flex items-center gap-2 mb-8">
        <MapPin className="h-4 w-4 text-white" />
        <span className="text-white text-sm">Brooklyn, New York, USA</span>
        <span className="text-gray-400 text-sm">(Friday, January 4)</span>
      </div>

      {/* Main Temperature Display */}
      <div className="mb-8">
        <div className="flex items-start gap-6 mb-6">
          <div className="text-7xl md:text-8xl font-light text-white leading-none">13°</div>
          <div className="flex flex-col gap-2 mt-2">
            <div className="flex items-center gap-2 text-gray-300">
              <span className="text-sm bg-gray-700 rounded px-2 py-1">H</span>
              <span className="text-lg">29°</span>
            </div>
            <div className="flex items-center gap-2 text-gray-300">
              <span className="text-sm bg-gray-700 rounded px-2 py-1">L</span>
              <span className="text-lg">12°</span>
            </div>
          </div>
        </div>

        <div className="mb-2">
          <div className="text-3xl md:text-4xl font-light text-gray-300">Stormy</div>
          <div className="text-3xl md:text-4xl font-light text-gray-400">with partly cloudy</div>
        </div>
      </div>

      {/* Description */}
      <div className="text-gray-300 text-sm leading-relaxed max-w-md">
        With real time data and advanced technology, we provide reliable forecasts for any location around the world.
      </div>
    </div>
  )
}

"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Cloud, Droplets, Eye, Gauge, Sun, Wind } from "lucide-react"

export function CurrentWeather() {
  const currentWeather = {
    temperature: 72,
    feelsLike: 75,
    condition: "Partly Cloudy",
    humidity: 65,
    pressure: 30.15,
    visibility: 10,
    windSpeed: 8,
    windDirection: "NW",
    uvIndex: 6,
    sunrise: "6:42 AM",
    sunset: "7:28 PM",
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Sun className="h-5 w-5" />
          Current Weather
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-4xl font-bold">{currentWeather.temperature}°F</div>
            <div className="text-muted-foreground">Feels like {currentWeather.feelsLike}°F</div>
            <div className="flex items-center gap-2 mt-2">
              <Cloud className="h-4 w-4" />
              <span>{currentWeather.condition}</span>
            </div>
          </div>
          <div className="text-right">
            <div className="text-6xl">🌤️</div>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="flex items-center gap-2">
            <Droplets className="h-4 w-4 text-blue-500" />
            <div>
              <div className="text-sm text-muted-foreground">Humidity</div>
              <div className="font-medium">{currentWeather.humidity}%</div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Gauge className="h-4 w-4 text-green-500" />
            <div>
              <div className="text-sm text-muted-foreground">Pressure</div>
              <div className="font-medium">{currentWeather.pressure} in</div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Eye className="h-4 w-4 text-purple-500" />
            <div>
              <div className="text-sm text-muted-foreground">Visibility</div>
              <div className="font-medium">{currentWeather.visibility} mi</div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Wind className="h-4 w-4 text-gray-500" />
            <div>
              <div className="text-sm text-muted-foreground">Wind</div>
              <div className="font-medium">
                {currentWeather.windSpeed} mph {currentWeather.windDirection}
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-between items-center pt-4 border-t">
          <div className="flex items-center gap-2">
            <Badge variant="secondary" className="bg-orange-100 text-orange-800">
              UV Index: {currentWeather.uvIndex}
            </Badge>
          </div>
          <div className="text-sm text-muted-foreground">
            🌅 {currentWeather.sunrise} • 🌇 {currentWeather.sunset}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

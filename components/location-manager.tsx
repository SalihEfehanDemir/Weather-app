"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { MapPin, Search, Star, Trash2, Plus } from "lucide-react"

export function LocationManager() {
  const [searchQuery, setSearchQuery] = useState("")
  const [favoriteLocations] = useState([
    { id: 1, name: "New York, NY", country: "USA", temp: 72, condition: "☀️", isCurrent: true },
    { id: 2, name: "London, UK", country: "UK", temp: 59, condition: "🌧️", isCurrent: false },
    { id: 3, name: "Tokyo, Japan", country: "Japan", temp: 68, condition: "⛅", isCurrent: false },
    { id: 4, name: "Sydney, Australia", country: "Australia", temp: 75, condition: "🌤️", isCurrent: false },
  ])

  const searchResults = [
    { name: "Los Angeles, CA", country: "USA", temp: 78, condition: "☀️" },
    { name: "Miami, FL", country: "USA", temp: 82, condition: "🌤️" },
    { name: "Chicago, IL", country: "USA", temp: 65, condition: "⛅" },
  ]

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Search className="h-5 w-5" />
            Search Locations
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-2">
            <Input
              placeholder="Search for a city..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-1"
            />
            <Button>
              <Search className="h-4 w-4" />
            </Button>
          </div>

          {searchQuery && (
            <div className="space-y-2">
              <h4 className="font-medium text-sm text-muted-foreground">Search Results</h4>
              {searchResults.map((location, index) => (
                <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <MapPin className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <div className="font-medium">{location.name}</div>
                      <div className="text-sm text-muted-foreground">{location.country}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="text-right">
                      <div className="flex items-center gap-2">
                        <span className="text-lg">{location.condition}</span>
                        <span className="font-medium">{location.temp}°F</span>
                      </div>
                    </div>
                    <Button size="sm" variant="outline">
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Star className="h-5 w-5" />
            Favorite Locations
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {favoriteLocations.map((location) => (
              <div key={location.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center gap-3">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-medium">{location.name}</span>
                      {location.isCurrent && (
                        <Badge variant="secondary" className="text-xs">
                          Current
                        </Badge>
                      )}
                    </div>
                    <div className="text-sm text-muted-foreground">{location.country}</div>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <div className="flex items-center gap-2">
                      <span className="text-xl">{location.condition}</span>
                      <span className="font-medium text-lg">{location.temp}°F</span>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline">
                      <Star className="h-4 w-4 fill-current text-yellow-500" />
                    </Button>
                    <Button size="sm" variant="outline">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

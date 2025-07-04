"use client"

import { useState, useEffect, useCallback } from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { MapPin, Search, Star, Trash2, Plus, Navigation, Loader2 } from "lucide-react"
import { useDebounce } from 'use-debounce';
import { useProfile } from '@/context/ProfileContext'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import type { Location } from '@/context/ProfileContext'

// Type definitions
interface SearchResult {
  name: string;
  country: string;
  state?: string;
  lat: number;
  lon: number;
}

// Helper to get a unique ID for a location
const getLocationId = (loc: { lat: number, lon: number }) => `${loc.lat.toFixed(4)},${loc.lon.toFixed(4)}`;

export function LocationsPage() {
  const { locations, addLocation, deleteLocation, setMainLocation, mainLocation, loading: profileLoading } = useProfile()
  const [searchTerm, setSearchTerm] = useState('')
  const [debouncedSearchTerm] = useDebounce(searchTerm, 500)
  const [results, setResults] = useState<SearchResult[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (debouncedSearchTerm) {
      const fetchLocations = async () => {
        setLoading(true)
        setError(null)
        try {
          const response = await fetch(`/api/geocode?q=${debouncedSearchTerm}`)
          if (!response.ok) throw new Error('Failed to fetch locations')
          const data = await response.json()
          setResults(data)
        } catch (err: any) {
          setError(err.message)
        } finally {
          setLoading(false)
        }
      }
      fetchLocations()
    } else {
      setResults([])
    }
  }, [debouncedSearchTerm])

  const handleAddLocation = async (location: SearchResult) => {
    await addLocation({
        name: location.name,
        lat: location.lat,
        lon: location.lon,
        country: location.country,
        is_main: false // This is handled by the setMainLocation function
    })
    setSearchTerm('')
    setResults([])
  }
  
  const handleSetMain = async (location: Location) => {
    await setMainLocation(location);
  }

  const getWeatherEmoji = (condition: string | undefined) => {
    if (!condition) return '...';
    const lowerCaseCondition = condition.toLowerCase();
    if (lowerCaseCondition.includes('sun') || lowerCaseCondition.includes('clear')) return "☀️";
    if (lowerCaseCondition.includes('cloud')) return "☁️";
    if (lowerCaseCondition.includes('rain')) return "🌧️";
    if (lowerCaseCondition.includes('snow')) return "❄️";
    if (lowerCaseCondition.includes('storm')) return "⛈️";
    if (lowerCaseCondition.includes('mist') || lowerCaseCondition.includes('fog')) return "🌫️";
    return "🌍";
  }

  return (
    <div className="space-y-6">
      <Card className="glass-strong">
        <CardHeader>
          <CardTitle>Search for a Location</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
            <Input
              placeholder="E.g., London, New York..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
            {loading && <Loader2 className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 animate-spin" />}
          </div>
          {error && <p className="text-red-500 mt-2">{error}</p>}
          {results.length > 0 && (
            <div className="mt-4 space-y-2 max-h-60 overflow-y-auto">
              {results.map((result, index) => (
                <div key={index} className="flex items-center justify-between p-2 rounded-md hover:bg-white/10">
                  <span>{result.name}, {result.state ? `${result.state}, ` : ''}{result.country}</span>
                  <Button size="sm" onClick={() => handleAddLocation(result)}>
                    Add
                  </Button>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      <Card className="glass-strong">
        <CardHeader>
          <CardTitle>Your Locations</CardTitle>
        </CardHeader>
        <CardContent>
          {profileLoading ? (
            <div className="flex justify-center"><Loader2 className="h-8 w-8 animate-spin"/></div>
          ) : locations.length === 0 ? (
            <div className="text-center text-gray-400 py-8">
                <MapPin className="mx-auto h-12 w-12 mb-4"/>
                <p>You haven't saved any locations yet.</p>
                <p className="text-sm">Use the search bar above to find and add locations.</p>
            </div>
          ) : (
            <ScrollArea className="max-h-[500px]">
              <div className="space-y-4">
                {locations.map(location => (
                  <div key={location.id} className="flex items-center p-3 rounded-lg glass-subtle">
                    <div className="flex-grow">
                      <p className="font-semibold">{location.name}</p>
                      <p className="text-sm text-gray-400">{location.country}</p>
                    </div>
                    <div className="flex items-center gap-2">
                       <Button 
                         variant={mainLocation?.id === location.id ? "default" : "outline"}
                         size="sm"
                         onClick={() => handleSetMain(location)}
                         disabled={mainLocation?.id === location.id}
                       >
                         <Star className={`h-4 w-4 mr-2 ${mainLocation?.id === location.id ? "text-yellow-400" : ""}`}/>
                         {mainLocation?.id === location.id ? "Main" : "Set as Main"}
                       </Button>
                       <Button variant="destructive" size="icon" onClick={() => deleteLocation(location.id)}>
                         <Trash2 className="h-4 w-4" />
                       </Button>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

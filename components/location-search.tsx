"use client"

import { useState, useEffect } from "react"
import { Search, MapPin, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { useDebounce } from 'use-debounce'
import { useProfile } from '@/context/ProfileContext'

interface SearchResult {
  name: string;
  country: string;
  state?: string;
  lat: number;
  lon: number;
}

export function LocationSearch() {
  const { addLocation, setMainLocation, locations } = useProfile();
  const [open, setOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [debouncedSearchTerm] = useDebounce(searchTerm, 500)
  const [results, setResults] = useState<SearchResult[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (debouncedSearchTerm) {
      const fetchLocations = async () => {
        setLoading(true)
        setError(null)
        setResults([])
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
      setError(null)
    }
  }, [debouncedSearchTerm])

  const handleSelectLocation = async (location: SearchResult) => {
    setLoading(true)
    try {
      // Check if location already exists
      const existingLocation = locations.find(loc => 
        Math.abs(loc.lat - location.lat) < 0.01 && 
        Math.abs(loc.lon - location.lon) < 0.01
      );
      
      if (existingLocation) {
        // Location already exists, just set it as main
        await setMainLocation(existingLocation);
      } else {
        // Location doesn't exist, add it first then set as main
        const newLocation = await addLocation({
          name: location.name,
          country: location.country,
          lat: location.lat,
          lon: location.lon,
          is_main: false, 
        });

        if (newLocation && newLocation.id) {
          // Set this new location as the main one
          await setMainLocation(newLocation);
        }
      }
      
      // Reset and close
      setSearchTerm('')
      setResults([])
      setOpen(false)
    } catch (error) {
      setError("Failed to save the selected location.")
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="ghost" className="glass-subtle hover:glass rounded-2xl gap-2">
          <Search className="h-4 w-4" />
          <span className="hidden md:inline">Search Location</span>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80 glass-strong border-white/20 rounded-2xl p-4">
        <div className="space-y-4">
          <div className="relative">
            <Input
              placeholder="Search for a city..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="glass-subtle border-white/20 rounded-xl"
            />
            {loading && <Loader2 className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 animate-spin" />}
          </div>

          {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
          
          {results.length > 0 && (
            <div className="space-y-2 max-h-60 overflow-y-auto">
              <p className="text-sm text-gray-400">Search Results</p>
              {results.map((location, index) => (
                <div 
                  key={index} 
                  className="glass-subtle rounded-xl p-3 hover:glass transition-all cursor-pointer"
                  onClick={() => handleSelectLocation(location)}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-gray-400" />
                      <div>
                        <div className="text-white text-sm font-medium">{location.name}, {location.state ? `${location.state}, ` : ''}{location.country}</div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </PopoverContent>
    </Popover>
  )
}

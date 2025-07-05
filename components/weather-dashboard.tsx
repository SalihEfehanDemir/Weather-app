"use client"

import { useState, useEffect } from "react"
import { Cloud, Home, MapPin, Loader2, User } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CurrentWeatherCard } from "@/components/current-weather-card"
import { WeatherForecast } from "@/components/weather-forecast"
import { LocationSearch } from "@/components/location-search"
import { UserProfile } from "@/components/user-profile"
import { LocationsPage } from "@/components/locations-page"
import { ProfilePage } from "@/components/profile-page"
import { useProfile } from "@/context/ProfileContext"
import Image from "next/image"

const ISTANBUL_COORDS = { lat: 41.015137, lon: 28.979530 };

export function WeatherDashboard() {
  const [activeTab, setActiveTab] = useState("dashboard")
  const { mainLocation, loading: profileLoading } = useProfile();
  
  const [weatherData, setWeatherData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [locationName, setLocationName] = useState("Istanbul");

  useEffect(() => {
    const fetchWeather = async (lat: number, lon: number) => {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(`/api/weather?lat=${lat}&lon=${lon}`);
        if (!res.ok) {
          const errorData = await res.json();
          throw new Error(errorData.error || 'Failed to fetch weather data');
        }
        const data = await res.json();
        setWeatherData(data);
      } catch (e: any) {
        setError(e.message);
        console.error("Weather fetch error:", e);
      } finally {
        setLoading(false);
      }
    };

    if (profileLoading) {
        setLoading(true);
        return;
    }

    if (mainLocation) {
      setLocationName(mainLocation.name);
      fetchWeather(mainLocation.lat, mainLocation.lon);
    } else {
      setLocationName("Istanbul");
      fetchWeather(ISTANBUL_COORDS.lat, ISTANBUL_COORDS.lon);
    }
  }, [mainLocation, profileLoading]);


  const renderDashboardContent = () => {
    if (loading) {
      return (
        <div className="flex items-center justify-center min-h-[400px]">
            <Loader2 className="h-10 w-10 animate-spin text-white" />
        </div>
      )
    }

    if (error) {
       return (
          <div className="glass-strong rounded-2xl sm:rounded-3xl p-6 flex flex-col items-center justify-center min-h-[400px] text-center">
              <MapPin className="h-8 w-8 text-red-400 mb-4" />
              <h3 className="text-xl font-semibold text-red-400 mb-2">Failed to load weather data</h3>
              <p className="text-gray-400">{error}</p>
          </div>
      )
    }
    
    if (!weatherData) {
      return <div className="text-center text-gray-400">No weather data available.</div>
    }

    return (
      <div className="space-y-4 sm:space-y-6">
        <CurrentWeatherCard 
          locationName={locationName} 
          current={weatherData.current} 
          daily={weatherData.daily} 
        />
        <WeatherForecast 
          hourly={weatherData.hourly}
          daily={weatherData.daily}
        />
      </div>
    );
  };

  return (
    <div className="min-h-screen p-3 sm:p-4 lg:p-6">
      <div className="max-w-8xl mx-auto">
        {/* Enhanced Header */}
        <header className="glass-strong rounded-2xl sm:rounded-3xl p-3 sm:p-4 mb-3 sm:mb-4 animate-fade-in">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 sm:gap-3">
            <div className="flex items-center gap-3">
              <div className="relative">
                <Image 
                  src="/logo.png" 
                  alt="HavaPro Logo" 
                  width={350} 
                  height={120} 
                  className="h-16 sm:h-20 w-auto"
                  priority
                />
              </div>
            </div>

            <div className="flex items-center gap-2 w-full sm:w-auto">
              <div className="flex-1 sm:flex-initial">
                <LocationSearch />
              </div>
              <UserProfile onNavigate={setActiveTab} />
            </div>
          </div>
        </header>

        {/* Enhanced Navigation */}
        <nav className="glass-strong rounded-2xl sm:rounded-3xl p-2 mb-4 sm:mb-6 animate-fade-in">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-3 bg-transparent gap-1 sm:gap-2 p-1">
              <TabsTrigger
                value="dashboard"
                className="glass-subtle data-[state=active]:glass-strong rounded-xl sm:rounded-2xl text-xs sm:text-sm py-2 sm:py-3"
              >
                <Home className="h-3 w-3 sm:h-4 sm:w-4 sm:mr-2" />
                <span className="hidden sm:inline">Dashboard</span>
              </TabsTrigger>
              <TabsTrigger
                value="locations"
                className="glass-subtle data-[state=active]:glass-strong rounded-xl sm:rounded-2xl text-xs sm:text-sm py-2 sm:py-3"
              >
                <MapPin className="h-3 w-3 sm:h-4 sm:w-4 sm:mr-2" />
                <span className="hidden sm:inline">Locations</span>
              </TabsTrigger>
              <TabsTrigger
                value="profile"
                className="glass-subtle data-[state=active]:glass-strong rounded-xl sm:rounded-2xl text-xs sm:text-sm py-2 sm:py-3"
              >
                <User className="h-3 w-3 sm:h-4 sm:w-4 sm:mr-2" />
                <span className="hidden sm:inline">Profile</span>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="dashboard" className="mt-4 sm:mt-6">
              {renderDashboardContent()}
            </TabsContent>

            <TabsContent value="locations" className="mt-4 sm:mt-6">
              <LocationsPage />
            </TabsContent>

            <TabsContent value="profile" className="mt-4 sm:mt-6">
              <ProfilePage />
            </TabsContent>
          </Tabs>
        </nav>
      </div>
    </div>
  )
}

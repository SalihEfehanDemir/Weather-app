"use client"

import { Sun, Cloud, CloudRain, CloudSnow, Wind, Droplets, Gauge, Eye, Sunrise, Sunset } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface WeatherData {
  dt: number;
  temp: number | { max: number; min: number };
  feels_like: number;
  pressure: number;
  humidity: number;
  uvi: number;
  visibility: number;
  wind_speed: number;
  sunrise: number;
  sunset: number;
  weather: {
    id: number;
    main: string;
    description: string;
  }[];
}

interface CurrentWeatherCardProps {
  locationName: string;
  current: WeatherData;
  daily: WeatherData[];
}

export function CurrentWeatherCard({ locationName, current, daily }: CurrentWeatherCardProps) {
  
  const getWeatherIcon = (weatherId: number, size = "h-24 w-24") => {
    const className = `${size} text-white drop-shadow-lg`;
    if (weatherId >= 200 && weatherId < 300) return <CloudRain className={className} />; // Thunderstorm
    if (weatherId >= 300 && weatherId < 500) return <CloudRain className={className} />; // Drizzle
    if (weatherId >= 500 && weatherId < 600) return <CloudRain className={className} />; // Rain
    if (weatherId >= 600 && weatherId < 700) return <CloudSnow className={className} />; // Snow
    if (weatherId >= 701 && weatherId <= 781) return <Wind className={className} />; // Atmosphere (Mist, Smoke, Haze, etc.)
    if (weatherId === 800) return <Sun className="h-24 w-24 text-yellow-400 drop-shadow-lg" />; // Clear
    if (weatherId > 800) return <Cloud className={className} />; // Clouds
    return <Cloud className={className} />;
  };
  
  const formatTime = (timestamp: number) => {
    if (!timestamp || timestamp === 0) return "N/A";
    return new Date(timestamp * 1000).toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit', hour12: false });
  }

  if (!current || !daily || daily.length === 0) {
    return null;
  }
  
  const visibilityKm = (current.visibility / 1000).toFixed(1);

  const toTitleCase = (str: string) => {
    return str.replace(
      /\w\S*/g,
      (txt) => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()
    );
  };

  return (
    <div className="bg-gray-800/50 backdrop-blur-md rounded-2xl sm:rounded-3xl p-6 relative animate-fade-in text-white">
      <div className="flex justify-between items-start">
        {/* Left Side */}
        <div className="w-1/2">
            <div className="flex items-center gap-2 mb-2">
                <Badge className="bg-blue-500/80 text-white border-0">Current Location</Badge>
                <Badge className="bg-green-500/80 text-white border-0">Live</Badge>
            </div>
            <h2 className="text-3xl font-bold">{locationName}</h2>
            <p className="text-sm text-gray-400 mb-6">Updated just now • {new Date(current.dt * 1000).toLocaleDateString('en-US', { month: 'numeric', day: 'numeric', year: 'numeric' })}</p>
            
            <div className="text-8xl font-light tracking-tighter mb-2">{Math.round(current.temp as number)}°<span className="text-3xl font-normal">C</span></div>
            <p className="text-lg text-gray-300">Feels like {Math.round(current.feels_like)}°C</p>
            
        </div>

        {/* Right Side */}
        <div className="w-1/2">
            <div className="absolute top-6 right-6">
                {getWeatherIcon(current.weather[0].id)}
            </div>
            <div className="grid grid-cols-2 gap-4 mt-16">
                <div className="bg-black/20 rounded-xl p-4">
                    <div className="flex items-center text-gray-400 text-sm mb-1"><Droplets size={16} className="mr-1.5"/>Humidity</div>
                    <div className="text-2xl font-bold">{current.humidity}%</div>
                    <div className="text-xs text-gray-500">Normal</div>
                </div>
                <div className="bg-black/20 rounded-xl p-4">
                    <div className="flex items-center text-gray-400 text-sm mb-1"><Wind size={16} className="mr-1.5"/>Wind</div>
                    <div className="text-2xl font-bold">{current.wind_speed.toFixed(1)} <span className="text-lg">m/s</span></div>
                     <div className="text-xs text-gray-500">Light breeze</div>
                </div>
                <div className="bg-black/20 rounded-xl p-4">
                    <div className="flex items-center text-gray-400 text-sm mb-1"><Gauge size={16} className="mr-1.5"/>Pressure</div>
                    <div className="text-2xl font-bold">{current.pressure}<span className="text-lg">hPa</span></div>
                    <div className="text-xs text-gray-500">Steady</div>
                </div>
                 <div className="bg-black/20 rounded-xl p-4">
                    <div className="flex items-center text-gray-400 text-sm mb-1"><Sun size={16} className="mr-1.5"/>UV Index</div>
                    <div className="text-2xl font-bold">{current.uvi}</div>
                     <div className="text-xs text-gray-500">Moderate</div>
                </div>
                <div className="bg-black/20 rounded-xl p-4">
                    <div className="flex items-center text-gray-400 text-sm mb-1"><Eye size={16} className="mr-1.5"/>Visibility</div>
                    <div className="text-2xl font-bold">{visibilityKm} <span className="text-lg">km</span></div>
                     <div className="text-xs text-gray-500">Excellent</div>
                </div>
                <div className="bg-black/20 rounded-xl p-4">
                    <div className="flex items-center text-gray-400 text-sm mb-1"><Sunrise size={16} className="mr-1.5"/>Sun Times</div>
                    <div className="text-xl font-bold flex items-center gap-2">
                        <Sunrise size={20} className="text-yellow-400"/> {formatTime(current.sunrise)}
                    </div>
                    <div className="text-xl font-bold flex items-center gap-2">
                        <Sunset size={20} className="text-orange-400"/> {formatTime(current.sunset)}
                    </div>
                </div>
            </div>
        </div>
      </div>
    </div>
  )
}

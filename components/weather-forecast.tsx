"use client"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Sun, Cloud, CloudRain, CloudSnow, Wind } from "lucide-react"
import { useProfile } from "@/context/ProfileContext"

interface HourlyData {
  dt: number;
  temp: number;
  weather: { id: number; }[];
  pop: number;
}

interface DailyData {
  dt: number;
  temp: { min: number; max: number; };
  weather: { id: number; }[];
  pop: number;
}

interface WeatherForecastProps {
  hourly: HourlyData[];
  daily: DailyData[];
}

export function WeatherForecast({ hourly, daily }: WeatherForecastProps) {
  const { profile } = useProfile();
  
  const getWeatherIcon = (weatherId: number, size = "h-8 w-8") => {
    const className = `${size} text-white drop-shadow-lg`;
    if (weatherId >= 200 && weatherId < 300) return <CloudRain className={className} />; // Thunderstorm
    if (weatherId >= 300 && weatherId < 500) return <CloudRain className={className} />; // Drizzle
    if (weatherId >= 500 && weatherId < 600) return <CloudRain className={className} />; // Rain
    if (weatherId >= 600 && weatherId < 700) return <CloudSnow className={className} />; // Snow
    if (weatherId >= 701 && weatherId <= 781) return <Wind className={className} />; // Atmosphere (Mist, Smoke, Haze, etc.)
    if (weatherId === 800) return <Sun className="h-8 w-8 text-yellow-400 drop-shadow-lg" />; // Clear
    if (weatherId > 800) return <Cloud className={className} />; // Clouds
    return <Cloud className={className} />;
  };
  
  const formatHour = (dt: number, index: number) => {
    if (index === 0) return "Now";
    
    const locale = 'en-US';
    const options: Intl.DateTimeFormatOptions = {
        hour: 'numeric',
        hour12: profile?.time_format === '12-hour'
    };
    
    return new Date(dt * 1000).toLocaleTimeString(locale, options);
  }

  const formatDay = (dt: number) => {
    const date = new Date(dt * 1000);
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    if (date.toDateString() === today.toDateString()) return "Today";
    if (date.toDateString() === tomorrow.toDateString()) return "Tomorrow";
    
    const locale = 'en-US';
    return date.toLocaleDateString(locale, { weekday: 'long' });
  };

  if (!hourly || !daily) return null;

  return (
    <div className="bg-gray-800/50 backdrop-blur-md rounded-2xl sm:rounded-3xl p-6 animate-fade-in text-white">
        <Tabs defaultValue="hourly" className="w-full">
          <TabsList className="grid w-full grid-cols-2 bg-black/20 rounded-lg p-1 mb-4">
            <TabsTrigger value="hourly" className="p-2 text-sm font-medium text-gray-400 data-[state=active]:text-white data-[state=active]:bg-white/10 rounded-md transition-all">
              Hourly
            </TabsTrigger>
            <TabsTrigger value="daily" className="p-2 text-sm font-medium text-gray-400 data-[state=active]:text-white data-[state=active]:bg-white/10 rounded-md transition-all">
              7-Day
            </TabsTrigger>
          </TabsList>

          <TabsContent value="hourly" className="mt-0">
            <div className="flex gap-4 overflow-x-auto pb-4 -mb-4 custom-scrollbar">
              {hourly.slice(0, 24).map((hour, index) => (
                <div key={index} className="text-center p-3 rounded-xl bg-black/20 flex flex-col items-center flex-shrink-0 w-24">
                  <div className="text-sm text-gray-400 mb-2">{formatHour(hour.dt, index)}</div>
                  {getWeatherIcon(hour.weather[0].id)}
                  <div className="font-medium mt-2 text-white">{Math.round(hour.temp)}°</div>
                   <div className="text-xs text-blue-300 mt-1">{Math.round(hour.pop * 100)}%</div>
                </div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="daily" className="mt-0">
            <div className="space-y-2">
              {daily.slice(0, 7).map((day, index) => (
                <div key={index} className="flex items-center justify-between p-3 rounded-xl bg-black/20 hover:bg-black/30 transition-colors">
                  <div className="w-28 text-sm font-medium text-white">{formatDay(day.dt)}</div>
                  <div className="flex items-center gap-4 flex-1 justify-center">
                     {getWeatherIcon(day.weather[0].id, "h-7 w-7")}
                     <div className="text-xs text-blue-300 w-10 text-right">
                        {Math.round(day.pop * 100)}%
                    </div>
                  </div>
                  <div className="flex items-center gap-4 text-sm w-28 justify-end">
                      <span className="font-medium text-white">H: {Math.round(day.temp.max)}°</span>
                      <span className="text-gray-400">L: {Math.round(day.temp.min)}°</span>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>
        </Tabs>
    </div>
  )
}



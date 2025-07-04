"use client"

export function WeeklyForecast() {
  const weeklyData = [
    { day: "Sunday", temp: "28°", active: false },
    { day: "Monday", temp: "26°", active: false },
    { day: "Tuesday", temp: "27°", active: false },
    { day: "Wednesday", temp: "23°", active: true },
    { day: "Thursday", temp: "30°", active: false },
    { day: "Friday", temp: "25°", active: false },
  ]

  return (
    <div className="mt-8">
      <div className="flex justify-between items-end mb-6">
        {weeklyData.map((day, index) => (
          <div key={index} className="text-center flex-1">
            <div className={`text-xs mb-2 ${day.active ? "text-white" : "text-gray-400"}`}>{day.day}</div>
            <div className={`text-xl font-light ${day.active ? "text-white" : "text-gray-500"}`}>{day.temp}</div>
          </div>
        ))}
      </div>

      {/* Curved line connecting the forecast */}
      <div className="relative h-12">
        <svg viewBox="0 0 600 40" className="w-full h-full">
          <path
            d="M 50 25 Q 150 15 250 20 T 450 15 T 550 25"
            stroke="rgba(255, 255, 255, 0.6)"
            strokeWidth="2"
            fill="none"
          />
          {/* Active day indicator */}
          <circle cx="350" cy="15" r="3" fill="white" />
        </svg>
      </div>
    </div>
  )
}

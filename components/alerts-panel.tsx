"use client"

import { AlertTriangle, Bell, X } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

export function AlertsPanel() {
  const alerts = [
    {
      id: 1,
      title: "Severe Weather Warning",
      description: "Thunderstorms expected with heavy rain and strong winds.",
      severity: "high",
      time: "2 hours ago",
      type: "storm",
    },
    {
      id: 2,
      title: "UV Index Alert",
      description: "High UV levels detected. Limit outdoor exposure.",
      severity: "medium",
      time: "4 hours ago",
      type: "uv",
    },
    {
      id: 3,
      title: "Temperature Drop",
      description: "Significant temperature decrease expected tonight.",
      severity: "low",
      time: "6 hours ago",
      type: "temperature",
    },
  ]

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "high":
        return "bg-red-500/20 text-red-300 border-red-500/30"
      case "medium":
        return "bg-orange-500/20 text-orange-300 border-orange-500/30"
      case "low":
        return "bg-yellow-500/20 text-yellow-300 border-yellow-500/30"
      default:
        return "bg-gray-500/20 text-gray-300 border-gray-500/30"
    }
  }

  return (
    <div className="space-y-6">
      <div className="glass rounded-3xl p-6 animate-fade-in">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <Bell className="h-5 w-5 text-blue-400" />
            <h3 className="text-lg font-semibold text-white">Weather Alerts</h3>
          </div>
          <Badge variant="outline" className="bg-red-500/20 text-red-300 border-red-500/30">
            {alerts.length} Active
          </Badge>
        </div>

        <div className="space-y-4">
          {alerts.map((alert) => (
            <div key={alert.id} className="glass-subtle rounded-2xl p-4 hover:glass transition-all">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-2">
                  <AlertTriangle className="h-4 w-4 text-orange-400 flex-shrink-0 mt-0.5" />
                  <Badge className={getSeverityColor(alert.severity)}>{alert.severity.toUpperCase()}</Badge>
                </div>
                <Button size="icon" variant="ghost" className="h-6 w-6 hover:bg-white/10">
                  <X className="h-3 w-3" />
                </Button>
              </div>

              <h4 className="font-medium text-white mb-2">{alert.title}</h4>
              <p className="text-sm text-gray-400 mb-3">{alert.description}</p>
              <div className="text-xs text-gray-500">{alert.time}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="glass rounded-3xl p-6 animate-fade-in">
        <h3 className="text-lg font-semibold text-white mb-4">Quick Stats</h3>
        <div className="grid grid-cols-2 gap-4">
          <div className="glass-subtle rounded-2xl p-4 text-center">
            <div className="text-2xl font-bold text-blue-400">72°</div>
            <div className="text-xs text-gray-400">Avg Temp</div>
          </div>
          <div className="glass-subtle rounded-2xl p-4 text-center">
            <div className="text-2xl font-bold text-green-400">65%</div>
            <div className="text-xs text-gray-400">Humidity</div>
          </div>
          <div className="glass-subtle rounded-2xl p-4 text-center">
            <div className="text-2xl font-bold text-purple-400">8mph</div>
            <div className="text-xs text-gray-400">Wind</div>
          </div>
          <div className="glass-subtle rounded-2xl p-4 text-center">
            <div className="text-2xl font-bold text-orange-400">6</div>
            <div className="text-xs text-gray-400">UV Index</div>
          </div>
        </div>
      </div>
    </div>
  )
}

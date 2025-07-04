"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { AlertTriangle, Bell, X, Plus } from "lucide-react"

interface WeatherAlertsProps {
  compact?: boolean
}

export function WeatherAlerts({ compact = false }: WeatherAlertsProps) {
  const alerts = [
    {
      id: 1,
      title: "Severe Thunderstorm Warning",
      description: "Severe thunderstorms with damaging winds and large hail possible.",
      severity: "high",
      startTime: "2:00 PM",
      endTime: "6:00 PM",
      type: "storm",
    },
    {
      id: 2,
      title: "Heat Advisory",
      description: "Dangerously hot conditions with heat index values up to 105°F.",
      severity: "medium",
      startTime: "12:00 PM",
      endTime: "8:00 PM",
      type: "heat",
    },
    {
      id: 3,
      title: "UV Index High",
      description: "UV index reaching dangerous levels. Limit outdoor exposure.",
      severity: "low",
      startTime: "10:00 AM",
      endTime: "4:00 PM",
      type: "uv",
    },
  ]

  const customAlerts = [
    {
      id: 4,
      title: "Temperature Alert",
      description: "Temperature will drop below 60°F",
      isCustom: true,
      active: true,
    },
    {
      id: 5,
      title: "Rain Alert",
      description: "Precipitation probability above 70%",
      isCustom: true,
      active: false,
    },
  ]

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "high":
        return "bg-red-100 text-red-800 border-red-200"
      case "medium":
        return "bg-orange-100 text-orange-800 border-orange-200"
      case "low":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  if (compact) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bell className="h-5 w-5" />
            Active Alerts
            <Badge variant="destructive" className="ml-auto">
              {alerts.length}
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {alerts.slice(0, 2).map((alert) => (
            <div key={alert.id} className="flex items-start gap-3 p-3 border rounded-lg">
              <AlertTriangle className="h-4 w-4 text-red-500 mt-0.5 flex-shrink-0" />
              <div className="flex-1 min-w-0">
                <div className="font-medium text-sm">{alert.title}</div>
                <div className="text-xs text-muted-foreground mt-1">
                  {alert.startTime} - {alert.endTime}
                </div>
              </div>
            </div>
          ))}
          {alerts.length > 2 && (
            <Button variant="outline" size="sm" className="w-full bg-transparent">
              View All Alerts ({alerts.length})
            </Button>
          )}
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5" />
            Weather Alerts
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {alerts.map((alert) => (
            <div key={alert.id} className="border rounded-lg p-4">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-2">
                  <Badge className={getSeverityColor(alert.severity)}>{alert.severity.toUpperCase()}</Badge>
                  <Badge variant="outline">{alert.type}</Badge>
                </div>
                <Button size="sm" variant="ghost">
                  <X className="h-4 w-4" />
                </Button>
              </div>
              <h4 className="font-medium mb-2">{alert.title}</h4>
              <p className="text-sm text-muted-foreground mb-3">{alert.description}</p>
              <div className="flex items-center gap-4 text-xs text-muted-foreground">
                <span>
                  Active: {alert.startTime} - {alert.endTime}
                </span>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Bell className="h-5 w-5" />
              Custom Alerts
            </div>
            <Button size="sm">
              <Plus className="h-4 w-4 mr-2" />
              Add Alert
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {customAlerts.map((alert) => (
            <div key={alert.id} className="flex items-center justify-between p-3 border rounded-lg">
              <div>
                <div className="font-medium text-sm">{alert.title}</div>
                <div className="text-xs text-muted-foreground">{alert.description}</div>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant={alert.active ? "default" : "secondary"}>{alert.active ? "Active" : "Inactive"}</Badge>
                <Button size="sm" variant="ghost">
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  )
}

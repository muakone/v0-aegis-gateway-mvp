"use client"

import { useAuth } from "@/lib/auth-context"
import { redirect } from "next/navigation"
import { Card } from "@/components/ui/card"
import { MapPin, Wifi, Clock, Smartphone } from "lucide-react"

export default function ContextAwareAccess() {
  const { user } = useAuth()

  if (!user) redirect("/login")
  if (user.role === "User") redirect("/employee")

  const contextSignals = [
    {
      userId: "Grace Chen",
      geolocation: { city: "New York, US", coordinates: "40.7128°N 74.0060°W", isNormal: true },
      network: { type: "Home WiFi", security: "WPA3", reputation: "Clean", isNormal: true },
      timeContext: { dayOfWeek: "Wednesday", hour: "2:30 PM", businessHours: true, isNormal: true },
      device: { name: "Windows Laptop", trust: 0.45, isNormal: true, issues: ["Firewall disabled", "OS outdated"] },
      overallTrust: 0.54,
      decision: "Blocked - Device not compliant",
    },
    {
      userId: "Olamide Adeyemi",
      geolocation: { city: "San Francisco, US", coordinates: "37.7749°N 122.4194°W", isNormal: true },
      network: { type: "Office Ethernet", security: "Enterprise", reputation: "Internal", isNormal: true },
      timeContext: { dayOfWeek: "Wednesday", hour: "2:25 PM", businessHours: true, isNormal: true },
      device: { name: "MacBook Pro", trust: 0.95, isNormal: true, issues: [] },
      overallTrust: 0.92,
      decision: "Granted - All signals positive",
    },
  ]

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-6xl mx-auto p-4">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-foreground">Context-Aware Access Engine</h1>
          <p className="text-muted-foreground">Real-time contextual analysis for access decisions</p>
        </div>

        <div className="space-y-4">
          {contextSignals.map((signal, i) => (
            <Card key={i} className="p-6 border-border/50">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-foreground">{signal.userId}</h3>
                <div className="text-right">
                  <p className="text-2xl font-bold text-foreground">{(signal.overallTrust * 100).toFixed(0)}%</p>
                  <p className="text-xs text-muted-foreground">Trust Score</p>
                </div>
              </div>

              <div className="grid md:grid-cols-4 gap-4 mb-4">
                <div className="p-4 rounded-lg bg-muted/20 border border-border/50">
                  <div className="flex items-center gap-2 mb-2">
                    <MapPin className="w-4 h-4 text-accent" />
                    <p className="text-xs font-semibold text-foreground">Geolocation</p>
                  </div>
                  <p className="text-sm font-medium text-foreground">{signal.geolocation.city}</p>
                  <p className="text-xs text-muted-foreground mt-1">{signal.geolocation.coordinates}</p>
                  <span
                    className={`text-xs mt-2 inline-block px-2 py-1 rounded ${signal.geolocation.isNormal ? "bg-green-500/20 text-green-400" : "bg-red-500/20 text-red-400"}`}
                  >
                    {signal.geolocation.isNormal ? "Normal Location" : "Anomaly"}
                  </span>
                </div>

                <div className="p-4 rounded-lg bg-muted/20 border border-border/50">
                  <div className="flex items-center gap-2 mb-2">
                    <Wifi className="w-4 h-4 text-accent" />
                    <p className="text-xs font-semibold text-foreground">Network</p>
                  </div>
                  <p className="text-sm font-medium text-foreground">{signal.network.type}</p>
                  <p className="text-xs text-muted-foreground mt-1">Security: {signal.network.security}</p>
                  <span
                    className={`text-xs mt-2 inline-block px-2 py-1 rounded ${signal.network.reputation === "Clean" ? "bg-green-500/20 text-green-400" : signal.network.reputation === "Internal" ? "bg-blue-500/20 text-blue-400" : "bg-red-500/20 text-red-400"}`}
                  >
                    {signal.network.reputation}
                  </span>
                </div>

                <div className="p-4 rounded-lg bg-muted/20 border border-border/50">
                  <div className="flex items-center gap-2 mb-2">
                    <Clock className="w-4 h-4 text-accent" />
                    <p className="text-xs font-semibold text-foreground">Time Context</p>
                  </div>
                  <p className="text-sm font-medium text-foreground">{signal.timeContext.hour}</p>
                  <p className="text-xs text-muted-foreground mt-1">{signal.timeContext.dayOfWeek}</p>
                  <span
                    className={`text-xs mt-2 inline-block px-2 py-1 rounded ${signal.timeContext.businessHours ? "bg-green-500/20 text-green-400" : "bg-orange-500/20 text-orange-400"}`}
                  >
                    {signal.timeContext.businessHours ? "Business Hours" : "After Hours"}
                  </span>
                </div>

                <div className="p-4 rounded-lg bg-muted/20 border border-border/50">
                  <div className="flex items-center gap-2 mb-2">
                    <Smartphone className="w-4 h-4 text-accent" />
                    <p className="text-xs font-semibold text-foreground">Device</p>
                  </div>
                  <p className="text-sm font-medium text-foreground">{signal.device.name}</p>
                  <p className="text-xs text-muted-foreground mt-1">Trust: {(signal.device.trust * 100).toFixed(0)}%</p>
                  {signal.device.issues.length > 0 && (
                    <div className="text-xs text-red-400 mt-2">
                      {signal.device.issues.map((issue, j) => (
                        <div key={j}>• {issue}</div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              <div
                className={`p-4 rounded-lg border ${signal.decision.includes("Granted") ? "bg-green-500/10 border-green-500/30" : "bg-red-500/10 border-red-500/30"}`}
              >
                <p className="text-sm font-semibold text-foreground">{signal.decision}</p>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}

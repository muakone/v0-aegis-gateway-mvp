"use client"

import { useAuth } from "@/lib/auth-context"
import { redirect } from "next/navigation"
import { Card } from "@/components/ui/card"
import { Globe, Wifi, Clock, Shield } from "lucide-react"

export default function AccessIntelligence() {
  const { user } = useAuth()

  if (!user) redirect("/login")

  const contextSignals = [
    {
      category: "Geolocation",
      icon: Globe,
      status: "normal",
      details: {
        current: "New York, US (40.71°N, 74.00°W)",
        previous: "New York, US",
        distance: "0 miles",
        travelTime: "Instant",
        riskFactor: "Normal location",
      },
    },
    {
      category: "Network",
      icon: Wifi,
      status: "warning",
      details: {
        type: "Home WiFi (Personal)",
        security: "WPA3",
        reputation: "Trusted",
        ipReputation: "Clean",
        riskFactor: "Personal network detected",
      },
    },
    {
      category: "Time Context",
      icon: Clock,
      status: "normal",
      details: {
        currentTime: "2:30 PM, Wednesday",
        businessHours: "Yes (9 AM - 6 PM)",
        dayType: "Weekday",
        normalAccessTime: "Yes",
        riskFactor: "Normal access time",
      },
    },
    {
      category: "Device Context",
      icon: Shield,
      status: "normal",
      details: {
        device: "MacBook Pro",
        osHealth: "Current (macOS 14.6)",
        trustScore: "92%",
        lastUpdated: "2 hours ago",
        riskFactor: "Device trusted",
      },
    },
  ]

  const accessDecisionBreakdown = [
    { signal: "Identity Verification", weight: 25, score: 0.95, status: "Verified" },
    { signal: "Device Trust", weight: 30, score: 0.92, status: "Healthy" },
    { signal: "Behavioral Pattern", weight: 25, score: 0.88, status: "Normal" },
    { signal: "Context Signals", weight: 20, score: 0.85, status: "Favorable" },
  ]

  const overallTrustScore = 0.9

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-6xl mx-auto p-4">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-foreground">Access Intelligence</h1>
          <p className="text-muted-foreground">Real-time context-aware access analysis</p>
        </div>

        {/* Overall Trust Score */}
        <Card className="mb-6 p-8 border-border/50 bg-gradient-to-r from-purple-500/10 to-cyan-500/10">
          <div className="flex items-end gap-6">
            <div>
              <p className="text-muted-foreground mb-2">Current Trust Score</p>
              <div className="flex items-baseline gap-2">
                <span className="text-5xl font-bold text-gradient bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
                  {(overallTrustScore * 100).toFixed(0)}%
                </span>
                <span className="text-muted-foreground">Access: Granted</span>
              </div>
            </div>
            <div className="flex-1">
              <div className="w-full h-3 bg-muted/50 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-green-500 to-cyan-500 rounded-full"
                  style={{ width: `${overallTrustScore * 100}%` }}
                />
              </div>
              <p className="text-xs text-muted-foreground mt-2">All signals favorable - access granted</p>
            </div>
          </div>
        </Card>

        {/* Context Signals Grid */}
        <h2 className="text-xl font-bold text-foreground mb-4">Context Signals</h2>
        <div className="grid md:grid-cols-2 gap-4 mb-6">
          {contextSignals.map((signal, i) => {
            const Icon = signal.icon
            return (
              <Card key={i} className="p-6 border-border/50">
                <div className="flex items-start gap-3 mb-4">
                  <Icon
                    className={`w-5 h-5 ${
                      signal.status === "normal"
                        ? "text-green-400"
                        : signal.status === "warning"
                          ? "text-yellow-400"
                          : "text-red-400"
                    }`}
                  />
                  <h3 className="font-semibold text-foreground">{signal.category}</h3>
                </div>

                <div className="space-y-2">
                  {Object.entries(signal.details).map(([key, value]) => (
                    <div key={key} className="flex items-start justify-between p-2 rounded bg-muted/30">
                      <span className="text-xs text-muted-foreground capitalize">
                        {key.replace(/([A-Z])/g, " $1")}:
                      </span>
                      <span className="text-sm font-medium text-foreground text-right">{value}</span>
                    </div>
                  ))}
                </div>
              </Card>
            )
          })}
        </div>

        {/* Trust Score Breakdown */}
        <Card className="p-6 border-border/50">
          <h3 className="text-lg font-semibold text-foreground mb-4">Access Decision Breakdown</h3>

          <div className="space-y-4">
            {accessDecisionBreakdown.map((item, i) => (
              <div key={i} className="space-y-2">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-foreground">{item.signal}</p>
                    <p className="text-xs text-muted-foreground">Weight: {item.weight}%</p>
                  </div>
                  <span
                    className={`text-sm font-bold px-2 py-1 rounded ${
                      item.score >= 0.9 ? "bg-green-500/20 text-green-400" : "bg-yellow-500/20 text-yellow-400"
                    }`}
                  >
                    {(item.score * 100).toFixed(0)}%
                  </span>
                </div>
                <div className="w-full h-2 bg-muted/50 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full ${
                      item.score >= 0.9
                        ? "bg-gradient-to-r from-green-500 to-emerald-500"
                        : "bg-gradient-to-r from-yellow-500 to-orange-500"
                    }`}
                    style={{ width: `${item.score * 100}%` }}
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 p-4 rounded-lg bg-green-500/10 border border-green-500/30 flex items-start gap-3">
            <Shield className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
            <div>
              <p className="font-medium text-foreground">Access Decision: GRANTED</p>
              <p className="text-sm text-muted-foreground mt-1">
                All context signals are favorable. Your identity is verified, device is healthy, behavior is normal, and
                contextual factors support access.
              </p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  )
}

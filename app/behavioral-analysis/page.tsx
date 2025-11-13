"use client"

import { useState } from "react"
import { Brain, TrendingUp, Activity, AlertCircle } from "lucide-react"
import { Card } from "@/components/ui/card"
import { useAuthStore } from "@/lib/auth-context"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"

interface BehaviorProfile {
  userId: string
  userName: string
  baselineScore: number
  currentScore: number
  anomalies: number
  trends: Array<{ time: string; risk: number }>
}

export default function BehavioralAnalysisPage() {
  const { user } = useAuthStore()
  const [selectedUser, setSelectedUser] = useState<string | null>(null)

  const behaviorProfiles: BehaviorProfile[] = [
    {
      userId: "91a5b102-92c1-4ad3-bf07-5e7df1b547b3",
      userName: "Grace Chen",
      baselineScore: 0.75,
      currentScore: 0.45,
      anomalies: 3,
      trends: [
        { time: "12AM", risk: 0.2 },
        { time: "6AM", risk: 0.18 },
        { time: "12PM", risk: 0.75 },
        { time: "3PM", risk: 0.83 },
        { time: "6PM", risk: 0.72 },
        { time: "9PM", risk: 0.65 },
        { time: "12AM", risk: 0.58 },
      ],
    },
    {
      userId: "3e1d8f24-90c6-47a0-8fcb-bb9d2c4f8e42",
      userName: "Olamide Adeyemi",
      baselineScore: 0.94,
      currentScore: 0.89,
      anomalies: 1,
      trends: [
        { time: "12AM", risk: 0.05 },
        { time: "6AM", risk: 0.04 },
        { time: "12PM", risk: 0.08 },
        { time: "3PM", risk: 0.12 },
        { time: "6PM", risk: 0.06 },
        { time: "9PM", risk: 0.05 },
        { time: "12AM", risk: 0.04 },
      ],
    },
  ]

  const anomalyPatterns = [
    {
      id: 1,
      pattern: "Access at Unusual Times",
      description: "User accessing systems outside normal business hours",
      severity: "Medium",
      frequency: "2 times this week",
      action: "Monitor",
    },
    {
      id: 2,
      pattern: "Geolocation Jump",
      description: "Login from geographically impossible location in short timeframe",
      severity: "Critical",
      frequency: "1 occurrence",
      action: "Block & Investigate",
    },
    {
      id: 3,
      pattern: "Device Mismatch",
      description: "User accessing from previously unknown device",
      severity: "High",
      frequency: "3 times this month",
      action: "Require Verification",
    },
    {
      id: 4,
      pattern: "Data Exfiltration Pattern",
      description: "Unusual volume/type of data downloaded or exported",
      severity: "Critical",
      frequency: "Not detected recently",
      action: "Alert & Isolate",
    },
  ]

  const selectedProfile = behaviorProfiles.find((p) => p.userId === selectedUser)

  return (
    <div className="min-h-screen bg-background text-foreground p-8">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold flex items-center gap-3">
            <Brain className="w-10 h-10 text-accent" />
            Behavioral Analysis Engine (UEBA)
          </h1>
          <p className="text-muted-foreground mt-2">
            User and Entity Behavior Analytics - Detects anomalies in real-time
          </p>
        </div>

        {/* User Selection */}
        <div className="grid grid-cols-2 gap-4 mb-8">
          {behaviorProfiles.map((profile) => (
            <Card
              key={profile.userId}
              onClick={() => setSelectedUser(profile.userId)}
              className={`p-4 cursor-pointer border transition-all ${
                selectedUser === profile.userId
                  ? "border-accent bg-accent/10"
                  : "border-purple-500/30 hover:border-purple-500/50"
              }`}
            >
              <h3 className="font-semibold mb-2">{profile.userName}</h3>
              <div className="space-y-1 text-sm">
                <p className="text-muted-foreground">
                  Baseline Score:{" "}
                  <span className="font-semibold text-foreground">{(profile.baselineScore * 100).toFixed(0)}%</span>
                </p>
                <p className="text-muted-foreground">
                  Current Score:{" "}
                  <span
                    className={
                      profile.currentScore < profile.baselineScore - 0.2
                        ? "text-red-400 font-semibold"
                        : "text-green-400 font-semibold"
                    }
                  >
                    {(profile.currentScore * 100).toFixed(0)}%
                  </span>
                </p>
                <p className="text-muted-foreground">
                  Active Anomalies: <span className="font-semibold text-orange-400">{profile.anomalies}</span>
                </p>
              </div>
            </Card>
          ))}
        </div>

        {selectedProfile && (
          <>
            {/* Behavior Trend Chart */}
            <Card className="p-6 border-purple-500/30 mb-8">
              <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-accent" />
                24-Hour Risk Trend
              </h2>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={selectedProfile.trends}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(139, 92, 246, 0.1)" />
                  <XAxis dataKey="time" stroke="rgba(139, 92, 246, 0.5)" />
                  <YAxis stroke="rgba(139, 92, 246, 0.5)" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#0a0a0a",
                      border: "1px solid rgba(139, 92, 246, 0.3)",
                      borderRadius: "8px",
                    }}
                  />
                  <Line type="monotone" dataKey="risk" stroke="#8b5cf6" dot={{ fill: "#06b6d4" }} strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
              <p className="text-sm text-muted-foreground mt-4">
                Risk spikes indicate behavioral deviations from established baseline patterns
              </p>
            </Card>

            {/* Behavior Insights */}
            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <Card className="p-6 border-purple-500/30">
                <h3 className="font-semibold mb-4">Baseline Profile</h3>
                <div className="space-y-3">
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">Normal Login Hours</p>
                    <p className="font-semibold">9AM - 6PM EST</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">Primary Location</p>
                    <p className="font-semibold">New York, US</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">Typical Device</p>
                    <p className="font-semibold">Windows Laptop</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">Average Daily Accesses</p>
                    <p className="font-semibold">45-60 transactions</p>
                  </div>
                </div>
              </Card>

              <Card className="p-6 border-orange-500/30 bg-orange-500/5">
                <h3 className="font-semibold mb-4">Current Deviations</h3>
                <div className="space-y-3">
                  <div className="flex items-start gap-2">
                    <AlertCircle className="w-4 h-4 text-orange-400 mt-1 flex-shrink-0" />
                    <div>
                      <p className="font-semibold text-sm">Login outside normal hours</p>
                      <p className="text-xs text-muted-foreground">11:30 PM yesterday</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <AlertCircle className="w-4 h-4 text-red-400 mt-1 flex-shrink-0" />
                    <div>
                      <p className="font-semibold text-sm">Geolocation anomaly</p>
                      <p className="text-xs text-muted-foreground">Kenya login after NY login</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <AlertCircle className="w-4 h-4 text-orange-400 mt-1 flex-shrink-0" />
                    <div>
                      <p className="font-semibold text-sm">Unusual data access</p>
                      <p className="text-xs text-muted-foreground">280% above normal volume</p>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          </>
        )}

        {/* Anomaly Detection Patterns */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Anomaly Detection Patterns</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {anomalyPatterns.map((pattern) => (
              <Card
                key={pattern.id}
                className={`p-6 border transition-all ${
                  pattern.severity === "Critical"
                    ? "border-red-500/30 bg-red-500/5"
                    : pattern.severity === "High"
                      ? "border-orange-500/30 bg-orange-500/5"
                      : "border-yellow-500/30 bg-yellow-500/5"
                }`}
              >
                <div className="flex items-start justify-between mb-2">
                  <h3 className="font-semibold">{pattern.pattern}</h3>
                  <span
                    className={`text-xs px-2 py-1 rounded font-semibold ${
                      pattern.severity === "Critical"
                        ? "bg-red-500/20 text-red-400"
                        : pattern.severity === "High"
                          ? "bg-orange-500/20 text-orange-400"
                          : "bg-yellow-500/20 text-yellow-400"
                    }`}
                  >
                    {pattern.severity}
                  </span>
                </div>
                <p className="text-muted-foreground text-sm mb-3">{pattern.description}</p>
                <div className="space-y-2 text-sm bg-background/50 p-3 rounded border border-purple-500/20">
                  <p className="text-muted-foreground">Frequency: {pattern.frequency}</p>
                  <p className="font-semibold text-accent">Action: {pattern.action}</p>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* How It Works */}
        <Card className="p-6 border-purple-500/30 bg-purple-500/5">
          <h3 className="font-semibold text-lg mb-3 flex items-center gap-2">
            <Activity className="w-5 h-5 text-accent" />
            How Behavioral Analysis Works
          </h3>
          <div className="space-y-2 text-sm text-muted-foreground">
            <p>1. Aegis learns each user's normal behavior over 30-day baseline period</p>
            <p>2. Real-time activity compared against baseline using machine learning models</p>
            <p>3. Anomalies scored based on deviation magnitude and risk context</p>
            <p>4. High-risk anomalies trigger immediate alerts and automated responses</p>
            <p>5. System continuously learns and adapts to evolving behavior patterns</p>
          </div>
        </Card>
      </div>
    </div>
  )
}

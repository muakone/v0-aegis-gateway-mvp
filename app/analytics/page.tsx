"use client"

import { useAuth } from "@/lib/auth-context"
import { redirect } from "next/navigation"
import { Card } from "@/components/ui/card"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"
import { TrendingUp, Users, Lock, AlertCircle } from "lucide-react"

export default function Analytics() {
  const { user } = useAuth()

  if (!user) redirect("/login")
  if (user.role === "User") redirect("/employee")

  const accessPatterns = [
    { hour: "12am", success: 5, failed: 0 },
    { hour: "3am", success: 2, failed: 1 },
    { hour: "6am", success: 8, failed: 0 },
    { hour: "9am", success: 120, failed: 5 },
    { hour: "12pm", success: 95, failed: 2 },
    { hour: "3pm", success: 110, failed: 3 },
    { hour: "6pm", success: 85, failed: 1 },
    { hour: "9pm", success: 45, failed: 2 },
  ]

  const topResources = [
    { resource: "Financial Reports", accesses: 342, failed: 8, avgTime: "12ms" },
    { resource: "Threat Intelligence", accesses: 218, failed: 3, avgTime: "28ms" },
    { resource: "User Management", accesses: 145, failed: 2, avgTime: "5ms" },
    { resource: "Compliance Logs", accesses: 98, failed: 1, avgTime: "8ms" },
    { resource: "Security Audit", accesses: 87, failed: 0, avgTime: "15ms" },
  ]

  const insiderThreats = [
    {
      user: "Grace Chen",
      riskScore: 0.72,
      reason: "Excessive privilege escalation requests",
      incidents: 3,
      trend: "up",
    },
    {
      user: "Unknown User",
      riskScore: 0.65,
      reason: "Bulk data download attempt",
      incidents: 2,
      trend: "stable",
    },
  ]

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto p-4">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-foreground">Advanced Analytics & Insights</h1>
          <p className="text-muted-foreground">Access patterns, resource usage, and insider threat detection</p>
        </div>

        {/* KPIs */}
        <div className="grid md:grid-cols-4 gap-4 mb-6">
          <Card className="p-4 border-border/50">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Access Attempts</p>
                <p className="text-2xl font-bold text-foreground">1,247</p>
                <p className="text-xs text-green-400 mt-1">+12% vs last week</p>
              </div>
              <Users className="w-6 h-6 text-accent opacity-50" />
            </div>
          </Card>
          <Card className="p-4 border-border/50">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Success Rate</p>
                <p className="text-2xl font-bold text-green-400">98.6%</p>
                <p className="text-xs text-green-400 mt-1">+1.2% vs last week</p>
              </div>
              <Lock className="w-6 h-6 text-green-400 opacity-50" />
            </div>
          </Card>
          <Card className="p-4 border-border/50">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Failed Attempts</p>
                <p className="text-2xl font-bold text-red-400">18</p>
                <p className="text-xs text-red-400 mt-1">Threats blocked</p>
              </div>
              <AlertCircle className="w-6 h-6 text-red-400 opacity-50" />
            </div>
          </Card>
          <Card className="p-4 border-border/50">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Avg Response Time</p>
                <p className="text-2xl font-bold text-foreground">23ms</p>
                <p className="text-xs text-green-400 mt-1">vs 150ms VPN</p>
              </div>
              <TrendingUp className="w-6 h-6 text-accent opacity-50" />
            </div>
          </Card>
        </div>

        {/* Access Patterns Chart */}
        <Card className="mb-6 p-6 border-border/50">
          <h3 className="text-lg font-semibold text-foreground mb-4">Access Patterns (24h) - Success vs Failed</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={accessPatterns}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(139, 92, 246, 0.1)" />
              <XAxis dataKey="hour" stroke="rgba(139, 92, 246, 0.3)" />
              <YAxis stroke="rgba(139, 92, 246, 0.3)" />
              <Tooltip
                contentStyle={{
                  backgroundColor: "rgba(15, 23, 42, 0.95)",
                  border: "1px solid rgba(139, 92, 246, 0.3)",
                }}
              />
              <Legend />
              <Bar dataKey="success" fill="rgba(34, 197, 94, 0.8)" radius={[8, 8, 0, 0]} />
              <Bar dataKey="failed" fill="rgba(239, 68, 68, 0.8)" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </Card>

        <div className="grid md:grid-cols-2 gap-4">
          {/* Top Resources */}
          <Card className="p-6 border-border/50">
            <h3 className="text-lg font-semibold text-foreground mb-4">Most Accessed Resources</h3>
            <div className="space-y-3">
              {topResources.map((resource, i) => (
                <div key={i} className="flex items-center justify-between p-3 rounded-lg bg-muted/30">
                  <div className="flex-1">
                    <p className="font-medium text-foreground">{resource.resource}</p>
                    <p className="text-xs text-muted-foreground">
                      {resource.accesses} accesses • {resource.avgTime} avg time
                    </p>
                  </div>
                  <span className={`text-sm font-bold ${resource.failed > 0 ? "text-yellow-400" : "text-green-400"}`}>
                    {resource.failed} failed
                  </span>
                </div>
              ))}
            </div>
          </Card>

          {/* Insider Threat Monitoring */}
          <Card className="p-6 border-border/50 bg-gradient-to-br from-red-500/5 to-orange-500/5">
            <h3 className="text-lg font-semibold text-foreground mb-4">Insider Threat Detection</h3>
            <div className="space-y-3">
              {insiderThreats.map((threat, i) => (
                <div key={i} className="p-3 rounded-lg bg-muted/30 border border-red-500/20">
                  <div className="flex items-start justify-between mb-2">
                    <p className="font-medium text-foreground">{threat.user}</p>
                    <span className="text-xs font-bold px-2 py-1 rounded bg-red-500/20 text-red-400">
                      {(threat.riskScore * 100).toFixed(0)}% Risk
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground mb-2">{threat.reason}</p>
                  <p className="text-xs text-yellow-400">
                    {threat.incidents} suspicious incidents detected - {threat.trend}
                  </p>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}

"use client"

import { useState } from "react"
import { DashboardNav } from "@/components/dashboard-nav"
import { ProtectedLayout } from "@/components/auth-provider"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { BarChart, Bar, PieChart, Pie, Cell, ResponsiveContainer, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts"
import { mockDevices, mockAnomalies, mockAccessLogs, mockPanicEvents } from "@/lib/mock-data"
import { AlertTriangle, Users, Monitor, TrendingUp, CheckCircle, XCircle } from "lucide-react"

export default function DashboardPage() {
  const [threatAlert, setThreatAlert] = useState(false)
  const [alertText, setAlertText] = useState("")

  const deviceHealth = [
    {
      name: "Healthy",
      value: mockDevices.filter((d) => d.status === "Healthy").length,
      color: "#00d9ff",
    },
    {
      name: "At Risk",
      value: mockDevices.filter((d) => d.status === "At Risk" || d.status === "Compromised").length,
      color: "#ff0055",
    },
  ]

  const accessStats = [
    { name: "Granted", value: mockAccessLogs.filter((l) => l.decision === "Granted").length },
    { name: "Blocked", value: mockAccessLogs.filter((l) => l.decision === "Blocked").length },
  ]

  const handleSimulateThreaat = () => {
    setThreatAlert(true)
    setAlertText(`AEGIS GATEWAY ALERT
━━━━━━━━━━━━━━━━━━━━━━━━━━━
Critical anomaly detected from user:

GRACE | Windows Laptop
IP: 197.248.51.78
Location: Kenya

Anomaly Score: 0.89
Risk Level: CRITICAL

→ Session Revoked
→ Device Blocked
→ Security Team Notified
→ MFA Challenge Issued`)

    setTimeout(() => setThreatAlert(false), 5000)
  }

  return (
    <ProtectedLayout allowedRoles={["Admin"]}>
      <div className="min-h-screen bg-background text-foreground">
        <DashboardNav role="Admin" />

        {threatAlert && (
          <div className="fixed inset-0 z-40 flex items-center justify-center p-4 scan-in">
            <div className="absolute inset-0 bg-red-500/10 backdrop-blur-sm" />
            <div className="relative bg-gradient-to-br from-red-900/20 to-orange-900/20 border-2 border-red-500 rounded-lg p-8 max-w-md font-mono text-sm whitespace-pre-wrap text-red-200">
              {alertText}
            </div>
          </div>
        )}

        <div className="pt-24 pb-12 px-4 max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold mb-2">Security Dashboard</h1>
            <p className="text-muted-foreground">Real-time threat monitoring and access control</p>
          </div>

          {/* Overview Cards */}
          <div className="grid md:grid-cols-4 gap-4 mb-8">
            <Card className="p-6 border-purple-500/30 bg-gradient-to-br from-blue-500/10 to-cyan-500/10">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-muted-foreground text-sm mb-1">Active Users</p>
                  <p className="text-3xl font-bold">3</p>
                </div>
                <Users className="w-8 h-8 text-blue-400" />
              </div>
            </Card>

            <Card className="p-6 border-purple-500/30 bg-gradient-to-br from-green-500/10 to-emerald-500/10">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-muted-foreground text-sm mb-1">Connected Devices</p>
                  <p className="text-3xl font-bold">{mockDevices.length}</p>
                </div>
                <Monitor className="w-8 h-8 text-green-400" />
              </div>
            </Card>

            <Card className="p-6 border-purple-500/30 bg-gradient-to-br from-orange-500/10 to-yellow-500/10">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-muted-foreground text-sm mb-1">Active Alerts</p>
                  <p className="text-3xl font-bold">{mockAnomalies.length}</p>
                </div>
                <AlertTriangle className="w-8 h-8 text-orange-400" />
              </div>
            </Card>

            <Card className="p-6 border-purple-500/30 bg-gradient-to-br from-red-500/10 to-pink-500/10">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-muted-foreground text-sm mb-1">Risk Level</p>
                  <p className="text-3xl font-bold">Medium</p>
                </div>
                <TrendingUp className="w-8 h-8 text-red-400" />
              </div>
            </Card>
          </div>

          {/* Charts Row */}
          <div className="grid lg:grid-cols-2 gap-8 mb-8">
            {/* Device Health */}
            <Card className="p-6 border-purple-500/30">
              <h3 className="font-semibold mb-6">Device Health Status</h3>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={deviceHealth}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, value }) => `${name}: ${value}`}
                    outerRadius={100}
                    fill="#8b5cf6"
                    dataKey="value"
                  >
                    {deviceHealth.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </Card>

            {/* Access Status */}
            <Card className="p-6 border-purple-500/30">
              <h3 className="font-semibold mb-6">Access Control Status</h3>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={accessStats}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(139, 92, 246, 0.1)" />
                  <XAxis dataKey="name" stroke="rgba(255, 255, 255, 0.5)" />
                  <YAxis stroke="rgba(255, 255, 255, 0.5)" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "rgba(12, 12, 12, 0.8)",
                      border: "1px solid rgba(139, 92, 246, 0.5)",
                    }}
                  />
                  <Bar dataKey="value" fill="url(#colorGradient)" radius={[8, 8, 0, 0]} />
                  <defs>
                    <linearGradient id="colorGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#8b5cf6" stopOpacity={1} />
                      <stop offset="100%" stopColor="#06b6d4" stopOpacity={1} />
                    </linearGradient>
                  </defs>
                </BarChart>
              </ResponsiveContainer>
            </Card>
          </div>

          {/* Data Tables */}
          <div className="grid lg:grid-cols-2 gap-8 mb-8">
            {/* Anomalies Feed */}
            <Card className="p-6 border-purple-500/30">
              <h3 className="font-semibold mb-4">Behavior Anomalies</h3>
              <div className="space-y-3">
                {mockAnomalies.map((anomaly) => (
                  <div key={anomaly.id} className="p-4 rounded-lg border border-orange-500/20 bg-orange-500/5">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <p className="font-medium text-sm">{anomaly.user}</p>
                        <p className="text-xs text-muted-foreground">{anomaly.event}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-semibold text-orange-400">{(anomaly.riskScore * 100).toFixed(0)}%</p>
                        <p className="text-xs text-muted-foreground">Risk Score</p>
                      </div>
                    </div>
                    <div className="w-full h-1 bg-orange-500/20 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-orange-400 to-red-400"
                        style={{ width: `${anomaly.riskScore * 100}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            {/* Panic Events */}
            <Card className="p-6 border-purple-500/30">
              <h3 className="font-semibold mb-4">Panic Button Events</h3>
              <div className="space-y-3">
                {mockPanicEvents.map((event) => (
                  <div key={event.id} className="p-4 rounded-lg border border-red-500/20 bg-red-500/5">
                    <div className="flex items-start gap-3">
                      <AlertTriangle className="w-4 h-4 text-red-400 mt-0.5 flex-shrink-0" />
                      <div className="flex-1">
                        <p className="font-medium text-sm">{event.user}</p>
                        <p className="text-xs text-muted-foreground">{event.reason}</p>
                        <p className="text-xs text-red-400 mt-1">{new Date(event.timestamp).toLocaleString()}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>

          {/* Access Log Table */}
          <Card className="p-6 border-purple-500/30">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold">Recent Access Attempts</h3>
              <Button
                onClick={handleSimulateThreaat}
                variant="outline"
                className="border-red-500/50 text-red-400 hover:bg-red-500/10 bg-transparent"
              >
                <AlertTriangle className="w-4 h-4 mr-2" />
                Simulate Threat
              </Button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-purple-500/20">
                    <th className="text-left py-3 px-4 font-semibold text-muted-foreground">User</th>
                    <th className="text-left py-3 px-4 font-semibold text-muted-foreground">Device</th>
                    <th className="text-left py-3 px-4 font-semibold text-muted-foreground">IP Address</th>
                    <th className="text-left py-3 px-4 font-semibold text-muted-foreground">Status</th>
                    <th className="text-left py-3 px-4 font-semibold text-muted-foreground">Risk</th>
                  </tr>
                </thead>
                <tbody>
                  {mockAccessLogs.map((log) => (
                    <tr key={log.id} className="border-b border-purple-500/10 hover:bg-purple-500/5">
                      <td className="py-3 px-4">{log.user}</td>
                      <td className="py-3 px-4">{log.device}</td>
                      <td className="py-3 px-4 font-mono text-xs">{log.ip}</td>
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-2">
                          {log.decision === "Granted" ? (
                            <>
                              <CheckCircle className="w-4 h-4 text-green-400" />
                              <span className="text-green-400">Granted</span>
                            </>
                          ) : (
                            <>
                              <XCircle className="w-4 h-4 text-red-400" />
                              <span className="text-red-400">Blocked</span>
                            </>
                          )}
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-2">
                          <div className="w-12 h-1.5 bg-purple-500/20 rounded-full overflow-hidden">
                            <div
                              className="h-full bg-gradient-to-r from-cyan-400 to-purple-600"
                              style={{ width: `${log.riskScore * 100}%` }}
                            />
                          </div>
                          <span className="text-xs">{(log.riskScore * 100).toFixed(0)}%</span>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </div>
      </div>
    </ProtectedLayout>
  )
}

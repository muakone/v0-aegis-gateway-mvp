"use client"

import { useState } from "react"
import { DashboardNav } from "@/components/dashboard-nav"
import { ProtectedLayout } from "@/components/auth-provider"
import { useAuthStore } from "@/lib/auth-context"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { mockAccessLogs, mockAnomalies } from "@/lib/mock-data"
import { CheckCircle, AlertTriangle, Shield, Activity, Clock, MapPin, AlertCircle, TrendingUp } from "lucide-react"

export default function UserPortalPage() {
  const user = useAuthStore((state) => state.user)
  const [panicked, setPanicked] = useState(false)
  const [showLockdown, setShowLockdown] = useState(false)

  if (!user) return null

  const userAccessLogs = mockAccessLogs.filter((log) => log.user === user.name)
  const userAnomalies = mockAnomalies.filter((anom) => anom.user === user.name)

  const handlePanicButton = () => {
    setPanicked(true)
    setShowLockdown(true)

    setTimeout(() => {
      setShowLockdown(false)
    }, 3000)

    setTimeout(() => {
      setPanicked(false)
    }, 5000)
  }

  // Determine device health based on mock data
  const deviceHealth = user.name === "Grace" ? "Unhealthy" : "Healthy"
  const deviceStatus = deviceHealth === "Healthy" ? "green" : "red"

  return (
    <ProtectedLayout allowedRoles={["User"]}>
      <div className="min-h-screen bg-background text-foreground">
        <DashboardNav role="User" />

        {showLockdown && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 scan-in">
            <div className="absolute inset-0 bg-red-500/20 backdrop-blur-sm animate-pulse" />
            <div className="relative text-center">
              <div className="animate-spin mb-4">
                <Shield className="w-16 h-16 mx-auto text-red-400" />
              </div>
              <h2 className="text-3xl font-bold mb-2 text-red-400">System Lockdown</h2>
              <p className="text-lg text-red-300 font-mono">Account secured. Emergency protocols activated.</p>
            </div>
          </div>
        )}

        <div className="pt-24 pb-12 px-4 max-w-4xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold mb-2">Your Security Portal</h1>
            <p className="text-muted-foreground">Monitor your device health and access activity</p>
          </div>

          {/* Status Cards */}
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            {/* Device Health */}
            <Card
              className={`p-6 border-${deviceStatus === "green" ? "green" : "red"}-500/30 bg-gradient-to-br ${
                deviceStatus === "green" ? "from-green-500/10 to-emerald-500/10" : "from-red-500/10 to-orange-500/10"
              }`}
            >
              <div className="flex items-start justify-between mb-4">
                <div>
                  <p className="text-muted-foreground text-sm mb-1">Device Status</p>
                  <p className="text-2xl font-bold">{deviceHealth}</p>
                </div>
                <Shield className={`w-8 h-8 ${deviceStatus === "green" ? "text-green-400" : "text-red-400"}`} />
              </div>
              <p className="text-xs text-muted-foreground">
                {deviceStatus === "green" ? "All security checks passed" : "Action required - update OS"}
              </p>
            </Card>

            {/* Behavior Score */}
            <Card className="p-6 border-purple-500/30 bg-gradient-to-br from-purple-500/10 to-pink-500/10">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <p className="text-muted-foreground text-sm mb-1">Behavior Score</p>
                  <p className="text-2xl font-bold">
                    {userAnomalies.length > 0 ? (userAnomalies[0].score * 100).toFixed(0) : 15}%
                  </p>
                </div>
                <TrendingUp className="w-8 h-8 text-purple-400" />
              </div>
              <p className="text-xs text-muted-foreground">
                {userAnomalies.length > 0 ? "Anomalies detected" : "Normal activity pattern"}
              </p>
            </Card>

            {/* Access Status */}
            <Card className="p-6 border-purple-500/30 bg-gradient-to-br from-blue-500/10 to-cyan-500/10">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <p className="text-muted-foreground text-sm mb-1">Access Status</p>
                  <p className="text-2xl font-bold">
                    {userAccessLogs.filter((l) => l.status === "Granted").length}/{userAccessLogs.length}
                  </p>
                </div>
                <Activity className="w-8 h-8 text-blue-400" />
              </div>
              <p className="text-xs text-muted-foreground">Requests allowed</p>
            </Card>
          </div>

          {/* Panic Button */}
          <div className="mb-8">
            <Button
              onClick={handlePanicButton}
              disabled={panicked}
              className={`w-full py-8 text-lg font-bold ${
                panicked
                  ? "bg-red-600 hover:bg-red-700"
                  : "bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600"
              } text-white animate-pulse`}
            >
              <AlertCircle className="w-5 h-5 mr-2" />
              {panicked ? "ACCOUNT SECURED" : "PANIC BUTTON - Emergency Lockdown"}
            </Button>
            <p className="text-xs text-muted-foreground mt-2 text-center">
              Click to instantly lock your account and notify security team if you suspect compromise
            </p>
          </div>

          {/* Recent Access */}
          <Card className="p-6 border-purple-500/30 mb-8">
            <h3 className="font-semibold mb-4">Recent Access History</h3>
            <div className="space-y-3">
              {userAccessLogs.length > 0 ? (
                userAccessLogs.map((log) => (
                  <div
                    key={log.id}
                    className="p-4 rounded-lg border border-purple-500/20 hover:border-purple-500/40 transition-colors"
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-medium">{log.device}</span>
                          <div className="flex items-center gap-1 px-2 py-0.5 rounded bg-purple-500/10 border border-purple-500/20">
                            <Clock className="w-3 h-3" />
                            <span className="text-xs text-muted-foreground">
                              {new Date(log.timestamp).toLocaleTimeString()}
                            </span>
                          </div>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <MapPin className="w-3 h-3" />
                          {log.ip}
                        </div>
                      </div>
                      <div className="text-right">
                        {log.status === "Granted" ? (
                          <div className="flex items-center gap-1 text-green-400">
                            <CheckCircle className="w-4 h-4" />
                            <span className="text-xs font-medium">Granted</span>
                          </div>
                        ) : (
                          <div className="flex items-center gap-1 text-red-400">
                            <AlertTriangle className="w-4 h-4" />
                            <span className="text-xs font-medium">Blocked</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-sm text-muted-foreground text-center py-4">No access history available</p>
              )}
            </div>
          </Card>

          {/* Anomalies */}
          {userAnomalies.length > 0 && (
            <Card className="p-6 border-orange-500/30 bg-gradient-to-br from-orange-500/5 to-red-500/5">
              <h3 className="font-semibold mb-4 flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-orange-400" />
                Detected Anomalies
              </h3>
              <div className="space-y-3">
                {userAnomalies.map((anomaly) => (
                  <div key={anomaly.id} className="p-4 rounded-lg border border-orange-500/20">
                    <div className="flex items-start justify-between mb-2">
                      <p className="font-medium text-sm">{anomaly.event}</p>
                      <p className="text-sm font-bold text-orange-400">{(anomaly.score * 100).toFixed(0)}%</p>
                    </div>
                    <div className="w-full h-1.5 bg-orange-500/20 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-orange-400 to-red-400"
                        style={{ width: `${anomaly.score * 100}%` }}
                      />
                    </div>
                    <p className="text-xs text-muted-foreground mt-2">{new Date(anomaly.timestamp).toLocaleString()}</p>
                  </div>
                ))}
              </div>
            </Card>
          )}

          {/* Device Details */}
          <Card className="p-6 border-purple-500/30 mt-8">
            <h3 className="font-semibold mb-4">Device Information</h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="p-4 rounded-lg border border-purple-500/20 bg-purple-500/5">
                <p className="text-muted-foreground text-sm mb-1">Device Name</p>
                <p className="font-semibold">{user.device}</p>
              </div>
              <div className="p-4 rounded-lg border border-purple-500/20 bg-purple-500/5">
                <p className="text-muted-foreground text-sm mb-1">User ID</p>
                <p className="font-mono text-xs">{user.id}</p>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </ProtectedLayout>
  )
}

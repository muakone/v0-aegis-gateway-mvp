"use client"

import { useAuth } from "@/lib/auth-context"
import { redirect } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Heart, Lock, AlertTriangle, CheckCircle, Clock, Shield, LogOut, Activity, TrendingUp } from "lucide-react"
import { useState } from "react"
import Link from "next/link"

export default function EmployeePortal() {
  const { user, logout } = useAuth()
  const [panicActive, setPanicActive] = useState(false)

  if (!user) redirect("/login")
  if (user.role === "Admin") redirect("/dashboard")

  const deviceHealth = {
    status: "Healthy",
    trustScore: 0.92,
    osVersion: "macOS 14.6",
    firewall: "Enabled",
    encryption: "Active",
    antivirus: "Current",
    lastUpdated: "Nov 13, 2:30 PM",
  }

  const accessRequests = [
    {
      id: 1,
      resource: "Financial Reports",
      status: "Pending",
      requestedAt: "Today at 2:00 PM",
      expiresAt: "Today at 6:00 PM",
      approval: "Awaiting manager review",
      justification: "Quarterly financial reconciliation",
    },
    {
      id: 2,
      resource: "Customer Database",
      status: "Approved",
      requestedAt: "Nov 12",
      expiresAt: "Nov 15",
      approval: "Approved by: Sarah Johnson",
      justification: "Customer support analysis",
    },
  ]

  const recentActivity = [
    { id: 1, action: "Accessed Financial Reports", time: "2 hours ago", status: "success", riskLevel: "Low" },
    {
      id: 2,
      action: "Denied: Customer Data (Device at risk)",
      time: "1 hour ago",
      status: "blocked",
      riskLevel: "High",
    },
    { id: 3, action: "Attempted access from Kenya", time: "30 minutes ago", status: "blocked", riskLevel: "Critical" },
  ]

  const handlePanicButton = () => {
    setPanicActive(true)
    setTimeout(() => {
      setPanicActive(false)
      logout()
    }, 2000)
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Aegis Gateway</h1>
            <p className="text-sm text-muted-foreground">Employee Portal</p>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-sm text-muted-foreground">{user.name}</span>
            <Button
              variant="outline"
              size="sm"
              onClick={logout}
              className="text-muted-foreground hover:text-foreground bg-transparent"
            >
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-4">
        {/* Panic Button - Prominent */}
        <div className="mb-6 grid md:grid-cols-3 gap-4">
          <div className="md:col-span-1">
            <button
              onClick={handlePanicButton}
              className={`w-full h-32 rounded-lg border-2 border-red-500/50 flex flex-col items-center justify-center gap-2 transition-all ${
                panicActive
                  ? "bg-red-500 text-white scale-105 shadow-xl shadow-red-500/50"
                  : "bg-red-500/10 text-red-400 hover:bg-red-500/20 hover:border-red-500"
              }`}
            >
              <Heart className="w-8 h-8" />
              <span className="font-semibold text-center px-2">{panicActive ? "Locking down..." : "Panic Button"}</span>
              <span className="text-xs opacity-75">Emergency lockdown</span>
            </button>
          </div>

          {/* Device Status */}
          <Card className="md:col-span-2 p-6 border-border/50">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-lg font-semibold text-foreground">Device Health</h3>
                <p className="text-sm text-muted-foreground">Your device security status</p>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-6 h-6 text-green-400" />
                <span className="text-sm font-semibold text-green-400">{deviceHealth.status}</span>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {[
                { label: "Trust Score", value: `${(deviceHealth.trustScore * 100).toFixed(0)}%`, icon: Shield },
                { label: "Firewall", value: deviceHealth.firewall, icon: Lock },
                { label: "Encryption", value: deviceHealth.encryption, icon: Lock },
                { label: "OS Version", value: deviceHealth.osVersion, icon: Shield },
                { label: "Antivirus", value: deviceHealth.antivirus, icon: CheckCircle },
              ].map((item, i) => {
                const Icon = item.icon
                return (
                  <div key={i} className="p-3 rounded-lg bg-muted/30 border border-border/50">
                    <div className="flex items-center gap-2 mb-1">
                      <Icon className="w-4 h-4 text-accent" />
                      <span className="text-xs text-muted-foreground">{item.label}</span>
                    </div>
                    <p className="text-sm font-semibold text-foreground">{item.value}</p>
                  </div>
                )
              })}
            </div>
            <p className="text-xs text-muted-foreground mt-3">Last updated: {deviceHealth.lastUpdated}</p>
          </Card>
        </div>

        {/* Quick Links to New Features */}
        <div className="mb-6 grid md:grid-cols-4 gap-3">
          <Link href="/onboarding">
            <Card className="p-4 border-border/50 hover:border-accent cursor-pointer transition-colors h-full">
              <Activity className="w-5 h-5 text-accent mb-2" />
              <h4 className="text-sm font-semibold text-foreground">Onboard Device</h4>
              <p className="text-xs text-muted-foreground mt-1">Register new device</p>
            </Card>
          </Link>
          <Link href="/risk-intelligence">
            <Card className="p-4 border-border/50 hover:border-accent cursor-pointer transition-colors h-full">
              <TrendingUp className="w-5 h-5 text-accent mb-2" />
              <h4 className="text-sm font-semibold text-foreground">Risk Profile</h4>
              <p className="text-xs text-muted-foreground mt-1">View detailed risk breakdown</p>
            </Card>
          </Link>
          <Link href="/analytics">
            <Card className="p-4 border-border/50 hover:border-accent cursor-pointer transition-colors h-full">
              <CheckCircle className="w-5 h-5 text-accent mb-2" />
              <h4 className="text-sm font-semibold text-foreground">Analytics</h4>
              <p className="text-xs text-muted-foreground mt-1">Access patterns & insights</p>
            </Card>
          </Link>
          <Link href="/compliance-automation">
            <Card className="p-4 border-border/50 hover:border-accent cursor-pointer transition-colors h-full">
              <Shield className="w-5 h-5 text-accent mb-2" />
              <h4 className="text-sm font-semibold text-foreground">Compliance</h4>
              <p className="text-xs text-muted-foreground mt-1">Audit trail & status</p>
            </Card>
          </Link>
        </div>

        {/* Access Requests */}
        <Card className="mb-6 p-6 border-border/50">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-lg font-semibold text-foreground">My Access Requests</h3>
              <p className="text-sm text-muted-foreground">Just-in-time access with time limits</p>
            </div>
            <Link href="/requests">
              <Button className="bg-gradient-to-r from-purple-500 to-cyan-500 hover:from-purple-600 hover:to-cyan-600">
                <Clock className="w-4 h-4 mr-2" />
                Request Access
              </Button>
            </Link>
          </div>

          <div className="space-y-2">
            {accessRequests.map((req) => (
              <div
                key={req.id}
                className="flex items-center justify-between p-3 rounded-lg bg-muted/30 border border-border/50"
              >
                <div className="flex-1">
                  <p className="font-medium text-foreground">{req.resource}</p>
                  <div className="flex gap-4 text-xs text-muted-foreground mt-1">
                    <span>Requested: {req.requestedAt}</span>
                    <span>Expires: {req.expiresAt}</span>
                    <span className="text-accent">{req.approval}</span>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1 italic">Reason: {req.justification}</p>
                </div>
                <div className="flex items-center gap-2">
                  <span
                    className={`text-xs font-semibold px-2 py-1 rounded ${
                      req.status === "Pending" ? "bg-yellow-500/20 text-yellow-400" : "bg-green-500/20 text-green-400"
                    }`}
                  >
                    {req.status}
                  </span>
                  {req.status === "Pending" && <Clock className="w-4 h-4 text-yellow-400" />}
                  {req.status === "Approved" && <CheckCircle className="w-4 h-4 text-green-400" />}
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Recent Activity */}
        <Card className="p-6 border-border/50">
          <h3 className="text-lg font-semibold text-foreground mb-4">Recent Activity & Risk Events</h3>
          <div className="space-y-3">
            {recentActivity.map((activity) => (
              <div
                key={activity.id}
                className="flex items-start gap-3 p-3 rounded-lg bg-muted/30 border border-border/50"
              >
                <div className="mt-1">
                  {activity.status === "success" && <CheckCircle className="w-4 h-4 text-green-400" />}
                  {activity.status === "blocked" && <AlertTriangle className="w-4 h-4 text-red-400" />}
                </div>
                <div className="flex-1">
                  <p className="font-medium text-foreground">{activity.action}</p>
                  <div className="flex items-center gap-3 text-xs text-muted-foreground mt-1">
                    <span>{activity.time}</span>
                    <span
                      className={`px-2 py-0.5 rounded font-semibold ${
                        activity.riskLevel === "Low"
                          ? "bg-green-500/20 text-green-400"
                          : activity.riskLevel === "High"
                            ? "bg-yellow-500/20 text-yellow-400"
                            : "bg-red-500/20 text-red-400"
                      }`}
                    >
                      {activity.riskLevel} Risk
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  )
}

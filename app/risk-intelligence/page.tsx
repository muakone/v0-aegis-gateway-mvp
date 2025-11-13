"use client"

import { useAuth } from "@/lib/auth-context"
import { redirect } from "next/navigation"
import { Card } from "@/components/ui/card"
import { TrendingUp, AlertTriangle, Zap } from "lucide-react"

export default function RiskIntelligence() {
  const { user } = useAuth()

  if (!user) redirect("/login")
  if (user.role === "User") redirect("/employee")

  const riskBreakdowns = [
    {
      userName: "Grace Chen",
      overallRisk: 0.54,
      status: "Medium Risk",
      lastUpdated: "Nov 13, 2:30 PM",
      decision: "Blocked from Payroll System",
      breakdown: {
        device: {
          score: 0.65,
          label: "Device Trust",
          factors: ["Firewall disabled", "OS outdated", "No encryption"],
          weight: 40,
        },
        behavior: { score: 0.28, label: "Behavior", factors: ["Normal pattern", "Routine access"], weight: 20 },
        context: { score: 0.83, label: "Context", factors: ["Impossible travel", "Unusual network"], weight: 30 },
        identity: { score: 0.12, label: "Identity", factors: ["MFA verified", "Known device"], weight: 10 },
      },
    },
    {
      userName: "Olamide Adeyemi",
      overallRisk: 0.08,
      status: "Low Risk",
      lastUpdated: "Nov 13, 2:25 PM",
      decision: "Granted All Access",
      breakdown: {
        device: { score: 0.05, label: "Device Trust", factors: ["All systems optimal"], weight: 40 },
        behavior: { score: 0.08, label: "Behavior", factors: ["Normal pattern"], weight: 20 },
        context: { score: 0.05, label: "Context", factors: ["Office location", "Business hours"], weight: 30 },
        identity: { score: 0.02, label: "Identity", factors: ["MFA verified", "Admin role"], weight: 10 },
      },
    },
  ]

  const riskFactorDetails = [
    {
      factor: "Device Compliance",
      highRiskCount: 2,
      description: "2 devices missing critical security patches",
      remediation: "Auto-patching scheduled for tonight",
      icon: AlertTriangle,
      color: "text-red-400",
    },
    {
      factor: "Behavioral Anomalies",
      highRiskCount: 1,
      description: "1 account showing impossible travel pattern",
      remediation: "User notified, requires re-authentication",
      icon: TrendingUp,
      color: "text-orange-400",
    },
    {
      factor: "Access Velocity",
      highRiskCount: 0,
      description: "No excessive privilege escalation detected",
      remediation: "All activity within normal parameters",
      icon: Zap,
      color: "text-green-400",
    },
  ]

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-6xl mx-auto p-4">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-foreground">Risk Intelligence</h1>
          <p className="text-muted-foreground">Detailed risk breakdown and access decision explanation</p>
        </div>

        {/* Risk Factor Summary */}
        <div className="grid md:grid-cols-3 gap-4 mb-6">
          {riskFactorDetails.map((item, i) => {
            const Icon = item.icon
            return (
              <Card key={i} className="p-4 border-border/50">
                <div className="flex items-start gap-3">
                  <Icon className={`w-5 h-5 ${item.color}`} />
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-foreground">{item.factor}</p>
                    <p className="text-xs text-muted-foreground mt-1">{item.description}</p>
                    <p className="text-xs text-accent mt-1 italic">Action: {item.remediation}</p>
                    <p className={`text-lg font-bold mt-2 ${item.color}`}>{item.highRiskCount}</p>
                  </div>
                </div>
              </Card>
            )
          })}
        </div>

        {/* User Risk Breakdown */}
        <h2 className="text-xl font-bold text-foreground mb-4">User Risk Profiles & Access Decisions</h2>
        <div className="space-y-4">
          {riskBreakdowns.map((profile, i) => (
            <Card key={i} className="p-6 border-border/50">
              <div className="flex items-start justify-between mb-6">
                <div>
                  <h3 className="text-lg font-semibold text-foreground">{profile.userName}</h3>
                  <p className="text-sm text-muted-foreground">{profile.status}</p>
                  <p className="text-xs text-accent mt-1">Decision: {profile.decision}</p>
                </div>
                <div className="text-right">
                  <p className="text-3xl font-bold text-foreground">{(profile.overallRisk * 100).toFixed(0)}</p>
                  <p className="text-xs text-muted-foreground">Overall Risk Score</p>
                  <p className="text-xs text-muted-foreground mt-2">Updated: {profile.lastUpdated}</p>
                </div>
              </div>

              {/* Risk Breakdown Grid */}
              <div className="grid md:grid-cols-4 gap-3 mb-4">
                {Object.entries(profile.breakdown).map(([key, component]) => (
                  <div key={key} className="p-4 rounded-lg bg-muted/30 border border-border/50">
                    <div className="flex items-center justify-between mb-2">
                      <p className="text-xs text-muted-foreground">{component.label}</p>
                      <span className="text-xs px-2 py-0.5 rounded bg-muted/50 text-muted-foreground">
                        {component.weight}% weight
                      </span>
                    </div>
                    <p className="text-2xl font-bold text-foreground">{(component.score * 100).toFixed(0)}%</p>
                    <div className="mt-2 h-2 bg-muted/50 rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full ${
                          component.score < 0.3
                            ? "bg-green-500"
                            : component.score < 0.6
                              ? "bg-yellow-500"
                              : "bg-red-500"
                        }`}
                        style={{ width: `${component.score * 100}%` }}
                      />
                    </div>
                    <ul className="mt-2 space-y-1">
                      {component.factors.map((factor, k) => (
                        <li key={k} className="text-xs text-muted-foreground">
                          • {factor}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>

              {/* Decision Logic */}
              <div className="p-4 rounded-lg bg-purple-500/5 border border-purple-500/20">
                <p className="text-xs font-semibold text-foreground mb-2">Risk Calculation Formula:</p>
                <p className="text-xs text-muted-foreground">
                  Overall Risk = (Device: 0.65 × 40%) + (Behavior: 0.28 × 20%) + (Context: 0.83 × 30%) + (Identity: 0.12
                  × 10%) = {(profile.overallRisk * 100).toFixed(0)}%
                </p>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}

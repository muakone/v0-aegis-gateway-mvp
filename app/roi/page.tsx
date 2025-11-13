"use client"

import { useAuth } from "@/lib/auth-context"
import { redirect } from "next/navigation"
import { Card } from "@/components/ui/card"
import { CheckCircle, XCircle, TrendingUp, DollarSign, Clock, Shield } from "lucide-react"

export default function ROIDashboard() {
  const { user } = useAuth()

  if (!user) redirect("/login")
  if (user.role === "User") redirect("/employee")

  const comparison = [
    {
      metric: "Network Latency",
      vpn: "150ms average",
      zeroTrust: "15ms average",
      winner: "zeroTrust",
      impact: "10x faster data access",
    },
    {
      metric: "Device Security Context",
      vpn: "No device verification",
      zeroTrust: "Real-time health checks",
      winner: "zeroTrust",
      impact: "Prevents compromised device access",
    },
    {
      metric: "Behavioral Analytics",
      vpn: "None - all-or-nothing",
      zeroTrust: "Continuous monitoring",
      winner: "zeroTrust",
      impact: "Detects anomalies instantly",
    },
    {
      metric: "Architecture",
      vpn: "Perimeter-based (assume trust)",
      zeroTrust: "Zero Trust (assume breach)",
      winner: "zeroTrust",
      impact: "Protected even if network compromised",
    },
    {
      metric: "Panic Button / Emergency Lockdown",
      vpn: "Not available",
      zeroTrust: "Instant device isolation",
      winner: "zeroTrust",
      impact: "Immediate response to threats",
    },
  ]

  const metrics = {
    productivity: {
      latencyDiff: 135,
      hoursRecovered: 46,
      employeeCount: 500,
      annualHoursRecovered: 23000,
      productivity: "23%",
    },
    security: {
      incidentsPreventedMonthly: 12,
      avgResponseTime: "12 min",
      costPerIncident: "$45,000",
      monthlySavings: "$540,000",
    },
    compliance: {
      auditTimeReduced: "40%",
      automatedAuditTrails: "100%",
      frameworksCovered: 4,
      complianceChecksCost: "$125,000",
    },
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-6xl mx-auto p-4">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-foreground">VPN vs Zero Trust ROI</h1>
          <p className="text-muted-foreground">Aegis Gateway vs Traditional VPN comparison</p>
        </div>

        {/* Comparison Table */}
        <Card className="mb-6 p-6 border-border/50 overflow-x-auto">
          <h3 className="text-lg font-semibold text-foreground mb-4">Feature Comparison</h3>
          <div className="space-y-2">
            {comparison.map((item, i) => (
              <div key={i} className="grid md:grid-cols-4 gap-4 p-4 rounded-lg bg-muted/30 border border-border/50">
                <div className="md:col-span-1">
                  <p className="font-medium text-foreground text-sm">{item.metric}</p>
                </div>
                <div className="flex items-center gap-2">
                  <XCircle className="w-4 h-4 text-red-400" />
                  <p className="text-xs text-muted-foreground">{item.vpn}</p>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-400" />
                  <p className="text-xs text-muted-foreground">{item.zeroTrust}</p>
                </div>
                <div className="text-right">
                  <p className="text-xs font-semibold text-green-400">{item.impact}</p>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* ROI Metrics */}
        <h2 className="text-xl font-bold text-foreground mb-4">ROI & Business Impact</h2>
        <div className="grid md:grid-cols-3 gap-4 mb-6">
          {/* Productivity */}
          <Card className="p-6 border-border/50 bg-gradient-to-br from-blue-500/5 to-cyan-500/5">
            <Clock className="w-6 h-6 text-blue-400 mb-4" />
            <h3 className="font-semibold text-foreground mb-2">Productivity Gains</h3>
            <div className="space-y-3">
              <div>
                <p className="text-xs text-muted-foreground">Latency Reduction</p>
                <p className="text-2xl font-bold text-blue-400">{metrics.productivity.latencyDiff}ms</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Hours Recovered / Employee / Year</p>
                <p className="text-2xl font-bold text-foreground">{metrics.productivity.hoursRecovered}h</p>
              </div>
              <div className="p-3 rounded-lg bg-blue-500/10 border border-blue-500/20">
                <p className="text-xs text-blue-400">Annual Impact (500 employees)</p>
                <p className="text-lg font-bold text-foreground">
                  {metrics.productivity.annualHoursRecovered.toLocaleString()}h
                </p>
              </div>
            </div>
          </Card>

          {/* Security */}
          <Card className="p-6 border-border/50 bg-gradient-to-br from-green-500/5 to-emerald-500/5">
            <Shield className="w-6 h-6 text-green-400 mb-4" />
            <h3 className="font-semibold text-foreground mb-2">Security Benefits</h3>
            <div className="space-y-3">
              <div>
                <p className="text-xs text-muted-foreground">Incidents Prevented / Month</p>
                <p className="text-2xl font-bold text-green-400">{metrics.security.incidentsPreventedMonthly}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Avg Response Time</p>
                <p className="text-2xl font-bold text-foreground">{metrics.security.avgResponseTime}</p>
              </div>
              <div className="p-3 rounded-lg bg-green-500/10 border border-green-500/20">
                <p className="text-xs text-green-400">Monthly Cost Savings</p>
                <p className="text-lg font-bold text-foreground">{metrics.security.monthlySavings}</p>
              </div>
            </div>
          </Card>

          {/* Compliance */}
          <Card className="p-6 border-border/50 bg-gradient-to-br from-purple-500/5 to-pink-500/5">
            <DollarSign className="w-6 h-6 text-purple-400 mb-4" />
            <h3 className="font-semibold text-foreground mb-2">Compliance Automation</h3>
            <div className="space-y-3">
              <div>
                <p className="text-xs text-muted-foreground">Audit Time Reduced</p>
                <p className="text-2xl font-bold text-purple-400">{metrics.compliance.auditTimeReduced}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Automated Audit Trails</p>
                <p className="text-2xl font-bold text-foreground">{metrics.compliance.automatedAuditTrails}</p>
              </div>
              <div className="p-3 rounded-lg bg-purple-500/10 border border-purple-500/20">
                <p className="text-xs text-purple-400">Annual Compliance Savings</p>
                <p className="text-lg font-bold text-foreground">{metrics.compliance.complianceChecksCost}</p>
              </div>
            </div>
          </Card>
        </div>

        {/* Summary */}
        <Card className="p-6 border-border/50 bg-gradient-to-r from-purple-500/10 to-cyan-500/10">
          <div className="flex items-start gap-4">
            <TrendingUp className="w-6 h-6 text-accent flex-shrink-0 mt-1" />
            <div>
              <h3 className="text-lg font-semibold text-foreground mb-2">Total Annual ROI</h3>
              <p className="text-3xl font-bold text-gradient bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent mb-2">
                $1.2M+
              </p>
              <p className="text-muted-foreground">
                Based on 500-person organization with current incident rates. Includes productivity gains, security
                incident prevention, and compliance automation benefits.
              </p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  )
}

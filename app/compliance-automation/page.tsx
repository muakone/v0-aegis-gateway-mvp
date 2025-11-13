"use client"

import { useAuth } from "@/lib/auth-context"
import { redirect } from "next/navigation"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { CheckCircle, AlertCircle, Download, Calendar, BarChart3 } from "lucide-react"

export default function ComplianceAutomation() {
  const { user } = useAuth()

  if (!user) redirect("/login")
  if (user.role === "User") redirect("/employee")

  const frameworks = [
    {
      name: "SOC 2 Type II",
      score: 94,
      status: "Compliant",
      automatedChecks: 12,
      manualReviews: 2,
      nextAudit: "April 15, 2026",
      auditTrailEntries: 2847,
      autoRemediation: "100%",
      findings: [],
    },
    {
      name: "ISO 27001",
      score: 91,
      status: "Compliant",
      automatedChecks: 24,
      manualReviews: 3,
      nextAudit: "March 1, 2026",
      auditTrailEntries: 3156,
      autoRemediation: "87%",
      findings: [
        { id: 1, description: "One device missing latest patches", severity: "Low", status: "Auto-remediating" },
      ],
    },
    {
      name: "HIPAA",
      score: 96,
      status: "Compliant",
      automatedChecks: 18,
      manualReviews: 2,
      nextAudit: "February 20, 2026",
      auditTrailEntries: 1924,
      autoRemediation: "100%",
      findings: [],
    },
    {
      name: "PCI DSS",
      score: 89,
      status: "Non-Compliant",
      automatedChecks: 16,
      manualReviews: 4,
      nextAudit: "December 1, 2025",
      auditTrailEntries: 2341,
      autoRemediation: "62%",
      findings: [
        {
          id: 1,
          description: "Payment card data requires additional encryption",
          severity: "High",
          status: "In progress",
        },
        { id: 2, description: "Audit logs need 7-year retention policy", severity: "Medium", status: "Scheduled" },
      ],
    },
  ]

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-6xl mx-auto p-4">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-foreground">Compliance Automation</h1>
          <p className="text-muted-foreground">
            Real-time compliance monitoring with auto-remediation and audit trails
          </p>
        </div>

        {/* Overall Compliance Score */}
        <Card className="mb-6 p-6 border-border/50 bg-gradient-to-r from-green-500/10 to-emerald-500/10">
          <div className="flex items-end justify-between">
            <div>
              <p className="text-muted-foreground mb-2">Overall Compliance Score</p>
              <p className="text-5xl font-bold bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">
                92.5%
              </p>
              <p className="text-sm text-muted-foreground mt-2">Real-time automated scoring</p>
            </div>
            <div className="text-right">
              <div className="mb-4">
                <p className="text-sm text-muted-foreground mb-2">Frameworks Monitored</p>
                <p className="text-2xl font-bold text-foreground">4</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-2">Audit Trail Events</p>
                <p className="text-2xl font-bold text-foreground">10.3K</p>
              </div>
            </div>
          </div>
        </Card>

        {/* Compliance Frameworks */}
        <h2 className="text-xl font-bold text-foreground mb-4">Frameworks & Compliance Status</h2>
        <div className="grid md:grid-cols-2 gap-4">
          {frameworks.map((framework, i) => (
            <Card
              key={i}
              className={`p-6 border-border/50 ${
                framework.score >= 92
                  ? "bg-gradient-to-br from-green-500/5 to-emerald-500/5"
                  : "bg-gradient-to-br from-yellow-500/5 to-orange-500/5"
              }`}
            >
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-lg font-semibold text-foreground">{framework.name}</h3>
                  <div className="flex items-center gap-2 mt-1">
                    {framework.score >= 92 ? (
                      <CheckCircle className="w-4 h-4 text-green-400" />
                    ) : (
                      <AlertCircle className="w-4 h-4 text-yellow-400" />
                    )}
                    <span className="text-sm text-muted-foreground">{framework.status}</span>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-3xl font-bold text-foreground">{framework.score}%</p>
                  <p className="text-xs text-muted-foreground">Compliance Score</p>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="mb-4">
                <div className="w-full h-3 bg-muted/50 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full ${
                      framework.score >= 92
                        ? "bg-gradient-to-r from-green-500 to-emerald-500"
                        : "bg-gradient-to-r from-yellow-500 to-orange-500"
                    }`}
                    style={{ width: `${framework.score}%` }}
                  />
                </div>
              </div>

              {/* Enhanced Checks Summary */}
              <div className="grid grid-cols-3 gap-2 p-3 rounded-lg bg-muted/30 mb-4">
                <div>
                  <p className="text-xs text-muted-foreground">Automated Checks</p>
                  <p className="text-sm font-semibold text-foreground">{framework.automatedChecks}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Auto-Remediation</p>
                  <p className="text-sm font-semibold text-foreground">{framework.autoRemediation}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Audit Events</p>
                  <p className="text-sm font-semibold text-foreground">{framework.auditTrailEntries}</p>
                </div>
              </div>

              {/* Findings */}
              {framework.findings.length > 0 && (
                <div className="mb-4 p-3 rounded-lg bg-yellow-500/10 border border-yellow-500/30">
                  <p className="text-xs font-semibold text-yellow-400 mb-2">Findings:</p>
                  {framework.findings.map((finding) => (
                    <div key={finding.id} className="text-xs text-muted-foreground mb-1 flex justify-between">
                      <span>
                        • {finding.description} ({finding.severity})
                      </span>
                      <span className="text-accent text-xs">{finding.status}</span>
                    </div>
                  ))}
                </div>
              )}

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                  <Calendar className="w-3 h-3" />
                  <span>Audit: {framework.nextAudit}</span>
                </div>
                <Button size="sm" variant="outline">
                  <Download className="w-3 h-3 mr-1" />
                  Report
                </Button>
              </div>
            </Card>
          ))}
        </div>

        {/* Remediation & Audit Trail */}
        <Card className="mt-6 p-6 border-border/50">
          <h3 className="text-lg font-bold text-foreground mb-4">Automated Remediation & Audit Trail</h3>
          <div className="space-y-2">
            <div className="flex items-start gap-3 p-3 rounded-lg bg-green-500/10 border border-green-500/20">
              <CheckCircle className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
              <div className="flex-1">
                <p className="text-sm font-medium text-foreground">OS Patches Auto-Applied</p>
                <p className="text-xs text-muted-foreground">Completed on 2 devices - Nov 13, 2:15 PM</p>
              </div>
            </div>
            <div className="flex items-start gap-3 p-3 rounded-lg bg-yellow-500/10 border border-yellow-500/20">
              <AlertCircle className="w-4 h-4 text-yellow-400 mt-0.5 flex-shrink-0" />
              <div className="flex-1">
                <p className="text-sm font-medium text-foreground">PCI DSS: Enable Disk Encryption</p>
                <p className="text-xs text-muted-foreground">
                  Status: Requires manual configuration - Scheduled for Nov 15, 10:00 PM
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3 p-3 rounded-lg bg-blue-500/10 border border-blue-500/20">
              <BarChart3 className="w-4 h-4 text-blue-400 mt-0.5 flex-shrink-0" />
              <div className="flex-1">
                <p className="text-sm font-medium text-foreground">Audit Trail: All activities logged</p>
                <p className="text-xs text-muted-foreground">10,268 events captured - 7-year retention enforced</p>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  )
}

"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { CheckCircle, AlertCircle, Download, Calendar, TrendingUp, Shield, Clock, BarChart3 } from "lucide-react"
import { mockComplianceData } from "@/lib/mock-data"

export default function CompliancePage() {
  const [selectedStandard, setSelectedStandard] = useState<string>("soc2")

  const standards = [
    { id: "soc2", name: "SOC 2 Type II", icon: Shield },
    { id: "iso27001", name: "ISO 27001", icon: Shield },
    { id: "hipaa", name: "HIPAA", icon: Shield },
    { id: "pciDss", name: "PCI-DSS", icon: Shield },
  ]

  const selectedData = (mockComplianceData as any)[selectedStandard]

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <header className="border-b border-purple-500/20 bg-card/50 backdrop-blur-sm sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Compliance & Auditing</h1>
            <p className="text-sm text-muted-foreground mt-1">
              Maintain regulatory compliance and generate audit reports
            </p>
          </div>
          <Button className="bg-purple-600 hover:bg-purple-700">
            <Download className="w-4 h-4 mr-2" />
            Export Reports
          </Button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8 space-y-8">
        {/* Overall Compliance Score */}
        <Card className="p-8 border-purple-500/20 bg-gradient-to-br from-purple-500/10 to-cyan-500/10">
          <div className="flex items-center justify-between mb-6">
            <div>
              <p className="text-sm text-muted-foreground mb-2">Overall Compliance Score</p>
              <p className="text-5xl font-bold text-cyan-400">92%</p>
              <p className="text-sm text-muted-foreground mt-2">Across all standards</p>
            </div>
            <BarChart3 className="w-16 h-16 text-purple-400 opacity-20" />
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-6 border-t border-purple-500/20">
            {[
              { label: "Findings", value: "3", status: "warning" },
              { label: "Open Issues", value: "2", status: "critical" },
              { label: "Resolved", value: "18", status: "success" },
              { label: "Last Audit", value: "30d ago", status: "neutral" },
            ].map((stat, i) => (
              <div key={i} className="text-center">
                <p className="text-xs text-muted-foreground mb-1">{stat.label}</p>
                <p
                  className={`text-2xl font-bold ${
                    stat.status === "success"
                      ? "text-green-400"
                      : stat.status === "critical"
                        ? "text-red-400"
                        : stat.status === "warning"
                          ? "text-yellow-400"
                          : "text-cyan-400"
                  }`}
                >
                  {stat.value}
                </p>
              </div>
            ))}
          </div>
        </Card>

        {/* Compliance Standards */}
        <div>
          <h2 className="text-2xl font-bold mb-4">Compliance Standards</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {standards.map((standard) => {
              const data = (mockComplianceData as any)[standard.id]
              return (
                <Card
                  key={standard.id}
                  onClick={() => setSelectedStandard(standard.id)}
                  className={`p-6 border-purple-500/20 hover:border-purple-500/40 transition-all cursor-pointer ${
                    selectedStandard === standard.id ? "border-purple-500 bg-purple-500/10" : ""
                  }`}
                >
                  <div className="text-center">
                    <div
                      className={`w-12 h-12 rounded-lg mx-auto mb-3 flex items-center justify-center ${
                        data.status === "Compliant" ? "bg-green-500/20" : "bg-red-500/20"
                      }`}
                    >
                      {data.status === "Compliant" ? (
                        <CheckCircle className="w-6 h-6 text-green-400" />
                      ) : (
                        <AlertCircle className="w-6 h-6 text-red-400" />
                      )}
                    </div>
                    <p className="font-semibold text-sm mb-2">{standard.name}</p>
                    <p
                      className={`text-3xl font-bold mb-1 ${
                        data.status === "Compliant" ? "text-green-400" : "text-red-400"
                      }`}
                    >
                      {data.score}%
                    </p>
                    <p className={`text-xs ${data.status === "Compliant" ? "text-green-400/70" : "text-red-400/70"}`}>
                      {data.status}
                    </p>
                  </div>
                </Card>
              )
            })}
          </div>
        </div>

        {/* Detailed Standard View */}
        <Card className="p-6 border-purple-500/20">
          <div className="flex items-start justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold">{standards.find((s) => s.id === selectedStandard)?.name}</h2>
              <p className="text-sm text-muted-foreground mt-1">Detailed compliance status and findings</p>
            </div>
            <div className="text-right">
              <p className="text-3xl font-bold text-cyan-400">{selectedData.score}%</p>
              <p className={`text-sm mt-1 ${selectedData.status === "Compliant" ? "text-green-400" : "text-red-400"}`}>
                {selectedData.status}
              </p>
            </div>
          </div>

          {/* Key Dates */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6 pb-6 border-b border-purple-500/20">
            <div>
              <p className="text-xs text-muted-foreground mb-1">Last Audit</p>
              <p className="font-semibold flex items-center gap-2">
                <Calendar className="w-4 h-4 text-cyan-400" />
                {new Date(selectedData.lastAudit).toLocaleDateString()}
              </p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground mb-1">Next Audit</p>
              <p className="font-semibold flex items-center gap-2">
                <Calendar className="w-4 h-4 text-purple-400" />
                {new Date(selectedData.nextAudit).toLocaleDateString()}
              </p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground mb-1">Days Until Next</p>
              <p className="font-semibold flex items-center gap-2">
                <Clock className="w-4 h-4 text-yellow-400" />
                {Math.floor(
                  (new Date(selectedData.nextAudit).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24),
                )}{" "}
                days
              </p>
            </div>
          </div>

          {/* Findings */}
          <div>
            <h3 className="text-lg font-bold mb-4">Audit Findings</h3>
            {selectedData.findings.length > 0 ? (
              <div className="space-y-3">
                {selectedData.findings.map((finding: any, i: number) => (
                  <div
                    key={finding.id}
                    className={`p-4 rounded-lg border ${
                      finding.severity === "High"
                        ? "border-red-500/30 bg-red-500/5"
                        : "border-yellow-500/30 bg-yellow-500/5"
                    }`}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <p className="font-semibold">{finding.description}</p>
                      <span
                        className={`text-xs px-2 py-1 rounded-full ${
                          finding.severity === "High"
                            ? "bg-red-500/20 text-red-400"
                            : "bg-yellow-500/20 text-yellow-400"
                        }`}
                      >
                        {finding.severity}
                      </span>
                    </div>
                    <Button size="sm" variant="outline" className="text-xs bg-transparent">
                      View Remediation Plan
                    </Button>
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-6 rounded-lg border border-green-500/30 bg-green-500/5 text-center">
                <CheckCircle className="w-12 h-12 mx-auto mb-2 text-green-400" />
                <p className="text-green-400 font-semibold">No findings - Fully compliant</p>
              </div>
            )}
          </div>
        </Card>

        {/* Audit Trail */}
        <Card className="p-6 border-purple-500/20">
          <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
            <TrendingUp className="w-5 h-5" />
            Audit History
          </h2>

          <div className="space-y-3">
            {[
              { date: "2025-11-01", standard: "PCI-DSS", status: "Non-Compliant", score: 89 },
              { date: "2025-10-15", standard: "SOC 2", status: "Compliant", score: 94 },
              { date: "2025-09-01", standard: "ISO 27001", status: "Compliant", score: 91 },
              { date: "2025-08-20", standard: "HIPAA", status: "Compliant", score: 96 },
            ].map((audit, i) => (
              <div
                key={i}
                className="p-4 rounded-lg border border-purple-500/20 hover:border-purple-500/40 transition-colors"
              >
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <p className="font-semibold">{audit.standard} Audit</p>
                    <p className="text-sm text-muted-foreground">{new Date(audit.date).toLocaleDateString()}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-cyan-400">{audit.score}%</p>
                    <p className={`text-xs ${audit.status === "Compliant" ? "text-green-400" : "text-red-400"}`}>
                      {audit.status}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </main>
    </div>
  )
}

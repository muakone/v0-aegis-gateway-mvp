"use client"

import { useAuth } from "@/lib/auth-context"
import { redirect } from "next/navigation"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { AlertTriangle, Clock, CheckCircle, Play, Zap, FileText } from "lucide-react"
import { useState } from "react"

export default function IncidentResponse() {
  const { user } = useAuth()
  const [selectedPlaybook, setSelectedPlaybook] = useState(null)

  if (!user) redirect("/login")
  if (user.role === "User") redirect("/employee")

  const incidents = [
    {
      id: "inc-001",
      title: "Impossible Travel Detected",
      description: "Grace's account shows login from Kenya 8 hours after New York",
      severity: "High",
      timestamp: "Nov 13, 10:22 AM",
      status: "Active",
      playbookTriggered: "Impossible Travel Response",
      currentStep: 2,
      affectedUser: "Grace Chen",
      mttr: "12 min",
      escalationLevel: 2,
      confidenceScore: 0.95,
    },
    {
      id: "inc-002",
      title: "Device Security Degradation",
      description: "Windows laptop firewall disabled and encryption inactive",
      severity: "High",
      timestamp: "Nov 12, 2:00 PM",
      status: "Active",
      playbookTriggered: "Device Compliance",
      currentStep: 1,
      affectedDevice: "Windows Laptop",
      mttr: "8 min",
      escalationLevel: 1,
      confidenceScore: 0.88,
    },
  ]

  const playbookSteps = [
    {
      step: 1,
      action: "Alert user for verification",
      waitTime: "5 min",
      completed: true,
      remediation: "Sent verification code to registered email",
    },
    {
      step: 2,
      action: "Request additional MFA",
      waitTime: "2 min",
      completed: false,
      remediation: "Awaiting biometric authentication",
    },
    {
      step: 3,
      action: "Block sensitive resource access",
      waitTime: "Immediate",
      completed: false,
      remediation: "Will revoke Payroll System access",
    },
    {
      step: 4,
      action: "Notify security team",
      waitTime: "Immediate",
      completed: false,
      remediation: "Alert queued for on-call analyst",
    },
  ]

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto p-4">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-foreground">Incident Response</h1>
          <p className="text-muted-foreground">Automated threat response, escalation, and investigation workflows</p>
        </div>

        <div className="grid md:grid-cols-4 gap-4 mb-6">
          <Card className="p-4 border-border/50 bg-red-500/10">
            <p className="text-sm text-muted-foreground">Active Incidents</p>
            <p className="text-3xl font-bold text-red-400">2</p>
          </Card>
          <Card className="p-4 border-border/50 bg-yellow-500/10">
            <p className="text-sm text-muted-foreground">In Investigation</p>
            <p className="text-3xl font-bold text-yellow-400">3</p>
          </Card>
          <Card className="p-4 border-border/50 bg-green-500/10">
            <p className="text-sm text-muted-foreground">Resolved (30 days)</p>
            <p className="text-3xl font-bold text-green-400">12</p>
          </Card>
          <Card className="p-4 border-border/50 bg-cyan-500/10">
            <p className="text-sm text-muted-foreground">Avg MTTR</p>
            <p className="text-3xl font-bold text-cyan-400">12 min</p>
          </Card>
        </div>

        {/* Active Incidents */}
        <h2 className="text-xl font-bold text-foreground mb-4">Active Incidents</h2>
        <div className="grid md:grid-cols-2 gap-4 mb-6">
          {incidents.map((incident) => (
            <Card
              key={incident.id}
              className="p-6 border-red-500/30 bg-gradient-to-br from-red-500/5 to-orange-500/5 hover:border-red-500/50 transition-colors cursor-pointer"
              onClick={() => setSelectedPlaybook(incident.id)}
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-start gap-3 flex-1">
                  <AlertTriangle className="w-5 h-5 text-red-400 mt-1" />
                  <div>
                    <h3 className="font-semibold text-foreground">{incident.title}</h3>
                    <p className="text-sm text-muted-foreground mt-1">{incident.description}</p>
                  </div>
                </div>
                <span className="text-xs font-bold px-2 py-1 rounded bg-red-500/20 text-red-400">
                  {incident.severity}
                </span>
              </div>

              <div className="grid grid-cols-3 gap-2 p-3 rounded-lg bg-muted/30 mb-4 text-xs">
                <div>
                  <p className="text-muted-foreground">MTTR</p>
                  <p className="font-medium text-foreground">{incident.mttr}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Confidence</p>
                  <p className="font-medium text-foreground">{(incident.confidenceScore * 100).toFixed(0)}%</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Level</p>
                  <p className="font-medium text-foreground">P{incident.escalationLevel}</p>
                </div>
              </div>

              <Button
                variant="outline"
                size="sm"
                className="w-full text-red-400 border-red-500/50 hover:bg-red-500/10 bg-transparent"
              >
                <Play className="w-3 h-3 mr-2" />
                View Response
              </Button>
            </Card>
          ))}
        </div>

        {/* Playbook Execution */}
        {selectedPlaybook && (
          <Card className="p-6 border-border/50 bg-gradient-to-r from-purple-500/5 to-cyan-500/5">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-xl font-bold text-foreground">Automated Response Playbook</h3>
                <p className="text-sm text-muted-foreground">Impossible Travel Response - Auto-escalating</p>
              </div>
              <Button className="bg-gradient-to-r from-green-500 to-emerald-500">
                <Zap className="w-4 h-4 mr-2" />
                Manual Escalate
              </Button>
            </div>

            <div className="space-y-3 mb-6">
              {playbookSteps.map((step, i) => (
                <div
                  key={i}
                  className={`p-4 rounded-lg border ${
                    step.completed
                      ? "bg-green-500/10 border-green-500/30"
                      : i < playbookSteps.findIndex((s) => !s.completed)
                        ? "bg-green-500/5 border-green-500/20"
                        : "bg-muted/30 border-border/50"
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-3">
                      {step.completed ? (
                        <CheckCircle className="w-5 h-5 text-green-400" />
                      ) : (
                        <Clock className="w-5 h-5 text-yellow-400" />
                      )}
                      <div>
                        <p className="font-medium text-foreground">
                          Step {step.step}: {step.action}
                        </p>
                        <p className="text-xs text-muted-foreground">Wait: {step.waitTime}</p>
                      </div>
                    </div>
                    {step.completed && <span className="text-xs text-green-400 font-semibold">Done</span>}
                  </div>
                  <p className="text-xs text-muted-foreground ml-8">{step.remediation}</p>
                </div>
              ))}
            </div>

            <div className="p-4 rounded-lg bg-blue-500/10 border border-blue-500/30 flex items-start gap-3">
              <FileText className="w-5 h-5 text-blue-400 mt-0.5 flex-shrink-0" />
              <div>
                <p className="font-medium text-foreground">Investigation & Remediation</p>
                <p className="text-sm text-muted-foreground mt-1">
                  System detected impossible travel (7500 miles in 8 hours) with 95% confidence. Automated response
                  initiated: user alerted for verification, additional MFA requested. If unconfirmed within 5 minutes,
                  system will auto-revoke all active sessions and force password reset. Security team notified for
                  escalation review.
                </p>
              </div>
            </div>
          </Card>
        )}
      </div>
    </div>
  )
}

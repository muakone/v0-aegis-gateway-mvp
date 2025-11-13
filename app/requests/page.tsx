"use client"

import { useAuth } from "@/lib/auth-context"
import { redirect } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Clock, CheckCircle, XCircle, Plus, AlertCircle, TrendingUp, Users } from "lucide-react"
import { useState } from "react"

export default function AccessRequests() {
  const { user } = useAuth()
  const [showNewRequest, setShowNewRequest] = useState(false)

  if (!user) redirect("/login")

  const requests = [
    {
      id: 1,
      resource: "Financial Reports Database",
      status: "Pending",
      priority: "Routine",
      requestedAt: "Nov 13, 2:00 PM",
      expiresAt: "Nov 13, 6:00 PM",
      duration: "4 hours",
      approvers: ["Olamide Adeyemi"],
      reason: "Quarterly financial reconciliation",
      stage: "Awaiting Manager Review",
      riskScore: 0.34,
      requiresApproval: true,
    },
    {
      id: 2,
      resource: "Customer Data Export",
      status: "Approved",
      priority: "Urgent",
      requestedAt: "Nov 12, 9:30 AM",
      expiresAt: "Nov 14, 9:30 AM",
      duration: "48 hours",
      approvedBy: "Manager: John Smith",
      approvalTime: "Nov 12, 10:15 AM",
      reason: "Customer analytics report",
      stage: "Active",
      riskScore: 0.28,
      requiresApproval: true,
      dataAccessed: "2.3 GB",
    },
    {
      id: 3,
      resource: "API Keys Management",
      status: "Denied",
      priority: "Routine",
      requestedAt: "Nov 11, 3:00 PM",
      expiresAt: "N/A",
      reason: "Create new API key",
      denialReason: "Insufficient clearance level for this resource",
      stage: "Denied",
      riskScore: 0.89,
    },
  ]

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-6xl mx-auto p-4">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Access Requests</h1>
            <p className="text-muted-foreground">Just-in-time (JIT) access with time limits & approval workflows</p>
          </div>
          <Button
            onClick={() => setShowNewRequest(!showNewRequest)}
            className="bg-gradient-to-r from-purple-500 to-cyan-500"
          >
            <Plus className="w-4 h-4 mr-2" />
            New Request
          </Button>
        </div>

        {/* Quick Stats */}
        <div className="grid md:grid-cols-3 gap-4 mb-6">
          <Card className="p-4 border-border/50">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-muted-foreground">Active Requests</p>
                <p className="text-2xl font-bold text-foreground">1</p>
              </div>
              <CheckCircle className="w-8 h-8 text-green-400 opacity-50" />
            </div>
          </Card>
          <Card className="p-4 border-border/50">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-muted-foreground">Pending Approval</p>
                <p className="text-2xl font-bold text-foreground">1</p>
              </div>
              <Clock className="w-8 h-8 text-yellow-400 opacity-50" />
            </div>
          </Card>
          <Card className="p-4 border-border/50">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-muted-foreground">Avg Approval Time</p>
                <p className="text-2xl font-bold text-foreground">8 min</p>
              </div>
              <TrendingUp className="w-8 h-8 text-cyan-400 opacity-50" />
            </div>
          </Card>
        </div>

        {/* New Request Form */}
        {showNewRequest && (
          <Card className="mb-6 p-6 border-border/50 bg-gradient-to-r from-purple-500/5 to-cyan-500/5">
            <h3 className="text-lg font-semibold text-foreground mb-4">Request Resource Access (Just-in-Time)</h3>
            <div className="grid md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Resource</label>
                <select className="w-full px-4 py-2 rounded-lg bg-background border border-border focus:border-accent">
                  <option>Select a resource...</option>
                  <option>Financial Reports Database</option>
                  <option>Customer Data Export</option>
                  <option>API Keys Management</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Duration</label>
                <select className="w-full px-4 py-2 rounded-lg bg-background border border-border focus:border-accent">
                  <option>1 hour</option>
                  <option>4 hours</option>
                  <option>8 hours</option>
                  <option>24 hours</option>
                </select>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Justification</label>
              <textarea
                placeholder="Why do you need this access? (Business justification required)"
                className="w-full px-4 py-2 rounded-lg bg-background border border-border focus:border-accent resize-none"
                rows={3}
              />
            </div>
            <div className="bg-muted/20 border border-border/50 rounded-lg p-3 mt-4 mb-4">
              <p className="text-xs text-muted-foreground">
                <AlertCircle className="w-3 h-3 inline mr-1" />
                Access automatically revokes when duration expires
              </p>
            </div>
            <div className="flex gap-2 mt-4">
              <Button className="bg-gradient-to-r from-green-500 to-emerald-500">Submit Request</Button>
              <Button variant="outline" onClick={() => setShowNewRequest(false)}>
                Cancel
              </Button>
            </div>
          </Card>
        )}

        {/* Requests List */}
        <div className="space-y-4">
          {requests.map((req) => {
            const Icon = req.status === "Pending" ? Clock : req.status === "Approved" ? CheckCircle : XCircle

            return (
              <Card key={req.id} className="p-6 border-border/50 hover:border-border transition-colors">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3 flex-1">
                    <Icon
                      className={`w-5 h-5 ${
                        req.status === "Pending"
                          ? "text-yellow-400"
                          : req.status === "Approved"
                            ? "text-green-400"
                            : "text-red-400"
                      }`}
                    />
                    <div>
                      <h3 className="font-semibold text-foreground text-lg">{req.resource}</h3>
                      <p className="text-sm text-muted-foreground">{req.reason}</p>
                    </div>
                  </div>
                  <span
                    className={`text-xs font-bold px-3 py-1 rounded-full ${
                      req.status === "Pending"
                        ? "bg-yellow-500/20 text-yellow-400"
                        : req.status === "Approved"
                          ? "bg-green-500/20 text-green-400"
                          : "bg-red-500/20 text-red-400"
                    }`}
                  >
                    {req.status}
                  </span>
                </div>

                <div className="grid md:grid-cols-2 gap-4 mb-4 p-4 rounded-lg bg-muted/30 border border-border/50">
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">Requested</p>
                    <p className="text-sm font-medium text-foreground">{req.requestedAt}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">Duration</p>
                    <p className="text-sm font-medium text-foreground">{req.duration}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">Stage</p>
                    <p className="text-sm font-medium text-foreground">{req.stage}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">Risk Assessment</p>
                    <div className="flex items-center gap-2">
                      <div className="flex-1 h-2 bg-muted/50 rounded-full overflow-hidden">
                        <div
                          className={`h-full ${
                            req.riskScore < 0.3 ? "bg-green-500" : req.riskScore < 0.7 ? "bg-yellow-500" : "bg-red-500"
                          }`}
                          style={{ width: `${req.riskScore * 100}%` }}
                        />
                      </div>
                      <span className="text-xs text-muted-foreground">{(req.riskScore * 100).toFixed(0)}%</span>
                    </div>
                  </div>
                  {req.status === "Denied" && (
                    <div className="md:col-span-2">
                      <p className="text-xs text-red-400 mb-1">Denial Reason</p>
                      <p className="text-sm font-medium text-foreground">{req.denialReason}</p>
                    </div>
                  )}
                  {req.status === "Approved" && (
                    <>
                      <div>
                        <p className="text-xs text-muted-foreground mb-1">Approved By</p>
                        <p className="text-sm font-medium text-foreground">{req.approvedBy}</p>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground mb-1">Data Accessed</p>
                        <p className="text-sm font-medium text-foreground">{req.dataAccessed}</p>
                      </div>
                    </>
                  )}
                  {req.status === "Pending" && (
                    <div>
                      <p className="text-xs text-muted-foreground mb-1">Awaiting Approval From</p>
                      <p className="text-sm font-medium text-foreground flex items-center gap-1">
                        <Users className="w-3 h-3" /> {req.approvers.join(", ")}
                      </p>
                    </div>
                  )}
                </div>

                {req.status === "Pending" && (
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline">
                      Edit Request
                    </Button>
                    <Button size="sm" variant="outline" className="text-red-400 hover:text-red-300 bg-transparent">
                      Cancel Request
                    </Button>
                  </div>
                )}
              </Card>
            )
          })}
        </div>
      </div>
    </div>
  )
}

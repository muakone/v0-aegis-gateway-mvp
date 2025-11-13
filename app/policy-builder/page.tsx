"use client"

import { useState } from "react"
import { Settings, Plus, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { useAuthStore } from "@/lib/auth-context"

interface Policy {
  id: string
  name: string
  description: string
  conditions: {
    deviceTrust?: number
    requireMFA?: boolean
    location?: string[]
    timeRestrictions?: string
    behaviorScore?: number
  }
  actions: string[]
  enabled: boolean
}

export default function PolicyBuilderPage() {
  const { user } = useAuthStore()
  const [policies, setPolicies] = useState<Policy[]>([
    {
      id: "pol-1",
      name: "Finance Department Secure Access",
      description: "Enforce MFA and device health for Finance team",
      conditions: {
        deviceTrust: 0.8,
        requireMFA: true,
        location: ["US", "UK"],
        timeRestrictions: "9AM-6PM EST",
        behaviorScore: 0.6,
      },
      actions: ["Allow", "Log", "Monitor"],
      enabled: true,
    },
  ])

  const [editingId, setEditingId] = useState<string | null>(null)
  const [newPolicy, setNewPolicy] = useState<Partial<Policy>>({})

  const templates = [
    {
      name: "Admin Access (Strictest)",
      conditions: { deviceTrust: 0.95, requireMFA: true, timeRestrictions: "Business Hours" },
      actions: ["Require-MFA", "Log", "Alert-CISO"],
    },
    {
      name: "Remote Worker",
      conditions: { deviceTrust: 0.7, requireMFA: true, behaviorScore: 0.5 },
      actions: ["Allow", "Monitor", "Log"],
    },
    {
      name: "Guest Access",
      conditions: { deviceTrust: 0.4, requireMFA: true },
      actions: ["Block-Sensitive", "Monitor"],
    },
  ]

  const applyTemplate = (template: any) => {
    setNewPolicy({
      ...template,
      id: `pol-${Date.now()}`,
      enabled: true,
    })
  }

  const savePolicy = () => {
    if (newPolicy.id && newPolicy.name) {
      setPolicies(policies.map((p) => (p.id === newPolicy.id ? (newPolicy as Policy) : p)))
      setNewPolicy({})
      setEditingId(null)
    }
  }

  const deletePolicy = (id: string) => {
    setPolicies(policies.filter((p) => p.id !== id))
  }

  const togglePolicy = (id: string) => {
    setPolicies(policies.map((p) => (p.id === id ? { ...p, enabled: !p.enabled } : p)))
  }

  return (
    <div className="min-h-screen bg-background text-foreground p-8">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold flex items-center gap-3">
            <Settings className="w-10 h-10 text-accent" />
            Zero Trust Policy Builder
          </h1>
          <p className="text-muted-foreground mt-2">
            Create and manage custom access policies with drag-and-drop simplicity
          </p>
        </div>

        {/* Policy Templates */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-4">Quick Start Templates</h2>
          <div className="grid md:grid-cols-3 gap-4">
            {templates.map((template, idx) => (
              <Card
                key={idx}
                className="p-4 border-purple-500/30 hover:border-purple-500/50 cursor-pointer transition-all"
              >
                <h3 className="font-semibold mb-2">{template.name}</h3>
                <div className="text-sm text-muted-foreground space-y-1 mb-3">
                  <p>
                    Device Trust:{" "}
                    {template.conditions.deviceTrust ? `${(template.conditions.deviceTrust * 100).toFixed(0)}%` : "Any"}
                  </p>
                  <p>MFA Required: {template.conditions.requireMFA ? "Yes" : "No"}</p>
                </div>
                <Button
                  size="sm"
                  onClick={() => applyTemplate(template)}
                  className="w-full bg-gradient-to-r from-purple-500 to-cyan-500"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Use Template
                </Button>
              </Card>
            ))}
          </div>
        </div>

        {/* Active Policies */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Active Policies ({policies.length})</h2>
          <div className="space-y-4">
            {policies.map((policy) => (
              <Card
                key={policy.id}
                className={`p-6 border transition-all ${
                  policy.enabled ? "border-green-500/30 bg-green-500/5" : "border-muted opacity-50"
                }`}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg">{policy.name}</h3>
                    <p className="text-muted-foreground text-sm">{policy.description}</p>
                  </div>
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline" onClick={() => togglePolicy(policy.id)}>
                      {policy.enabled ? "Disable" : "Enable"}
                    </Button>
                    <Button size="sm" variant="outline" className="text-red-400 bg-transparent">
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>

                {/* Policy Conditions Visualization */}
                <div className="grid md:grid-cols-2 gap-4 mb-4 p-4 bg-background/50 rounded border border-purple-500/20">
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">Device Trust Threshold</p>
                    <div className="flex items-center gap-2">
                      <div className="flex-1 h-2 bg-background rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-purple-500 to-cyan-500"
                          style={{
                            width: `${(policy.conditions.deviceTrust || 0) * 100}%`,
                          }}
                        />
                      </div>
                      <span className="font-semibold text-sm">
                        {((policy.conditions.deviceTrust || 0) * 100).toFixed(0)}%
                      </span>
                    </div>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">Behavior Score Minimum</p>
                    <div className="flex items-center gap-2">
                      <div className="flex-1 h-2 bg-background rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-purple-500 to-cyan-500"
                          style={{
                            width: `${(policy.conditions.behaviorScore || 0) * 100}%`,
                          }}
                        />
                      </div>
                      <span className="font-semibold text-sm">
                        {((policy.conditions.behaviorScore || 0) * 100).toFixed(0)}%
                      </span>
                    </div>
                  </div>
                </div>

                {/* Policy Details */}
                <div className="grid md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-muted-foreground mb-1">Requirements</p>
                    <div className="flex flex-wrap gap-2">
                      {policy.conditions.requireMFA && (
                        <span className="px-2 py-1 rounded bg-blue-500/20 text-blue-400 text-xs font-semibold">
                          MFA Required
                        </span>
                      )}
                      {policy.conditions.timeRestrictions && (
                        <span className="px-2 py-1 rounded bg-purple-500/20 text-purple-400 text-xs font-semibold">
                          {policy.conditions.timeRestrictions}
                        </span>
                      )}
                      {policy.conditions.location && (
                        <span className="px-2 py-1 rounded bg-cyan-500/20 text-cyan-400 text-xs font-semibold">
                          {policy.conditions.location.join(", ")}
                        </span>
                      )}
                    </div>
                  </div>
                  <div>
                    <p className="text-muted-foreground mb-1">Actions</p>
                    <div className="flex flex-wrap gap-2">
                      {policy.actions.map((action, idx) => (
                        <span
                          key={idx}
                          className="px-2 py-1 rounded bg-green-500/20 text-green-400 text-xs font-semibold"
                        >
                          {action}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Policy Logic Examples */}
        <Card className="p-6 border-purple-500/30 bg-purple-500/5">
          <h3 className="font-semibold text-lg mb-3">Policy Logic Examples</h3>
          <div className="space-y-3 font-mono text-sm">
            <div className="p-3 bg-background/50 rounded border border-purple-500/20">
              <p className="text-accent">IF</p>
              <p className="text-cyan-400 ml-4">
                device_trust {"<"} 70% AND time {">"} 6pm
              </p>
              <p className="text-accent">THEN</p>
              <p className="text-green-400 ml-4">require_mfa AND monitor_activity</p>
            </div>
            <div className="p-3 bg-background/50 rounded border border-purple-500/20">
              <p className="text-accent">IF</p>
              <p className="text-cyan-400 ml-4">behavior_score {"<"} 50% AND geolocation_anomaly</p>
              <p className="text-accent">THEN</p>
              <p className="text-red-400 ml-4">block_access AND alert_security_team</p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  )
}

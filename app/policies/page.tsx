"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Shield, Plus, Edit2, Trash2, Copy, AlertCircle } from "lucide-react"
import { mockPolicies } from "@/lib/mock-data"

export default function PoliciesPage() {
  const [selectedPolicy, setSelectedPolicy] = useState<string | null>(null)

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <header className="border-b border-purple-500/20 bg-card/50 backdrop-blur-sm sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Access Policies</h1>
            <p className="text-sm text-muted-foreground mt-1">Define and manage Zero Trust access policies</p>
          </div>
          <Button className="bg-purple-600 hover:bg-purple-700">
            <Plus className="w-4 h-4 mr-2" />
            Create Policy
          </Button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Active Policies Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <Card className="p-4 border-purple-500/20">
            <p className="text-sm text-muted-foreground mb-1">Total Policies</p>
            <p className="text-2xl font-bold">{mockPolicies.length}</p>
          </Card>
          <Card className="p-4 border-green-500/20 bg-green-500/5">
            <p className="text-sm text-muted-foreground mb-1">Enabled</p>
            <p className="text-2xl font-bold text-green-400">{mockPolicies.filter((p) => p.enabled).length}</p>
          </Card>
          <Card className="p-4 border-purple-500/20">
            <p className="text-sm text-muted-foreground mb-1">Affecting Users</p>
            <p className="text-2xl font-bold">42</p>
          </Card>
        </div>

        {/* Policies List */}
        <div className="space-y-4">
          {mockPolicies.map((policy) => (
            <Card
              key={policy.id}
              onClick={() => setSelectedPolicy(selectedPolicy === policy.id ? null : policy.id)}
              className={`p-6 border-purple-500/20 hover:border-purple-500/40 transition-all cursor-pointer ${
                selectedPolicy === policy.id ? "border-purple-500 bg-purple-500/10" : ""
              }`}
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <Shield className="w-5 h-5 text-purple-400" />
                    <h3 className="text-lg font-semibold">{policy.name}</h3>
                    <span
                      className={`text-xs px-2 py-1 rounded-full ${
                        policy.enabled ? "bg-green-500/20 text-green-400" : "bg-muted text-muted-foreground"
                      }`}
                    >
                      {policy.enabled ? "Enabled" : "Disabled"}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground">{policy.description}</p>
                </div>

                <div className="flex gap-2 opacity-0 hover:opacity-100 transition-opacity">
                  <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-cyan-400">
                    <Copy className="w-4 h-4" />
                  </Button>
                  <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-cyan-400">
                    <Edit2 className="w-4 h-4" />
                  </Button>
                  <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-red-400">
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="flex items-center gap-2 mb-4 text-xs">
                <span className="px-2 py-1 rounded bg-purple-500/20 text-purple-300">{policy.department}</span>
                <span className="px-2 py-1 rounded bg-cyan-500/20 text-cyan-300">{policy.actions.length} actions</span>
              </div>

              {/* Expanded Details */}
              {selectedPolicy === policy.id && (
                <div className="mt-4 pt-4 border-t border-purple-500/20 space-y-4">
                  <div>
                    <p className="text-sm font-semibold mb-2">Actions</p>
                    <div className="flex flex-wrap gap-2">
                      {policy.actions.map((action, i) => (
                        <span
                          key={i}
                          className="text-xs px-3 py-1.5 rounded bg-purple-500/20 border border-purple-500/30 text-purple-300"
                        >
                          {action}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm font-semibold mb-2">Requirements</p>
                      <ul className="text-xs space-y-1 text-muted-foreground">
                        <li className="flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-cyan-400"></span>
                          Device Trust: {Math.round(policy.conditions.requireDeviceTrust * 100)}%+
                        </li>
                        <li className="flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-cyan-400"></span>
                          MFA: {policy.conditions.requireMFA ? "Required" : "Not Required"}
                        </li>
                        <li className="flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-cyan-400"></span>
                          Time: {policy.conditions.timeRestrictions}
                        </li>
                      </ul>
                    </div>

                    <div>
                      <p className="text-sm font-semibold mb-2">Allowed Locations</p>
                      <div className="flex flex-wrap gap-2">
                        {policy.conditions.allowedCountries.map((country, i) => (
                          <span key={i} className="text-xs px-2 py-1 rounded bg-green-500/20 text-green-400">
                            {country}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="p-3 rounded bg-blue-500/10 border border-blue-500/30 flex items-start gap-2 text-xs text-blue-300">
                    <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
                    <span>
                      This policy affects {Math.floor(Math.random() * 50) + 5} users across {policy.department}
                    </span>
                  </div>
                </div>
              )}
            </Card>
          ))}
        </div>
      </main>
    </div>
  )
}

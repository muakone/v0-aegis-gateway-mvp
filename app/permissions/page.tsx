"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Lock, Shield, Plus, CheckCircle, XCircle } from "lucide-react"
import { mockPolicies } from "@/lib/mock-data"

export default function PermissionsPage() {
  const [selectedPolicy, setSelectedPolicy] = useState<string | null>(null)

  const permissionMatrix = {
    Admin: {
      "User Management": true,
      "Device Management": true,
      "Policy Configuration": true,
      "Incident Response": true,
      "Compliance Reports": true,
      "Audit Logs": true,
      "System Settings": true,
    },
    SecurityAnalyst: {
      "User Management": false,
      "Device Management": true,
      "Policy Configuration": false,
      "Incident Response": true,
      "Compliance Reports": false,
      "Audit Logs": true,
      "System Settings": false,
    },
    ComplianceOfficer: {
      "User Management": false,
      "Device Management": false,
      "Policy Configuration": false,
      "Incident Response": false,
      "Compliance Reports": true,
      "Audit Logs": true,
      "System Settings": false,
    },
    Manager: {
      "User Management": true,
      "Device Management": false,
      "Policy Configuration": false,
      "Incident Response": false,
      "Compliance Reports": false,
      "Audit Logs": false,
      "System Settings": false,
    },
    User: {
      "User Management": false,
      "Device Management": false,
      "Policy Configuration": false,
      "Incident Response": false,
      "Compliance Reports": false,
      "Audit Logs": false,
      "System Settings": false,
    },
  }

  const roles = Object.keys(permissionMatrix)

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <header className="border-b border-purple-500/20 bg-card/50 backdrop-blur-sm sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Role-Based Access Control (RBAC)</h1>
            <p className="text-sm text-muted-foreground mt-1">Define permissions for each role</p>
          </div>
          <Button className="bg-purple-600 hover:bg-purple-700">
            <Plus className="w-4 h-4 mr-2" />
            Create Role
          </Button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8 space-y-8">
        {/* Permission Matrix */}
        <Card className="p-6 border-purple-500/20 overflow-x-auto">
          <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
            <Shield className="w-5 h-5" />
            Permission Matrix
          </h2>

          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-purple-500/20">
                <th className="text-left py-3 px-4 font-semibold">Permission</th>
                {roles.map((role) => (
                  <th key={role} className="text-center py-3 px-4 font-semibold">
                    {role}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-purple-500/10">
              {Object.keys((permissionMatrix as any)["Admin"]).map((permission) => (
                <tr key={permission} className="hover:bg-purple-500/5">
                  <td className="py-4 px-4 font-medium">{permission}</td>
                  {roles.map((role) => (
                    <td key={`${role}-${permission}`} className="text-center py-4 px-4">
                      {(permissionMatrix as any)[role][permission] ? (
                        <CheckCircle className="w-5 h-5 text-green-400 mx-auto" />
                      ) : (
                        <XCircle className="w-5 h-5 text-red-400/50 mx-auto" />
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </Card>

        {/* Access Policies */}
        <Card className="p-6 border-purple-500/20">
          <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
            <Lock className="w-5 h-5" />
            Access Policies
          </h2>

          <div className="space-y-3">
            {mockPolicies.map((policy) => (
              <div
                key={policy.id}
                onClick={() => setSelectedPolicy(selectedPolicy === policy.id ? null : policy.id)}
                className={`p-4 rounded-lg border transition-all cursor-pointer ${
                  selectedPolicy === policy.id
                    ? "border-purple-500 bg-purple-500/10"
                    : "border-purple-500/20 hover:border-purple-500/40"
                }`}
              >
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <p className="font-semibold">{policy.name}</p>
                    <p className="text-sm text-muted-foreground">{policy.description}</p>
                  </div>
                  <span
                    className={`text-xs px-2 py-1 rounded-full ${
                      policy.enabled ? "bg-green-500/20 text-green-400" : "bg-muted text-muted-foreground"
                    }`}
                  >
                    {policy.enabled ? "Enabled" : "Disabled"}
                  </span>
                </div>

                {selectedPolicy === policy.id && (
                  <div className="mt-4 pt-4 border-t border-purple-500/20 space-y-3">
                    <div>
                      <p className="text-xs text-muted-foreground mb-2">Actions</p>
                      <div className="flex flex-wrap gap-2">
                        {policy.actions.map((action, i) => (
                          <span key={i} className="text-xs px-2 py-1 rounded bg-purple-500/20 text-purple-300">
                            {action}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground mb-2">Conditions</p>
                      <ul className="text-xs space-y-1 text-muted-foreground">
                        <li>• Device Trust: {Math.round(policy.conditions.requireDeviceTrust * 100)}%+</li>
                        <li>• MFA: {policy.conditions.requireMFA ? "Required" : "Optional"}</li>
                        <li>• Time: {policy.conditions.timeRestrictions}</li>
                        <li>• Allowed Countries: {policy.conditions.allowedCountries.join(", ")}</li>
                      </ul>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </Card>
      </main>
    </div>
  )
}

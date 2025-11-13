"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Smartphone, Search, AlertTriangle, CheckCircle, Lock, Zap, Shield, Settings, Clock } from "lucide-react"
import { mockDevices } from "@/lib/mock-data"

export default function DevicesPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [filterStatus, setFilterStatus] = useState<string | null>(null)
  const [selectedDevice, setSelectedDevice] = useState<string | null>(null)

  const filteredDevices = mockDevices.filter((device) => {
    const matchesSearch =
      device.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      device.owner.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = !filterStatus || device.status === filterStatus
    return matchesSearch && matchesStatus
  })

  const statuses = ["Healthy", "At Risk", "Compromised", "Isolated"]
  const statusColors: Record<string, string> = {
    Healthy: "bg-green-500/20 text-green-400 border-green-500/30",
    "At Risk": "bg-yellow-500/20 text-yellow-400 border-yellow-500/30",
    Compromised: "bg-red-500/20 text-red-400 border-red-500/30",
    Isolated: "bg-gray-500/20 text-gray-400 border-gray-500/30",
  }

  const statusIcons: Record<string, any> = {
    Healthy: CheckCircle,
    "At Risk": AlertTriangle,
    Compromised: AlertTriangle,
    Isolated: Lock,
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <header className="border-b border-purple-500/20 bg-card/50 backdrop-blur-sm sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Device Management</h1>
            <p className="text-sm text-muted-foreground mt-1">
              Monitor and manage device compliance and security posture
            </p>
          </div>
          <Button className="bg-purple-600 hover:bg-purple-700">
            <Smartphone className="w-4 h-4 mr-2" />
            Enroll Device
          </Button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Card className="p-4 border-purple-500/20">
            <p className="text-sm text-muted-foreground mb-1">Total Devices</p>
            <p className="text-2xl font-bold">{mockDevices.length}</p>
          </Card>
          <Card className="p-4 border-green-500/20 bg-green-500/5">
            <p className="text-sm text-muted-foreground mb-1">Healthy</p>
            <p className="text-2xl font-bold text-green-400">
              {mockDevices.filter((d) => d.status === "Healthy").length}
            </p>
          </Card>
          <Card className="p-4 border-yellow-500/20 bg-yellow-500/5">
            <p className="text-sm text-muted-foreground mb-1">At Risk</p>
            <p className="text-2xl font-bold text-yellow-400">
              {mockDevices.filter((d) => d.status === "At Risk").length}
            </p>
          </Card>
          <Card className="p-4 border-red-500/20 bg-red-500/5">
            <p className="text-sm text-muted-foreground mb-1">Compromised</p>
            <p className="text-2xl font-bold text-red-400">
              {mockDevices.filter((d) => d.status === "Compromised").length}
            </p>
          </Card>
        </div>

        {/* Filters */}
        <Card className="p-4 mb-6 border-purple-500/20">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Search devices by name or owner..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 bg-input border-purple-500/20"
                />
              </div>
            </div>
            <div className="flex gap-2">
              {statuses.map((status) => (
                <Button
                  key={status}
                  variant={filterStatus === status ? "default" : "outline"}
                  size="sm"
                  onClick={() => setFilterStatus(filterStatus === status ? null : status)}
                  className={filterStatus === status ? "bg-purple-600" : ""}
                >
                  {status}
                </Button>
              ))}
            </div>
          </div>
        </Card>

        {/* Devices Grid */}
        <div className="grid gap-4">
          {filteredDevices.length > 0 ? (
            filteredDevices.map((device) => {
              const StatusIcon = statusIcons[device.status]
              return (
                <Card
                  key={device.id}
                  onClick={() => setSelectedDevice(selectedDevice === device.id ? null : device.id)}
                  className={`p-6 border-purple-500/20 hover:border-purple-500/40 transition-all cursor-pointer ${
                    selectedDevice === device.id ? "border-purple-500 bg-purple-500/10" : ""
                  }`}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-purple-500 to-cyan-500 flex items-center justify-center">
                        <Smartphone className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <p className="text-lg font-semibold">{device.name}</p>
                        <p className="text-sm text-muted-foreground">
                          {device.model} • {device.serialNumber}
                        </p>
                        <p className="text-xs text-muted-foreground mt-1">Owner: {device.owner}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span
                        className={`text-xs px-2 py-1 rounded-full border flex items-center gap-1 ${statusColors[device.status]}`}
                      >
                        <StatusIcon className="w-3 h-3" />
                        {device.status}
                      </span>
                    </div>
                  </div>

                  {/* Quick Info */}
                  <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-4">
                    <div>
                      <p className="text-xs text-muted-foreground mb-1">OS Version</p>
                      <p className="text-sm font-medium">{device.osVersion}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground mb-1">Trust Score</p>
                      <p
                        className={`text-sm font-bold ${device.trustScore > 0.8 ? "text-green-400" : device.trustScore > 0.5 ? "text-yellow-400" : "text-red-400"}`}
                      >
                        {Math.round(device.trustScore * 100)}%
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground mb-1">Firewall</p>
                      <p
                        className={`text-sm flex items-center gap-1 ${device.firewallStatus === "Enabled" ? "text-green-400" : "text-red-400"}`}
                      >
                        <Shield className="w-3 h-3" />
                        {device.firewallStatus}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground mb-1">Encryption</p>
                      <p
                        className={`text-sm flex items-center gap-1 ${device.encryptionStatus === "Active" ? "text-green-400" : "text-red-400"}`}
                      >
                        <Lock className="w-3 h-3" />
                        {device.encryptionStatus}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground mb-1">Patches</p>
                      <p className={`text-sm flex items-center gap-1 text-cyan-400`}>
                        <Clock className="w-3 h-3" />
                        {new Date(device.lastPatched).toLocaleDateString()}
                      </p>
                    </div>
                  </div>

                  {/* Risk Factors */}
                  {device.riskFactors.length > 0 && (
                    <div className="mb-4">
                      <p className="text-xs text-muted-foreground mb-2">Risk Factors</p>
                      <div className="flex flex-wrap gap-2">
                        {device.riskFactors.map((factor, i) => (
                          <span
                            key={i}
                            className="text-xs px-2 py-1 rounded bg-red-500/20 text-red-400 border border-red-500/30"
                          >
                            {factor}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Expandable Details */}
                  {selectedDevice === device.id && (
                    <div className="mt-4 pt-4 border-t border-purple-500/20 space-y-4">
                      <div>
                        <p className="text-sm font-semibold mb-2">Security Status</p>
                        <div className="grid grid-cols-2 gap-4 text-xs">
                          <div className="p-3 rounded bg-purple-500/5 border border-purple-500/20">
                            <p className="text-muted-foreground mb-1">Antivirus Status</p>
                            <p className={device.antivirusStatus === "Current" ? "text-green-400" : "text-red-400"}>
                              {device.antivirusStatus}
                            </p>
                          </div>
                          <div className="p-3 rounded bg-purple-500/5 border border-purple-500/20">
                            <p className="text-muted-foreground mb-1">Last Patched</p>
                            <p className="text-cyan-400">{new Date(device.lastPatched).toLocaleDateString()}</p>
                          </div>
                        </div>
                      </div>

                      <div className="flex gap-2">
                        <Button variant="outline" size="sm" className="flex-1 bg-transparent">
                          <Settings className="w-4 h-4 mr-2" />
                          Remote Configuration
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          className="flex-1 text-red-400 hover:text-red-400 bg-transparent"
                        >
                          <Zap className="w-4 h-4 mr-2" />
                          Isolate Device
                        </Button>
                      </div>
                    </div>
                  )}
                </Card>
              )
            })
          ) : (
            <Card className="p-8 border-purple-500/20 text-center">
              <Smartphone className="w-12 h-12 mx-auto mb-4 text-muted-foreground opacity-50" />
              <p className="text-muted-foreground">No devices found</p>
            </Card>
          )}
        </div>
      </main>
    </div>
  )
}

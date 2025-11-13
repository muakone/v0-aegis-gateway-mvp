"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { AlertTriangle, TrendingUp, Clock, Shield, Filter } from "lucide-react"
import { mockIncidents, mockAnomalies, mockActivityTimeline } from "@/lib/mock-data"

export default function ThreatsPage() {
  const [selectedIncident, setSelectedIncident] = useState<string | null>(null)
  const [timeRange, setTimeRange] = useState("24h")

  const criticalIncidents = mockIncidents.filter((i) => i.severity === "High")
  const openIncidents = mockIncidents.filter((i) => i.status === "Open")

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <header className="border-b border-purple-500/20 bg-card/50 backdrop-blur-sm sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Threat Analytics & Incidents</h1>
            <p className="text-sm text-muted-foreground mt-1">Real-time threat detection and incident management</p>
          </div>
          <Button className="bg-purple-600 hover:bg-purple-700">
            <Filter className="w-4 h-4 mr-2" />
            Advanced Filters
          </Button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8 space-y-8">
        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="p-6 border-purple-500/20">
            <p className="text-sm text-muted-foreground mb-1">Total Incidents</p>
            <p className="text-3xl font-bold">{mockIncidents.length}</p>
            <p className="text-xs text-red-400 mt-2">{openIncidents.length} open</p>
          </Card>

          <Card className="p-6 border-red-500/20 bg-red-500/5">
            <p className="text-sm text-muted-foreground mb-1">Critical Issues</p>
            <p className="text-3xl font-bold text-red-400">{criticalIncidents.length}</p>
            <p className="text-xs text-red-400/70 mt-2">Require action</p>
          </Card>

          <Card className="p-6 border-yellow-500/20 bg-yellow-500/5">
            <p className="text-sm text-muted-foreground mb-1">Anomalies Detected</p>
            <p className="text-3xl font-bold text-yellow-400">{mockAnomalies.length}</p>
            <p className="text-xs text-yellow-400/70 mt-2">Last 24 hours</p>
          </Card>

          <Card className="p-6 border-cyan-500/20 bg-cyan-500/5">
            <p className="text-sm text-muted-foreground mb-1">MTTR (Avg)</p>
            <p className="text-3xl font-bold text-cyan-400">4.2 min</p>
            <p className="text-xs text-cyan-400/70 mt-2">96% within SLA</p>
          </Card>
        </div>

        {/* Severity Distribution */}
        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            {/* Active Incidents */}
            <Card className="p-6 border-purple-500/20">
              <h2 className="text-xl font-bold flex items-center gap-2 mb-6">
                <AlertTriangle className="w-5 h-5 text-red-400" />
                Active Incidents ({openIncidents.length})
              </h2>

              <div className="space-y-3 max-h-96 overflow-y-auto">
                {openIncidents.map((incident) => (
                  <div
                    key={incident.id}
                    onClick={() => setSelectedIncident(selectedIncident === incident.id ? null : incident.id)}
                    className={`p-4 rounded-lg border transition-all cursor-pointer ${
                      selectedIncident === incident.id
                        ? "border-red-500 bg-red-500/10"
                        : "border-red-500/30 hover:border-red-500/50"
                    }`}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex-1">
                        <p className="font-semibold">{incident.title}</p>
                        <p className="text-sm text-muted-foreground">{incident.description}</p>
                      </div>
                      <span className="text-xs px-2 py-1 rounded-full bg-red-500/20 text-red-400 font-semibold whitespace-nowrap ml-2">
                        {incident.severity}
                      </span>
                    </div>

                    <div className="flex items-center justify-between text-xs text-muted-foreground mt-3 pt-3 border-t border-red-500/20">
                      <span>{incident.user || incident.device}</span>
                      <span>{new Date(incident.createdAt).toLocaleTimeString()}</span>
                    </div>

                    {/* Expanded Details */}
                    {selectedIncident === incident.id && (
                      <div className="mt-3 pt-3 border-t border-red-500/20 space-y-3 text-xs">
                        <div>
                          <p className="text-muted-foreground mb-1">Detection Method</p>
                          <p className="text-red-400">{incident.detectionMethod}</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground mb-1">Recommended Action</p>
                          <p className="text-cyan-400">{incident.recommendedAction}</p>
                        </div>
                        <div className="flex gap-2 pt-2">
                          <Button size="sm" className="flex-1 bg-red-600 hover:bg-red-700 text-xs h-8">
                            Escalate
                          </Button>
                          <Button size="sm" variant="outline" className="flex-1 text-xs h-8 bg-transparent">
                            Mark Resolved
                          </Button>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </Card>

            {/* Behavioral Anomalies with Timeline */}
            <Card className="p-6 border-purple-500/20">
              <h2 className="text-xl font-bold flex items-center gap-2 mb-6">
                <TrendingUp className="w-5 h-5 text-yellow-400" />
                Behavioral Anomalies
              </h2>

              <div className="space-y-3">
                {mockAnomalies.map((anomaly) => (
                  <div
                    key={anomaly.id}
                    className="p-4 rounded-lg border border-yellow-500/30 hover:border-yellow-500/50 transition-colors"
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <p className="font-semibold text-sm">{anomaly.user}</p>
                        <p className="text-xs text-muted-foreground">{anomaly.event}</p>
                      </div>
                      <span className="text-xs px-2 py-1 rounded-full bg-yellow-500/20 text-yellow-400">
                        {anomaly.type}
                      </span>
                    </div>

                    <div className="w-full bg-yellow-500/20 rounded h-2 mb-2">
                      <div
                        className="bg-gradient-to-r from-yellow-500 to-orange-500 h-2 rounded"
                        style={{ width: `${anomaly.riskScore * 100}%` }}
                      ></div>
                    </div>

                    <div className="flex justify-between items-center text-xs">
                      <span className="text-muted-foreground">Risk: {Math.round(anomaly.riskScore * 100)}%</span>
                      <span
                        className={`text-xs px-2 py-0.5 rounded ${
                          anomaly.resolution === "Pending"
                            ? "bg-yellow-500/20 text-yellow-400"
                            : anomaly.resolution === "Investigating"
                              ? "bg-blue-500/20 text-blue-400"
                              : "bg-green-500/20 text-green-400"
                        }`}
                      >
                        {anomaly.resolution}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>

          {/* Threat Heat Map & Stats */}
          <Card className="p-6 border-purple-500/20 h-fit">
            <h2 className="text-lg font-bold mb-4">Threat Distribution</h2>

            <div className="space-y-4">
              {/* Severity Breakdown */}
              <div>
                <p className="text-xs text-muted-foreground mb-3">By Severity</p>
                <div className="space-y-2">
                  {[
                    { label: "Critical", count: 1, color: "bg-red-500" },
                    { label: "High", count: 2, color: "bg-orange-500" },
                    { label: "Medium", count: 1, color: "bg-yellow-500" },
                  ].map((item, i) => (
                    <div key={i} className="flex items-center justify-between">
                      <span className="text-xs text-muted-foreground">{item.label}</span>
                      <div className="flex items-center gap-2">
                        <div className="w-12 bg-purple-500/20 rounded h-1.5">
                          <div
                            className={`${item.color} h-1.5 rounded`}
                            style={{ width: `${(item.count / 3) * 100}%` }}
                          ></div>
                        </div>
                        <span className="text-xs font-semibold w-6 text-right">{item.count}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Top Attack Vectors */}
              <div className="pt-4 border-t border-purple-500/20">
                <p className="text-xs text-muted-foreground mb-3">Top Attack Vectors</p>
                <div className="space-y-2">
                  {["Credential Compromise", "Device Exploit", "Network Anomaly"].map((vector, i) => (
                    <div key={i} className="flex items-center gap-2 text-xs">
                      <Shield className="w-3 h-3 text-cyan-400" />
                      <span className="text-muted-foreground">{vector}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Response Status */}
              <div className="pt-4 border-t border-purple-500/20">
                <p className="text-xs text-muted-foreground mb-3">Response Status</p>
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-muted-foreground">Avg Response Time</span>
                    <span className="text-green-400 font-semibold">4.2 min</span>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-muted-foreground">SLA Compliance</span>
                    <span className="text-green-400 font-semibold">96%</span>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* Activity Timeline */}
        <Card className="p-6 border-purple-500/20">
          <h2 className="text-xl font-bold flex items-center gap-2 mb-6">
            <Clock className="w-5 h-5 text-cyan-400" />
            Security Timeline
          </h2>

          <div className="space-y-4 max-h-64 overflow-y-auto">
            {mockActivityTimeline.map((activity, i) => (
              <div key={activity.id} className="flex gap-4">
                <div className="flex flex-col items-center">
                  <div
                    className={`w-3 h-3 rounded-full ${activity.status === "Success" ? "bg-green-500" : "bg-red-500"}`}
                  ></div>
                  {i < mockActivityTimeline.length - 1 && <div className="w-0.5 h-12 bg-purple-500/20 my-1"></div>}
                </div>
                <div className="flex-1 pb-4">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="font-semibold text-sm">{activity.action}</p>
                      <p className="text-xs text-muted-foreground">{activity.user}</p>
                    </div>
                    <span
                      className={`text-xs px-2 py-1 rounded-full ${
                        activity.status === "Success" ? "bg-green-500/20 text-green-400" : "bg-red-500/20 text-red-400"
                      }`}
                    >
                      {activity.status}
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">
                    {activity.target} • {activity.details}
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">{new Date(activity.timestamp).toLocaleString()}</p>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </main>
    </div>
  )
}

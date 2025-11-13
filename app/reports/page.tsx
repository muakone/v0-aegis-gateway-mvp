"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { FileText, Download, Calendar, Filter, Eye, Share2 } from "lucide-react"

export default function ReportsPage() {
  const reports = [
    {
      id: "rep-001",
      name: "Monthly Security Report",
      type: "Security Overview",
      period: "November 2025",
      generated: "2025-11-13",
      format: "PDF",
      size: "2.4 MB",
      status: "Ready",
    },
    {
      id: "rep-002",
      name: "Incident Response Analysis",
      type: "Incident Analysis",
      period: "Q4 2025",
      generated: "2025-11-10",
      format: "PDF",
      size: "1.8 MB",
      status: "Ready",
    },
    {
      id: "rep-003",
      name: "Compliance Audit Report",
      type: "Compliance",
      period: "September-October 2025",
      generated: "2025-10-31",
      format: "PDF",
      size: "3.2 MB",
      status: "Ready",
    },
    {
      id: "rep-004",
      name: "User Access Audit",
      type: "Access Review",
      period: "November 2025",
      generated: "2025-11-12",
      format: "CSV",
      size: "456 KB",
      status: "Ready",
    },
    {
      id: "rep-005",
      name: "Device Inventory Report",
      type: "Device Management",
      period: "November 2025",
      generated: "2025-11-13",
      format: "Excel",
      size: "892 KB",
      status: "Generating",
    },
  ]

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <header className="border-b border-purple-500/20 bg-card/50 backdrop-blur-sm sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Reports & Analytics</h1>
            <p className="text-sm text-muted-foreground mt-1">Generate and manage security reports</p>
          </div>
          <Button className="bg-purple-600 hover:bg-purple-700">
            <FileText className="w-4 h-4 mr-2" />
            Generate Report
          </Button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Report Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Card className="p-4 border-purple-500/20">
            <p className="text-sm text-muted-foreground mb-1">Total Reports</p>
            <p className="text-2xl font-bold">{reports.length}</p>
          </Card>
          <Card className="p-4 border-green-500/20 bg-green-500/5">
            <p className="text-sm text-muted-foreground mb-1">Ready</p>
            <p className="text-2xl font-bold text-green-400">{reports.filter((r) => r.status === "Ready").length}</p>
          </Card>
          <Card className="p-4 border-cyan-500/20 bg-cyan-500/5">
            <p className="text-sm text-muted-foreground mb-1">Last Generated</p>
            <p className="text-2xl font-bold text-cyan-400">Today</p>
          </Card>
          <Card className="p-4 border-purple-500/20">
            <p className="text-sm text-muted-foreground mb-1">Scheduled</p>
            <p className="text-2xl font-bold">3</p>
          </Card>
        </div>

        {/* Filters */}
        <Card className="p-4 mb-6 border-purple-500/20 flex gap-4">
          <Button variant="outline" size="sm" className="flex items-center gap-2 bg-transparent">
            <Filter className="w-4 h-4" />
            Filter by Type
          </Button>
          <Button variant="outline" size="sm" className="flex items-center gap-2 bg-transparent">
            <Calendar className="w-4 h-4" />
            Date Range
          </Button>
        </Card>

        {/* Reports List */}
        <div className="space-y-3">
          {reports.map((report) => (
            <Card key={report.id} className="p-4 border-purple-500/20 hover:border-purple-500/40 transition-all group">
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-4 flex-1">
                  <div className="w-10 h-10 rounded-lg bg-purple-500/20 flex items-center justify-center flex-shrink-0">
                    <FileText className="w-5 h-5 text-purple-400" />
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold">{report.name}</p>
                    <div className="flex items-center gap-3 text-xs text-muted-foreground mt-1">
                      <span className="px-2 py-1 rounded bg-purple-500/20 text-purple-300">{report.type}</span>
                      <span>{report.period}</span>
                      <span>•</span>
                      <span>{report.size}</span>
                      <span>•</span>
                      <span>{new Date(report.generated).toLocaleDateString()}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span
                    className={`text-xs px-2 py-1 rounded-full ${
                      report.status === "Ready" ? "bg-green-500/20 text-green-400" : "bg-yellow-500/20 text-yellow-400"
                    }`}
                  >
                    {report.status}
                  </span>

                  <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-cyan-400">
                      <Eye className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-cyan-400">
                      <Download className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-cyan-400">
                      <Share2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </main>
    </div>
  )
}

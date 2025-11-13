"use client"

import { useAuth } from "@/lib/auth-context"
import { redirect } from "next/navigation"
import { Card } from "@/components/ui/card"
import { CheckCircle, XCircle } from "lucide-react"

export default function Comparison() {
  const { user } = useAuth()

  if (!user) redirect("/login")
  if (user.role === "User") redirect("/employee")

  const comparison = [
    { feature: "Access Latency", vpn: "150ms avg", aegis: "15ms avg", winner: "aegis" },
    { feature: "Device Context Verification", vpn: "No", aegis: "Yes - Real-time", winner: "aegis" },
    { feature: "Behavioral Analytics", vpn: "No", aegis: "Yes - Continuous", winner: "aegis" },
    { feature: "Assumes Network Safety", vpn: "Yes (Broken)", aegis: "No (Zero Trust)", winner: "aegis" },
    { feature: "All-or-Nothing Access", vpn: "Yes", aegis: "No - Granular", winner: "aegis" },
    { feature: "Single Point of Failure", vpn: "Yes", aegis: "No - Distributed", winner: "aegis" },
    { feature: "Panic Button/Emergency Lockdown", vpn: "No", aegis: "Yes - Instant", winner: "aegis" },
    { feature: "Setup Complexity", vpn: "Simple", aegis: "Moderate", winner: "vpn" },
  ]

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto p-4">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-foreground">VPN vs Aegis Gateway</h1>
          <p className="text-muted-foreground">How Zero Trust compares to traditional perimeter security</p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-6">
          <Card className="p-6 border-border/50 bg-gradient-to-br from-gray-500/5 to-slate-500/5">
            <h3 className="text-xl font-bold text-foreground mb-4">Traditional VPN</h3>
            <ul className="space-y-2">
              <li className="text-sm text-muted-foreground flex items-start gap-2">
                <XCircle className="w-4 h-4 text-red-400 mt-0.5 flex-shrink-0" />
                <span>Slow (100-200ms latency creates friction)</span>
              </li>
              <li className="text-sm text-muted-foreground flex items-start gap-2">
                <XCircle className="w-4 h-4 text-red-400 mt-0.5 flex-shrink-0" />
                <span>Assumes network is safe inside perimeter</span>
              </li>
              <li className="text-sm text-muted-foreground flex items-start gap-2">
                <XCircle className="w-4 h-4 text-red-400 mt-0.5 flex-shrink-0" />
                <span>No device health verification</span>
              </li>
              <li className="text-sm text-muted-foreground flex items-start gap-2">
                <XCircle className="w-4 h-4 text-red-400 mt-0.5 flex-shrink-0" />
                <span>Single point of failure</span>
              </li>
              <li className="text-sm text-muted-foreground flex items-start gap-2">
                <XCircle className="w-4 h-4 text-red-400 mt-0.5 flex-shrink-0" />
                <span>All-or-nothing access model</span>
              </li>
            </ul>
          </Card>

          <Card className="p-6 border-border/50 bg-gradient-to-br from-purple-500/10 to-cyan-500/10">
            <h3 className="text-xl font-bold text-foreground mb-4">Aegis Gateway (Zero Trust)</h3>
            <ul className="space-y-2">
              <li className="text-sm text-muted-foreground flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                <span>Fast (10-30ms latency for better productivity)</span>
              </li>
              <li className="text-sm text-muted-foreground flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                <span>Assumes breach - verify everything always</span>
              </li>
              <li className="text-sm text-muted-foreground flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                <span>Continuous device verification in real-time</span>
              </li>
              <li className="text-sm text-muted-foreground flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                <span>Distributed architecture - highly resilient</span>
              </li>
              <li className="text-sm text-muted-foreground flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                <span>Granular access control based on context</span>
              </li>
            </ul>
          </Card>
        </div>

        <Card className="p-6 border-border/50">
          <h3 className="text-xl font-bold text-foreground mb-4">Feature Comparison Matrix</h3>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border/50">
                  <th className="text-left py-3 px-4 text-sm font-semibold text-foreground">Feature</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-muted-foreground">Traditional VPN</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-muted-foreground">Aegis Gateway</th>
                </tr>
              </thead>
              <tbody>
                {comparison.map((row, i) => (
                  <tr key={i} className="border-b border-border/50 hover:bg-muted/20">
                    <td className="py-3 px-4 text-sm font-medium text-foreground">{row.feature}</td>
                    <td className="py-3 px-4 text-sm text-muted-foreground">{row.vpn}</td>
                    <td
                      className={`py-3 px-4 text-sm font-medium ${row.winner === "aegis" ? "text-green-400" : "text-muted-foreground"}`}
                    >
                      {row.aegis}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </div>
    </div>
  )
}

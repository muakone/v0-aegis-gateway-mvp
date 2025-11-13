"use client"

import { useState } from "react"
import { AlertTriangle, Play, CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { useAuthStore } from "@/lib/auth-context"

interface SimulationResult {
  id: string
  type: string
  description: string
  targetUser: string
  status: "running" | "blocked" | "detected"
  timeDetected: number // seconds
  result: "success" | "failed"
}

export default function AttackSimulationPage() {
  const { user } = useAuthStore()
  const [activeSimulation, setActiveSimulation] = useState<string | null>(null)
  const [results, setResults] = useState<SimulationResult[]>([])
  const [simulationRunning, setSimulationRunning] = useState(false)

  const attacks = [
    {
      id: "sim-001",
      name: "Impossible Travel Detection Test",
      description: "Test if system blocks login from geographically impossible location within 3 hours",
      purpose: "Verify geo-location tracking and impossible travel detection logic",
      riskLevel: "High",
      estimatedTime: "5-10 seconds",
      expectedResult: "Instant geolocation verification detects NYC → Kenya in 3 hours. Risk score: 98/100. Access denied. Employee notified.",
    },
    {
      id: "sim-002",
      name: "Credential Stuffing Defense Test",
      description: "Test defense against multiple failed login attempts using leaked credentials",
      purpose: "Validate rate limiting and account lockout policies",
      riskLevel: "High",
      estimatedTime: "3-5 seconds",
      expectedResult: "Account lockout after 5 failed attempts. Alerts sent to security team and employee. Password reset required.",
    },
    {
      id: "sim-003",
      name: "Compromised Device Detection Test",
      description: "Test system response to access from device with failed security checks (no antivirus, outdated OS)",
      purpose: "Ensure device health policies are enforced before granting access",
      riskLevel: "Critical",
      estimatedTime: "2-3 seconds",
      expectedResult: "Access denied due to device posture failure. Employee notified to update OS and enable antivirus. Device isolated.",
    },
    {
      id: "sim-004",
      name: "Privilege Escalation Detection Test",
      description: "Test detection of normal user attempting to access admin-only resources",
      purpose: "Validate behavioral anomaly detection and RBAC enforcement",
      riskLevel: "Medium",
      estimatedTime: "3-7 seconds",
      expectedResult: "Behavioral anomaly detected. Risk score elevated. Step-up MFA triggered. Activity logged for security review.",
    },
  ]

  const runSimulation = (simulationId: string, attackType: string) => {
    setActiveSimulation(simulationId)
    setSimulationRunning(true)

    // Simulate attack detection timeline
    const timelineSteps = [
      { delay: 1000, message: "Initiating attack vector..." },
      { delay: 2000, message: "Anomaly detected!" },
      { delay: 3500, message: "Behavior analysis triggered..." },
      { delay: 5000, message: "Attack blocked, remediation activated" },
    ]

    let currentStep = 0
    const processNextStep = () => {
      if (currentStep < timelineSteps.length) {
        setTimeout(() => {
          currentStep++
          if (currentStep === timelineSteps.length) {
            const result: SimulationResult = {
              id: `result-${Date.now()}`,
              type: attackType,
              description: attacks.find((a) => a.id === simulationId)?.description || "",
              targetUser: "Grace Chen",
              status: "blocked",
              timeDetected: 4.2,
              result: "success",
            }
            setResults([result, ...results])
            setSimulationRunning(false)
            setActiveSimulation(null)
          }
        }, 2000)
      }
    }

    processNextStep()
  }

  return (
    <div className="min-h-screen bg-background text-foreground p-8">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold flex items-center gap-3">
            <AlertTriangle className="w-10 h-10 text-cyan-400" />
            Security Drills & Posture Testing
          </h1>
          <p className="text-muted-foreground mt-2 max-w-3xl">
            Test your security policies by simulating real-world attacks. Run monthly drills to verify Aegis detects
            and blocks threats, then adjust policies based on results. Think of this as a fire drill for your security team.
          </p>
        </div>

        {/* Purpose Explanation */}
        <Card className="mb-8 p-6 border-cyan-500/30 bg-cyan-500/5">
          <h3 className="font-semibold text-lg mb-3 flex items-center gap-2">
            <CheckCircle className="w-5 h-5 text-cyan-400" />
            Why Run Security Drills?
          </h3>
          <div className="grid md:grid-cols-3 gap-4 text-sm">
            <div>
              <p className="font-semibold text-foreground mb-1">✓ Test Your Policies</p>
              <p className="text-muted-foreground">Verify your security rules actually block threats</p>
            </div>
            <div>
              <p className="font-semibold text-foreground mb-1">✓ Find Gaps</p>
              <p className="text-muted-foreground">Discover weak spots before real attackers do</p>
            </div>
            <div>
              <p className="font-semibold text-foreground mb-1">✓ Train Your Team</p>
              <p className="text-muted-foreground">Show security team what threats look like</p>
            </div>
          </div>
        </Card>

        {/* Available Simulations */}
        <div className="grid md:grid-cols-2 gap-6 mb-12">
          {attacks.map((attack) => (
            <Card
              key={attack.id}
              className={`p-6 border transition-all ${
                activeSimulation === attack.id
                  ? "border-cyan-500/50 bg-cyan-500/10"
                  : "border-purple-500/30 hover:border-purple-500/50"
              }`}
            >
              <div className="flex items-start justify-between mb-4">
                <h3 className="font-semibold text-lg">{attack.name}</h3>
                <span
                  className={`text-xs px-2 py-1 rounded font-semibold ${
                    attack.riskLevel === "Critical"
                      ? "bg-red-500/20 text-red-400"
                      : attack.riskLevel === "High"
                        ? "bg-orange-500/20 text-orange-400"
                        : "bg-yellow-500/20 text-yellow-400"
                  }`}
                >
                  {attack.riskLevel}
                </span>
              </div>

              <p className="text-muted-foreground text-sm mb-2">{attack.description}</p>
              <p className="text-accent text-xs mb-4 italic">Purpose: {attack.purpose}</p>

              <div className="space-y-2 text-sm mb-6 bg-background/50 p-3 rounded border border-purple-500/20">
                <p>
                  <span className="text-accent font-semibold">Time to detect:</span> {attack.estimatedTime}
                </p>
                <p>
                  <span className="text-accent font-semibold">Expected result:</span> {attack.expectedResult}
                </p>
              </div>

              <Button
                onClick={() => runSimulation(attack.id, attack.name)}
                disabled={simulationRunning}
                className={`w-full ${
                  activeSimulation === attack.id
                    ? "bg-red-500/20 hover:bg-red-500/30 text-red-400 border border-red-500/30"
                    : "bg-gradient-to-r from-purple-500 to-cyan-500"
                }`}
              >
                <Play className="w-4 h-4 mr-2" />
                {simulationRunning && activeSimulation === attack.id ? "Running..." : "Run Simulation"}
              </Button>
            </Card>
          ))}
        </div>

        {/* Simulation Results */}
        {results.length > 0 && (
          <div className="mb-12">
            <h2 className="text-2xl font-bold mb-4">Recent Simulation Results</h2>
            <div className="space-y-4">
              {results.map((result) => (
                <Card key={result.id} className="p-6 border-green-500/30 bg-green-500/10">
                  <div className="flex items-start gap-4">
                    <CheckCircle className="w-6 h-6 text-green-400 mt-1 flex-shrink-0" />
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg mb-1">{result.type}</h3>
                      <p className="text-muted-foreground text-sm mb-3">{result.description}</p>
                      <div className="grid grid-cols-3 gap-4 bg-background/50 p-3 rounded border border-green-500/20">
                        <div>
                          <p className="text-xs text-muted-foreground mb-1">Target User</p>
                          <p className="font-semibold">{result.targetUser}</p>
                        </div>
                        <div>
                          <p className="text-xs text-muted-foreground mb-1">Time to Detect</p>
                          <p className="font-semibold text-green-400">{result.timeDetected}s</p>
                        </div>
                        <div>
                          <p className="text-xs text-muted-foreground mb-1">Status</p>
                          <p className="font-semibold text-green-400">Blocked Successfully</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Lab Notes */}
        <Card className="p-6 border-purple-500/30 bg-purple-500/5">
          <h3 className="font-semibold text-lg mb-3">Lab Notes</h3>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li>• Simulations are conducted on test accounts and do not affect production</li>
            <li>• Each simulation tests a specific attack vector and security control</li>
            <li>• Average detection time across all attack types: 4.2 seconds</li>
            <li>• 100% of simulated attacks blocked by Aegis Gateway security policies</li>
            <li>• All events are logged and available for compliance audits</li>
          </ul>
        </Card>
      </div>
    </div>
  )
}

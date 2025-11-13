"use client"

import { useAuth } from "@/lib/auth-context"
import { redirect } from "next/navigation"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Globe, Wifi, Clock, Shield, CheckCircle, XCircle, AlertCircle, Play } from "lucide-react"
import { useState, useEffect } from "react"

export default function AccessIntelligence() {
  const { user } = useAuth()
  const [isSimulating, setIsSimulating] = useState(false)
  const [currentStep, setCurrentStep] = useState(0)
  const [verificationResults, setVerificationResults] = useState<any[]>([])
  const [finalDecision, setFinalDecision] = useState<string | null>(null)
  const [riskScore, setRiskScore] = useState(0)

  if (!user) redirect("/login")

  const simulationSteps = [
    { 
      name: "Identity Verification", 
      icon: Shield,
      checking: "Verifying MFA token and password hash...",
      result: { status: "pass", message: "✓ Identity verified", score: 95, color: "text-green-400" }
    },
    { 
      name: "Device Health Check", 
      icon: Shield,
      checking: "Scanning OS version, firewall, encryption, antivirus...",
      result: { status: "pass", message: "✓ Device healthy", score: 92, color: "text-green-400" }
    },
    { 
      name: "Behavioral Analysis", 
      icon: Clock,
      checking: "Analyzing login patterns and access history...",
      result: { status: "pass", message: "✓ Normal behavior", score: 88, color: "text-green-400" }
    },
    { 
      name: "Context Signals", 
      icon: Globe,
      checking: "Checking geolocation, network, and time context...",
      result: { status: "warning", message: "⚠️ Public WiFi detected", score: 65, color: "text-yellow-400" }
    },
  ]

  const startSimulation = () => {
    setIsSimulating(true)
    setCurrentStep(0)
    setVerificationResults([])
    setFinalDecision(null)
    setRiskScore(0)
  }

  useEffect(() => {
    if (isSimulating && currentStep < simulationSteps.length) {
      const timer = setTimeout(() => {
        const step = simulationSteps[currentStep]
        setVerificationResults(prev => [...prev, step.result])
        setCurrentStep(prev => prev + 1)
      }, 1200)
      return () => clearTimeout(timer)
    } else if (isSimulating && currentStep === simulationSteps.length) {
      // Calculate final decision
      const avgScore = verificationResults.reduce((sum, r) => sum + r.score, 0) / verificationResults.length
      setRiskScore(avgScore)
      
      setTimeout(() => {
        if (avgScore >= 80) {
          setFinalDecision("GRANTED")
        } else if (avgScore >= 60) {
          setFinalDecision("STEP_UP_MFA")
        } else {
          setFinalDecision("DENIED")
        }
        setTimeout(() => setIsSimulating(false), 3000)
      }, 800)
    }
  }, [isSimulating, currentStep])

  const contextSignals = [
    {
      category: "Geolocation",
      icon: Globe,
      status: "normal",
      details: {
        current: "New York, US (40.71°N, 74.00°W)",
        previous: "New York, US",
        distance: "0 miles",
        travelTime: "Instant",
        riskFactor: "Normal location",
      },
    },
    {
      category: "Network",
      icon: Wifi,
      status: "warning",
      details: {
        type: "Home WiFi (Personal)",
        security: "WPA3",
        reputation: "Trusted",
        ipReputation: "Clean",
        riskFactor: "Personal network detected",
      },
    },
    {
      category: "Time Context",
      icon: Clock,
      status: "normal",
      details: {
        currentTime: "2:30 PM, Wednesday",
        businessHours: "Yes (9 AM - 6 PM)",
        dayType: "Weekday",
        normalAccessTime: "Yes",
        riskFactor: "Normal access time",
      },
    },
    {
      category: "Device Context",
      icon: Shield,
      status: "normal",
      details: {
        device: "MacBook Pro",
        osHealth: "Current (macOS 14.6)",
        trustScore: "92%",
        lastUpdated: "2 hours ago",
        riskFactor: "Device trusted",
      },
    },
  ]

  const accessDecisionBreakdown = [
    { signal: "Identity Verification", weight: 25, score: 0.95, status: "Verified" },
    { signal: "Device Trust", weight: 30, score: 0.92, status: "Healthy" },
    { signal: "Behavioral Pattern", weight: 25, score: 0.88, status: "Normal" },
    { signal: "Context Signals", weight: 20, score: 0.85, status: "Favorable" },
  ]

  const overallTrustScore = 0.9

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-6xl mx-auto p-4">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-foreground">Access Intelligence</h1>
          <p className="text-muted-foreground">Real-time context-aware access analysis</p>
        </div>

        {/* Overall Trust Score */}
        <Card className="mb-6 p-8 border-border/50 bg-gradient-to-r from-purple-500/10 to-cyan-500/10">
          <div className="flex items-end gap-6">
            <div>
              <p className="text-muted-foreground mb-2">Current Trust Score</p>
              <div className="flex items-baseline gap-2">
                <span className="text-5xl font-bold text-gradient bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
                  {(overallTrustScore * 100).toFixed(0)}%
                </span>
                <span className="text-muted-foreground">Access: Granted</span>
              </div>
            </div>
            <div className="flex-1">
              <div className="w-full h-3 bg-muted/50 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-green-500 to-cyan-500 rounded-full"
                  style={{ width: `${overallTrustScore * 100}%` }}
                />
              </div>
              <p className="text-xs text-muted-foreground mt-2">All signals favorable - access granted</p>
            </div>
          </div>
        </Card>

        {/* Live Access Decision Simulator */}
        <Card className="mb-6 p-6 border-purple-500/30 bg-gradient-to-br from-purple-500/5 to-cyan-500/5">
          <div className="mb-4">
            <h2 className="text-xl font-bold mb-2">Live Access Decision Demo</h2>
            <p className="text-sm text-muted-foreground">See how Aegis makes real-time access decisions in under 20ms</p>
          </div>

          {!isSimulating && verificationResults.length === 0 && (
            <div className="text-center py-8">
              <Button 
                onClick={startSimulation}
                size="lg"
                className="bg-gradient-to-r from-purple-500 to-cyan-500"
              >
                <Play className="w-4 h-4 mr-2" />
                Simulate Access Request
              </Button>
              <p className="text-xs text-muted-foreground mt-3">
                Employee: Sarah Chen • Resource: Salesforce Customer Database • Location: Coffee Shop
              </p>
            </div>
          )}

          {(isSimulating || verificationResults.length > 0) && (
            <div className="space-y-3">
              {simulationSteps.map((step, index) => {
                const Icon = step.icon
                const result = verificationResults[index]
                const isChecking = isSimulating && currentStep === index
                
                return (
                  <div 
                    key={index}
                    className={`p-4 rounded-lg border transition-all ${
                      result 
                        ? result.status === 'pass' 
                          ? 'border-green-500/30 bg-green-500/5'
                          : 'border-yellow-500/30 bg-yellow-500/5'
                        : isChecking
                          ? 'border-cyan-500/30 bg-cyan-500/5 animate-pulse'
                          : 'border-border/30 bg-muted/20'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Icon className={`w-5 h-5 ${
                          result ? result.color : isChecking ? 'text-cyan-400 animate-spin' : 'text-muted-foreground'
                        }`} />
                        <div>
                          <p className="font-semibold">{step.name}</p>
                          {isChecking && (
                            <p className="text-xs text-muted-foreground">{step.checking}</p>
                          )}
                          {result && (
                            <p className={`text-sm ${result.color}`}>{result.message}</p>
                          )}
                        </div>
                      </div>
                      {result && (
                        <div className="text-right">
                          <p className="text-2xl font-bold">{result.score}</p>
                          <p className="text-xs text-muted-foreground">Score</p>
                        </div>
                      )}
                    </div>
                  </div>
                )
              })}

              {/* Final Decision */}
              {finalDecision && (
                <div className={`p-6 rounded-lg border-2 text-center ${
                  finalDecision === 'GRANTED' 
                    ? 'border-green-500 bg-green-500/10'
                    : finalDecision === 'STEP_UP_MFA'
                      ? 'border-yellow-500 bg-yellow-500/10'
                      : 'border-red-500 bg-red-500/10'
                }`}>
                  <div className="flex items-center justify-center gap-3 mb-2">
                    {finalDecision === 'GRANTED' && <CheckCircle className="w-8 h-8 text-green-400" />}
                    {finalDecision === 'STEP_UP_MFA' && <AlertCircle className="w-8 h-8 text-yellow-400" />}
                    {finalDecision === 'DENIED' && <XCircle className="w-8 h-8 text-red-400" />}
                    <p className="text-3xl font-bold">
                      {finalDecision === 'GRANTED' && 'ACCESS GRANTED'}
                      {finalDecision === 'STEP_UP_MFA' && 'STEP-UP MFA REQUIRED'}
                      {finalDecision === 'DENIED' && 'ACCESS DENIED'}
                    </p>
                  </div>
                  <p className="text-sm text-muted-foreground mb-3">
                    Average Risk Score: {riskScore.toFixed(0)}/100 • Decision Time: 18ms
                  </p>
                  {finalDecision === 'STEP_UP_MFA' && (
                    <p className="text-sm text-yellow-400">
                      📱 Push notification sent: "Confirm access from Coffee Shop WiFi"
                    </p>
                  )}
                  <Button 
                    onClick={startSimulation} 
                    variant="outline" 
                    className="mt-4"
                  >
                    Run Another Simulation
                  </Button>
                </div>
              )}
            </div>
          )}
        </Card>

        {/* Context Signals Grid */}
        <h2 className="text-xl font-bold text-foreground mb-4">Context Signals</h2>
        <div className="grid md:grid-cols-2 gap-4 mb-6">
          {contextSignals.map((signal, i) => {
            const Icon = signal.icon
            return (
              <Card key={i} className="p-6 border-border/50">
                <div className="flex items-start gap-3 mb-4">
                  <Icon
                    className={`w-5 h-5 ${
                      signal.status === "normal"
                        ? "text-green-400"
                        : signal.status === "warning"
                          ? "text-yellow-400"
                          : "text-red-400"
                    }`}
                  />
                  <h3 className="font-semibold text-foreground">{signal.category}</h3>
                </div>

                <div className="space-y-2">
                  {Object.entries(signal.details).map(([key, value]) => (
                    <div key={key} className="flex items-start justify-between p-2 rounded bg-muted/30">
                      <span className="text-xs text-muted-foreground capitalize">
                        {key.replace(/([A-Z])/g, " $1")}:
                      </span>
                      <span className="text-sm font-medium text-foreground text-right">{value}</span>
                    </div>
                  ))}
                </div>
              </Card>
            )
          })}
        </div>

        {/* Trust Score Breakdown */}
        <Card className="p-6 border-border/50">
          <h3 className="text-lg font-semibold text-foreground mb-4">Access Decision Breakdown</h3>

          <div className="space-y-4">
            {accessDecisionBreakdown.map((item, i) => (
              <div key={i} className="space-y-2">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-foreground">{item.signal}</p>
                    <p className="text-xs text-muted-foreground">Weight: {item.weight}%</p>
                  </div>
                  <span
                    className={`text-sm font-bold px-2 py-1 rounded ${
                      item.score >= 0.9 ? "bg-green-500/20 text-green-400" : "bg-yellow-500/20 text-yellow-400"
                    }`}
                  >
                    {(item.score * 100).toFixed(0)}%
                  </span>
                </div>
                <div className="w-full h-2 bg-muted/50 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full ${
                      item.score >= 0.9
                        ? "bg-gradient-to-r from-green-500 to-emerald-500"
                        : "bg-gradient-to-r from-yellow-500 to-orange-500"
                    }`}
                    style={{ width: `${item.score * 100}%` }}
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 p-4 rounded-lg bg-green-500/10 border border-green-500/30 flex items-start gap-3">
            <Shield className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
            <div>
              <p className="font-medium text-foreground">Access Decision: GRANTED</p>
              <p className="text-sm text-muted-foreground mt-1">
                All context signals are favorable. Your identity is verified, device is healthy, behavior is normal, and
                contextual factors support access.
              </p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  )
}

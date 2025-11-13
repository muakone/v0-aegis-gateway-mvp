"use client"

import { useAuth } from "@/lib/auth-context"
import { redirect } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ArrowRight, CheckCircle, FileText, Shield, Smartphone, Lock, Zap } from "lucide-react"
import { useState } from "react"

export default function DeviceOnboarding() {
  const { user, logout } = useAuth()
  const [currentStep, setCurrentStep] = useState(1)
  const totalSteps = 5

  if (!user) redirect("/login")
  if (user.role === "Admin") redirect("/dashboard")

  const steps = [
    {
      num: 1,
      title: "Device Information",
      description: "Register your device details",
      icon: Smartphone,
      details: ["Device Name: MacBook Pro", "Serial: C8JH2Q7KLM92", "Model: 16-inch M3 Max"],
    },
    {
      num: 2,
      title: "Security Assessment",
      description: "Verify device security posture",
      icon: Shield,
      details: ["OS Version: macOS 14.6 ✓", "Firewall: Enabled ✓", "Encryption: Active ✓", "Antivirus: Current ✓"],
    },
    {
      num: 3,
      title: "Install Certificate",
      description: "Install device certificate for authentication",
      icon: FileText,
      details: ["Certificate: aegis-device-001.crt", "Issuer: Aegis CA", "Valid until: Nov 13, 2026"],
    },
    {
      num: 4,
      title: "MFA Configuration",
      description: "Set up multi-factor authentication",
      icon: Lock,
      details: ["Primary: Biometric (Face ID)", "Secondary: TOTP Authenticator", "Recovery codes: Generated & Saved"],
    },
    {
      num: 5,
      title: "Trust Establishment",
      description: "Device is now trusted in Aegis Gateway",
      icon: Zap,
      details: ["Trust Score: 92%", "Status: Healthy", "Ready for secure access"],
    },
  ]

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-foreground">Device Onboarding</h1>
          <Button
            variant="outline"
            size="sm"
            onClick={logout}
            className="text-muted-foreground hover:text-foreground bg-transparent"
          >
            Logout
          </Button>
        </div>
      </div>

      <div className="max-w-4xl mx-auto p-4">
        {/* Progress */}
        <Card className="p-6 mb-6 border-border/50">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-foreground">Enrollment Progress</h2>
            <span className="text-sm text-muted-foreground">
              {currentStep} of {totalSteps}
            </span>
          </div>
          <div className="w-full bg-muted/30 rounded-full h-2">
            <div
              className="bg-gradient-to-r from-purple-500 to-cyan-500 h-2 rounded-full transition-all"
              style={{ width: `${(currentStep / totalSteps) * 100}%` }}
            />
          </div>
          <div className="flex justify-between mt-4">
            {steps.map((step) => (
              <div key={step.num} className="flex flex-col items-center">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold text-sm mb-2 ${
                    step.num <= currentStep
                      ? "bg-gradient-to-r from-purple-500 to-cyan-500 text-white"
                      : "bg-muted/50 text-muted-foreground"
                  }`}
                >
                  {step.num <= currentStep && step.num < currentStep ? <CheckCircle className="w-5 h-5" /> : step.num}
                </div>
                <span className="text-xs text-muted-foreground text-center">{step.title}</span>
              </div>
            ))}
          </div>
        </Card>

        {/* Current Step */}
        <Card className="p-8 mb-6 border-border/50">
          {steps.map((step) =>
            step.num === currentStep ? (
              <div key={step.num}>
                <div className="flex items-start gap-4 mb-6">
                  <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-purple-500/20 to-cyan-500/20 flex items-center justify-center flex-shrink-0">
                    <step.icon className="w-6 h-6 text-accent" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-foreground">{step.title}</h2>
                    <p className="text-muted-foreground mt-1">{step.description}</p>
                  </div>
                </div>

                <div className="bg-muted/20 rounded-lg p-4 mb-6 border border-border/50">
                  <p className="text-sm font-semibold text-foreground mb-3">Details:</p>
                  <ul className="space-y-2">
                    {step.details.map((detail, i) => (
                      <li key={i} className="text-sm text-muted-foreground flex items-center gap-2">
                        <span className="w-1 h-1 rounded-full bg-accent" />
                        {detail}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="flex gap-4">
                  <Button
                    variant="outline"
                    onClick={() => setCurrentStep(Math.max(1, currentStep - 1))}
                    disabled={currentStep === 1}
                    className="bg-transparent"
                  >
                    Previous
                  </Button>
                  <Button
                    className="bg-gradient-to-r from-purple-500 to-cyan-500 hover:from-purple-600 hover:to-cyan-600"
                    onClick={() => setCurrentStep(Math.min(totalSteps, currentStep + 1))}
                  >
                    {currentStep === totalSteps ? "Complete" : "Next"}
                    {currentStep < totalSteps && <ArrowRight className="w-4 h-4 ml-2" />}
                  </Button>
                </div>
              </div>
            ) : null,
          )}
        </Card>

        {/* Benefits */}
        <Card className="p-6 border-border/50">
          <h3 className="text-lg font-semibold text-foreground mb-4">Why Device Onboarding?</h3>
          <div className="grid md:grid-cols-3 gap-4">
            {[
              {
                title: "Trusted Access",
                desc: "Your device becomes a trusted endpoint in Aegis Gateway",
              },
              {
                title: "Seamless Authentication",
                desc: "No VPN needed - direct secure access to resources",
              },
              {
                title: "Real-time Protection",
                desc: "Continuous health monitoring and threat detection",
              },
            ].map((benefit, i) => (
              <div key={i} className="p-4 rounded-lg bg-muted/20 border border-border/50">
                <p className="font-semibold text-foreground mb-1">{benefit.title}</p>
                <p className="text-sm text-muted-foreground">{benefit.desc}</p>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  )
}

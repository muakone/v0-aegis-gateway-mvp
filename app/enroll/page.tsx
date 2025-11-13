"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { CheckCircle, ArrowRight, Download } from "lucide-react"

export default function DeviceEnrollment() {
  const [currentStep, setCurrentStep] = useState(1)
  const totalSteps = 5

  const steps = [
    {
      number: 1,
      title: "Device Information",
      description: "Confirm your device details",
      content: (
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">Device Name</label>
            <input
              type="text"
              placeholder="My MacBook Pro"
              className="w-full px-4 py-2 rounded-lg bg-muted/50 border border-border focus:border-accent focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">Device Type</label>
            <select className="w-full px-4 py-2 rounded-lg bg-muted/50 border border-border focus:border-accent focus:outline-none">
              <option>Laptop</option>
              <option>Desktop</option>
              <option>Mobile</option>
              <option>Tablet</option>
            </select>
          </div>
        </div>
      ),
    },
    {
      number: 2,
      title: "Install Agent",
      description: "Download and install Aegis Guardian agent",
      content: (
        <div className="space-y-4">
          <div className="p-4 rounded-lg bg-blue-500/10 border border-blue-500/30">
            <p className="text-sm text-muted-foreground mb-4">
              The Aegis Guardian agent continuously monitors device health and enforces security policies.
            </p>
            <Button className="w-full bg-gradient-to-r from-blue-500 to-cyan-500">
              <Download className="w-4 h-4 mr-2" />
              Download Aegis Guardian
            </Button>
          </div>
          <p className="text-xs text-muted-foreground text-center">macOS 11+, Windows 10+, iOS 14+, Android 10+</p>
        </div>
      ),
    },
    {
      number: 3,
      title: "Run Security Scan",
      description: "Let Aegis verify your device is compliant",
      content: (
        <div className="space-y-4">
          <div className="p-4 rounded-lg bg-green-500/10 border border-green-500/30">
            <p className="text-sm font-medium text-foreground mb-4">Device scan results:</p>
            <div className="space-y-2">
              {[
                { name: "OS Version", status: "ok" },
                { name: "Firewall", status: "ok" },
                { name: "Encryption", status: "warning" },
                { name: "Antivirus", status: "ok" },
              ].map((check, i) => (
                <div key={i} className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">{check.name}</span>
                  <span
                    className={`text-xs font-semibold ${check.status === "ok" ? "text-green-400" : "text-yellow-400"}`}
                  >
                    {check.status === "ok" ? "✓" : "⚠"} {check.status === "ok" ? "Pass" : "Warning"}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      ),
    },
    {
      number: 4,
      title: "Set Security Policy",
      description: "Configure device security preferences",
      content: (
        <div className="space-y-4">
          <div className="flex items-center justify-between p-3 rounded-lg bg-muted/30 border border-border">
            <div>
              <p className="font-medium text-foreground">Require MFA for sensitive data</p>
              <p className="text-xs text-muted-foreground">Always require multi-factor authentication</p>
            </div>
            <input type="checkbox" defaultChecked className="w-4 h-4" />
          </div>
          <div className="flex items-center justify-between p-3 rounded-lg bg-muted/30 border border-border">
            <div>
              <p className="font-medium text-foreground">Allow geofencing</p>
              <p className="text-xs text-muted-foreground">Restrict access by location</p>
            </div>
            <input type="checkbox" className="w-4 h-4" />
          </div>
          <div className="flex items-center justify-between p-3 rounded-lg bg-muted/30 border border-border">
            <div>
              <p className="font-medium text-foreground">Enable panic button</p>
              <p className="text-xs text-muted-foreground">Instant emergency lockdown</p>
            </div>
            <input type="checkbox" defaultChecked className="w-4 h-4" />
          </div>
        </div>
      ),
    },
    {
      number: 5,
      title: "Complete",
      description: "Device successfully enrolled",
      content: (
        <div className="text-center py-8">
          <CheckCircle className="w-16 h-16 text-green-400 mx-auto mb-4" />
          <p className="text-lg font-semibold text-foreground mb-2">Device Enrolled Successfully</p>
          <p className="text-muted-foreground mb-6">Your device is now protected by Aegis Gateway</p>
          <Button className="bg-gradient-to-r from-purple-500 to-cyan-500">Return to Dashboard</Button>
        </div>
      ),
    },
  ]

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-3xl mx-auto p-4">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Device Enrollment</h1>
          <p className="text-muted-foreground">Complete these steps to enroll your device</p>
        </div>

        {/* Progress Indicator */}
        <div className="mb-8 flex gap-2">
          {steps.map((step, i) => (
            <div key={i} className="flex-1">
              <div
                className={`h-2 rounded-full transition-all ${
                  currentStep > step.number
                    ? "bg-green-500"
                    : currentStep === step.number
                      ? "bg-gradient-to-r from-purple-500 to-cyan-500"
                      : "bg-muted/50"
                }`}
              />
            </div>
          ))}
        </div>

        {/* Step Card */}
        <Card className="p-8 border-border/50 mb-6">
          <div className="flex items-start gap-4 mb-6">
            <div className="flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-r from-purple-500 to-cyan-500">
              <span className="text-lg font-bold text-primary-foreground">{currentStep}</span>
            </div>
            <div>
              <h2 className="text-2xl font-bold text-foreground">{steps[currentStep - 1].title}</h2>
              <p className="text-muted-foreground">{steps[currentStep - 1].description}</p>
            </div>
          </div>

          {steps[currentStep - 1].content}
        </Card>

        {/* Navigation */}
        <div className="flex gap-4 justify-end">
          <Button
            variant="outline"
            onClick={() => setCurrentStep(Math.max(1, currentStep - 1))}
            disabled={currentStep === 1}
          >
            Previous
          </Button>
          <Button
            onClick={() => setCurrentStep(Math.min(totalSteps, currentStep + 1))}
            disabled={currentStep === totalSteps}
            className="bg-gradient-to-r from-purple-500 to-cyan-500"
          >
            Next <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </div>
    </div>
  )
}

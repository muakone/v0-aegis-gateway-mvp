"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, Shield, Zap, Eye, AlertCircle, Lock, Gauge, Flame } from "lucide-react"
import { useState, useEffect } from "react"

export default function LandingPage() {
  const [scrollPosition, setScrollPosition] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      setScrollPosition(window.scrollY)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <div className="min-h-screen bg-background text-foreground overflow-hidden">
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-b from-purple-900/20 via-background to-background opacity-50" />
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage:
              "linear-gradient(0deg, transparent 24%, rgba(139, 92, 246, .05) 25%, rgba(139, 92, 246, .05) 26%, transparent 27%, transparent 74%, rgba(139, 92, 246, .05) 75%, rgba(139, 92, 246, .05) 76%, transparent 77%, transparent), linear-gradient(90deg, transparent 24%, rgba(139, 92, 246, .05) 25%, rgba(139, 92, 246, .05) 26%, transparent 27%, transparent 74%, rgba(139, 92, 246, .05) 75%, rgba(139, 92, 246, .05) 76%, transparent 77%, transparent)",
            backgroundSize: "50px 50px",
          }}
        />
      </div>

      {/* Hero Section */}
      <section id="hero" className="relative pt-32 pb-20 px-4 scroll-mt-20">
        <div className="max-w-6xl mx-auto text-center">
          <div className="inline-block mb-6 px-4 py-2 rounded-full border border-purple-500/50 bg-purple-500/10">
            <span className="text-sm font-semibold text-accent">Zero Trust Security Platform</span>
          </div>

          <h1 className="text-6xl md:text-7xl font-bold mb-6 leading-tight text-balance">Aegis Gateway</h1>

          <p className="text-2xl md:text-3xl mb-8 text-muted-foreground max-w-3xl mx-auto text-balance">
            Secure Remote Work Without VPN Friction
          </p>

          <p className="text-lg text-muted-foreground mb-12 max-w-2xl mx-auto leading-relaxed">
            Your employees work from anywhere. Your data needs to be protected everywhere. Aegis Gateway delivers
            continuous security verification based on identity, device health, and behavior—stopping threats in
            real-time while keeping work fast and seamless.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-20">
            <Link href="/login">
              <Button
                size="lg"
                className="bg-gradient-to-r from-purple-500 to-cyan-500 hover:from-purple-600 hover:to-cyan-600 text-primary-foreground"
              >
                Try Live Demo (5 Min)
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </Link>
            <Button size="lg" variant="outline" className="border-purple-500/50 hover:bg-purple-500/10 bg-transparent">
              How It Works
            </Button>
          </div>

          <div className="relative h-64 md:h-80 rounded-lg overflow-hidden border border-purple-500/30 glow-border">
            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-cyan-500/5 flex items-center justify-center">
              <div className="text-center">
                <Shield className="w-16 h-16 mx-auto mb-4 text-purple-400 opacity-50" />
                <p className="text-muted-foreground">Interactive Demo Environment</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Problem Section */}
      <section id="problem" className="relative py-20 px-4 border-t border-purple-500/10 scroll-mt-20">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold mb-8 text-center text-balance">
            VPNs Were Built for the Office
          </h2>

          <p className="text-lg text-muted-foreground text-center mb-12 max-w-2xl mx-auto leading-relaxed">
            Not for everywhere. Traditional perimeter-based security assumes trust once inside the network, leaving
            modern remote and hybrid workforces vulnerable to:
          </p>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              { icon: AlertCircle, title: "Compromised Endpoints", desc: "Personal devices with weak security" },
              { icon: Lock, title: "Stolen Credentials", desc: "Phishing and social engineering attacks" },
              { icon: Eye, title: "Limited Visibility", desc: "No real-time anomaly detection" },
            ].map((item, i) => (
              <div
                key={i}
                className="p-6 rounded-lg border border-purple-500/20 bg-card hover:border-purple-500/40 transition-colors"
              >
                <item.icon className="w-8 h-8 mb-4 text-purple-400" />
                <h3 className="font-semibold mb-2">{item.title}</h3>
                <p className="text-sm text-muted-foreground">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Solution Section (Three Pillars) */}
      <section id="solution" className="relative py-20 px-4 border-t border-purple-500/10 scroll-mt-20">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold mb-12 text-center text-balance">The Aegis Gateway Solution</h2>

          <p className="text-lg text-muted-foreground text-center mb-12 max-w-2xl mx-auto">
            Three pillars of continuous verification that replace the broken VPN model:
          </p>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {[
              {
                icon: AlertCircle,
                title: "Identity",
                desc: "Verify users with continuous authentication, not just login credentials",
                examples: ["Adaptive MFA", "Behavior scoring", "Credential analysis"],
              },
              {
                icon: Shield,
                title: "Device",
                desc: "Check device health before granting access—OS patches, firewall, encryption",
                examples: ["OS compliance", "Firewall status", "Encryption active", "Antivirus current"],
              },
              {
                icon: Eye,
                title: "Context",
                desc: "Analyze access context for anomalies—location, time, behavior patterns",
                examples: ["Geolocation", "Network analysis", "Behavioral ML", "Real-time risk scoring"],
              },
            ].map((pillar, i) => (
              <div
                key={i}
                className="p-8 rounded-lg border border-purple-500/30 bg-gradient-to-br from-purple-500/5 to-cyan-500/5 hover:border-purple-500/50 transition-all hover:shadow-lg hover:shadow-purple-500/10"
              >
                <pillar.icon className="w-10 h-10 mb-4 text-accent" />
                <h3 className="text-xl font-semibold mb-3">{pillar.title}</h3>
                <p className="text-muted-foreground leading-relaxed mb-4">{pillar.desc}</p>
                <div className="space-y-1">
                  {pillar.examples.map((ex, j) => (
                    <p key={j} className="text-xs text-accent">
                      ✓ {ex}
                    </p>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Panic Button callout */}
          <div className="p-8 rounded-lg border border-red-500/30 bg-gradient-to-r from-red-500/5 to-orange-500/5 mb-8">
            <div className="flex items-start gap-4">
              <Flame className="w-6 h-6 text-red-400 mt-1 flex-shrink-0" />
              <div>
                <h3 className="text-xl font-semibold mb-2">Employee Emergency Control</h3>
                <p className="text-muted-foreground">
                  Employees can instantly trigger emergency lockdown if they suspect device compromise. All sessions
                  terminate, device isolated, security team alerted instantly. Puts security power in employee hands.
                </p>
              </div>
            </div>
          </div>

          {/* Key Benefits */}
          <div className="grid md:grid-cols-2 gap-6">
            <div className="p-6 rounded-lg border border-green-500/30 bg-green-500/5">
              <h4 className="font-semibold mb-3 flex items-center gap-2">
                <Zap className="w-5 h-5 text-green-400" />
                For Employees
              </h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>✓ 10x faster than VPN (sub-20ms vs 150ms+)</li>
                <li>✓ Work securely from anywhere</li>
                <li>✓ Emergency panic button for peace of mind</li>
              </ul>
            </div>
            <div className="p-6 rounded-lg border border-blue-500/30 bg-blue-500/5">
              <h4 className="font-semibold mb-3 flex items-center gap-2">
                <Gauge className="w-5 h-5 text-blue-400" />
                For Security Teams
              </h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>✓ Real-time threat detection & response</li>
                <li>✓ Automated incident playbooks</li>
                <li>✓ Full audit trails for compliance</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="relative py-20 px-4 border-t border-purple-500/10 scroll-mt-20">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold mb-12 text-center text-balance">Enterprise-Grade Features</h2>

          <div className="grid md:grid-cols-2 gap-6">
            {[
              "Real-Time Threat Detection",
              "Behavioral Analysis (UEBA)",
              "Automated Incident Response",
              "Custom Policy Engine",
              "Device Health Monitoring",
              "Impossible Travel Detection",
              "Compliance Automation",
              "Attack Simulation Lab",
            ].map((feature, i) => (
              <div
                key={i}
                className="flex items-center gap-4 p-4 rounded-lg border border-purple-500/20 hover:border-purple-500/40 transition-colors"
              >
                <div className="w-2 h-2 rounded-full bg-gradient-to-r from-purple-400 to-cyan-400" />
                <span className="font-medium">{feature}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="relative py-20 px-4 border-t border-purple-500/10 scroll-mt-20">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold mb-12 text-center text-balance">Pricing Plans</h2>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                name: "Starter",
                price: "$10",
                features: ["Identity & Device Verification", "Basic Policies", "Up to 50 users"],
              },
              {
                name: "Professional",
                price: "$18",
                features: ["Everything in Starter", "Behavioral Analytics", "Real-time Alerts", "Up to 500 users"],
                highlighted: true,
              },
              {
                name: "Enterprise",
                price: "$25+",
                features: [
                  "Everything in Pro",
                  "Custom Policies",
                  "Attack Simulation",
                  "Unlimited users",
                  "Dedicated Support",
                ],
              },
            ].map((plan, i) => (
              <div
                key={i}
                className={`p-8 rounded-lg border transition-all ${
                  plan.highlighted
                    ? "border-purple-400 bg-gradient-to-br from-purple-500/10 to-cyan-500/10 relative"
                    : "border-purple-500/20 bg-card"
                }`}
              >
                {plan.highlighted && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 px-4 py-1 rounded-full bg-gradient-to-r from-purple-500 to-cyan-500 text-xs font-bold text-primary-foreground">
                    Most Popular
                  </div>
                )}
                <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                <div className="mb-6">
                  <span className="text-4xl font-bold">{plan.price}</span>
                  <span className="text-muted-foreground">/user/month</span>
                </div>
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, j) => (
                    <li key={j} className="text-sm flex items-center gap-2">
                      <div className="w-1 h-1 rounded-full bg-accent" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <Button className="w-full" variant={plan.highlighted ? "default" : "outline"}>
                  Get Started
                </Button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <section id="footer" className="relative py-16 px-4 border-t border-purple-500/10 bg-gradient-to-b from-transparent to-purple-500/5 scroll-mt-20">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold mb-2">Aegis Gateway</h3>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Zero Trust Access for the Borderless Office. Identity verified. Devices checked. Threats detected. In
              milliseconds.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-8 border-t border-purple-500/10">
            <p className="text-sm text-muted-foreground">© 2025 Aegis Gateway. All rights reserved.</p>
            <div className="flex gap-6 text-sm">
              <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                Privacy
              </a>
              <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                Terms
              </a>
              <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                Contact
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

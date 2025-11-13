"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useAuthStore } from "@/lib/auth-context"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { AlertCircle, ArrowRight, Shield } from "lucide-react"

export default function LoginPage() {
  const router = useRouter()
  const login = useAuthStore((state) => state.login)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setLoading(true)

    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 500))

    if (login(email, password)) {
      // Redirect based on user role
      const user = useAuthStore.getState().user
      if (user?.role === "Admin") {
        router.push("/dashboard")
      } else {
        router.push("/portal")
      }
    } else {
      setError("Invalid credentials. Try ola@aegis.com or grace@aegis.com")
    }

    setLoading(false)
  }

  const demoCredentials = [
    { email: "ola@aegis.com", name: "Olamide (Admin)" },
    { email: "grace@aegis.com", name: "Grace (User)" },
    { email: "carlos@aegis.com", name: "Carlos (User)" },
  ]

  const quickLogin = (email: string) => {
    setEmail(email)
    setPassword("demo")
  }

  return (
    <div className="min-h-screen bg-background text-foreground flex items-center justify-center px-4 relative overflow-hidden">
      {/* Background effects */}
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

      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-lg bg-gradient-to-br from-purple-500 to-cyan-500 mb-4 mx-auto">
            <Shield className="w-6 h-6 text-white" />
          </div>
          <h1 className="text-3xl font-bold mb-2">Aegis Gateway</h1>
          <p className="text-muted-foreground">Zero Trust Access Verification</p>
        </div>

        <Card className="p-8 border-purple-500/30 bg-card/50 backdrop-blur">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium mb-2">
                Email Address
              </label>
              <Input
                id="email"
                type="email"
                placeholder="you@company.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-input border-purple-500/30 focus:border-purple-500 focus:ring-purple-500/50"
                required
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium mb-2">
                Password
              </label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="bg-input border-purple-500/30 focus:border-purple-500 focus:ring-purple-500/50"
                required
              />
            </div>

            {error && (
              <div className="flex items-center gap-2 p-3 rounded-lg bg-red-500/10 border border-red-500/30">
                <AlertCircle className="w-4 h-4 text-red-400 flex-shrink-0" />
                <span className="text-sm text-red-200">{error}</span>
              </div>
            )}

            <Button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-purple-500 to-cyan-500 hover:from-purple-600 hover:to-cyan-600 text-primary-foreground"
            >
              {loading ? "Verifying..." : "Sign In"}
              <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </form>

          {/* Demo info */}
          <div className="mt-8 pt-6 border-t border-purple-500/20">
            <p className="text-xs font-semibold text-muted-foreground uppercase mb-3">Demo Accounts</p>
            <div className="space-y-2">
              {demoCredentials.map((cred) => (
                <button
                  key={cred.email}
                  onClick={() => quickLogin(cred.email)}
                  className="w-full p-3 rounded-lg border border-purple-500/20 hover:border-purple-500/40 hover:bg-purple-500/5 transition-colors text-left text-sm"
                >
                  <div className="font-medium">{cred.name}</div>
                  <div className="text-xs text-muted-foreground">{cred.email}</div>
                </button>
              ))}
            </div>
            <p className="text-xs text-muted-foreground mt-3">
              Password can be anything. Click a demo account to fill in the email.
            </p>
          </div>
        </Card>

        {/* Footer */}
        <div className="mt-6 text-center text-sm text-muted-foreground">
          <a href="/" className="hover:text-foreground transition-colors">
            Back to Home
          </a>
        </div>
      </div>
    </div>
  )
}

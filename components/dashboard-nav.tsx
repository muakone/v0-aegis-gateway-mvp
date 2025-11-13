"use client"

import { useRouter } from "next/navigation"
import { useAuthStore } from "@/lib/auth-context"
import { Button } from "@/components/ui/button"
import { LogOut, LayoutGrid } from "lucide-react"

interface DashboardNavProps {
  role: "Admin" | "User"
}

export function DashboardNav({ role }: DashboardNavProps) {
  const router = useRouter()
  const { user, logout } = useAuthStore()

  const handleLogout = () => {
    logout()
    router.push("/")
  }

  return (
    <nav className="fixed top-0 left-0 right-0 h-16 border-b border-purple-500/20 bg-card/50 backdrop-blur z-50">
      <div className="h-full px-6 flex items-center justify-between max-w-7xl mx-auto w-full">
        <div className="flex items-center gap-8">
          <a href="/" className="font-bold text-lg flex items-center gap-2">
            <div className="w-8 h-8 rounded bg-gradient-to-br from-purple-500 to-cyan-500" />
            Aegis
          </a>

          {role === "Admin" && (
            <div className="hidden sm:flex items-center gap-6">
              <a
                href="/dashboard"
                className="text-sm font-medium hover:text-accent transition-colors flex items-center gap-2"
              >
                <LayoutGrid className="w-4 h-4" />
                Dashboard
              </a>
            </div>
          )}
        </div>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-cyan-500 flex items-center justify-center text-xs font-bold text-white">
              {user?.name.charAt(0)}
            </div>
            <div className="hidden sm:block text-sm">
              <div className="font-medium">{user?.name}</div>
              <div className="text-xs text-muted-foreground">{user?.role}</div>
            </div>
          </div>

          <Button
            onClick={handleLogout}
            variant="ghost"
            size="sm"
            className="text-muted-foreground hover:text-foreground"
          >
            <LogOut className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </nav>
  )
}

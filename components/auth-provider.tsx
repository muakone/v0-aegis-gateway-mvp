"use client"

import type React from "react"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuthStore } from "@/lib/auth-context"

interface ProtectedLayoutProps {
  children: React.ReactNode
  allowedRoles?: Array<"Admin" | "User">
}

export function ProtectedLayout({ children, allowedRoles }: ProtectedLayoutProps) {
  const router = useRouter()
  const { user, isAuthenticated } = useAuthStore()

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/login")
    } else if (allowedRoles && user && !allowedRoles.includes(user.role)) {
      router.push(user.role === "Admin" ? "/dashboard" : "/portal")
    }
  }, [isAuthenticated, user, allowedRoles, router])

  if (!isAuthenticated) {
    return null
  }

  return <>{children}</>
}

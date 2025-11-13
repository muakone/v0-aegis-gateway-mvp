// Simple auth context for mock authentication
import { create } from "zustand"
import { persist } from "zustand/middleware"

interface User {
  id: string
  name: string
  email: string
  role: "Admin" | "User"
  device: string
}

interface AuthStore {
  user: User | null
  isAuthenticated: boolean
  login: (email: string, password: string) => boolean
  logout: () => void
}

const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      login: (email: string, password: string) => {
        // Mock authentication - check against mock users
        const mockUsers = [
          {
            id: "3e1d8f24-90c6-47a0-8fcb-bb9d2c4f8e42",
            name: "Olamide",
            email: "ola@aegis.com",
            role: "Admin" as const,
            device: "MacBook Pro",
          },
          {
            id: "91a5b102-92c1-4ad3-bf07-5e7df1b547b3",
            name: "Grace",
            email: "grace@aegis.com",
            role: "User" as const,
            device: "Windows Laptop",
          },
          {
            id: "db63a19c-2d9f-43cb-85cd-8323f2b8c312",
            name: "Carlos",
            email: "carlos@aegis.com",
            role: "User" as const,
            device: "iPad Air",
          },
        ]

        const user = mockUsers.find((u) => u.email === email)
        if (user) {
          set({ user, isAuthenticated: true })
          return true
        }
        return false
      },
      logout: () => {
        set({ user: null, isAuthenticated: false })
      },
    }),
    {
      name: "aegis-auth-storage", // localStorage key
    }
  )
)

export { useAuthStore }

export const useAuthStoreNamed = useAuthStore // Added named export for useAuthStore to fix deployment error

export const useAuth = () => {
  const user = useAuthStore((state) => state.user)
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated)
  const login = useAuthStore((state) => state.login)
  const logout = useAuthStore((state) => state.logout)

  return { user, isAuthenticated, login, logout }
}

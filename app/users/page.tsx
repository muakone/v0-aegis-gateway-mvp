"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Users, Search, Plus, Edit2, Trash2, UserCheck, Mail, Building2 } from "lucide-react"
import { mockUsers } from "@/lib/mock-data"

export default function UsersPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [filterRole, setFilterRole] = useState<string | null>(null)
  const [showCreateModal, setShowCreateModal] = useState(false)

  const filteredUsers = mockUsers.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesRole = !filterRole || user.role === filterRole
    return matchesSearch && matchesRole
  })

  const roles = ["Admin", "SecurityAnalyst", "ComplianceOfficer", "Manager", "User"]
  const roleColors: Record<string, string> = {
    Admin: "bg-red-500/20 text-red-400 border-red-500/30",
    SecurityAnalyst: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30",
    ComplianceOfficer: "bg-blue-500/20 text-blue-400 border-blue-500/30",
    Manager: "bg-purple-500/20 text-purple-400 border-purple-500/30",
    User: "bg-cyan-500/20 text-cyan-400 border-cyan-500/30",
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <header className="border-b border-purple-500/20 bg-card/50 backdrop-blur-sm sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">User Management</h1>
            <p className="text-sm text-muted-foreground mt-1">Manage users, roles, and permissions</p>
          </div>
          <Button onClick={() => setShowCreateModal(true)} className="bg-purple-600 hover:bg-purple-700">
            <Plus className="w-4 h-4 mr-2" />
            Add User
          </Button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Card className="p-4 border-purple-500/20">
            <p className="text-sm text-muted-foreground mb-1">Total Users</p>
            <p className="text-2xl font-bold">{mockUsers.length}</p>
          </Card>
          <Card className="p-4 border-purple-500/20">
            <p className="text-sm text-muted-foreground mb-1">Active Now</p>
            <p className="text-2xl font-bold text-green-400">{mockUsers.filter((u) => u.status === "online").length}</p>
          </Card>
          <Card className="p-4 border-purple-500/20">
            <p className="text-sm text-muted-foreground mb-1">MFA Enabled</p>
            <p className="text-2xl font-bold text-cyan-400">{mockUsers.filter((u) => u.mfaEnabled).length}</p>
          </Card>
          <Card className="p-4 border-purple-500/20">
            <p className="text-sm text-muted-foreground mb-1">High Risk Users</p>
            <p className="text-2xl font-bold text-red-400">{mockUsers.filter((u) => u.riskLevel > 0.5).length}</p>
          </Card>
        </div>

        {/* Filters */}
        <Card className="p-4 mb-6 border-purple-500/20">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Search users by name or email..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 bg-input border-purple-500/20 focus:border-purple-500"
                />
              </div>
            </div>
            <div className="flex gap-2">
              {roles.map((role) => (
                <Button
                  key={role}
                  variant={filterRole === role ? "default" : "outline"}
                  size="sm"
                  onClick={() => setFilterRole(filterRole === role ? null : role)}
                  className={filterRole === role ? "bg-purple-600" : ""}
                >
                  {role}
                </Button>
              ))}
            </div>
          </div>
        </Card>

        {/* Users List */}
        <div className="space-y-3">
          {filteredUsers.length > 0 ? (
            filteredUsers.map((user) => (
              <Card
                key={user.id}
                className="p-4 border-purple-500/20 hover:border-purple-500/40 transition-all cursor-pointer group"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-cyan-500 flex items-center justify-center text-sm font-bold">
                        {user.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </div>
                      <div>
                        <p className="font-semibold">{user.name}</p>
                        <p className="text-sm text-muted-foreground flex items-center gap-1">
                          <Mail className="w-3 h-3" />
                          {user.email}
                        </p>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mt-4 text-sm">
                      <div>
                        <p className="text-xs text-muted-foreground mb-1">Role</p>
                        <p className={`text-xs px-2 py-1 rounded-full border w-fit ${roleColors[user.role]}`}>
                          {user.role}
                        </p>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground mb-1">Department</p>
                        <p className="flex items-center gap-1">
                          <Building2 className="w-3 h-3" />
                          {user.department}
                        </p>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground mb-1">Status</p>
                        <p
                          className={`text-xs font-semibold ${user.status === "online" ? "text-green-400" : "text-muted-foreground"}`}
                        >
                          {user.status === "online" ? "🟢 Online" : "⚪ Offline"}
                        </p>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground mb-1">Risk Level</p>
                        <p
                          className={`text-xs font-semibold ${
                            user.riskLevel < 0.3
                              ? "text-green-400"
                              : user.riskLevel < 0.6
                                ? "text-yellow-400"
                                : "text-red-400"
                          }`}
                        >
                          {Math.round(user.riskLevel * 100)}%
                        </p>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground mb-1">MFA</p>
                        <p
                          className={`text-xs ${user.mfaEnabled ? "text-cyan-400 flex items-center gap-1" : "text-red-400"}`}
                        >
                          {user.mfaEnabled ? (
                            <>
                              <UserCheck className="w-3 h-3" />
                              Enabled
                            </>
                          ) : (
                            "Disabled"
                          )}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-cyan-400">
                      <Edit2 className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-red-400">
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </Card>
            ))
          ) : (
            <Card className="p-8 border-purple-500/20 text-center">
              <Users className="w-12 h-12 mx-auto mb-4 text-muted-foreground opacity-50" />
              <p className="text-muted-foreground">No users found</p>
            </Card>
          )}
        </div>
      </main>
    </div>
  )
}

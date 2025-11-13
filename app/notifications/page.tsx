"use client"

import { useState, useEffect } from "react"
import { AlertCircle, Bell, CheckCircle, Shield, Zap, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { useAuthStore } from "@/lib/auth-context"

interface Notification {
  id: string
  type: "alert" | "success" | "warning" | "critical"
  title: string
  message: string
  timestamp: Date
  actionRequired: boolean
  read: boolean
  icon: any
}

export default function NotificationsPage() {
  const { user } = useAuthStore()
  const [notifications, setNotifications] = useState<Notification[]>([])
  const [expandedId, setExpandedId] = useState<string | null>(null)

  useEffect(() => {
    // Simulate real-time notifications from incidents and access attempts
    const generatedNotifications: Notification[] = [
      {
        id: "notif-001",
        type: "critical",
        title: "Impossible Travel Detected",
        message: "Grace Chen login from Kenya (8 hours after New York login)",
        timestamp: new Date(Date.now() - 5 * 60000), // 5 min ago
        actionRequired: true,
        read: false,
        icon: AlertCircle,
      },
      {
        id: "notif-002",
        type: "alert",
        title: "Device Health Degradation",
        message: "Grace's Windows laptop: firewall disabled, encryption inactive",
        timestamp: new Date(Date.now() - 15 * 60000), // 15 min ago
        actionRequired: true,
        read: false,
        icon: Shield,
      },
      {
        id: "notif-003",
        type: "warning",
        title: "Unusual Activity Pattern",
        message: "Olamide's login frequency 300% above average today",
        timestamp: new Date(Date.now() - 45 * 60000), // 45 min ago
        actionRequired: false,
        read: false,
        icon: Zap,
      },
      {
        id: "notif-004",
        type: "success",
        title: "Policy Successfully Enforced",
        message: "Blocked high-risk access attempt from unmanaged device",
        timestamp: new Date(Date.now() - 120 * 60000), // 2 hours ago
        actionRequired: false,
        read: true,
        icon: CheckCircle,
      },
    ]
    setNotifications(generatedNotifications)
  }, [])

  const dismissNotification = (id: string) => {
    setNotifications(notifications.filter((n) => n.id !== id))
  }

  const markAsRead = (id: string) => {
    setNotifications(notifications.map((n) => (n.id === id ? { ...n, read: true } : n)))
  }

  const getBgColor = (type: string) => {
    switch (type) {
      case "critical":
        return "bg-red-500/10 border-red-500/30 hover:border-red-500/50"
      case "alert":
        return "bg-orange-500/10 border-orange-500/30 hover:border-orange-500/50"
      case "warning":
        return "bg-yellow-500/10 border-yellow-500/30 hover:border-yellow-500/50"
      case "success":
        return "bg-green-500/10 border-green-500/30 hover:border-green-500/50"
      default:
        return "bg-purple-500/10 border-purple-500/30"
    }
  }

  const getIconColor = (type: string) => {
    switch (type) {
      case "critical":
        return "text-red-400"
      case "alert":
        return "text-orange-400"
      case "warning":
        return "text-yellow-400"
      case "success":
        return "text-green-400"
      default:
        return "text-purple-400"
    }
  }

  const unreadCount = notifications.filter((n) => !n.read).length

  return (
    <div className="min-h-screen bg-background text-foreground p-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold flex items-center gap-3">
              <Bell className="w-10 h-10 text-accent" />
              Real-Time Notifications
            </h1>
            <p className="text-muted-foreground mt-2">Live security alerts and system events</p>
          </div>
          {unreadCount > 0 && (
            <div className="px-4 py-2 rounded-full bg-red-500/20 border border-red-500/30">
              <span className="text-red-400 font-semibold">{unreadCount} unread</span>
            </div>
          )}
        </div>

        <div className="space-y-4">
          {notifications.length === 0 ? (
            <Card className="p-12 text-center">
              <Bell className="w-12 h-12 mx-auto mb-4 text-muted-foreground opacity-50" />
              <p className="text-muted-foreground">No notifications</p>
            </Card>
          ) : (
            notifications.map((notif) => (
              <Card
                key={notif.id}
                className={`p-6 border cursor-pointer transition-all ${getBgColor(
                  notif.type,
                )} ${expandedId === notif.id ? "ring-2 ring-accent" : ""}`}
                onClick={() => setExpandedId(expandedId === notif.id ? null : notif.id)}
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-4 flex-1">
                    <notif.icon className={`w-6 h-6 mt-1 flex-shrink-0 ${getIconColor(notif.type)}`} />
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-semibold text-lg">{notif.title}</h3>
                        {notif.actionRequired && (
                          <span className="px-2 py-1 text-xs rounded-full bg-red-500/20 border border-red-500/30 text-red-400 font-semibold">
                            ACTION REQUIRED
                          </span>
                        )}
                        {notif.read && (
                          <span className="px-2 py-1 text-xs rounded-full bg-muted text-muted-foreground">Read</span>
                        )}
                      </div>
                      <p className="text-muted-foreground">{notif.message}</p>
                      <p className="text-xs text-muted-foreground mt-2">{notif.timestamp.toLocaleString()}</p>

                      {expandedId === notif.id && (
                        <div className="mt-4 pt-4 border-t border-purple-500/20 space-y-3">
                          <div className="bg-background/50 p-3 rounded border border-purple-500/10">
                            <p className="text-xs font-semibold text-accent mb-1">RECOMMENDED ACTION:</p>
                            <p className="text-sm text-muted-foreground">
                              {notif.type === "critical"
                                ? "Review user activity, require immediate password reset, revoke active sessions"
                                : notif.type === "alert"
                                  ? "Investigate device compliance status, isolate if necessary, notify user"
                                  : notif.type === "warning"
                                    ? "Monitor for escalation, gather more behavioral context"
                                    : "Continue monitoring security posture"}
                            </p>
                          </div>
                          <div className="flex gap-2">
                            <Button
                              size="sm"
                              className="bg-red-500/20 hover:bg-red-500/30 text-red-400 border border-red-500/30"
                              onClick={() => {
                                markAsRead(notif.id)
                              }}
                            >
                              Mark as Read
                            </Button>
                            <Button size="sm" variant="outline" onClick={() => dismissNotification(notif.id)}>
                              Dismiss
                            </Button>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      dismissNotification(notif.id)
                    }}
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </Card>
            ))
          )}
        </div>

        <Card className="mt-12 p-6 border-purple-500/30 bg-purple-500/5">
          <h3 className="font-semibold text-lg mb-3">Escalation Workflow</h3>
          <div className="space-y-2 text-sm">
            <div className="flex items-center gap-2">
              <span className="text-xs px-2 py-1 rounded bg-yellow-500/20 text-yellow-400 font-semibold">WARNING</span>
              <span className="text-muted-foreground">→ Log event, monitor behavior</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs px-2 py-1 rounded bg-orange-500/20 text-orange-400 font-semibold">ALERT</span>
              <span className="text-muted-foreground">→ Notify security team, require action</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs px-2 py-1 rounded bg-red-500/20 text-red-400 font-semibold">CRITICAL</span>
              <span className="text-muted-foreground">→ Auto-remediate, escalate to CISO, block access</span>
            </div>
          </div>
        </Card>
      </div>
    </div>
  )
}

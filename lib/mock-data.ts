// User types and roles
export type UserRole = "Admin" | "SecurityAnalyst" | "ComplianceOfficer" | "Manager" | "User"
export type DeviceStatus = "Healthy" | "At Risk" | "Compromised" | "Isolated"
export type AccessDecision = "Granted" | "Blocked" | "RequiresAuth" | "Quarantined"
export type IncidentSeverity = "Critical" | "High" | "Medium" | "Low"
export type PolicyAction = "Allow" | "Block" | "Require-MFA" | "Isolate" | "Monitor"
export type AccessRequestStatus = "Pending" | "Approved" | "Denied" | "Expired" | "Revoked"
export type RequestPriority = "Routine" | "Urgent" | "Emergency"

// Enhanced Users with team/department info
export const mockUsers = [
  {
    id: "3e1d8f24-90c6-47a0-8fcb-bb9d2c4f8e42",
    name: "Olamide Adeyemi",
    email: "ola@aegis.com",
    role: "Admin" as UserRole,
    department: "Security Operations",
    team: "Platform Security",
    device: "MacBook Pro",
    status: "online",
    riskLevel: 0.08,
    behaviorScore: 0.94,
    lastLogin: "2025-11-13T14:32:00Z",
    createdAt: "2025-01-15T00:00:00Z",
    mfaEnabled: true,
    panicButtonEnabled: true,
  },
  {
    id: "91a5b102-92c1-4ad3-bf07-5e7df1b547b3",
    name: "Grace Chen",
    email: "grace@aegis.com",
    role: "User" as UserRole,
    department: "Finance",
    team: "Treasury",
    device: "Windows Laptop",
    status: "online",
    riskLevel: 0.54,
    behaviorScore: 0.72,
    lastLogin: "2025-11-13T09:15:00Z",
    createdAt: "2025-02-20T00:00:00Z",
    mfaEnabled: true,
    panicButtonEnabled: true,
  },
  {
    id: "db63a19c-2d9f-43cb-85cd-8323f2b8c312",
    name: "Carlos Rodriguez",
    email: "carlos@aegis.com",
    role: "SecurityAnalyst" as UserRole,
    department: "Security Operations",
    team: "Threat Intelligence",
    device: "iPad Air",
    status: "offline",
    riskLevel: 0.12,
    behaviorScore: 0.89,
    lastLogin: "2025-11-12T16:45:00Z",
    createdAt: "2025-01-10T00:00:00Z",
    mfaEnabled: true,
    panicButtonEnabled: true,
  },
  {
    id: "a4c2d91e-5b8c-4a3d-9c5e-7f8g9h0i1j2k",
    name: "Priya Patel",
    email: "priya@aegis.com",
    role: "ComplianceOfficer" as UserRole,
    department: "Risk & Compliance",
    team: "Compliance",
    device: "MacBook Air",
    status: "online",
    riskLevel: 0.05,
    behaviorScore: 0.96,
    lastLogin: "2025-11-13T11:22:00Z",
    createdAt: "2025-03-01T00:00:00Z",
    mfaEnabled: true,
    panicButtonEnabled: true,
  },
]

// Device Management
export const mockDevices = [
  {
    id: "77b34f18-6715-4e4a-81c7-67b81a29e6f9",
    owner: "Olamide Adeyemi",
    ownerId: "3e1d8f24-90c6-47a0-8fcb-bb9d2c4f8e42",
    name: "MacBook Pro",
    status: "Healthy" as DeviceStatus,
    osVersion: "macOS 14.6",
    firewallStatus: "Enabled",
    encryptionStatus: "Active",
    antivirusStatus: "Current",
    lastPatched: "2025-11-10T00:00:00Z",
    trustScore: 0.95,
    riskFactors: [],
    serialNumber: "C8JH2Q7KLM92",
    model: "16-inch M3 Max",
  },
  {
    id: "c692b20a-67a3-4f27-9f25-6a5390b90743",
    owner: "Grace Chen",
    ownerId: "91a5b102-92c1-4ad3-bf07-5e7df1b547b3",
    name: "Windows Laptop",
    status: "At Risk" as DeviceStatus,
    osVersion: "Windows 11 (outdated)",
    firewallStatus: "Disabled",
    encryptionStatus: "Inactive",
    antivirusStatus: "Outdated",
    lastPatched: "2025-10-15T00:00:00Z",
    trustScore: 0.45,
    riskFactors: ["Missing OS patches", "Firewall disabled", "No encryption"],
    serialNumber: "5CD9N2X4JQ5P",
    model: "Dell XPS 15",
  },
  {
    id: "19c4837a-d05e-42da-8b4a-61ec8b51378e",
    owner: "Carlos Rodriguez",
    ownerId: "db63a19c-2d9f-43cb-85cd-8323f2b8c312",
    name: "iPad Air",
    status: "Healthy" as DeviceStatus,
    osVersion: "iPadOS 17.1",
    firewallStatus: "Enabled",
    encryptionStatus: "Active",
    antivirusStatus: "Current",
    lastPatched: "2025-11-12T00:00:00Z",
    trustScore: 0.92,
    riskFactors: [],
    serialNumber: "DM8N4K9PQ2R1",
    model: "iPad Air 5th Gen",
  },
]

// Access Control Policies
export const mockPolicies = [
  {
    id: "pol-001",
    name: "Finance Department - Secure Access",
    description: "Enforce MFA and device health checks for Finance team",
    department: "Finance",
    actions: ["Require-MFA" as PolicyAction, "Device Health Check"],
    conditions: {
      requireDeviceTrust: 0.8,
      requireMFA: true,
      timeRestrictions: "9AM-6PM",
      allowedCountries: ["US", "UK", "CA"],
    },
    enabled: true,
    createdAt: "2025-01-01T00:00:00Z",
  },
  {
    id: "pol-002",
    name: "Admin Access - Zero Trust",
    description: "Strictest access controls for admin operations",
    department: "Security",
    actions: ["Require-MFA" as PolicyAction, "Device Health Check", "Behavioral Analysis"],
    conditions: {
      requireDeviceTrust: 0.95,
      requireMFA: true,
      allowedDevices: ["MacBook Pro", "Managed iPhone"],
      timeRestrictions: "Business Hours",
    },
    enabled: true,
    createdAt: "2025-01-01T00:00:00Z",
  },
  {
    id: "pol-003",
    name: "Standard User Access",
    description: "Default policy for general user access",
    department: "General",
    actions: ["Monitor" as PolicyAction],
    conditions: {
      requireDeviceTrust: 0.6,
      requireMFA: false,
      allowedCountries: ["US", "UK", "CA", "EU"],
    },
    enabled: true,
    createdAt: "2025-01-01T00:00:00Z",
  },
]

// Behavioral Anomalies
export const mockAnomalies = [
  {
    id: "8af6c2a0-7e7b-42c9-9f2a-b3c76a3d9a56",
    user: "Grace Chen",
    userId: "91a5b102-92c1-4ad3-bf07-5e7df1b547b3",
    event: "Unusual login from Kenya",
    type: "Geolocation Anomaly",
    riskScore: 0.83,
    timestamp: "2025-11-13T10:22:00Z",
    context: {
      previousLocation: "New York, US",
      newLocation: "Nairobi, Kenya",
      distanceMiles: 7500,
      timeToTravel: "8+ hours",
    },
    resolution: "Pending",
  },
  {
    id: "59a33fa8-6e2d-4f97-b13d-d9653a89b9e1",
    user: "Olamide Adeyemi",
    userId: "3e1d8f24-90c6-47a0-8fcb-bb9d2c4f8e42",
    event: "Login frequency spike",
    type: "Behavior Pattern Anomaly",
    riskScore: 0.61,
    timestamp: "2025-11-13T08:45:00Z",
    context: {
      averageLoginsPerDay: 3,
      todayLogins: 12,
      percentageIncrease: 300,
    },
    resolution: "Investigating",
  },
  {
    id: "a1b2c3d4-e5f6-47a8-b9c0-d1e2f3a4b5c6",
    user: "Carlos Rodriguez",
    userId: "db63a19c-2d9f-43cb-85cd-8323f2b8c312",
    event: "Multiple failed login attempts",
    type: "Failed Authentication",
    riskScore: 0.45,
    timestamp: "2025-11-12T22:10:00Z",
    context: {
      failedAttempts: 5,
      timeWindow: "10 minutes",
      IPs: ["192.168.1.50", "192.168.1.51"],
    },
    resolution: "Resolved - Account locked",
  },
]

// Incidents & Threat Events
export const mockIncidents = [
  {
    id: "inc-001",
    title: "Suspected Credential Compromise",
    description: "Grace's account shows impossible travel - login from Kenya 8 hours after New York login",
    severity: "High" as IncidentSeverity,
    status: "Open",
    user: "Grace Chen",
    userId: "91a5b102-92c1-4ad3-bf07-5e7df1b547b3",
    createdAt: "2025-11-13T10:22:00Z",
    detectionMethod: "Behavioral Anomaly Detection",
    recommendedAction: "Require password reset, revoke active sessions",
  },
  {
    id: "inc-002",
    title: "Device Security Degradation",
    description: "Grace's Windows laptop firewall disabled and encryption inactive",
    severity: "High" as IncidentSeverity,
    status: "Open",
    device: "Windows Laptop",
    deviceId: "c692b20a-67a3-4f27-9f25-6a5390b90743",
    createdAt: "2025-11-12T14:00:00Z",
    detectionMethod: "Device Health Monitoring",
    recommendedAction: "Isolate device, require compliance before data access",
  },
  {
    id: "inc-003",
    title: "Brute Force Attack Detected",
    description: "5 failed login attempts to Carlos's account in 10 minutes",
    severity: "Medium" as IncidentSeverity,
    status: "Resolved",
    user: "Carlos Rodriguez",
    userId: "db63a19c-2d9f-43cb-85cd-8323f2b8c312",
    createdAt: "2025-11-12T22:10:00Z",
    detectionMethod: "Authentication Monitoring",
    recommendedAction: "Account automatically locked, MFA enforced",
  },
]

// Panic Button Events
export const mockPanicEvents = [
  {
    id: "panic-001",
    user: "Grace Chen",
    userId: "91a5b102-92c1-4ad3-bf07-5e7df1b547b3",
    device: "Windows Laptop",
    timestamp: "2025-11-13T09:32:00Z",
    reason: "Suspected device compromise",
    status: "Resolved",
    sessionTerminated: true,
    deviceQuarantined: true,
    notificationsSent: ["security@aegis.com", "ciso@aegis.com"],
  },
  {
    id: "panic-002",
    user: "Carlos Rodriguez",
    userId: "db63a19c-2d9f-43cb-85cd-8323f2b8c312",
    device: "iPad Air",
    timestamp: "2025-11-11T15:20:00Z",
    reason: "Lost device",
    status: "Resolved",
    sessionTerminated: true,
    deviceQuarantined: true,
    notificationsSent: ["security@aegis.com"],
  },
]

// Adding alias export for backward compatibility
export const mockPanicLogs = mockPanicEvents

// Access Log with detailed context
export const mockAccessLogs = [
  {
    id: "log-001",
    user: "Olamide Adeyemi",
    userId: "3e1d8f24-90c6-47a0-8fcb-bb9d2c4f8e42",
    device: "MacBook Pro",
    ip: "192.168.1.100",
    resource: "Financial Reports Database",
    action: "Read",
    decision: "Granted" as AccessDecision,
    riskScore: 0.12,
    timestamp: "2025-11-13T14:32:00Z",
    policyApplied: "Admin Access - Zero Trust",
    reason: "Admin role, device trusted, MFA verified",
  },
  {
    id: "log-002",
    user: "Grace Chen",
    userId: "91a5b102-92c1-4ad3-bf07-5e7df1b547b3",
    device: "Windows Laptop",
    ip: "197.248.51.78",
    resource: "Payroll System",
    action: "Write",
    decision: "Blocked" as AccessDecision,
    riskScore: 0.89,
    timestamp: "2025-11-13T10:15:00Z",
    policyApplied: "Finance Department - Secure Access",
    reason: "Device at risk (firewall disabled, no encryption), impossible travel detected",
  },
  {
    id: "log-003",
    user: "Carlos Rodriguez",
    userId: "db63a19c-2d9f-43cb-85cd-8323f2b8c312",
    device: "iPad Air",
    ip: "172.16.0.54",
    resource: "Threat Intelligence Platform",
    action: "Read",
    decision: "Granted" as AccessDecision,
    riskScore: 0.08,
    timestamp: "2025-11-13T09:42:00Z",
    policyApplied: "Standard User Access",
    reason: "Device healthy, MFA verified, low risk profile",
  },
]

// Compliance Reports
export const mockComplianceData = {
  soc2: {
    score: 94,
    status: "Compliant",
    lastAudit: "2025-10-15T00:00:00Z",
    nextAudit: "2026-04-15T00:00:00Z",
    findings: [],
  },
  iso27001: {
    score: 91,
    status: "Compliant",
    lastAudit: "2025-09-01T00:00:00Z",
    nextAudit: "2026-03-01T00:00:00Z",
    findings: [{ id: "iso-001", description: "One device missing latest OS patches", severity: "Low" }],
  },
  hipaa: {
    score: 96,
    status: "Compliant",
    lastAudit: "2025-08-20T00:00:00Z",
    nextAudit: "2026-02-20T00:00:00Z",
    findings: [],
  },
  pciDss: {
    score: 89,
    status: "Non-Compliant",
    lastAudit: "2025-11-01T00:00:00Z",
    nextAudit: "2025-12-01T00:00:00Z",
    findings: [
      { id: "pci-001", description: "Payment card data requires additional encryption", severity: "High" },
      { id: "pci-002", description: "Audit logs need 7-year retention policy", severity: "Medium" },
    ],
  },
}

// User Activity Timeline
export const mockActivityTimeline = [
  {
    id: "act-001",
    user: "Olamide Adeyemi",
    action: "Admin Access",
    target: "User Management Panel",
    timestamp: "2025-11-13T15:30:00Z",
    status: "Success",
    details: "Modified security policies",
  },
  {
    id: "act-002",
    user: "Grace Chen",
    action: "Data Access",
    target: "Financial Reports",
    timestamp: "2025-11-13T14:15:00Z",
    status: "Blocked",
    details: "Device not compliant",
  },
  {
    id: "act-003",
    user: "Carlos Rodriguez",
    action: "Report Generation",
    target: "Threat Intelligence Report",
    timestamp: "2025-11-13T13:45:00Z",
    status: "Success",
    details: "Generated quarterly security report",
  },
]

// Access Request Workflows
export const mockAccessRequests = [
  {
    id: "req-001",
    userId: "91a5b102-92c1-4ad3-bf07-5e7df1b547b3",
    userName: "Grace Chen",
    resource: "Financial Reports Database",
    justification: "Quarterly financial reconciliation",
    requestedAt: "2025-11-13T14:00:00Z",
    expiresAt: "2025-11-13T18:00:00Z",
    status: "Pending" as AccessRequestStatus,
    priority: "Routine" as RequestPriority,
    requiresApproval: true,
    approvedBy: null,
    denialReason: null,
  },
  {
    id: "req-002",
    userId: "db63a19c-2d9f-43cb-85cd-8323f2b8c312",
    userName: "Carlos Rodriguez",
    resource: "Threat Intelligence Platform",
    justification: "Investigate reported anomaly",
    requestedAt: "2025-11-13T10:30:00Z",
    expiresAt: "2025-11-14T10:30:00Z",
    status: "Approved" as AccessRequestStatus,
    priority: "Urgent" as RequestPriority,
    requiresApproval: true,
    approvedBy: "Olamide Adeyemi",
  },
]

// Device Enrollment & Onboarding
export const mockDeviceEnrollments = [
  {
    id: "enroll-001",
    userId: "91a5b102-92c1-4ad3-bf07-5e7df1b547b3",
    userName: "Grace Chen",
    deviceName: "Personal MacBook",
    deviceType: "Laptop",
    status: "Pending",
    enrollmentStep: 3,
    totalSteps: 5,
    createdAt: "2025-11-13T12:00:00Z",
    completedAt: null,
    certificate: null,
  },
]

// Context-Aware Access Signals
export const mockAccessSignals = [
  {
    id: "signal-001",
    userId: "91a5b102-92c1-4ad3-bf07-5e7df1b547b3",
    geolocation: { city: "New York", country: "US", lat: 40.7128, lon: -74.006 },
    network: { type: "Home WiFi", security: "WPA3", ipReputation: "Clean" },
    timeContext: { dayOfWeek: "Wednesday", hour: 14, businessHours: true },
    behaviorContext: {
      isNormalTime: true,
      isNormalLocation: true,
      isNormalDevice: true,
      isNormalApplication: true,
    },
    riskFactors: [],
    trustScore: 0.92,
    timestamp: "2025-11-13T14:32:00Z",
  },
]

// Advanced Risk Scoring Breakdown
export const mockRiskScoreBreakdown = [
  {
    userId: "91a5b102-92c1-4ad3-bf07-5e7df1b547b3",
    userName: "Grace Chen",
    overallRisk: 0.54,
    breakdown: {
      device: { score: 0.65, factors: ["Firewall disabled", "OS outdated", "No encryption"] },
      behavior: { score: 0.28, factors: ["Normal access pattern", "Routine hours"] },
      context: { score: 0.83, factors: ["Impossible travel detected", "Unusual network"] },
      identity: { score: 0.12, factors: ["MFA verified", "Known device"] },
    },
  },
]

// Incident Response Playbooks
export const mockIncidentPlaybooks = [
  {
    id: "playbook-001",
    name: "Impossible Travel Response",
    trigger: "Geolocation Anomaly",
    steps: [
      { step: 1, action: "Alert user for verification", waitTime: "5 minutes" },
      { step: 2, action: "Request additional MFA", waitTime: "2 minutes" },
      { step: 3, action: "Block sensitive resource access", waitTime: "Immediate" },
      { step: 4, action: "Notify security team", waitTime: "Immediate" },
    ],
    enabled: true,
  },
]

// Compliance Scoring & Automation
export const mockComplianceFrameworks = [
  {
    framework: "SOC 2",
    overallScore: 94,
    sections: {
      "CC6.1: Logical Access": 98,
      "CC7.1: Monitoring": 92,
      "CC7.2: Analysis": 89,
    },
    automatedChecks: 12,
    manualReviews: 2,
    nextAuditDate: "2026-04-15T00:00:00Z",
  },
  {
    framework: "ISO 27001",
    overallScore: 91,
    sections: {
      "A.9: Access Control": 95,
      "A.12: Operations Security": 89,
      "A.13: Communications Security": 88,
    },
    automatedChecks: 24,
    manualReviews: 3,
    nextAuditDate: "2026-03-01T00:00:00Z",
  },
]

// Advanced Analytics
export const mockAnalytics = {
  accessPatterns: [
    { hour: 0, accessCount: 5, failedCount: 0 },
    { hour: 1, accessCount: 2, failedCount: 1 },
    { hour: 8, accessCount: 45, failedCount: 2 },
    { hour: 9, accessCount: 120, failedCount: 5 },
    { hour: 12, accessCount: 85, failedCount: 1 },
    { hour: 17, accessCount: 95, failedCount: 3 },
  ],
  topAccessedResources: [
    { resource: "Financial Reports Database", count: 342, avgTime: "12min" },
    { resource: "Threat Intelligence Platform", count: 218, avgTime: "28min" },
    { resource: "User Management System", count: 145, avgTime: "5min" },
  ],
  insiderThreats: [
    {
      userId: "91a5b102-92c1-4ad3-bf07-5e7df1b547b3",
      riskScore: 0.72,
      reason: "Excessive privilege escalation requests",
    },
  ],
}

// VPN vs Zero Trust Comparison
export const mockComparisonData = {
  vpn: {
    name: "Traditional VPN",
    pros: ["Familiar", "Established"],
    cons: [
      "Slow (100-200ms latency)",
      "Assumes network is safe (perimeter-based)",
      "No device context",
      "Single point of failure",
      "All-or-nothing access",
    ],
    latency: "150ms avg",
    deviceCheck: false,
    behavioralAnalytics: false,
    panicButton: false,
  },
  zeroTrust: {
    name: "Aegis Gateway (Zero Trust)",
    pros: [
      "Fast (10-30ms latency)",
      "Assumes breach (verify everything)",
      "Continuous device verification",
      "Distributed architecture",
      "Granular access control",
    ],
    cons: ["Requires setup", "Behavioral learning curve"],
    latency: "15ms avg",
    deviceCheck: true,
    behavioralAnalytics: true,
    panicButton: true,
  },
}

// ROI & Business Metrics
export const mockROIMetrics = {
  productivity: {
    vpnLatency: "150ms avg",
    zeroTrustLatency: "15ms avg",
    productivityGain: "23%",
    timeRecoveredPerEmployeePerYear: "46 hours",
  },
  security: {
    incidentsPreventedMonthly: 12,
    averageIncidentResponseTime: "12 minutes",
    costPerIncidentPrevented: "$45,000",
    monthlyCostSavings: "$540,000",
  },
  compliance: {
    auditTimeReduced: "40%",
    automatedAuditTrails: "100%",
    complianceFrameworksCovered: 4,
    costPerAuditReduced: "$125,000",
  },
}

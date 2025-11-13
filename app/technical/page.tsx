"use client"

import { Card } from "@/components/ui/card"
import { CheckCircle, Code, Database, Zap, Shield, Brain, Activity } from "lucide-react"

export default function TechnicalPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <div className="border-b border-purple-500/20 bg-card/50 backdrop-blur">
        <div className="max-w-6xl mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded bg-gradient-to-br from-purple-500 to-cyan-500" />
              <div>
                <h1 className="text-xl font-bold">Aegis Gateway</h1>
                <p className="text-xs text-muted-foreground">Technical Implementation</p>
              </div>
            </div>
            <a href="/" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Back to Home
            </a>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-12">
        {/* Hero */}
        <div className="mb-12">
          <h2 className="text-4xl font-bold mb-4">Technical Implementation Guide</h2>
          <p className="text-lg text-muted-foreground max-w-3xl">
            This document explains how each demo feature would be implemented in production. Use this to answer
            technical feasibility questions from judges.
          </p>
        </div>

        {/* Architecture Overview */}
        <section className="mb-16">
          <h3 className="text-2xl font-bold mb-6 flex items-center gap-3">
            <Database className="w-6 h-6 text-purple-400" />
            System Architecture
          </h3>
          <Card className="p-6 border-purple-500/30 bg-card">
            <pre className="text-sm overflow-x-auto">
              {`┌─────────────────┐     ┌──────────────────┐     ┌─────────────────┐
│  Aegis Agent    │────▶│  Policy Engine   │────▶│  Core Systems   │
│  (Employee      │     │  (Access Control)│     │  (Salesforce,   │
│   Device)       │     │                  │     │   Office 365)   │
└─────────────────┘     └──────────────────┘     └─────────────────┘
        │                        │
        │                        │
        ▼                        ▼
┌─────────────────┐     ┌──────────────────┐
│  Device Health  │     │  Risk Analytics  │
│  Monitoring     │     │  Engine (ML)     │
└─────────────────┘     └──────────────────┘`}
            </pre>
          </Card>
        </section>

        {/* Feature Implementations */}
        <section className="space-y-12 mb-16">
          <h3 className="text-2xl font-bold mb-6">Feature-by-Feature Implementation</h3>

          {/* Device Health Monitoring */}
          <Card className="p-8 border-purple-500/30">
            <div className="flex items-start gap-4 mb-6">
              <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center flex-shrink-0">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <div>
                <h4 className="text-xl font-bold mb-2">1. Device Health Monitoring</h4>
                <p className="text-sm text-muted-foreground">Lightweight agent (50MB) runs on employee devices</p>
              </div>
            </div>

            <div className="space-y-6">
              <div>
                <p className="font-semibold mb-2 text-sm text-purple-400">Technology Stack</p>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• <strong>Agent:</strong> Electron app (cross-platform: Windows, macOS, Linux)</li>
                  <li>• <strong>Language:</strong> Rust or Go (performance + system-level access)</li>
                  <li>• <strong>Communication:</strong> WebSocket connection to backend for real-time updates</li>
                </ul>
              </div>

              <div>
                <p className="font-semibold mb-2 text-sm text-purple-400">How It Works</p>
                <div className="p-4 rounded-lg bg-purple-500/5 border border-purple-500/20">
                  <p className="text-sm mb-2">Continuous health checks every 60 seconds:</p>
                  <pre className="text-xs overflow-x-auto text-muted-foreground">
{`setInterval(async () => {
  const health = {
    os_version: await getOSVersion(),
    firewall_enabled: await checkFirewall(),
    disk_encrypted: await checkEncryption(),
    antivirus_active: await checkAntivirus(),
    last_updated: Date.now()
  }
  
  ws.send(JSON.stringify({
    type: 'HEALTH_UPDATE',
    device_id: deviceId,
    data: health
  }))
}, 60000)`}
                  </pre>
                </div>
              </div>

              <div className="p-4 rounded-lg bg-green-500/10 border border-green-500/30">
                <p className="font-semibold text-sm text-green-400 mb-2">Judge Q&A:</p>
                <div className="space-y-2 text-sm">
                  <div>
                    <p className="font-semibold">Q: How do you access system-level information?</p>
                    <p className="text-muted-foreground">
                      A: Agent requires admin installation once. Runs with elevated privileges (like antivirus). On
                      macOS: System Extensions API. On Windows: WMI.
                    </p>
                  </div>
                  <div>
                    <p className="font-semibold">Q: What if agent is disabled?</p>
                    <p className="text-muted-foreground">
                      A: If agent stops reporting for 5 minutes, device trust score drops to 0, all access revoked.
                      Backend treats "agent offline" as "device compromised."
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </Card>

          {/* Real-Time Access Decisions */}
          <Card className="p-8 border-purple-500/30">
            <div className="flex items-start gap-4 mb-6">
              <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-cyan-500 to-blue-500 flex items-center justify-center flex-shrink-0">
                <Zap className="w-6 h-6 text-white" />
              </div>
              <div>
                <h4 className="text-xl font-bold mb-2">2. Real-Time Access Decisions (18ms)</h4>
                <p className="text-sm text-muted-foreground">Sub-20ms decision time through caching + parallelization</p>
              </div>
            </div>

            <div className="space-y-6">
              <div>
                <p className="font-semibold mb-2 text-sm text-purple-400">Technology Stack</p>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• <strong>Policy Engine:</strong> Go (for speed)</li>
                  <li>• <strong>Cache:</strong> Redis (sub-millisecond lookups)</li>
                  <li>• <strong>ML Model:</strong> ONNX Runtime (pre-compiled behavioral models)</li>
                  <li>• <strong>Database:</strong> PostgreSQL (access logs), MongoDB (user profiles)</li>
                </ul>
              </div>

              <div>
                <p className="font-semibold mb-2 text-sm text-purple-400">Why So Fast?</p>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="p-3 rounded bg-card border border-purple-500/20">
                    <p className="text-sm font-semibold mb-1">Identity (3ms)</p>
                    <p className="text-xs text-muted-foreground">JWT signature validation (no DB hit)</p>
                  </div>
                  <div className="p-3 rounded bg-card border border-purple-500/20">
                    <p className="text-sm font-semibold mb-1">Device (2ms)</p>
                    <p className="text-xs text-muted-foreground">Trust score from Redis cache (60s TTL)</p>
                  </div>
                  <div className="p-3 rounded bg-card border border-purple-500/20">
                    <p className="text-sm font-semibold mb-1">Behavior (8ms)</p>
                    <p className="text-xs text-muted-foreground">ONNX model inference on CPU</p>
                  </div>
                  <div className="p-3 rounded bg-card border border-purple-500/20">
                    <p className="text-sm font-semibold mb-1">Context (5ms)</p>
                    <p className="text-xs text-muted-foreground">Geo-IP lookup from MaxMind cache</p>
                  </div>
                </div>
                <p className="text-sm text-cyan-400 font-semibold mt-3">Total: ~18ms (plus network latency)</p>
              </div>

              <div className="p-4 rounded-lg bg-cyan-500/10 border border-cyan-500/30">
                <p className="font-semibold text-sm text-cyan-400 mb-2">Judge Q&A:</p>
                <div className="space-y-2 text-sm">
                  <div>
                    <p className="font-semibold">Q: 18ms seems too fast. How?</p>
                    <p className="text-muted-foreground">
                      A: We pre-compute and cache everything. Device health cached for 60s. MFA tokens validated
                      locally with JWT. Only real-time computation is ML inference (8ms on CPU). Not hitting databases
                      on every request—that's the key.
                    </p>
                  </div>
                  <div>
                    <p className="font-semibold">Q: What if Redis goes down?</p>
                    <p className="text-muted-foreground">
                      A: Fallback to PostgreSQL (slower, ~100ms). Redis runs in cluster mode with automatic failover.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </Card>

          {/* Behavioral Analysis */}
          <Card className="p-8 border-purple-500/30">
            <div className="flex items-start gap-4 mb-6">
              <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center flex-shrink-0">
                <Brain className="w-6 h-6 text-white" />
              </div>
              <div>
                <h4 className="text-xl font-bold mb-2">3. Behavioral Analysis (ML Model)</h4>
                <p className="text-sm text-muted-foreground">Detects impossible travel, abnormal patterns, insider threats</p>
              </div>
            </div>

            <div className="space-y-6">
              <div>
                <p className="font-semibold mb-2 text-sm text-purple-400">Technology Stack</p>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• <strong>Model Training:</strong> Python (scikit-learn, XGBoost)</li>
                  <li>• <strong>Model Serving:</strong> ONNX Runtime (C++ for speed)</li>
                  <li>• <strong>Feature Store:</strong> Redis + PostgreSQL</li>
                  <li>• <strong>Training Data:</strong> Historical access logs (anonymized)</li>
                </ul>
              </div>

              <div>
                <p className="font-semibold mb-2 text-sm text-purple-400">Feature Engineering</p>
                <div className="p-4 rounded-lg bg-purple-500/5 border border-purple-500/20 text-xs">
                  <ul className="space-y-1 text-muted-foreground">
                    <li><strong>Temporal:</strong> hour_of_day, day_of_week, is_business_hours</li>
                    <li><strong>Geolocation:</strong> lat/lon, distance_from_usual, travel_speed</li>
                    <li><strong>Behavioral:</strong> avg_daily_logins, typical_resources, access_frequency</li>
                    <li><strong>Device:</strong> new_device, device_trust_score</li>
                  </ul>
                </div>
              </div>

              <div>
                <p className="font-semibold mb-2 text-sm text-purple-400">Impossible Travel Detection</p>
                <div className="p-4 rounded-lg bg-purple-500/5 border border-purple-500/20">
                  <pre className="text-xs overflow-x-auto text-muted-foreground">
{`# Calculate distance using Haversine formula
distance_km = haversine(prev_lat, prev_lon, curr_lat, curr_lon)

# Calculate required speed
time_diff_hours = (current_time - prev_time) / 3600
required_speed = distance_km / time_diff_hours

# Commercial plane max speed: ~900 km/h
if required_speed > 900:
    return {'is_impossible': True, 'risk_score': 98}`}
                  </pre>
                </div>
              </div>

              <div className="p-4 rounded-lg bg-purple-500/10 border border-purple-500/30">
                <p className="font-semibold text-sm text-purple-400 mb-2">Judge Q&A:</p>
                <div className="space-y-2 text-sm">
                  <div>
                    <p className="font-semibold">Q: How do you train without real data?</p>
                    <p className="text-muted-foreground">
                      A: Start with synthetic data based on known attack patterns. Once deployed, use anonymized customer
                      logs (with consent) to retrain weekly. Model improves over time.
                    </p>
                  </div>
                  <div>
                    <p className="font-semibold">Q: What's your false positive rate?</p>
                    <p className="text-muted-foreground">
                      A: After 30-day learning period, &lt;2% false positives. Users can appeal via secondary MFA. Log
                      all false positives for model retraining.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </Card>

          {/* Panic Button */}
          <Card className="p-8 border-purple-500/30">
            <div className="flex items-start gap-4 mb-6">
              <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-red-500 to-orange-500 flex items-center justify-center flex-shrink-0">
                <Activity className="w-6 h-6 text-white" />
              </div>
              <div>
                <h4 className="text-xl font-bold mb-2">4. Panic Button (Emergency Lockdown)</h4>
                <p className="text-sm text-muted-foreground">All sessions terminated in &lt;5 seconds</p>
              </div>
            </div>

            <div className="space-y-6">
              <div>
                <p className="font-semibold mb-2 text-sm text-purple-400">Technology Stack</p>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• <strong>Mobile App:</strong> React Native (iOS/Android)</li>
                  <li>• <strong>Backend:</strong> Node.js + Socket.io (real-time coordination)</li>
                  <li>• <strong>Session Store:</strong> Redis (fast session revocation)</li>
                  <li>• <strong>Notifications:</strong> Twilio (SMS), SendGrid (Email), FCM (Push)</li>
                </ul>
              </div>

              <div>
                <p className="font-semibold mb-2 text-sm text-purple-400">6-Step Lockdown Process</p>
                <div className="space-y-2">
                  {[
                    "Terminate all active sessions (Redis key deletion)",
                    "Isolate device (add to blacklist)",
                    "Notify security team (Slack + Email)",
                    "Alert manager (Push notification)",
                    "Enable location tracking",
                    "Complete lockdown (WebSocket confirmation)"
                  ].map((step, i) => (
                    <div key={i} className="flex items-center gap-3 p-3 rounded bg-card border border-red-500/20">
                      <div className="w-6 h-6 rounded-full bg-red-500 flex items-center justify-center text-xs font-bold flex-shrink-0">
                        {i + 1}
                      </div>
                      <p className="text-sm">{step}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="p-4 rounded-lg bg-red-500/10 border border-red-500/30">
                <p className="font-semibold text-sm text-red-400 mb-2">Judge Q&A:</p>
                <div className="space-y-2 text-sm">
                  <div>
                    <p className="font-semibold">Q: How do you terminate sessions in &lt;5 seconds?</p>
                    <p className="text-muted-foreground">
                      A: All sessions stored in Redis with TTL. Panic button deletes all session keys for that user.
                      Next access attempt checks Redis, finds no session, denies access. Redis operations take
                      milliseconds.
                    </p>
                  </div>
                  <div>
                    <p className="font-semibold">Q: What if device is already stolen and offline?</p>
                    <p className="text-muted-foreground">
                      A: Panic button works from mobile app. Employee presses from phone, triggers same lockdown. Stolen
                      laptop can't access anything because session tokens revoked server-side.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </section>

        {/* Scalability */}
        <section className="mb-16">
          <h3 className="text-2xl font-bold mb-6">Scalability & Performance</h3>
          <Card className="p-8 border-purple-500/30">
            <h4 className="text-lg font-bold mb-4">Handling 50,000 Employees</h4>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-purple-500/20">
                    <th className="text-left py-3 px-4 font-semibold text-muted-foreground">Metric</th>
                    <th className="text-left py-3 px-4 font-semibold text-muted-foreground">Value</th>
                    <th className="text-left py-3 px-4 font-semibold text-muted-foreground">How We Achieve It</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-purple-500/10">
                    <td className="py-3 px-4">Access decisions/sec</td>
                    <td className="py-3 px-4 font-semibold text-cyan-400">10,000+</td>
                    <td className="py-3 px-4 text-muted-foreground">Horizontal scaling (10 policy engine nodes)</td>
                  </tr>
                  <tr className="border-b border-purple-500/10">
                    <td className="py-3 px-4">Agent check-ins/sec</td>
                    <td className="py-3 px-4 font-semibold text-cyan-400">50,000+</td>
                    <td className="py-3 px-4 text-muted-foreground">WebSocket fan-out via NATS messaging</td>
                  </tr>
                  <tr className="border-b border-purple-500/10">
                    <td className="py-3 px-4">ML inference latency</td>
                    <td className="py-3 px-4 font-semibold text-cyan-400">8ms</td>
                    <td className="py-3 px-4 text-muted-foreground">ONNX model runs on CPU, no GPU needed</td>
                  </tr>
                  <tr className="border-b border-purple-500/10">
                    <td className="py-3 px-4">Database queries/sec</td>
                    <td className="py-3 px-4 font-semibold text-cyan-400">100,000+</td>
                    <td className="py-3 px-4 text-muted-foreground">Read replicas (5 nodes), Redis cache 95% hit rate</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="mt-6 p-4 rounded-lg bg-purple-500/10 border border-purple-500/30">
              <p className="font-semibold text-sm text-purple-400 mb-2">Judge Q&A:</p>
              <div className="space-y-2 text-sm">
                <div>
                  <p className="font-semibold">Q: How does this scale to 50,000 employees?</p>
                  <p className="text-muted-foreground">
                    A: All access decisions made at the edge—no central bottleneck. Policy engine runs on 10+ nodes
                    behind load balancer. Device health cached in Redis. Scale horizontally by adding nodes. Each node
                    handles 1,000 decisions/sec.
                  </p>
                </div>
              </div>
            </div>
          </Card>
        </section>

        {/* Cost Structure */}
        <section className="mb-16">
          <h3 className="text-2xl font-bold mb-6">Cost Structure</h3>
          <Card className="p-8 border-purple-500/30">
            <h4 className="text-lg font-bold mb-4">Infrastructure Costs (500 employees)</h4>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-purple-500/20">
                    <th className="text-left py-3 px-4 font-semibold text-muted-foreground">Component</th>
                    <th className="text-left py-3 px-4 font-semibold text-muted-foreground">Monthly Cost</th>
                    <th className="text-left py-3 px-4 font-semibold text-muted-foreground">Vendor</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-purple-500/10">
                    <td className="py-3 px-4">Compute (Policy Engine, 10 nodes)</td>
                    <td className="py-3 px-4 font-semibold">$500</td>
                    <td className="py-3 px-4 text-muted-foreground">AWS EC2</td>
                  </tr>
                  <tr className="border-b border-purple-500/10">
                    <td className="py-3 px-4">Database (PostgreSQL + MongoDB)</td>
                    <td className="py-3 px-4 font-semibold">$300</td>
                    <td className="py-3 px-4 text-muted-foreground">AWS RDS + Atlas</td>
                  </tr>
                  <tr className="border-b border-purple-500/10">
                    <td className="py-3 px-4">Redis Cache (HA cluster)</td>
                    <td className="py-3 px-4 font-semibold">$150</td>
                    <td className="py-3 px-4 text-muted-foreground">AWS ElastiCache</td>
                  </tr>
                  <tr className="border-b border-purple-500/10">
                    <td className="py-3 px-4">Load Balancer</td>
                    <td className="py-3 px-4 font-semibold">$50</td>
                    <td className="py-3 px-4 text-muted-foreground">AWS ALB</td>
                  </tr>
                  <tr className="border-b border-purple-500/10">
                    <td className="py-3 px-4">Monitoring (Datadog)</td>
                    <td className="py-3 px-4 font-semibold">$200</td>
                    <td className="py-3 px-4 text-muted-foreground">Datadog</td>
                  </tr>
                  <tr className="border-b border-purple-500/10">
                    <td className="py-3 px-4">SMS Alerts (1,000/month)</td>
                    <td className="py-3 px-4 font-semibold">$80</td>
                    <td className="py-3 px-4 text-muted-foreground">Twilio</td>
                  </tr>
                  <tr className="border-b-2 border-purple-500/30">
                    <td className="py-3 px-4 font-bold">Total Infrastructure</td>
                    <td className="py-3 px-4 font-bold text-cyan-400">$1,280/month</td>
                    <td className="py-3 px-4"></td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="mt-6 grid md:grid-cols-3 gap-4">
              <div className="p-4 rounded bg-purple-500/10 border border-purple-500/30">
                <p className="text-sm font-semibold mb-1">Cost per User</p>
                <p className="text-2xl font-bold text-purple-400">$2.56/mo</p>
              </div>
              <div className="p-4 rounded bg-cyan-500/10 border border-cyan-500/30">
                <p className="text-sm font-semibold mb-1">Revenue per User</p>
                <p className="text-2xl font-bold text-cyan-400">$18/mo</p>
              </div>
              <div className="p-4 rounded bg-green-500/10 border border-green-500/30">
                <p className="text-sm font-semibold mb-1">Gross Margin</p>
                <p className="text-2xl font-bold text-green-400">86%</p>
              </div>
            </div>
          </Card>
        </section>

        {/* Quick Reference */}
        <section className="mb-16">
          <h3 className="text-2xl font-bold mb-6">Quick Reference: Judge Q&A</h3>
          <Card className="p-8 border-purple-500/30">
            <div className="space-y-4">
              {[
                {
                  q: "How do you make decisions in 18ms?",
                  a: "Pre-computed caching + parallel processing + ONNX model inference. No database hits on critical path."
                },
                {
                  q: "How do you terminate sessions so fast?",
                  a: "Sessions stored in Redis. Panic button deletes session keys. Next access request fails authentication."
                },
                {
                  q: "What about false positives?",
                  a: "<2% after 30-day learning. Users can appeal via secondary MFA. We log and retrain on false positives."
                },
                {
                  q: "How does this scale to 50K employees?",
                  a: "Horizontal scaling. Policy engine runs on 10+ nodes. Redis cache hit rate 95%. No single point of failure."
                },
                {
                  q: "Is this really Zero Trust?",
                  a: "Yes. Every access request re-verified. No implicit trust. Continuous authentication, not just login."
                },
                {
                  q: "What's your moat?",
                  a: "Speed to market. Focused on financial services first. By the time Cisco builds this, we'll have 100+ banks. They'll acquire us."
                }
              ].map((item, i) => (
                <div key={i} className="p-4 rounded-lg bg-card border border-purple-500/20">
                  <p className="font-semibold text-sm mb-2 flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-400" />
                    {item.q}
                  </p>
                  <p className="text-sm text-muted-foreground ml-6">{item.a}</p>
                </div>
              ))}
            </div>
          </Card>
        </section>

        {/* Footer */}
        <div className="text-center text-sm text-muted-foreground">
          <p>Document Version: 1.0 | Last Updated: November 13, 2025</p>
          <p className="mt-2">For full implementation details, see TECHNICAL_IMPLEMENTATION.md in repository</p>
        </div>
      </div>
    </div>
  )
}

# Route Navigation Guide

## ⚠️ IMPORTANT: Use These Routes for Demo

### NEW Routes (Use These!)

| Route | Purpose | Key Features |
|-------|---------|-------------|
| `/employee` | **Employee Portal** | ✅ Enhanced panic button with progress modals<br>✅ Device health dashboard<br>✅ Access request tracking |
| `/access-intelligence` | **Admin: Access Intelligence** | ✅ **LIVE ACCESS DECISION SIMULATOR** (18ms decisions)<br>✅ Context-aware access control<br>✅ Real-time 4-pillar verification |
| `/attack-simulation` | **Admin: Security Drills** | ✅ Renamed to "Security Drills & Posture Testing"<br>✅ Clear testing purpose |

### OLD Routes (Deprecated - Don't Demo These!)

| Route | Status | Replacement |
|-------|--------|-------------|
| `/portal` | ❌ OLD | Use `/employee` instead |
| `/dashboard` | ❌ OLD | Use `/access-intelligence` instead |

---

## Demo Flow Quick Reference

### 1. Start: Landing Page
- URL: `https://aegis-gateway.vercel.app/`
- Scroll through: Hero → Problem → Solution → Features → Pricing → **How It Works**
- Click: **"Try Live Demo"** button at end of How It Works section

### 2. Login
- URL: `/login`
- Click: **"Login as Grace Chen"** (employee)

### 3. Employee Experience
- URL: `/employee` ⭐
- Demo: **Click panic button** → Watch 6-step lockdown progress
- Show: Device health, access history

### 4. Admin Experience
- Switch to: **"Login as Admin"** from `/login`
- URL: `/access-intelligence` ⭐ (skip `/dashboard`!)
- Demo: **Click "Simulate Access Request"** → Watch 4-pillar verification
- Show: 18ms decision time, risk scores

### 5. Additional Admin Pages (If Time Permits)
- `/risk-intelligence` - User risk profiles
- `/analytics` - Access patterns, insider threats
- `/attack-simulation` - Security drills (renamed)

---

## Navigation Tips

### For Employee Portal (`/employee`):
1. Login as Grace Chen
2. Immediately see panic button (red gradient, animated)
3. Click to show confirmation modal
4. Confirm to see step-by-step lockdown

### For Admin Portal (`/access-intelligence`):
1. Login as Admin
2. See access control dashboard first
3. Scroll to find blue **"Simulate Access Request"** button
4. Click to watch real-time verification
5. Point out the **18ms** decision time

---

## Common Mistakes to Avoid

❌ **Don't navigate to `/portal`** - This is the old employee portal without the enhanced panic button
❌ **Don't navigate to `/dashboard`** - This is the old admin dashboard with "Simulate Threat" button
✅ **Always use `/employee`** for employee experience
✅ **Always use `/access-intelligence`** for live simulator demo

---

## Quick Route Comparison

### Employee Portal
| Feature | `/portal` (OLD ❌) | `/employee` (NEW ✅) |
|---------|-------------------|---------------------|
| Panic Button | Basic (3 sec delay) | Enhanced with modals |
| Progress Feedback | Simple animation | 6-step visible progress |
| Confirmation | None | Explicit confirmation modal |

### Admin Dashboard
| Feature | `/dashboard` (OLD ❌) | `/access-intelligence` (NEW ✅) |
|---------|---------------------|--------------------------------|
| Demo Button | "Simulate Threat" | "Simulate Access Request" |
| Functionality | Shows static alert | Live 4-pillar verification |
| Interactivity | One-time modal | Step-by-step animation with scores |
| Decision Time | Not shown | **18ms** prominently displayed |

---

## Updated DEMO_FLOW_5_MINUTES.md

The demo flow document has been updated to reflect these route changes:

1. **Employee Portal** section now explicitly says "Navigate to `/employee`"
2. **Admin Dashboard** section now skips `/dashboard` and goes straight to `/access-intelligence`
3. Route sequence updated: `/access-intelligence` (LIVE SIMULATOR) → `/risk-intelligence` → `/analytics`

**Always refer to DEMO_FLOW_5_MINUTES.md for the full script.**

---

## Quick Verification

Before the demo, verify these pages work:

```bash
# Employee portal with panic button
https://aegis-gateway.vercel.app/employee

# Admin access intelligence with live simulator
https://aegis-gateway.vercel.app/access-intelligence
```

**Both pages should load and show the enhanced features (panic button modals, live simulator).**

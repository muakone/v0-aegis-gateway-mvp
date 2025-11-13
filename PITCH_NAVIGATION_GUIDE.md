# Pitch Navigation Guide: Landing Page + Speech Sync

**Purpose:** Map your 5-minute pitch speech to the landing page sections for smooth presentation.

---

## Landing Page Scroll Anchors

The landing page now has scroll anchor IDs matching your pitch structure. You can navigate directly to sections during your pitch by scrolling or using these URLs:

| Section | Anchor Link | Pitch Timing |
|---------|-------------|--------------|
| **Hero** | `/#hero` | 0:00 - 0:45 (Opening) |
| **Problem** | `/#problem` | 0:45 - 1:30 (Problem Deep Dive) |
| **Solution (Three Pillars)** | `/#solution` | 2:15 - 3:15 (Three Pillars) |
| **Features** | `/#features` | 3:15 - 4:20 (Features Overview) |
| **Pricing** | `/#pricing` | 4:20+ (Business Model) |
| **Footer** | `/#footer` | 4:30 - 5:00 (Closing) |

---

## Pitch + Page Flow (Detailed)

### 0:00 - 0:45 | Opening → Stay on `/#hero`
**Speaker:** "When was the last time you worked from home without worrying about security?"

**On Screen:**
- Aegis Gateway hero title
- "Secure Remote Work Without VPN Friction"
- "Try Live Demo" CTA

**Tip:** Don't scroll yet. Let the hero sit while you deliver the hook.

---

### 0:45 - 1:30 | Problem → Scroll to `/#problem`
**Speaker:** "Here's what's happening right now at banks, hospitals, and Fortune 500 companies..."

**On Screen:**
- "VPNs Were Built for the Office" headline
- Three threat cards: Compromised Endpoints, Stolen Credentials, Limited Visibility

**Tip:** Scroll smoothly to problem section as you transition from opening. Let audience read the three threat cards as you narrate.

---

### 1:30 - 2:15 | Market Context → Stay on `/#problem` or scroll to `/#solution` early
**Speaker:** "The Zero Trust market is currently $23 billion..."

**On Screen:**
- You can remain on problem section or start scrolling toward solution
- Alternatively, mention market numbers verbally without scrolling (no dedicated market section on landing page)

**Tip:** This is a verbal-only section in the current landing page. Consider adding a "Market Opportunity" section between problem and solution if you want visual support.

---

### 2:15 - 3:15 | Three Pillars → Scroll to `/#solution`
**Speaker:** "Aegis Gateway is built on three pillars of continuous verification..."

**On Screen:**
- "The Aegis Gateway Solution" headline
- Three pillar cards: Identity, Device, Context
- Panic Button callout (red box with flame icon)
- Benefits split: For Employees / For Security Teams

**Tip:** Scroll to solution section at 2:15. This is your core value prop—let it breathe. Pause briefly on each pillar as you explain.

---

### 3:15 - 4:20 | Features + Demo Transition → Scroll to `/#features` or launch `/login`
**Speaker:** "But enough talking. Let me show you what this actually looks like..."

**On Screen (Option A: Features):**
- "Enterprise-Grade Features" section
- 8 feature tiles (Real-Time Threat Detection, Behavioral Analysis, etc.)

**On Screen (Option B: Live Demo):**
- Click "Try Live Demo" button → navigate to `/login`
- Follow DEMO_FLOW_5_MINUTES.md

**Tip:** If doing live demo, transition from solution (`/#solution`) directly to `/login` at 3:15. If showing features only, scroll to `/#features`.

---

### 4:20 - 4:30 | Pricing/Business Model → Scroll to `/#pricing`
**Speaker:** "Our business model is straightforward: SaaS subscription..."

**On Screen:**
- Three pricing tiers: Starter ($10), Professional ($18), Enterprise ($25+)
- "Most Popular" badge on Professional

**Tip:** Quick scroll to pricing. Don't linger—this is a bridge section.

---

### 4:30 - 5:00 | Closing → Scroll to `/#footer` or return to `/#hero`
**Speaker:** "That's Aegis Gateway. We're solving a $50 billion market problem..."

**On Screen:**
- Footer with Aegis Gateway branding
- "Zero Trust Access for the Borderless Office" tagline
- OR return to hero for dramatic close

**Tip:** Either scroll to footer for clean close, or jump back to hero for a full-circle ending.

---

## Presenter Mode Tips

### Manual Scrolling (Recommended)
1. Open landing page in browser: `https://aegis-gateway.vercel.app`
2. Practice scrolling between sections 2-3 times before pitch
3. Use smooth scroll (browser default) or press `Page Down` to advance
4. Bookmark anchor links (`/#hero`, `/#problem`, etc.) in browser for quick navigation

### Keyboard Shortcuts
- **Space / Page Down:** Scroll down smoothly
- **Shift + Space / Page Up:** Scroll up
- **Home:** Jump to top (`/#hero`)
- **End:** Jump to bottom (`/#footer`)

### Auto-Scroll Script (Optional, Advanced)
If you want the page to auto-advance during your pitch, you can use a browser console script:

```javascript
// Auto-scroll through sections every 60 seconds
const sections = ['hero', 'problem', 'solution', 'features', 'pricing', 'footer'];
let currentIndex = 0;

setInterval(() => {
  currentIndex = (currentIndex + 1) % sections.length;
  document.getElementById(sections[currentIndex])?.scrollIntoView({ behavior: 'smooth' });
}, 60000); // 60 seconds per section
```

Paste into browser console (F12 → Console tab) before pitch starts.

---

## Demo Flow vs Landing Page

If you're doing a **live demo** (as outlined in DEMO_FLOW_5_MINUTES.md), your flow will be:

1. **0:00 - 2:15:** Stay on landing page (`/#hero` → `/#problem` → verbal market context)
2. **2:15 - 3:15:** Show `/#solution` (three pillars)
3. **3:15 - 4:20:** Navigate to `/login` → `/dashboard` → `/notifications` → `/attack-simulation` → `/behavioral-analysis` → `/policy-builder` (follow demo script)
4. **4:20 - 5:00:** Return to landing page `/#pricing` or `/#footer` for close

---

## Suggested Enhancements (Optional)

If you have time before the pitch, consider adding:

1. **Market Opportunity Section** between Problem and Solution:
   - Add visual cards showing "$23B → $45B market", "1B+ remote workers", "70% hybrid/remote companies"
   - Anchor: `/#market`

2. **Presenter Mode Button** (top-right corner):
   - Add a small "Presenter Mode" button that enables auto-scroll or shows a timeline overlay
   - Useful for practice runs

3. **Pitch Timer Overlay** (hidden by default):
   - Small timer in corner showing elapsed time (0:00 → 5:00)
   - Toggleable via URL parameter: `/?presenter=true`

---

## Quick Reference Card (Print This!)

```
Pitch Section          | Time     | Page Anchor
-----------------------|----------|-------------
Opening                | 0:00     | /#hero
Problem                | 0:45     | /#problem
Market (verbal only)   | 1:30     | (stay on /#problem)
Three Pillars          | 2:15     | /#solution
Demo Transition        | 3:15     | /#features or /login
Pricing/Business       | 4:20     | /#pricing
Closing                | 4:30     | /#footer or /#hero
```

---

**Last Updated:** November 13, 2025  
**Prepared for:** Aegis Gateway Pitch Competition

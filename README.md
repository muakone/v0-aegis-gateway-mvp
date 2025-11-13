# Aegis Gateway

## Team Members
- David Fadeyi
- Muheez Akanni
- Lawal Abdullateef
- Basit Balogun

---

## 🚀 Live Demo

*   **Live Application:** https://aegis-gateway.vercel.app
*   **Recorded Demo:** https://www.canva.com/design/DAG4jRf5Uuo/qdkMP6cep2uCtzEk34elRA/edit?utm_content=DAG4jRf5Uuo&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton


---

## 🎯 The Problem

Which "How Might We..." question from the challenge brief are you tackling?

> **Example:** How might we help busy people organize their daily tasks more effectively?

How might we make remote and hybrid work secure without the friction of traditional VPNs? Aegis Gateway addresses this by applying continuous verification of identity, device health, and access context to protect sensitive systems in a borderless workplace.

## ✨ Our Solution

Aegis Gateway is a Zero Trust access platform that replaces slow, perimeter-based VPNs with continuous, millisecond access decisions across three pillars: Identity (continuous behavioral verification), Device (real-time device health checks), and Context (network, location, and anomaly detection). It combines UEBA, device posture checks, and policy automation so security teams can stop threats in real time while employees work fast and friction-free.

Key product areas in this repository: interactive landing page, employee portal, admin dashboard, attack-simulation lab, behavioral-analysis, policy-builder, compliance automation, and real-time notifications.

---

## 🛠️ Tech Stack

- **Frontend:** Next.js (app router), React, TypeScript
- **Styling:** Tailwind CSS, custom CSS (global styles)
- **UI primitives:** Radix UI, lucide-react icons
- **State / Data:** zustand, react-hook-form
- **Charts & Visualization:** Recharts
- **Utilities:** date-fns, immer, zod
- **Deployment:** Vercel
- **Package manager:** pnpm

---

## ⚙️ How to Set Up and Run Locally

1.  Clone the repository:
	```bash
	git clone https://github.com/muakone/v0-aegis-gateway-mvp.git
	```
2.  Navigate to the project directory:
	```bash
	cd v0-aegis-gateway-mvp
	```
3.  Install dependencies (we recommend pnpm since a pnpm-lock file exists):
	```bash
	pnpm install
	```
	If you prefer npm:
	```bash
	npm install
	```
4.  Run the development server:
	```bash
	pnpm dev
	```
	or with npm:
	```bash
	npm run dev
	```

### Environment variables
There are no required environment variables to run the local demo at present. If you integrate external APIs or a backend later, add them to a `.env.local` file.

---

## 📌 Notes on the Pitch & Numbers

I inspected the pitch files (`PITCH_PREP_CHECKLIST.md`, `PITCH_SPEECH_5_MINUTES.md`) and the landing page to align messaging. The repo and landing page already present the three-pillar solution and demo flow which is a good match for the pitch.

The pitch includes several numeric claims that should be validated before presenting:
- **$3T cybersecurity spend (global):** plausible as total global IT/cyber spend is large, but we should cite a recent industry source (Gartner, IDC, or similar) and confirm the scope/timeframe.
- **1.2B remote workers:** needs a source and definition (e.g., full-time remote vs hybrid). Use ILO/Statista/OECD or similar for verification.
- **Zero Trust market: $23B → $45B by 2028:** this aligns with some market research reports but must be cited (report name + year).
- **15ms vs 150ms (10x faster):** this is a product performance claim; please confirm using measurements from the demo environment or synthetic tests, and explain what is being measured (latency for access decision vs typical VPN handshake/latency).
- **ROI: $1.2M annual for 500-person bank:** this is a modeled claim that should include assumptions (costs replaced, incident reduction, time saved). I can draft a simple ROI model if you want.

If you want, I can run quick web research to find authoritative sources for each number and update the pitch copy with citations.

---

## ✅ Next Steps (suggested)

- Finalize & cite the pitch numbers (I can research and update). 
- Sync landing page copy with the pitch script timing so the page scrolls in the same order as your spoken sections (I can update `app/page.tsx` to add anchors and a scroll-linked navigation). 
- Optionally add a short `pitch-notes.md` that maps timestamps in `PITCH_SPEECH_5_MINUTES.md` to specific routes/pages for the demo flow.

---

If you'd like, I can now:
- Validate the pitch numbers with web sources and annotate the pitch files, or
- Update the landing page to add slide-like anchors and a scroll-driven narrative that matches your pitch flow.

Tell me which to do next and I'll proceed.
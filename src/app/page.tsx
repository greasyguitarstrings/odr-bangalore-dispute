"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";
import {
  Menu,
  X,
  Scale,
  ShieldAlert,
  Handshake,
  FileCheck2,
  FileWarning,
  User,
  Sparkles,
  ArrowLeftRight,
  RotateCcw,
  CheckCircle2,
  AlertTriangle,
  FileText,
  Clock,
  Camera,
  Sun,
  Moon,
  Building2,
  Layers,
  MapPin,
  Check,
  Play,
  ChevronDown,
  ChevronUp,
  Gavel,
  Stamp,
  Printer,
  Zap,
  Shield,
  TrendingDown,
  Briefcase,
  BadgeCheck,
  Loader2,
  Download,
  Lock,
  Unlock,
  FileImage,
  Receipt,
  Calendar,
  Award,
  Info,
  ExternalLink,
} from "lucide-react";

/* ─── SCROLL ANIMATION CONFIGURATION ─── */
const scrollFadeVariant = {
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: false, amount: 0.2 },
  transition: { duration: 0.6 },
};

/* ─── INITIAL 5 DISPUTE CATEGORIES ─── */
interface EvidenceItem {
  id: string;
  name: string;
  type: string;
  size: string;
  timestamp: string;
  verifiedBy: string;
  imageUrl: string;
  description: string;
}

interface ClaimItem {
  id: string;
  category: "painting" | "geyser" | "cleaning" | "bescom" | "notice";
  title: string;
  subtitle: string;
  landlordClaim: number;
  tenantCounter: number;
  statutoryAllowed: number;
  isDisputedByTenant: boolean;
  statuteApplied: boolean;
  legalBadge: string;
  legalNote: string;
  landlordRationale: string;
  tenantRebuttal: string;
  evidences: EvidenceItem[];
}

const INITIAL_CLAIMS: ClaimItem[] = [
  {
    id: "claim-painting",
    category: "painting",
    title: "Full 3BHK Wall Repainting & Primer",
    subtitle: "Living, master bedroom & corridor emulsion coat",
    landlordClaim: 35000,
    tenantCounter: 0,
    statutoryAllowed: 0,
    isDisputedByTenant: true,
    statuteApplied: false,
    legalBadge: "Sec 12: Normal Wear & Tear Exempt (Tenancy >= 12 mos)",
    legalNote:
      "Under Section 12 of the Karnataka Rent Control Act and prevailing HC precedents, ordinary wall scuffs and weathering after 36 months tenancy are classified as fair wear & tear. Repainting deduction is legally capped at ₹0 unless deliberate structural vandalism is proven.",
    landlordRationale:
      "Lease clause 14 mandates tenant pays 1 month rent or ₹35,000 for full Asian Paints Royale repaint upon exit.",
    tenantRebuttal:
      "Occupied flat for 3 years (36 months). Walls show only picture-frame hooks and natural fading. Disputing entire ₹35k claim.",
    evidences: [
      {
        id: "ev-paint-1",
        name: "Living_Room_MoveIn_2023.jpg",
        type: "Move-In Photo",
        size: "3.2 MB",
        timestamp: "15 Mar 2023, 11:30 AM",
        verifiedBy: "Bengaluru Move-In Inventory Ledger",
        imageUrl:
          "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=800&q=80",
        description: "Fresh emulsion baseline documented at handover.",
      },
      {
        id: "ev-paint-2",
        name: "Wall_Scuff_Handover_2026.jpg",
        type: "Move-Out Photo",
        size: "2.8 MB",
        timestamp: "15 Mar 2026, 04:15 PM",
        verifiedBy: "Prestige Security Check-Out Form",
        imageUrl:
          "https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?auto=format&fit=crop&w=800&q=80",
        description:
          "Minor picture nail holes filled; standard 36-month ambient fading.",
      },
    ],
  },
  {
    id: "claim-geyser",
    category: "geyser",
    title: "Fixture Damage — Master Bath Bajaj 15L Geyser",
    subtitle: "Heating coil scale & exterior enclosure replacement claim",
    landlordClaim: 20000,
    tenantCounter: 12000,
    statutoryAllowed: 12000,
    isDisputedByTenant: true,
    statuteApplied: false,
    legalBadge: "10% Straight-Line Cap over 4 years",
    legalNote:
      "Under statutory asset depreciation norms, water heaters carry a 10% per annum straight-line depreciation rate. Given 4-year total asset age (installed 2022), ₹8,000 depreciation applies. Permissible recovery is capped at ₹12,000.",
    landlordRationale:
      "Appliance heating coil had mineral calcification and outer casing has small scrape. Claiming complete new replacement unit at ₹20,000.",
    tenantRebuttal:
      "Geyser was manufactured in 2022. Borewell hard water caused standard scaling. Offered ₹12,000 depreciated fair value.",
    evidences: [
      {
        id: "ev-geyser-1",
        name: "Bajaj_Geyser_Invoice_2022.pdf",
        type: "Purchase Bill",
        size: "1.1 MB",
        timestamp: "10 Jun 2022",
        verifiedBy: "Croma Retail Indiranagar GST Receipt",
        imageUrl:
          "https://images.unsplash.com/photo-1585704032915-c3400ca199e7?auto=format&fit=crop&w=800&q=80",
        description: "Original purchase receipt proving 4-year machine age.",
      },
    ],
  },
  {
    id: "claim-cleaning",
    category: "cleaning",
    title: "Professional Kitchen & Bathroom Deep Sanitization",
    subtitle: "Industrial chimney degreasing & acid tile scrub claim",
    landlordClaim: 12000,
    tenantCounter: 4000,
    statutoryAllowed: 4500,
    isDisputedByTenant: true,
    statuteApplied: false,
    legalBadge: "Bengaluru standard 2BHK/3BHK benchmark cap (₹4,500)",
    legalNote:
      "Standard residential benchmark for certified Urban Company / professional 3BHK deep cleaning in Bengaluru is capped at ₹4,500. Deductions of ₹12,000 for regular housekeeping handovers are excessive and unsupportable without commercial chemical damage invoices.",
    landlordRationale:
      "Hired premium specialty contractors for whole flat sanitization, oil baffle cleaning, and granite polish at ₹12,000.",
    tenantRebuttal:
      "Premises were broom-cleaned and mopped on departure. Standard market rate for deep clean is ₹4,000. ₹12k is exorbitant.",
    evidences: [
      {
        id: "ev-clean-1",
        name: "Handover_Kitchen_Tidy.jpg",
        type: "Handover Record",
        size: "2.4 MB",
        timestamp: "15 Mar 2026, 03:00 PM",
        verifiedBy: "WhatsApp Tenant-Landlord Log",
        imageUrl:
          "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=800&q=80",
        description: "Countertops cleared and wiped down at key return.",
      },
    ],
  },
  {
    id: "claim-bescom",
    category: "bescom",
    title: "BESCOM Electricity Meter Arrears (Final Bill)",
    subtitle: "RR No: E4-892401 • Pro-rated final consumption cycle",
    landlordClaim: 3500,
    tenantCounter: 3500,
    statutoryAllowed: 3500,
    isDisputedByTenant: false,
    statuteApplied: false,
    legalBadge: "Verified Actuals — Approved at Face Value",
    legalNote:
      "Utility meter readings confirmed on handover date via BESCOM consumer portal. Both parties agree on actual kilowatt-hour consumption arrears.",
    landlordRationale:
      "Final power bill generated on 16 March shows ₹3,500 balance for the preceding 28 days.",
    tenantRebuttal:
      "Agreed without dispute. Meter photo confirms reading; tenant willing to clear full ₹3,500.",
    evidences: [
      {
        id: "ev-bescom-1",
        name: "BESCOM_Meter_Photo_15Mar.jpg",
        type: "Utility Meter",
        size: "1.8 MB",
        timestamp: "15 Mar 2026, 05:00 PM",
        verifiedBy: "BESCOM Online Portal E4-892401",
        imageUrl:
          "https://images.unsplash.com/photo-1558618666-fcd25c85f82e?auto=format&fit=crop&w=800&q=80",
        description: "Physical meter photo matching online bill cycle balance.",
      },
    ],
  },
  {
    id: "claim-notice",
    category: "notice",
    title: "Unpaid Rent / Notice Period Shortfall Penalty",
    subtitle: "Alleged early vacation penalty of 17 days",
    landlordClaim: 11500,
    tenantCounter: 0,
    statutoryAllowed: 0,
    isDisputedByTenant: true,
    statuteApplied: false,
    legalBadge: "30-Day WhatsApp / Written Notice Verified (₹0 Penalty)",
    legalNote:
      "Under Karnataka tenancy contract rules, verified written intimations via WhatsApp or Registered Post satisfying the agreed 30-day notice period discharge the tenant of early-exit penalties. Penalty claim of ₹11,500 is disallowed.",
    landlordRationale:
      "Tenant vacated on 15 March rather than the calendar month end of 31 March; claiming half-month rent shortfall.",
    tenantRebuttal:
      "Formal written notice sent on 15 January (60 days in advance) via email and WhatsApp. Handover agreed on 15 March.",
    evidences: [
      {
        id: "ev-notice-1",
        name: "WhatsApp_Notice_Jan15.pdf",
        type: "Written Notice",
        size: "820 KB",
        timestamp: "15 Jan 2026, 09:12 AM",
        verifiedBy: "Digital Timestamped Chat Export",
        imageUrl:
          "https://images.unsplash.com/photo-1586281380349-632531db7ed4?auto=format&fit=crop&w=800&q=80",
        description: "Landlord acknowledgment: 'Noted Rohan, 15 March key handover confirmed.'",
      },
    ],
  },
];

export default function SettlrODRPage() {
  /* ─── STATE MANAGEMENT ─── */
  const [theme, setTheme] = useState<"dark" | "light">("dark");
  const [perspective, setPerspective] = useState<"tenant" | "landlord" | "conciliator">("tenant");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [claims, setClaims] = useState<ClaimItem[]>(INITIAL_CLAIMS);

  // Evidence preview modal
  const [previewEvidence, setPreviewEvidence] = useState<EvidenceItem | null>(null);
  const [expandedAccordion, setExpandedAccordion] = useState<string | null>("claim-painting");

  // Section 2: Statutory Audit state
  const [auditState, setAuditState] = useState<"idle" | "running" | "completed">("idle");
  const [auditProgress, setAuditProgress] = useState(0);

  // Section 3: Negotiation state
  const [negRound, setNegRound] = useState(1);
  const [landlordOffer, setLandlordOffer] = useState(82000);
  const [tenantOffer, setTenantOffer] = useState(10000);
  const [counterSlider, setCounterSlider] = useState(20000);
  const [isSettled, setIsSettled] = useState(false);

  // Section 4: Digital signatures
  const [tenantSigned, setTenantSigned] = useState(false);
  const [landlordSigned, setLandlordSigned] = useState(false);
  const [tenantSignTime, setTenantSignTime] = useState("");
  const [landlordSignTime, setLandlordSignTime] = useState("");

  const isDark = theme === "dark";

  // Financial calculations
  const totalDepositEscrow = 200000;
  const initialLandlordTotal = claims.reduce((acc, c) => acc + c.landlordClaim, 0); // 82,000
  const tenantCurrentOffers = claims.reduce((acc, c) => acc + (c.isDisputedByTenant ? c.tenantCounter : c.landlordClaim), 0);
  
  // Audited total deductions
  const auditedDeductions = claims.reduce((acc, c) => {
    if (auditState === "completed") {
      return acc + c.statutoryAllowed;
    }
    return acc + (c.isDisputedByTenant ? c.tenantCounter : c.landlordClaim);
  }, 0);

  const activeDeduction = isSettled ? 20000 : auditState === "completed" ? 20000 : landlordOffer;
  const netRefundAmount = totalDepositEscrow - activeDeduction;

  // Negotiation Gap
  const currentGap = Math.abs(landlordOffer - tenantOffer);
  const gapPercentage = Math.round((currentGap / initialLandlordTotal) * 100);

  /* ─── SCROLL HELPERS ─── */
  const scrollToSection = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  /* ─── QUICK TRIGGER 1: RUN STATUTORY AUDIT ─── */
  const handleTriggerAudit = () => {
    scrollToSection("section-statutory-audit");
    if (auditState === "completed") return;

    setAuditState("running");
    setAuditProgress(0);

    let p = 0;
    const interval = setInterval(() => {
      p += 20;
      setAuditProgress(p);
      if (p >= 100) {
        clearInterval(interval);
        setAuditState("completed");
        setClaims((prev) =>
          prev.map((c) => ({
            ...c,
            statuteApplied: true,
          }))
        );
        setLandlordOffer(20000);
        setCounterSlider(20000);

        confetti({
          particleCount: 70,
          spread: 60,
          origin: { y: 0.6 },
          colors: ["#34D399", "#10B981", "#E0DDDD"],
        });
      }
    }, 280);
  };

  /* ─── QUICK TRIGGER 2: FAST-FORWARD SETTLEMENT ─── */
  const handleFastForward = () => {
    setAuditState("completed");
    setClaims((prev) =>
      prev.map((c) => ({
        ...c,
        statuteApplied: true,
      }))
    );
    setLandlordOffer(20000);
    setTenantOffer(20000);
    setCounterSlider(20000);
    setIsSettled(true);

    confetti({
      particleCount: 140,
      spread: 90,
      origin: { y: 0.5 },
      colors: ["#34D399", "#10B981", "#6EE7B7", "#E0DDDD", "#FFD700"],
    });

    setTimeout(() => {
      scrollToSection("section-settlement-deed");
    }, 300);
  };

  /* ─── TOGGLE CLAIM DISPUTE STATUS ─── */
  const toggleClaimDispute = (id: string) => {
    setClaims((prev) =>
      prev.map((c) => {
        if (c.id === id) {
          const next = !c.isDisputedByTenant;
          return { ...c, isDisputedByTenant: next };
        }
        return c;
      })
    );
  };

  /* ─── NEGOTIATION SUBMIT OFFER ─── */
  const handleMakeOffer = (offerAmount: number) => {
    setTenantOffer(offerAmount);
    const newGap = Math.abs(landlordOffer - offerAmount);

    if (newGap <= 4100 || offerAmount === 20000) {
      // Gap <= 5% (₹4,100) or matching statutory cap!
      setIsSettled(true);
      setLandlordOffer(offerAmount);

      confetti({
        particleCount: 150,
        spread: 100,
        origin: { y: 0.6 },
        colors: ["#34D399", "#10B981", "#E0DDDD", "#6EE7B7"],
      });

      setTimeout(() => {
        scrollToSection("section-settlement-deed");
      }, 700);
    } else {
      // Next round
      if (negRound < 3) {
        setNegRound((prev) => prev + 1);
        // Landlord concedes partially
        setLandlordOffer((prev) => Math.max(offerAmount, Math.round(prev - (prev - offerAmount) * 0.4)));
      } else {
        // Final round auto-converge to split
        const compromise = Math.round((landlordOffer + offerAmount) / 2);
        setLandlordOffer(compromise);
        setTenantOffer(compromise);
        setIsSettled(true);

        confetti({
          particleCount: 120,
          spread: 80,
          origin: { y: 0.6 },
        });

        setTimeout(() => {
          scrollToSection("section-settlement-deed");
        }, 700);
      }
    }
  };

  /* ─── RESET DEMO ─── */
  const handleReset = () => {
    setClaims(INITIAL_CLAIMS);
    setAuditState("idle");
    setAuditProgress(0);
    setNegRound(1);
    setLandlordOffer(82000);
    setTenantOffer(10000);
    setCounterSlider(20000);
    setIsSettled(false);
    setTenantSigned(false);
    setLandlordSigned(false);
    setTenantSignTime("");
    setLandlordSignTime("");
    setIsSidebarOpen(false);
    scrollToSection("section-hero");
  };

  return (
    <div
      className={`min-h-screen font-sans transition-colors duration-300 ${
        isDark ? "bg-[#121111] text-[#E0DDDD]" : "bg-[#F4F2F2] text-[#1E1B1B]"
      }`}
    >
      {/* ═══════════════════════════════════════════════════════════
          STICKY TOP HUD & NAVIGATION BAR
      ═══════════════════════════════════════════════════════════ */}
      <header
        className={`sticky top-0 z-50 backdrop-blur-md border-b transition-colors ${
          isDark
            ? "bg-[#161414]/90 border-[#2D2929] shadow-lg shadow-black/40"
            : "bg-white/90 border-[#E0DDDD] shadow-sm"
        }`}
      >
        <div className="max-w-7xl mx-auto px-3 sm:px-6 py-2.5 flex flex-wrap items-center justify-between gap-3">
          {/* Brand & Drawer Trigger */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsSidebarOpen(true)}
              className={`p-2 rounded-xl border transition-all flex items-center justify-center ${
                isDark
                  ? "bg-[#222020] border-[#3A3535] text-[#E0DDDD] hover:bg-[#2D2A2A] hover:text-emerald-400"
                  : "bg-[#EAE7E7] border-[#D6D1D1] text-[#2E2A2A] hover:bg-[#E0DDDD] hover:text-emerald-700"
              }`}
              title="Open Navigation Menu"
            >
              <Menu className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-emerald-500 flex items-center justify-center text-white shadow-md">
                <Gavel className="w-5 h-5 stroke-[2.2]" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className={`font-black text-lg tracking-tight ${isDark ? "text-white" : "text-[#1E1B1B]"}`}>
                    Settlr ODR
                  </span>
                  <span className="text-[10px] font-extrabold uppercase tracking-wider px-2 py-0.5 rounded-full border bg-emerald-500/20 text-emerald-400 border-emerald-500/30">
                    Karnataka
                  </span>
                </div>
                <div className="text-[11px] opacity-70 hidden sm:block">
                  Bengaluru Tenancy Conciliation Portal • Sec 89 CPC
                </div>
              </div>
            </div>
          </div>

          {/* Live Perspective Bar (Rohan vs Rao vs Conciliator) */}
          <div
            className={`flex items-center border p-1 rounded-xl shadow-inner ${
              isDark ? "bg-[#1C1A1A] border-[#363232]" : "bg-[#EAE7E7] border-[#D6D1D1]"
            }`}
          >
            <button
              onClick={() => setPerspective("tenant")}
              className={`px-2.5 sm:px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
                perspective === "tenant"
                  ? "bg-emerald-500 text-slate-950 font-black shadow-md"
                  : isDark
                  ? "text-[#A8A3A3] hover:text-white"
                  : "text-[#5E5959] hover:text-black"
              }`}
            >
              <User className="w-3.5 h-3.5" />
              <span>🧑 Rohan <span className="hidden sm:inline">(Tenant)</span></span>
            </button>
            <button
              onClick={() => setPerspective("landlord")}
              className={`px-2.5 sm:px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
                perspective === "landlord"
                  ? "bg-[#E0DDDD] text-[#1A1818] font-black shadow-md"
                  : isDark
                  ? "text-[#A8A3A3] hover:text-white"
                  : "text-[#5E5959] hover:text-black"
              }`}
            >
              <Building2 className="w-3.5 h-3.5" />
              <span>👨 Mr. Rao <span className="hidden sm:inline">(Landlord)</span></span>
            </button>
            <button
              onClick={() => setPerspective("conciliator")}
              className={`px-2.5 sm:px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
                perspective === "conciliator"
                  ? "bg-amber-400 text-slate-950 font-black shadow-md"
                  : isDark
                  ? "text-[#A8A3A3] hover:text-white"
                  : "text-[#5E5959] hover:text-black"
              }`}
            >
              <Scale className="w-3.5 h-3.5" />
              <span>⚖️ Conciliator</span>
            </button>
          </div>

          {/* Quick Triggers & Theme Switcher */}
          <div className="flex items-center gap-2">
            <button
              onClick={handleTriggerAudit}
              className="px-3 py-1.5 rounded-xl text-xs font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 hover:bg-emerald-500 hover:text-slate-950 transition flex items-center gap-1.5 shadow-sm"
              title="Auto-scroll to Section 2 and execute legal deduction slash"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span className="hidden md:inline">Run Legal Audit</span>
            </button>

            <button
              onClick={handleFastForward}
              className="px-3 py-1.5 rounded-xl text-xs font-bold bg-amber-500/20 text-amber-400 border border-amber-500/40 hover:bg-amber-500 hover:text-slate-950 transition flex items-center gap-1.5 shadow-sm"
              title="Fast-forward negotiation and unlock e-Stamp Settlement Deed"
            >
              <Zap className="w-3.5 h-3.5" />
              <span className="hidden md:inline">Fast-Forward Deed</span>
            </button>

            <button
              onClick={() => setTheme(isDark ? "light" : "dark")}
              className={`p-2 rounded-xl border transition-all text-xs font-bold ${
                isDark
                  ? "bg-[#222020] border-[#3A3535] text-emerald-400 hover:bg-[#2B2727]"
                  : "bg-[#EAE7E7] border-[#D6D1D1] text-emerald-700 hover:bg-[#E0DDDD]"
              }`}
              title="Toggle Light/Dark Theme"
            >
              {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>
          </div>
        </div>
      </header>

      {/* ═══════════════════════════════════════════════════════════
          PERSPECTIVE CONTEXTUAL HINT BANNER
      ═══════════════════════════════════════════════════════════ */}
      <div
        className={`px-4 py-2 text-xs font-semibold border-b transition-colors ${
          perspective === "tenant"
            ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
            : perspective === "landlord"
            ? isDark
              ? "bg-[#252222] text-[#E0DDDD] border-[#3D3838]"
              : "bg-[#EAE7E7] text-[#2E2A2A] border-[#D6D1D1]"
            : "bg-amber-500/10 text-amber-400 border-amber-500/20"
        }`}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <Info className="w-4 h-4 shrink-0" />
            {perspective === "tenant" && (
              <span>
                <strong>Tenant View (Rohan Sharma):</strong> You vacated Flat 402 after 36 months. You are disputing ₹72,000 of ₹82,000 claimed deductions. Under Sec 12 of Karnataka Rent Act, repainting cannot be charged after 12 months.
              </span>
            )}
            {perspective === "landlord" && (
              <span>
                <strong>Landlord View (K. Raghavendra Rao):</strong> You hold ₹2,00,000 security deposit. You claimed ₹82,000 to restore painting, geyser, and cleaning. The statutory compliance engine checks which claims hold in Bengaluru Small Causes Court.
              </span>
            )}
            {perspective === "conciliator" && (
              <span>
                <strong>Neutral Conciliator View (Sec 89 CPC):</strong> Facilitating an amicable out-of-court settlement. Statutory audit caps legal deductions at ₹20,000, returning ₹1,80,000 net deposit to tenant.
              </span>
            )}
          </div>
          <span className="text-[10px] uppercase font-bold opacity-80 shrink-0 hidden sm:inline">
            Active Persona: {perspective.toUpperCase()}
          </span>
        </div>
      </div>

      {/* ═══════════════════════════════════════════════════════════
          SLIDE-OVER SIDEBAR DRAWER
      ═══════════════════════════════════════════════════════════ */}
      <AnimatePresence>
        {isSidebarOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsSidebarOpen(false)}
              className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50"
            />
            <motion.aside
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className={`fixed top-0 left-0 bottom-0 w-80 max-w-[85vw] z-50 flex flex-col justify-between border-r shadow-2xl p-5 overflow-y-auto ${
                isDark
                  ? "bg-[#1A1818] border-[#363232] text-[#E0DDDD]"
                  : "bg-white border-[#E0DDDD] text-[#1E1B1B]"
              }`}
            >
              <div className="space-y-6">
                <div className={`flex items-center justify-between border-b pb-4 ${isDark ? "border-[#363232]" : "border-[#E0DDDD]"}`}>
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-lg bg-emerald-500 flex items-center justify-center text-white font-bold">
                      <Gavel className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-[10px] font-bold uppercase text-emerald-400">Case Dossier</div>
                      <div className="font-extrabold text-sm">Dispute #BLR-2026-8941</div>
                    </div>
                  </div>
                  <button
                    onClick={() => setIsSidebarOpen(false)}
                    className="p-1 rounded-lg hover:bg-white/10 transition"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Case Info Card */}
                <div className={`p-3.5 rounded-xl border ${isDark ? "bg-[#222020] border-[#3A3535]" : "bg-[#F9F8F8] border-[#E0DDDD]"}`}>
                  <div className="text-xs font-bold text-emerald-400 flex items-center gap-1.5 mb-1">
                    <MapPin className="w-3.5 h-3.5" />
                    Prestige Shantiniketan, Whitefield
                  </div>
                  <p className="text-[11px] opacity-70">
                    Flat 402, Tower 3 • 36 Months Tenancy (2023–2026)
                  </p>
                </div>

                {/* Fast Nav Anchors */}
                <div className="space-y-1.5">
                  <div className="text-[11px] font-bold uppercase tracking-wider opacity-60 flex items-center gap-1.5">
                    <Layers className="w-3.5 h-3.5 text-emerald-400" />
                    Interactive Flow
                  </div>
                  {[
                    { id: "section-hero", label: "Dispute Summary & Escrow" },
                    { id: "section-claims", label: "1. Claims & Evidence Locker" },
                    { id: "section-statutory-audit", label: "2. Karnataka Statutory Audit" },
                    { id: "section-negotiation", label: "3. 3-Round Negotiation Room" },
                    { id: "section-settlement-deed", label: "4. Executed Settlement Deed" },
                  ].map((step, idx) => (
                    <button
                      key={step.id}
                      onClick={() => {
                        setIsSidebarOpen(false);
                        scrollToSection(step.id);
                      }}
                      className={`w-full text-left px-3 py-2 rounded-xl text-xs font-semibold flex items-center justify-between transition ${
                        isDark ? "hover:bg-[#252222] text-[#C8C4C4]" : "hover:bg-[#EAE7E7] text-[#4F4B4B]"
                      }`}
                    >
                      <span>{step.label}</span>
                      <span className="text-[10px] text-emerald-400 font-mono">0{idx + 1}</span>
                    </button>
                  ))}
                </div>

                {/* Demo Scenario Presets */}
                <div className={`pt-4 border-t space-y-2 ${isDark ? "border-[#363232]" : "border-[#E0DDDD]"}`}>
                  <div className="text-[11px] font-bold uppercase tracking-wider opacity-60 flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
                    Demo Presets
                  </div>
                  <button
                    onClick={() => {
                      handleReset();
                      setIsSidebarOpen(false);
                    }}
                    className={`w-full text-left p-3 rounded-xl border text-xs font-semibold transition ${
                      isDark ? "bg-[#201E1E] border-[#363232] hover:bg-[#282424]" : "bg-[#F9F8F8] border-[#D6D1D1] hover:bg-[#EAE7E7]"
                    }`}
                  >
                    <div className="font-bold text-rose-400 flex items-center justify-between">
                      <span>Predatory ₹82k Claim</span>
                      <span className="text-[10px] px-2 py-0.5 rounded bg-rose-500/20 text-rose-400">Default</span>
                    </div>
                    <p className="text-[11px] opacity-70 mt-1">
                      Full repainting, geyser replacement, and notice penalty claims active.
                    </p>
                  </button>

                  <button
                    onClick={() => {
                      handleFastForward();
                      setIsSidebarOpen(false);
                    }}
                    className={`w-full text-left p-3 rounded-xl border text-xs font-semibold transition ${
                      isDark ? "bg-[#201E1E] border-[#363232] hover:bg-[#282424]" : "bg-[#F9F8F8] border-[#D6D1D1] hover:bg-[#EAE7E7]"
                    }`}
                  >
                    <div className="font-bold text-emerald-400 flex items-center justify-between">
                      <span>Converged ₹20k Accord</span>
                      <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400">Solved</span>
                    </div>
                    <p className="text-[11px] opacity-70 mt-1">
                      Statutory caps applied, gap resolved, e-Stamp deed unlocked.
                    </p>
                  </button>
                </div>
              </div>

              {/* Drawer Footer Reset */}
              <div className={`pt-4 border-t ${isDark ? "border-[#363232]" : "border-[#E0DDDD]"}`}>
                <button
                  onClick={handleReset}
                  className={`w-full py-2.5 px-3 border font-bold rounded-xl text-xs flex items-center justify-center gap-2 transition ${
                    isDark
                      ? "bg-[#222020] hover:bg-[#2D2A2A] border-[#3D3838] text-[#E0DDDD]"
                      : "bg-white hover:bg-[#ECE9E9] border-[#D6D1D1] text-[#1E1B1B] shadow-sm"
                  }`}
                >
                  <RotateCcw className="w-3.5 h-3.5 text-emerald-400" />
                  Reset Demo State
                </button>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* ═══════════════════════════════════════════════════════════
          EVIDENCE PREVIEW MODAL
      ═══════════════════════════════════════════════════════════ */}
      <AnimatePresence>
        {previewEvidence && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setPreviewEvidence(null)}
              className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className={`relative z-10 max-w-2xl w-full rounded-2xl border shadow-2xl overflow-hidden ${
                isDark ? "bg-[#1A1818] border-[#363232]" : "bg-white border-[#E0DDDD]"
              }`}
            >
              <div className={`flex items-center justify-between p-4 border-b ${isDark ? "border-[#363232]" : "border-[#E0DDDD]"}`}>
                <div className="flex items-center gap-2">
                  <FileImage className="w-4 h-4 text-emerald-400" />
                  <span className="font-bold text-sm">{previewEvidence.name}</span>
                </div>
                <button
                  onClick={() => setPreviewEvidence(null)}
                  className="p-1 rounded-lg hover:bg-white/10 transition"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className="relative bg-black max-h-[55vh] flex items-center justify-center">
                <img
                  src={previewEvidence.imageUrl}
                  alt={previewEvidence.name}
                  className="w-full h-auto max-h-[55vh] object-contain"
                />
              </div>
              <div className={`p-4 space-y-2 text-xs ${isDark ? "bg-[#141313]" : "bg-[#F9F8F8]"}`}>
                <div className="flex flex-wrap gap-2 text-[11px]">
                  <span className="px-2 py-0.5 rounded font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                    {previewEvidence.type}
                  </span>
                  <span className="px-2 py-0.5 rounded border border-white/10 opacity-70">
                    Size: {previewEvidence.size}
                  </span>
                  <span className="px-2 py-0.5 rounded border border-white/10 opacity-70">
                    {previewEvidence.timestamp}
                  </span>
                </div>
                <p className="opacity-90">{previewEvidence.description}</p>
                <div className="text-[10px] opacity-60 flex items-center gap-1 text-emerald-400">
                  <CheckCircle2 className="w-3 h-3" /> Digital verification signature: {previewEvidence.verifiedBy}
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ═══════════════════════════════════════════════════════════
          MAIN SCROLL CONTAINER
      ═══════════════════════════════════════════════════════════ */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-12">
        {/* ─────────────────────────────────────────────────────────
            SECTION 0: HERO / DISPUTE SUMMARY
        ───────────────────────────────────────────────────────── */}
        <motion.section
          id="section-hero"
          {...scrollFadeVariant}
          className={`rounded-3xl p-6 sm:p-8 border shadow-xl relative overflow-hidden transition-colors ${
            isDark
              ? "bg-gradient-to-br from-[#1C1A1A] via-[#161414] to-[#1E1C1C] border-[#363232]"
              : "bg-gradient-to-br from-white via-[#F9F8F8] to-[#ECE9E9] border-[#E0DDDD]"
          }`}
        >
          {/* Subtle Ambient Glow */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div className="space-y-3">
              <div className="flex flex-wrap items-center gap-2">
                <span className="px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                  Active Conciliation Phase • Round {negRound} of 3
                </span>
                <span className="text-xs font-bold opacity-60">
                  Dispute Ref: #BLR-2026-8941
                </span>
              </div>

              <h2 className={`text-2xl sm:text-3xl font-black tracking-tight ${isDark ? "text-white" : "text-[#1E1B1B]"}`}>
                Flat 402, Tower 3, Prestige Shantiniketan
              </h2>
              <p className="text-xs sm:text-sm opacity-70 flex items-center gap-2">
                <MapPin className="w-4 h-4 text-emerald-400 shrink-0" />
                Whitefield Main Road, Bengaluru, Karnataka 560066 • Tenancy: 36 Months (Mar 2023 – Mar 2026)
              </p>

              {/* Parties summary */}
              <div className="flex flex-wrap gap-4 pt-1 text-xs">
                <div>
                  <span className="opacity-60">Tenant: </span>
                  <span className="font-bold text-emerald-400">Rohan Sharma</span>
                </div>
                <div className="opacity-30">|</div>
                <div>
                  <span className="opacity-60">Landlord: </span>
                  <span className="font-bold">K. Raghavendra Rao</span>
                </div>
                <div className="opacity-30">|</div>
                <div>
                  <span className="opacity-60">Monthly Rent: </span>
                  <span className="font-bold">₹20,000</span>
                </div>
              </div>
            </div>

            {/* Quick Summary Pill Stats */}
            <div className="flex flex-wrap sm:flex-nowrap gap-3 shrink-0">
              <div
                className={`p-4 rounded-2xl border min-w-[130px] sm:min-w-[150px] ${
                  isDark ? "bg-[#141313] border-[#332F2F]" : "bg-white border-[#E0DDDD] shadow-sm"
                }`}
              >
                <div className="text-[10px] font-bold uppercase tracking-wider opacity-60 flex items-center gap-1">
                  <Shield className="w-3.5 h-3.5 text-emerald-400" />
                  Escrow Deposit
                </div>
                <div className="text-xl sm:text-2xl font-black mt-1 text-emerald-400">
                  ₹{totalDepositEscrow.toLocaleString("en-IN")}
                </div>
                <div className="text-[10px] opacity-60 mt-0.5">10 Months Customary</div>
              </div>

              <div
                className={`p-4 rounded-2xl border min-w-[130px] sm:min-w-[150px] ${
                  isDark ? "bg-[#141313] border-[#332F2F]" : "bg-white border-[#E0DDDD] shadow-sm"
                }`}
              >
                <div className="text-[10px] font-bold uppercase tracking-wider opacity-60 flex items-center gap-1">
                  <TrendingDown className="w-3.5 h-3.5 text-rose-400" />
                  Landlord Claim
                </div>
                <div className="text-xl sm:text-2xl font-black mt-1 text-rose-400">
                  ₹{initialLandlordTotal.toLocaleString("en-IN")}
                </div>
                <div className="text-[10px] opacity-60 mt-0.5">5 Line-Item Deductions</div>
              </div>

              <div
                className={`p-4 rounded-2xl border min-w-[130px] sm:min-w-[150px] ${
                  isDark ? "bg-[#141313] border-[#332F2F]" : "bg-white border-[#E0DDDD] shadow-sm"
                }`}
              >
                <div className="text-[10px] font-bold uppercase tracking-wider opacity-60 flex items-center gap-1">
                  <Scale className="w-3.5 h-3.5 text-amber-400" />
                  Contested Delta
                </div>
                <div className="text-xl sm:text-2xl font-black mt-1 text-amber-400">
                  ₹{(initialLandlordTotal - tenantCurrentOffers).toLocaleString("en-IN")}
                </div>
                <div className="text-[10px] opacity-60 mt-0.5">Active Dispute Gap</div>
              </div>
            </div>
          </div>
        </motion.section>

        {/* ─────────────────────────────────────────────────────────
            SECTION 1: ITEMIZED CLAIMS & EVIDENCE LOCKER
        ───────────────────────────────────────────────────────── */}
        <motion.section
          id="section-claims"
          {...scrollFadeVariant}
          className="space-y-4"
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <div className="text-xs font-extrabold uppercase tracking-wider text-emerald-400 flex items-center gap-1.5">
                <FileText className="w-4 h-4" /> Section 1: Intake & Claims
              </div>
              <h3 className={`text-xl font-black tracking-tight ${isDark ? "text-white" : "text-[#1E1B1B]"}`}>
                Itemized Claims & Evidence Locker
              </h3>
            </div>
            <div className="text-xs opacity-70">
              Interactive review: Toggle dispute state or expand verified evidence
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4">
            {claims.map((claim, index) => {
              const isExpanded = expandedAccordion === claim.id;

              return (
                <motion.div
                  key={claim.id}
                  whileHover={{ scale: 1.01 }}
                  transition={{ duration: 0.2 }}
                  className={`border rounded-2xl p-5 transition-all shadow-md ${
                    claim.statuteApplied && claim.statutoryAllowed === 0
                      ? isDark
                        ? "bg-[#161B18] border-emerald-500/40"
                        : "bg-emerald-50/60 border-emerald-400"
                      : isDark
                      ? "bg-[#1C1A1A] border-[#363232] hover:border-[#4D4747]"
                      : "bg-white border-[#E0DDDD] hover:border-[#C8C4C4]"
                  }`}
                >
                  {/* Card Main Row */}
                  <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                    <div className="flex items-start gap-3 flex-1">
                      <div
                        className={`w-8 h-8 rounded-xl font-black text-xs flex items-center justify-center shrink-0 border ${
                          isDark
                            ? "bg-[#252222] border-[#3D3838] text-[#E0DDDD]"
                            : "bg-[#EAE7E7] border-[#D6D1D1] text-[#1E1B1B]"
                        }`}
                      >
                        0{index + 1}
                      </div>

                      <div className="space-y-1">
                        <div className="flex flex-wrap items-center gap-2">
                          <h4 className={`font-bold text-base ${isDark ? "text-white" : "text-[#1E1B1B]"}`}>
                            {claim.title}
                          </h4>
                          <span
                            className={`text-[10px] px-2.5 py-0.5 rounded-full font-bold uppercase border ${
                              claim.isDisputedByTenant
                                ? "bg-amber-500/20 text-amber-400 border-amber-500/30"
                                : "bg-emerald-500/20 text-emerald-400 border-emerald-500/30"
                            }`}
                          >
                            {claim.isDisputedByTenant ? "Disputed" : "Accepted"}
                          </span>
                        </div>
                        <p className="text-xs opacity-70">{claim.subtitle}</p>
                      </div>
                    </div>

                    {/* Financial Figures Comparison */}
                    <div className="flex flex-wrap items-center gap-4 shrink-0">
                      <div className="text-right">
                        <div className="text-[10px] font-bold uppercase tracking-wider text-rose-400">
                          Landlord Claim
                        </div>
                        <div className={`text-base font-extrabold ${claim.statuteApplied && claim.statutoryAllowed < claim.landlordClaim ? "line-through text-rose-400/60" : "text-rose-400"}`}>
                          ₹{claim.landlordClaim.toLocaleString("en-IN")}
                        </div>
                      </div>

                      <ArrowLeftRight className="w-4 h-4 opacity-40 shrink-0" />

                      <div className="text-right">
                        <div className="text-[10px] font-bold uppercase tracking-wider text-emerald-400">
                          Tenant Offer
                        </div>
                        <div className="text-base font-extrabold text-emerald-400">
                          ₹{claim.tenantCounter.toLocaleString("en-IN")}
                        </div>
                      </div>

                      {/* Dispute Toggle Button */}
                      <button
                        onClick={() => toggleClaimDispute(claim.id)}
                        className={`px-3 py-1.5 rounded-xl text-xs font-bold border transition-all ${
                          claim.isDisputedByTenant
                            ? "bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 border-rose-500/30"
                            : "bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 border-emerald-500/30"
                        }`}
                      >
                        {claim.isDisputedByTenant ? "Contesting Claim" : "Claim Accepted"}
                      </button>

                      {/* Accordion Toggle */}
                      <button
                        onClick={() => setExpandedAccordion(isExpanded ? null : claim.id)}
                        className={`p-2 rounded-xl border transition ${
                          isDark ? "bg-[#252222] border-[#3D3838] hover:bg-[#302C2C]" : "bg-[#EAE7E7] border-[#D6D1D1] hover:bg-[#E0DDDD]"
                        }`}
                        title="Expand evidence and arguments"
                      >
                        {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>

                  {/* Expanded Accordion Body */}
                  <AnimatePresence>
                    {isExpanded && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                        className={`mt-4 pt-4 border-t space-y-4 ${isDark ? "border-[#332F2F]" : "border-[#EAE7E7]"}`}
                      >
                        {/* Legal Precedent Callout */}
                        <div
                          className={`p-3 rounded-xl text-xs flex items-start gap-2 border ${
                            isDark
                              ? "bg-emerald-950/30 border-emerald-800/40 text-emerald-300"
                              : "bg-emerald-50 border-emerald-200 text-emerald-900"
                          }`}
                        >
                          <Scale className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                          <div>
                            <span className="font-bold text-emerald-400">{claim.legalBadge}: </span>
                            {claim.legalNote}
                          </div>
                        </div>

                        {/* Dual Stances */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                          <div className={`p-3 rounded-xl border ${isDark ? "bg-[#141313] border-[#332F2F]" : "bg-[#F9F8F8] border-[#E0DDDD]"}`}>
                            <div className="font-bold mb-1 flex items-center gap-1.5 opacity-70">
                              <Building2 className="w-3.5 h-3.5" /> Landlord Argument (Mr. Rao):
                            </div>
                            <p className="opacity-90">{claim.landlordRationale}</p>
                          </div>
                          <div className={`p-3 rounded-xl border ${isDark ? "bg-[#141313] border-[#332F2F]" : "bg-[#F9F8F8] border-[#E0DDDD]"}`}>
                            <div className="font-bold text-emerald-400 mb-1 flex items-center gap-1.5">
                              <User className="w-3.5 h-3.5 text-emerald-400" /> Tenant Rebuttal (Rohan):
                            </div>
                            <p className="opacity-90">{claim.tenantRebuttal}</p>
                          </div>
                        </div>

                        {/* Uploaded Evidence Cards */}
                        <div className="space-y-2">
                          <div className="text-[11px] font-bold uppercase tracking-wider opacity-60 flex items-center gap-1.5">
                            <Camera className="w-3.5 h-3.5 text-emerald-400" />
                            Uploaded Evidence ({claim.evidences.length} files with tamper-proof timestamps)
                          </div>
                          <div className="flex flex-wrap gap-3">
                            {claim.evidences.map((ev) => (
                              <button
                                key={ev.id}
                                onClick={() => setPreviewEvidence(ev)}
                                className={`flex items-center gap-3 p-2 pr-3 rounded-xl border text-xs text-left transition hover:ring-2 hover:ring-emerald-400/50 ${
                                  isDark ? "bg-[#141313] border-[#332F2F]" : "bg-white border-[#E0DDDD] shadow-sm"
                                }`}
                              >
                                <img
                                  src={ev.imageUrl}
                                  alt={ev.name}
                                  className="w-12 h-12 rounded-lg object-cover border border-white/10"
                                />
                                <div>
                                  <div className="font-bold">{ev.name}</div>
                                  <div className="text-[10px] opacity-60">{ev.timestamp} • {ev.size}</div>
                                  <div className="text-[10px] text-emerald-400 flex items-center gap-1 font-semibold">
                                    <CheckCircle2 className="w-3 h-3" /> Click to enlarge preview
                                  </div>
                                </div>
                              </button>
                            ))}
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </div>
        </motion.section>

        {/* ─────────────────────────────────────────────────────────
            SECTION 2: KARNATAKA STATUTORY RULE ENGINE
        ───────────────────────────────────────────────────────── */}
        <motion.section
          id="section-statutory-audit"
          {...scrollFadeVariant}
          className={`border rounded-3xl p-6 sm:p-8 space-y-6 transition-colors shadow-2xl relative overflow-hidden ${
            isDark
              ? "bg-gradient-to-br from-[#1C1A1A] via-[#151716] to-[#1C1A1A] border-[#363232]"
              : "bg-white border-[#E0DDDD]"
          }`}
        >
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b pb-4 border-white/10">
            <div className="space-y-1">
              <div className="text-xs font-extrabold uppercase tracking-wider text-emerald-400 flex items-center gap-1.5">
                <Scale className="w-4 h-4" /> Section 2: Statutory Compliance Check
              </div>
              <h3 className={`text-xl sm:text-2xl font-black tracking-tight ${isDark ? "text-white" : "text-[#1E1B1B]"}`}>
                The Karnataka Rent Control Act — Statutory Audit Engine
              </h3>
              <p className="text-xs opacity-70 max-w-2xl">
                Benchmarked against Karnataka Rent Control Act, Section 12 wear & tear standards, and Model Tenancy Act deposit provisions.
              </p>
            </div>

            {/* Run Audit Action Button */}
            <button
              onClick={handleTriggerAudit}
              disabled={auditState === "running"}
              className={`px-5 py-3 rounded-2xl text-xs font-black flex items-center gap-2 shadow-lg transition-all ${
                auditState === "completed"
                  ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/40"
                  : auditState === "running"
                  ? "bg-emerald-500/40 text-slate-950 cursor-wait"
                  : "bg-emerald-500 hover:bg-emerald-400 text-slate-950 animate-pulse shadow-emerald-900/40"
              }`}
            >
              {auditState === "running" ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Running Legal Verification...
                </>
              ) : auditState === "completed" ? (
                <>
                  <BadgeCheck className="w-4 h-4 text-emerald-400" />
                  Statutory Audit Executed
                </>
              ) : (
                <>
                  <Play className="w-4 h-4" />
                  Execute Statutory Compliance Check
                </>
              )}
            </button>
          </div>

          {/* Animated Progress Sweep Bar */}
          {auditState === "running" && (
            <div className="space-y-2">
              <div className="flex justify-between text-xs font-bold text-emerald-400">
                <span>Auditing tenancy lease against Karnataka civil precedent...</span>
                <span>{auditProgress}%</span>
              </div>
              <div className="w-full h-3 rounded-full bg-white/10 overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-emerald-500 to-emerald-300"
                  style={{ width: `${auditProgress}%` }}
                />
              </div>
            </div>
          )}

          {/* Visual Deduction Slashes Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {/* Painting item */}
            <div className={`p-4 rounded-2xl border transition-all ${isDark ? "bg-[#141313] border-[#332F2F]" : "bg-[#F9F8F8] border-[#E0DDDD]"}`}>
              <div className="text-xs font-bold mb-1">Painting & Wall Restoration</div>
              <div className="flex items-baseline gap-2">
                <span className={`text-lg font-black ${auditState === "completed" ? "line-through text-rose-400/60" : "text-rose-400"}`}>
                  ₹35,000
                </span>
                {auditState === "completed" && (
                  <span className="text-xl font-black text-emerald-400">→ ₹0</span>
                )}
              </div>
              {auditState === "completed" && (
                <div className="mt-2 text-[10px] font-bold px-2 py-1 rounded bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                  ✓ Sec 12: Normal Wear & Tear Exempt (Tenancy &gt;= 12 mos)
                </div>
              )}
            </div>

            {/* Geyser item */}
            <div className={`p-4 rounded-2xl border transition-all ${isDark ? "bg-[#141313] border-[#332F2F]" : "bg-[#F9F8F8] border-[#E0DDDD]"}`}>
              <div className="text-xs font-bold mb-1">Fixture Damage — Bajaj Geyser</div>
              <div className="flex items-baseline gap-2">
                <span className={`text-lg font-black ${auditState === "completed" ? "line-through text-rose-400/60" : "text-rose-400"}`}>
                  ₹20,000
                </span>
                {auditState === "completed" && (
                  <span className="text-xl font-black text-emerald-400">→ ₹12,000</span>
                )}
              </div>
              {auditState === "completed" && (
                <div className="mt-2 text-[10px] font-bold px-2 py-1 rounded bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                  ✓ 10% Straight-Line Cap over 4 years
                </div>
              )}
            </div>

            {/* Deep cleaning item */}
            <div className={`p-4 rounded-2xl border transition-all ${isDark ? "bg-[#141313] border-[#332F2F]" : "bg-[#F9F8F8] border-[#E0DDDD]"}`}>
              <div className="text-xs font-bold mb-1">Deep Sanitization</div>
              <div className="flex items-baseline gap-2">
                <span className={`text-lg font-black ${auditState === "completed" ? "line-through text-rose-400/60" : "text-rose-400"}`}>
                  ₹12,000
                </span>
                {auditState === "completed" && (
                  <span className="text-xl font-black text-emerald-400">→ ₹4,500</span>
                )}
              </div>
              {auditState === "completed" && (
                <div className="mt-2 text-[10px] font-bold px-2 py-1 rounded bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                  ✓ Bengaluru standard 2BHK/3BHK cap
                </div>
              )}
            </div>

            {/* BESCOM item */}
            <div className={`p-4 rounded-2xl border transition-all ${isDark ? "bg-[#141313] border-[#332F2F]" : "bg-[#F9F8F8] border-[#E0DDDD]"}`}>
              <div className="text-xs font-bold mb-1">BESCOM Electricity Bill</div>
              <div className="flex items-baseline gap-2">
                <span className="text-lg font-black text-emerald-400">₹3,500</span>
                <span className="text-xs opacity-60">(Approved Actuals)</span>
              </div>
              {auditState === "completed" && (
                <div className="mt-2 text-[10px] font-bold px-2 py-1 rounded bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                  ✓ Meter photo and online ledger verified
                </div>
              )}
            </div>

            {/* Notice period item */}
            <div className={`p-4 rounded-2xl border transition-all ${isDark ? "bg-[#141313] border-[#332F2F]" : "bg-[#F9F8F8] border-[#E0DDDD]"}`}>
              <div className="text-xs font-bold mb-1">Notice Period Penalty</div>
              <div className="flex items-baseline gap-2">
                <span className={`text-lg font-black ${auditState === "completed" ? "line-through text-rose-400/60" : "text-rose-400"}`}>
                  ₹11,500
                </span>
                {auditState === "completed" && (
                  <span className="text-xl font-black text-emerald-400">→ ₹0</span>
                )}
              </div>
              {auditState === "completed" && (
                <div className="mt-2 text-[10px] font-bold px-2 py-1 rounded bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                  ✓ 30-day WhatsApp notice verified
                </div>
              )}
            </div>

            {/* Total Deductions Summary Card */}
            <div
              className={`p-4 rounded-2xl border ${
                auditState === "completed"
                  ? "bg-emerald-500/10 border-emerald-500/40"
                  : isDark
                  ? "bg-[#141313] border-[#332F2F]"
                  : "bg-[#F9F8F8] border-[#E0DDDD]"
              }`}
            >
              <div className="text-xs font-bold uppercase tracking-wider text-emerald-400 mb-1">
                Dynamic Deductions Meter
              </div>
              <div className="flex items-baseline gap-2">
                <span className={`text-2xl font-black ${auditState === "completed" ? "text-emerald-400" : "text-rose-400"}`}>
                  ₹{auditState === "completed" ? "20,000" : "82,000"}
                </span>
                {auditState === "completed" && (
                  <span className="text-xs font-bold text-emerald-400">
                    (₹62,000 Saved)
                  </span>
                )}
              </div>
              <div className="text-[11px] opacity-70 mt-1">
                Net refund due to Rohan:{" "}
                <strong className="text-emerald-400">
                  ₹{auditState === "completed" ? "1,80,000" : "1,18,000"}
                </strong>
              </div>
            </div>
          </div>
        </motion.section>

        {/* ─────────────────────────────────────────────────────────
            SECTION 3: 3-ROUND INTERACTIVE NEGOTIATION ROOM
        ───────────────────────────────────────────────────────── */}
        <motion.section
          id="section-negotiation"
          {...scrollFadeVariant}
          className={`border rounded-3xl p-6 sm:p-8 space-y-6 transition-colors shadow-2xl ${
            isDark ? "bg-[#1C1A1A] border-[#363232]" : "bg-white border-[#E0DDDD]"
          }`}
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b pb-4 border-white/10">
            <div>
              <div className="text-xs font-extrabold uppercase tracking-wider text-emerald-400 flex items-center gap-1.5">
                <Handshake className="w-4 h-4" /> Section 3: Conciliation & Settlement
              </div>
              <h3 className={`text-xl sm:text-2xl font-black tracking-tight ${isDark ? "text-white" : "text-[#1E1B1B]"}`}>
                3-Round Interactive Negotiation Room
              </h3>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                Turn: Round {negRound} of 3
              </span>
            </div>
          </div>

          {/* Visual Settlement Gap Bar */}
          <div className="space-y-2">
            <div className="flex justify-between text-xs font-bold">
              <span className="text-emerald-400">Tenant Offer: ₹{tenantOffer.toLocaleString("en-IN")}</span>
              <span className="text-amber-400 font-extrabold">
                Current Gap: ₹{currentGap.toLocaleString("en-IN")} ({gapPercentage}%)
              </span>
              <span className="text-rose-400">Landlord Demand: ₹{landlordOffer.toLocaleString("en-IN")}</span>
            </div>

            {/* Dual Colored Gap Meter */}
            <div className="w-full h-4 rounded-full overflow-hidden flex bg-white/10 border border-white/10">
              <motion.div
                className="h-full bg-emerald-400"
                animate={{ width: `${Math.min(100, (tenantOffer / initialLandlordTotal) * 100)}%` }}
                transition={{ duration: 0.4 }}
              />
              <motion.div
                className="h-full bg-amber-400/80"
                animate={{ width: `${Math.max(0, (currentGap / initialLandlordTotal) * 100)}%` }}
                transition={{ duration: 0.4 }}
              />
              <motion.div
                className="h-full bg-rose-500/80"
                animate={{ width: `${Math.max(0, (1 - landlordOffer / initialLandlordTotal) * 100)}%` }}
                transition={{ duration: 0.4 }}
              />
            </div>
            <div className="flex justify-between text-[10px] opacity-60">
              <span>₹0</span>
              <span>Statutory Benchmark: ₹20,000</span>
              <span>₹82,000</span>
            </div>
          </div>

          {/* Counteroffer Slider & Quick Chips */}
          <div className={`p-5 rounded-2xl border space-y-4 ${isDark ? "bg-[#141313] border-[#332F2F]" : "bg-[#F9F8F8] border-[#E0DDDD]"}`}>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <label className="text-xs font-bold uppercase tracking-wider">
                Adjust Proposed Deduction Counteroffer:
              </label>
              <span className="text-2xl font-black text-emerald-400">
                ₹{counterSlider.toLocaleString("en-IN")}
              </span>
            </div>

            <input
              type="range"
              min={0}
              max={82000}
              step={500}
              value={counterSlider}
              onChange={(e) => setCounterSlider(Number(e.target.value))}
              className="w-full h-2 rounded-full appearance-none cursor-pointer accent-emerald-400 bg-white/20"
            />

            {/* Quick Action Chips */}
            <div className="flex flex-wrap items-center justify-between gap-2 pt-2">
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => setCounterSlider(20000)}
                  className={`px-3 py-1.5 rounded-xl border text-xs font-bold transition flex items-center gap-1.5 ${
                    counterSlider === 20000
                      ? "bg-emerald-500 text-slate-950 border-emerald-500"
                      : isDark
                      ? "bg-[#222020] border-[#3A3535] hover:bg-[#2D2A2A] text-emerald-400"
                      : "bg-white border-[#D6D1D1] hover:bg-[#ECE9E9] text-emerald-700"
                  }`}
                >
                  <Scale className="w-3 h-3" />
                  Match Statutory Cap (₹20,000)
                </button>

                <button
                  onClick={() => setCounterSlider(25000)}
                  className={`px-3 py-1.5 rounded-xl border text-xs font-bold transition flex items-center gap-1.5 ${
                    counterSlider === 25000
                      ? "bg-emerald-500 text-slate-950 border-emerald-500"
                      : isDark
                      ? "bg-[#222020] border-[#3A3535] hover:bg-[#2D2A2A] text-[#E0DDDD]"
                      : "bg-white border-[#D6D1D1] hover:bg-[#ECE9E9] text-[#1E1B1B]"
                  }`}
                >
                  <ArrowLeftRight className="w-3 h-3" />
                  Propose Split (₹25,000)
                </button>

                <button
                  onClick={() => setCounterSlider(landlordOffer)}
                  className={`px-3 py-1.5 rounded-xl border text-xs font-bold transition flex items-center gap-1.5 ${
                    counterSlider === landlordOffer
                      ? "bg-emerald-500 text-slate-950 border-emerald-500"
                      : isDark
                      ? "bg-[#222020] border-[#3A3535] hover:bg-[#2D2A2A] text-[#E0DDDD]"
                      : "bg-white border-[#D6D1D1] hover:bg-[#ECE9E9] text-[#1E1B1B]"
                  }`}
                >
                  <Check className="w-3 h-3" />
                  Accept Current Offer (₹{landlordOffer.toLocaleString("en-IN")})
                </button>
              </div>

              {/* Submit Button */}
              <button
                onClick={() => handleMakeOffer(counterSlider)}
                className="px-5 py-2.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black rounded-xl text-xs flex items-center gap-1.5 transition shadow-lg shadow-emerald-950/50"
              >
                <Handshake className="w-4 h-4" />
                Submit Round {negRound} Offer
              </button>
            </div>
          </div>

          {/* Convergence Alert */}
          {isSettled && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="p-4 rounded-2xl bg-emerald-500/15 border border-emerald-500/40 text-emerald-300 flex items-center justify-between gap-4"
            >
              <div className="flex items-center gap-3">
                <CheckCircle2 className="w-6 h-6 text-emerald-400 shrink-0" />
                <div>
                  <div className="font-bold text-sm text-emerald-400">
                    Mutual Convergence Reached at ₹20,000!
                  </div>
                  <div className="text-xs opacity-90">
                    Both parties are within 5% tolerance. Section 4 Deed of Settlement has unlocked below.
                  </div>
                </div>
              </div>
              <button
                onClick={() => scrollToSection("section-settlement-deed")}
                className="px-4 py-2 bg-emerald-400 text-slate-950 font-black rounded-xl text-xs hover:bg-emerald-300 transition shrink-0"
              >
                Go to Execution Deed ↓
              </button>
            </motion.div>
          )}
        </motion.section>

        {/* ─────────────────────────────────────────────────────────
            SECTION 4: SETTLEMENT DEED & DIGITAL SIGNING (e-Stamp)
        ───────────────────────────────────────────────────────── */}
        <motion.section
          id="section-settlement-deed"
          {...scrollFadeVariant}
          className="space-y-4"
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <div className="text-xs font-extrabold uppercase tracking-wider text-emerald-400 flex items-center gap-1.5">
                <Stamp className="w-4 h-4" /> Section 4: Final Accord & Execution
              </div>
              <h3 className={`text-xl sm:text-2xl font-black tracking-tight ${isDark ? "text-white" : "text-[#1E1B1B]"}`}>
                Karnataka e-Stamp Certificate & Settlement Deed
              </h3>
            </div>
            {!isSettled && (
              <span className="text-xs px-3 py-1 rounded-full bg-amber-500/20 text-amber-400 border border-amber-500/30 flex items-center gap-1.5">
                <Lock className="w-3.5 h-3.5" /> Unlocks on consensus (or click Fast-Forward)
              </span>
            )}
          </div>

          {/* e-Stamp Styled Deed Paper */}
          <div
            className={`border-2 rounded-3xl overflow-hidden shadow-2xl transition-all relative ${
              isSettled
                ? "border-emerald-500/60"
                : "border-white/20 opacity-75 grayscale-[30%]"
            } ${isDark ? "bg-[#181616]" : "bg-white"}`}
          >
            {/* Watermark Emblem */}
            <div className="absolute inset-0 flex items-center justify-center opacity-5 pointer-events-none select-none">
              <Scale className="w-96 h-96" />
            </div>

            {/* Official e-Stamp Header Band */}
            <div
              className={`p-6 border-b-2 text-center relative ${
                isDark
                  ? "bg-[#0E1A14] border-emerald-500/40 text-[#E0DDDD]"
                  : "bg-emerald-50 border-emerald-300 text-[#1A2E22]"
              }`}
            >
              <div className="text-[11px] font-extrabold uppercase tracking-[0.25em] text-emerald-500 mb-1">
                Government of Karnataka • Department of Stamps & Registration
              </div>
              <h2 className="text-xl sm:text-2xl font-black tracking-wide">
                DEED OF MUTUAL SETTLEMENT & FINAL ACCORD
              </h2>
              <p className="text-xs opacity-75 mt-1">
                Concluded pursuant to Section 89 of Code of Civil Procedure, 1908 & Section 10 Indian Contract Act, 1872
              </p>
              <div className="flex flex-wrap items-center justify-center gap-4 text-[10px] font-mono opacity-60 mt-2">
                <span>Cert No: IN-KA892401BLR2026</span>
                <span>•</span>
                <span>Jurisdiction: Court of Small Causes, Bengaluru</span>
                <span>•</span>
                <span>Stamp Duty Paid: ₹500 (e-Challan #44891)</span>
              </div>
            </div>

            {/* Deed Content */}
            <div className="p-6 sm:p-8 space-y-6 text-xs sm:text-sm leading-relaxed">
              {/* Parties */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className={`p-4 rounded-xl border ${isDark ? "bg-[#141313] border-[#332F2F]" : "bg-[#F9F8F8] border-[#E0DDDD]"}`}>
                  <div className="text-[10px] font-bold uppercase text-emerald-400 mb-1">First Party (Tenant)</div>
                  <div className="font-extrabold text-base">Rohan Sharma</div>
                  <div className="text-xs opacity-70">Flat 402, Prestige Shantiniketan, Whitefield, Bengaluru</div>
                  <div className="text-[11px] opacity-60 mt-1">Aadhaar Verified • +91 98801 23456</div>
                </div>

                <div className={`p-4 rounded-xl border ${isDark ? "bg-[#141313] border-[#332F2F]" : "bg-[#F9F8F8] border-[#E0DDDD]"}`}>
                  <div className="text-[10px] font-bold uppercase opacity-60 mb-1">Second Party (Landlord)</div>
                  <div className="font-extrabold text-base">K. Raghavendra Rao</div>
                  <div className="text-xs opacity-70">Owner / Lessor of Flat 402, Tower 3</div>
                  <div className="text-[11px] opacity-60 mt-1">PAN Verified • +91 94480 87654</div>
                </div>
              </div>

              {/* Resolved Terms Table */}
              <div className="space-y-2">
                <div className="font-bold text-xs uppercase tracking-wider text-emerald-400">
                  Operative Clauses & Financial Ledger:
                </div>
                <div className={`rounded-xl border overflow-hidden ${isDark ? "border-[#332F2F]" : "border-[#E0DDDD]"}`}>
                  <div className={`grid grid-cols-3 p-3 text-[10px] font-bold uppercase opacity-70 ${isDark ? "bg-[#1E1C1C]" : "bg-[#ECE9E9]"}`}>
                    <span>Head of Account</span>
                    <span className="text-center">Claimed vs Permitted</span>
                    <span className="text-right">Final Accord</span>
                  </div>
                  <div className="divide-y divide-white/10 text-xs">
                    <div className="grid grid-cols-3 p-3">
                      <span>Total Security Deposit Paid</span>
                      <span className="text-center opacity-70">Standard 10 Months</span>
                      <span className="text-right font-bold">₹2,00,000</span>
                    </div>
                    <div className="grid grid-cols-3 p-3">
                      <span>Mutually Agreed Deductions (Cap)</span>
                      <span className="text-center text-rose-400">Reduced from ₹82,000</span>
                      <span className="text-right font-bold text-rose-400">(-) ₹20,000</span>
                    </div>
                    <div className={`grid grid-cols-3 p-3 font-extrabold text-sm ${isDark ? "bg-emerald-950/20 text-emerald-400" : "bg-emerald-50 text-emerald-800"}`}>
                      <span>Net Refund Payable to Rohan</span>
                      <span className="text-center text-xs opacity-80">Instant Escrow Release</span>
                      <span className="text-right text-base font-black">₹1,80,000</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Undertaking terms */}
              <div className="space-y-1.5 text-xs opacity-80">
                <p>
                  1. The Landlord hereby authorizes the escrow disbursal of <strong>₹1,80,000</strong> to Tenant Rohan Sharma via UPI / IMPS within 24 hours of digital execution.
                </p>
                <p>
                  2. The Tenant accepts the deduction of <strong>₹20,000</strong> (comprising ₹12k geyser depreciated replacement, ₹4.5k deep clean, and ₹3.5k BESCOM electricity) as complete and final accord.
                </p>
                <p>
                  3. Both parties irrevocably discharge all claims under Tenancy Agreement of 15 March 2023. This deed holds the status of an arbitral decree under Section 89 of Code of Civil Procedure, 1908.
                </p>
              </div>

              {/* Interactive Digital Signatures Pad */}
              <div className="space-y-2 pt-2">
                <div className="font-bold text-xs uppercase tracking-wider text-emerald-400">
                  Digital Execution Pads:
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Rohan Signature Pad */}
                  <div
                    onClick={() => {
                      if (!tenantSigned) {
                        setTenantSigned(true);
                        setTenantSignTime(new Date().toLocaleString("en-IN"));
                        confetti({ particleCount: 40, spread: 40 });
                      }
                    }}
                    className={`p-4 rounded-xl border-2 border-dashed cursor-pointer transition ${
                      tenantSigned
                        ? "bg-emerald-500/10 border-emerald-500/60"
                        : isDark
                        ? "bg-[#141313] border-[#3D3838] hover:border-emerald-400/50"
                        : "bg-[#F9F8F8] border-[#D6D1D1] hover:border-emerald-500"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold">Rohan Sharma (Tenant)</span>
                      {tenantSigned ? (
                        <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                      ) : (
                        <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400">
                          Click to Sign
                        </span>
                      )}
                    </div>
                    {tenantSigned ? (
                      <div className="mt-2 font-mono text-[11px] text-emerald-400">
                        ✓ Digitally Signed & Timestamped: {tenantSignTime}
                        <div className="text-[9px] opacity-60">SHA-256: 4f8b2...89a1</div>
                      </div>
                    ) : (
                      <p className="text-[11px] opacity-60 mt-2">
                        Clicking signs the declaration affirming full deposit settlement.
                      </p>
                    )}
                  </div>

                  {/* Rao Signature Pad */}
                  <div
                    onClick={() => {
                      if (!landlordSigned) {
                        setLandlordSigned(true);
                        setLandlordSignTime(new Date().toLocaleString("en-IN"));
                        confetti({ particleCount: 40, spread: 40 });
                      }
                    }}
                    className={`p-4 rounded-xl border-2 border-dashed cursor-pointer transition ${
                      landlordSigned
                        ? "bg-emerald-500/10 border-emerald-500/60"
                        : isDark
                        ? "bg-[#141313] border-[#3D3838] hover:border-emerald-400/50"
                        : "bg-[#F9F8F8] border-[#D6D1D1] hover:border-emerald-500"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold">K. Raghavendra Rao (Landlord)</span>
                      {landlordSigned ? (
                        <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                      ) : (
                        <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400">
                          Click to Sign
                        </span>
                      )}
                    </div>
                    {landlordSigned ? (
                      <div className="mt-2 font-mono text-[11px] text-emerald-400">
                        ✓ Digitally Signed & Timestamped: {landlordSignTime}
                        <div className="text-[9px] opacity-60">SHA-256: 9e3a1...77c2</div>
                      </div>
                    ) : (
                      <p className="text-[11px] opacity-60 mt-2">
                        Clicking authorizes escrow release of ₹1,80,000 back to tenant.
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Action Bar */}
            <div
              className={`p-5 border-t flex flex-wrap items-center justify-between gap-3 ${
                isDark ? "bg-[#141313] border-white/10" : "bg-[#F9F8F8] border-[#E0DDDD]"
              }`}
            >
              <div className="text-xs opacity-70">
                Status:{" "}
                <strong className={tenantSigned && landlordSigned ? "text-emerald-400" : "text-amber-400"}>
                  {tenantSigned && landlordSigned
                    ? "Both Parties Signed • Ready for Official Execution"
                    : "Awaiting Dual Signatures"}
                </strong>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => window.print()}
                  className={`px-4 py-2 rounded-xl text-xs font-bold border transition flex items-center gap-1.5 ${
                    isDark
                      ? "bg-[#222020] border-[#3A3535] text-[#E0DDDD] hover:bg-[#2D2A2A]"
                      : "bg-white border-[#D6D1D1] text-[#1E1B1B] hover:bg-[#ECE9E9] shadow-sm"
                  }`}
                >
                  <Printer className="w-3.5 h-3.5" />
                  Print / Save Deed
                </button>

                <button
                  onClick={() => {
                    confetti({
                      particleCount: 160,
                      spread: 100,
                      origin: { y: 0.5 },
                    });
                    window.print();
                  }}
                  className="px-5 py-2 rounded-xl text-xs font-black bg-emerald-500 hover:bg-emerald-400 text-slate-950 transition flex items-center gap-1.5 shadow-lg shadow-emerald-950/40"
                >
                  <Download className="w-3.5 h-3.5" />
                  Download Executed Settlement PDF
                </button>
              </div>
            </div>
          </div>
        </motion.section>
      </main>

      {/* ═══════════════════════════════════════════════════════════
          FOOTER
      ═══════════════════════════════════════════════════════════ */}
      <footer
        className={`border-t py-8 mt-16 text-center text-xs transition-colors ${
          isDark ? "border-[#2D2929] text-[#7A7575]" : "border-[#E0DDDD] text-[#7A7575]"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 space-y-2">
          <div className="flex items-center justify-center gap-2 font-bold text-[#E0DDDD]">
            <Scale className="w-4 h-4 text-emerald-400" /> Settlr ODR • Karnataka Tenancy Conciliation Portal
          </div>
          <p className="opacity-70">
            Compliant with Karnataka Rent Control Act, 1999 • Model Tenancy Act (MTA) • Code of Civil Procedure, 1908 (Sec 89)
          </p>
          <div className="text-[10px] opacity-50">
            Case #BLR-2026-8941 • Prestige Shantiniketan, Whitefield, Bengaluru
          </div>
        </div>
      </footer>
    </div>
  );
}

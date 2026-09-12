"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";
import {
  Menu,
  X,
  Scale,
  ShieldAlert,
  Handshake,
  User,
  Sparkles,
  ArrowLeftRight,
  RotateCcw,
  CheckCircle2,
  AlertTriangle,
  FileText,
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
  BadgeCheck,
  Loader2,
  Download,
  Lock,
  Unlock,
  FileImage,
  Award,
  Info,
  ArrowRight,
  ArrowLeft,
  ArrowDown,
  Plus,
  PlusCircle,
} from "lucide-react";

/* ─── ACTIVE VIEW & WORKFLOW STEP TYPES ─── */
export type ActiveView = "dashboard" | "intake" | "rules" | "negotiation" | "settlement";

export interface WorkflowStep {
  step: number;
  id: ActiveView;
  label: string;
  shortLabel: string;
  stageBadge: string;
  description: string;
}

export const WORKFLOW_STEPS: WorkflowStep[] = [
  {
    step: 1,
    id: "dashboard",
    label: "Step 1: Case Overview",
    shortLabel: "Case Overview",
    stageBadge: "Stage 1",
    description: "Review dispute particulars & itemized deductions",
  },
  {
    step: 2,
    id: "intake",
    label: "Step 2: Form 1-A Notice",
    shortLabel: "Form 1-A Notice",
    stageBadge: "Stage 2",
    description: "Prescribed filing under Karnataka Rent Control",
  },
  {
    step: 3,
    id: "rules",
    label: "Step 3: Karnataka Sec 12 Audit",
    shortLabel: "Sec 12 Audit",
    stageBadge: "Stage 3",
    description: "Statutory wear-and-tear & cleaning ceiling audit",
  },
  {
    step: 4,
    id: "negotiation",
    label: "Step 4: 3-Round Convergence",
    shortLabel: "Negotiation",
    stageBadge: "Stage 4",
    description: "Algorithmic deposit gap convergence engine",
  },
  {
    step: 5,
    id: "settlement",
    label: "Step 5: Settlement Deed",
    shortLabel: "Settlement Deed",
    stageBadge: "Stage 5",
    description: "Binding e-Stamp deed under Sec 89 CPC",
  },
];

export function getStepNumber(view: ActiveView): number {
  switch (view) {
    case "dashboard":
      return 1;
    case "intake":
      return 2;
    case "rules":
      return 3;
    case "negotiation":
      return 4;
    case "settlement":
      return 5;
    default:
      return 1;
  }
}

/* ─── SCROLL ANIMATION CONFIGURATION ─── */
const scrollFadeVariant = {
  initial: { opacity: 0, y: 25 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
  transition: { duration: 0.35 },
};

/* ─── CLAIM INTERFACES & SEED DATA ─── */
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

/* ─── DEDUCTION CLAIM & DISPUTE CASE TYPES ─── */
export interface DeductionClaim {
  item: string;
  claimed: number;
  category: "wear_and_tear" | "cleaning" | "fixture" | "utility" | "notice";
  allowed?: number;
}

export interface DisputeCase {
  id: string;
  address: string;
  tenant: string;
  tenantContact: string;
  landlord: string;
  landlordContact: string;
  depositAmount: number;
  monthlyRent: number;
  deductionsClaimed: DeductionClaim[];
  claims: ClaimItem[];
  auditState: "idle" | "running" | "completed";
  auditProgress: number;
  negRound: number;
  landlordOffer: number;
  tenantOffer: number;
  counterSlider: number;
  isSettled: boolean;
  tenantSigned: boolean;
  landlordSigned: boolean;
  tenantSignTime: string;
  landlordSignTime: string;
  maxUnlockedStep?: number;
}

export const BANGALORE_ADDRESS_PRESETS = [
  "Prestige Shantiniketan, Whitefield - 560048",
  "Sobha Dream Acres, Panathur / Balagere - 560087",
  "Salarpuria Sattva Greenage, Hosur Road - 560068",
  "Custom Address...",
];

export function buildClaimsForCase(
  caseId: string,
  deductions: DeductionClaim[],
  auditDone: boolean = false
): ClaimItem[] {
  return deductions.map((d, idx) => {
    if (d.category === "wear_and_tear") {
      const allowed = 0;
      return {
        id: `claim-${caseId}-paint-${idx}`,
        category: "painting" as const,
        title: d.item,
        subtitle: "Wall surface weathering, primer coat & ambient discoloration",
        landlordClaim: d.claimed,
        tenantCounter: 0,
        statutoryAllowed: allowed,
        isDisputedByTenant: true,
        statuteApplied: auditDone,
        legalBadge: "Sec 12: Wear & Tear Exempt (Allowed: ₹0)",
        legalNote:
          "Under Section 12 & 13 of Karnataka Rent Control Act, 1999, wall surface weathering after occupancy is normal wear & tear. Painting deductions are capped at ₹0.",
        landlordRationale: `Lease clause stipulates automatic repaint deduction of ₹${d.claimed.toLocaleString("en-IN")} at handover.`,
        tenantRebuttal: "Natural ambient fading only. Slashed to ₹0 under Karnataka Rent Control Section 12.",
        evidences: [
          {
            id: `ev-${caseId}-p1`,
            name: "Wall_Scuff_Handover.jpg",
            type: "Move-Out Photo",
            size: "2.8 MB",
            timestamp: "Handover Inspection",
            verifiedBy: "Bengaluru Move-Out Inventory Ledger",
            imageUrl:
              "https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?auto=format&fit=crop&w=800&q=80",
            description: "Minor nail holes filled; natural ambient fading after occupancy.",
          },
        ],
      };
    } else if (d.category === "cleaning") {
      const allowed = Math.min(d.claimed, 4500);
      return {
        id: `claim-${caseId}-clean-${idx}`,
        category: "cleaning" as const,
        title: d.item,
        subtitle: "Complete deep cleaning & surface sanitization",
        landlordClaim: d.claimed,
        tenantCounter: allowed,
        statutoryAllowed: allowed,
        isDisputedByTenant: true,
        statuteApplied: auditDone,
        legalBadge: `Bengaluru 3BHK Benchmark Cap (₹${allowed.toLocaleString("en-IN")})`,
        legalNote: `Bengaluru district consumer court guidelines cap turnover professional deep cleaning at ₹4,500. Excess ₹${Math.max(0, d.claimed - 4500).toLocaleString("en-IN")} is disallowed.`,
        landlordRationale: `Third-party vendor quotation of ₹${d.claimed.toLocaleString("en-IN")} for deep sanitization.`,
        tenantRebuttal: `Flat handed over swept & mopped. Statutory Bengaluru benchmark caps recovery at ₹${allowed.toLocaleString("en-IN")}.`,
        evidences: [
          {
            id: `ev-${caseId}-c1`,
            name: "Deep_Clean_Vendor_Bill.pdf",
            type: "Vendor Receipt",
            size: "940 KB",
            timestamp: "Handover Inspection",
            verifiedBy: "Bengaluru Consumer Benchmarks",
            imageUrl:
              "https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=800&q=80",
            description: "Vendor sanitization quote scaled down to prevailing statutory ceiling.",
          },
        ],
      };
    } else if (d.category === "fixture") {
      const allowed = Math.round(d.claimed * 0.9);
      return {
        id: `claim-${caseId}-fix-${idx}`,
        category: "geyser" as const,
        title: d.item,
        subtitle: "Electrical fixture, geyser, or chrome hardware repair/replacement",
        landlordClaim: d.claimed,
        tenantCounter: allowed,
        statutoryAllowed: allowed,
        isDisputedByTenant: true,
        statuteApplied: auditDone,
        legalBadge: `10% Straight-Line Depreciation (Allowed: ₹${allowed.toLocaleString("en-IN")})`,
        legalNote: `Under statutory appliance depreciation schedules, fixtures carry a 10% straight-line annual depreciation. Recovery capped at ₹${allowed.toLocaleString("en-IN")}.`,
        landlordRationale: `Demanding hardware fixture replacement at ₹${d.claimed.toLocaleString("en-IN")} invoice cost.`,
        tenantRebuttal: `10% depreciation deducted under judicial guidelines. Fair offer: ₹${allowed.toLocaleString("en-IN")}.`,
        evidences: [
          {
            id: `ev-${caseId}-f1`,
            name: "Fixture_Inspection_Photo.jpg",
            type: "Purchase Bill",
            size: "1.1 MB",
            timestamp: "10 Jun 2022",
            verifiedBy: "Retail GST Receipt",
            imageUrl:
              "https://images.unsplash.com/photo-1585704032915-c3400ca199e7?auto=format&fit=crop&w=800&q=80",
            description: "Fixture repair assessment invoice with 10% annual depreciation applied.",
          },
        ],
      };
    } else {
      // utility / maintenance
      const allowed = d.claimed;
      return {
        id: `claim-${caseId}-util-${idx}`,
        category: "bescom" as const,
        title: d.item,
        subtitle: "Unpaid BESCOM electricity / BWSSB water / society maintenance",
        landlordClaim: d.claimed,
        tenantCounter: allowed,
        statutoryAllowed: allowed,
        isDisputedByTenant: false,
        statuteApplied: auditDone,
        legalBadge: "Actuals Approved (Sec 14 Verifiable Bills)",
        legalNote:
          "Under Section 14 of Karnataka Rent Control Act, 1999, utility charges are allowable based on verifiable consumption bills. Permitted at actuals.",
        landlordRationale: `Final meter reading calculation & maintenance dues totaling ₹${d.claimed.toLocaleString("en-IN")}.`,
        tenantRebuttal: `Tenant consents to actual consumption utility deduction of ₹${allowed.toLocaleString("en-IN")}.`,
        evidences: [
          {
            id: `ev-${caseId}-u1`,
            name: "BESCOM_Final_Bill.pdf",
            type: "Utility Invoice",
            size: "620 KB",
            timestamp: "Vacating Meter Reading",
            verifiedBy: "BESCOM Online Consumer Portal",
            imageUrl:
              "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=800&q=80",
            description: "Certified BESCOM utility bill with final cycle consumption units.",
          },
        ],
      };
    }
  });
}

const DEFAULT_CASE: DisputeCase = {
  id: "BLR-2026-8941",
  address: "Flat 402, Tower 3, Prestige Shantiniketan, Whitefield, Bengaluru - 560048",
  tenant: "Rohan Sharma",
  tenantContact: "+91 98801 23456",
  landlord: "Venkatesh Rao",
  landlordContact: "+91 94480 87654",
  depositAmount: 150000,
  monthlyRent: 25000,
  deductionsClaimed: [
    { item: "Painting & Touch-up", claimed: 28000, category: "wear_and_tear", allowed: 0 },
    { item: "Deep Cleaning", claimed: 8500, category: "cleaning", allowed: 4500 },
    { item: "Bathroom Fixture Replacement", claimed: 6500, category: "fixture", allowed: 5850 },
  ],
  claims: [
    {
      id: "claim-painting",
      category: "painting",
      title: "Painting & Touch-up",
      subtitle: "Living, master bedroom & corridor emulsion coat",
      landlordClaim: 28000,
      tenantCounter: 0,
      statutoryAllowed: 0,
      isDisputedByTenant: true,
      statuteApplied: false,
      legalBadge: "Sec 12: Wear & Tear Exempt (Allowed: ₹0)",
      legalNote:
        "Under Section 12 & 13 of Karnataka Rent Control Act, 1999 and HC rulings, wall surface weathering after 36 months of tenancy constitutes ordinary wear & tear. Painting deductions are capped at ₹0.",
      landlordRationale:
        "Lease clause 14 stipulates automatic repaint deduction of ₹28,000 at handover.",
      tenantRebuttal:
        "Normal ambient fading only. Slashed to ₹0 under Karnataka Rent Control Section 12.",
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
          description: "Emulsion baseline documented at move-in handover.",
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
          description: "Minor nail holes filled; natural 36-month ambient fading.",
        },
      ],
    },
    {
      id: "claim-cleaning",
      category: "cleaning",
      title: "Deep Cleaning",
      subtitle: "Kitchen & bathroom acid descaling and balcony power wash",
      landlordClaim: 8500,
      tenantCounter: 4500,
      statutoryAllowed: 4500,
      isDisputedByTenant: true,
      statuteApplied: false,
      legalBadge: "Bengaluru 3BHK Benchmark Cap (₹4,500)",
      legalNote:
        "Standard residential benchmark for certified professional deep sanitization in Bengaluru is capped at ₹4,500. Excess ₹4,000 is disallowed under Section 12.",
      landlordRationale:
        "Demanding ₹8,500 based on private cleaning vendor estimate.",
      tenantRebuttal:
        "Flat handed over swept & mopped. Statutory Bengaluru benchmark caps recovery at ₹4,500.",
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
          description: "Kitchen surfaces mopped and wiped clean at key handover.",
        },
      ],
    },
    {
      id: "claim-geyser",
      category: "geyser",
      title: "Bathroom Fixture Replacement",
      subtitle: "Master bath geyser and chrome fitting repairs",
      landlordClaim: 6500,
      tenantCounter: 5850,
      statutoryAllowed: 5850,
      isDisputedByTenant: true,
      statuteApplied: false,
      legalBadge: "10% Straight-Line Depreciation Cap (Allowed: ₹5,850)",
      legalNote:
        "Under statutory appliance depreciation schedules, fixtures carry a 10% per annum straight-line rate. Recovery capped at ₹5,850.",
      landlordRationale:
        "Demanding complete hardware replacement unit at ₹6,500 invoice cost.",
      tenantRebuttal:
        "10% depreciation deducted under judicial guidelines. Fair offer: ₹5,850.",
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
          description: "Original purchase bill confirming fixture installation.",
        },
      ],
    },
  ],
  auditState: "idle",
  auditProgress: 0,
  negRound: 1,
  landlordOffer: 43000,
  tenantOffer: 0,
  counterSlider: 10350,
  isSettled: false,
  tenantSigned: false,
  landlordSigned: false,
  tenantSignTime: "",
  landlordSignTime: "",
  maxUnlockedStep: 1,
};

const INITIAL_CLAIMS: ClaimItem[] = DEFAULT_CASE.claims;

export default function SettlrODRPage() {
  /* ─── CASE STATE MANAGEMENT ─── */
  const [cases, setCases] = useState<DisputeCase[]>([DEFAULT_CASE]);
  const [activeCaseId, setActiveCaseId] = useState<string>("BLR-2026-8941");
  const [isNewCaseModalOpen, setIsNewCaseModalOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  /* ─── STANDALONE WELCOME SCREEN STATE ─── */
  const [hasStarted, setHasStarted] = useState<boolean>(false);

  // Form 1-A Legal Intake & Filing Fields
  const [formTenantName, setFormTenantName] = useState("Ananya Iyer");
  const [formTenantContact, setFormTenantContact] = useState("+91 98860 12456");
  const [formLandlordName, setFormLandlordName] = useState("K. V. Subhash");
  const [formLandlordContact, setFormLandlordContact] = useState("+91 94481 65432");
  const [formLandlordAddress, setFormLandlordAddress] = useState("Flat 804, Tower 12, Sobha Dream Acres, Panathur - 560087");
  const [formAddressPreset, setFormAddressPreset] = useState(BANGALORE_ADDRESS_PRESETS[1]);
  const [formCustomAddress, setFormCustomAddress] = useState("");
  const [formStartDate, setFormStartDate] = useState("2024-04-01");
  const [formVacatingDate, setFormVacatingDate] = useState("2026-03-31");
  const [formDepositAmount, setFormDepositAmount] = useState(200000);
  const [formMonthlyRent, setFormMonthlyRent] = useState(32000);
  const [formPaintingClaimed, setFormPaintingClaimed] = useState(35000);
  const [formCleaningClaimed, setFormCleaningClaimed] = useState(9500);
  const [formFixtureClaimed, setFormFixtureClaimed] = useState(8000);
  const [formUtilityClaimed, setFormUtilityClaimed] = useState(3200);

  // Section C Statutory Declarations
  const [declHandoverKeys, setDeclHandoverKeys] = useState(true);
  const [declSec12WearAndTear, setDeclSec12WearAndTear] = useState(true);
  const [declAlgorithmicODR, setDeclAlgorithmicODR] = useState(true);
  const [intakeStep, setIntakeStep] = useState<1 | 2 | 3>(1);

  // Active Case Lookup
  const activeCase = cases.find((c) => c.id === activeCaseId) || cases[0];

  /* ─── CORE VIEW & THEME STATE ─── */
  const [activeView, setActiveView] = useState<ActiveView>("dashboard");
  const [theme, setTheme] = useState<"dark" | "light">("dark");
  const [perspective, setPerspective] = useState<"tenant" | "landlord" | "conciliator">("tenant");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Active Case Execution State
  const [claims, setClaims] = useState<ClaimItem[]>(DEFAULT_CASE.claims);
  const [expandedClaims, setExpandedClaims] = useState<Record<string, boolean>>({});
  const [showCaseParticulars, setShowCaseParticulars] = useState(false);
  const [previewEvidence, setPreviewEvidence] = useState<EvidenceItem | null>(null);

  // Section 2: Statutory Audit state
  const [auditState, setAuditState] = useState<"idle" | "running" | "completed">(DEFAULT_CASE.auditState);
  const [auditProgress, setAuditProgress] = useState(DEFAULT_CASE.auditProgress);

  // Section 3: Negotiation state
  const [negRound, setNegRound] = useState(DEFAULT_CASE.negRound);
  const [landlordOffer, setLandlordOffer] = useState(DEFAULT_CASE.landlordOffer);
  const [tenantOffer, setTenantOffer] = useState(DEFAULT_CASE.tenantOffer);
  const [counterSlider, setCounterSlider] = useState(DEFAULT_CASE.counterSlider);
  const [isSettled, setIsSettled] = useState(DEFAULT_CASE.isSettled);

  // Section 4: Digital signatures
  const [tenantSigned, setTenantSigned] = useState(DEFAULT_CASE.tenantSigned);
  const [landlordSigned, setLandlordSigned] = useState(DEFAULT_CASE.landlordSigned);
  const [tenantSignTime, setTenantSignTime] = useState(DEFAULT_CASE.tenantSignTime);
  const [landlordSignTime, setLandlordSignTime] = useState(DEFAULT_CASE.landlordSignTime);

  // Live pitch walkthrough automation
  const [isPitching, setIsPitching] = useState(false);

  const isDark = theme === "dark";

  // Financial calculations
  const totalDepositEscrow = activeCase.depositAmount;
  const initialLandlordTotal = claims.reduce((acc, c) => acc + c.landlordClaim, 0);
  const statutoryCap = claims.reduce((acc, c) => acc + c.statutoryAllowed, 0);
  const totalSlashed = Math.max(0, initialLandlordTotal - statutoryCap);

  const activeDeduction = isSettled
    ? landlordOffer
    : auditState === "completed"
    ? statutoryCap
    : landlordOffer;
  const netRefund = totalDepositEscrow - activeDeduction;

  // Negotiation Gap
  const currentGap = Math.abs(landlordOffer - tenantOffer);
  const gapPercentage = initialLandlordTotal > 0 ? Math.round((currentGap / initialLandlordTotal) * 100) : 0;

  // Sync active case changes into cases array
  const syncActiveCaseToCases = (updates: Partial<DisputeCase>) => {
    setCases((prev) =>
      prev.map((c) => (c.id === activeCaseId ? { ...c, ...updates } : c))
    );
  };

  /* ─── PROGRESSIVE STEP-GATING STATE ─── */
  const [maxUnlockedStep, setMaxUnlockedStep] = useState<number>(DEFAULT_CASE.maxUnlockedStep || 1);
  const [isDemoUnlocked, setIsDemoUnlocked] = useState<boolean>(false);

  const effectiveMaxStep = isDemoUnlocked ? 5 : maxUnlockedStep;
  const currentStepNumber = getStepNumber(activeView);

  const updateMaxUnlockedStep = (newStep: number) => {
    setMaxUnlockedStep((prev) => {
      const updated = Math.max(prev, newStep);
      syncActiveCaseToCases({ maxUnlockedStep: updated });
      return updated;
    });
  };

  const navigateToView = (targetView: ActiveView) => {
    const targetStepNum = getStepNumber(targetView);
    if (targetStepNum > effectiveMaxStep) {
      const targetMeta = WORKFLOW_STEPS.find((s) => s.step === targetStepNum);
      setToastMessage(
        `🔒 Step ${targetStepNum} (${targetMeta?.shortLabel || targetView}) is locked! Complete Step ${effectiveMaxStep} first, or use Demo Unlock.`
      );
      setTimeout(() => setToastMessage(null), 3500);
      return false;
    }
    setActiveView(targetView);
    setIsSidebarOpen(false);
    document.getElementById("dispute-dashboard")?.scrollIntoView({ behavior: "smooth" });
    return true;
  };

  /* ─── SWITCH ACTIVE CASE ─── */
  const switchCase = (id: string) => {
    const target = cases.find((c) => c.id === id);
    if (!target) return;
    setActiveCaseId(id);
    setClaims(target.claims);
    setAuditState(target.auditState);
    setAuditProgress(target.auditProgress);
    setNegRound(target.negRound);
    setLandlordOffer(target.landlordOffer);
    setTenantOffer(target.tenantOffer);
    setCounterSlider(target.counterSlider);
    setIsSettled(target.isSettled);
    setTenantSigned(target.tenantSigned);
    setLandlordSigned(target.landlordSigned);
    setTenantSignTime(target.tenantSignTime);
    setLandlordSignTime(target.landlordSignTime);
    setMaxUnlockedStep(target.maxUnlockedStep || 1);
    setExpandedClaims({});
    setToastMessage(`Switched to Case #${target.id} (${target.address.split(",")[0]})`);
    setTimeout(() => setToastMessage(null), 3500);
  };

  /* ─── TOGGLE CLAIM ACCORDION ─── */
  const toggleClaimAccordion = (id: string) => {
    setExpandedClaims((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  /* ─── TOGGLE CLAIM DISPUTE STATUS ─── */
  const toggleClaimDispute = (id: string) => {
    const updated = claims.map((c) => {
      if (c.id === id) {
        return { ...c, isDisputedByTenant: !c.isDisputedByTenant };
      }
      return c;
    });
    setClaims(updated);
    syncActiveCaseToCases({ claims: updated });
  };

  /* ─── QUICK TRIGGER 1: RUN STATUTORY AUDIT ─── */
  const handleTriggerAudit = () => {
    updateMaxUnlockedStep(3);
    setActiveView("rules");
    if (auditState === "completed") {
      updateMaxUnlockedStep(4);
      return;
    }

    setAuditState("running");
    setAuditProgress(0);
    syncActiveCaseToCases({ auditState: "running", auditProgress: 0 });

    let p = 0;
    const interval = setInterval(() => {
      p += 25;
      setAuditProgress(p);
      if (p >= 100) {
        clearInterval(interval);
        setAuditState("completed");
        const updatedClaims = claims.map((c) => ({
          ...c,
          statuteApplied: true,
        }));
        setClaims(updatedClaims);
        setLandlordOffer(statutoryCap);
        setCounterSlider(statutoryCap);
        updateMaxUnlockedStep(4);
        syncActiveCaseToCases({
          auditState: "completed",
          auditProgress: 100,
          claims: updatedClaims,
          landlordOffer: statutoryCap,
          counterSlider: statutoryCap,
        });

        confetti({
          particleCount: 70,
          spread: 60,
          origin: { y: 0.6 },
          colors: ["#34D399", "#10B981", "#E0DDDD"],
        });
      }
    }, 240);
  };

  /* ─── QUICK TRIGGER 2: FAST-FORWARD SETTLEMENT ─── */
  const handleFastForward = () => {
    setHasStarted(true);
    updateMaxUnlockedStep(5);
    setAuditState("completed");
    const updatedClaims = claims.map((c) => ({
      ...c,
      statuteApplied: true,
    }));
    setClaims(updatedClaims);
    setLandlordOffer(statutoryCap);
    setTenantOffer(statutoryCap);
    setCounterSlider(statutoryCap);
    setIsSettled(true);
    syncActiveCaseToCases({
      auditState: "completed",
      auditProgress: 100,
      claims: updatedClaims,
      landlordOffer: statutoryCap,
      tenantOffer: statutoryCap,
      counterSlider: statutoryCap,
      isSettled: true,
    });

    confetti({
      particleCount: 140,
      spread: 90,
      origin: { y: 0.5 },
      colors: ["#34D399", "#10B981", "#6EE7B7", "#E0DDDD", "#FFD700"],
    });

    setActiveView("settlement");
  };

  /* ─── QUICK TRIGGER 3: 1-CLICK PITCH DEMO ─── */
  const runPitchDemo = () => {
    setHasStarted(true);
    setIsDemoUnlocked(true);
    updateMaxUnlockedStep(5);
    setIsPitching(true);
    setPerspective("tenant");
    setActiveView("dashboard");

    setTimeout(() => {
      setPerspective("landlord");
    }, 1800);

    setTimeout(() => {
      setPerspective("conciliator");
      setActiveView("rules");
      handleTriggerAudit();
    }, 3500);

    setTimeout(() => {
      setActiveView("negotiation");
      handleMakeOffer(statutoryCap);
    }, 5800);

    setTimeout(() => {
      setActiveView("settlement");
      const timeStr = new Date().toLocaleString("en-IN");
      setTenantSigned(true);
      setTenantSignTime(timeStr);
      setLandlordSigned(true);
      setLandlordSignTime(timeStr);
      syncActiveCaseToCases({
        tenantSigned: true,
        tenantSignTime: timeStr,
        landlordSigned: true,
        landlordSignTime: timeStr,
      });
      setIsPitching(false);
    }, 7800);
  };

  /* ─── NEGOTIATION SUBMIT OFFER ─── */
  const handleMakeOffer = (offerAmount: number) => {
    setTenantOffer(offerAmount);
    const newGap = Math.abs(landlordOffer - offerAmount);

    if (newGap <= 4100 || offerAmount === statutoryCap) {
      setIsSettled(true);
      setLandlordOffer(offerAmount);
      updateMaxUnlockedStep(5);
      syncActiveCaseToCases({
        tenantOffer: offerAmount,
        landlordOffer: offerAmount,
        isSettled: true,
      });

      confetti({
        particleCount: 150,
        spread: 100,
        origin: { y: 0.6 },
        colors: ["#34D399", "#10B981", "#E0DDDD", "#6EE7B7"],
      });

      setTimeout(() => {
        setActiveView("settlement");
      }, 700);
    } else {
      if (negRound < 3) {
        const nextRound = negRound + 1;
        const newDemand = Math.max(offerAmount, Math.round(landlordOffer - (landlordOffer - offerAmount) * 0.4));
        setNegRound(nextRound);
        setLandlordOffer(newDemand);
        syncActiveCaseToCases({
          tenantOffer: offerAmount,
          negRound: nextRound,
          landlordOffer: newDemand,
        });
      } else {
        const compromise = Math.round((landlordOffer + offerAmount) / 2);
        setLandlordOffer(compromise);
        setTenantOffer(compromise);
        setIsSettled(true);
        updateMaxUnlockedStep(5);
        syncActiveCaseToCases({
          tenantOffer: compromise,
          landlordOffer: compromise,
          isSettled: true,
        });

        confetti({
          particleCount: 120,
          spread: 80,
          origin: { y: 0.6 },
        });

        setTimeout(() => {
          setActiveView("settlement");
        }, 700);
      }
    }
  };

  /* ─── STEP PROGRESSION HANDLERS ─── */
  const unlockAndNavigateToStep2 = () => {
    updateMaxUnlockedStep(2);
    setActiveView("intake");
    setIsSidebarOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
    setToastMessage("🚀 Step 2 Unlocked: Form 1-A Notice & Deductions Filing");
    setTimeout(() => setToastMessage(null), 3500);
  };

  const handleAcceptAuditAndProceedToNegotiation = () => {
    updateMaxUnlockedStep(4);
    setActiveView("negotiation");
    setToastMessage("✅ Statutory Audit Accepted! Unlocked Step 4: 3-Round Algorithmic Negotiation");
    setTimeout(() => setToastMessage(null), 3500);
    document.getElementById("dispute-dashboard")?.scrollIntoView({ behavior: "smooth" });
  };

  const handleProceedToSettlementDeed = () => {
    updateMaxUnlockedStep(5);
    setActiveView("settlement");
    setToastMessage("📜 Step 5 Unlocked: Binding e-Stamp Settlement Deed");
    setTimeout(() => setToastMessage(null), 3500);
    document.getElementById("dispute-dashboard")?.scrollIntoView({ behavior: "smooth" });
  };

  /* ─── INTAKE VIEW NAVIGATION & DEMO SEEDING ─── */
  const openIntakeView = () => {
    unlockAndNavigateToStep2();
  };

  const handleSeedDemoCase = () => {
    setFormTenantName("Ananya Iyer");
    setFormTenantContact("+91 98860 12456");
    setFormLandlordName("K. V. Subhash");
    setFormLandlordContact("+91 94481 65432");
    setFormLandlordAddress("Flat 804, Tower 12, Sobha Dream Acres, Panathur - 560087");
    setFormAddressPreset(BANGALORE_ADDRESS_PRESETS[1]);
    setFormCustomAddress("");
    setFormStartDate("2024-04-01");
    setFormVacatingDate("2026-03-31");
    setFormDepositAmount(200000);
    setFormMonthlyRent(32000);
    setFormPaintingClaimed(35000);
    setFormCleaningClaimed(9500);
    setFormFixtureClaimed(8000);
    setFormUtilityClaimed(3200);
    setDeclHandoverKeys(true);
    setDeclSec12WearAndTear(true);
    setDeclAlgorithmicODR(true);
    setToastMessage("⚡ Demo case data populated for Sobha Dream Acres!");
    setTimeout(() => setToastMessage(null), 4000);
  };

  /* ─── CREATE NEW DISPUTE CASE & RUN STATUTORY AUDIT ─── */
  const handleCreateDisputeCase = (e?: React.FormEvent) => {
    if (e) e.preventDefault();

    if (!declSec12WearAndTear || !declAlgorithmicODR) {
      setToastMessage("⚠️ Please agree to statutory wear & tear and algorithmic mediation declarations.");
      setTimeout(() => setToastMessage(null), 4000);
      return;
    }

    const newId = `BLR-2026-${Math.floor(1000 + Math.random() * 9000)}`;
    const selectedAddress =
      formAddressPreset === "Custom Address..."
        ? formCustomAddress.trim() || "Flat 204, Brigade Gateway, Malleshwaram, Bengaluru - 560055"
        : formAddressPreset;

    const paintingClaimed = Number(formPaintingClaimed) || 0;
    const cleaningClaimed = Number(formCleaningClaimed) || 0;
    const fixtureClaimed = Number(formFixtureClaimed) || 0;
    const utilityClaimed = Number(formUtilityClaimed) || 0;

    // Statutory calculation under Karnataka Sec 12 rules:
    const allowedPainting = 0; // Sec 12: Normal wear & tear zero-out
    const allowedCleaning = Math.min(cleaningClaimed, 4500); // Bengaluru benchmark ceiling
    const allowedFixture = Math.round(fixtureClaimed * 0.9); // 10% statutory depreciation
    const allowedUtility = utilityClaimed; // Actuals approved under Sec 14

    const deductions: DeductionClaim[] = [
      {
        item: "Painting & Wall Restoration",
        claimed: paintingClaimed,
        category: "wear_and_tear",
        allowed: allowedPainting,
      },
      {
        item: "Deep Cleaning & Turnover Sanitization",
        claimed: cleaningClaimed,
        category: "cleaning",
        allowed: allowedCleaning,
      },
      {
        item: "Appliance / Fixture Damage",
        claimed: fixtureClaimed,
        category: "fixture",
        allowed: allowedFixture,
      },
      {
        item: "Unpaid BESCOM / Utility Dues",
        claimed: utilityClaimed,
        category: "utility",
        allowed: allowedUtility,
      },
    ];

    const generatedClaims = buildClaimsForCase(newId, deductions, true);
    const totalAllowed = allowedPainting + allowedCleaning + allowedFixture + allowedUtility;

    const newCase: DisputeCase = {
      id: newId,
      address: selectedAddress,
      tenant: formTenantName.trim() || "Ananya Iyer",
      tenantContact: formTenantContact.trim() || "+91 98860 12456",
      landlord: formLandlordName.trim() || "K. V. Subhash",
      landlordContact: formLandlordContact.trim() || "+91 94481 65432",
      depositAmount: Number(formDepositAmount) || 200000,
      monthlyRent: Number(formMonthlyRent) || 32000,
      deductionsClaimed: deductions,
      claims: generatedClaims,
      auditState: "completed",
      auditProgress: 100,
      negRound: 1,
      landlordOffer: totalAllowed,
      tenantOffer: totalAllowed,
      counterSlider: totalAllowed,
      isSettled: false,
      tenantSigned: false,
      landlordSigned: false,
      tenantSignTime: "",
      landlordSignTime: "",
      maxUnlockedStep: 3,
    };

    setCases((prev) => [newCase, ...prev]);
    setActiveCaseId(newId);
    setClaims(generatedClaims);
    setAuditState("completed");
    setAuditProgress(100);
    setNegRound(1);
    setLandlordOffer(totalAllowed);
    setTenantOffer(totalAllowed);
    setCounterSlider(totalAllowed);
    setIsSettled(false);
    setTenantSigned(false);
    setLandlordSigned(false);
    setTenantSignTime("");
    setLandlordSignTime("");
    setIsNewCaseModalOpen(false);
    updateMaxUnlockedStep(3);

    setActiveView("rules");
    setToastMessage(`✅ Form 1-A Filed! Case #${newId} registered. Advanced to Step 3: Karnataka Sec 12 Audit.`);
    setTimeout(() => setToastMessage(null), 5000);

    confetti({
      particleCount: 160,
      spread: 100,
      origin: { y: 0.5 },
      colors: ["#34D399", "#10B981", "#6EE7B7", "#FFD700"],
    });

    setTimeout(() => {
      document.getElementById("dispute-dashboard")?.scrollIntoView({ behavior: "smooth" });
    }, 150);
  };

  /* ─── RESET DEMO ─── */
  const handleReset = () => {
    const initialClaims = activeCase.claims.map((c) => ({
      ...c,
      statuteApplied: false,
    }));
    const claimTotal = initialClaims.reduce((acc, c) => acc + c.landlordClaim, 0);
    const statutoryTotal = initialClaims.reduce((acc, c) => acc + c.statutoryAllowed, 0);

    setClaims(initialClaims);
    setExpandedClaims({});
    setShowCaseParticulars(false);
    setAuditState("idle");
    setAuditProgress(0);
    setNegRound(1);
    setLandlordOffer(claimTotal);
    setTenantOffer(0);
    setCounterSlider(statutoryTotal);
    setIsSettled(false);
    setTenantSigned(false);
    setLandlordSigned(false);
    setTenantSignTime("");
    setLandlordSignTime("");
    updateMaxUnlockedStep(1);
    setActiveView("dashboard");
    setIsSidebarOpen(false);

    syncActiveCaseToCases({
      auditState: "idle",
      auditProgress: 0,
      negRound: 1,
      landlordOffer: claimTotal,
      tenantOffer: 0,
      counterSlider: statutoryTotal,
      isSettled: false,
      tenantSigned: false,
      landlordSigned: false,
      tenantSignTime: "",
      landlordSignTime: "",
      claims: initialClaims,
      maxUnlockedStep: 1,
    });
  };

  return (
    <div
      className={`min-h-screen font-sans transition-colors duration-300 ${
        isDark ? "bg-[#121111] text-[#E0DDDD]" : "bg-[#F4F2F2] text-[#1E1B1B]"
      }`}
    >
      {/* ─── FLOATING TOAST NOTIFICATION BANNER ─── */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-5 left-1/2 -translate-x-1/2 z-[120] px-5 py-3 rounded-2xl bg-emerald-500 text-slate-950 font-black text-xs shadow-2xl flex items-center gap-2.5 border border-emerald-300 shadow-emerald-950/50"
          >
            <CheckCircle2 className="w-4 h-4 shrink-0 text-slate-950" />
            <span>{toastMessage}</span>
            <button
              onClick={() => setToastMessage(null)}
              className="ml-2 p-1 rounded-lg hover:bg-black/10 transition cursor-pointer"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
      {/* ═══════════════════════════════════════════════════════════
          STANDALONE WELCOME SCREEN / FULL DISPUTE APP TOGGLE
      ═══════════════════════════════════════════════════════════ */}
      <AnimatePresence mode="wait">
        {!hasStarted ? (
          <motion.div
            key="standalone-welcome-screen"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="relative min-h-screen flex flex-col justify-between p-4 sm:p-8 overflow-hidden"
          >
            {/* Ambient Gradient Glows */}
            <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[360px] bg-emerald-500/15 rounded-full blur-[150px] pointer-events-none" />
            <div className="absolute bottom-10 right-10 w-96 h-96 bg-teal-500/10 rounded-full blur-[130px] pointer-events-none" />

            {/* Standalone Top Bar */}
            <div className="max-w-6xl mx-auto w-full flex items-center justify-between gap-4 pt-2 relative z-10">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-emerald-500 flex items-center justify-center text-slate-950 shadow-lg shadow-emerald-500/30">
                  <Gavel className="w-5 h-5 stroke-[2.4]" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className={`font-black text-lg sm:text-xl tracking-tight ${isDark ? "text-white" : "text-[#1E1B1B]"}`}>
                      Settlr ODR
                    </span>
                    <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full border bg-emerald-500/20 text-emerald-400 border-emerald-500/30">
                      Karnataka GovTech
                    </span>
                  </div>
                  <div className="text-[11px] opacity-70 hidden sm:block">
                    Online Tenancy Dispute Conciliation Portal
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <span className="text-xs font-bold opacity-60 hidden md:inline font-mono">
                  Sec 89 CPC • Model Tenancy Act
                </span>
                <button
                  onClick={() => setTheme(isDark ? "light" : "dark")}
                  className={`p-2 rounded-xl border transition-all text-xs font-bold cursor-pointer ${
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

            {/* Standalone Center Hero Content */}
            <div className="max-w-4xl mx-auto w-full text-center my-auto py-10 sm:py-16 space-y-6 relative z-10">
              {/* Badge */}
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs sm:text-sm font-black uppercase tracking-wider bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 shadow-md shadow-emerald-950/20"
              >
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
                Karnataka Rent Control Act Compliant • Bengaluru Tenancy ODR
              </motion.div>

              {/* Main Title */}
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.1 }}
                className={`text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.12] max-w-4xl mx-auto ${
                  isDark ? "text-white" : "text-[#1E1B1B]"
                }`}
              >
                Fair, Fast & Algorithmic Security Deposit Resolution
              </motion.h1>

              {/* Subtitle */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.2 }}
                className="text-sm sm:text-lg opacity-85 max-w-3xl mx-auto leading-relaxed"
              >
                End Bengaluru rental deposit disputes in under 48 hours. Enforce Karnataka Section 12 statutory guardrails against arbitrary painting deductions, run automated wear-and-tear audits, and resolve claims via 3-round algorithmic mediation.
              </motion.p>

              {/* 3 Feature Cards/Pills */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.3 }}
                className="grid grid-cols-1 md:grid-cols-3 gap-3.5 sm:gap-4 max-w-4xl mx-auto pt-4 text-left"
              >
                {/* Feature 1 */}
                <div
                  className={`p-4 sm:p-5 rounded-2xl border transition-all shadow-md flex flex-col justify-between ${
                    isDark
                      ? "bg-[#1A1818] border-[#363232] hover:border-emerald-500/40"
                      : "bg-white border-[#E0DDDD] hover:border-emerald-400 shadow-sm"
                  }`}
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xl">⚖️</span>
                      <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                        Statutory Rule 12
                      </span>
                    </div>
                    <h3 className={`font-black text-sm sm:text-base ${isDark ? "text-white" : "text-[#1E1B1B]"}`}>
                      Karnataka Sec 12 Rules
                    </h3>
                    <p className="text-xs opacity-75 leading-relaxed">
                      Painting deductions slashed to ₹0 & cleaning charges capped at Bengaluru benchmark ceilings.
                    </p>
                  </div>
                </div>

                {/* Feature 2 */}
                <div
                  className={`p-4 sm:p-5 rounded-2xl border transition-all shadow-md flex flex-col justify-between ${
                    isDark
                      ? "bg-[#1A1818] border-[#363232] hover:border-emerald-500/40"
                      : "bg-white border-[#E0DDDD] hover:border-emerald-400 shadow-sm"
                  }`}
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xl">⚡</span>
                      <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/20">
                        Convergence
                      </span>
                    </div>
                    <h3 className={`font-black text-sm sm:text-base ${isDark ? "text-white" : "text-[#1E1B1B]"}`}>
                      3-Round Negotiation
                    </h3>
                    <p className="text-xs opacity-75 leading-relaxed">
                      Algorithmic convergence gap tracker that settles deposit disputes fast without litigation.
                    </p>
                  </div>
                </div>

                {/* Feature 3 */}
                <div
                  className={`p-4 sm:p-5 rounded-2xl border transition-all shadow-md flex flex-col justify-between ${
                    isDark
                      ? "bg-[#1A1818] border-[#363232] hover:border-emerald-500/40"
                      : "bg-white border-[#E0DDDD] hover:border-emerald-400 shadow-sm"
                  }`}
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xl">📄</span>
                      <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded-full bg-teal-500/10 text-teal-400 border border-teal-500/20">
                        Sec 89 CPC
                      </span>
                    </div>
                    <h3 className={`font-black text-sm sm:text-base ${isDark ? "text-white" : "text-[#1E1B1B]"}`}>
                      Form 4 Settlement
                    </h3>
                    <p className="text-xs opacity-75 leading-relaxed">
                      Generates an enforceable, stamp-duty styled legal deed recognized under Civil Procedure Code.
                    </p>
                  </div>
                </div>
              </motion.div>

              {/* Primary Call-To-Action Button */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.4 }}
                className="pt-6 flex flex-col sm:flex-row items-center justify-center gap-3.5"
              >
                <button
                  onClick={() => {
                    setHasStarted(true);
                    setActiveView("dashboard");
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }}
                  className="group px-8 sm:px-10 py-4 sm:py-4.5 rounded-2xl bg-gradient-to-r from-emerald-500 via-emerald-400 to-teal-400 hover:from-emerald-400 hover:to-teal-300 text-slate-950 font-black text-sm sm:text-base transition-all shadow-2xl shadow-emerald-500/30 flex items-center gap-3 hover:scale-105 cursor-pointer ring-2 ring-emerald-400/40 hover:ring-emerald-400"
                >
                  <span>Let's Go! Launch Dispute Resolution</span>
                  <ArrowRight className="w-4 h-4 stroke-[3] group-hover:translate-x-1 transition-transform" />
                </button>

                <button
                  onClick={() => {
                    setHasStarted(true);
                    setTimeout(() => runPitchDemo(), 300);
                  }}
                  className={`px-6 py-4 rounded-2xl border text-xs sm:text-sm font-black transition flex items-center gap-2 cursor-pointer ${
                    isDark
                      ? "bg-[#1E1C1C] border-[#3D3838] hover:bg-[#282424] text-[#E0DDDD]"
                      : "bg-white border-[#D6D1D1] hover:bg-[#F4F2F2] text-[#1E1B1B] shadow-sm"
                  }`}
                >
                  <Award className="w-4 h-4 text-emerald-400" />
                  <span>30-Sec Judge Pitch Demo</span>
                </button>
              </motion.div>
            </div>

            {/* Standalone Footer */}
            <div className="text-center py-5 relative z-10 border-t border-white/10 max-w-5xl mx-auto w-full text-[11px] opacity-70 flex flex-col sm:flex-row items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <Shield className="w-3.5 h-3.5 text-emerald-400" />
                <span>Section 89 CPC & Karnataka Rent Control Act, 1999 Compliant ODR Framework</span>
              </div>
              <span>Bengaluru Tenancy Dispute Resolution Portal • Case #{activeCase.id} Ready</span>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="active-dispute-app"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {/* ═══════════════════════════════════════════════════════════
                TARGET CONTAINER: DISPUTE DASHBOARD
            ═══════════════════════════════════════════════════════════ */}
            <div id="dispute-dashboard" className="scroll-mt-0">
              {/* STICKY TOP HUD & NAVIGATION BAR */}
              <header
                className={`sticky top-0 z-50 backdrop-blur-md border-b transition-colors ${
                  isDark
                    ? "bg-[#161414]/90 border-[#2D2929] shadow-lg shadow-black/40"
                    : "bg-white/90 border-[#E0DDDD] shadow-sm"
                }`}
              >
              <div className="max-w-7xl mx-auto px-3 sm:px-6 py-2 flex flex-wrap items-center justify-between gap-3">
                {/* Brand, Home Return & Drawer Trigger */}
                <div className="flex items-center gap-2 sm:gap-3">
                  <button
                    onClick={() => setIsSidebarOpen(true)}
                    className={`p-1.5 rounded-xl border transition-all flex items-center justify-center ${
                      isDark
                        ? "bg-[#222020] border-[#3A3535] text-[#E0DDDD] hover:bg-[#2D2A2A] hover:text-emerald-400"
                        : "bg-[#EAE7E7] border-[#D6D1D1] text-[#2E2A2A] hover:bg-[#E0DDDD] hover:text-emerald-700"
                    }`}
                    title="Open Navigation Menu"
                  >
                    <Menu className="w-4 h-4" />
                  </button>

                  {/* Return to Home / Landing */}
                  <button
                    onClick={() => {
                      setHasStarted(false);
                      window.scrollTo({ top: 0, behavior: "smooth" });
                    }}
                    className={`px-2.5 py-1.5 rounded-xl border text-xs font-black transition flex items-center gap-1.5 cursor-pointer ${
                      isDark
                        ? "bg-[#222020] border-[#3A3535] text-[#A8A3A3] hover:text-white hover:border-neutral-500"
                        : "bg-white border-[#D6D1D1] text-[#5E5959] hover:text-black"
                    }`}
                    title="Return to Welcome Screen"
                  >
                    <ArrowLeft className="w-3.5 h-3.5" />
                    <span className="hidden sm:inline">Home</span>
                  </button>

                  <div
                    onClick={() => {
                      setHasStarted(false);
                      window.scrollTo({ top: 0, behavior: "smooth" });
                    }}
                    className="flex items-center gap-2 cursor-pointer group"
                    title="Return to Welcome Screen"
                  >
                    <div className="w-8 h-8 rounded-xl bg-emerald-500 flex items-center justify-center text-white shadow-md group-hover:scale-105 transition-transform">
                      <Gavel className="w-4 h-4 stroke-[2.4]" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className={`font-black text-lg tracking-tight group-hover:text-emerald-400 transition-colors ${isDark ? "text-white" : "text-[#1E1B1B]"}`}>
                          Settlr ODR
                        </span>
                        <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full border bg-emerald-500/20 text-emerald-400 border-emerald-500/30">
                          Karnataka
                        </span>
                      </div>
                    </div>
                  </div>

            {/* Quick Case Switcher Pill */}
            <div className={`hidden md:flex items-center gap-1.5 px-2.5 py-1 rounded-xl border text-xs font-bold ${
              isDark ? "bg-[#1C1A1A] border-[#363232]" : "bg-white border-[#D6D1D1] shadow-sm"
            }`}>
              <Layers className="w-3 h-3 text-emerald-400 shrink-0" />
              <select
                value={activeCaseId}
                onChange={(e) => switchCase(e.target.value)}
                className="bg-transparent text-emerald-400 font-black cursor-pointer focus:outline-none text-xs"
              >
                {cases.map((c) => (
                  <option key={c.id} value={c.id} className={isDark ? "bg-[#1C1A1A] text-white" : "bg-white text-black"}>
                    #{c.id} • {c.address.split(",")[0]}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Live Perspective Bar */}
          <div
            className={`flex items-center border p-1 rounded-xl shadow-inner ${
              isDark ? "bg-[#1C1A1A] border-[#363232]" : "bg-[#EAE7E7] border-[#D6D1D1]"
            }`}
          >
            <button
              onClick={() => setPerspective("tenant")}
              className={`px-3 py-1.5 rounded-lg text-xs font-black transition-all flex items-center gap-1.5 ${
                perspective === "tenant"
                  ? "bg-emerald-500 text-slate-950 shadow-md"
                  : isDark
                  ? "text-[#A8A3A3] hover:text-white"
                  : "text-[#5E5959] hover:text-black"
              }`}
            >
              <User className="w-3.5 h-3.5" />
              <span>🧑 {activeCase.tenant.split(" ")[0]} <span className="hidden md:inline">(Tenant)</span></span>
            </button>
            <button
              onClick={() => setPerspective("landlord")}
              className={`px-3 py-1.5 rounded-lg text-xs font-black transition-all flex items-center gap-1.5 ${
                perspective === "landlord"
                  ? "bg-[#E0DDDD] text-[#1A1818] shadow-md"
                  : isDark
                  ? "text-[#A8A3A3] hover:text-white"
                  : "text-[#5E5959] hover:text-black"
              }`}
            >
              <Building2 className="w-3.5 h-3.5" />
              <span>👨 {activeCase.landlord.split(" ")[0]} <span className="hidden md:inline">(Landlord)</span></span>
            </button>
            <button
              onClick={() => setPerspective("conciliator")}
              className={`px-3 py-1.5 rounded-lg text-xs font-black transition-all flex items-center gap-1.5 ${
                perspective === "conciliator"
                  ? "bg-amber-400 text-slate-950 shadow-md"
                  : isDark
                  ? "text-[#A8A3A3] hover:text-white"
                  : "text-[#5E5959] hover:text-black"
              }`}
            >
              <Scale className="w-3.5 h-3.5" />
              <span>⚖️ Conciliator</span>
            </button>
          </div>

          {/* Quick Triggers, New Dispute & Theme Switcher */}
          <div className="flex items-center gap-2">
            {/* Demo Mode Step Unlocker Toggle */}
            <button
              onClick={() => {
                const nextVal = !isDemoUnlocked;
                setIsDemoUnlocked(nextVal);
                if (nextVal) {
                  setToastMessage("⚡ Demo Mode: All 5 Workflow Steps Unlocked!");
                } else {
                  setToastMessage("🔒 Step-gated Progressive Workflow Restored");
                }
                setTimeout(() => setToastMessage(null), 3500);
              }}
              className={`px-2.5 py-1.5 rounded-xl text-xs font-black transition flex items-center gap-1.5 border shadow-sm cursor-pointer ${
                isDemoUnlocked
                  ? "bg-amber-500/20 text-amber-300 border-amber-500/50 hover:bg-amber-500 hover:text-slate-950 shadow-amber-500/10"
                  : isDark
                  ? "bg-[#252222] border-[#3D3838] text-[#A8A3A3] hover:text-white"
                  : "bg-white border-[#D6D1D1] text-[#5E5959] hover:text-black"
              }`}
              title="Toggle Demo Mode: Unlocks all 5 workflow steps for pitch presentation"
            >
              {isDemoUnlocked ? (
                <Unlock className="w-3.5 h-3.5 text-amber-400" />
              ) : (
                <Lock className="w-3.5 h-3.5 text-neutral-400" />
              )}
              <span className="hidden sm:inline font-black">
                {isDemoUnlocked ? "All Steps Unlocked" : "Unlock All (Demo)"}
              </span>
            </button>

            <button
              onClick={openIntakeView}
              className="px-2.5 py-1.5 rounded-xl text-xs font-black bg-emerald-500 hover:bg-emerald-400 text-slate-950 transition flex items-center gap-1.5 shadow-md shadow-emerald-500/20 cursor-pointer"
              title="File New Tenancy Dispute (Form 1-A Intake)"
            >
              <Plus className="w-3.5 h-3.5 stroke-[2.5]" />
              <span className="hidden sm:inline">File Dispute</span>
            </button>

            <button
              onClick={runPitchDemo}
              disabled={isPitching}
              className={`px-3 py-1.5 rounded-xl text-xs font-black transition flex items-center gap-1.5 shadow-md ${
                isPitching
                  ? "bg-amber-400 text-slate-950 animate-pulse"
                  : "bg-gradient-to-r from-emerald-500 to-teal-400 hover:from-emerald-400 hover:to-teal-300 text-slate-950 shadow-emerald-500/20"
              }`}
              title="Automated 1-Click Live Pitch Walkthrough for Judges"
            >
              <Award className="w-3.5 h-3.5" />
              <span>{isPitching ? "Pitching..." : "1-Click Pitch"}</span>
            </button>

            <button
              onClick={handleTriggerAudit}
              className="px-2.5 py-1.5 rounded-xl text-xs font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 hover:bg-emerald-500 hover:text-slate-950 transition flex items-center gap-1 shadow-sm"
              title="Open Section 2 Legal Audit and run compliance check"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span className="hidden lg:inline">Legal Audit</span>
            </button>

            <button
              onClick={handleFastForward}
              className="px-2.5 py-1.5 rounded-xl text-xs font-bold bg-amber-500/20 text-amber-400 border border-amber-500/40 hover:bg-amber-500 hover:text-slate-950 transition flex items-center gap-1 shadow-sm"
              title="Fast-forward negotiation and unlock e-Stamp Settlement Deed"
            >
              <Zap className="w-3.5 h-3.5" />
              <span className="hidden lg:inline">Fast Deed</span>
            </button>

            <button
              onClick={() => setTheme(isDark ? "light" : "dark")}
              className={`p-1.5 rounded-xl border transition-all text-xs font-bold ${
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

        {/* ─── PERSPECTIVE CONTEXTUAL HINT ─── */}
        <div
          className={`px-4 py-1.5 text-xs font-semibold border-t transition-colors ${
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
              <Info className="w-3.5 h-3.5 shrink-0" />
              {perspective === "tenant" && (
                <span>
                  <strong>Tenant Perspective ({activeCase.tenant}):</strong> Monthly rent ₹{activeCase.monthlyRent.toLocaleString("en-IN")}. Disputing unlawful deductions under Sec 12 Karnataka Rent Act.
                </span>
              )}
              {perspective === "landlord" && (
                <span>
                  <strong>Landlord Perspective ({activeCase.landlord}):</strong> Holding ₹{totalDepositEscrow.toLocaleString("en-IN")} deposit. Statutory audit caps legal claim to avoid court penalties.
                </span>
              )}
              {perspective === "conciliator" && (
                <span>
                  <strong>Neutral Conciliator (Sec 89 CPC):</strong> Judicial out-of-court formula. Statutory consensus point is ₹{statutoryCap.toLocaleString("en-IN")} cap with ₹{netRefund.toLocaleString("en-IN")} returned to tenant.
                </span>
              )}
            </div>
            <span className="text-[10px] uppercase font-black opacity-80 shrink-0 hidden sm:inline">
              Active: {perspective.toUpperCase()}
            </span>
          </div>
        </div>

        {/* ─── 5-STEP PROGRESSIVE WORKFLOW STEPPER BAR ─── */}
        <div className="max-w-7xl mx-auto px-3 sm:px-6 py-2">
          <div
            className={`p-2 rounded-2xl border shadow-md transition-colors ${
              isDark ? "bg-[#181616] border-[#332F2F]" : "bg-white border-[#E0DDDD]"
            }`}
          >
            {/* Stepper Status Header */}
            <div className="flex items-center justify-between px-2 py-1 mb-1.5 text-xs">
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-400 border border-emerald-500/25">
                  Karnataka ODR Workflow
                </span>
                <span className="font-extrabold hidden md:inline text-xs">
                  Stage {currentStepNumber} of 5: <span className="text-emerald-400">{WORKFLOW_STEPS.find(s => s.id === activeView)?.label}</span>
                </span>
              </div>

              <div className="flex items-center gap-2">
                {isDemoUnlocked && (
                  <span className="text-[10px] font-black px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30 flex items-center gap-1">
                    <Unlock className="w-2.5 h-2.5" /> Demo Mode
                  </span>
                )}
                <span className={`text-[11px] font-bold ${isDark ? "text-neutral-400" : "text-neutral-600"}`}>
                  {effectiveMaxStep}/5 Stages Unlocked
                </span>
              </div>
            </div>

            {/* 5 Step Blocks */}
            <div className="grid grid-cols-5 gap-1.5 sm:gap-2">
              {WORKFLOW_STEPS.map((stepItem) => {
                const isCurrent = activeView === stepItem.id;
                const isCompleted = stepItem.step < currentStepNumber;
                const isLocked = stepItem.step > effectiveMaxStep;

                return (
                  <button
                    key={stepItem.id}
                    onClick={() => navigateToView(stepItem.id)}
                    className={`group relative p-2 sm:p-2.5 rounded-xl border text-left transition-all flex flex-col justify-between ${
                      isCurrent
                        ? "bg-emerald-500 text-slate-950 border-emerald-400 shadow-lg shadow-emerald-500/25 ring-2 ring-emerald-400/40 cursor-default"
                        : isLocked
                        ? isDark
                          ? "bg-[#141212]/70 border-[#2A2626] text-neutral-600 opacity-40 cursor-not-allowed"
                          : "bg-neutral-100/70 border-neutral-200 text-neutral-400 opacity-40 cursor-not-allowed"
                        : isCompleted
                        ? isDark
                          ? "bg-[#1F1C1C] border-emerald-500/30 hover:border-emerald-500/60 hover:bg-[#252222] text-[#E0DDDD] cursor-pointer"
                          : "bg-emerald-50/40 border-emerald-300 hover:bg-emerald-50 text-[#1E1B1B] cursor-pointer"
                        : isDark
                        ? "bg-[#1E1B1B] border-[#363232] hover:border-neutral-500 hover:bg-[#252222] text-[#E0DDDD] cursor-pointer"
                        : "bg-white border-[#E0DDDD] hover:border-neutral-400 hover:bg-neutral-50 text-[#1E1B1B] cursor-pointer"
                    }`}
                    title={
                      isLocked
                        ? `Locked: Complete Step ${stepItem.step - 1} or activate Demo Mode`
                        : `${stepItem.label} — ${stepItem.description}`
                    }
                  >
                    {/* Top row: Step Indicator Badge & Status */}
                    <div className="flex items-center justify-between gap-1 w-full mb-1">
                      <span
                        className={`w-5 h-5 sm:w-6 sm:h-6 rounded-lg flex items-center justify-center font-black text-[10px] sm:text-xs transition-colors shrink-0 ${
                          isCurrent
                            ? "bg-slate-950 text-emerald-400 shadow-sm"
                            : isLocked
                            ? "bg-neutral-800 text-neutral-500"
                            : isCompleted
                            ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/40"
                            : isDark
                            ? "bg-[#2B2727] text-neutral-300 border border-[#3E3838]"
                            : "bg-neutral-200 text-neutral-700"
                        }`}
                      >
                        {isLocked ? (
                          <Lock className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-neutral-500" />
                        ) : isCompleted ? (
                          <Check className="w-3 h-3 text-emerald-400 stroke-[3]" />
                        ) : (
                          stepItem.step
                        )}
                      </span>

                      {/* Status pill */}
                      <span
                        className={`text-[9px] sm:text-[10px] font-black px-1.5 py-0.5 rounded-md uppercase shrink-0 hidden xs:inline-block ${
                          isCurrent
                            ? "bg-slate-950/20 text-slate-950"
                            : isLocked
                            ? "text-neutral-500"
                            : isCompleted
                            ? "text-emerald-400"
                            : isDark
                            ? "text-neutral-400"
                            : "text-neutral-500"
                        }`}
                      >
                        {isLocked ? "Locked" : isCompleted ? "✓ Done" : isCurrent ? "Active" : "Ready"}
                      </span>
                    </div>

                    {/* Step Labels */}
                    <div className="min-w-0">
                      <div
                        className={`font-black text-xs sm:text-sm truncate leading-tight ${
                          isCurrent
                            ? "text-slate-950"
                            : isLocked
                            ? "text-neutral-600"
                            : isDark
                            ? "text-white"
                            : "text-[#1E1B1B]"
                        }`}
                      >
                        {stepItem.shortLabel}
                      </div>
                      <div
                        className={`text-[10px] truncate hidden md:block leading-snug mt-0.5 ${
                          isCurrent
                            ? "text-slate-950/80 font-medium"
                            : isLocked
                            ? "text-neutral-600"
                            : "opacity-60"
                        }`}
                      >
                        {stepItem.stageBadge}
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </header>

      {/* ═══════════════════════════════════════════════════════════
          SLIDE-OVER SIDEBAR DRAWER (WIRED TO activeView)
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
              className={`fixed top-0 left-0 bottom-0 w-80 max-w-[85vw] z-50 flex flex-col justify-between border-r shadow-2xl p-4 overflow-y-auto ${
                isDark
                  ? "bg-[#1A1818] border-[#363232] text-[#E0DDDD]"
                  : "bg-white border-[#E0DDDD] text-[#1E1B1B]"
              }`}
            >
              <div className="space-y-4">
                <div className={`flex items-center justify-between border-b pb-3 ${isDark ? "border-[#363232]" : "border-[#E0DDDD]"}`}>
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-lg bg-emerald-500 flex items-center justify-center text-white font-bold">
                      <Gavel className="w-3.5 h-3.5" />
                    </div>
                    <div>
                      <div className="text-[10px] font-black uppercase text-emerald-400">Case Dossier</div>
                      <div className="font-extrabold text-sm">Dispute #{activeCase.id}</div>
                    </div>
                  </div>
                  <button
                    onClick={() => setIsSidebarOpen(false)}
                    className="p-1 rounded-lg hover:bg-white/10 transition cursor-pointer"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                <div className={`p-3 rounded-xl border ${isDark ? "bg-[#222020] border-[#3A3535]" : "bg-[#F9F8F8] border-[#E0DDDD]"}`}>
                  <div className="text-xs font-bold text-emerald-400 flex items-center gap-1.5 mb-1">
                    <MapPin className="w-3.5 h-3.5" />
                    {activeCase.address.split(",")[0]}
                  </div>
                  <p className="text-[11px] opacity-70">
                    {activeCase.address}
                  </p>
                </div>

                {/* Return to Welcome Screen button */}
                <button
                  onClick={() => {
                    setIsSidebarOpen(false);
                    setHasStarted(false);
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }}
                  className={`w-full py-2 px-3 rounded-xl border text-xs font-bold transition flex items-center justify-center gap-2 cursor-pointer ${
                    isDark
                      ? "bg-[#222020] border-[#3A3535] text-[#A8A3A3] hover:text-white hover:border-neutral-500"
                      : "bg-white border-[#D6D1D1] text-[#5E5959] hover:text-black"
                  }`}
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Return to Welcome Screen</span>
                </button>

                {/* File New Dispute Trigger in Drawer */}
                <button
                  onClick={openIntakeView}
                  className="w-full py-2.5 px-3 rounded-xl bg-gradient-to-r from-emerald-500 via-emerald-400 to-teal-400 text-slate-950 font-black text-xs flex items-center justify-center gap-2 shadow-md shadow-emerald-950/40 hover:opacity-95 transition cursor-pointer"
                >
                  <Plus className="w-4 h-4 stroke-[2.5]" />
                  <span>File New Tenancy Dispute</span>
                </button>

                {/* Case Switcher in Drawer (if multiple cases) */}
                {cases.length > 1 && (
                  <div className={`p-2.5 rounded-xl border space-y-1.5 ${isDark ? "bg-[#1E1C1C] border-[#332F2F]" : "bg-[#F9F8F8] border-[#E0DDDD]"}`}>
                    <div className="text-[10px] font-bold uppercase tracking-wider opacity-60 flex items-center gap-1">
                      <Layers className="w-3 h-3 text-emerald-400" />
                      Registered Disputes ({cases.length})
                    </div>
                    <div className="space-y-1 max-h-32 overflow-y-auto">
                      {cases.map((c) => (
                        <button
                          key={c.id}
                          onClick={() => {
                            switchCase(c.id);
                            setIsSidebarOpen(false);
                          }}
                          className={`w-full text-left p-1.5 rounded-lg text-xs font-bold border transition flex items-center justify-between cursor-pointer ${
                            c.id === activeCaseId
                              ? "bg-emerald-500/20 text-emerald-400 border-emerald-500/40"
                              : isDark
                              ? "bg-[#161414] border-transparent text-[#A8A3A3] hover:text-white"
                              : "bg-white border-[#E0DDDD] text-[#5E5959] hover:text-black"
                          }`}
                        >
                          <span className="truncate">#{c.id} • {c.address.split(",")[0]}</span>
                          {c.id === activeCaseId && <Check className="w-3 h-3 text-emerald-400 shrink-0" />}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* PROGRESSIVE WORKFLOW NAVIGATION VIEWS */}
                <div className="space-y-1">
                  <div className="flex items-center justify-between text-[10px] font-bold uppercase tracking-wider opacity-70 mb-1">
                    <span className="flex items-center gap-1">
                      <Layers className="w-3 h-3 text-emerald-400" />
                      5-Step Dispute Workflow
                    </span>
                    <span className="text-emerald-400 font-extrabold">{effectiveMaxStep}/5 Unlocked</span>
                  </div>

                  {/* Drawer Demo Unlock Toggle */}
                  <button
                    onClick={() => {
                      const nextVal = !isDemoUnlocked;
                      setIsDemoUnlocked(nextVal);
                      if (nextVal) {
                        setToastMessage("⚡ Demo Mode: All 5 Steps Unlocked!");
                      } else {
                        setToastMessage("🔒 Progressive Gating Restored");
                      }
                      setTimeout(() => setToastMessage(null), 3000);
                    }}
                    className={`w-full text-left p-2 rounded-xl border text-xs font-bold transition flex items-center justify-between mb-2 cursor-pointer ${
                      isDemoUnlocked
                        ? "bg-amber-500/20 text-amber-300 border-amber-500/40"
                        : isDark
                        ? "bg-[#222020] border-[#383333] text-neutral-300 hover:text-white"
                        : "bg-[#F4F2F2] border-[#D6D1D1] text-neutral-700 hover:text-black"
                    }`}
                  >
                    <span className="flex items-center gap-1.5">
                      {isDemoUnlocked ? <Unlock className="w-3.5 h-3.5 text-amber-400" /> : <Lock className="w-3.5 h-3.5 text-neutral-400" />}
                      <span>{isDemoUnlocked ? "All Steps Unlocked (Demo)" : "⚡ Unlock All Steps (Demo)"}</span>
                    </span>
                    <span className="text-[10px] px-1.5 py-0.5 rounded font-black bg-amber-500/20 text-amber-400">
                      {isDemoUnlocked ? "Active" : "Pitch"}
                    </span>
                  </button>

                  {WORKFLOW_STEPS.map((stepItem) => {
                    const isLocked = stepItem.step > effectiveMaxStep;
                    const isActive = activeView === stepItem.id;
                    const isCompleted = stepItem.step < currentStepNumber;
                    const StepIcon =
                      stepItem.id === "dashboard"
                        ? FileText
                        : stepItem.id === "intake"
                        ? PlusCircle
                        : stepItem.id === "rules"
                        ? Scale
                        : stepItem.id === "negotiation"
                        ? Handshake
                        : Stamp;

                    return (
                      <button
                        key={stepItem.id}
                        onClick={() => {
                          navigateToView(stepItem.id);
                        }}
                        className={`w-full text-left p-2.5 rounded-xl border text-xs font-semibold transition ${
                          isLocked
                            ? "opacity-40 cursor-not-allowed bg-neutral-900/20 border-neutral-800 text-neutral-500"
                            : isActive
                            ? isDark
                              ? "bg-emerald-500/20 text-emerald-400 border-emerald-500/40 shadow-sm"
                              : "bg-emerald-50 text-emerald-800 border-emerald-300 shadow-sm"
                            : isDark
                            ? "hover:bg-[#252222] text-[#C8C4C4] border-transparent"
                            : "hover:bg-[#EAE7E7] text-[#4F4B4B] border-transparent cursor-pointer"
                        }`}
                      >
                        <div className="flex items-center justify-between font-bold">
                          <div className="flex items-center gap-2">
                            {isLocked ? (
                              <Lock className="w-3.5 h-3.5 text-neutral-500 shrink-0" />
                            ) : isCompleted ? (
                              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                            ) : (
                              <StepIcon className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                            )}
                            <span className="truncate">{stepItem.label}</span>
                          </div>
                          <span
                            className={`text-[9px] px-1.5 py-0.5 rounded font-black shrink-0 ${
                              isLocked
                                ? "bg-neutral-800 text-neutral-400"
                                : isActive
                                ? "bg-emerald-500 text-slate-950"
                                : isCompleted
                                ? "bg-emerald-500/20 text-emerald-400"
                                : isDark
                                ? "bg-[#252222] text-neutral-400"
                                : "bg-neutral-200 text-neutral-600"
                            }`}
                          >
                            {isLocked ? "Locked" : isCompleted ? "✓ Done" : isActive ? "Active" : "Ready"}
                          </span>
                        </div>
                        <div className="text-[10px] opacity-60 pl-5.5 mt-0.5 truncate">
                          {stepItem.description}
                        </div>
                      </button>
                    );
                  })}
                </div>

                {/* Demo Scenario Presets */}
                <div className={`pt-3 border-t space-y-2 ${isDark ? "border-[#363232]" : "border-[#E0DDDD]"}`}>
                  <div className="text-[10px] font-bold uppercase tracking-wider opacity-60 flex items-center gap-1">
                    <Sparkles className="w-3 h-3 text-emerald-400" />
                    Demo Presets
                  </div>
                  <button
                    onClick={() => {
                      handleReset();
                      setIsSidebarOpen(false);
                    }}
                    className={`w-full text-left p-2.5 rounded-xl border text-xs font-semibold transition ${
                      isDark ? "bg-[#201E1E] border-[#363232] hover:bg-[#282424]" : "bg-[#F9F8F8] border-[#D6D1D1] hover:bg-[#EAE7E7]"
                    }`}
                  >
                    <div className="font-bold text-rose-400 flex items-center justify-between">
                      <span>Predatory ₹82k Claim</span>
                      <span className="text-[10px] px-1.5 py-0.5 rounded bg-rose-500/20 text-rose-400 font-bold">Default</span>
                    </div>
                  </button>

                  <button
                    onClick={() => {
                      handleFastForward();
                      setIsSidebarOpen(false);
                    }}
                    className={`w-full text-left p-2.5 rounded-xl border text-xs font-semibold transition ${
                      isDark ? "bg-[#201E1E] border-[#363232] hover:bg-[#282424]" : "bg-[#F9F8F8] border-[#D6D1D1] hover:bg-[#EAE7E7]"
                    }`}
                  >
                    <div className="font-bold text-emerald-400 flex items-center justify-between">
                      <span>Converged ₹20k Accord</span>
                      <span className="text-[10px] px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-400 font-bold">Solved</span>
                    </div>
                  </button>
                </div>
              </div>

              {/* Drawer Footer Reset */}
              <div className={`pt-3 border-t ${isDark ? "border-[#363232]" : "border-[#E0DDDD]"}`}>
                <button
                  onClick={handleReset}
                  className={`w-full py-2 px-3 border font-bold rounded-xl text-xs flex items-center justify-center gap-2 transition ${
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
              <div className={`flex items-center justify-between p-3.5 border-b ${isDark ? "border-[#363232]" : "border-[#E0DDDD]"}`}>
                <div className="flex items-center gap-2">
                  <FileImage className="w-4 h-4 text-emerald-400" />
                  <span className="font-bold text-sm">{previewEvidence.name}</span>
                </div>
                <button
                  onClick={() => setPreviewEvidence(null)}
                  className="p-1 rounded-lg hover:bg-white/10 transition"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
              <div className="relative bg-black max-h-[50vh] flex items-center justify-center">
                <img
                  src={previewEvidence.imageUrl}
                  alt={previewEvidence.name}
                  className="w-full h-auto max-h-[50vh] object-contain"
                />
              </div>
              <div className={`p-3.5 space-y-2 text-xs ${isDark ? "bg-[#141313]" : "bg-[#F9F8F8]"}`}>
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
          MAIN CONTENT AREA (CONDITIONALLY RENDERS activeView)
      ═══════════════════════════════════════════════════════════ */}
      <main className="max-w-7xl mx-auto px-3 sm:px-6 py-6 space-y-6">
        <AnimatePresence mode="wait">
          {/* ─────────────────────────────────────────────────────────
              VIEW 1: CASE DASHBOARD (INTAKE & DEDUCTIONS BREAKDOWN)
          ───────────────────────────────────────────────────────── */}
          {activeView === "dashboard" && (
            <motion.div
              key="view-dashboard"
              {...scrollFadeVariant}
              className="space-y-6"
            >
              {/* Hero HUD */}
              <div
                className={`rounded-3xl p-5 sm:p-6 border shadow-xl relative overflow-hidden transition-colors ${
                  isDark
                    ? "bg-gradient-to-br from-[#1C1A1A] via-[#161414] to-[#1E1C1C] border-[#363232]"
                    : "bg-gradient-to-br from-white via-[#F9F8F8] to-[#ECE9E9] border-[#E0DDDD]"
                }`}
              >
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                  <div className="space-y-2">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="px-3 py-0.5 rounded-full text-xs font-black uppercase tracking-wider bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                        Dispute Intake Dossier
                      </span>
                      <span className="text-xs font-bold opacity-60">
                        Dispute Ref: #{activeCase.id}
                      </span>

                      {/* Case Switcher Dropdown */}
                      <div className={`flex items-center gap-1.5 px-2.5 py-1 rounded-xl border text-xs font-bold ${
                        isDark ? "bg-[#141212] border-[#332F2F]" : "bg-white border-[#D6D1D1] shadow-sm"
                      }`}>
                        <Layers className="w-3 h-3 text-emerald-400 shrink-0" />
                        <span className="text-[10px] uppercase opacity-60">Case:</span>
                        <select
                          value={activeCaseId}
                          onChange={(e) => switchCase(e.target.value)}
                          className="bg-transparent text-emerald-400 font-black cursor-pointer focus:outline-none text-xs"
                        >
                          {cases.map((c) => (
                            <option key={c.id} value={c.id} className={isDark ? "bg-[#1C1A1A] text-white" : "bg-white text-black"}>
                              #{c.id} • {c.address.split(",")[0]} ({c.tenant})
                            </option>
                          ))}
                        </select>
                      </div>

                      {/* File New Dispute Button */}
                      <button
                        onClick={openIntakeView}
                        className="px-2.5 py-1 rounded-xl text-xs font-black bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 hover:bg-emerald-500 hover:text-slate-950 transition flex items-center gap-1 shadow-sm cursor-pointer"
                      >
                        <Plus className="w-3.5 h-3.5 stroke-[2.5]" />
                        <span>+ File New Dispute</span>
                      </button>
                    </div>

                    <h2 className={`text-xl sm:text-2xl lg:text-3xl font-black tracking-tight ${isDark ? "text-white" : "text-[#1E1B1B]"}`}>
                      {activeCase.address.split(",")[0]}
                    </h2>
                    <p className="text-xs opacity-70 flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                      {activeCase.address}
                    </p>

                    {/* Collapsible Particulars Toggle */}
                    <button
                      onClick={() => setShowCaseParticulars(!showCaseParticulars)}
                      className="text-xs font-bold text-emerald-400 hover:underline flex items-center gap-1 pt-1 cursor-pointer"
                    >
                      <span>{showCaseParticulars ? "Hide Lease Particulars" : "View Lease Particulars & Parties"}</span>
                      {showCaseParticulars ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                    </button>
                  </div>

                  {/* High-Impact Stat Cards */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 shrink-0">
                    <div className={`p-3 rounded-2xl border min-w-[120px] ${isDark ? "bg-[#141313] border-[#332F2F]" : "bg-white border-[#E0DDDD] shadow-sm"}`}>
                      <div className="text-[10px] font-extrabold uppercase tracking-wider opacity-60 flex items-center gap-1">
                        <Shield className="w-3 h-3 text-emerald-400" />
                        Escrow Deposit
                      </div>
                      <div className="text-xl sm:text-2xl font-black mt-0.5 text-emerald-400">
                        ₹{totalDepositEscrow.toLocaleString("en-IN")}
                      </div>
                      <div className="text-[10px] opacity-60">Deposit Held</div>
                    </div>

                    <div className={`p-3 rounded-2xl border min-w-[120px] ${isDark ? "bg-[#141313] border-[#332F2F]" : "bg-white border-[#E0DDDD] shadow-sm"}`}>
                      <div className="text-[10px] font-extrabold uppercase tracking-wider opacity-60 flex items-center gap-1">
                        <TrendingDown className="w-3 h-3 text-rose-400" />
                        Landlord Claim
                      </div>
                      <div className="text-xl sm:text-2xl font-black mt-0.5 text-rose-400">
                        ₹{initialLandlordTotal.toLocaleString("en-IN")}
                      </div>
                      <div className="text-[10px] opacity-60">{claims.length} Deductions</div>
                    </div>

                    <div className={`p-3 rounded-2xl border min-w-[120px] ${isDark ? "bg-[#141313] border-[#332F2F]" : "bg-white border-[#E0DDDD] shadow-sm"}`}>
                      <div className="text-[10px] font-extrabold uppercase tracking-wider opacity-60 flex items-center gap-1">
                        <Scale className="w-3 h-3 text-emerald-400" />
                        Statutory Cap
                      </div>
                      <div className="text-xl sm:text-2xl font-black mt-0.5 text-emerald-400">
                        ₹{statutoryCap.toLocaleString("en-IN")}
                      </div>
                      <div className="text-[10px] text-emerald-400 font-bold">
                        ₹{(initialLandlordTotal - statutoryCap).toLocaleString("en-IN")} Disallowed
                      </div>
                    </div>

                    <div className={`p-3 rounded-2xl border min-w-[120px] ${isDark ? "bg-[#141313] border-[#332F2F]" : "bg-white border-[#E0DDDD] shadow-sm"}`}>
                      <div className="text-[10px] font-extrabold uppercase tracking-wider opacity-60 flex items-center gap-1">
                        <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                        Net Refund
                      </div>
                      <div className="text-xl sm:text-2xl font-black mt-0.5 text-emerald-400">
                        ₹{netRefund.toLocaleString("en-IN")}
                      </div>
                      <div className="text-[10px] opacity-60">Instant Disbursal</div>
                    </div>
                  </div>
                </div>

                {/* Collapsible Particulars Card */}
                <AnimatePresence>
                  {showCaseParticulars && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                      className={`mt-4 pt-4 border-t grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs ${
                        isDark ? "border-[#332F2F]" : "border-[#EAE7E7]"
                      }`}
                    >
                      <div className={`p-3 rounded-xl border ${isDark ? "bg-[#141313] border-[#332F2F]" : "bg-white border-[#E0DDDD]"}`}>
                        <span className="font-bold text-emerald-400 block mb-1">Tenant Profile</span>
                        <div><strong>{activeCase.tenant}</strong> ({activeCase.tenantContact})</div>
                        <div className="opacity-70 text-[11px]">Aadhaar Verified • Bangalore Resident</div>
                      </div>
                      <div className={`p-3 rounded-xl border ${isDark ? "bg-[#141313] border-[#332F2F]" : "bg-white border-[#E0DDDD]"}`}>
                        <span className="font-bold text-emerald-400 block mb-1">Landlord Profile</span>
                        <div><strong>{activeCase.landlord}</strong> ({activeCase.landlordContact})</div>
                        <div className="opacity-70 text-[11px]">PAN Verified • Property Owner</div>
                      </div>
                      <div className={`p-3 rounded-xl border ${isDark ? "bg-[#141313] border-[#332F2F]" : "bg-white border-[#E0DDDD]"}`}>
                        <span className="font-bold text-emerald-400 block mb-1">Tenancy Terms</span>
                        <div>Monthly Rent: <strong>₹{activeCase.monthlyRent.toLocaleString("en-IN")}</strong> • Security Deposit: <strong>₹{totalDepositEscrow.toLocaleString("en-IN")}</strong></div>
                        <div className="opacity-70 text-[11px]">Handover Completed 15 March 2026</div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Claims Section */}
              <div className="space-y-3">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div>
                    <h3 className={`text-xl sm:text-2xl font-black tracking-tight ${isDark ? "text-white" : "text-[#1E1B1B]"}`}>
                      {claims.length} Itemized Deductions & Evidence Locker
                    </h3>
                    <p className="text-xs opacity-70">
                      Single-line summary view • Click "Rationale" to inspect uploaded evidence & legal notes
                    </p>
                  </div>
                  <button
                    onClick={() => setActiveView("rules")}
                    className="px-3 py-1.5 rounded-xl text-xs font-black bg-emerald-500 text-slate-950 hover:bg-emerald-400 transition flex items-center gap-1.5 self-start sm:self-auto shadow-md"
                  >
                    <span>Run Legal Audit</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>

                <div className="space-y-2.5">
                  {claims.map((claim, index) => {
                    const isExpanded = !!expandedClaims[claim.id];

                    return (
                      <div
                        key={claim.id}
                        className={`border rounded-2xl p-3 sm:p-4 transition-all shadow-sm ${
                          claim.statuteApplied && claim.statutoryAllowed === 0
                            ? isDark
                              ? "bg-[#161B18] border-emerald-500/40"
                              : "bg-emerald-50/60 border-emerald-400"
                            : isDark
                            ? "bg-[#1C1A1A] border-[#363232] hover:border-[#4D4747]"
                            : "bg-white border-[#E0DDDD] hover:border-[#C8C4C4]"
                        }`}
                      >
                        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3">
                          <div className="flex items-center gap-3 flex-1 min-w-0">
                            <div
                              className={`w-7 h-7 rounded-xl font-black text-xs flex items-center justify-center shrink-0 border ${
                                isDark
                                  ? "bg-[#252222] border-[#3D3838] text-[#E0DDDD]"
                                  : "bg-[#EAE7E7] border-[#D6D1D1] text-[#1E1B1B]"
                              }`}
                            >
                              0{index + 1}
                            </div>

                            <div className="min-w-0 flex-1">
                              <div className="flex flex-wrap items-center gap-2">
                                <h4 className={`font-black text-base sm:text-lg truncate ${isDark ? "text-white" : "text-[#1E1B1B]"}`}>
                                  {claim.title}
                                </h4>
                                <span
                                  className={`text-[10px] px-2 py-0.5 rounded-full font-black uppercase border shrink-0 ${
                                    claim.statuteApplied
                                      ? claim.statutoryAllowed === 0
                                        ? "bg-rose-500/20 text-rose-400 border-rose-500/30"
                                        : "bg-emerald-500/20 text-emerald-400 border-emerald-500/30"
                                      : "bg-white/10 border-white/20 opacity-80"
                                  }`}
                                >
                                  {claim.legalBadge}
                                </span>
                              </div>
                            </div>
                          </div>

                          <div className="flex flex-wrap items-center gap-3 shrink-0">
                            <div className="text-right">
                              <span className="text-[10px] font-bold uppercase opacity-60 block">Claimed</span>
                              <span className={`text-base sm:text-lg font-black ${claim.statuteApplied && claim.statutoryAllowed < claim.landlordClaim ? "line-through text-rose-400/60" : "text-rose-400"}`}>
                                ₹{claim.landlordClaim.toLocaleString("en-IN")}
                              </span>
                            </div>

                            <ArrowLeftRight className="w-3.5 h-3.5 opacity-30 shrink-0" />

                            <div className="text-right">
                              <span className="text-[10px] font-bold uppercase text-emerald-400 block">Allowed Cap</span>
                              <span className="text-base sm:text-lg font-black text-emerald-400">
                                ₹{claim.statutoryAllowed.toLocaleString("en-IN")}
                              </span>
                            </div>

                            <button
                              onClick={() => toggleClaimDispute(claim.id)}
                              className={`px-2.5 py-1 rounded-xl text-xs font-black border transition-all ${
                                claim.isDisputedByTenant
                                  ? "bg-rose-500/15 hover:bg-rose-500/25 text-rose-400 border-rose-500/30"
                                  : "bg-emerald-500/15 hover:bg-emerald-500/25 text-emerald-400 border-emerald-500/30"
                              }`}
                            >
                              {claim.isDisputedByTenant ? "Contested" : "Accepted"}
                            </button>

                            <button
                              onClick={() => toggleClaimAccordion(claim.id)}
                              className={`p-1.5 rounded-xl border text-xs font-bold transition flex items-center gap-1 ${
                                isDark ? "bg-[#252222] border-[#3D3838] hover:bg-[#302C2C]" : "bg-[#EAE7E7] border-[#D6D1D1] hover:bg-[#E0DDDD]"
                              }`}
                              title="View statutory rationale and evidence breakdown"
                            >
                              <span className="hidden sm:inline">{isExpanded ? "Collapse" : "Rationale"}</span>
                              {isExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                            </button>
                          </div>
                        </div>

                        {/* Collapsible Content */}
                        <AnimatePresence>
                          {isExpanded && (
                            <motion.div
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: "auto" }}
                              exit={{ opacity: 0, height: 0 }}
                              transition={{ duration: 0.25 }}
                              className={`mt-3 pt-3 border-t space-y-3 ${isDark ? "border-[#332F2F]" : "border-[#EAE7E7]"}`}
                            >
                              <div
                                className={`p-2.5 rounded-xl text-xs flex items-start gap-2 border ${
                                  isDark
                                    ? "bg-emerald-950/30 border-emerald-800/40 text-emerald-300"
                                    : "bg-emerald-50 border-emerald-200 text-emerald-900"
                                }`}
                              >
                                <Scale className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                                <div>
                                  <span className="font-bold text-emerald-400">Statutory Precedent: </span>
                                  {claim.legalNote}
                                </div>
                              </div>

                              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                                <div className={`p-2.5 rounded-xl border ${isDark ? "bg-[#141313] border-[#332F2F]" : "bg-[#F9F8F8] border-[#E0DDDD]"}`}>
                                  <div className="font-bold mb-0.5 opacity-70 flex items-center gap-1">
                                    <Building2 className="w-3.5 h-3.5" /> Landlord: {claim.landlordRationale}
                                  </div>
                                </div>
                                <div className={`p-2.5 rounded-xl border ${isDark ? "bg-[#141313] border-[#332F2F]" : "bg-[#F9F8F8] border-[#E0DDDD]"}`}>
                                  <div className="font-bold text-emerald-400 mb-0.5 flex items-center gap-1">
                                    <User className="w-3.5 h-3.5 text-emerald-400" /> Tenant: {claim.tenantRebuttal}
                                  </div>
                                </div>
                              </div>

                              <div className="flex flex-wrap gap-2 pt-1">
                                {claim.evidences.map((ev) => (
                                  <button
                                    key={ev.id}
                                    onClick={() => setPreviewEvidence(ev)}
                                    className={`flex items-center gap-2 p-1.5 pr-3 rounded-xl border text-xs text-left transition hover:ring-2 hover:ring-emerald-400/50 ${
                                      isDark ? "bg-[#141313] border-[#332F2F]" : "bg-white border-[#E0DDDD] shadow-sm"
                                    }`}
                                  >
                                    <img
                                      src={ev.imageUrl}
                                      alt={ev.name}
                                      className="w-9 h-9 rounded-lg object-cover border border-white/10"
                                    />
                                    <div>
                                      <div className="font-bold text-[11px]">{ev.name}</div>
                                      <div className="text-[10px] text-emerald-400 font-semibold flex items-center gap-1">
                                        <Camera className="w-3 h-3" /> View Evidence ({ev.size})
                                      </div>
                                    </div>
                                  </button>
                                ))}
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    );
                  })}
                </div>

                {/* Step 1 Completion / Progression Action Banner */}
                <div
                  className={`mt-4 p-4 rounded-2xl border flex flex-col sm:flex-row items-center justify-between gap-3 shadow-md ${
                    isDark ? "bg-[#1E1C1C] border-[#383333]" : "bg-emerald-50/50 border-emerald-200"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-black text-base shrink-0 border border-emerald-500/30">
                      1
                    </div>
                    <div>
                      <div className="text-xs font-black text-emerald-400 uppercase tracking-wider">
                        Step 1 Complete • Next Action
                      </div>
                      <div className="font-extrabold text-sm">
                        Dispute dossier & claims reviewed. Ready to issue formal Form 1-A Notice.
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={unlockAndNavigateToStep2}
                    className="w-full sm:w-auto px-5 py-2.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black rounded-xl text-xs flex items-center justify-center gap-2 transition shadow-lg shadow-emerald-500/20 cursor-pointer shrink-0"
                  >
                    <span>Proceed to Step 2: Form 1-A Notice</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </motion.div>
          )}

          {/* ─────────────────────────────────────────────────────────
              VIEW 2: KARNATAKA LEGAL RULES (SEC 12 AUDIT ENGINE)
          ───────────────────────────────────────────────────────── */}
          {activeView === "rules" && (
            <motion.div
              key="view-rules"
              {...scrollFadeVariant}
              className="space-y-6"
            >
              {/* Statutory Audit Engine Card */}
              <div
                className={`border rounded-3xl p-5 sm:p-6 space-y-4 transition-colors shadow-xl ${
                  isDark ? "bg-[#1C1A1A] border-[#363232]" : "bg-white border-[#E0DDDD]"
                }`}
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b pb-3 border-white/10">
                  <div>
                    <div className="text-xs font-black uppercase tracking-wider text-emerald-400 flex items-center gap-1.5">
                      <Scale className="w-4 h-4" /> Karnataka Tenancy Statutory Rule Engine
                    </div>
                    <h3 className={`text-xl sm:text-2xl font-black tracking-tight ${isDark ? "text-white" : "text-[#1E1B1B]"}`}>
                      Section 12 Wear-and-Tear & Statutory Reduction Engine
                    </h3>
                  </div>

                  <button
                    onClick={handleTriggerAudit}
                    disabled={auditState === "running"}
                    className={`px-4 py-2.5 rounded-xl text-xs font-black flex items-center gap-2 shadow-md transition-all ${
                      auditState === "completed"
                        ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/40"
                        : auditState === "running"
                        ? "bg-emerald-500/40 text-slate-950 cursor-wait"
                        : "bg-emerald-500 hover:bg-emerald-400 text-slate-950 animate-pulse shadow-emerald-900/40"
                    }`}
                  >
                    {auditState === "running" ? (
                      <>
                        <Loader2 className="w-3.5 h-3.5 animate-spin" />
                        Verifying Statutes...
                      </>
                    ) : auditState === "completed" ? (
                      <>
                        <BadgeCheck className="w-4 h-4 text-emerald-400" />
                        Audit Applied (Capped at ₹{statutoryCap.toLocaleString("en-IN")})
                      </>
                    ) : (
                      <>
                        <Play className="w-3.5 h-3.5" />
                        Execute Statutory Compliance Check
                      </>
                    )}
                  </button>
                </div>

                {auditState === "running" && (
                  <div className="space-y-1">
                    <div className="flex justify-between text-xs font-bold text-emerald-400">
                      <span>Applying Section 12 wear & tear & 10% depreciation caps...</span>
                      <span>{auditProgress}%</span>
                    </div>
                    <div className="w-full h-2 rounded-full bg-white/10 overflow-hidden">
                      <motion.div
                        className="h-full bg-gradient-to-r from-emerald-500 to-emerald-300"
                        style={{ width: `${auditProgress}%` }}
                      />
                    </div>
                  </div>
                )}

                {/* Slashes Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2 text-xs">
                  {claims.map((claim, idx) => {
                    const isSlashed = auditState === "completed" && claim.statutoryAllowed < claim.landlordClaim;
                    return (
                      <div
                        key={claim.id}
                        className={`p-3 rounded-xl border ${
                          isDark ? "bg-[#141313] border-[#332F2F]" : "bg-[#F9F8F8] border-[#E0DDDD]"
                        }`}
                      >
                        <span className="opacity-60 text-[10px] uppercase font-bold block truncate">
                          {idx + 1}. {claim.title.replace(" Dispute", "")}
                        </span>
                        <div className="flex items-baseline gap-1 mt-0.5 flex-wrap">
                          <span
                            className={`font-bold ${
                              isSlashed ? "line-through text-rose-400/60" : "text-rose-400"
                            }`}
                          >
                            ₹{claim.landlordClaim.toLocaleString("en-IN")}
                          </span>
                          {auditState === "completed" && (
                            <span className="font-black text-emerald-400">
                              → ₹{claim.statutoryAllowed.toLocaleString("en-IN")}
                            </span>
                          )}
                        </div>
                        <span className="text-[9px] text-emerald-400 font-bold block mt-1 truncate">
                          {claim.legalBadge}
                        </span>
                      </div>
                    );
                  })}

                  <div
                    className={`p-3 rounded-xl border ${
                      auditState === "completed"
                        ? "bg-emerald-500/10 border-emerald-500/40"
                        : isDark
                        ? "bg-[#141313] border-[#332F2F]"
                        : "bg-[#F9F8F8] border-[#E0DDDD]"
                    }`}
                  >
                    <span className="text-emerald-400 text-[10px] uppercase font-black block">Total Allowed</span>
                    <div className="text-lg font-black mt-0.5 text-emerald-400">
                      ₹{auditState === "completed" ? statutoryCap.toLocaleString("en-IN") : initialLandlordTotal.toLocaleString("en-IN")}
                    </div>
                    <span className="text-[9px] text-emerald-400 font-bold block mt-1">
                      {auditState === "completed"
                        ? `₹${totalSlashed.toLocaleString("en-IN")} Slashed`
                        : "Pre-Audit"}
                    </span>
                  </div>
                </div>
              </div>

              {/* Comprehensive Statutory Citations & Legal Matrix */}
              <div className={`p-5 rounded-3xl border space-y-4 ${isDark ? "bg-[#1C1A1A] border-[#363232]" : "bg-white border-[#E0DDDD]"}`}>
                <div className="flex items-center justify-between border-b pb-3 border-white/10">
                  <div className="flex items-center gap-2">
                    <Scale className="w-5 h-5 text-emerald-400" />
                    <h4 className="text-base sm:text-lg font-black">
                      Karnataka Tenancy Legal Grounding & Benchmark Citations
                    </h4>
                  </div>
                  <span className="text-xs font-bold text-emerald-400 bg-emerald-500/15 px-2.5 py-0.5 rounded-full border border-emerald-500/30">
                    Judge Benchmark Reference
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div className={`p-3.5 rounded-2xl border ${isDark ? "bg-[#141313] border-[#332F2F]" : "bg-[#F9F8F8] border-[#E0DDDD]"}`}>
                    <div className="font-black text-sm text-emerald-400 mb-1 flex items-center gap-1.5">
                      <Award className="w-4 h-4" /> 1. Sec 12 & 13, Karnataka Rent Act, 1999
                    </div>
                    <div className="text-[10px] font-bold text-rose-400 uppercase mb-1">Wear-and-Tear Painting Zero-Out</div>
                    <p className="opacity-80 leading-relaxed text-[11px]">
                      Landlord is statutorily mandated to maintain tenantable repair. Natural wall scuffing, sun exposure fading, and micro-cracks after 12+ months occupancy cannot be deducted. Painting deduction is strictly ₹0.
                    </p>
                  </div>

                  <div className={`p-3.5 rounded-2xl border ${isDark ? "bg-[#141313] border-[#332F2F]" : "bg-[#F9F8F8] border-[#E0DDDD]"}`}>
                    <div className="font-black text-sm text-emerald-400 mb-1 flex items-center gap-1.5">
                      <TrendingDown className="w-4 h-4" /> 2. 10% Fixture Straight-Line Depreciation
                    </div>
                    <div className="text-[10px] font-bold text-rose-400 uppercase mb-1">Appliance Replacement Cap</div>
                    <p className="opacity-80 leading-relaxed text-[11px]">
                      Under judicial asset depreciation schedules, residential electrical appliances depreciate at 10% per annum. The 4-year-old Bajaj geyser retains 60% value (₹12,000), disallowing ₹8,000 of the ₹20,000 claim.
                    </p>
                  </div>

                  <div className={`p-3.5 rounded-2xl border ${isDark ? "bg-[#141313] border-[#332F2F]" : "bg-[#F9F8F8] border-[#E0DDDD]"}`}>
                    <div className="font-black text-sm text-emerald-400 mb-1 flex items-center gap-1.5">
                      <CheckCircle2 className="w-4 h-4" /> 3. ₹4,500 Bengaluru Deep Clean Ceiling
                    </div>
                    <div className="text-[10px] font-bold text-rose-400 uppercase mb-1">Market Benchmark Ceiling</div>
                    <p className="opacity-80 leading-relaxed text-[11px]">
                      Standard residential turnover for professional deep cleaning in Bengaluru is capped at ₹4,500 for a 3BHK flat. Unitemized third-party vendor claims of ₹12,000 are scaled down to prevailing market rates.
                    </p>
                  </div>

                  <div className={`p-3.5 rounded-2xl border ${isDark ? "bg-[#141313] border-[#332F2F]" : "bg-[#F9F8F8] border-[#E0DDDD]"}`}>
                    <div className="font-black text-sm text-emerald-400 mb-1 flex items-center gap-1.5">
                      <ShieldAlert className="w-4 h-4" /> 4. Model Tenancy Act (MTA) Deposit Cap
                    </div>
                    <div className="text-[10px] font-bold text-rose-400 uppercase mb-1">2-Month Security Deposit Ceiling</div>
                    <p className="opacity-80 leading-relaxed text-[11px]">
                      Under Chapter IV of the Model Tenancy Act, residential security deposits are capped at 2 months rent (₹40,000). The ₹2,00,000 deposit represents 10 months rent, holding ₹1,60,000 in excess.
                    </p>
                  </div>
                </div>

                {/* Next Step Button */}
                <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
                  <button
                    onClick={() => navigateToView("intake")}
                    className={`px-3 py-1.5 rounded-xl border text-xs font-bold transition flex items-center gap-1.5 cursor-pointer ${
                      isDark ? "border-[#3A3535] text-[#A8A3A3] hover:text-white" : "border-[#D6D1D1] text-[#5E5959] hover:text-black"
                    }`}
                  >
                    <ArrowLeft className="w-3.5 h-3.5" />
                    <span>Back to Step 2: Form 1-A Notice</span>
                  </button>

                  <button
                    onClick={handleAcceptAuditAndProceedToNegotiation}
                    className="px-5 py-2.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black rounded-xl text-xs flex items-center gap-2 transition shadow-md shadow-emerald-500/20 cursor-pointer"
                  >
                    <span>Accept Statutory Audit & Proceed to Algorithmic Negotiation (Step 4)</span>
                    <ArrowRight className="w-3.5 h-3.5 stroke-[2.5]" />
                  </button>
                </div>
              </div>
            </motion.div>
          )}

          {/* ─────────────────────────────────────────────────────────
              VIEW 3: 3-ROUND NEGOTIATION ROOM
          ───────────────────────────────────────────────────────── */}
          {activeView === "negotiation" && (
            <motion.div
              key="view-negotiation"
              {...scrollFadeVariant}
              className="space-y-6"
            >
              <div
                className={`border rounded-3xl p-5 sm:p-6 space-y-4 transition-colors shadow-xl ${
                  isDark ? "bg-[#1C1A1A] border-[#363232]" : "bg-white border-[#E0DDDD]"
                }`}
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b pb-3 border-white/10">
                  <div>
                    <div className="text-xs font-black uppercase tracking-wider text-emerald-400 flex items-center gap-1.5">
                      <Handshake className="w-4 h-4" /> Section 3: Interactive Negotiation War Room
                    </div>
                    <h3 className={`text-xl sm:text-2xl font-black tracking-tight ${isDark ? "text-white" : "text-[#1E1B1B]"}`}>
                      Offer & Counter-Offer Convergence Bar
                    </h3>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-black px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                      Round {negRound} of 3
                    </span>
                  </div>
                </div>

                {/* Visual Settlement Gap Bar */}
                <div className="space-y-1.5">
                  <div className="flex justify-between text-xs font-black">
                    <span className="text-emerald-400">Tenant Offer: ₹{tenantOffer.toLocaleString("en-IN")}</span>
                    <span className="text-amber-400 text-sm">
                      Active Gap: ₹{currentGap.toLocaleString("en-IN")} ({gapPercentage}%)
                    </span>
                    <span className="text-rose-400">Landlord Demand: ₹{landlordOffer.toLocaleString("en-IN")}</span>
                  </div>

                  <div className="w-full h-4 rounded-full overflow-hidden flex bg-white/10 border border-white/10">
                    <motion.div
                      className="h-full bg-emerald-400"
                      animate={{ width: `${Math.min(100, (tenantOffer / initialLandlordTotal) * 100)}%` }}
                      transition={{ duration: 0.35 }}
                    />
                    <motion.div
                      className="h-full bg-amber-400/80"
                      animate={{ width: `${Math.max(0, (currentGap / initialLandlordTotal) * 100)}%` }}
                      transition={{ duration: 0.35 }}
                    />
                    <motion.div
                      className="h-full bg-rose-500/80"
                      animate={{ width: `${Math.max(0, (1 - landlordOffer / initialLandlordTotal) * 100)}%` }}
                      transition={{ duration: 0.35 }}
                    />
                  </div>
                </div>

                {/* Counteroffer Slider & Quick Chips */}
                <div className={`p-4 rounded-2xl border space-y-3 ${isDark ? "bg-[#141313] border-[#332F2F]" : "bg-[#F9F8F8] border-[#E0DDDD]"}`}>
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-black uppercase tracking-wider">Proposed Counteroffer:</span>
                    <span className="text-2xl font-black text-emerald-400">
                      ₹{counterSlider.toLocaleString("en-IN")}
                    </span>
                  </div>

                  <input
                    type="range"
                    min={0}
                    max={initialLandlordTotal || 80000}
                    step={500}
                    value={counterSlider}
                    onChange={(e) => setCounterSlider(Number(e.target.value))}
                    className="w-full h-2.5 rounded-full appearance-none cursor-pointer accent-emerald-400 bg-white/20"
                  />

                  {/* Quick Action Chips & Submit */}
                  <div className="flex flex-wrap items-center justify-between gap-2 pt-1">
                    <div className="flex flex-wrap gap-1.5">
                      <button
                        onClick={() => setCounterSlider(statutoryCap)}
                        className={`px-3 py-1 rounded-xl border text-xs font-black transition ${
                          counterSlider === statutoryCap
                            ? "bg-emerald-500 text-slate-950 border-emerald-500"
                            : isDark
                            ? "bg-[#222020] border-[#3A3535] text-emerald-400"
                            : "bg-white border-[#D6D1D1] text-emerald-700"
                        }`}
                      >
                        Match Legal Cap (₹{statutoryCap.toLocaleString("en-IN")})
                      </button>

                      {(() => {
                        const splitAmt = Math.round(((statutoryCap + landlordOffer) / 2) / 500) * 500;
                        return (
                          <button
                            onClick={() => setCounterSlider(splitAmt)}
                            className={`px-3 py-1 rounded-xl border text-xs font-black transition ${
                              counterSlider === splitAmt
                                ? "bg-emerald-500 text-slate-950 border-emerald-500"
                                : isDark
                                ? "bg-[#222020] border-[#3A3535] text-[#E0DDDD]"
                                : "bg-white border-[#D6D1D1] text-[#1E1B1B]"
                            }`}
                          >
                            Propose Split (₹{splitAmt.toLocaleString("en-IN")})
                          </button>
                        );
                      })()}

                      <button
                        onClick={() => setCounterSlider(landlordOffer)}
                        className={`px-3 py-1 rounded-xl border text-xs font-black transition ${
                          counterSlider === landlordOffer
                            ? "bg-emerald-500 text-slate-950 border-emerald-500"
                            : isDark
                            ? "bg-[#222020] border-[#3A3535] text-[#E0DDDD]"
                            : "bg-white border-[#D6D1D1] text-[#1E1B1B]"
                        }`}
                      >
                        Accept Offer (₹{landlordOffer.toLocaleString("en-IN")})
                      </button>
                    </div>

                    <button
                      onClick={() => handleMakeOffer(counterSlider)}
                      className="px-4 py-2 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black rounded-xl text-xs flex items-center gap-1.5 transition shadow-md shadow-emerald-950/50"
                    >
                      <Handshake className="w-4 h-4" />
                      Submit Round {negRound} Offer
                    </button>
                  </div>
                </div>

                {/* Convergence Alert & Step 5 Trigger */}
                {(isSettled || negRound >= 3 || gapPercentage <= 5) ? (
                  <div className="p-4 rounded-2xl bg-emerald-500/15 border border-emerald-500/40 text-emerald-300 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-lg">
                    <div className="flex items-center gap-2.5">
                      <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                      <div className="text-xs">
                        <strong className="text-emerald-400 text-sm block">
                          {isSettled
                            ? `Mutual Accord Reached at ₹${activeDeduction.toLocaleString("en-IN")}!`
                            : `Consensus Threshold Met (${gapPercentage}% Gap • Round ${negRound})!`}
                        </strong>
                        Step 5 Unlocked: Statutory e-Stamp Settlement Deed under Section 89 CPC is ready for execution.
                      </div>
                    </div>
                    <button
                      onClick={handleProceedToSettlementDeed}
                      className="px-4 py-2.5 bg-emerald-400 hover:bg-emerald-300 text-slate-950 font-black rounded-xl text-xs transition shrink-0 flex items-center justify-center gap-1.5 shadow-md cursor-pointer"
                    >
                      <span>Generate Final Deed (Step 5)</span>
                      <ArrowRight className="w-3.5 h-3.5 stroke-[2.5]" />
                    </button>
                  </div>
                ) : (
                  <div className="flex items-center justify-between pt-2">
                    <button
                      onClick={() => navigateToView("rules")}
                      className={`px-3 py-1.5 rounded-xl border text-xs font-bold transition flex items-center gap-1.5 cursor-pointer ${
                        isDark ? "border-[#3A3535] text-[#A8A3A3] hover:text-white" : "border-[#D6D1D1] text-[#5E5959] hover:text-black"
                      }`}
                    >
                      <ArrowLeft className="w-3.5 h-3.5" />
                      <span>Back to Step 3: Sec 12 Audit</span>
                    </button>
                    <span className="text-[11px] opacity-60 font-medium">
                      Submit Round {negRound} offer or accept landlord demand to unlock Step 5.
                    </span>
                  </div>
                )}
              </div>
            </motion.div>
          )}

          {/* ─────────────────────────────────────────────────────────
              VIEW 4: FINAL SETTLEMENT DEED (e-Stamp Certificate)
          ───────────────────────────────────────────────────────── */}
          {activeView === "settlement" && (
            <motion.div
              key="view-settlement"
              {...scrollFadeVariant}
              className="space-y-4"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div>
                  <div className="text-xs font-black uppercase tracking-wider text-emerald-400 flex items-center gap-1.5">
                    <Stamp className="w-4 h-4" /> Section 4: Final Accord & Execution
                  </div>
                  <h3 className={`text-xl sm:text-2xl font-black tracking-tight ${isDark ? "text-white" : "text-[#1E1B1B]"}`}>
                    Karnataka e-Stamp Certificate & Settlement Deed
                  </h3>
                </div>
                {!isSettled && (
                  <span className="text-xs px-3 py-1 rounded-full bg-amber-500/20 text-amber-400 border border-amber-500/30 flex items-center gap-1.5">
                    <Lock className="w-3.5 h-3.5" /> Unlocks on consensus
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
                {/* Header Band */}
                <div
                  className={`p-4 sm:p-5 border-b-2 text-center ${
                    isDark
                      ? "bg-[#0E1A14] border-emerald-500/40 text-[#E0DDDD]"
                      : "bg-emerald-50 border-emerald-300 text-[#1A2E22]"
                  }`}
                >
                  <div className="text-[10px] font-black uppercase tracking-[0.2em] text-emerald-500 mb-0.5">
                    Government of Karnataka • Department of Stamps & Registration
                  </div>
                  <h2 className="text-lg sm:text-xl font-black tracking-wide">
                    DEED OF MUTUAL SETTLEMENT & FINAL ACCORD
                  </h2>
                  <div className="flex flex-wrap items-center justify-center gap-3 text-[10px] font-mono opacity-60 mt-1">
                    <span>Cert: IN-KA892401BLR2026</span>
                    <span>•</span>
                    <span>Sec 89 CPC, 1908</span>
                    <span>•</span>
                    <span>Stamp Duty: ₹500 (e-Challan #44891)</span>
                  </div>
                </div>

                {/* Deed Content */}
                <div className="p-5 sm:p-6 space-y-4 text-xs leading-relaxed">
                  {/* Parties */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className={`p-3 rounded-xl border ${isDark ? "bg-[#141313] border-[#332F2F]" : "bg-[#F9F8F8] border-[#E0DDDD]"}`}>
                      <div className="text-[10px] font-black uppercase text-emerald-400 mb-0.5">First Party (Tenant)</div>
                      <div className="font-extrabold text-sm">{activeCase.tenant} (+91 98801 23456)</div>
                      <div className="opacity-70 text-[11px]">{activeCase.address}</div>
                    </div>

                    <div className={`p-3 rounded-xl border ${isDark ? "bg-[#141313] border-[#332F2F]" : "bg-[#F9F8F8] border-[#E0DDDD]"}`}>
                      <div className="text-[10px] font-black uppercase opacity-60 mb-0.5">Second Party (Landlord)</div>
                      <div className="font-extrabold text-sm">{activeCase.landlord} (+91 94480 87654)</div>
                      <div className="opacity-70 text-[11px]">Owner / Lessor of {activeCase.address.split(",")[0]}</div>
                    </div>
                  </div>

                  {/* Financial Ledger */}
                  <div className={`rounded-xl border overflow-hidden ${isDark ? "border-[#332F2F]" : "border-[#E0DDDD]"}`}>
                    <div className={`grid grid-cols-3 p-2.5 text-[10px] font-black uppercase opacity-70 ${isDark ? "bg-[#1E1C1C]" : "bg-[#ECE9E9]"}`}>
                      <span>Head of Account</span>
                      <span className="text-center">Claim vs Permitted</span>
                      <span className="text-right">Final Accord</span>
                    </div>
                    <div className="divide-y divide-white/10 text-xs">
                      <div className="grid grid-cols-3 p-2.5">
                        <span>Total Security Deposit</span>
                        <span className="text-center opacity-70">Escrow Paid</span>
                        <span className="text-right font-bold">₹{totalDepositEscrow.toLocaleString("en-IN")}</span>
                      </div>
                      <div className="grid grid-cols-3 p-2.5">
                        <span>Agreed Deductions</span>
                        <span className="text-center text-rose-400">Reduced from ₹{initialLandlordTotal.toLocaleString("en-IN")}</span>
                        <span className="text-right font-bold text-rose-400">(-) ₹{activeDeduction.toLocaleString("en-IN")}</span>
                      </div>
                      <div className={`grid grid-cols-3 p-2.5 font-extrabold ${isDark ? "bg-emerald-950/20 text-emerald-400" : "bg-emerald-50 text-emerald-800"}`}>
                        <span className="text-sm font-black">Net Refund to {activeCase.tenant.split(" ")[0]}</span>
                        <span className="text-center text-[10px] opacity-80">Instant Escrow Release</span>
                        <span className="text-right text-lg font-black">₹{netRefund.toLocaleString("en-IN")}</span>
                      </div>
                    </div>
                  </div>

                  {/* Supabase Cryptographic Audit Callout */}
                  <div className={`p-3 rounded-xl border text-xs flex flex-col sm:flex-row sm:items-center justify-between gap-2 ${
                    isDark ? "bg-[#141313] border-[#332F2F]" : "bg-[#F9F8F8] border-[#E0DDDD]"
                  }`}>
                    <div className="flex items-center gap-2">
                      <Shield className="w-4 h-4 text-emerald-400 shrink-0" />
                      <div>
                        <span className="font-bold text-emerald-400">Supabase Cryptographic Tamper-Proof Audit Trail</span>
                        <div className="text-[10px] opacity-70">
                          Row-level security audit hash #sb-{activeCase.id.toLowerCase()}-sha256. Executed under Section 89 CPC as a binding decree.
                        </div>
                      </div>
                    </div>
                    <span className="text-[9px] font-mono px-2 py-0.5 rounded bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 shrink-0">
                      COMMITTED
                    </span>
                  </div>

                  {/* Digital Signature Pads */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                    <div
                      onClick={() => {
                        if (!tenantSigned) {
                          setTenantSigned(true);
                          setTenantSignTime(new Date().toLocaleString("en-IN"));
                          confetti({ particleCount: 40, spread: 40 });
                        }
                      }}
                      className={`p-3.5 rounded-xl border-2 border-dashed cursor-pointer transition ${
                        tenantSigned
                          ? "bg-emerald-500/10 border-emerald-500/60"
                          : isDark
                          ? "bg-[#141313] border-[#3D3838] hover:border-emerald-400/50"
                          : "bg-[#F9F8F8] border-[#D6D1D1] hover:border-emerald-500"
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-black">{activeCase.tenant} (Tenant)</span>
                        {tenantSigned ? (
                          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                        ) : (
                          <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 font-bold">
                            Click to Sign
                          </span>
                        )}
                      </div>
                      {tenantSigned ? (
                        <div className="mt-1 font-mono text-[10px] text-emerald-400">
                          ✓ Digitally Signed: {tenantSignTime}
                        </div>
                      ) : (
                        <p className="text-[10px] opacity-60 mt-1">
                          Clicking signs declaration affirming full deposit settlement.
                        </p>
                      )}
                    </div>

                    <div
                      onClick={() => {
                        if (!landlordSigned) {
                          setLandlordSigned(true);
                          setLandlordSignTime(new Date().toLocaleString("en-IN"));
                          confetti({ particleCount: 40, spread: 40 });
                        }
                      }}
                      className={`p-3.5 rounded-xl border-2 border-dashed cursor-pointer transition ${
                        landlordSigned
                          ? "bg-emerald-500/10 border-emerald-500/60"
                          : isDark
                          ? "bg-[#141313] border-[#3D3838] hover:border-emerald-400/50"
                          : "bg-[#F9F8F8] border-[#D6D1D1] hover:border-emerald-500"
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-black">{activeCase.landlord} (Landlord)</span>
                        {landlordSigned ? (
                          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                        ) : (
                          <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 font-bold">
                            Click to Sign
                          </span>
                        )}
                      </div>
                      {landlordSigned ? (
                        <div className="mt-1 font-mono text-[10px] text-emerald-400">
                          ✓ Digitally Signed: {landlordSignTime}
                        </div>
                      ) : (
                        <p className="text-[10px] opacity-60 mt-1">
                          Clicking authorizes escrow release of ₹{netRefund.toLocaleString("en-IN")} back to tenant.
                        </p>
                      )}
                    </div>
                  </div>
                </div>

                {/* Deed Action Footer */}
                <div
                  className={`p-4 border-t flex flex-wrap items-center justify-between gap-2 ${
                    isDark ? "bg-[#141313] border-white/10" : "bg-[#F9F8F8] border-[#E0DDDD]"
                  }`}
                >
                  <div className="text-xs font-bold">
                    Execution:{" "}
                    <strong className={tenantSigned && landlordSigned ? "text-emerald-400" : "text-amber-400"}>
                      {tenantSigned && landlordSigned ? "Both Parties Executed" : "Awaiting Signatures"}
                    </strong>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => window.print()}
                      className={`px-3 py-1.5 rounded-xl text-xs font-bold border transition flex items-center gap-1.5 ${
                        isDark
                          ? "bg-[#222020] border-[#3A3535] text-[#E0DDDD] hover:bg-[#2D2A2A]"
                          : "bg-white border-[#D6D1D1] text-[#1E1B1B] hover:bg-[#ECE9E9] shadow-sm"
                      }`}
                    >
                      <Printer className="w-3.5 h-3.5" />
                      Print Deed
                    </button>

                    <button
                      onClick={() => {
                        confetti({ particleCount: 160, spread: 100, origin: { y: 0.5 } });
                        window.print();
                      }}
                      className="px-4 py-1.5 rounded-xl text-xs font-black bg-emerald-500 hover:bg-emerald-400 text-slate-950 transition flex items-center gap-1.5 shadow-md"
                    >
                      <Download className="w-3.5 h-3.5" />
                      Download Executed PDF
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* ─────────────────────────────────────────────────────────
              VIEW 5: FULL-SCREEN INTAKE & LEGAL FILING (FORM 1-A)
          ───────────────────────────────────────────────────────── */}
          {activeView === "intake" && (
            <motion.div
              key="view-intake"
              {...scrollFadeVariant}
              className="space-y-6"
            >
              {/* Header Card */}
              <div
                className={`rounded-3xl p-5 sm:p-7 border shadow-xl relative overflow-hidden transition-colors ${
                  isDark
                    ? "bg-gradient-to-br from-[#1C1A1A] via-[#161414] to-[#1E1C1C] border-[#363232]"
                    : "bg-gradient-to-br from-white via-[#F9F8F8] to-[#ECE9E9] border-[#E0DDDD]"
                }`}
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b pb-4 border-white/10">
                  <div className="space-y-1.5">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => {
                          navigateToView("dashboard");
                        }}
                        className={`px-3 py-1.5 rounded-xl border text-xs font-black transition flex items-center gap-1.5 cursor-pointer ${
                          isDark
                            ? "bg-[#222020] border-[#3A3535] text-[#E0DDDD] hover:bg-[#2D2A2A] hover:text-white"
                            : "bg-white border-[#D6D1D1] text-[#1E1B1B] hover:bg-[#ECE9E9] shadow-sm"
                        }`}
                      >
                        <ArrowLeft className="w-3.5 h-3.5" />
                        <span>← Back to Step 1: Case Overview</span>
                      </button>
                      <span className="px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                        Karnataka Statutory Intake
                      </span>
                    </div>

                    <h2 className={`text-2xl sm:text-3xl font-black tracking-tight ${isDark ? "text-white" : "text-[#1E1B1B]"}`}>
                      Form 1-A: Notice of Security Deposit Dispute
                    </h2>
                    <p className="text-xs sm:text-sm opacity-70 leading-relaxed max-w-3xl">
                      Prescribed filing under Karnataka Rent Control Framework & ODR Mediation Protocols
                    </p>
                  </div>

                  {/* Seed Demo Button */}
                  <div className="shrink-0 flex items-center gap-2">
                    <button
                      type="button"
                      onClick={handleSeedDemoCase}
                      className="px-3.5 py-2 rounded-xl text-xs font-black bg-gradient-to-r from-amber-400/20 to-emerald-400/20 text-amber-400 hover:text-amber-300 border border-amber-400/30 hover:border-amber-400/60 transition flex items-center gap-1.5 shadow-sm cursor-pointer"
                      title="Pre-fill realistic Bangalore tenant dispute data with one click"
                    >
                      <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                      <span>⚡ Seed Demo Case</span>
                    </button>
                  </div>
                </div>

                {/* Progress Stepper (Step 1 → Step 2 → Step 3) */}
                <div className="pt-4 grid grid-cols-1 md:grid-cols-3 gap-2 sm:gap-3">
                  {[
                    {
                      step: 1 as const,
                      num: "01",
                      title: "Parties & Tenancy",
                      subtitle: "Locality, lease term & contacts",
                    },
                    {
                      step: 2 as const,
                      num: "02",
                      title: "Deposit & Claimed Deductions",
                      subtitle: "Painting, cleaning, fixtures & bills",
                    },
                    {
                      step: 3 as const,
                      num: "03",
                      title: "Statutory Declaration",
                      subtitle: "Sec 12 legal wear & tear audit",
                    },
                  ].map((s) => {
                    const isCurrent = intakeStep === s.step;
                    const isDone = intakeStep > s.step;
                    return (
                      <button
                        key={s.step}
                        type="button"
                        onClick={() => setIntakeStep(s.step)}
                        className={`text-left p-3 rounded-2xl border transition-all cursor-pointer flex items-center gap-3 ${
                          isCurrent
                            ? isDark
                              ? "bg-emerald-500/15 border-emerald-500/60 shadow-md"
                              : "bg-emerald-50 border-emerald-400 shadow-md"
                            : isDone
                            ? isDark
                              ? "bg-[#141212] border-emerald-500/30 opacity-90"
                              : "bg-white border-emerald-300 opacity-90"
                            : isDark
                            ? "bg-[#141212] border-[#2E2A2A] opacity-60 hover:opacity-80"
                            : "bg-white border-[#E0DDDD] opacity-60 hover:opacity-80"
                        }`}
                      >
                        <div
                          className={`w-8 h-8 rounded-xl font-black text-xs flex items-center justify-center shrink-0 ${
                            isCurrent
                              ? "bg-emerald-500 text-slate-950 font-black shadow-sm"
                              : isDone
                              ? "bg-emerald-500/30 text-emerald-400 font-black"
                              : "bg-white/10 text-white/70"
                          }`}
                        >
                          {isDone ? <Check className="w-4 h-4 stroke-[3]" /> : s.num}
                        </div>
                        <div className="overflow-hidden">
                          <div className="text-xs font-black truncate flex items-center gap-1.5">
                            <span className={isCurrent ? "text-emerald-400" : ""}>Step {s.step}: {s.title}</span>
                          </div>
                          <div className="text-[10px] opacity-60 truncate">{s.subtitle}</div>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Form Body Form Container */}
              <form onSubmit={handleCreateDisputeCase} className="space-y-6">
                {/* SECTION A: Tenancy & Locality Details */}
                <div
                  className={`rounded-3xl p-5 sm:p-6 border shadow-lg space-y-4 transition-colors ${
                    isDark ? "bg-[#1A1818] border-[#363232]" : "bg-white border-[#E0DDDD]"
                  }`}
                >
                  <div className="flex items-center justify-between border-b pb-3 border-white/10">
                    <div className="flex items-center gap-2">
                      <span className="w-7 h-7 rounded-lg bg-emerald-500/20 text-emerald-400 font-black text-xs flex items-center justify-center border border-emerald-500/30">
                        A
                      </span>
                      <div>
                        <div className="text-[10px] font-black uppercase text-emerald-400 tracking-wider">
                          Section A • Jurisdiction & Tenancy
                        </div>
                        <h3 className={`text-lg font-black tracking-tight ${isDark ? "text-white" : "text-[#1E1B1B]"}`}>
                          Tenancy & Locality Details
                        </h3>
                      </div>
                    </div>
                    <span className="text-[11px] font-bold opacity-60 hidden sm:inline">
                      Jurisdiction: Bengaluru Urban District
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                    {/* Tenant Name */}
                    <div className="space-y-1.5">
                      <label className="font-bold opacity-80 flex items-center gap-1">
                        <User className="w-3.5 h-3.5 text-emerald-400" />
                        Tenant Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={formTenantName}
                        onChange={(e) => setFormTenantName(e.target.value)}
                        placeholder="e.g., Ananya Iyer"
                        className={`w-full p-2.5 rounded-xl border font-bold text-xs focus:ring-2 focus:ring-emerald-400 focus:outline-none transition ${
                          isDark ? "bg-[#121111] border-[#363232] text-white" : "bg-[#F9F8F8] border-[#D6D1D1] text-black"
                        }`}
                      />
                    </div>

                    {/* Tenant Phone */}
                    <div className="space-y-1.5">
                      <label className="font-bold opacity-80 flex items-center gap-1">
                        <span>📱</span>
                        Tenant Contact Phone *
                      </label>
                      <input
                        type="tel"
                        required
                        value={formTenantContact}
                        onChange={(e) => setFormTenantContact(e.target.value)}
                        placeholder="e.g., +91 98860 12456"
                        className={`w-full p-2.5 rounded-xl border font-bold text-xs focus:ring-2 focus:ring-emerald-400 focus:outline-none transition ${
                          isDark ? "bg-[#121111] border-[#363232] text-white" : "bg-[#F9F8F8] border-[#D6D1D1] text-black"
                        }`}
                      />
                    </div>

                    {/* Landlord Name */}
                    <div className="space-y-1.5">
                      <label className="font-bold opacity-80 flex items-center gap-1">
                        <Building2 className="w-3.5 h-3.5 text-emerald-400" />
                        Landlord / Lessor Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={formLandlordName}
                        onChange={(e) => setFormLandlordName(e.target.value)}
                        placeholder="e.g., K. V. Subhash"
                        className={`w-full p-2.5 rounded-xl border font-bold text-xs focus:ring-2 focus:ring-emerald-400 focus:outline-none transition ${
                          isDark ? "bg-[#121111] border-[#363232] text-white" : "bg-[#F9F8F8] border-[#D6D1D1] text-black"
                        }`}
                      />
                    </div>

                    {/* Landlord Notice Address / Contact */}
                    <div className="space-y-1.5">
                      <label className="font-bold opacity-80 flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5 text-emerald-400" />
                        Landlord Notice Address & Phone *
                      </label>
                      <input
                        type="text"
                        required
                        value={formLandlordAddress}
                        onChange={(e) => setFormLandlordAddress(e.target.value)}
                        placeholder="e.g., Flat 804, Tower 12, Sobha Dream Acres / +91 94481 65432"
                        className={`w-full p-2.5 rounded-xl border font-bold text-xs focus:ring-2 focus:ring-emerald-400 focus:outline-none transition ${
                          isDark ? "bg-[#121111] border-[#363232] text-white" : "bg-[#F9F8F8] border-[#D6D1D1] text-black"
                        }`}
                      />
                    </div>

                    {/* Property Locality Preset Dropdown */}
                    <div className="sm:col-span-2 space-y-1.5">
                      <label className="font-bold opacity-80 flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5 text-emerald-400" />
                        Property Locality (Bengaluru Housing Hubs) *
                      </label>
                      <select
                        value={formAddressPreset}
                        onChange={(e) => setFormAddressPreset(e.target.value)}
                        className={`w-full p-2.5 rounded-xl border font-bold text-xs focus:ring-2 focus:ring-emerald-400 focus:outline-none transition ${
                          isDark ? "bg-[#121111] border-[#363232] text-white" : "bg-[#F9F8F8] border-[#D6D1D1] text-black"
                        }`}
                      >
                        {BANGALORE_ADDRESS_PRESETS.map((preset) => (
                          <option key={preset} value={preset} className={isDark ? "bg-[#1C1A1A] text-white" : "bg-white text-black"}>
                            {preset}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Custom Address entry if selected */}
                    {formAddressPreset === "Custom Address..." && (
                      <div className="sm:col-span-2 space-y-1.5">
                        <label className="font-bold text-emerald-400">Custom Property Address & Flat Details *</label>
                        <input
                          type="text"
                          required
                          value={formCustomAddress}
                          onChange={(e) => setFormCustomAddress(e.target.value)}
                          placeholder="e.g., Flat 204, Brigade Gateway, Malleshwaram, Bengaluru - 560055"
                          className={`w-full p-2.5 rounded-xl border font-bold text-xs focus:ring-2 focus:ring-emerald-400 focus:outline-none transition ${
                            isDark ? "bg-[#121111] border-[#363232] text-white" : "bg-[#F9F8F8] border-[#D6D1D1] text-black"
                          }`}
                        />
                      </div>
                    )}

                    {/* Tenancy Tenure: Start Date & Vacating Date */}
                    <div className="space-y-1.5">
                      <label className="font-bold opacity-80">Tenancy Agreement Start Date *</label>
                      <input
                        type="date"
                        required
                        value={formStartDate}
                        onChange={(e) => setFormStartDate(e.target.value)}
                        className={`w-full p-2.5 rounded-xl border font-bold text-xs focus:ring-2 focus:ring-emerald-400 focus:outline-none transition ${
                          isDark ? "bg-[#121111] border-[#363232] text-white" : "bg-[#F9F8F8] border-[#D6D1D1] text-black"
                        }`}
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="font-bold opacity-80">Agreed Vacating / Key Handover Date *</label>
                      <input
                        type="date"
                        required
                        value={formVacatingDate}
                        onChange={(e) => setFormVacatingDate(e.target.value)}
                        className={`w-full p-2.5 rounded-xl border font-bold text-xs focus:ring-2 focus:ring-emerald-400 focus:outline-none transition ${
                          isDark ? "bg-[#121111] border-[#363232] text-white" : "bg-[#F9F8F8] border-[#D6D1D1] text-black"
                        }`}
                      />
                    </div>

                    {/* Total Security Deposit Paid & Monthly Rent */}
                    <div className="space-y-1.5">
                      <label className="font-bold text-emerald-400 flex items-center justify-between">
                        <span>Total Security Deposit Paid (₹) *</span>
                        <span className="text-[10px] font-mono opacity-70">Escrow Baseline</span>
                      </label>
                      <input
                        type="number"
                        required
                        min={1000}
                        value={formDepositAmount}
                        onChange={(e) => setFormDepositAmount(Number(e.target.value))}
                        className={`w-full p-2.5 rounded-xl border font-black text-sm text-emerald-400 focus:ring-2 focus:ring-emerald-400 focus:outline-none transition ${
                          isDark ? "bg-[#121111] border-[#363232]" : "bg-[#F9F8F8] border-[#D6D1D1]"
                        }`}
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="font-bold opacity-80 flex items-center justify-between">
                        <span>Monthly Rent (₹) *</span>
                        <span className="text-[10px] font-mono opacity-70">Sec 12 MTA Ratio</span>
                      </label>
                      <input
                        type="number"
                        required
                        min={1000}
                        value={formMonthlyRent}
                        onChange={(e) => setFormMonthlyRent(Number(e.target.value))}
                        className={`w-full p-2.5 rounded-xl border font-bold text-xs focus:ring-2 focus:ring-emerald-400 focus:outline-none transition ${
                          isDark ? "bg-[#121111] border-[#363232] text-white" : "bg-[#F9F8F8] border-[#D6D1D1] text-black"
                        }`}
                      />
                    </div>
                  </div>
                </div>

                {/* SECTION B: Deductions Disputed (Itemized Legal Claims) */}
                <div
                  className={`rounded-3xl p-5 sm:p-6 border shadow-lg space-y-4 transition-colors ${
                    isDark ? "bg-[#1A1818] border-[#363232]" : "bg-white border-[#E0DDDD]"
                  }`}
                >
                  <div className="flex items-center justify-between border-b pb-3 border-white/10">
                    <div className="flex items-center gap-2">
                      <span className="w-7 h-7 rounded-lg bg-emerald-500/20 text-emerald-400 font-black text-xs flex items-center justify-center border border-emerald-500/30">
                        B
                      </span>
                      <div>
                        <div className="text-[10px] font-black uppercase text-emerald-400 tracking-wider">
                          Section B • Disputed Deductions Itemization
                        </div>
                        <h3 className={`text-lg font-black tracking-tight ${isDark ? "text-white" : "text-[#1E1B1B]"}`}>
                          Itemized Legal Claims Under Karnataka Rent Control
                        </h3>
                      </div>
                    </div>
                    <span className="text-[11px] font-mono text-emerald-400 font-bold bg-emerald-500/10 px-2.5 py-1 rounded-full border border-emerald-500/20">
                      Algorithmic Audit Engine Active
                    </span>
                  </div>

                  <p className="text-xs opacity-70 leading-relaxed">
                    Enter the deduction heads claimed by the lessor. Settlr’s statutory engine automatically benchmarks each claim against the Karnataka Rent Control Section 12 wear-and-tear exemption, 10% depreciation cap, and ₹4,500 deep-cleaning ceiling.
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
                    {/* 1. Painting Claim */}
                    <div className={`p-3.5 rounded-2xl border space-y-2 ${isDark ? "bg-[#121111] border-[#332F2F]" : "bg-[#F9F8F8] border-[#E0DDDD]"}`}>
                      <div className="flex items-center justify-between">
                        <span className="font-extrabold text-[11px] uppercase">1. Painting & Wall Restoration</span>
                        <span className="text-[9px] px-1.5 py-0.5 rounded font-black bg-rose-500/20 text-rose-400">Sec 12</span>
                      </div>
                      <input
                        type="number"
                        min={0}
                        value={formPaintingClaimed}
                        onChange={(e) => setFormPaintingClaimed(Number(e.target.value))}
                        className={`w-full p-2 rounded-xl border font-black text-sm text-rose-400 focus:outline-none ${
                          isDark ? "bg-[#1A1818] border-[#363232]" : "bg-white border-[#D6D1D1]"
                        }`}
                      />
                      <div className="text-[10px] text-emerald-400 font-bold flex items-center gap-1">
                        <CheckCircle2 className="w-3 h-3" /> Sec 12 Cap: ₹0 (Zero-Out)
                      </div>
                    </div>

                    {/* 2. Deep Cleaning Claim */}
                    <div className={`p-3.5 rounded-2xl border space-y-2 ${isDark ? "bg-[#121111] border-[#332F2F]" : "bg-[#F9F8F8] border-[#E0DDDD]"}`}>
                      <div className="flex items-center justify-between">
                        <span className="font-extrabold text-[11px] uppercase">2. Deep Cleaning & Sanitization</span>
                        <span className="text-[9px] px-1.5 py-0.5 rounded font-black bg-emerald-500/20 text-emerald-400">Ceiling</span>
                      </div>
                      <input
                        type="number"
                        min={0}
                        value={formCleaningClaimed}
                        onChange={(e) => setFormCleaningClaimed(Number(e.target.value))}
                        className={`w-full p-2 rounded-xl border font-black text-sm text-rose-400 focus:outline-none ${
                          isDark ? "bg-[#1A1818] border-[#363232]" : "bg-white border-[#D6D1D1]"
                        }`}
                      />
                      <div className="text-[10px] text-emerald-400 font-bold flex items-center gap-1">
                        <CheckCircle2 className="w-3 h-3" /> Bengaluru Cap: ₹4,500
                      </div>
                    </div>

                    {/* 3. Fixture Damage Claim */}
                    <div className={`p-3.5 rounded-2xl border space-y-2 ${isDark ? "bg-[#121111] border-[#332F2F]" : "bg-[#F9F8F8] border-[#E0DDDD]"}`}>
                      <div className="flex items-center justify-between">
                        <span className="font-extrabold text-[11px] uppercase">3. Fixture / Appliance Damage</span>
                        <span className="text-[9px] px-1.5 py-0.5 rounded font-black bg-amber-500/20 text-amber-400">-10% Depr</span>
                      </div>
                      <input
                        type="number"
                        min={0}
                        value={formFixtureClaimed}
                        onChange={(e) => setFormFixtureClaimed(Number(e.target.value))}
                        className={`w-full p-2 rounded-xl border font-black text-sm text-rose-400 focus:outline-none ${
                          isDark ? "bg-[#1A1818] border-[#363232]" : "bg-white border-[#D6D1D1]"
                        }`}
                      />
                      <div className="text-[10px] text-emerald-400 font-bold flex items-center gap-1">
                        <CheckCircle2 className="w-3 h-3" /> Depreciated: ₹{Math.round(formFixtureClaimed * 0.9).toLocaleString("en-IN")}
                      </div>
                    </div>

                    {/* 4. Utility Claim */}
                    <div className={`p-3.5 rounded-2xl border space-y-2 ${isDark ? "bg-[#121111] border-[#332F2F]" : "bg-[#F9F8F8] border-[#E0DDDD]"}`}>
                      <div className="flex items-center justify-between">
                        <span className="font-extrabold text-[11px] uppercase">4. Unpaid Utility / BESCOM Dues</span>
                        <span className="text-[9px] px-1.5 py-0.5 rounded font-black bg-emerald-500/20 text-emerald-400">Actuals</span>
                      </div>
                      <input
                        type="number"
                        min={0}
                        value={formUtilityClaimed}
                        onChange={(e) => setFormUtilityClaimed(Number(e.target.value))}
                        className={`w-full p-2 rounded-xl border font-black text-sm text-rose-400 focus:outline-none ${
                          isDark ? "bg-[#1A1818] border-[#363232]" : "bg-white border-[#D6D1D1]"
                        }`}
                      />
                      <div className="text-[10px] text-emerald-400 font-bold flex items-center gap-1">
                        <CheckCircle2 className="w-3 h-3" /> Approved: ₹{Number(formUtilityClaimed).toLocaleString("en-IN")}
                      </div>
                    </div>
                  </div>

                  {/* Live Statutory Calculation HUD */}
                  {(() => {
                    const paintClaim = Number(formPaintingClaimed) || 0;
                    const cleanClaim = Number(formCleaningClaimed) || 0;
                    const fixClaim = Number(formFixtureClaimed) || 0;
                    const utilClaim = Number(formUtilityClaimed) || 0;

                    const paintAllow = 0;
                    const cleanAllow = Math.min(cleanClaim, 4500);
                    const fixAllow = Math.round(fixClaim * 0.9);
                    const utilAllow = utilClaim;

                    const totClaim = paintClaim + cleanClaim + fixClaim + utilClaim;
                    const totAllow = paintAllow + cleanAllow + fixAllow + utilAllow;
                    const slashed = Math.max(0, totClaim - totAllow);
                    const depAmt = Number(formDepositAmount) || 0;
                    const netRef = Math.max(0, depAmt - totAllow);

                    return (
                      <div className={`p-4 rounded-2xl border ${
                        isDark ? "bg-[#131F18] border-emerald-500/30" : "bg-emerald-50 border-emerald-300"
                      }`}>
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                          <div>
                            <span className="text-[10px] font-black uppercase text-emerald-400 tracking-wider flex items-center gap-1">
                              <Scale className="w-3.5 h-3.5" /> Live Statutory Impact Projection
                            </span>
                            <div className="font-extrabold text-sm sm:text-base mt-0.5">
                              Landlord Claims ₹{totClaim.toLocaleString("en-IN")} → Permitted ₹{totAllow.toLocaleString("en-IN")}
                            </div>
                          </div>

                          <div className="flex items-center gap-3">
                            <div className="text-right">
                              <div className="text-[10px] opacity-70 uppercase font-bold">Unlawful Slashed</div>
                              <div className="text-sm font-black text-rose-400">
                                (-) ₹{slashed.toLocaleString("en-IN")}
                              </div>
                            </div>

                            <div className="h-8 w-px bg-white/10" />

                            <div className="text-right">
                              <div className="text-[10px] text-emerald-400 uppercase font-bold">Projected Net Refund</div>
                              <div className="text-base sm:text-lg font-black text-emerald-400">
                                ₹{netRef.toLocaleString("en-IN")}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })()}
                </div>

                {/* SECTION C: Legal Declarations & Statutory Checklist */}
                <div
                  className={`rounded-3xl p-5 sm:p-6 border shadow-lg space-y-4 transition-colors ${
                    isDark ? "bg-[#1A1818] border-[#363232]" : "bg-white border-[#E0DDDD]"
                  }`}
                >
                  <div className="flex items-center justify-between border-b pb-3 border-white/10">
                    <div className="flex items-center gap-2">
                      <span className="w-7 h-7 rounded-lg bg-emerald-500/20 text-emerald-400 font-black text-xs flex items-center justify-center border border-emerald-500/30">
                        C
                      </span>
                      <div>
                        <div className="text-[10px] font-black uppercase text-emerald-400 tracking-wider">
                          Section C • Statutory Checklist & Consent
                        </div>
                        <h3 className={`text-lg font-black tracking-tight ${isDark ? "text-white" : "text-[#1E1B1B]"}`}>
                          Legal Declarations & ODR Mediation Agreement
                        </h3>
                      </div>
                    </div>
                    <span className="text-[11px] font-bold opacity-60 hidden sm:inline">
                      Sec 89 CPC Compliant
                    </span>
                  </div>

                  <div className="space-y-3 text-xs">
                    <label className={`p-3.5 rounded-2xl border flex items-start gap-3 cursor-pointer transition ${
                      declHandoverKeys
                        ? isDark ? "bg-emerald-500/10 border-emerald-500/50" : "bg-emerald-50 border-emerald-300"
                        : isDark ? "bg-[#141212] border-[#332F2F]" : "bg-[#F9F8F8] border-[#E0DDDD]"
                    }`}>
                      <input
                        type="checkbox"
                        checked={declHandoverKeys}
                        onChange={(e) => setDeclHandoverKeys(e.target.checked)}
                        className="mt-0.5 w-4 h-4 rounded text-emerald-500 focus:ring-emerald-400 accent-emerald-500 cursor-pointer"
                      />
                      <div>
                        <strong className="block font-black text-sm mb-0.5">Physical Vacating & Key Handover Confirmation</strong>
                        <span className="opacity-75 leading-relaxed text-[11px]">
                          I confirm the property was handed over with keys on the agreed vacating date ({formVacatingDate}) with move-out inspection photographic record.
                        </span>
                      </div>
                    </label>

                    <label className={`p-3.5 rounded-2xl border flex items-start gap-3 cursor-pointer transition ${
                      declSec12WearAndTear
                        ? isDark ? "bg-emerald-500/10 border-emerald-500/50" : "bg-emerald-50 border-emerald-300"
                        : isDark ? "bg-[#141212] border-[#332F2F]" : "bg-[#F9F8F8] border-[#E0DDDD]"
                    }`}>
                      <input
                        type="checkbox"
                        required
                        checked={declSec12WearAndTear}
                        onChange={(e) => setDeclSec12WearAndTear(e.target.checked)}
                        className="mt-0.5 w-4 h-4 rounded text-emerald-500 focus:ring-emerald-400 accent-emerald-500 cursor-pointer"
                      />
                      <div>
                        <strong className="block font-black text-sm mb-0.5 text-emerald-400">Invocation of Karnataka Rent Control Act Section 12</strong>
                        <span className="opacity-75 leading-relaxed text-[11px]">
                          I invoke Karnataka Rent Control Act Section 12 for normal wear-and-tear assessment, zero-out of customary painting clauses, and 10% statutory straight-line fixture depreciation.
                        </span>
                      </div>
                    </label>

                    <label className={`p-3.5 rounded-2xl border flex items-start gap-3 cursor-pointer transition ${
                      declAlgorithmicODR
                        ? isDark ? "bg-emerald-500/10 border-emerald-500/50" : "bg-emerald-50 border-emerald-300"
                        : isDark ? "bg-[#141212] border-[#332F2F]" : "bg-[#F9F8F8] border-[#E0DDDD]"
                    }`}>
                      <input
                        type="checkbox"
                        required
                        checked={declAlgorithmicODR}
                        onChange={(e) => setDeclAlgorithmicODR(e.target.checked)}
                        className="mt-0.5 w-4 h-4 rounded text-emerald-500 focus:ring-emerald-400 accent-emerald-500 cursor-pointer"
                      />
                      <div>
                        <strong className="block font-black text-sm mb-0.5">3-Round Algorithmic Conciliation Accord Consent</strong>
                        <span className="opacity-75 leading-relaxed text-[11px]">
                          I consent to binding 3-round algorithmic mediation prior to Lok Adalat / Rent Court escalation, culminating in an enforceable e-Stamp Deed of Settlement under Sec 89 CPC.
                        </span>
                      </div>
                    </label>
                  </div>
                </div>

                {/* Form Action & Submit Bar */}
                <div
                  className={`p-5 rounded-3xl border shadow-xl flex flex-col sm:flex-row sm:items-center justify-between gap-4 transition-colors ${
                    isDark ? "bg-[#1C1A1A] border-[#363232]" : "bg-white border-[#E0DDDD]"
                  }`}
                >
                  <div className="space-y-1">
                    <div className="text-xs font-black text-emerald-400 flex items-center gap-1.5">
                      <Shield className="w-4 h-4" /> Ready for Statutory ODR Verification
                    </div>
                    <div className="text-[11px] opacity-70">
                      Dispute intake will immediately apply Karnataka Sec 12 deductions and advance to Step 3 Statutory Audit.
                    </div>
                  </div>

                  <div className="flex items-center gap-2.5 shrink-0">
                    <button
                      type="button"
                      onClick={() => {
                        navigateToView("dashboard");
                      }}
                      className={`px-4 py-2.5 rounded-xl border text-xs font-bold transition cursor-pointer ${
                        isDark ? "border-[#3A3535] text-[#A8A3A3] hover:text-white" : "border-[#D6D1D1] text-[#5E5959] hover:text-black"
                      }`}
                    >
                      ← Back to Step 1
                    </button>

                    <button
                      type="submit"
                      className="px-6 py-3 rounded-2xl bg-gradient-to-r from-emerald-500 via-emerald-400 to-teal-400 hover:from-emerald-400 hover:to-teal-300 text-slate-950 font-black text-xs sm:text-sm transition-all shadow-xl shadow-emerald-500/25 flex items-center gap-2 cursor-pointer hover:scale-[1.02]"
                    >
                      <Play className="w-4 h-4 fill-current stroke-none" />
                      <span>Submit Form 1-A & Proceed to Sec 12 Audit (Step 3)</span>
                      <ArrowRight className="w-4 h-4 stroke-[2.5]" />
                    </button>
                  </div>
                </div>
              </form>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
      </div>

      {/* ═══════════════════════════════════════════════════════════
          FOOTER
      ═══════════════════════════════════════════════════════════ */}
      <footer
        className={`border-t py-6 mt-12 text-center text-xs transition-colors ${
          isDark ? "border-[#2D2929] text-[#7A7575]" : "border-[#E0DDDD] text-[#7A7575]"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 space-y-1">
          <div className="flex items-center justify-center gap-2 font-bold text-[#E0DDDD]">
            <Scale className="w-3.5 h-3.5 text-emerald-400" /> Settlr ODR • Karnataka Tenancy Conciliation Portal
          </div>
          <p className="opacity-70 text-[11px]">
            Compliant with Karnataka Rent Control Act, 1999 • Model Tenancy Act (MTA) • Code of Civil Procedure, 1908 (Sec 89)
          </p>
        </div>
      </footer>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}



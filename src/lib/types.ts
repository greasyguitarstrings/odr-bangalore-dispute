export type Role = 'tenant' | 'landlord' | 'mediator';

export type ClaimCategory = 'painting' | 'cleaning' | 'damage' | 'wear_and_tear' | 'utilities' | 'fixture_damage' | 'unpaid_rent' | 'other';

export interface EvidenceItem {
  id: string;
  itemId: string;
  title: string;
  evidenceType: 'move_in_photo' | 'move_out_photo' | 'receipt' | 'chat_log' | 'bill' | 'meter_reading';
  imageUrl?: string;
  description: string;
  timestamp: string;
}

export interface DisputeLineItem {
  id: string;
  title: string;
  category: ClaimCategory;
  claimedAmount: number;
  tenantCounterAmount: number;
  agreedAmount?: number;
  status: 'disputed' | 'agreed';
  landlordNotes: string;
  tenantNotes: string;
  statutoryRecommended: number;
  statutorySaving: number;
  isStatutorilyReduced: boolean;
  rationale: string;
  evidences: EvidenceItem[];
}

export interface NegotiationRound {
  round: number;
  landlordOffer: number;
  tenantOffer: number;
  gap: number;
  gapPercent: number;
  timestamp: string;
}

export interface DisputeCase {
  caseId: string;
  propertyAddress: string;
  tenantName: string;
  tenantPhone: string;
  tenantEmail: string;
  landlordName: string;
  landlordPhone: string;
  landlordEmail: string;
  monthlyRent: number;
  securityDepositPaid: number;
  tenancyStartDate: string;
  tenancyVacateDate: string;
  tenancyDurationMonths: number;
  items: DisputeLineItem[];
  settlementDeadline: string;
}

export interface StatutoryDepositAudit {
  monthlyRent: number;
  depositPaid: number;
  statutoryCapMonths: number;
  statutoryCapAmount: number;
  monthsCollected: number;
  excessDepositHeld: number;
  isExcessive: boolean;
  legalNote: string;
}

export interface DelayedInterestAudit {
  vacateDate: string;
  daysSinceVacate: number;
  gracePeriodDays: number;
  defaultDays: number;
  isDelayed: boolean;
  annualRatePercent: number;
  accruedInterest: number;
  totalDueWithInterest: number;
  legalBasis: string;
}

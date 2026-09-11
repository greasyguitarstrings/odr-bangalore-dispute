import { DisputeCase } from './types';
import { evaluateLineItem } from './statutory-engine';

/**
 * Scenario 1: Predatory ₹82k Claim (Default High-Dispute Case)
 * Case: #BLR-2026-8941 @ Prestige Shantiniketan, Whitefield
 * Tenant: Rohan Sharma | Landlord: K. Raghavendra Rao
 * 36 months tenancy, ₹20,000/mo rent, ₹2,00,000 deposit
 */
export function getPredatory82kCase(): DisputeCase {
  const rawItems = [
    {
      id: 'item-1',
      title: 'Full Flat Repainting & Wall Restoration',
      category: 'painting' as const,
      claimedAmount: 35000,
      tenantCounterAmount: 0,
      status: 'disputed' as const,
      landlordNotes: 'Agreement clause mandates full repainting on move-out. Entire flat needs Asian Paints Royale Emulsion recoat.',
      tenantNotes: 'Resided 36 months (3 years). Normal wear & tear under Karnataka Rent Act Sec 12. All walls in fair condition with only minor nail holes from picture frames.',
      evidences: [
        {
          id: 'ev-1-a',
          itemId: 'item-1',
          title: 'Move-In Living Room Wall (March 2023)',
          evidenceType: 'move_in_photo' as const,
          imageUrl: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=600&q=80',
          description: 'Living room freshly painted, standard emulsion coat.',
          timestamp: '2023-03-15'
        },
        {
          id: 'ev-1-b',
          itemId: 'item-1',
          title: 'Move-Out Living Room Wall (March 2026)',
          evidenceType: 'move_out_photo' as const,
          imageUrl: 'https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?auto=format&fit=crop&w=600&q=80',
          description: 'Natural surface aging after 36 months. Minor fading near windows, no structural damage.',
          timestamp: '2026-03-15'
        }
      ]
    },
    {
      id: 'item-2',
      title: 'Fixture Damage — Bajaj Geyser (15L)',
      category: 'fixture_damage' as const,
      claimedAmount: 20000,
      tenantCounterAmount: 12000,
      status: 'disputed' as const,
      landlordNotes: 'Bathroom geyser (Bajaj 15L) has developed rust on heating element and outer casing shows dents. Full replacement cost charged.',
      tenantNotes: 'Geyser was already 4 years old at move-in (installed 2019). 10% annual depreciation over 3 years of my tenancy = 30% depreciation. Willing to pay depreciated replacement share of ₹12,000.',
      evidences: [
        {
          id: 'ev-2-a',
          itemId: 'item-2',
          title: 'Geyser Installation Date Sticker',
          evidenceType: 'receipt' as const,
          imageUrl: 'https://images.unsplash.com/photo-1585704032915-c3400ca199e7?auto=format&fit=crop&w=600&q=80',
          description: 'Installation sticker showing 2019 installation. Manufacturer warranty already expired.',
          timestamp: '2026-03-15'
        }
      ]
    },
    {
      id: 'item-3',
      title: 'Professional Deep Cleaning (Full Flat)',
      category: 'cleaning' as const,
      claimedAmount: 12000,
      tenantCounterAmount: 4000,
      status: 'disputed' as const,
      landlordNotes: 'Kitchen chimney baffle filters clogged with grease. Bathroom tile limescale and soap buildup. Full deep clean with chemical treatment needed.',
      tenantNotes: 'Flat was broom-swept and mopped before handover. ₹12,000 is 3x the standard Urban Company deep-clean rate for a 3BHK. Standard market rate is ₹4,000–4,500.',
      evidences: [
        {
          id: 'ev-3-a',
          itemId: 'item-3',
          title: 'Tenant Handover Cleaning Photo',
          evidenceType: 'move_out_photo' as const,
          imageUrl: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=600&q=80',
          description: 'Clean kitchen countertops and wiped surfaces at handover.',
          timestamp: '2026-03-15'
        }
      ]
    },
    {
      id: 'item-4',
      title: 'BESCOM Electricity Arrears (Final Bill)',
      category: 'utilities' as const,
      claimedAmount: 3500,
      tenantCounterAmount: 3500,
      status: 'disputed' as const,
      landlordNotes: 'Final BESCOM bill for Feb-March 2026 consumption. Meter reading verified by BESCOM field officer.',
      tenantNotes: 'Agreed. Final bill amount matches BESCOM portal reading. Will pay at face value.',
      evidences: [
        {
          id: 'ev-4-a',
          itemId: 'item-4',
          title: 'BESCOM Final Meter Reading',
          evidenceType: 'meter_reading' as const,
          imageUrl: 'https://images.unsplash.com/photo-1558618666-fcd25c85f82e?auto=format&fit=crop&w=600&q=80',
          description: 'BESCOM meter reading photo taken on handover date.',
          timestamp: '2026-03-15'
        }
      ]
    },
    {
      id: 'item-5',
      title: 'Unpaid Rent / Notice Period Shortfall',
      category: 'unpaid_rent' as const,
      claimedAmount: 11500,
      tenantCounterAmount: 0,
      status: 'disputed' as const,
      landlordNotes: 'Tenant vacated 17 days before lease end. Claiming pro-rated rent for remaining period plus penalty.',
      tenantNotes: 'Served written 2-month notice on 15 Jan 2026 via registered post (AD receipt available). Vacated exactly on 15 March as agreed. No shortfall exists.',
      evidences: [
        {
          id: 'ev-5-a',
          itemId: 'item-5',
          title: 'Registered Post AD Receipt',
          evidenceType: 'receipt' as const,
          imageUrl: 'https://images.unsplash.com/photo-1586281380349-632531db7ed4?auto=format&fit=crop&w=600&q=80',
          description: 'India Post registered letter AD receipt dated 15 Jan 2026 confirming 2-month notice.',
          timestamp: '2026-01-15'
        }
      ]
    }
  ];

  const durationMonths = 36;
  const enrichedItems = rawItems.map(item => evaluateLineItem(item, durationMonths));

  return {
    caseId: 'BLR-2026-8941',
    propertyAddress: 'Flat 402, Tower 3, Prestige Shantiniketan, Whitefield, Bengaluru - 560066',
    tenantName: 'Rohan Sharma',
    tenantPhone: '+91 98801 23456',
    tenantEmail: 'rohan.sharma@example.com',
    landlordName: 'K. Raghavendra Rao',
    landlordPhone: '+91 94480 87654',
    landlordEmail: 'kr.rao@example.com',
    monthlyRent: 20000,
    securityDepositPaid: 200000,
    tenancyStartDate: '2023-03-15',
    tenancyVacateDate: '2026-03-15',
    tenancyDurationMonths: 36,
    settlementDeadline: '2026-09-20',
    items: enrichedItems
  };
}

/**
 * Scenario 2: Converged ₹25k Claim (Almost-Settled Consensus Case)
 */
export function getConverged25kCase(): DisputeCase {
  const rawItems = [
    {
      id: 'item-1',
      title: 'Full Flat Repainting & Wall Restoration',
      category: 'painting' as const,
      claimedAmount: 35000,
      tenantCounterAmount: 0,
      agreedAmount: 0,
      status: 'agreed' as const,
      landlordNotes: 'Waived after statutory audit. Sec 12 wear & tear applies for 36-month tenancy.',
      tenantNotes: 'Agreed. ₹0 deduction confirmed per Karnataka Rent Act Sec 12.',
      evidences: []
    },
    {
      id: 'item-2',
      title: 'Fixture Damage — Bajaj Geyser (15L)',
      category: 'fixture_damage' as const,
      claimedAmount: 20000,
      tenantCounterAmount: 12000,
      agreedAmount: 12000,
      status: 'agreed' as const,
      landlordNotes: 'Accepted 10% p.a. depreciation. Agreed to ₹12,000 after deducting 3 years depreciation.',
      tenantNotes: 'Agreed to ₹12,000. Fair depreciated value.',
      evidences: []
    },
    {
      id: 'item-3',
      title: 'Professional Deep Cleaning (Full Flat)',
      category: 'cleaning' as const,
      claimedAmount: 12000,
      tenantCounterAmount: 4000,
      agreedAmount: 4500,
      status: 'agreed' as const,
      landlordNotes: 'Adjusted to Bengaluru standard 3BHK deep cleaning benchmark (₹4,500 cap).',
      tenantNotes: 'Agreed to ₹4,500 based on standard Urban Company rate.',
      evidences: []
    },
    {
      id: 'item-4',
      title: 'BESCOM Electricity Arrears (Final Bill)',
      category: 'utilities' as const,
      claimedAmount: 3500,
      tenantCounterAmount: 3500,
      agreedAmount: 3500,
      status: 'agreed' as const,
      landlordNotes: 'Meter reading verified. Exact BESCOM amount approved.',
      tenantNotes: 'Agreed. ₹3,500 matches BESCOM portal.',
      evidences: []
    },
    {
      id: 'item-5',
      title: 'Unpaid Rent / Notice Period Shortfall',
      category: 'unpaid_rent' as const,
      claimedAmount: 11500,
      tenantCounterAmount: 0,
      agreedAmount: 0,
      status: 'agreed' as const,
      landlordNotes: 'Waived. Tenant notice was valid per registered post proof.',
      tenantNotes: 'Agreed. ₹0 — proper 2-month notice served.',
      evidences: []
    }
  ];

  const durationMonths = 36;
  const enrichedItems = rawItems.map(item => evaluateLineItem(item, durationMonths));

  return {
    caseId: 'BLR-2026-8941',
    propertyAddress: 'Flat 402, Tower 3, Prestige Shantiniketan, Whitefield, Bengaluru - 560066',
    tenantName: 'Rohan Sharma',
    tenantPhone: '+91 98801 23456',
    tenantEmail: 'rohan.sharma@example.com',
    landlordName: 'K. Raghavendra Rao',
    landlordPhone: '+91 94480 87654',
    landlordEmail: 'kr.rao@example.com',
    monthlyRent: 20000,
    securityDepositPaid: 200000,
    tenancyStartDate: '2023-03-15',
    tenancyVacateDate: '2026-03-15',
    tenancyDurationMonths: 36,
    settlementDeadline: '2026-09-20',
    items: enrichedItems
  };
}

export function getInitialCase(): DisputeCase {
  return getPredatory82kCase();
}

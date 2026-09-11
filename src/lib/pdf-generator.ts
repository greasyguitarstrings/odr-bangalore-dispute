import jsPDF from 'jspdf';
import { DisputeCase, DelayedInterestAudit } from './types';

/**
 * Generates an authentic Binding Mutual Settlement Agreement under Sec 89 CPC & Indian Contract Act.
 */
export function generateSettlementPDF(caseData: DisputeCase, totalDeductions: number, netRefund: number) {
  const doc = new jsPDF({ unit: 'pt', format: 'a4' });
  const margin = 40;
  let y = 50;

  // Header Banner
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(11);
  doc.setTextColor(74, 85, 104);
  doc.text('SETTLR ODR — KARNATAKA TENANCY CONCILIATION PORTAL', margin, y);
  y += 18;

  doc.setFontSize(16);
  doc.setTextColor(26, 54, 93);
  doc.text('DEED OF MUTUAL SETTLEMENT & FINAL ACCORD', margin, y);
  y += 15;

  doc.setFont('helvetica', 'italic');
  doc.setFontSize(9);
  doc.setTextColor(113, 128, 150);
  doc.text('Executed pursuant to Section 89 of Code of Civil Procedure, 1908 & Section 10 Indian Contract Act, 1872', margin, y);
  y += 10;

  // Divider
  doc.setDrawColor(43, 108, 176);
  doc.setLineWidth(1.5);
  doc.line(margin, y, 595 - margin, y);
  y += 20;

  // Metadata
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  doc.setTextColor(45, 55, 72);
  doc.text(`Case ID: ${caseData.caseId}   |   Jurisdiction: Bengaluru, Karnataka   |   Execution Date: ${new Date().toLocaleDateString('en-IN')}`, margin, y);
  y += 25;

  // Parties Box
  doc.setFillColor(247, 250, 252);
  doc.rect(margin, y, 595 - (margin * 2), 65, 'F');
  doc.setDrawColor(226, 232, 240);
  doc.rect(margin, y, 595 - (margin * 2), 65, 'S');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9);
  doc.setTextColor(43, 108, 176);
  doc.text('FIRST PARTY (TENANT)', margin + 10, y + 18);
  doc.text('SECOND PARTY (LANDLORD)', margin + 270, y + 18);

  doc.setFont('helvetica', 'normal');
  doc.setTextColor(45, 55, 72);
  doc.text(`${caseData.tenantName} (${caseData.tenantPhone})`, margin + 10, y + 34);
  doc.text(`Email: ${caseData.tenantEmail}`, margin + 10, y + 48);

  doc.text(`${caseData.landlordName} (${caseData.landlordPhone})`, margin + 270, y + 34);
  doc.text(`Email: ${caseData.landlordEmail}`, margin + 270, y + 48);
  y += 85;

  // Premises Details
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10);
  doc.setTextColor(43, 108, 176);
  doc.text('1. PREMISES & TENANCY PARTICULARS', margin, y);
  y += 15;

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  doc.setTextColor(45, 55, 72);
  const premiseText = `The Tenant occupied premises at ${caseData.propertyAddress}. The agreed rent was ₹${caseData.monthlyRent.toLocaleString('en-IN')}/mo with a security deposit of ₹${caseData.securityDepositPaid.toLocaleString('en-IN')}. Possession was handed back on ${caseData.tenancyVacateDate}.`;
  const splitPremise = doc.splitTextToSize(premiseText, 595 - (margin * 2));
  doc.text(splitPremise, margin, y);
  y += splitPremise.length * 12 + 15;

  // Itemized Resolution
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10);
  doc.setTextColor(43, 108, 176);
  doc.text('2. MUTUALLY RESOLVED DEDUCTION HEADS', margin, y);
  y += 15;

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8);
  doc.setFillColor(237, 242, 247);
  doc.rect(margin, y, 595 - (margin * 2), 16, 'F');
  doc.text('DEDUCTION HEAD', margin + 8, y + 11);
  doc.text('CLAIMED', margin + 240, y + 11);
  doc.text('AGREED', margin + 330, y + 11);
  doc.text('STATUS', margin + 420, y + 11);
  y += 20;

  doc.setFont('helvetica', 'normal');
  caseData.items.forEach(item => {
    const agreed = item.agreedAmount !== undefined ? item.agreedAmount : item.tenantCounterAmount;
    doc.text(item.title.substring(0, 42), margin + 8, y);
    doc.text(`₹${item.claimedAmount.toLocaleString('en-IN')}`, margin + 240, y);
    doc.text(`₹${agreed.toLocaleString('en-IN')}`, margin + 330, y);
    doc.text(item.status.toUpperCase(), margin + 420, y);
    y += 14;
  });
  y += 15;

  // Financial Ledger Box
  doc.setFillColor(240, 255, 244);
  doc.rect(margin, y, 595 - (margin * 2), 50, 'F');
  doc.setDrawColor(56, 161, 105);
  doc.rect(margin, y, 595 - (margin * 2), 50, 'S');

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  doc.setTextColor(45, 55, 72);
  doc.text(`Original Security Deposit: ₹${caseData.securityDepositPaid.toLocaleString('en-IN')}`, margin + 12, y + 18);
  doc.text(`Total Agreed Deductions: (-) ₹${totalDeductions.toLocaleString('en-IN')}`, margin + 12, y + 34);

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(12);
  doc.setTextColor(34, 84, 61);
  doc.text(`NET REFUND PAYABLE TO TENANT: ₹${netRefund.toLocaleString('en-IN')}`, margin + 220, y + 26);
  y += 70;

  // Undertakings
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10);
  doc.setTextColor(43, 108, 176);
  doc.text('3. UNDERTAKINGS & EXECUTION', margin, y);
  y += 15;

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8.5);
  doc.setTextColor(74, 85, 104);
  const terms = [
    '1. The Landlord agrees to refund the net amount of ₹' + netRefund.toLocaleString('en-IN') + ' via IMPS/NEFT within 5 business days.',
    '2. Both parties irrevocably release each other from all claims arising under this lease upon realization of said refund.',
    '3. This agreement is mutually executed on the Settlr ODR platform and holds the force of an arbitral settlement under Section 89 of the CPC.'
  ];
  terms.forEach(t => {
    doc.text(t, margin, y);
    y += 13;
  });
  y += 25;

  // Signatures
  doc.setFillColor(247, 250, 252);
  doc.rect(margin, y, 240, 45, 'F');
  doc.rect(margin + 275, y, 240, 45, 'F');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8);
  doc.text('FIRST PARTY (TENANT)', margin + 10, y + 14);
  doc.text('SECOND PARTY (LANDLORD)', margin + 285, y + 14);
  doc.setFont('helvetica', 'italic');
  doc.text('Digitally Verified & Signed (IP Hash Recorded)', margin + 10, y + 30);
  doc.text('Digitally Verified & Signed (IP Hash Recorded)', margin + 285, y + 30);

  doc.save(`Binding_Settlement_Deed_${caseData.caseId}.pdf`);
}

/**
 * Generates a formal Statutory Legal Demand Notice under Section 106 of the Transfer of Property Act.
 */
export function generateDemandNoticePDF(caseData: DisputeCase, interestInfo: DelayedInterestAudit) {
  const doc = new jsPDF({ unit: 'pt', format: 'a4' });
  const margin = 45;
  let y = 50;

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(15);
  doc.setTextColor(155, 44, 44);
  doc.text('FORMAL STATUTORY LEGAL DEMAND NOTICE', margin, y);
  y += 18;

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8.5);
  doc.setTextColor(116, 42, 42);
  doc.text('UNDER SECTION 106 TRANSFER OF PROPERTY ACT, 1882 READ WITH SECTION 73 INDIAN CONTRACT ACT', margin, y);
  y += 10;

  doc.setDrawColor(155, 44, 44);
  doc.setLineWidth(1.5);
  doc.line(margin, y, 595 - margin, y);
  y += 20;

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  doc.setTextColor(45, 55, 72);
  doc.text(`Date: ${new Date().toLocaleDateString('en-IN')}   |   Notice Ref: ${caseData.caseId}/LN`, margin, y);
  y += 20;

  doc.setFont('helvetica', 'bold');
  doc.text('TO:', margin, y); y += 12;
  doc.text(caseData.landlordName, margin, y); y += 12;
  doc.setFont('helvetica', 'normal');
  doc.text(`Owner of: ${caseData.propertyAddress}`, margin, y); y += 12;
  doc.text(`Contact: ${caseData.landlordPhone} | ${caseData.landlordEmail}`, margin, y); y += 20;

  doc.setFont('helvetica', 'bold');
  doc.text('FROM:', margin, y); y += 12;
  doc.text(caseData.tenantName, margin, y); y += 12;
  doc.setFont('helvetica', 'normal');
  doc.text(`Contact: ${caseData.tenantPhone} | ${caseData.tenantEmail}`, margin, y); y += 22;

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9.5);
  doc.setTextColor(155, 44, 44);
  const subject = `SUBJECT: DEMAND FOR IMMEDIATE REFUND OF SECURITY DEPOSIT OF ₹${caseData.securityDepositPaid.toLocaleString('en-IN')} WITH STATUTORY INTEREST AT 10% P.A.`;
  const splitSub = doc.splitTextToSize(subject, 595 - (margin * 2));
  doc.text(splitSub, margin, y);
  y += splitSub.length * 13 + 15;

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  doc.setTextColor(45, 55, 72);
  const noticeBody = [
    `1. That I was your tenant in respect of ${caseData.propertyAddress} having paid a refundable security deposit of ₹${caseData.securityDepositPaid.toLocaleString('en-IN')}.`,
    `2. That vacant and peaceful possession was handed over to you on ${caseData.tenancyVacateDate}. Under Karnataka tenancy jurisprudence and civil contract norms, the deposit is strictly refundable within 30 days.`,
    `3. A total of ${interestInfo.defaultDays} days have elapsed beyond the statutory grace period. You have unlawfully withheld said funds and sought to charge arbitrary deductions for ordinary wear and tear (such as full repainting), in direct contravention of Section 13 of the Karnataka Rent Act.`,
    `4. As on date, the total outstanding sum payable to me is ₹${interestInfo.totalDueWithInterest.toLocaleString('en-IN')}, including accrued penal interest of ₹${interestInfo.accruedInterest.toLocaleString('en-IN')} at 10% p.a.`,
    `NOW THEREFORE, YOU ARE HEREBY CALLED UPON to refund the said sum of ₹${interestInfo.totalDueWithInterest.toLocaleString('en-IN')} within 15 (FIFTEEN) DAYS of receipt of this notice, failing which I shall initiate proceedings before the Karnataka Rent Authority and Consumer Disputes Redressal Commission for recovery, damages, and litigation expenses.`
  ];

  noticeBody.forEach(paragraph => {
    const lines = doc.splitTextToSize(paragraph, 595 - (margin * 2));
    doc.text(lines, margin, y);
    y += lines.length * 13 + 10;
  });

  y += 20;
  doc.setFont('helvetica', 'bold');
  doc.text('Yours sincerely,', margin, y); y += 15;
  doc.text(caseData.tenantName, margin, y); y += 12;
  doc.setFont('helvetica', 'normal');
  doc.text('Former Tenant', margin, y);

  doc.save(`Legal_Demand_Notice_${caseData.caseId}.pdf`);
}

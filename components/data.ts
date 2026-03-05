export type ProtoState = 'calm' | 'busy' | 'critical'

export interface Entity {
  id: number
  name: string
  shortName: string
  country: string
  countryCode: string
  nextBoard: string
  nextBoardDate: Date
  completion: number
  connectedApps: string[]
}

export interface ActionItem {
  id: number
  entityId: number
  entityName: string
  entityTag: string
  tagColor: string
  title: string
  description: string
  actionLabel: string
  states: ProtoState[]
}

export interface ChatMessage {
  id: number
  role: 'user' | 'assistant'
  content: string
}

export const ENTITIES: Entity[] = [
  {
    id: 1,
    name: 'Meridian Capital Holdings Ltd',
    shortName: 'Meridian Capital',
    country: 'United Kingdom',
    countryCode: 'UK',
    nextBoard: '14 Mar 2026',
    nextBoardDate: new Date('2026-03-14'),
    completion: 72,
    connectedApps: ['Entities', 'Boards NextGen', 'Minutes', 'Risk Manager'],
  },
  {
    id: 2,
    name: 'Apex Ventures GmbH',
    shortName: 'Apex Ventures',
    country: 'Germany',
    countryCode: 'DE',
    nextBoard: '18 Mar 2026',
    nextBoardDate: new Date('2026-03-18'),
    completion: 45,
    connectedApps: ['Entities', 'Boards NextGen', 'Risk Manager', 'Data Intelligence'],
  },
  {
    id: 3,
    name: 'Horizon Digital S.A.',
    shortName: 'Horizon Digital',
    country: 'France',
    countryCode: 'FR',
    nextBoard: '11 Mar 2026',
    nextBoardDate: new Date('2026-03-11'),
    completion: 88,
    connectedApps: ['Entities', 'Boards NextGen', 'Data Intelligence'],
  },
  {
    id: 4,
    name: 'Nordic Solutions AB',
    shortName: 'Nordic Solutions',
    country: 'Sweden',
    countryCode: 'SE',
    nextBoard: '25 Mar 2026',
    nextBoardDate: new Date('2026-03-25'),
    completion: 31,
    connectedApps: ['Entities', 'Boards NextGen', 'Minutes'],
  },
  {
    id: 5,
    name: 'Pacific Rim Operations Pte Ltd',
    shortName: 'Pacific Rim Ops',
    country: 'Singapore',
    countryCode: 'SG',
    nextBoard: '7 Mar 2026',
    nextBoardDate: new Date('2026-03-07'),
    completion: 60,
    connectedApps: ['Entities', 'Boards NextGen', 'Risk Manager', 'Minutes'],
  },
  {
    id: 6,
    name: 'Atlantic Resources Inc',
    shortName: 'Atlantic Resources',
    country: 'United States',
    countryCode: 'US',
    nextBoard: '20 Mar 2026',
    nextBoardDate: new Date('2026-03-20'),
    completion: 95,
    connectedApps: ['Entities', 'Boards NextGen', 'Data Intelligence', 'Risk Manager'],
  },
  {
    id: 7,
    name: 'Iberian Holdings S.L.',
    shortName: 'Iberian Holdings',
    country: 'Spain',
    countryCode: 'ES',
    nextBoard: '28 Mar 2026',
    nextBoardDate: new Date('2026-03-28'),
    completion: 18,
    connectedApps: ['Entities', 'Boards NextGen', 'Minutes', 'Data Intelligence'],
  },
  {
    id: 8,
    name: 'Eastern Markets Ltd',
    shortName: 'Eastern Markets',
    country: 'UAE',
    countryCode: 'AE',
    nextBoard: '4 Apr 2026',
    nextBoardDate: new Date('2026-04-04'),
    completion: 55,
    connectedApps: ['Entities', 'Boards NextGen', 'Risk Manager'],
  },
]

export const ACTION_ITEMS: ActionItem[] = [
  {
    id: 1,
    entityId: 2,
    entityName: 'Apex Ventures GmbH',
    entityTag: 'APEX VENTURES',
    tagColor: 'bg-amber-700',
    title: 'GDPR Sign-off Required',
    description: 'EU data processing addendum requires legal sign-off before board pack can be finalised.',
    actionLabel: 'Review Item',
    states: ['busy', 'critical'],
  },
  {
    id: 2,
    entityId: 1,
    entityName: 'Meridian Capital Holdings Ltd',
    entityTag: 'MERIDIAN CAPITAL',
    tagColor: 'bg-blue-700',
    title: 'CEO Report Unassigned',
    description: 'Board pack section 3.2 has no owner. Meeting in 15 days.',
    actionLabel: 'Assign Owner',
    states: ['busy', 'critical'],
  },
  {
    id: 3,
    entityId: 5,
    entityName: 'Pacific Rim Operations Pte Ltd',
    entityTag: 'PACIFIC RIM',
    tagColor: 'bg-teal-700',
    title: 'Q4 Financials Not Received',
    description: 'Q4 Financial Statements not received from Finance. Pack cannot progress to review without them.',
    actionLabel: 'Notify Finance',
    states: ['busy', 'critical'],
  },
  {
    id: 4,
    entityId: 4,
    entityName: 'Nordic Solutions AB',
    entityTag: 'NORDIC SOLUTIONS',
    tagColor: 'bg-indigo-700',
    title: 'Resolution Awaiting Signatures',
    description: 'Capital restructuring resolution approved in December — 3 of 5 director e-signatures complete.',
    actionLabel: 'Send for Signature',
    states: ['calm', 'busy'],
  },
  {
    id: 5,
    entityId: 6,
    entityName: 'Atlantic Resources Inc',
    entityTag: 'ATLANTIC RESOURCES',
    tagColor: 'bg-emerald-700',
    title: 'Chair Sign-off Pending',
    description: 'Pack is complete and at 95% — awaiting final approval from chair before distribution.',
    actionLabel: 'Send for Approval',
    states: ['calm', 'busy'],
  },
]

export interface EditSuggestion {
  id: number
  entities: Array<{ tag: string; tagColor: string; entityId: number }>
  sourceType: 'regulation' | 'market' | 'source-material'
  sourceLabel: string
  title: string
  reason: string
  affectedSection: string
  suggestedPrompt: string
  states: ProtoState[]
}

export const EDIT_SUGGESTIONS: EditSuggestion[] = [
  {
    id: 1,
    entities: [{ tag: 'APEX VENTURES', tagColor: 'bg-amber-700', entityId: 2 }],
    sourceType: 'regulation',
    sourceLabel: 'EU AI Act',
    title: 'Update AI Act compliance deadline in Risk section',
    reason: 'EU AI Act enforcement guidelines revised 24 Feb 2026 — key deadline shifted from Q2 to Q3 2026.',
    affectedSection: 'Risk & Compliance',
    suggestedPrompt: 'Update the Risk & Compliance section for Apex Ventures to reflect the revised EU AI Act enforcement deadline (Q3 2026) and adjust the remediation budget timeline accordingly.',
    states: ['calm', 'busy', 'critical'],
  },
  {
    id: 2,
    entities: [{ tag: 'MERIDIAN CAPITAL', tagColor: 'bg-blue-700', entityId: 1 }],
    sourceType: 'regulation',
    sourceLabel: 'FCA Guidance',
    title: 'Reference updated FCA Consumer Duty guidance in CEO Report',
    reason: 'FCA published updated Consumer Duty implementation guidance on 1 Mar 2026, affecting all UK authorised firms.',
    affectedSection: 'CEO Report',
    suggestedPrompt: "Add a paragraph to Meridian Capital's CEO Report referencing the FCA's updated Consumer Duty guidance (Mar 2026) and the entity's current compliance posture.",
    states: ['calm', 'busy', 'critical'],
  },
  {
    id: 3,
    entities: [{ tag: 'HORIZON DIGITAL', tagColor: 'bg-violet-700', entityId: 3 }],
    sourceType: 'market',
    sourceLabel: 'ECB Rate Cut',
    title: 'Revise FX hedging commentary — ECB rate now 2.90%',
    reason: 'ECB cut rates 25bps to 2.90% on 6 Mar 2026. Pack currently references the superseded rate of 3.15%.',
    affectedSection: 'Q4 Financial Statements',
    suggestedPrompt: "Update Horizon Digital's Q4 Financial Statements to reflect the ECB rate cut to 2.90% (6 Mar 2026) and revise all FX hedging commentary to align with the current rate environment.",
    states: ['calm', 'busy', 'critical'],
  },
  {
    id: 4,
    entities: [{ tag: 'ATLANTIC RESOURCES', tagColor: 'bg-emerald-700', entityId: 6 }],
    sourceType: 'source-material',
    sourceLabel: 'Auditor Revision',
    title: 'Reconcile EBITDA — PwC revised Q4 management accounts',
    reason: 'PwC submitted revised management accounts on 28 Feb 2026. EBITDA now £2.6m; pack currently states £2.8m.',
    affectedSection: 'Q4 Financial Statements',
    suggestedPrompt: "Reconcile the Q4 Financial Statements for Atlantic Resources with PwC's revised management accounts (28 Feb 2026): update EBITDA from £2.8m to £2.6m and recalculate the EBITDA margin.",
    states: ['busy', 'critical'],
  },
  {
    id: 5,
    entities: [
      { tag: 'APEX VENTURES', tagColor: 'bg-amber-700', entityId: 2 },
      { tag: 'HORIZON DIGITAL', tagColor: 'bg-violet-700', entityId: 3 },
      { tag: 'NORDIC SOLUTIONS', tagColor: 'bg-indigo-700', entityId: 4 },
      { tag: 'IBERIAN HOLDINGS', tagColor: 'bg-orange-700', entityId: 7 },
    ],
    sourceType: 'regulation',
    sourceLabel: 'CSRD',
    title: 'Add mandatory ESG disclosure section to all EU entity board packs',
    reason: 'CSRD mandatory reporting applies from Jan 2026 for qualifying EU entities. No ESG disclosure section exists in any of the 4 affected packs.',
    affectedSection: 'ESG Disclosure',
    suggestedPrompt: 'Add an ESG disclosure section to board packs for Apex Ventures, Horizon Digital, Nordic Solutions, and Iberian Holdings, covering scope 1 & 2 emissions, social metrics, and board oversight of sustainability strategy as required under CSRD.',
    states: ['busy', 'critical'],
  },
]

export const PROMPT_STARTERS: string[] = [
  'Which packs are at risk this quarter?',
  'Create board pack',
  'Show all outstanding director signatures',
  'Draft a circular resolution across entities',
]

export const INITIAL_MESSAGES: ChatMessage[] = [
  {
    id: 1,
    role: 'assistant',
    content: 'Q1 2026 pack status: 6 of 8 entities are in progress. Most urgent — Pacific Rim Ops meets on 7 March and Q4 Financials are still missing from Finance. Atlantic Resources is nearly done, pending chair sign-off only. Four items need your review before I can proceed.',
  },
]

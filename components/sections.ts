export const SECTIONS = [
  { title: 'Cover Page', type: 'cover' },
  { title: 'Agenda', type: 'agenda' },
  { title: 'Previous Minutes', type: 'minutes' },
  { title: "Chair's Introduction", type: 'letter' },
  { title: 'CEO Report', type: 'report' },
  { title: 'Q4 Financial Statements', type: 'financial' },
  { title: 'Risk & Compliance', type: 'risk' },
  { title: 'Resolutions', type: 'resolution' },
  { title: 'AOB', type: 'aob' },
] as const

export type SectionType = typeof SECTIONS[number]['type']
export type Section = typeof SECTIONS[number]

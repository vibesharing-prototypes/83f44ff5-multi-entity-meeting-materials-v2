import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { ENTITIES } from '@/components/data'
import { SECTIONS } from '@/components/sections'
import DocumentEditor from '@/components/DocumentEditor'

export function generateMetadata({ params }: { params: { id: string; section: string } }): Metadata {
  const entity = ENTITIES.find(e => e.id === Number(params.id))
  const section = SECTIONS[Number(params.section)]
  return { title: entity && section ? `${section.title} · ${entity.shortName}` : 'Edit' }
}

export function generateStaticParams() {
  const params: { id: string; section: string }[] = []
  for (const entity of ENTITIES) {
    for (let i = 0; i < SECTIONS.length; i++) {
      params.push({ id: String(entity.id), section: String(i) })
    }
  }
  return params
}

export default function EditPage({
  params,
}: {
  params: { id: string; section: string }
}) {
  const entity = ENTITIES.find(e => e.id === Number(params.id))
  if (!entity) notFound()

  const sectionIndex = Number(params.section)
  if (sectionIndex < 0 || sectionIndex >= SECTIONS.length) notFound()

  return <DocumentEditor entity={entity} sectionIndex={sectionIndex} />
}

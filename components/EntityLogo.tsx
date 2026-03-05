'use client'

import { useState } from 'react'
import { type Entity } from '@/components/data'

const LOGO_COLORS = [
  'bg-blue-600',
  'bg-amber-500',
  'bg-teal-600',
  'bg-indigo-600',
  'bg-emerald-600',
  'bg-rose-600',
  'bg-orange-500',
  'bg-violet-600',
]

function getInitials(shortName: string): string {
  return shortName
    .split(' ')
    .slice(0, 2)
    .map(w => w[0])
    .join('')
    .toUpperCase()
}

// Derives the filename for an entity's logo.
// Files live in public/logos/ and are named after the entity shortName slug.
// Example: "Meridian Capital" → /logos/meridian-capital.png
export function getEntityLogoPath(entity: Entity): string {
  const slug = entity.shortName
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9-]/g, '')
  return `/logos/${slug}.png`
}

export default function EntityLogo({
  entity,
  size = 'md',
}: {
  entity: Entity
  size?: 'sm' | 'md' | 'lg'
}) {
  const [imgFailed, setImgFailed] = useState(false)

  const color = LOGO_COLORS[(entity.id - 1) % LOGO_COLORS.length]
  const initials = getInitials(entity.shortName)
  const dim =
    size === 'sm'
      ? 'w-7 h-7 text-[10px]'
      : size === 'lg'
      ? 'w-12 h-12 text-sm'
      : 'w-9 h-9 text-xs'

  if (!imgFailed) {
    return (
      <img
        src={getEntityLogoPath(entity)}
        alt={entity.shortName}
        className={`${dim} rounded-lg flex-shrink-0 object-contain bg-white dark:bg-zinc-800`}
        onError={() => setImgFailed(true)}
      />
    )
  }

  return (
    <div
      className={`${dim} ${color} rounded-lg flex-shrink-0 flex items-center justify-center font-bold text-white`}
    >
      {initials}
    </div>
  )
}

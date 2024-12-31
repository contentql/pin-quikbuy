'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import type { ReactNode } from 'react'

export const CartLink = ({ children }: { children: ReactNode }) => {
  const pathname = usePathname()
  return (
    <Link
      href='/cart'
      onClick={e => {
        e.preventDefault()
        if (pathname === '/cart') {
          return
        }
        // setOpen(true)
      }}
      scroll={false}
      className='relative block h-6 w-6'
      prefetch={true}>
      {children}
    </Link>
  )
}

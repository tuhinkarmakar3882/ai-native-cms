'use client'

import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { Logo } from '@/components/Logo/Logo'
import type { Header } from '@/payload-types'
import { HeaderNav } from './Nav'
import { MobileNav } from './MobileNav'
import { Button } from '@/components/ui/button'
import { cn } from '@/utilities/ui'

export const HeaderClient = ({ data }: { data: Header }) => {
  const [scrolled, setScrolled] = useState(false)

  // Add scroll listener for glassmorphism effect
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header
      className={cn(
        'sticky top-0 z-50 w-full transition-all duration-300 border-b',
        scrolled
          ? 'bg-background/80 backdrop-blur-md py-3 shadow-sm'
          : 'bg-transparent py-5 border-transparent',
      )}
    >
      <div className="container flex items-center justify-between gap-8">
        {/* Left: Logo (Zone 1) */}
        <div className="flex-shrink-0 lg:w-[200px]">
          <Link href="/" className="focus-visible:outline-none">
            <Logo priority loading="eager" className="h-8 w-auto" />
          </Link>
        </div>

        {/* Center: Desktop Navigation (Zone 2) */}
        <div className="hidden lg:flex flex-grow justify-center">
          <HeaderNav data={data} />
        </div>

        {/* Right: Actions & Mobile Toggle (Zone 3) */}
        <div className="flex items-center justify-end gap-2 lg:w-[200px]">
          {data?.ctas?.map((elem) => (
            <div className="hidden lg:block">
              <Button asChild size="sm" variant={elem.link?.appearance}>
                <Link href={elem.link.url || '#'}>{elem.link.label}</Link>
              </Button>
            </div>
          ))}

          <div className="lg:hidden">
            <MobileNav data={data} />
          </div>
        </div>
      </div>
    </header>
  )
}

'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

import type { Header as HeaderType } from '@/payload-types'

import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { Button } from '@/components/ui/button'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { CMSLink } from '@/components/Link'
import { Menu } from 'lucide-react'
import { cn } from '@/utilities/ui'
import { Logo } from '@/components/Logo/Logo'

export function MobileNav({ data }: { data: HeaderType }) {
  const [open, setOpen] = useState(false)
  const navItems = data?.navItems || []
  const pathname = usePathname()

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <Menu className="h-5 w-5" />
          <span className="sr-only">Toggle menu</span>
        </Button>
      </SheetTrigger>

      <SheetContent side="left" className="w-full sm:max-w-sm p-0">
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b">
            <Link href="/" onClick={() => setOpen(false)}>
              <Logo />
            </Link>
          </div>

          {/* Navigation */}
          <nav className="flex-1 overflow-y-auto p-6">
            <ul className="space-y-4">
              {navItems.map((item, i) => {
                const hasChildren = item.children?.length > 0
                const isActive = pathname === item.link?.url

                if (!hasChildren) {
                  return (
                    <li key={i}>
                      <CMSLink
                        {...item.link}
                        onClick={() => setOpen(false)}
                        className={cn(
                          'block text-lg font-medium transition-colors',
                          isActive ? 'text-primary' : 'text-foreground hover:text-primary',
                        )}
                      />
                    </li>
                  )
                }

                return (
                  <li key={i}>
                    <Accordion type="single" collapsible>
                      <AccordionItem value={`item-${i}`} className="border-none">
                        <AccordionTrigger className="py-2 text-lg font-medium hover:no-underline">
                          {item.link?.label}
                        </AccordionTrigger>
                        <AccordionContent>
                          <ul className="mt-2 space-y-3 pl-4">
                            {item.children?.map((child, j) => (
                              <li key={j}>
                                <CMSLink
                                  {...child.link}
                                  onClick={() => setOpen(false)}
                                  className={cn(
                                    'block text-sm text-muted-foreground hover:text-foreground',
                                    pathname === child.link?.url && 'text-primary',
                                  )}
                                />
                                {child.description && (
                                  <p className="text-xs text-muted-foreground mt-1">
                                    {child.description}
                                  </p>
                                )}
                              </li>
                            ))}
                          </ul>
                        </AccordionContent>
                      </AccordionItem>
                    </Accordion>
                  </li>
                )
              })}
            </ul>
          </nav>

          {/* Footer actions */}
          <div className="p-6 border-t space-y-4 flex items-center justify-center gap-8">
            {data?.ctas?.map((elem) => (
              <Button asChild size="sm" variant={elem.link?.appearance} className="m-0 px-6 py-6">
                <Link href={elem.link.url || '#'}>{elem.link.label}</Link>
              </Button>
            ))}
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )
}

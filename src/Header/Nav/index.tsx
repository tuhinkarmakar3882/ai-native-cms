'use client'

import * as React from 'react'
import Link from 'next/link'
import type { Header as HeaderType } from '@/payload-types'
import { CMSLink } from '@/components/Link'
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from '@/components/ui/navigation-menu'
import { cn } from '@/utilities/ui'

export const HeaderNav: React.FC<{ data: HeaderType }> = ({ data }) => {
  const navItems = data?.navItems || []

  return (
    <NavigationMenu>
      <NavigationMenuList className="gap-1">
        {navItems.map((item, i) => {
          const hasChildren = item.children && item.children.length > 0

          if (!hasChildren) {
            return (
              <NavigationMenuItem key={i}>
                <NavigationMenuLink asChild>
                  <CMSLink
                    {...item.link}
                    className="group inline-flex h-10 w-max items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50"
                  />
                </NavigationMenuLink>
              </NavigationMenuItem>
            )
          }

          return (
            <NavigationMenuItem key={i}>
              <NavigationMenuTrigger className="text-sm font-medium">
                {item.link?.label}
              </NavigationMenuTrigger>

              <NavigationMenuContent>
                {/* Mega-menu style grid for better space utilization */}
                <ul className="grid w-[400px] gap-3 p-6 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                  <li className="row-span-3">
                    <NavigationMenuLink asChild>
                      <div className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md">
                        <div className="mb-2 mt-4 text-lg font-medium">{item.link?.label}</div>
                        <p className="text-sm leading-tight text-muted-foreground">
                          Explore our range of {item.link?.label?.toLowerCase()} services and
                          features tailored for your needs.
                        </p>
                      </div>
                    </NavigationMenuLink>
                  </li>
                  {item.children?.map((child, j) => (
                    <li key={j}>
                      <NavigationMenuLink asChild>
                        <Link
                          href={child.link?.url || '#'}
                          className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground"
                        >
                          <div className="text-sm font-medium leading-none">
                            {child.link?.label}
                          </div>
                          {child.description && (
                            <p className="line-clamp-2 text-xs leading-snug text-muted-foreground">
                              {child.description}
                            </p>
                          )}
                        </Link>
                      </NavigationMenuLink>
                    </li>
                  ))}
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
          )
        })}
      </NavigationMenuList>
    </NavigationMenu>
  )
}

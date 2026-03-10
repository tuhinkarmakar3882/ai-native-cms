'use client'

import type { Footer } from '@/payload-types'

import Link from 'next/link'
import { CMSLink } from '@/components/Link'
import { Logo } from '@/components/Logo/Logo'
import { ThemeSelector } from '@/providers/Theme/ThemeSelector'
import { cn } from '@/utilities/ui'

import { Github, Linkedin, Twitter, Youtube, Apple, Play } from 'lucide-react'

const iconMap = {
  x: Twitter,
  github: Github,
  linkedin: Linkedin,
  youtube: Youtube,
}

const appIconMap = {
  appstore: Apple,
  playstore: Play,
}

export function FooterClient({ data }: { data: Footer }) {
  const { description, linkGroups, newsletter, socialLinks, appLinks, legalLinks, copyright } = data

  return (
    <footer className="border-t bg-background pt-16 md:pt-24 pb-8">
      <div className="container">
        {/* Main Grid: Brand | Links | Newsletter & Apps */}
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 xl:gap-16 pb-16 border-b">
          {/* Column 1: Brand (Spans 3/12) */}
          <div className="lg:col-span-3 space-y-8">
            <Link href="/" className="inline-block" aria-label="Go to homepage">
              <Logo />
            </Link>

            {description && (
              <p className="text-sm text-muted-foreground leading-relaxed">{description}</p>
            )}

            <div className="pt-2">
              <ThemeSelector />
            </div>
          </div>

          {/* Column 2: Navigation Links (Spans 5/12) */}
          <div className="lg:col-span-5 grid grid-cols-2 sm:grid-cols-3 gap-8">
            {linkGroups?.map((group, i) => (
              <div key={i} className="space-y-5">
                <h4 className="font-semibold text-sm text-foreground">{group.title}</h4>
                <ul className="space-y-3.5">
                  {group.links?.map(({ link }, j) => (
                    <li key={j}>
                      <CMSLink
                        {...link}
                        className="text-sm text-muted-foreground hover:text-primary transition-colors inline-block"
                      />
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Column 3: Newsletter & Actions (Spans 4/12) */}
          <div className="lg:col-span-4 space-y-8">
            {newsletter?.title && (
              <div className="bg-muted/50 rounded-2xl p-6 md:p-8 space-y-4">
                <div className="space-y-2">
                  <h3 className="font-semibold text-lg">{newsletter.title}</h3>
                  {newsletter.description && (
                    <p className="text-sm text-muted-foreground">{newsletter.description}</p>
                  )}
                </div>

                <form className="flex flex-col gap-3 pt-2" onSubmit={(e) => e.preventDefault()}>
                  <label htmlFor="newsletter-email" className="sr-only">
                    Email address
                  </label>
                  <input
                    id="newsletter-email"
                    type="email"
                    required
                    placeholder="Enter your email"
                    className="w-full px-4 py-2.5 border rounded-lg bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                  />
                  <button
                    type="submit"
                    className="w-full px-6 py-2.5 bg-primary text-primary-foreground rounded-lg text-sm font-medium hover:bg-primary/90 focus:ring-2 focus:ring-primary/20 transition-all"
                  >
                    Subscribe
                  </button>
                </form>
              </div>
            )}

            {/* App store links placed logically under the newsletter action area */}
            {appLinks && appLinks.length > 0 && (
              <div className="flex flex-wrap gap-3">
                {appLinks.map((item, i) => {
                  const Icon = appIconMap[item.platform as keyof typeof appIconMap]
                  if (!Icon) return null
                  return (
                    <CMSLink
                      key={i}
                      {...item.link}
                      className="inline-flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium border bg-background rounded-xl hover:bg-accent hover:text-accent-foreground transition-colors shadow-sm flex-1 sm:flex-none"
                    >
                      <Icon className="w-4 h-4" />
                      <span>{item.platform === 'appstore' ? 'App Store' : 'Google Play'}</span>
                    </CMSLink>
                  )
                })}
              </div>
            )}
          </div>
        </div>

        {/* Dense Bottom Bar: Copyright | Socials | Legal */}
        <div className="pt-8 flex flex-col-reverse md:flex-row items-center justify-between gap-6 text-sm text-muted-foreground">
          <div className="flex flex-col md:flex-row items-center gap-4 md:gap-8">
            <p>{copyright || `© ${new Date().getFullYear()} Company. All rights reserved.`}</p>

            {/* Legal Links merged closely with Copyright */}
            {legalLinks && legalLinks.length > 0 && (
              <ul className="flex flex-wrap justify-center gap-x-6 gap-y-2">
                {legalLinks.map(({ link }, i) => (
                  <li key={i}>
                    <CMSLink
                      {...link}
                      className="hover:text-foreground transition-colors hover:underline underline-offset-4"
                    />
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Social links act as a visual anchor on the bottom right */}
          {socialLinks && socialLinks.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {socialLinks.map((item, i) => {
                const Icon = iconMap[item.platform as keyof typeof iconMap]
                if (!Icon) return null
                return (
                  <CMSLink
                    key={i}
                    {...item.link}
                    className="p-2.5 text-muted-foreground hover:text-foreground hover:bg-muted rounded-full transition-all"
                    aria-label={`Visit our ${item.platform} page`}
                    title={`Visit our ${item.platform} page`}
                  >
                    <Icon className="w-4 h-4" />
                  </CMSLink>
                )
              })}
            </div>
          )}
        </div>
      </div>
    </footer>
  )
}

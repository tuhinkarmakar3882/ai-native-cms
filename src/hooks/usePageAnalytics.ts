import { useEffect } from 'react'

type PageAnalyticsOptions = {
  /**
   * Scroll depth milestones to track (in %)
   * Default: [25, 50, 75, 100]
   */
  scrollDepths?: number[]

  /**
   * CSS selector for tracked sections
   * Default: [data-track-section]
   */
  sectionSelector?: string

  /**
   * Disable individual features if needed
   */
  trackClicks?: boolean
  trackScrollDepth?: boolean
  trackSections?: boolean
  trackDropoff?: boolean
}

declare global {
  interface Window {
    gtag: (...args: any[]) => void
  }
}

export function usePageAnalytics({
  scrollDepths = [25, 50, 75, 100],
  sectionSelector = '[data-track-section]',
  trackClicks = true,
  trackScrollDepth = true,
  trackSections = true,
  trackDropoff = true,
}: PageAnalyticsOptions = {}) {
  useEffect(() => {
    // if (typeof window === 'undefined' || typeof window.gtag !== 'function') {
    //   return
    // }

    /* -------------------------------------------
     * Internal State
     ------------------------------------------- */

    const firedDepths = new Set<number>()
    let lastSection: string | null = null

    const safeTrack = (event: string, payload: Record<string, any>) => {
      try {
        console.log('Sending GTAG Event', {
          event,
          payload,
        })
        window.gtag('event', event, payload)
      } catch (err) {
        console.warn({
          err,
        })
      }
    }

    /* -------------------------------------------
     * Click Tracking
     ------------------------------------------- */

    const handleClick = (event: MouseEvent) => {
      if (!trackClicks) return

      const target = event.target as HTMLElement | null
      const trackId = target?.dataset?.trackId
      if (!trackId) return

      safeTrack('user-click', {
        element: target.tagName,
        meta_href: (target as HTMLAnchorElement)?.href,
        meta_trackId: trackId,
      })
    }

    /* -------------------------------------------
     * Scroll Depth
     ------------------------------------------- */

    const getScrollPercent = () => {
      const docHeight = document.documentElement.scrollHeight - window.innerHeight

      if (docHeight <= 0) return 0
      return Math.round((window.scrollY / docHeight) * 100)
    }

    const handleScroll = () => {
      if (!trackScrollDepth) return

      const percent = getScrollPercent()

      scrollDepths.forEach((threshold) => {
        if (percent >= threshold && !firedDepths.has(threshold)) {
          firedDepths.add(threshold)

          safeTrack('page-scroll-depth', {
            percent: threshold,
          })
        }
      })
    }

    /* -------------------------------------------
     * Section Visibility
     ------------------------------------------- */

    let observer: IntersectionObserver | null = null

    if (trackSections) {
      observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              const id = entry.target.getAttribute('data-track-section') || entry.target.id

              if (id) {
                lastSection = id
              }
            }
          })
        },
        {
          rootMargin: '-40% 0px -40% 0px',
          threshold: 0,
        },
      )

      document.querySelectorAll(sectionSelector).forEach((el) => {
        observer?.observe(el)
      })
    }

    /* -------------------------------------------
     * Drop-off Tracking
     ------------------------------------------- */

    const fireDropoff = () => {
      if (!trackDropoff) return

      safeTrack('page-dropoff', {
        last_section: lastSection,
        max_depth: firedDepths.size ? Math.max(...Array.from(firedDepths)) : 0,
      })
    }

    const handleVisibilityChange = () => {
      if (document.visibilityState === 'hidden') {
        fireDropoff()
      }
    }

    /* -------------------------------------------
     * Wiring
     ------------------------------------------- */

    if (trackClicks) {
      window.addEventListener('click', handleClick)
    }

    if (trackScrollDepth) {
      window.addEventListener('scroll', handleScroll, { passive: true })
    }

    if (trackDropoff) {
      window.addEventListener('beforeunload', fireDropoff)
      window.addEventListener('visibilitychange', handleVisibilityChange)
    }

    /* -------------------------------------------
     * Cleanup
     ------------------------------------------- */

    return () => {
      window.removeEventListener('click', handleClick)
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('beforeunload', fireDropoff)
      window.removeEventListener('visibilitychange', handleVisibilityChange)
      observer?.disconnect()
    }
  }, [
    scrollDepths.join(','),
    sectionSelector,
    trackClicks,
    trackScrollDepth,
    trackSections,
    trackDropoff,
  ])
}

import { Button } from '@/components/ui/button'
import Image from 'next/image'
import { cn } from '@/utilities/ui'

export const SplitBannerComponent = ({ settings, content, image }) => {
  const isDark = settings.theme === 'dark'
  const isRight = settings.imagePosition === 'right'

  return (
    <section
      className={cn(
        'py-16 md:py-24',
        isDark ? 'bg-slate-900 text-white' : 'bg-slate-50 text-slate-900',
      )}
    >
      <div
        className={cn(
          'container flex flex-col md:flex-row items-center gap-12',
          !isRight && 'md:flex-row-reverse', // Flip direction if image is left
        )}
      >
        {/* Text Side */}
        <div className="flex-1 space-y-6">
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight">{content.heading}</h2>
          <p className={cn('text-lg', isDark ? 'text-slate-300' : 'text-muted-foreground')}>
            {content.subtext}
          </p>
          <div className="flex gap-4 pt-4">
            {content.actions?.map((btn, i) => (
              <Button
                key={i}
                variant={btn.style === 'outline' && isDark ? 'secondary' : btn.style} // Adjust variant for dark mode
                size="lg"
                asChild
              >
                <a href={btn?.url}>{btn.label}</a>
              </Button>
            ))}
          </div>
        </div>

        {/* Image Side */}
        <div className="flex-1 relative w-full h-[300px] md:h-[450px]">
          <Image
            src={image?.url}
            alt={image?.alt || content.heading}
            fill
            className="object-contain" // Use contain to match the 3D graphics in your screenshot
          />
        </div>
      </div>
    </section>
  )
}

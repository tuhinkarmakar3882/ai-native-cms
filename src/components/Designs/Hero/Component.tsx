import { Button } from '@/components/ui/button'

export const HeroComponent = ({ title, description, actions }) => (
  <section className="container py-24 text-center">
    <h1 className="text-5xl font-extrabold tracking-tight mb-6">{title}</h1>
    <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-10">{description}</p>
    <div className="flex justify-center gap-4">
      {actions?.map((action, i) => (
        <Button key={i} variant={action.variant} size="lg">
          {action.label}
        </Button>
      ))}
    </div>
  </section>
)

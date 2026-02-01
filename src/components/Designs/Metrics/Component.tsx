import { Card, CardContent } from '@/components/ui/card'

export const MetricsComponent = ({ stats }) => (
  <section className="container py-16">
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats?.map((stat, i) => (
        <Card key={i} className="text-center border-none shadow-none bg-muted/30">
          <CardContent className="pt-6">
            <div className="text-4xl font-extrabold text-primary mb-2">{stat.value}</div>
            <div className="font-semibold text-lg">{stat.label}</div>
            <p className="text-sm text-muted-foreground">{stat.description}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  </section>
)

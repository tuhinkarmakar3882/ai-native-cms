import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export const BentoGridComponent = ({ title, cards, trackId }) => (
  <section className="container py-20" data-track-section={trackId}>
    {title && <h2 className="text-3xl font-bold mb-10">{title}</h2>}
    <div className="grid grid-cols-1 md:grid-cols-3 auto-rows-[200px] gap-4">
      {cards?.map((card, i) => {
        const spanClass =
          card.span === '2' ? 'md:col-span-2' : card.span === 'row-2' ? 'md:row-span-2' : ''
        return (
          <Card
            key={i}
            className={`${spanClass} flex flex-col justify-between overflow-hidden hover:shadow-lg transition-shadow`}
          >
            <CardHeader>
              <CardTitle>{card.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">{card.content}</p>
            </CardContent>
          </Card>
        )
      })}
    </div>
  </section>
)

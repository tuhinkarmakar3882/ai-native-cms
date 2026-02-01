import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

const columnMap = {
  '2': 'md:grid-cols-2',
  '3': 'md:grid-cols-3',
  '4': 'md:grid-cols-4',
}

export const FeatureGridComponent = ({ columns, features }) => (
  <section className="container py-4">
    <div className={`grid gap-6 ${columnMap[columns] || 'md:grid-cols-3'}`}>
      {features?.map((f, i) => (
        <Card key={i}>
          <CardHeader>
            {f.badge && <Badge className="w-fit mb-2">{f.badge}</Badge>}
            <CardTitle>{f.title}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">{f.description}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  </section>
)

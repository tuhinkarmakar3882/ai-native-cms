import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { Check } from 'lucide-react'

export const PricingComponent = ({ heading, plans }) => (
  <section className="container py-20">
    {heading && <h2 className="text-4xl font-bold text-center mb-12">{heading}</h2>}
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      {plans?.map((plan, i) => (
        <Card
          key={i}
          className={`flex flex-col ${plan.isPopular ? 'border-primary shadow-lg scale-105' : ''}`}
        >
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle>{plan.name}</CardTitle>
              {plan.isPopular && <Badge>Popular</Badge>}
            </div>
            <div className="text-3xl font-bold mt-2">{plan.price}</div>
            <CardDescription>{plan.description}</CardDescription>
          </CardHeader>
          <Separator />
          <CardContent className="flex-1 mt-6 space-y-3">
            {plan.features?.map((f, j) => (
              <div key={j} className="flex items-center gap-2">
                <Check className="text-green-500 h-4 w-4" />
                <span className="text-sm">{f.feature}</span>
              </div>
            ))}
          </CardContent>
          <CardFooter>
            <Button className="w-full" variant={plan.isPopular ? 'default' : 'outline'}>
              {plan.buttonText}
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  </section>
)

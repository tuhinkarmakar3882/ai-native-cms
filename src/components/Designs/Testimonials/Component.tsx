import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel'
import { Card, CardContent } from '@/components/ui/card'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Star } from 'lucide-react'

export const TestimonialComponent = ({ title, reviews }) => (
  <section className="container py-20">
    {title && <h2 className="text-3xl font-bold text-center mb-10">{title}</h2>}
    <Carousel className="w-full max-w-4xl mx-auto">
      <CarouselContent>
        {reviews?.map((review, i) => (
          <CarouselItem key={i} className="md:basis-1/2 lg:basis-1/3">
            <div className="p-1">
              <Card>
                <CardContent className="flex flex-col items-center justify-center p-6 text-center gap-4">
                  <div className="flex gap-1 text-yellow-500">
                    {[...Array(review.rating)].map((_, j) => (
                      <Star key={j} size={16} fill="currentColor" />
                    ))}
                  </div>
                  <p className="text-muted-foreground italic">"{review.quote}"</p>
                  <div className="flex items-center gap-3 mt-4">
                    <Avatar>
                      {review.avatar?.url && <AvatarImage src={review.avatar?.url} />}
                      <AvatarFallback>{review.author[0]}</AvatarFallback>
                    </Avatar>
                    <div className="text-left">
                      <p className="text-sm font-semibold">{review.author}</p>
                      <p className="text-xs text-muted-foreground">{review.role}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  </section>
)

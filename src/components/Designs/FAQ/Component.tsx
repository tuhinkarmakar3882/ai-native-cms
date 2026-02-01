import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import RichText from '@/components/RichText'

export const FAQComponent = ({ sectionTitle, title, description, items }) => {
  console.log({
    items,
  })
  return (
    <section className="container py-20 max-w-3xl">
      {sectionTitle && <h2 className="text-3xl font-bold mb-8 text-center">{sectionTitle}</h2>}

      {title && <h4 className="text-xl font-bold">{title}</h4>}
      {description && <p className="text-sm text-muted-foreground mt-4 mb-6">{description}</p>}

      <Accordion type="single" collapsible className="w-full">
        {items?.map((item, i) => (
          <AccordionItem key={i} value={`item-${i}`}>
            <AccordionTrigger className="text-left">{item.question}</AccordionTrigger>
            <AccordionContent>
              <RichText data={item.answer} className="prose dark:prose-invert max-w-none" />
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </section>
  )
}

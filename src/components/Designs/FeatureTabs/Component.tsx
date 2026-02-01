import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import Image from 'next/image'

export const FeatureTabsComponent = ({ heading, tabs }) => (
  <section className="container py-20">
    <div className="text-center mb-12">
      <h2 className="text-3xl font-bold">{heading}</h2>
    </div>
    <Tabs defaultValue="tab-0" className="w-full">
      <div className="flex justify-center mb-8">
        <TabsList>
          {tabs?.map((t, i) => (
            <TabsTrigger key={i} value={`tab-${i}`}>
              {t.label}
            </TabsTrigger>
          ))}
        </TabsList>
      </div>
      {tabs?.map((t, i) => (
        <TabsContent key={i} value={`tab-${i}`} className="mt-0">
          <div className="grid md:grid-cols-2 gap-12 items-center rounded-xl border bg-card p-8 shadow-sm">
            <div className="space-y-4">
              <h3 className="text-2xl font-bold">{t.title}</h3>
              <p className="text-muted-foreground">{t.description}</p>
            </div>
            <div className="relative aspect-video bg-muted rounded-lg overflow-hidden">
              {t.image && <Image src={t.image.url} fill className="object-cover" alt={t.title} />}
            </div>
          </div>
        </TabsContent>
      ))}
    </Tabs>
  </section>
)

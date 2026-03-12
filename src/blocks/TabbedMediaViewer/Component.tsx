'use client'

import { useState } from 'react'

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

import { MediaViewerComponent } from '@/blocks/MediaViewer/Component'

export const TabbedMediaViewerComponent = ({
  title,
  tabs,
  layout = 'sidebar',
  mobileLayout = 'accordion',
  useContainer = false,
}) => {
  const defaultTab = tabs?.[0]?.value || tabs?.[0]?.label
  const [active, setActive] = useState(defaultTab)

  return (
    <section className={useContainer ? 'container' : ''}>
      {title && <h2 className="text-3xl font-semibold tracking-tight mb-8">{title}</h2>}

      {/* MOBILE */}
      <div className="md:hidden">
        {mobileLayout === 'accordion' && (
          <Accordion type="single" collapsible>
            {tabs.map((tab) => {
              const value = tab.value || tab.label

              return (
                <AccordionItem key={value} value={value}>
                  <AccordionTrigger className="text-base font-medium">{tab.label}</AccordionTrigger>

                  <AccordionContent className="pt-4">
                    {tab.media?.map((block, i) =>
                      block.blockType === 'mediaViewer' ? (
                        <MediaViewerComponent key={i} {...block} />
                      ) : null,
                    )}
                  </AccordionContent>
                </AccordionItem>
              )
            })}
          </Accordion>
        )}

        {mobileLayout === 'dropdown' && (
          <div className="space-y-6">
            <Select value={active} onValueChange={setActive}>
              <SelectTrigger>
                <SelectValue placeholder="Select Document" />
              </SelectTrigger>

              <SelectContent>
                {tabs.map((tab) => {
                  const value = tab.value || tab.label

                  return (
                    <SelectItem key={value} value={value}>
                      {tab.label}
                    </SelectItem>
                  )
                })}
              </SelectContent>
            </Select>

            {tabs
              .filter((tab) => (tab.value || tab.label) === active)
              .map((tab) =>
                tab.media?.map((block, i) =>
                  block.blockType === 'mediaViewer' ? (
                    <MediaViewerComponent key={i} {...block} />
                  ) : null,
                ),
              )}
          </div>
        )}

        {mobileLayout === 'tabs' && (
          <Tabs value={active} onValueChange={setActive}>
            <TabsList className="w-full overflow-x-auto">
              {tabs.map((tab) => {
                const value = tab.value || tab.label

                return (
                  <TabsTrigger key={value} value={value}>
                    {tab.label}
                  </TabsTrigger>
                )
              })}
            </TabsList>

            {tabs.map((tab) => {
              const value = tab.value || tab.label

              return (
                <TabsContent key={value} value={value} className="pt-6">
                  {tab.media?.map((block, i) =>
                    block.blockType === 'mediaViewer' ? (
                      <MediaViewerComponent key={i} {...block} />
                    ) : null,
                  )}
                </TabsContent>
              )
            })}
          </Tabs>
        )}
      </div>

      {/* DESKTOP */}
      <div className="hidden md:block">
        <Tabs value={active} onValueChange={setActive}>
          <div className={layout === 'sidebar' ? 'flex gap-10' : 'flex flex-col gap-8'}>
            {/* SIDEBAR */}
            <TabsList
              className={
                layout === 'sidebar'
                  ? 'flex flex-col w-[260px] h-fit bg-transparent p-0 space-y-1'
                  : 'flex'
              }
            >
              {tabs.map((tab) => {
                const value = tab.value || tab.label

                return (
                  <TabsTrigger
                    key={value}
                    value={value}
                    className={
                      layout === 'sidebar'
                        ? `
                        justify-start w-full px-4 py-2 rounded-md
                        data-[state=active]:bg-muted
                        data-[state=active]:font-medium
                        `
                        : ''
                    }
                  >
                    {tab.label}
                  </TabsTrigger>
                )
              })}
            </TabsList>

            {/* CONTENT */}
            <div className="flex-1 min-w-0">
              {tabs.map((tab) => {
                const value = tab.value || tab.label

                return (
                  <TabsContent key={value} value={value}>
                    {tab.media?.map((block, i) =>
                      block.blockType === 'mediaViewer' ? (
                        <MediaViewerComponent key={i} {...block} />
                      ) : null,
                    )}
                  </TabsContent>
                )
              })}
            </div>
          </div>
        </Tabs>
      </div>
    </section>
  )
}

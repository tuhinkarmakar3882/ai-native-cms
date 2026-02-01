export const TimelineComponent = ({ heading, events }) => (
  <section className="container py-20">
    <h2 className="text-3xl font-bold mb-16 text-center">{heading}</h2>
    <div className="relative border-l border-muted ml-4 md:ml-1/2 space-y-12">
      {events?.map((e, i) => (
        <div key={i} className="relative pl-8 md:pl-0">
          <div className="absolute -left-[5px] top-2 h-2.5 w-2.5 rounded-full bg-primary ring-4 ring-background" />

          <div
            className={`md:flex items-center justify-between ${i % 2 === 0 ? 'md:flex-row-reverse' : ''}`}
          >
            <div className="hidden md:block w-5/12" /> {/* Spacer */}
            <div className="md:w-5/12 ml-4">
              <span className="text-sm font-mono text-primary mb-1 block">{e.year}</span>
              <h3 className="text-xl font-bold">{e.title}</h3>
              <p className="text-muted-foreground mt-2">{e.description}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  </section>
)

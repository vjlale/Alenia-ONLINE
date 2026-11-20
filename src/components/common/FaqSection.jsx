import { useId, useState } from 'react'
import { ChevronDown } from 'lucide-react'

/**
 * Preguntas frecuentes en acordeón. El texto sale de src/data/seoPages.js, el mismo
 * que se publica como schema FAQPage en el HTML estático: lo que lee la IA es lo
 * mismo que ve la persona. Los botones miden 48 px de alto como mínimo (táctil).
 */
export default function FaqSection({ items, title = 'Preguntas frecuentes', className = '' }) {
  const baseId = useId()
  const [open, setOpen] = useState(0)
  if (!items?.length) return null

  return (
    <section className={`max-w-3xl mx-auto ${className}`} aria-labelledby={`${baseId}-titulo`}>
      <h2 id={`${baseId}-titulo`} className="text-2xl md:text-3xl font-bold text-white mb-6 text-center">
        {title}
      </h2>
      <div className="space-y-3">
        {items.map(({ q, a }, i) => {
          const expanded = open === i
          const panelId = `${baseId}-p${i}`
          return (
            <div key={q} className="rounded-xl border border-white/10 bg-slate-900/50 overflow-hidden">
              <h3>
                <button
                  type="button"
                  aria-expanded={expanded}
                  aria-controls={panelId}
                  onClick={() => setOpen(expanded ? -1 : i)}
                  className="flex w-full min-h-[48px] items-center justify-between gap-4 px-5 py-4 text-left text-base font-semibold text-white hover:bg-white/5 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
                >
                  {q}
                  <ChevronDown
                    className={`h-5 w-5 shrink-0 text-cyan-400 transition-transform ${expanded ? 'rotate-180' : ''}`}
                    aria-hidden
                  />
                </button>
              </h3>
              <div id={panelId} hidden={!expanded} className="px-5 pb-5 text-alenia-light/80 leading-relaxed">
                {a}
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}

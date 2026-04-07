import { useCallback, useEffect, useId, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import {
  bannerIntroAccordionItems,
  bannerIntroCtaLabel,
  bannerIntroTitle,
} from '../../data/bannerExperienceCopy';

const titleId = 'banner-intro-dialog-title';

export default function BannerExperienceIntroModal({ isOpen, onDismiss }) {
  const reactId = useId();
  const closeBtnRef = useRef(null);
  const [openSection, setOpenSection] = useState(bannerIntroAccordionItems[0]?.id ?? null);

  const handleToggle = useCallback((id) => {
    setOpenSection((prev) => (prev === id ? null : id));
  }, []);

  useEffect(() => {
    if (!isOpen) return;
    const t = requestAnimationFrame(() => closeBtnRef.current?.focus());
    return () => cancelAnimationFrame(t);
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e) => {
      if (e.key === 'Escape') onDismiss();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [isOpen, onDismiss]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          key="banner-intro-overlay"
          role="presentation"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="fixed inset-0 z-[10002] flex items-center justify-center bg-black/75 backdrop-blur-md p-4 sm:p-6"
          aria-hidden={false}
        >
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby={titleId}
            initial={{ opacity: 0, y: 16, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.98 }}
            transition={{ type: 'spring', stiffness: 380, damping: 32 }}
            className="glass-advanced w-full max-w-lg max-h-[min(88vh,640px)] overflow-hidden rounded-2xl border border-alenia-primary/30 shadow-[0_0_40px_rgba(34,211,238,0.12)] box-shadow-card-hover flex flex-col"
          >
            <div className="shrink-0 border-b border-white/10 px-5 pt-5 pb-4">
              <h2 id={titleId} className="text-xl sm:text-2xl font-display font-bold text-white tracking-tight">
                {bannerIntroTitle}
              </h2>
              <p className="mt-2 text-sm text-white/70 font-inter leading-relaxed">
                Así funciona esta pantalla antes de que explores la red.
              </p>
            </div>

            <div className="flex-1 min-h-0 overflow-y-auto px-3 py-3 sm:px-4 sm:py-4 space-y-2">
              {bannerIntroAccordionItems.map((item) => {
                const panelId = `${reactId}-${item.id}-panel`;
                const headerId = `${reactId}-${item.id}-header`;
                const expanded = openSection === item.id;
                return (
                  <div
                    key={item.id}
                    className="rounded-xl border border-white/10 bg-black/25 overflow-hidden transition-colors hover:border-alenia-primary/25"
                  >
                    <button
                      type="button"
                      id={headerId}
                      aria-expanded={expanded}
                      aria-controls={panelId}
                      onClick={() => handleToggle(item.id)}
                      className="flex w-full items-center justify-between gap-3 px-4 py-3 text-left font-inter text-white/95 hover:bg-white/5 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400/60 focus-visible:ring-offset-2 focus-visible:ring-offset-black/40"
                    >
                      <span className="text-sm font-semibold text-cyan-200/95">{item.title}</span>
                      <ChevronDown
                        className={`h-5 w-5 shrink-0 text-cyan-400/80 transition-transform duration-200 ${
                          expanded ? 'rotate-180' : ''
                        }`}
                        aria-hidden
                      />
                    </button>
                    <AnimatePresence initial={false}>
                      {expanded && (
                        <motion.div
                          id={panelId}
                          role="region"
                          aria-labelledby={headerId}
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.22, ease: [0.4, 0, 0.2, 1] }}
                          className="overflow-hidden"
                        >
                          <p className="px-4 pb-3 pt-0 text-sm text-white/75 font-inter leading-relaxed border-t border-white/5">
                            {item.body}
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>

            <div className="shrink-0 border-t border-white/10 p-4 sm:p-5 bg-black/20">
              <button
                ref={closeBtnRef}
                type="button"
                onClick={onDismiss}
                className="w-full rounded-xl bg-gradient-to-r from-cyan-500/90 to-alenia-primary/90 py-3 px-4 text-center text-sm font-semibold text-black font-inter shadow-lg shadow-cyan-500/20 hover:from-cyan-400 hover:to-cyan-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300 focus-visible:ring-offset-2 focus-visible:ring-offset-black transition-all"
              >
                {bannerIntroCtaLabel}
              </button>
              <p className="mt-2 text-center text-xs text-white/45 font-inter">
                Podés volver a ver esta ayuda recargando la página en una nueva sesión del navegador.
              </p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

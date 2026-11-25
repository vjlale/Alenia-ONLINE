import { useEffect, useRef } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import {
  bannerIntroCtaLabel,
  bannerIntroItems,
  bannerIntroTitle,
} from '../../data/bannerExperienceCopy';

const titleId = 'banner-intro-dialog-title';

export default function BannerExperienceIntroModal({ isOpen, onDismiss }) {
  const closeBtnRef = useRef(null);

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
          className="fixed inset-0 z-[10002] flex items-center justify-center bg-black/75 backdrop-blur-md p-4 sm:p-6 overscroll-contain"
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
            className="glass-advanced w-full max-w-md max-h-[88vh] overflow-y-auto rounded-2xl border border-alenia-primary/30 shadow-[0_0_40px_rgba(34,211,238,0.12)] box-shadow-card-hover p-5 sm:p-6"
          >
            <h2 id={titleId} className="text-xl sm:text-2xl font-display font-bold text-white tracking-tight">
              {bannerIntroTitle}
            </h2>

            <dl className="mt-4 space-y-4">
              {bannerIntroItems.map((item) => (
                <div key={item.id}>
                  <dt className="text-sm font-semibold text-cyan-200/95 font-inter">{item.title}</dt>
                  <dd className="mt-1 text-base text-white/85 font-inter leading-relaxed">{item.body}</dd>
                </div>
              ))}
            </dl>

            <button
              ref={closeBtnRef}
              type="button"
              onClick={onDismiss}
              className="mt-6 w-full min-h-[48px] rounded-xl bg-gradient-to-r from-cyan-500/90 to-alenia-primary/90 py-3 px-4 text-center text-sm font-semibold text-black font-inter shadow-lg shadow-cyan-500/20 hover:from-cyan-400 hover:to-cyan-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300 focus-visible:ring-offset-2 focus-visible:ring-offset-black transition-all"
            >
              {bannerIntroCtaLabel}
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

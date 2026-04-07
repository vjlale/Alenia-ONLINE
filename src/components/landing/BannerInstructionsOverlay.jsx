import { bannerCompactHint } from '../../data/bannerExperienceCopy';

/** Recordatorio breve una vez cerrado el modal de introducción (el acordeón ya explicó el detalle). */
export default function BannerInstructionsOverlay() {
  return (
    <div
      className="absolute bottom-4 left-4 z-10 max-w-[min(100%,20rem)] pointer-events-none rounded-xl px-3 py-2 glass-advanced border border-alenia-primary/20 shadow-lg"
      aria-hidden="true"
    >
      <p className="text-xs sm:text-sm text-white/80 font-inter leading-snug">{bannerCompactHint}</p>
    </div>
  );
}

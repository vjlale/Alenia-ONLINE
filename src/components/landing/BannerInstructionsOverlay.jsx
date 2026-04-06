export default function BannerInstructionsOverlay() {
  return (
    <div
      className="absolute bottom-4 left-4 z-10 max-w-[280px] pointer-events-none rounded-xl px-4 py-3 glass-advanced border border-alenia-primary/20 shadow-lg"
      aria-hidden="true"
    >
      <p className="text-sm text-white/90 font-inter leading-relaxed">
        <span className="font-semibold text-cyan-300/90">Nodo central:</span> Toca o mantén pulsado y arrastra para crear un foco que atrae y conecta nodos.
      </p>
      <p className="mt-2 text-sm text-white/80 font-inter leading-relaxed">
        <span className="font-semibold text-cyan-300/80">Scroll:</span> Usa dos dedos en el banner para hacer scroll en la página.
      </p>
    </div>
  );
}

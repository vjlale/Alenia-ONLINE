import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { useRef } from 'react';
import {
  ExternalLink,
  Globe,
  Store,
  Github,
  Presentation,
  Building2
} from 'lucide-react';

const linkConfig = {
  sitio: {
    label: 'Ver sitio',
    icon: Globe
  },
  demo: {
    label: 'Ver demo',
    icon: Presentation
  },
  tienda: {
    label: 'Ver en tienda',
    icon: Store
  },
  repo: {
    label: 'Repositorio',
    icon: Github
  }
};

const tipoStyles = {
  Cliente: 'bg-sky-500/20 text-sky-300 border border-sky-500/30',
  Producto: 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30',
  Proyecto: 'bg-purple-500/20 text-purple-300 border border-purple-500/30'
};

export default function AppCatalogCard({ app, onLinkClick, index = 0 }) {
  const {
    nombre,
    descripcion,
    tipo,
    plataformas = [],
    tecnologias = [],
    estado,
    enfoque = [],
    enlaces = {},
    imagen
  } = app;

  const cardRef = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  
  const mouseXSpring = useSpring(x, { stiffness: 500, damping: 100 });
  const mouseYSpring = useSpring(y, { stiffness: 500, damping: 100 });
  
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["8deg", "-8deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-8deg", "8deg"]);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / rect.width - 0.5;
    const yPct = mouseY / rect.height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  // Debug: Log para verificar rutas de imágenes
  if (imagen && typeof window !== 'undefined') {
    console.log(`Intentando cargar imagen para ${nombre}:`, imagen);
  }

  const availableLinks = Object.entries(enlaces).filter(([, url]) => Boolean(url));
  const hasLinks = availableLinks.length > 0;
  const fallbackGradient = 'bg-gradient-to-br from-alenia-primary/10 via-slate-800/60 to-alenia-secondary/10';

  const handleLinkClick = (event, type, url) => {
    onLinkClick?.(type, app, url);
  };

  return (
    <motion.article
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      whileHover={{ 
        scale: 1.03,
        y: -8,
        transition: { duration: 0.3 }
      }}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
        perspective: 1000
      }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      className="relative flex flex-col overflow-hidden glass-card-hover rounded-3xl border border-white/10 shadow-lg shadow-black/30 card-hover-lift"
    >
      {/* Gradient overlay animado */}
      <div className="absolute inset-0 bg-gradient-animated opacity-0 group-hover:opacity-10 transition-opacity duration-500 pointer-events-none z-0" />
      <div className="relative h-48 overflow-hidden">
        {imagen ? (
          <>
            <img
              src={imagen}
              alt={`Previsualización de ${nombre}`}
              className="h-full w-full object-cover"
              loading="lazy"
              decoding="async"
              onError={(e) => {
                // Intentar fallback a SVG si PNG falla
                const pngPath = imagen;
                const svgPath = pngPath.replace(/\.png$/i, '.svg');
                
                if (e.target.src !== svgPath && svgPath !== pngPath) {
                  console.log(`PNG no encontrado (${pngPath}), intentando SVG: ${svgPath}`);
                  e.target.src = svgPath;
                } else {
                  // Si SVG también falla, mostrar placeholder
                  console.error(`Error cargando imagen: ${imagen} para ${nombre}`);
                  e.target.style.display = 'none';
                  if (e.target.nextElementSibling) {
                    e.target.nextElementSibling.style.display = 'flex';
                  }
                }
              }}
            />
            <div
              className={`hidden h-full w-full items-center justify-center ${fallbackGradient}`}
            >
              <Building2 className="h-12 w-12 text-white/40" />
            </div>
          </>
        ) : (
          <div
            className={`flex h-full w-full items-center justify-center ${fallbackGradient}`}
          >
            <Building2 className="h-12 w-12 text-white/40" />
          </div>
        )}

        {estado && (
          <span className="absolute right-4 top-4 rounded-full border border-white/10 bg-black/60 px-3 py-1 text-xs font-medium uppercase tracking-wide text-white/80 backdrop-blur">
            {estado}
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col gap-6 p-6 relative z-10">
        <header className="flex flex-col gap-4">
          <div className="flex flex-wrap items-center gap-3">
            {tipo && (
              <span className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wide ${tipoStyles[tipo] ?? tipoStyles.Producto}`}>
                {tipo}
              </span>
            )}

            {enfoque.slice(0, 2).map((tag) => (
              <span
                key={tag}
                className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium text-white/70"
              >
                {tag}
              </span>
            ))}
          </div>

          <h3 className="text-2xl font-semibold text-white">{nombre}</h3>
          <p className="text-sm leading-relaxed text-white/70">{descripcion}</p>
        </header>

        <section className="flex flex-wrap gap-4">
          <div className="flex flex-1 min-w-[180px] flex-col gap-2">
            <h4 className="text-xs font-semibold uppercase tracking-wide text-white/60">Plataformas</h4>
            <div className="flex flex-wrap gap-2">
              {plataformas.map((plataforma) => (
                <span
                  key={plataforma}
                  className="rounded-full bg-white/10 px-3 py-1 text-xs font-medium text-white/80"
                >
                  {plataforma}
                </span>
              ))}
            </div>
          </div>

          <div className="flex flex-1 min-w-[220px] flex-col gap-2">
            <h4 className="text-xs font-semibold uppercase tracking-wide text-white/60">Tecnologías clave</h4>
            <div className="flex flex-wrap gap-2">
              {tecnologias.slice(0, 6).map((tech) => (
                <span
                  key={tech}
                  className="rounded-full border border-white/15 px-3 py-1 text-xs text-white/70"
                >
                  {tech}
                </span>
              ))}
              {tecnologias.length > 6 && (
                <span className="rounded-full bg-white/5 px-3 py-1 text-xs text-white/60">
                  +{tecnologias.length - 6} más
                </span>
              )}
            </div>
          </div>
        </section>

        <footer className="mt-auto flex flex-wrap items-center gap-3 pt-2">
          {hasLinks ? (
            availableLinks.map(([type, url]) => {
              const config = linkConfig[type] ?? linkConfig.sitio;
              const Icon = config.icon ?? ExternalLink;

              return (
                <a
                  key={type}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(event) => handleLinkClick(event, type, url)}
                  className="group inline-flex items-center gap-2 rounded-full border border-alenia-primary/40 bg-alenia-primary/10 px-4 py-2 text-sm font-medium text-alenia-primary transition-all hover:-translate-y-0.5 hover:bg-alenia-primary/20"
                >
                  <Icon className="h-4 w-4" />
                  {config.label}
                  <ExternalLink className="h-4 w-4 opacity-0 transition-opacity group-hover:opacity-100" />
                </a>
              );
            })
          ) : (
            <span className="text-xs text-white/50">
              Disponibilidad bajo contacto personalizado.
            </span>
          )}
        </footer>
      </div>
    </motion.article>
  );
}


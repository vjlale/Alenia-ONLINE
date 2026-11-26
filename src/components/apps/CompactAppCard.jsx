import { motion } from 'framer-motion';
import {
  ArrowUpRight,
  MessageCircle,
  Radar,
  CalendarCheck,
  SearchCheck,
  Contact,
  FileCog,
  CalendarClock,
  Trees,
  Calculator,
  Trophy,
  MonitorPlay,
  PenTool,
  Baby,
  UtensilsCrossed,
  Stethoscope,
  Hammer,
  ShoppingBag,
  Palette,
  Layers,
  HeartHandshake,
  Megaphone,
  QrCode,
  Medal,
  Store,
  Database,
  Sparkles,
  Box,
} from 'lucide-react';

// Íconos que usa src/data/catalogo.js (importados uno por uno para no cargar toda la librería).
const ICONS = { Radar, CalendarCheck, SearchCheck, Contact, FileCog, CalendarClock, Trees, Calculator, Trophy, MonitorPlay, PenTool, Baby, UtensilsCrossed, Stethoscope, Hammer, ShoppingBag, Palette, Layers, HeartHandshake, Megaphone, QrCode, Medal, Store, Database, Sparkles, Box };

// Número de WhatsApp de ALENIA (el mismo que usaba /desarrollos-ia).
const WHATSAPP_NUMBER = '5493516875178';

// Estados del catálogo unificado: cada uno con su color para que se distingan de un vistazo.
const ESTADOS = {
  disponible: { label: 'Disponible', dot: '#00ff88', ring: 'rgba(0,255,136,0.35)' },
  beta: { label: 'Beta · pedí acceso', dot: '#f5b942', ring: 'rgba(245,185,66,0.4)' },
  proximamente: { label: 'Próximamente', dot: '#9aa0ab', ring: 'rgba(154,160,171,0.35)' },
};

const whatsappLink = (texto) => `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(texto)}`;

/**
 * Tarjeta chica del catálogo de /apps (estantes "Más productos" y "Hecho a medida").
 * Mismo lenguaje visual que AppShowcaseCard: fondo navy, color propio de la app solo en el
 * ícono, la categoría y el título del pitch, y un único botón principal en verde ALENIA.
 * - item.url: si existe, el botón abre la app ("Probar"). Si no, el botón abre WhatsApp.
 * - variante 'medida': el botón siempre es "Quiero algo así" (WhatsApp con el nombre del caso).
 */
export default function CompactAppCard({ item, index = 0, variante = 'producto' }) {
  const { nombre, pitch, descripcion, categoria, plataformas = [], estado = 'disponible', color = '#00ff88', icono, url } = item;
  const Icon = ICONS[icono] || Box;
  const est = ESTADOS[estado] || ESTADOS.disponible;

  let cta;
  if (variante === 'medida') {
    cta = { label: 'Quiero algo así', href: whatsappLink(`Hola ALENIA, quiero algo como "${nombre}"`), whatsapp: true };
  } else if (url && estado === 'disponible') {
    cta = { label: `Probar ${nombre}`, short: 'Probar', href: url };
  } else if (url) {
    cta = { label: `Pedir acceso a ${nombre}`, short: 'Pedí acceso', href: whatsappLink(`Hola ALENIA, quiero acceso a ${nombre}`), whatsapp: true };
  } else {
    cta = { label: `Consultar por ${nombre}`, short: estado === 'beta' ? 'Pedí acceso' : estado === 'proximamente' ? 'Avisame' : 'Pedí una demo', href: whatsappLink(`Hola ALENIA, quiero saber más de ${nombre}`), whatsapp: true };
  }

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.4, delay: Math.min(index, 6) * 0.04 }}
      className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-[#0d1424] via-[#0a0f1a] to-black p-6 transition-colors hover:border-white/20"
    >
      <div
        className="pointer-events-none absolute -right-20 -top-20 h-48 w-48 rounded-full opacity-25 blur-3xl"
        style={{ background: `radial-gradient(circle, ${color}, transparent 70%)` }}
      />

      <div className="relative mb-4 flex items-start justify-between gap-3">
        <div
          className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl"
          style={{ backgroundColor: `${color}1f`, color }}
          aria-hidden="true"
        >
          <Icon className="h-5 w-5" />
        </div>
        <span
          className="inline-flex items-center gap-1.5 whitespace-nowrap rounded-full border bg-black/40 px-2.5 py-1 text-xs font-medium text-white/80"
          style={{ borderColor: est.ring }}
        >
          <span className="h-2 w-2 rounded-full" style={{ backgroundColor: est.dot }} />
          {variante === 'medida' ? 'Hecho a medida' : est.label}
        </span>
      </div>

      <span className="relative mb-2 text-xs font-semibold" style={{ color }}>
        {categoria}
      </span>
      <h3 className="relative font-display text-2xl font-extrabold leading-tight text-white">{nombre}</h3>
      {pitch && (
        <p className="relative mt-1 text-[15px] font-medium leading-snug" style={{ color }}>
          {pitch}
        </p>
      )}
      <p className="relative mt-3 text-sm leading-relaxed text-white/70">{descripcion}</p>

      {plataformas.length > 0 && (
        <div className="relative mt-4 flex flex-wrap gap-1.5">
          {plataformas.map((p) => (
            <span key={p} className="rounded-md bg-white/[0.07] px-2 py-0.5 text-xs text-white/75">
              {p}
            </span>
          ))}
        </div>
      )}

      <div className="relative mt-auto pt-6">
        <a
          href={cta.href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`${cta.label} (abre en otra pestaña)`}
          className={
            'inline-flex h-11 items-center gap-2 rounded-xl px-5 text-sm font-semibold transition-colors ' +
            (cta.whatsapp
              ? 'border border-alenia-primary/50 text-alenia-primary hover:bg-alenia-primary/10'
              : 'bg-alenia-primary text-black hover:bg-alenia-primary/90')
          }
        >
          {cta.whatsapp ? <MessageCircle className="h-4 w-4" /> : null}
          {cta.short || cta.label}
          {!cta.whatsapp ? <ArrowUpRight className="h-4 w-4" /> : null}
        </a>
      </div>
    </motion.article>
  );
}

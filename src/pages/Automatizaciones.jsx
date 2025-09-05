// Página de Automatizaciones
import { Helmet } from 'react-helmet-async';

export default function Automatizaciones() {
  return (
    <>
      <Helmet>
        <title>Automatizaciones Inteligentes para tu Negocio | Alen.ia</title>
        <meta name="description" content="Implementamos automatizaciones con IA y low-code para reducir costos, escalar operaciones y acelerar tus procesos." />
        <link rel="canonical" href="https://alenia.online/automatizaciones" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://alenia.online/automatizaciones" />
        <meta property="og:title" content="Automatizaciones Inteligentes para tu Negocio | Alen.ia" />
        <meta property="og:description" content="Automatiza tareas clave, integra sistemas y gana eficiencia con ALENIA." />
        <meta property="og:image" content="https://alenia.online/images/Alenia1.png" />
        <meta property="og:image:alt" content="ALENIA - Resultados con Inteligencia" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://alenia.online/automatizaciones" />
        <meta property="twitter:title" content="Automatizaciones Inteligentes para tu Negocio | Alen.ia" />
        <meta property="twitter:description" content="Automatiza tareas clave, integra sistemas y gana eficiencia con ALENIA." />
        <meta property="twitter:image" content="https://alenia.online/images/Alenia1.png" />
      </Helmet>
      <main className="font-inter min-h-screen bg-slate-900 box-shadow-brand">
      <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 text-center">Automatizaciones</h1>
      <p className="text-xl text-white max-w-3xl mx-auto mb-12 text-center">Descubre cómo la automatización puede transformar tu empresa.</p>
      <section className="max-w-2xl mx-auto bg-brand-primary rounded-xl box-shadow-card border border-brand p-8">
        <h2 className="text-xl font-bold text-white mb-3">¿Qué puedes automatizar?</h2>
        <ul className="text-gray-600 text-lg leading-relaxed list-disc pl-5">
          <li>✔️ Respuestas automáticas en WhatsApp y redes sociales</li>
          <li>✔️ Envío de emails y recordatorios</li>
          <li>✔️ Procesos de ventas y seguimiento de clientes</li>
          <li>✔️ Reportes y análisis automáticos</li>
          <li>✔️ Integración entre apps y sistemas</li>
        </ul>
        <p className="mt-6 text-white">Solicita una demo personalizada y lleva tu negocio al siguiente nivel.</p>
      </section>
    </main>
    </>
  );
}

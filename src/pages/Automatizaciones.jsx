// Página de Automatizaciones
export default function Automatizaciones() {
  return (
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
  );
}

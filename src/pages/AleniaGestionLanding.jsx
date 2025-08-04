// Landing para ALENIA GESTIÓN

export default function AleniaGestionLanding() {
  return (
    <main className="font-inter min-h-screen bg-gradient-to-br from-fuchsia-700 via-pink-500 to-fuchsia-400 text-black flex items-center justify-center py-10">
      <section className="max-w-xl w-full mx-auto p-8 bg-white/95 rounded-2xl shadow-2xl flex flex-col items-center">
        <img src="/images/logo-alenia.svg" alt="Logo Alen.iA" className="w-28 mb-6" />
        <h1 className="text-3xl font-extrabold text-fuchsia-700 mb-2">ALENIA GESTIÓN</h1>
        <h2 className="text-xl font-semibold text-[#00ff88] mb-4 text-center">Sistema Integral de Gestión de Stock y Ventas</h2>
        <p className="my-6 text-center">
          Solución moderna y completa para la gestión de inventario y ventas, diseñada para pequeños y medianos negocios. Interfaz intuitiva, IA para sugerencias y reportes inteligentes.
        </p>
        <ul className="mb-6 pl-5 text-base space-y-2 text-left w-full">
          <li>🛍️ <b>Sistema de Ventas</b>: Carrito, múltiples formas de pago, IVA automático</li>
          <li>📦 <b>Gestión de Inventario</b>: Control de productos, stock, precios y categorías</li>
          <li>📊 <b>Reportes Inteligentes</b>: Análisis por fechas, productos y marcas</li>
          <li>🤖 <b>Centro de IA</b>: Sugerencias automáticas, alertas de stock bajo, análisis predictivo</li>
          <li>🎁 <b>Sistema de Ofertas</b>: Promociones, descuentos y precios especiales</li>
        </ul>
        <a href="https://github.com/vjlale/ALENIA-GESTION/releases" target="_blank" rel="noopener" className="inline-block bg-[#00ff88] text-black font-bold py-3 px-8 rounded-lg no-underline mb-4 hover:bg-[#00e676] transition-colors">Descargar App</a>
        <div className="text-sm text-gray-600 mb-3 text-center">
          <b>Requisitos:</b> Windows 10/11, 4GB RAM, 100MB disco, 1280x720px<br />
          <b>Licencia:</b> MIT | <a href="https://github.com/vjlale/ALENIA-GESTION" target="_blank" rel="noopener" className="underline">Ver código fuente</a>
        </div>
        <div className="text-sm text-gray-600 text-center">
          <b>Soporte:</b> <a href="mailto:alenia.online@gmail.com" className="underline">alenia.online@gmail.com</a> | <a href="https://github.com/vjlale/ALENIA-GESTION/issues" target="_blank" rel="noopener" className="underline">Reportar problema</a>
        </div>
      </section>
    </main>
  );
}

// Página especial para Gestión Kontrol+

export default function GestionKontrolPlus() {
  return (
    <main className="font-inter min-h-screen bg-brand-gradient text-white py-8 flex items-center justify-center box-shadow-brand">
      <section className="max-w-2xl w-full mx-auto bg-brand-primary/90 rounded-2xl box-shadow-card border border-brand flex flex-col items-center p-8 md:p-12">
        <h1 className="text-3xl font-extrabold mb-3 text-[#00ff88]">Gestión Kontrol+</h1>
        <h2 className="text-xl font-semibold mb-4 text-white text-center">Plataforma avanzada de gestión y control empresarial</h2>
        <p className="my-6 text-center text-gray-200">
          Solución integral para la administración de inventarios, ventas, compras y reportes. Ideal para empresas que buscan control total y eficiencia.
        </p>
        <ul className="mb-6 pl-5 text-base space-y-2 text-left w-full">
          <li>📦 <b>Inventario avanzado</b>: Multi-depósito, lotes, alertas y trazabilidad</li>
          <li>💳 <b>Ventas y compras</b>: Facturación, cuentas corrientes, integración bancaria</li>
          <li>📈 <b>Reportes en tiempo real</b>: Dashboards, KPIs y exportación a Excel</li>
          <li>🔗 <b>Integraciones</b>: API, e-commerce, sistemas contables</li>
          <li>🔒 <b>Seguridad</b>: Usuarios, permisos y auditoría</li>
        </ul>
        <a href="#" className="inline-block bg-[#00ff88] text-black font-bold py-3 px-8 rounded-lg no-underline mb-4 hover:bg-[#00e676] transition-colors">Solicitar demo</a>
        <div className="text-sm text-gray-300 mb-4">
          <b>Soporte:</b> <a href="mailto:alenia.online@gmail.com" className="text-[#00ff88] underline">alenia.online@gmail.com</a>
        </div>
      </section>
    </main>
  );
}

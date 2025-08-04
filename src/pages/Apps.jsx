import { Link } from 'react-router-dom';

// Apps y herramientas
const apps = [
  {
    name: 'Calculadora de ROI',
    desc: 'Calcula el retorno de inversión de tus campañas y proyectos.',
    link: '/apps/calculadora-roi',
  },
  {
    name: 'Analizador de Competencia',
    desc: 'Compara tu negocio con la competencia usando IA.',
    link: '/apps/analizador-competencia',
  },
  {
    name: 'Generador de Hashtags',
    desc: 'Obtén hashtags relevantes y optimizados para tus publicaciones.',
    link: '/apps/generador-hashtags',
  },
  {
    name: 'Simulador de Automatizaciones',
    desc: 'Visualiza y prueba automatizaciones para tu empresa.',
    link: '/apps/simulador-automatizaciones',
  },
];

export default function Apps() {
  return (
    <main className="font-inter min-h-screen bg-brand-primary box-shadow-brand">
      <h1 className="text-center text-3xl md:text-4xl text-purple-400 font-bold mb-6">Apps y Herramientas</h1>
      <p className="text-center text-cyan-400 font-bold mb-10">Soluciones digitales para potenciar tu negocio.</p>
      <section className="flex flex-wrap justify-center gap-8">
        {apps.map((app, idx) => (
          <div key={app.route} className="bg-brand-primary rounded-2xl p-8 box-shadow-card glow-btn border border-brand transition-all duration-300 flex flex-col items-center">
            <h2 className="text-xl font-bold mb-3 text-center">{app.name}</h2>
            <p className="text-blue-400 mb-4 text-center">{app.desc}</p>
            <Link to={app.link} className="bg-[#02ff00] btn- py-2 px-6 rounded-lg text-base no-underline hover:bg-[#00e695] transition-colors">Ver más</Link>
          </div>
        ))}
      </section>
    </main>
  );
}

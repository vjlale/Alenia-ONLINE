import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { soluciones, formularios } from '../data/solucionesData';
import { ArrowLeft, Check } from 'lucide-react';
import { useState } from 'react';

// El mismo formulario que usábamos antes, ahora dentro de esta página
function ContactForm({ config }) {
    const [form, setForm] = useState({});
    const [enviado, setEnviado] = useState(false);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setEnviado(true);
    };

    if (enviado) {
        return (
            <div className="text-center py-12 bg-slate-800/50 rounded-lg">
                <h3 className="text-2xl font-bold text-green-400 mb-4">¡Solicitud Enviada!</h3>
                <p className="text-white whitespace-pre-line">{config.agradecimiento}</p>
            </div>
        );
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-6 bg-slate-800/50 p-8 rounded-2xl border border-slate-700">
            <div>
                <h2 className="text-2xl font-bold text-cyan-400 mb-2">{config.titulo}</h2>
                <p className="text-slate-300 mb-4">{config.subtitulo}</p>
            </div>
            {config.campos.map((campo, idx) => (
                <div key={idx} className="space-y-1">
                    <label className="block text-slate-300 font-semibold">{campo.label}{campo.required && ' *'}</label>
                    {campo.type === 'textarea' ? (
                        <textarea name={campo.name} id={campo.name} required={campo.required} onChange={handleChange} className="w-full p-3 rounded-lg bg-slate-900 border border-slate-700 text-white focus:ring-2 focus:ring-cyan-500 transition" />
                    ) : (
                        <input type={campo.type} name={campo.name} id={campo.name} required={campo.required} onChange={handleChange} className="w-full p-3 rounded-lg bg-slate-900 border border-slate-700 text-white focus:ring-2 focus:ring-cyan-500 transition" />
                    )}
                    {campo.help && <p className="text-xs text-slate-500 mt-1">{campo.help}</p>}
                </div>
            ))}
            <button type="submit" className="bg-cyan-500 hover:bg-cyan-600 text-white font-bold px-8 py-3 rounded-xl transition-all duration-300 w-full shadow-lg shadow-cyan-500/20">
                {config.textoBoton}
            </button>
        </form>
    );
}

export default function ServiceDetail() {
    const { id } = useParams();
    const solucion = soluciones.find(s => s.id === parseInt(id));

    if (!solucion) {
        return <div className="text-center py-20 text-white">Solución no encontrada.</div>;
    }

    const { icon, nombre, subtitulo, descripcion, incluye, color } = solucion;
    const formConfig = formularios[id];

    const colors = {
        blue: { text: 'text-blue-400', border: 'border-blue-500/50' },
        green: { text: 'text-green-400', border: 'border-green-500/50' },
        purple: { text: 'text-purple-400', border: 'border-purple-500/50' },
        orange: { text: 'text-orange-400', border: 'border-orange-500/50' },
        indigo: { text: 'text-indigo-400', border: 'border-indigo-500/50' },
    };
    const theme = colors[color] || colors.blue;

    return (
        <main className="min-h-screen bg-slate-900 py-20">
            <Helmet>
                <title>{`${nombre} - ${subtitulo} | Alen.ia`}</title>
                <meta name="description" content={descripcion} />
                <link rel="canonical" href={`https://alenia.online/soluciones/detalle/${id}`} />
                <meta property="og:type" content="website" />
                <meta property="og:url" content={`https://alenia.online/soluciones/detalle/${id}`} />
                <meta property="og:title" content={`${nombre} - ${subtitulo} | Alen.ia`} />
                <meta property="og:description" content={descripcion} />
                <meta property="og:image" content="https://alenia.online/images/Alenia1.png" />
                <meta property="og:image:alt" content="ALENIA - Resultados con Inteligencia" />
                <meta property="og:image:width" content="1200" />
                <meta property="og:image:height" content="630" />
                <meta property="twitter:card" content="summary_large_image" />
                <meta property="twitter:url" content={`https://alenia.online/soluciones/detalle/${id}`} />
                <meta property="twitter:title" content={`${nombre} - ${subtitulo} | Alen.ia`} />
                <meta property="twitter:description" content={descripcion} />
                <meta property="twitter:image" content="https://alenia.online/images/Alenia1.png" />
            </Helmet>
            <div className="container mx-auto px-6">
                <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
                    <Link to="/soluciones" className="inline-flex items-center gap-2 text-cyan-400 hover:text-cyan-300 transition-colors mb-8">
                        <ArrowLeft className="w-5 h-5" />
                        Volver a todas las soluciones
                    </Link>
                </motion.div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                    <motion.div initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.7 }}>
                        <div className="sticky top-20">
                            <div className="flex items-center gap-4 mb-4">
                                <img src={icon} alt={`Icono de ${nombre}`} className="w-16 h-16" />
                                <div>
                                    <h1 className={`text-4xl font-bold text-white`}>{nombre}</h1>
                                    <p className={`text-2xl font-semibold ${theme.text}`}>{subtitulo}</p>
                                </div>
                            </div>
                            <p className="text-lg text-slate-300 mt-4 mb-6">{descripcion}</p>
                            
                            <div className={`p-6 rounded-lg bg-slate-800/50 border ${theme.border}`}>
                                <h3 className="font-semibold text-white mb-4 text-xl">¿Qué incluye esta solución?</h3>
                                <ul className="space-y-3">
                                    {incluye.map((item, i) => (
                                        <li key={i} className="flex items-start gap-3 text-slate-300">
                                            <Check className={`w-5 h-5 mt-1 ${theme.text} flex-shrink-0`} />
                                            <span>{item}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </motion.div>

                    <motion.div initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.7, delay: 0.2 }}>
                        <ContactForm config={formConfig} />
                    </motion.div>
                </div>
            </div>
        </main>
    );
}
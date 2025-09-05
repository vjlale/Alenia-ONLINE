import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom'; // Importar Link
import '../styles/KontrolPlusLanding.css';
import crmService from '../services/crmService';
import emailJSService from '../services/emailJSService';

const KontrolPlusLanding = () => {
  useEffect(() => {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in-up');
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

    document.querySelectorAll('.screen-item, .feature-card, .benefit-item').forEach(el => {
        observer.observe(el);
    });
  }, []);

  const [lead, setLead] = useState({ nombre: '', email: '', rubro: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
    const [confirmVisible, setConfirmVisible] = useState(false);
    const [downloadOpened, setDownloadOpened] = useState(false);
    const DOWNLOAD_URL = import.meta.env.VITE_KONTROL_DOWNLOAD_URL || 'https://github.com/vjlale/KONTROL-By-Alenia/releases/download/v3.0.0/KONTROL+_v3.0_Release.zip';

  const handleLeadChange = (e) => {
    const { name, value } = e.target;
    setLead(prev => ({ ...prev, [name]: value }));
  };

    const handleLeadSubmit = async (e) => {
        e.preventDefault();
        setSubmitStatus(null);
        setIsSubmitting(true);
        try {
            // Intentamos registrar en el CRM, pero no bloqueamos la descarga si falla
            try {
                await crmService.createLead({ nombre: lead.nombre, email: lead.email, rubro: lead.rubro });
            } catch (crmErr) {
                // Registrar para diagnóstico pero continuar
                console.warn('No se pudo registrar en CRM (continuando con descarga):', crmErr);
            }

            // Intentamos enviar también por EmailJS (si falla, lo registramos y seguimos)
            try {
                const emailData = {
                    nombre: lead.nombre,
                    email: lead.email,
                    rubro: lead.rubro,
                    servicio: 'ALEN.IA Gestión Kontrol+',
                    descripcion: 'Solicitud de descarga de ALEN.IA Gestión Kontrol+ v3.0.0',
                    categoria: 'contacto-general'
                };
                await emailJSService.sendServiceForm(emailData, { categoria: 'contacto-general' });
            } catch (emailErr) {
                console.warn('No se pudo enviar EmailJS (continuando con descarga):', emailErr);
            }

            // Doble confirmación: intentamos abrir en nueva pestaña y mostramos panel con enlaces alternativos
            const win = window.open(DOWNLOAD_URL, '_blank', 'noopener,noreferrer');
            setDownloadOpened(!!win);
            setConfirmVisible(true);
            setSubmitStatus('success');
        } catch (err) {
            console.error('Error inesperado durante el proceso de descarga:', err);
            setSubmitStatus('error');
        } finally {
            setIsSubmitting(false);
        }
    };

  return (
    <>
      <Helmet>
    <title>ALEN.IA Gestión Kontrol+ — Software de Gestión Inteligente</title>
    <link rel="canonical" href="https://alenia.online/kontrol-plus" />
    <meta name="description" content="Software inteligente para controlar ventas y stock. Funciona offline, con reportes, ofertas y análisis con IA. Gratis para Windows 10/11." />
    {/* Open Graph */}
    <meta property="og:type" content="website" />
    <meta property="og:site_name" content="ALENIA" />
    <meta property="og:url" content="https://alenia.online/kontrol-plus" />
    <meta property="og:title" content="ALEN.IA Gestión Kontrol+ — Software de Gestión Inteligente" />
    <meta property="og:description" content="Gestioná ventas y stock con un software moderno que funciona offline. Reportes, ofertas y análisis con IA. Descarga gratuita." />
    <meta property="og:image" content="https://alenia.online/images/7.png?v=2" />
    <meta property="og:image:secure_url" content="https://alenia.online/images/7.png?v=2" />
    <meta property="og:image:type" content="image/png" />
    <meta property="og:image:width" content="1200" />
    <meta property="og:image:height" content="630" />
    <meta property="og:image:alt" content="ALENIA - Gestión Kontrol+" />
    {/* Twitter */}
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:url" content="https://alenia.online/kontrol-plus" />
    <meta name="twitter:title" content="ALEN.IA Gestión Kontrol+ — Software de Gestión Inteligente" />
    <meta name="twitter:description" content="Gestioná ventas y stock con un software moderno que funciona offline. Reportes, ofertas y análisis con IA. Descarga gratuita." />
    <meta name="twitter:image" content="https://alenia.online/images/7.png?v=2" />
    <meta name="twitter:image:alt" content="ALENIA - Gestión Kontrol+" />
      </Helmet>
      
      <div className="landing-body">
        <header className="header">
            <div className="nav-container">
                <Link to="/" className="back-to-home-button header-back-button" aria-label="Volver al Inicio">Volver al Inicio</Link>
                <nav>
                    <ul className="nav-menu">
                        <li><a href="#inicio">Inicio</a></li>
                        <li><a href="#funcionalidades">Funcionalidades</a></li>
                        <li><a href="#pantallas">Pantallas</a></li>
                        <li><a href="#beneficios">Beneficios</a></li>
                        <li><a href="#descargar">Descargar</a></li>
                    </ul>
                </nav>
            </div>
        </header>

        <section id="inicio" className="hero">
            <div className="hero-content fade-in-up">
                <img src="/images/7.png" alt="Logo KONTROL+" style={{ maxWidth: '400px', margin: '0 auto 1.5rem' }} />
                <p>Software Inteligente para el control de VENTAS Y STOCK.</p>
                <a href="#descargar" className="cta-button">🚀 Descargar Gratis</a>
            </div>
        </section>

        <section id="funcionalidades" className="features">
            <div className="container">
                <h2 className="section-title">Funcionalidades Principales</h2>
                <p className="section-subtitle">Todo lo que necesitas para gestionar tu negocio de manera profesional</p>
                <div className="features-grid">
                    {/* Feature Cards */}
                    <div className="feature-card">
                        <div className="feature-icon">🛍️</div>
                        <h3>Sistema de Ventas</h3>
                        <p>Carrito de compras moderno con múltiples formas de pago, cálculo automático de IVA y sistema de ofertas integrado.</p>
                    </div>
                    <div className="feature-card">
                        <div className="feature-icon">📦</div>
                        <h3>Gestión de Inventario</h3>
                        <p>Control completo de stock, carga masiva por CSV, categorización por marca/color/talle y alertas de stock bajo.</p>
                    </div>
                    <div className="feature-card">
                        <div className="feature-icon">📊</div>
                        <h3>Reportes y Análisis</h3>
                        <p>Reportes detallados por fechas, productos y formas de pago. Cierre de caja automático con exportación a CSV.</p>
                    </div>
                    <div className="feature-card">
                        <div className="feature-icon">🤖</div>
                        <h3>Inteligencia Artificial</h3>
                        <p>Sugerencias de reposición, análisis de tendencias, alertas predictivas y optimización automática de precios.</p>
                    </div>
                    <div className="feature-card">
                        <div className="feature-icon">🎁</div>
                        <h3>Sistema de Ofertas</h3>
                        <p>Ofertas 3x2, 2x1, descuentos por porcentaje, precios especiales y aplicación automática en el carrito.</p>
                    </div>
                    <div className="feature-card">
                        <div className="feature-icon">💾</div>
                        <h3>Sin Internet Requerido</h3>
                        <p>Funciona completamente offline. Tus datos siempre seguros y bajo tu control en tu propio equipo.</p>
                    </div>
                </div>
            </div>
        </section>

        <section id="pantallas" className="screens">
            <div className="container">
                <h2 className="section-title">Recorrido por las Pantallas</h2>
                <p className="section-subtitle">Descubre cada funcionalidad del software paso a paso</p>
                
                {/* Screen Items */}
                <ScreenItem title="🏠 Pantalla Principal" description="La pantalla de inicio te da acceso rápido a todas las funciones principales del software con un diseño moderno y intuitivo." features={['Acceso directo a Nueva Venta', 'Consulta rápida de Ventas del Día', 'Entrada al Menú de Gestión']} imgSrc="/images/screenshot/PRINCIPAL.jpeg" alt="Pantalla Principal" />
                <ScreenItem title="💰 Nueva Venta" description="Sistema completo de ventas con carrito de compras, autocompletado de productos y cálculos automáticos de totales e IVA." features={['Autocompletado inteligente', 'Carrito de compras dinámico', 'Cálculo automático de IVA']} imgSrc="/images/screenshot/NUEVA VENTA.jpeg" alt="Nueva Venta" reverse />
                <ScreenItem title="📊 Ventas del Día" description="Resumen completo de todas las ventas del día actual con totales por forma de pago y opción de cierre de caja." features={['Lista detallada de ventas', 'Totales por forma de pago', 'Cierre de caja automático']} imgSrc="/images/screenshot/pantalla ventas del dia.png" alt="Ventas del Día" />
                <ScreenItem title="⚙️ Menú de Gestión" description="Centro de control con todas las herramientas administrativas organizadas en categorías para fácil acceso." features={['Gestión de productos', 'Reportes avanzados', 'Sistema de ofertas']} imgSrc="/images/screenshot/PANTALLA MENU.png" alt="Menú de Gestión" reverse />
                <ScreenItem title="📝 Alta de Producto" description="Formulario intuitivo para agregar nuevos productos con cálculo automático de precios y validación en tiempo real." features={['Cálculo automático de precios', 'Validación visual', 'Tooltips explicativos']} imgSrc="/images/screenshot/AGREGAR NUEVO PRODUCTO.jpeg" alt="Alta de Producto" />
                <ScreenItem title="📋 Inventario" description="Vista completa del inventario con búsqueda avanzada, filtros, ordenamiento y acciones masivas sobre productos." features={['Búsqueda y filtros avanzados', 'Resaltado de stock bajo', 'Edición masiva']} imgSrc="/images/screenshot/INVENTARIO.jpeg" alt="Inventario" reverse />
                <ScreenItem title="📂 Carga Masiva" description="Importación masiva de productos desde archivos CSV con validación automática y descarga de plantilla modelo." features={['Descarga de plantilla CSV', 'Validación automática de datos', 'Previsualización de importación']} imgSrc="/images/screenshot/REPORTES.jpeg" alt="Carga Masiva" />
                <ScreenItem title="📈 Reportes Avanzados" description="Sistema completo de reportes con filtros por fechas, productos, formas de pago y exportación de resultados." features={['Filtros por rango de fechas', 'Análisis por producto', 'Exportación a CSV']} imgSrc="/images/screenshot/REPORTES.jpeg" alt="Reportes Avanzados" reverse />
                <ScreenItem title="🎁 Gestión de Ofertas" description="Creación y administración de ofertas especiales con diferentes tipos de descuentos y promociones." features={['Ofertas por porcentaje', 'Promociones 3x2, 2x1', 'Aplicación automática']} imgSrc="/images/screenshot/OFERTAS.jpeg" alt="Gestión de Ofertas" />
                <ScreenItem title="🤖 Centro de Inteligencia Artificial" description="Dashboard inteligente con análisis predictivos, sugerencias de reposición y optimización automática de precios." features={['Sugerencias de reposición', 'Análisis de tendencias', 'Optimización de precios por IA']} imgSrc="/images/screenshot/PANEL INTELIGENTE.jpeg" alt="Centro de IA" reverse />
                <ScreenItem title="🔄 Sugerencias de Reposición IA" description="Algoritmos inteligentes que analizan patrones de venta para sugerir qué productos reponer y cuándo." features={['Análisis de patrones de venta', 'Cálculo de días de stock', 'Alertas automáticas']} imgSrc="/images/screenshot/pantalla IA.png" alt="Sugerencias de Reposición IA" />
                
            </div>
        </section>

        <section id="beneficios" className="benefits">
            <div className="container">
                <h2 className="section-title">¿Por qué elegir ALEN.IA?</h2>
                <p className="section-subtitle">Ventajas que marcan la diferencia en tu negocio</p>
                <div className="benefits-grid">
                    <div className="benefit-item">
                        <div className="benefit-icon">⚡</div>
                        <h3>Sin Instalación Compleja</h3>
                        <p>Solo descarga y ejecuta. No requiere instalación ni configuraciones complicadas.</p>
                    </div>
                    <div className="benefit-item">
                        <div className="benefit-icon">🔒</div>
                        <h3>Datos Seguros</h3>
                        <p>Tus datos siempre bajo tu control. Funciona completamente offline en tu equipo.</p>
                    </div>
                    <div className="benefit-item">
                        <div className="benefit-icon">💰</div>
                        <h3>Completamente Gratuito</h3>
                        <p>Sin licencias, sin límites, sin costos ocultos. Software libre para tu negocio.</p>
                    </div>
                </div>
            </div>
        </section>

        <section id="descargar" className="cta-section">
            <div className="container">
                <h2>¿Listo para transformar tu negocio?</h2>
                <p>Descarga ALEN.IA Gestión Kontrol+ y comienza a gestionar tu inventario y ventas de manera profesional.</p>
                <form className="lead-form" onSubmit={handleLeadSubmit}>
                    <div className="lead-grid">
                        <input
                            type="text"
                            name="nombre"
                            value={lead.nombre}
                            onChange={handleLeadChange}
                            placeholder="Nombre"
                            className="lead-input"
                            required
                        />
                        <input
                            type="email"
                            name="email"
                            value={lead.email}
                            onChange={handleLeadChange}
                            placeholder="Email"
                            className="lead-input"
                            required
                        />
                        <select
                            name="rubro"
                            value={lead.rubro}
                            onChange={handleLeadChange}
                            className="lead-input"
                            required
                        >
                            <option value="">Rubro</option>
                            <option value="comercio">Comercio</option>
                            <option value="servicios">Servicios</option>
                            <option value="fabricacion">Fabricación</option>
                            <option value="gastronomia">Gastronomía</option>
                            <option value="otro">Otro</option>
                        </select>
                    </div>
                    <button type="submit" className="cta-button lead-submit" disabled={isSubmitting}>
                        {isSubmitting ? 'Enviando...' : '📥 Descargar Ahora - Gratis'}
                    </button>
                    {submitStatus === 'error' && (
                        <p className="lead-error">No pudimos registrar tus datos. Intenta nuevamente.</p>
                    )}
                </form>
                {confirmVisible && (
                    <div
                        className="lead-success"
                        role="status"
                        aria-live="polite"
                        style={{
                            marginTop: '1rem',
                            padding: '1rem',
                            borderRadius: '0.5rem',
                            background: '#0f172a',
                            border: '1px solid #22d3ee',
                            color: '#e2e8f0'
                        }}
                    >
                        <p style={{ marginBottom: '0.5rem' }}>
                            {downloadOpened
                                ? '🎉 La descarga se abrió en una nueva pestaña.'
                                : 'ℹ️ Si no comenzó la descarga, puede que tu navegador haya bloqueado la ventana emergente.'}
                        </p>
                        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                            <a
                                href={DOWNLOAD_URL}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="cta-button"
                                style={{ padding: '0.5rem 0.75rem' }}
                            >
                                Abrir en nueva pestaña
                            </a>
                            <button
                                type="button"
                                onClick={() => (window.location.href = DOWNLOAD_URL)}
                                className="cta-button lead-submit"
                                style={{ padding: '0.5rem 0.75rem' }}
                            >
                                Abrir en esta pestaña
                            </button>
                            <a
                                href={DOWNLOAD_URL}
                                download
                                className="back-to-home-button header-back-button"
                                style={{ padding: '0.5rem 0.75rem' }}
                            >
                                Descarga directa
                            </a>
                        </div>
                    </div>
                )}
                <div style={{marginTop: '3rem', paddingTop: '2rem', borderTop: '1px solid #374151'}}>
                    <h3 style={{marginBottom: '1rem', color: '#4f46e5'}}>Requisitos del Sistema</h3>
                    <div style={{display: 'flex', justifyContent: 'center', gap: '3rem', flexWrap: 'wrap', textAlign: 'left'}}>
                        <div><strong>🖥️ Sistema:</strong> Windows 10/11<br/><strong>💾 RAM:</strong> 4GB mínimo<br/><strong>💿 Espacio:</strong> 500MB libres</div>
                        <div><strong>📱 Pantalla:</strong> 1280x720 mínimo<br/><strong>🌐 Internet:</strong> No requerido<br/><strong>📄 Licencia:</strong> Completamente gratuito</div>
                    </div>
                </div>
            </div>
        </section>

        <footer className="footer">
            <div className="footer-content">
                <p>&copy; 2025 ALEN.IA Gestión Kontrol+. Desarrollado con 💙 para optimizar la gestión de pequeños y medianos negocios.</p>
                <p style={{marginTop: '1rem', opacity: 0.6}}>Versión 2.2+ | Software libre y gratuito | Compatible con Windows 10/11</p>
            </div>
        </footer>
      </div>
    </>
  );
};

const ScreenItem = ({ title, description, features, imgSrc, alt, reverse = false }) => (
  <div className={`screen-item ${reverse ? 'reverse' : ''}`}>
      <div className="screen-content">
          <h3 className="screen-title">{title}</h3>
          <p className="screen-description">{description}</p>
          <ul className="feature-list">
              {features.map((feature, index) => <li key={index}>{feature}</li>)}
          </ul>
      </div>
      <div className="screen-image">
          <img src={imgSrc} alt={alt} />
      </div>
  </div>
);

export default KontrolPlusLanding;

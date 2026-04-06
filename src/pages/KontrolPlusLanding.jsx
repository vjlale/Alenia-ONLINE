import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom'; // Importar Link
import '../styles/KontrolPlusLanding.css';
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
    const DOWNLOAD_URL = 'https://github.com/vjlale/KONTROL-By-Alenia/releases/download/v3.0.0/ALENIA-GESTION-KONTROL+_v2.3.0_Complete.zip';

  const handleLeadChange = (e) => {
    const { name, value } = e.target;
    setLead(prev => ({ ...prev, [name]: value }));
  };

    const handleLeadSubmit = async (e) => {
        e.preventDefault();
        setSubmitStatus(null);
        setIsSubmitting(true);
        try {
            // Datos del formulario
            const formData = {
                nombre: lead.nombre,
                email: lead.email,
                rubro: lead.rubro,
                servicio: 'ALEN.IA Gestión Kontrol+',
                descripcion: 'Solicitud de descarga de ALEN.IA Gestión Kontrol+ v2.3.0',
                categoria: 'contacto-general'
            };

            // Intentamos enviar por EmailJS (opcional, no bloquea la descarga)
            try {
                await emailJSService.sendServiceForm(formData, { categoria: 'contacto-general' });
            } catch (emailErr) {
                console.warn('No se pudo enviar EmailJS (continuando con descarga):', emailErr);
            }

            // Enviamos los datos al webhook
            try {
                const response = await fetch('https://hook.eu2.make.com/14xmyfmrxptcfqjbi25gy7sllk5pkbyg', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(formData)
                });

                if (!response.ok) {
                    console.warn('El webhook respondió con un código de error:', response.status);
                } else {
                    console.log('Datos enviados exitosamente al webhook');
                }
            } catch (webhookErr) {
                console.warn('No se pudo enviar al webhook (continuando con descarga):', webhookErr);
            }

            // Abrir descarga directamente
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
                        <h3>Sistema de Ventas Profesional</h3>
                        <p>Carrito inteligente con 6 formas de pago, cálculo automático de IVA (21%), aplicación de ofertas automáticas y validación en tiempo real. Incluye búsqueda inteligente y control de stock automático.</p>
                    </div>
                    <div className="feature-card">
                        <div className="feature-icon">📦</div>
                        <h3>Gestión de Inventario Avanzada</h3>
                        <p>Control completo de stock con categorización por marca/color/talle, carga masiva desde CSV, alertas visuales de stock bajo, edición masiva de precios y análisis de rotación de productos.</p>
                    </div>
                    <div className="feature-card">
                        <div className="feature-icon">📊</div>
                        <h3>Reportes y Análisis Completos</h3>
                        <p>Dashboard de ventas diarias, reportes avanzados por fechas/productos/marcas, análisis de rentabilidad, cierre de caja automático con exportación a CSV y gráficos de tendencias para toma de decisiones informadas.</p>
                    </div>
                    <div className="feature-card">
                        <div className="feature-icon">🤖</div>
                        <h3>Centro de Inteligencia Artificial</h3>
                        <p>Algoritmos avanzados de IA para análisis predictivo de demanda, sugerencias inteligentes de reposición, optimización automática de precios, análisis de tendencias y alertas predictivas para maximizar tu rentabilidad.</p>
                    </div>
                    <div className="feature-card">
                        <div className="feature-icon">🎁</div>
                        <h3>Sistema de Ofertas Inteligente</h3>
                        <p>Gestión completa de promociones: ofertas por cantidad (3x2, 2x1, 4x3), descuentos por porcentaje, precios especiales temporales y aplicación automática en el carrito con análisis de efectividad.</p>
                    </div>
                    <div className="feature-card">
                        <div className="feature-icon">💾</div>
                        <h3>100% Offline y Seguro</h3>
                        <p>Funciona completamente sin internet. Tus datos siempre seguros y bajo tu control en tu propio equipo. Respaldos automáticos, instalación instantánea y compatibilidad total con Windows 10/11.</p>
                    </div>
                </div>
            </div>
        </section>

        <section id="pantallas" className="screens">
            <div className="container">
                <h2 className="section-title">Recorrido por las Pantallas</h2>
                <p className="section-subtitle">Descubre cada funcionalidad del software paso a paso</p>
                
                {/* Screen Items */}
                <ScreenItem title="🏠 Pantalla Principal" description="Tu centro de control con acceso directo a todas las funcionalidades principales. Diseño moderno y profesional que te permite gestionar tu negocio de manera eficiente desde un solo lugar." features={['💰 Venta - Procesar nuevas ventas con Ctrl+V', '📊 Ventas del Día - Resumen completo de ingresos diarios', '🏦 Cierre de Caja - Generación automática de reportes CSV', '⚙️ Menú Gestión - Acceso a herramientas administrativas']} imgSrc="/images/screenshot/PRINCIPAL.jpeg" alt="Pantalla Principal" />
                <ScreenItem title="💰 Nueva Venta" description="Sistema de ventas profesional con carrito inteligente, múltiples formas de pago y aplicación automática de ofertas. Validación en tiempo real y cálculos automáticos de IVA (21%) para mayor precisión." features={['🔍 Búsqueda inteligente con filtrado en tiempo real', '🛒 Carrito dinámico con validación automática de stock', '💳 6 formas de pago: Efectivo, Débito, Crédito, Transferencia, QR, Otros', '🎁 Aplicación automática de ofertas 3x2, 2x1 y descuentos', '🧮 Cálculo automático de IVA y totales', '✅ Validación visual con bordes verdes/rojos']} imgSrc="/images/screenshot/NUEVA VENTA.jpeg" alt="Nueva Venta" reverse />
                <ScreenItem title="📊 Ventas del Día" description="Dashboard completo de ventas diarias con análisis detallado por forma de pago, productos más vendidos y control total de ingresos. Incluye generación automática de reportes CSV para contabilidad." features={['📋 Lista detallada de todas las ventas del día', '💰 Totales automáticos por forma de pago', '📈 Análisis de productos más vendidos', '📄 Generación automática de reportes CSV', '🏦 Cierre de caja con archivo de respaldo', '🔍 Filtros por producto, hora y método de pago']} imgSrc="/images/screenshot/pantalla ventas del dia.png" alt="Ventas del Día" />
                <ScreenItem title="⚙️ Menú de Gestión" description="Centro de control administrativo con acceso organizado a todas las herramientas de gestión. Desde aquí puedes administrar productos, configurar ofertas, generar reportes y acceder al centro de inteligencia artificial." features={['📦 Gestión de Productos - Agregar, editar y eliminar productos', '📊 Reportes Avanzados - Análisis detallado por fechas y productos', '🎁 Sistema de Ofertas - Configurar promociones 3x2, 2x1 y descuentos', '🤖 Centro de IA - Sugerencias inteligentes y análisis predictivo', '📂 Carga Masiva - Importación masiva desde archivos CSV', '⚙️ Configuración - Ajustes del sistema y respaldos']} imgSrc="/images/screenshot/PANTALLA MENU.png" alt="Menú de Gestión" reverse />
                <ScreenItem title="📝 Alta de Producto" description="Formulario profesional para agregar productos con cálculo automático de precios de venta y amigo. Incluye validación visual en tiempo real, tooltips explicativos y categorización completa por marca, color y talle." features={['🏷️ Categorización completa: Marca, Descripción, Color, Talle', '💰 Cálculo automático de precios de venta y amigo', '📊 Configuración de porcentajes de ganancia personalizables', '✅ Validación visual con bordes verdes/rojos', '💡 Tooltips explicativos para cada campo', '📦 Control de stock inicial al crear el producto']} imgSrc="/images/screenshot/AGREGAR NUEVO PRODUCTO.jpeg" alt="Alta de Producto" />
                <ScreenItem title="📋 Inventario" description="Panel completo de gestión de inventario con búsqueda inteligente, filtros avanzados y control total del stock. Incluye alertas visuales para productos con stock bajo y herramientas de edición masiva." features={['🔍 Búsqueda inteligente por marca, descripción, color o talle', '📊 Vista tabular con información completa de cada producto', '⚠️ Resaltado automático de productos con stock bajo', '✏️ Edición masiva de precios y porcentajes', '📈 Análisis de rotación y rendimiento por producto', '🔄 Actualización en tiempo real del stock tras ventas']} imgSrc="/images/screenshot/INVENTARIO.jpeg" alt="Inventario" reverse />
                <ScreenItem title="📂 Carga Masiva" description="Sistema de importación masiva que permite cargar cientos de productos desde archivos CSV en segundos. Incluye plantilla modelo, validación automática de datos y respaldo de seguridad antes de la importación." features={['📄 Descarga de plantilla CSV modelo con formato estándar', '✅ Validación automática de datos antes de la importación', '👁️ Previsualización de productos a importar', '💾 Respaldo automático de datos existentes', '📊 Reporte de productos importados exitosamente', '⚠️ Alertas de productos con datos incompletos o duplicados']} imgSrc="/images/screenshot/REPORTES.jpeg" alt="Carga Masiva" />
                <ScreenItem title="📈 Reportes Avanzados" description="Sistema completo de análisis y reportes con filtros avanzados por fechas, productos, marcas y formas de pago. Incluye exportación a CSV para análisis externos y toma de decisiones informadas." features={['📅 Filtros por rango de fechas personalizable', '📊 Análisis detallado por producto, marca y categoría', '💰 Análisis de rentabilidad y márgenes de ganancia', '📄 Exportación a CSV para Excel y contabilidad', '📈 Gráficos de tendencias de ventas', '🔍 Búsqueda avanzada en historial de ventas']} imgSrc="/images/screenshot/REPORTES.jpeg" alt="Reportes Avanzados" reverse />
                <ScreenItem title="🎁 Gestión de Ofertas" description="Sistema completo de gestión de ofertas y promociones con múltiples tipos de descuentos. Permite crear ofertas por cantidad, porcentaje y precios especiales que se aplican automáticamente en las ventas." features={['🎯 Ofertas por cantidad: 3x2, 2x1, 4x3, etc.', '📊 Ofertas por porcentaje: 10%, 20%, 50% de descuento', '💰 Precios especiales fijos para promociones temporales', '🔄 Aplicación automática en el carrito de compras', '⏰ Configuración de fechas de vigencia', '📈 Análisis de efectividad de ofertas']} imgSrc="/images/screenshot/OFERTAS.jpeg" alt="Gestión de Ofertas" />
                <ScreenItem title="🤖 Centro de Inteligencia Artificial" description="Dashboard inteligente con análisis predictivos avanzados que utiliza algoritmos de IA para optimizar tu negocio. Incluye sugerencias de reposición, análisis de tendencias y optimización automática de precios basada en patrones de venta." features={['🔮 Análisis predictivo de demanda por producto', '📊 Sugerencias inteligentes de reposición de stock', '💰 Optimización automática de precios por IA', '📈 Análisis de tendencias y patrones de venta', '⚠️ Alertas inteligentes de productos con baja rotación', '🎯 Recomendaciones de ofertas basadas en stock']} imgSrc="/images/screenshot/PANEL INTELIGENTE.jpeg" alt="Centro de IA" reverse />
                <ScreenItem title="🔄 Sugerencias de Reposición IA" description="Sistema inteligente de análisis de stock que utiliza algoritmos avanzados para predecir cuándo y qué productos necesitas reponer. Analiza patrones de venta históricos para optimizar tu inventario y evitar quedarte sin stock." features={['🧠 Análisis inteligente de patrones de venta históricos', '📊 Cálculo automático de días de stock restantes', '⚠️ Alertas automáticas de productos con stock crítico', '📈 Predicción de demanda basada en tendencias', '🎯 Sugerencias de cantidades óptimas de reposición', '📅 Planificación automática de compras futuras']} imgSrc="/images/screenshot/pantalla IA.png" alt="Sugerencias de Reposición IA" />
                
            </div>
        </section>

        <section id="beneficios" className="benefits">
            <div className="container">
                <h2 className="section-title">¿Por qué elegir ALEN.IA?</h2>
                <p className="section-subtitle">Ventajas que marcan la diferencia en tu negocio</p>
                <div className="benefits-grid">
                    <div className="benefit-item">
                        <div className="benefit-icon">⚡</div>
                        <h3>Instalación Instantánea</h3>
                        <p>Descarga y ejecuta inmediatamente. Sin instaladores complejos, sin configuraciones complicadas. Tu negocio funcionando en menos de 2 minutos.</p>
                    </div>
                    <div className="benefit-item">
                        <div className="benefit-icon">🔒</div>
                        <h3>Máxima Seguridad y Privacidad</h3>
                        <p>Tus datos siempre bajo tu control. Funciona 100% offline, sin conexión a internet, sin nubes externas. Respaldos automáticos y control total de tu información.</p>
                    </div>
                    <div className="benefit-item">
                        <div className="benefit-icon">💰</div>
                        <h3>100% Gratuito y Sin Límites</h3>
                        <p>Sin licencias, sin mensualidades, sin límites de productos o ventas. Software libre y gratuito para siempre. Incluye todas las funcionalidades avanzadas sin costo adicional.</p>
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
                        <div><strong>🖥️ Sistema:</strong> Windows 10/11 (64-bit)<br/><strong>💾 RAM:</strong> 4GB mínimo (8GB recomendado)<br/><strong>💿 Espacio:</strong> 500MB libres (SSD recomendado)</div>
                        <div><strong>📱 Pantalla:</strong> 1280x720 mínimo (1920x1080 recomendado)<br/><strong>🌐 Internet:</strong> No requerido (100% offline)<br/><strong>📄 Licencia:</strong> Completamente gratuito y sin límites</div>
                    </div>
                    <p style={{marginTop: '1rem', textAlign: 'center', opacity: 0.8, fontSize: '0.9em'}}>
                        <strong>⚠️ Importante:</strong> Esta versión NO es compatible con sistemas de 32-bit. Asegúrate de tener Windows 10/11 de 64-bit.
                    </p>
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

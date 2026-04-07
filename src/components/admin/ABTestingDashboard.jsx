import React from 'react';
import { Link } from 'react-router-dom';
import {
  BANNER_INTRO_SESSION_KEY,
  HOME_CONTENT_ANCHOR_ID,
} from '../../data/bannerExperienceCopy';

export default function ABTestingDashboard() {
  return (
    <div style={{ padding: 32, maxWidth: 720, fontFamily: 'system-ui, sans-serif' }}>
      <h1 style={{ fontSize: 28, fontWeight: 800, marginBottom: 16 }}>Panel de A/B Testing</h1>
      <p style={{ marginBottom: 24, color: '#444' }}>
        Este es un dashboard placeholder para experimentos y reportes de A/B Testing.
      </p>

      <section
        style={{
          marginTop: 32,
          padding: 20,
          borderRadius: 12,
          border: '1px solid #c4b5fd',
          background: '#faf5ff',
        }}
      >
        <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 12 }}>Landing Home — banner interactivo</h2>
        <p style={{ marginBottom: 12, lineHeight: 1.5 }}>
          Los textos del modal de bienvenida, el recordatorio compacto y las etiquetas del botón de salida se
          editan en el repositorio en{' '}
          <code style={{ background: '#ede9fe', padding: '2px 6px', borderRadius: 4 }}>src/data/bannerExperienceCopy.js</code>.
          Tras cambiar copy, ejecutá build y desplegá el sitio como en el flujo habitual.
        </p>
        <ul style={{ lineHeight: 1.6, paddingLeft: 20 }}>
          <li>
            <strong>SessionStorage:</strong> <code>{BANNER_INTRO_SESSION_KEY}</code> — si está en <code>1</code>, el modal no
            se muestra de nuevo hasta nueva sesión del navegador.
          </li>
          <li>
            <strong>Ancla de scroll:</strong> <code>#{HOME_CONTENT_ANCHOR_ID}</code> en la página de inicio.
          </li>
        </ul>
        <p style={{ marginTop: 16 }}>
          <Link to="/" style={{ color: '#6d28d9', fontWeight: 600 }}>
            Volver al inicio
          </Link>
        </p>
      </section>
    </div>
  );
}

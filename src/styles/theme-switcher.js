// 🎨 Theme Switcher para Alen.iA
// Permite cambiar temas visuales dinámicamente

const themes = {
  'neon-cyberpunk': {
    '--color-primary': '#00ff88',
    '--color-secondary': '#0066ff',
    '--color-accent': '#ff0066',
    '--gradient-primary': 'linear-gradient(135deg, #00ff88, #0066ff)',
    '--glow-primary': '0 0 20px rgba(0, 255, 136, 0.5)'
  },
  'sunset-warm': {
    '--color-primary': '#ff6b35',
    '--color-secondary': '#f7931e',
    '--color-accent': '#ff4757',
    '--gradient-primary': 'linear-gradient(135deg, #ff6b35, #f7931e)',
    '--glow-primary': '0 0 20px rgba(255, 107, 53, 0.5)'
  },
  'ocean-blue': {
    '--color-primary': '#00d4ff',
    '--color-secondary': '#0099cc',
    '--color-accent': '#ff6b9d',
    '--gradient-primary': 'linear-gradient(135deg, #00d4ff, #0099cc)',
    '--glow-primary': '0 0 20px rgba(0, 212, 255, 0.5)'
  },
  'purple-magic': {
    '--color-primary': '#8b5cf6',
    '--color-secondary': '#a855f7',
    '--color-accent': '#ec4899',
    '--gradient-primary': 'linear-gradient(135deg, #8b5cf6, #a855f7)',
    '--glow-primary': '0 0 20px rgba(139, 92, 246, 0.5)'
  },
  'forest-green': {
    '--color-primary': '#10b981',
    '--color-secondary': '#059669',
    '--color-accent': '#f59e0b',
    '--gradient-primary': 'linear-gradient(135deg, #10b981, #059669)',
    '--glow-primary': '0 0 20px rgba(16, 185, 129, 0.5)'
  }
};

// Función para cambiar tema
function switchTheme(themeName) {
  const theme = themes[themeName];
  if (!theme) {
    console.error('Tema no encontrado:', themeName);
    return;
  }

  const root = document.documentElement;
  
  // Aplicar variables del tema
  Object.entries(theme).forEach(([property, value]) => {
    root.style.setProperty(property, value);
  });

  // Guardar en localStorage
  localStorage.setItem('alenia-theme', themeName);
  
  console.log(`🎨 Tema cambiado a: ${themeName}`);
}

// Función para obtener tema actual
function getCurrentTheme() {
  return localStorage.getItem('alenia-theme') || 'neon-cyberpunk';
}

// Función para crear selector de temas (solo en desarrollo)
function createThemeSelector() {
  if (import.meta.env.DEV) {
    const selector = document.createElement('div');
    selector.style.cssText = `
      position: fixed;
      top: 20px;
      right: 20px;
      background: rgba(0,0,0,0.8);
      padding: 10px;
      border-radius: 8px;
      z-index: 9999;
      font-family: monospace;
      font-size: 12px;
    `;
    
    selector.innerHTML = `
      <div style="color: white; margin-bottom: 10px;">🎨 Theme Switcher</div>
      ${Object.keys(themes).map(theme => `
        <button 
          onclick="window.switchTheme('${theme}')"
          style="
            display: block;
            margin: 2px 0;
            padding: 4px 8px;
            background: ${themes[theme]['--color-primary']};
            border: none;
            border-radius: 4px;
            color: white;
            cursor: pointer;
            font-size: 10px;
          "
        >
          ${theme}
        </button>
      `).join('')}
    `;
    
    document.body.appendChild(selector);
  }
}

// Inicializar
if (typeof window !== 'undefined') {
  window.switchTheme = switchTheme;
  window.getCurrentTheme = getCurrentTheme;
  
  // Aplicar tema guardado al cargar
  const savedTheme = getCurrentTheme();
  switchTheme(savedTheme);
  
  // Crear selector en desarrollo
  if (import.meta.env.DEV) {
    setTimeout(createThemeSelector, 1000);
  }
}

export { switchTheme, getCurrentTheme, themes }; 
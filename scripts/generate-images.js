import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const OUTPUT_DIR = path.join(__dirname, '../public/images/apps');

if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

// Prompts estilo "Nano Banana" (Español Detallado) optimizados para Pollinations/Flux
const apps = [
  {
    id: 'alenia-gestion-kontrol-v2-2',
    prompt: 'Flat vector illustration, flat design style. Modern enterprise dashboard for SMB management. Desktop interface with sleek control panels showing sales metrics, inventory data, client info. Corporate blue bar charts #1E40AF, green success indicators #22C55E, folder icons. Elegant gradient background navy blue to slate gray #64748B. Professional, solid, trustworthy, clean vector art. No text, no people. Square aspect ratio.'
  },
  {
    id: 'aleniahealth',
    prompt: 'Flat vector illustration, flat design style. Digital health platform with AI medical assistant. Clean clinical interface showing chat consultation with teal bubbles #0D9488, digital stethoscope, heart pulse symbol, stylized DNA helix. Circuit chips merged with medical cross. Gradient background dark teal to clinical white #F0FDFA. Minimalist healthcare tech, modern, sterile. No text, no people. Square aspect ratio.'
  },
  {
    id: 'analizador-ecommerce-seo',
    prompt: 'Flat vector illustration, flat design style. Vibrant e-commerce and SEO analytics dashboard. Ascending orange line graphs #F97316, blue SEO metric bars #3B82F6, large magnifying glass over shopping cart, radar chart. Green checkmarks #10B981, orange alerts. Dark background #1F2937 with subtle data grid. Data-driven, energetic, high-tech analytics. No text, no people. Square aspect ratio.'
  },
  {
    id: 'calculadora-mercado-libre',
    prompt: 'Flat vector illustration, flat design style. Modern digital calculator for online marketplace. Bright yellow LCD display #FFE600 showing abstract digits, floating percentage symbols, currency signs, commission icons, price tag. Vibrant Mercado Libre yellow and trust blue #3483FA. Deep blue background with golden sparkles. Functional, financial, fintech aesthetic. No text, no people. Square aspect ratio.'
  },
  {
    id: 'carga-masiva-import',
    prompt: 'Flat vector illustration, flat design style. Massive data import flow in terminal aesthetic. CSV file icons flying towards central server. Cyan data flow arrows #06B6D4, spinning automation gears, bright green progress bar #22C55E. Deep black background #0A0A0A with subtle green terminal code. Hacker-chic, technical, efficient backend. No text, no people. Square aspect ratio.'
  },
  {
    id: 'converx-to-file',
    prompt: 'Flat vector illustration, flat design style. Magical file converter tool. File format icons (Red PDF, Blue DOC, Orange Image, Green JSON) orbiting glowing violet transformation core #8B5CF6. Circular conversion arrows, floating PWA offline symbol. Deep violet to black gradient background. Fluid, magical, tech-wizardry. No text, no people. Square aspect ratio.'
  },
  {
    id: 'crm-startup-digital',
    prompt: 'Flat vector illustration, flat design style. Modern startup CRM interface. Sales pipeline with colorful cards flowing through conversion funnel (Violet #7C3AED to Pink #EC4899 gradient). Client avatars with status dots, floating cyan notifications #06B6D4. Abstract geometric shapes on dark purple background. Startup tech, energetic, vibrant gradients. No text, no people. Square aspect ratio.'
  },
  {
    id: 'crm-startup-digital-utm',
    prompt: 'Flat vector illustration, flat design style. Marketing CRM with advanced tracking. Target bullseye with attribution layers, floating UTM tags (Red, Orange, Blue), social media icons connected by flow lines. Multi-touch attribution charts. Palette: Red #EF4444, Orange #F97316, Blue #3B82F6, Green #10B981. Dark background with converging rays. Digital marketing analytics, precise. No text, no people. Square aspect ratio.'
  },
  {
    id: 'drinking-app',
    prompt: 'Flat vector illustration, flat design style. Premium nightlife bar experience app. Smartphone displaying cocktail interface, topped with stylized golden crown #F59E0B. Neon-lit drink glasses, club atmosphere. Palette: Deep Purple #7E22CE, Gold, Neon Pink #F472B6. Black background with neon light effects. Nightlife, festive, elegant, exclusive. No text, no people. Square aspect ratio.'
  },
  {
    id: 'e-pix',
    prompt: 'Flat vector illustration, flat design style. AI creative image generation suite. Digital canvas with magic brush leaving rainbow trail, pixels materializing into art, floating color palette, style sliders. Sparkles and creative particles. Palette: Magenta #D946EF, Cyan #22D3EE, Yellow. Dark background with vibrant color explosions. Artistic, expressive, magical. No text, no people. Square aspect ratio.'
  },
  {
    id: 'foodapp',
    prompt: 'Flat vector illustration, flat design style. Food delivery platform. Delivery bag with steam rising, stylized appetizing dishes (burger, salad bowl, pizza), map with pulsing location pin, delivery timer. Palette: Appetite Red #DC2626, Warm Orange #FB923C, Fresh Green #22C55E. Dark brown to cream gradient background. Food tech, warm, delicious. No text, no people. Square aspect ratio.'
  },
  {
    id: 'garden-compositor',
    prompt: 'Flat vector illustration, flat design style. AI garden design compositor tool. Top-down view of garden grid canvas: plants, trees, flowers being placed. Layers for sunlight and shadows. Palette: Forest Green #166534, Lime Green #84CC16, Earth Brown #92400E, Sky Blue #7DD3FC. Green to sky blue gradient background. Nature meets technology, organic. No text, no people. Square aspect ratio.'
  },
  {
    id: 'generador-turnos-trabajo',
    prompt: 'Flat vector illustration, flat design style. Visual work shift planner. Calendar grid with colored blocks: Blue (Day), Indigo (Night), Orange (Evening), Yellow (Morning). Clock with hands, abstract worker silhouettes, availability checkmarks. Sky blue to indigo night gradient background. Organizational, productive, clear HR tech. No text, no people. Square aspect ratio.'
  },
  {
    id: 'gestion-pilchero',
    prompt: 'Flat vector illustration, flat design style. Elegant fashion store POS system. Modern touchscreen register, stylized clothing rack with colorful garments, golden price tags #D4AF37, barcode scanner. Palette: Fashion Pink #EC4899, Elegant Black #171717, Gold, White. Black background with pink accents. Boutique, fashion-forward, chic retail tech. No text, no people. Square aspect ratio.'
  },
  {
    id: 'policia-cordoba-web',
    prompt: 'Flat vector illustration, flat design style. Governmental security institutional portal. Stylized police badge with star, silhouette map of Cordoba Argentina, modern institutional building, subtle waving Argentine flag. Palette: Institutional Blue #1E3A8A, Light Blue #74ACDF, White, Gold #D4AF37. Dark blue to patriotic light blue gradient background. Official, trustworthy, authoritative. No text, no people. Square aspect ratio.'
  },
  {
    id: 'primeras-palabras-bebes',
    prompt: 'Flat vector illustration, flat design style. Colorful educational app for children. Large flashcards with simple adorable illustrations: smiling sun, little house, cute puppy, red apple. Soft audio waves, shining achievement stars, baby hand touching screen. Palette: Joyful Yellow #FCD34D, Baby Blue #7DD3FC, Soft Pink #F9A8D4, Mint Green #6EE7B7. Warm cream background with pastel bubbles. Childish, rounded, playful. No text, no people. Square aspect ratio.'
  },
  {
    id: 'stage-visualizer-resolume',
    prompt: 'Flat vector illustration, flat design style. Event stage technical visualizer. Top-down technical view of stage with LED screens emitting Magenta-Cyan gradients, metallic trusses, spotlight fixtures, projectors. White technical lines, video output numbers, mounting grid. Palette: Magenta #D946EF, Cyan #22D3EE, White spotlights, Yellow accents. Absolute black background with grid. Professional technical blueprint, visually striking. No text, no people. Square aspect ratio.'
  }
];

async function generateImageWithPollinations(app) {
  const filePath = path.join(OUTPUT_DIR, `${app.id}.png`);
  
  // Solo saltar si el archivo existe Y tiene tamaño > 0
  if (fs.existsSync(filePath)) {
    const stats = fs.statSync(filePath);
    if (stats.size > 0) {
      console.log(`⏭️  Ya existe: ${app.id}`);
      return;
    } else {
      console.log(`⚠️  Archivo vacío encontrado, regenerando: ${app.id}`);
      fs.unlinkSync(filePath);
    }
  }

  console.log(`🎨 Generando: ${app.id}...`);

  try {
    // Pollinations URL - usar endpoint que devuelva imagen directamente
    const encodedPrompt = encodeURIComponent(app.prompt);
    // Formato alternativo: usar /image directamente en lugar de /p/
    const url = `https://image.pollinations.ai/prompt/${encodedPrompt}?width=1024&height=1024&seed=${Math.floor(Math.random() * 1000)}&model=flux`;
    
    console.log(`   ⏳ Esperando respuesta de Pollinations...`);
    const response = await fetch(url, {
      headers: {
        'Accept': 'image/png,image/*,*/*'
      }
    });

    if (!response.ok) {
      throw new Error(`Error HTTP: ${response.status} - ${response.statusText}`);
    }

    // Verificar que sea una imagen
    const contentType = response.headers.get('content-type');
    if (!contentType || !contentType.startsWith('image/')) {
      const text = await response.text();
      console.error(`   ❌ La respuesta no es una imagen. Content-Type: ${contentType}`);
      console.error(`   📄 Primeros 200 caracteres de la respuesta:`, text.substring(0, 200));
      throw new Error(`La respuesta no es una imagen: ${contentType}`);
    }

    const arrayBuffer = await response.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    
    // Verificar que el buffer tenga un tamaño razonable (más de 10KB para una imagen PNG)
    if (buffer.length < 10000) {
      console.error(`   ⚠️  Advertencia: Imagen muy pequeña (${buffer.length} bytes). Puede estar corrupta.`);
    }
    
    fs.writeFileSync(filePath, buffer);
    console.log(`✅ Guardado: ${app.id}.png (${(buffer.length / 1024).toFixed(2)} KB)`);

    // Pequeño delay para no sobrecargar el servicio
    await new Promise(resolve => setTimeout(resolve, 2000));

  } catch (error) {
    console.error(`❌ Error generando ${app.id}:`, error.message);
  }
}

async function main() {
  console.log('🚀 Iniciando generación con Pollinations AI (Flux)...');
  console.log('📂 Directorio de salida:', OUTPUT_DIR);
  
  for (const app of apps) {
    await generateImageWithPollinations(app);
  }
  
  console.log('✨ ¡Proceso completado!');
}

main();

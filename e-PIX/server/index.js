import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import { GoogleGenAI, Modality, Type } from '@google/genai';

const app = express();
const port = process.env.PORT || 8080;

app.use(cors());
app.use(express.json({ limit: '25mb' }));

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const distPath = path.resolve(__dirname, '..', 'dist');

const apiKey = process.env.GEMINI_API_KEY;
console.log('DEBUG: GEMINI_API_KEY =', apiKey ? `${apiKey.substring(0, 10)}...` : 'NO CONFIGURADA');
if (!apiKey) {
  console.warn('GEMINI_API_KEY no está configurada. El backend no podrá conectarse a Gemini.');
}

const ai = apiKey ? new GoogleGenAI({ apiKey }) : null;

app.post('/api/generate', async (req, res) => {
  try {
    console.log('=== INICIO DE LLAMADA A API ===');
    console.log('AI configurado:', !!ai);
    console.log('API Key presente:', !!apiKey);
    
    if (!ai) {
      console.log('ERROR: AI no configurado');
      return res.status(500).json({ error: 'La clave de API no está configurada.' });
    }
    
    const { base64Image, mimeType, prompt } = req.body || {};
    console.log('Parámetros recibidos:', {
      hasImage: !!base64Image,
      mimeType,
      prompt: prompt?.substring(0, 50) + '...'
    });
    
    if (!base64Image || !mimeType || !prompt) {
      return res.status(400).json({ error: 'Parámetros inválidos.' });
    }

    console.log('Llamando a Gemini API...');
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image-preview',
      contents: {
        parts: [
          { inlineData: { data: base64Image, mimeType } },
          { text: prompt },
        ],
      },
      config: {
        responseModalities: [Modality.IMAGE, Modality.TEXT],
      },
    });

    console.log('Respuesta recibida de Gemini');
    let newImageBase64;
    let responseText = null;
    if (response.candidates && response.candidates.length > 0) {
      for (const part of response.candidates[0].content.parts) {
        if (part.inlineData) newImageBase64 = part.inlineData.data;
        else if (part.text) responseText = part.text;
      }
    }

    console.log('Imagen generada:', !!newImageBase64);
    return res.json({ image: newImageBase64, text: responseText });
  } catch (error) {
    console.error('=== ERROR EN API ===');
    console.error('Tipo de error:', error.constructor.name);
    console.error('Mensaje:', error.message);
    console.error('Status:', error.status);
    console.error('Error completo:', error);
    
    const msg = error.message || 'Error desconocido';
    return res.status(500).json({ error: `Error de API: ${msg}` });
  }
});

app.post('/api/suggestions', async (req, res) => {
  try {
    if (!ai) {
      return res.status(500).json({ error: 'La clave de API no está configurada.' });
    }
    const { base64Image, mimeType } = req.body || {};
    if (!base64Image || !mimeType) {
      return res.status(400).json({ error: 'Parámetros inválidos.' });
    }

    const textPart = {
      text: 'Analiza esta imagen de un producto. Genera 5 ideas de prompts cortas y creativas en español para una IA de edición de imágenes. Estas ideas deben describir escenas en las que se podría colocar el producto. Devuelve solo un array JSON de strings. Ejemplo de formato de salida: ["idea 1", "idea 2", "idea 3", "idea 4", "idea 5"]',
    };
    const imagePart = { inlineData: { mimeType, data: base64Image } };

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: { parts: [textPart, imagePart] },
      config: {
        responseMimeType: 'application/json',
        responseSchema: { type: Type.ARRAY, items: { type: Type.STRING } },
      },
    });

    const jsonStr = response.text.trim();
    let suggestions = [];
    try {
      suggestions = JSON.parse(jsonStr);
    } catch {
      suggestions = [];
    }
    if (!Array.isArray(suggestions) || !suggestions.every((s) => typeof s === 'string')) {
      suggestions = [];
    }
    return res.json({ suggestions });
  } catch (error) {
    console.error('Error en /api/suggestions:', error);
    return res.status(500).json({ error: 'Ocurrió un error al generar sugerencias.' });
  }
});

app.use(express.static(distPath));
app.get('*', (req, res) => {
  res.sendFile(path.join(distPath, 'index.html'));
});

app.listen(port, () => {
  console.log(`Servidor iniciado en puerto ${port}`);
});



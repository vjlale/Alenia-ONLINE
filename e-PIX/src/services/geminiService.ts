
// Nota: No importar SDK de Google en el frontend. Todas las llamadas se hacen al backend.

/**
 * Converts a File object to a Base64 encoded string.
 * @param file The file to convert.
 * @returns A promise that resolves with the Base64 string.
 */
export const fileToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      // Result is a data URL (e.g., "data:image/png;base64,iVBORw..."). We only want the Base64 part.
      const result = reader.result as string;
      resolve(result.split(',')[1]);
    };
    reader.onerror = error => reject(error);
  });
};

/**
 * Generates an image using the Gemini API.
 * @param base64Image The Base64 encoded source image.
 * @param mimeType The MIME type of the source image.
 * @param prompt The text prompt describing the desired edit.
 * @returns An object containing the new image data or an error message.
 */
export const generateImage = async (
  base64Image: string,
  mimeType: string,
  prompt: string
): Promise<{ image?: string; text?: string | null; error?: string }> => {
  try {
    const res = await fetch('/api/generate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ base64Image, mimeType, prompt })
    });
    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Error calling backend /api/generate:", error);
    return { error: "Ocurrió un error inesperado al generar la imagen." };
  }
};

/**
 * Generates prompt suggestions based on an image.
 * @param base64Image The Base64 encoded source image.
 * @param mimeType The MIME type of the source image.
 * @returns A promise that resolves with an array of suggestions.
 */
export const generatePromptSuggestions = async (
  base64Image: string,
  mimeType: string
): Promise<string[]> => {
  try {
    const res = await fetch('/api/suggestions', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ base64Image, mimeType })
    });
    const data = await res.json();
    return Array.isArray(data.suggestions) ? data.suggestions : [];
  } catch (error) {
    console.error("Error calling backend /api/suggestions:", error);
    return [];
  }
};

const CRM_RUBRO = 'E-pix - Notificación disponibilidad';

function getCrmBaseUrl(): string {
  const url = import.meta.env.VITE_CRM_API_URL;
  if (!url) return '';
  return url.replace(/\/$/, '');
}

/**
 * Envía el email al CRM para notificar cuando la app esté disponible.
 * @param email Email del usuario.
 * @returns { ok: true } en éxito; { ok: false, error: string } en error.
 */
export async function submitNotifyEmail(
  email: string
): Promise<{ ok: boolean; error?: string }> {
  const baseUrl = getCrmBaseUrl();
  if (!baseUrl) {
    return { ok: false, error: 'CRM no configurado (VITE_CRM_API_URL).' };
  }

  const endpoint = `${baseUrl}/api/lead`;

  try {
    const res = await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        nombre: '',
        email: email.trim(),
        rubro: CRM_RUBRO,
      }),
    });

    const data = await res.json().catch(() => ({}));

    if (!res.ok) {
      const msg =
        data.error || data.message || `Error ${res.status} del servidor`;
      return { ok: false, error: msg };
    }

    if (data.ok === false) {
      return { ok: false, error: data.error || 'Error desconocido del CRM.' };
    }

    return { ok: true };
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Error de conexión';
    return { ok: false, error: message };
  }
}

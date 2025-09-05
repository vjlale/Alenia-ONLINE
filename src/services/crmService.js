export async function createLead({ nombre, email, rubro }) {
  const baseUrl = import.meta.env.VITE_CRM_API_URL || 'http://localhost:5000';
  const endpoint = `${baseUrl.replace(/\/$/, '')}/api/lead`;

  const response = await fetch(endpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ nombre, email, rubro })
  });

  if (!response.ok) {
    const text = await response.text().catch(() => '');
    throw new Error(`Error CRM ${response.status}: ${text}`);
  }

  const data = await response.json();
  if (!data.ok) {
    throw new Error(data.error || 'Error desconocido del CRM');
  }
  return data;
}

const crmService = { createLead };
export default crmService;

const API_URL =
  process.env.NODE_ENV === "production"
    ? "/api/configs"
    : "http://localhost:4000/api/configs";

export async function getConfigs() {
  const res = await fetch(API_URL, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    mode: 'cors' // Importante para CORS
  });
  if (!res.ok) throw new Error('Error al obtener configuraciones');
  return await res.json();
}

export async function saveConfig(config) {
  const res = await fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    mode: 'cors', // Importante para CORS
    body: JSON.stringify(config)
  });
  if (!res.ok) throw new Error('Error al guardar configuración');
  return await res.json();
}

export async function getConfigById(id) {
  const res = await fetch(`${API_URL}/${id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    mode: 'cors' // Importante para CORS
  });
  if (!res.ok) throw new Error('Error al obtener configuración');
  return await res.json();
}

// Eliminar una configuración
export async function deleteConfig(id) {
  const res = await fetch(`${API_URL}/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
    mode: 'cors' // Importante para CORS
  });
  if (!res.ok) throw new Error('Error al eliminar configuración');
  return await res.json();
}
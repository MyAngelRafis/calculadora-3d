const API_URL =
  process.env.NODE_ENV === "production"
    ? "/api/configs"
    : "http://localhost:4000/api/configs";

// Obtener todas las configuraciones
export async function getConfigs() {
  const res = await fetch(API_URL, {
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json'
    }
  });
  if (!res.ok) throw new Error("Error al obtener configuraciones");
  return await res.json();
}

// Guardar una configuración nueva
export async function saveConfig(config) {
  const res = await fetch(API_URL, {
    method: "POST",
    credentials: 'include',
    headers: { 
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(config)
  });
  if (!res.ok) throw new Error("Error al guardar configuración");
  return await res.json();
}

// Obtener una configuración por ID
export async function getConfigById(id) {
  const res = await fetch(`${API_URL}/${id}`);
  if (!res.ok) throw new Error("Error al obtener configuración");
  return await res.json();
}

// Eliminar una configuración
export async function deleteConfig(id) {
  const res = await fetch(`${API_URL}/${id}`, { method: "DELETE" });
  if (!res.ok) throw new Error("Error al eliminar configuración");
  return await res.json();
}
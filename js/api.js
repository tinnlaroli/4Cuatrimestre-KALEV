// URL de la API desplegada en Railway
const API_URL = 'https://kalev.up.railway.app/';

// Función para hacer una solicitud GET a la API
async function hacerSolicitudGET(endpoint) {
    try {
        const response = await fetch(`${API_URL}${endpoint}`);
        if (!response.ok) {
            throw new Error(`Error en la solicitud: ${response.statusText}`);
        }
        return await response.json();
    } catch (error) {
        console.error(error);
        return null;
    }
}

// Exportamos la función para usarla en otros archivos
export { hacerSolicitudGET };

import { hacerSolicitudGET } from './api.js';

async function cargarEnseñanzas() {
    const contenido = document.querySelector('.main-content');
    contenido.innerHTML = `
        <h2>Enseñanzas</h2>
        <p>Contenido de la pestaña de enseñanzas.</p>
    `;

    // Llamada a la API para obtener datos relacionados con las enseñanzas
    const datos = await hacerSolicitudGET('/enseñanzas');
    if (datos) {
        console.log('Datos de enseñanzas:', datos);
        // Aquí puedes renderizar los datos en la página de manera interactiva.
    }
}

export { cargarEnseñanzas };

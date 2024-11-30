import { hacerSolicitudGET } from './api.js';

async function cargarSolicitarActividad() {
    const contenido = document.querySelector('.main-content');
    contenido.innerHTML = `
        <h2>Solicitar Actividad</h2>
        <p>Contenido de la pestaña de solicitar actividad.</p>
    `;

    // Llamada a la API para obtener datos relacionados con las actividades
    const datos = await hacerSolicitudGET('/solicitar-actividad');
    if (datos) {
        console.log('Datos de solicitar actividad:', datos);
        // Aquí puedes renderizar los datos en la página de manera interactiva.
    }
}

export { cargarSolicitarActividad };

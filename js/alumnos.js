import { hacerSolicitudGET } from './api.js';

async function cargarAlumnos() {
    const contenido = document.querySelector('.main-content');
    contenido.innerHTML = `
        <h2>Alumnos</h2>
        <p>Contenido de la pestaña de alumnos.</p>
    `;

    // Llamada a la API para obtener datos de alumnos
    const datos = await hacerSolicitudGET('/alumnos');
    if (datos) {
        console.log('Datos de alumnos:', datos);
        // Aquí puedes renderizar los datos en la página de manera interactiva.
    }
}

export { cargarAlumnos };

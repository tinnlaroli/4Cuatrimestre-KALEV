import { hacerSolicitudGET } from './api.js';

async function cargarEvaluarDesempeño() {
    const contenido = document.querySelector('.main-content');
    contenido.innerHTML = `
        <h2>Evaluar Desempeño</h2>
        <p>Contenido de la pestaña de evaluar desempeño.</p>
    `;

    // Llamada a la API para obtener datos relacionados con el desempeño
    const datos = await hacerSolicitudGET('/evaluar-desempeño');
    if (datos) {
        console.log('Datos de evaluar desempeño:', datos);
        // Aquí puedes renderizar los datos en la página de manera interactiva.
    }
}

export { cargarEvaluarDesempeño };

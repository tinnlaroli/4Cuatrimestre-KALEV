// URL de la API (ajusta esto según la URL de tu API desplegada en Railway)
const apiUrl = 'https://kalev.up.railway.app';

async function obtenerDatosDesdeApi(endpoint) {
    try {
        const response = await fetch(`${apiUrl}/${endpoint}`);
        if (!response.ok) {
            throw new Error(`Error HTTP: ${response.status} - ${response.statusText}`);
        }
        const data = await response.json();
        console.log('Datos recibidos:', data);
        return data;
    } catch (error) {
        console.error('Error al consumir la API:', error);
        return null;
    }
}



// Función para cargar el contenido de las pestañas
async function cargarContenido(pestaña) {
    const mainContent = document.querySelector('.main-content');
    mainContent.innerHTML = '';

    let data;

    switch (pestaña) {
        case 'enseñanzas':
            data = await obtenerDatosDesdeApi('enseñanzas'); // Ajusta el endpoint según la API
            if (data) {
                mainContent.innerHTML = `
                    <h2>Enseñanzas</h2>
                    <ul>
                        ${data.map(item => `<li>${item.titulo}: ${item.descripcion}</li>`).join('')}
                    </ul>
                `;
            } else {
                mainContent.innerHTML = '<p>Error al cargar los datos de enseñanzas.</p>';
            }
            break;
        case 'solicitarActividad':
            data = await obtenerDatosDesdeApi('solicitar-actividad'); // Ajusta el endpoint según la API
            if (data) {
                mainContent.innerHTML = `
                    <h2>Solicitar Actividad</h2>
                    <p>${data.mensaje}</p>
                `;
            } else {
                mainContent.innerHTML = '<p>Error al cargar los datos de la actividad.</p>';
            }
            break;
        case 'evaluarDesempeño':
            data = await obtenerDatosDesdeApi('evaluar-desempeno'); // Ajusta el endpoint según la API
            if (data) {
                mainContent.innerHTML = `
                    <h2>Evaluar Desempeño</h2>
                    <p>${data.progreso}</p>
                `;
            } else {
                mainContent.innerHTML = '<p>Error al cargar los datos de evaluación de desempeño.</p>';
            }
            break;
        case 'alumnos':
            data = await obtenerDatosDesdeApi('alumnos'); // Ajusta el endpoint según la API
            if (data) {
                mainContent.innerHTML = `
                    <h2>Alumnos</h2>
                    <ul>
                        ${data.map(alumno => `<li>${alumno.nombre} - ${alumno.rendimiento}</li>`).join('')}
                    </ul>
                `;
            } else {
                mainContent.innerHTML = '<p>Error al cargar los datos de los alumnos.</p>';
            }
            break;
        case 'grupos':
            data = await obtenerDatosDesdeApi('grupos'); // Ajusta el endpoint según la API
            if (data) {
                mainContent.innerHTML = `
                    <h2>Grupos</h2>
                    <ul>
                        ${data.map(grupo => `<li>${grupo.nombre} - ${grupo.cantidadAlumnos} alumnos</li>`).join('')}
                    </ul>
                `;
            } else {
                mainContent.innerHTML = '<p>Error al cargar los datos de los grupos.</p>';
            }
            break;
        default:
            mainContent.innerHTML = `
                <h2>Bienvenido a KALEV</h2>
                <p>Seleccione una opción de la barra lateral para comenzar.</p>
            `;
            break;
    }
}

// Asignar los event listeners a cada enlace de la barra lateral
document.querySelector('#navEnseñanzas').addEventListener('click', () => cargarContenido('enseñanzas'));
document.querySelector('#navSolicitarActividad').addEventListener('click', () => cargarContenido('solicitarActividad'));
document.querySelector('#navEvaluarDesempeño').addEventListener('click', () => cargarContenido('evaluarDesempeño'));
document.querySelector('#navAlumnos').addEventListener('click', () => cargarContenido('alumnos'));
document.querySelector('#navGrupos').addEventListener('click', () => cargarContenido('grupos'));

// Cargar la pestaña por defecto al inicio
document.addEventListener('DOMContentLoaded', () => {
    cargarContenido('');
});

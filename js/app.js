import { handleRegister, handleLogin } from './auth.js';
import { setupDashboardNavigation } from './dashboard.js';
import { getGroups, getStudentsByGroup, getActivities, addActivity, updateActivity, deleteActivity, getStyles } from './api.js';

document.addEventListener("DOMContentLoaded", () => {

    // Llamadas para manejar el registro y login
    document.getElementById('registerFormSubmit')?.addEventListener('submit', handleRegister);
    document.getElementById('loginFormSubmit')?.addEventListener('submit', handleLogin);

    // Configuración de la navegación del Dashboard
    setupDashboardNavigation();

    // Función para manejar la carga de grupos
    async function loadGroups() {
        try {
            const groupsData = await getGroups();
            const groupsContainer = document.getElementById('groupButtons');
            groupsContainer.innerHTML = '';  // Limpiar contenido previo

            if (groupsData && groupsData.length > 0) {
                groupsData.forEach(group => {
                    const button = document.createElement('button');
                    button.classList.add('btn', 'btn-primary');
                    button.textContent = `${group.nombre_grupo}`;
                    button.addEventListener('click', () => loadStudents(group.id_grupo)); // Al hacer clic, cargar estudiantes
                    groupsContainer.appendChild(button);
                });
            } else {
                document.getElementById('noGroupsMessage').style.display = 'block';
            }
        } catch (error) {
            console.error('Error al obtener los grupos:', error.message);
            document.getElementById('noGroupsMessage').style.display = 'block';
        }
    }

    // Función para cargar los estudiantes de un grupo específico
    async function loadStudents(groupId) {
        try {
            const studentsData = await getStudentsByGroup(groupId);
            const studentsContainer = document.getElementById('studentsContainer');
            studentsContainer.innerHTML = '';  // Limpiar contenido previo

            if (studentsData.length > 0) {
                studentsData.forEach(student => {
                    const studentCard = document.createElement('div');
                    studentCard.classList.add('card', 'mb-3');
                    studentCard.style.backgroundColor = '#F59F00';  // Colores brillantes
                    studentCard.style.color = 'white';

                    studentCard.innerHTML = `
                        <div class="card-body">
                            <h5 class="card-title">${student.nombre}</h5>
                            <p class="card-text">Edad: ${student.fecha_nacimiento}</p>
                            <p class="card-text">Correo: ${student.correo}</p>
                        </div>
                    `;
                    studentsContainer.appendChild(studentCard);
                });
            } else {
                document.getElementById('noStudentsMessage').style.display = 'block';
            }
        } catch (error) {
            console.error('Error al obtener los estudiantes:', error.message);
            document.getElementById('noStudentsMessage').style.display = 'block';
        }
    }

    // Función para mostrar las actividades en el Dashboard
// Función para mostrar las actividades en el Dashboard
async function showActivities() {
    console.log('Fetching activities...');
    try {
        const activitiesData = await getActivities();  // Obtener datos de la API
        const activitiesContainer = document.getElementById('activitiesContainer');
        activitiesContainer.innerHTML = '';  // Limpiar contenido previo

        // Verificar si se han obtenido datos correctamente
        if (activitiesData && activitiesData.length > 0) {
            activitiesData.forEach(activity => {
                const activityCard = document.createElement('div');
                activityCard.classList.add('card', 'mb-3');
                activityCard.style.backgroundColor = '#4EBC97';  // Color brillante para actividades
                activityCard.style.color = 'white';

                // Usar datos de la actividad
                activityCard.innerHTML = `
                    <div class="card-body">
                        <h5 class="card-title">${activity.nombre_actividad || 'No disponible'}</h5>
                        <p class="card-text">${activity.descripcion || 'No disponible'}</p>
                        <p class="card-text">Fecha de inicio: ${activity.fecha_inicio || 'No disponible'}</p>
                        <p class="card-text">Fecha de fin: ${activity.fecha_fin || 'No disponible'}</p>
                        <button class="btn btn-warning" onclick="editActivity(${activity.id_actividad})">Editar</button>
                        <button class="btn btn-danger" onclick="deleteActivity(${activity.id_actividad})">Eliminar</button>
                    </div>
                `;
                activitiesContainer.appendChild(activityCard);
            });
        } else {
            // Mostrar mensaje si no hay actividades
            document.getElementById('noActivitiesMessage').style.display = 'block';
        }
    } catch (error) {
        console.error('Error al obtener las actividades:', error.message);
        document.getElementById('noActivitiesMessage').style.display = 'block';
    }
}




    // Función para mostrar el formulario de agregar o editar actividad
    function toggleActivityForm(isEditing = false, activityData = {}) {
        document.getElementById('activityForm').style.display = 'block';
        document.getElementById('formTitle').textContent = isEditing ? 'Editar Actividad' : 'Agregar Nueva Actividad';
        document.getElementById('activityName').value = activityData.nombre_actividad || '';
        document.getElementById('activityDescription').value = activityData.descripcion || '';
        document.getElementById('activityStart').value = activityData.fecha_inicio || '';
        document.getElementById('activityEnd').value = activityData.fecha_fin || '';
        document.getElementById('submitActivityBtn').textContent = isEditing ? 'Actualizar Actividad' : 'Guardar Actividad';

        // Llenar select de grupos
        loadGroupsSelect();

        // Llenar select de estilos
        loadStylesSelect();
    }

    // Cargar select de grupos
    async function loadGroupsSelect() {
        const groupsData = await getGroups();
        const groupSelect = document.getElementById('groupSelect');
        groupSelect.innerHTML = '';  // Limpiar opciones previas

        groupsData.forEach(group => {
            const option = document.createElement('option');
            option.value = group.id_grupo;
            option.textContent = group.nombre_grupo;
            groupSelect.appendChild(option);
        });
    }

    // Cargar select de estilos
    async function loadStylesSelect() {
        const stylesData = await getStyles();
        const styleSelect = document.getElementById('styleSelect');
        styleSelect.innerHTML = '';  // Limpiar opciones previas

        stylesData.forEach(style => {
            const option = document.createElement('option');
            option.value = style.id_estilo;
            option.textContent = style.nombre_estilo;
            styleSelect.appendChild(option);
        });
    }

// Agregar o editar actividad
document.getElementById('activityFormSubmit')?.addEventListener('submit', async (e) => {
    e.preventDefault();
    const activityData = {
        nombre_actividad: document.getElementById('activityName').value,
        descripcion: document.getElementById('activityDescription').value,
        fecha_inicio: document.getElementById('activityStart').value,
        fecha_fin: document.getElementById('activityEnd').value,
        id_grupo: document.getElementById('groupSelect').value,
        estilo_asociado: document.getElementById('styleSelect').value,
    };

    try {
        if (document.getElementById('submitActivityBtn').textContent === 'Guardar Actividad') {
            await addActivity(activityData);
            showActivities(); // Recargar actividades
        } else {
            const activityId = document.getElementById('activityId').value;
            await updateActivity(activityId, activityData);
            showActivities(); // Recargar actividades
        }

        // Ocultar formulario y restablecer
        document.getElementById('activityForm').style.display = 'none';
    } catch (error) {
        console.error('Error al guardar la actividad:', error);
    }
});


    // Cancelar formulario de actividad
    document.getElementById('cancelActivityBtn')?.addEventListener('click', () => {
        document.getElementById('activityForm').style.display = 'none';
    });

    window.editActivity = function (id) {
        console.log('Editando actividad con ID: ', id);  // Verificar si la función se activa
        const activityData = activitiesData.find(activity => activity.id_actividad === id);
        if (activityData) {
            toggleActivityForm(true, activityData); // Mostrar formulario con datos de la actividad
            document.getElementById('activityId').value = id;
        }
    }
    
    window.deleteActivity = async function (id) {
        try {
            console.log('Eliminando actividad con ID: ', id);  // Verificar si la función se activa
            await deleteActivity(id);  // Llamar a la API para eliminar la actividad
            showActivities();  // Volver a cargar las actividades después de eliminar
        } catch (error) {
            console.error('Error al eliminar la actividad:', error);
        }
    }
    
    


    // Cargar actividades al cargar la página
    showActivities();

    // Llamar a la función para cargar los grupos al inicio
    loadGroups();
});  // URL base de la API

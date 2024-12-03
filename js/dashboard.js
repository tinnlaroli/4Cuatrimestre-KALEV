import { getGroups, getStudentsByGroup, getActivities } from './api.js';

// Función para configurar la navegación del Dashboard
export function setupDashboardNavigation() {
    // Función para navegar entre las secciones del Dashboard
    document.getElementById('goToDashboard')?.addEventListener('click', function(event) {
        event.preventDefault();
        showSection('dashboard');
    });

    document.getElementById('goToGroups')?.addEventListener('click', function(event) {
        event.preventDefault();
        showSection('grupos');
        loadGroups();  // Cargar grupos desde la API
    });

    document.getElementById('goToStudents')?.addEventListener('click', function(event) {
        event.preventDefault();
        showSection('alumnos');
        loadStudents();  // Cargar estudiantes desde la API
    });

    document.getElementById('goToActivities')?.addEventListener('click', function(event) {
        event.preventDefault();
        showSection('actividades');
        loadActivities();  // Cargar actividades desde la API
    });
}

// Función para mostrar/ocultar secciones del dashboard
function showSection(sectionId) {
    const sections = document.querySelectorAll('.content-section');
    sections.forEach(section => {
        section.style.display = 'none';
    });

    const selectedSection = document.getElementById(sectionId);
    if (selectedSection) {
        selectedSection.style.display = 'block';
    }
}

// Función para cargar los grupos desde la API
export async function loadGroups() {
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
        console.error('Error al obtener los grupos:', error);
        document.getElementById('noGroupsMessage').style.display = 'block';
    }
}

// Función para cargar los estudiantes de un grupo específico
export async function loadStudents(groupId) {
    try {
        const studentsData = await getStudentsByGroup(groupId);  // Llamada a la API
        const studentsContainer = document.getElementById('studentsContainer');
        studentsContainer.innerHTML = '';  // Limpiar contenido previo

        console.log(studentsData);  // Añadir un log para verificar la respuesta

        // Verifica si la respuesta contiene la propiedad "estudiantes" y si tiene elementos
        if (studentsData && studentsData.estudiantes && studentsData.estudiantes.length > 0) {
            studentsData.estudiantes.forEach(student => {
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
        console.error('Error al obtener los estudiantes:', error);
        document.getElementById('noStudentsMessage').style.display = 'block';
    }
}

// Función para cargar las actividades desde la API
export async function loadActivities() {
    try {
        const activitiesData = await getActivities();  // Llamada a la función getActivities desde api.js
        const activitiesContainer = document.getElementById('activitiesContainer');
        activitiesContainer.innerHTML = '';  // Limpiar contenido previo

        if (activitiesData.length > 0) {
            activitiesData.forEach(activity => {
                const activityCard = document.createElement('div');
                activityCard.classList.add('card', 'mb-3');
                activityCard.style.backgroundColor = '#4EBC97';  // Color brillante para actividades
                activityCard.style.color = 'white';

                activityCard.innerHTML = `
                    <div class="card-body">
                        <h5 class="card-title">${activity.name}</h5>
                        <p class="card-text">Descripción: ${activity.description}</p>
                    </div>
                `;
                activitiesContainer.appendChild(activityCard);
            });
        } else {
            document.getElementById('noActivitiesMessage').style.display = 'block';
        }
    } catch (error) {
        console.error('Error al obtener las actividades:', error);
        document.getElementById('noActivitiesMessage').style.display = 'block';
    }
}

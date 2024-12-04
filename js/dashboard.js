import { getGroups, getStudentsByGroup, getActivities, addActivity, updateActivity, deleteActivity, getStyles } from './api.js';

let activitiesData = [];  // Define activitiesData globally to make it accessible

document.addEventListener("DOMContentLoaded", () => {
    setupDashboardNavigation();  // Initialize navigation

    // Function to load groups
    async function loadGroups() {
        try {
            const groupsData = await getGroups();
            const groupsContainer = document.getElementById('groupButtons');
            groupsContainer.innerHTML = '';  // Clear previous content

            if (groupsData && groupsData.length > 0) {
                groupsData.forEach(group => {
                    const button = document.createElement('button');
                    button.classList.add('btn', 'btn-primary');
                    button.textContent = `${group.nombre_grupo}`;
                    button.addEventListener('click', () => loadStudents(group.id_grupo)); // Load students on click
                    groupsContainer.appendChild(button);
                });
            } else {
                document.getElementById('noGroupsMessage').style.display = 'block';
            }
        } catch (error) {
            console.error('Error fetching groups:', error.message);
            document.getElementById('noGroupsMessage').style.display = 'block';
        }
    }

    // Function to load students for a specific group
    async function loadStudents(groupId) {
        try {
            const studentsData = await getStudentsByGroup(groupId);
            const studentsContainer = document.getElementById('studentsContainer');
            studentsContainer.innerHTML = '';  // Clear previous content

            if (studentsData && studentsData.length > 0) {
                studentsData.forEach(student => {
                    const studentCard = document.createElement('div');
                    studentCard.classList.add('card', 'mb-3');
                    studentCard.style.backgroundColor = '#F59F00';  // Bright colors
                    studentCard.style.color = 'white';

                    studentCard.innerHTML = `
                        <div class="card-body">
                            <h5 class="card-title">${student.nombre}</h5>
                            <p class="card-text">Age: ${new Date(student.fecha_nacimiento).toLocaleDateString()}</p>
                            <p class="card-text">Email: ${student.correo}</p>
                        </div>
                    `;
                    studentsContainer.appendChild(studentCard);
                });
            } else {
                document.getElementById('noStudentsMessage').style.display = 'block';
            }
        } catch (error) {
            console.error('Error fetching students:', error.message);
            document.getElementById('noStudentsMessage').style.display = 'block';
        }
    }

    // Function to show activities in the dashboard
    async function showActivities() {
        try {
            activitiesData = await getActivities();  // Fetch data from the API
            const activitiesContainer = document.getElementById('activitiesContainer');
            activitiesContainer.innerHTML = '';  // Clear previous content

            if (activitiesData && activitiesData.length > 0) {
                activitiesData.forEach(activity => {
                    const activityCard = document.createElement('div');
                    activityCard.classList.add('card', 'mb-3');
                    activityCard.style.backgroundColor = '#4EBC97';  // Bright color for activities
                    activityCard.style.color = 'white';

                    activityCard.innerHTML = `
                        <div class="card-body">
                            <h5 class="card-title">${activity.nombre_actividad || 'Not available'}</h5>
                            <p class="card-text">${activity.descripcion || 'Not available'}</p>
                            <p class="card-text">Start Date: ${new Date(activity.fecha_inicio).toLocaleDateString() || 'Not available'}</p>
                            <p class="card-text">End Date: ${new Date(activity.fecha_fin).toLocaleDateString() || 'Not available'}</p>
                            <button class="btn btn-warning" onclick="editActivity(${activity.id_actividad})">Edit</button>
                            <button class="btn btn-danger" onclick="deleteActivity(${activity.id_actividad})">Delete</button>
                        </div>
                    `;
                    activitiesContainer.appendChild(activityCard);
                });
            } else {
                document.getElementById('noActivitiesMessage').style.display = 'block';
            }
        } catch (error) {
            console.error('Error fetching activities:', error.message);
            document.getElementById('noActivitiesMessage').style.display = 'block';
        }
    }

    // Function to show the add/edit activity form
    function toggleActivityForm(isEditing = false, activityData = {}) {
        document.getElementById('activityForm').style.display = 'block';
        document.getElementById('formTitle').textContent = isEditing ? 'Edit Activity' : 'Add New Activity';
        document.getElementById('activityName').value = activityData.nombre_actividad || '';
        document.getElementById('activityDescription').value = activityData.descripcion || '';
        document.getElementById('activityStart').value = activityData.fecha_inicio || '';
        document.getElementById('activityEnd').value = activityData.fecha_fin || '';
        document.getElementById('submitActivityBtn').textContent = isEditing ? 'Update Activity' : 'Save Activity';

        loadGroupsSelect();
        loadStylesSelect();
    }

    // Load groups in the select field
    async function loadGroupsSelect() {
        const groupsData = await getGroups();
        const groupSelect = document.getElementById('groupSelect');
        groupSelect.innerHTML = '';  // Clear previous options

        groupsData.forEach(group => {
            const option = document.createElement('option');
            option.value = group.id_grupo;
            option.textContent = group.nombre_grupo;
            groupSelect.appendChild(option);
        });
    }

    // Load styles in the select field
    async function loadStylesSelect() {
        const stylesData = await getStyles();
        const styleSelect = document.getElementById('styleSelect');
        styleSelect.innerHTML = '';  // Clear previous options

        stylesData.forEach(style => {
            const option = document.createElement('option');
            option.value = style.id_estilo;
            option.textContent = style.nombre_estilo;
            styleSelect.appendChild(option);
        });
    }

    // Add or edit activity
    document.getElementById('activityFormSubmit')?.addEventListener('submit', async (e) => {
        e.preventDefault();
        const activityData = {
            nombre_actividad: document.getElementById('activityName').value,
            descripcion: document.getElementById('activityDescription').value,
            fecha_inicio: document.getElementById('activityStart').value,
            fecha_fin: document.getElementById('activityEnd').value,
            id_grupo: document.getElementById('groupSelect').value,
            id_actividad: document.getElementById('activityId').value,
            estilo_asociado: document.getElementById('styleSelect').value,
        };

        try {
            if (document.getElementById('submitActivityBtn').textContent === 'Save Activity') {
                await addActivity(activityData);
                showActivities();  // Reload activities
            } else {
                const activityId = document.getElementById('activityId').value;
                await updateActivity(activityId, activityData);
                showActivities();  // Reload activities
            }

            document.getElementById('activityForm').style.display = 'none';  // Hide the form
        } catch (error) {
            console.error('Error saving activity:', error);
        }
    });

    // Cancel activity form
    document.getElementById('cancelActivityBtn')?.addEventListener('click', () => {
        document.getElementById('activityForm').style.display = 'none';
    });

    window.editActivity = function (id) {
        console.log('Editing activity with ID: ', id); 
        const activityData = activitiesData.find(activity => activity.id_actividad === id);
        if (activityData) {
            toggleActivityForm(true, activityData); 
            document.getElementById('activityId').value = id;
        }
    };

    window.deleteActivity = async function (id) {
        try {
            console.log('Deleting activity with ID: ', id); 
            await deleteActivity(id);  
            showActivities();  
        } catch (error) {
            console.error('Error deleting activity:', error);
        }
    };

    showActivities();  // Load activities on page load
    loadGroups();  // Load groups on page load
});

// Navigation functions
function setupDashboardNavigation() {
    const goToDashboard = document.getElementById('goToDashboard');
    const goToGroups = document.getElementById('goToGroups');
    const goToStudents = document.getElementById('goToStudents');
    const goToActivities = document.getElementById('goToActivities');

    goToDashboard.addEventListener('click', (e) => {
        e.preventDefault();
        showSection('dashboard');
    });

    goToGroups.addEventListener('click', (e) => {
        e.preventDefault();
        showSection('grupos');
        loadGroups();
    });

    goToStudents.addEventListener('click', (e) => {
        e.preventDefault();
        showSection('alumnos');
    });

    goToActivities.addEventListener('click', (e) => {
        e.preventDefault();
        showSection('actividades');
        showActivities();
    });
}

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

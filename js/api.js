// URL base de la API
const apiUrl = 'https://kalev.up.railway.app';

// Función para hacer solicitudes con el token JWT
async function apiRequest(endpoint, method = 'GET', body = null) {
    const token = localStorage.getItem('token');
    
    if (!token) {
        // Redirigir al usuario al login si no hay token
        throw new Error('No se encuentra token de autenticación. Por favor, inicia sesión.');
    }

    const options = {
        method: method,
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`, // Incluir Authorization con token
        },
    };

    if (body) {
        options.body = JSON.stringify(body);
    }

    try {
        const response = await fetch(`${apiUrl}${endpoint}`, options);
        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || `Error: ${response.statusText}`);
        }

        return data;
    } catch (error) {
        console.error('Error en la API:', error);
        throw new Error('Hubo un problema con la solicitud a la API: ' + error.message);
    }
}


// Funciones de AUTH
////////////////////////////////////////////////////////////-AUTH-////////////////////////////////////////////////////////////
// Función para registrar un nuevo usuario
async function registerUser(name, email, password) {
    if (!name || !email || !password) {
        throw new Error('Por favor, completa todos los campos.');
    }

    const userData = {
        nombre: name,
        correo: email,
        password: password,
        rol: "docente" 
    };

    return apiRequest('/usuarios/register', 'POST', userData);
}

// Función para hacer login y obtener el token
async function loginUser(email, password) {
    if (!email || !password) {
        throw new Error('Por favor, ingresa tu correo y contraseña.');
    }
    
    const body = {
        correo: email,
        password: password
    };

    return apiRequest('/usuarios/login', 'POST', body);
}
////////////////////////////////////////////////////////////-FIN-AUTH-////////////////////////////////////////////////////////////

// Funciones de Actividades
////////////////////////////////////////////////////////////-ACTIVIDADES-////////////////////////////////////////////////////////////
// Función para obtener todas las actividades
async function getActivities() {
    try {
        const response = await apiRequest('/actividades', 'GET');
        return response || [];  // Devuelve las actividades o un array vacío si no hay datos
    } catch (error) {
        console.error('Error al obtener las actividades:', error.message);
        return [];  // Devuelve un array vacío si hay un error
    }
}

// Función para agregar una nueva actividad
async function addActivity(activityData) {
    try {
        const response = await apiRequest('/actividades', 'POST', activityData);
        return response;
    } catch (error) {
        console.error("Error al agregar la actividad:", error.message);
        throw new Error('No se pudo agregar la actividad.');
    }
}

// Función para eliminar una actividad
async function deleteActivity(id) {
    try {
        const response = await apiRequest(`/actividades/${id}`, 'DELETE');
        return response;
    } catch (error) {
        console.error("Error al eliminar la actividad:", error.message);
        throw new Error('No se pudo eliminar la actividad.');
    }
}

// Función para actualizar una actividad existente
async function updateActivity(id, activityData) {
    try {
        const response = await apiRequest(`/actividades/${id}`, 'PUT', activityData);
        return response;
    } catch (error) {
        console.error("Error al actualizar la actividad:", error.message);
        throw new Error('No se pudo actualizar la actividad.');
    }
}
////////////////////////////////////////////////////////////-FIN-ACTIVIDADES-////////////////////////////////////////////////////////////

// Funciones de Grupos
////////////////////////////////////////////////////////////-GRUPOS-////////////////////////////////////////////////////////////
// Función para obtener todos los grupos asignados al docente
async function getGroups(page = 1, limit = 10) {
    try {
        const response = await apiRequest(`/grupos?page=${page}&limit=${limit}`, 'GET');
        return response.grupos || []; // Devuelve el array de grupos, o vacío si no hay
    } catch (error) {
        console.error("Error al obtener los grupos:", error.message);
        return []; // Devuelve un array vacío si hay un error
    }
}



// Función para obtener los estudiantes dentro de un grupo
async function getStudentsByGroup(groupId) {
    try {
        const response = await apiRequest(`/grupos/${groupId}/students`, 'GET');
        return response || [];  // Devuelve los estudiantes o un array vacío si no hay
    } catch (error) {
        console.error('Error al obtener los estudiantes del grupo:', error.message);
        return [];  // Devuelve un array vacío si hay un error
    }
}


// Función para agregar un alumno a un grupo
async function addStudentToGroup(groupId, studentData) {
    try {
        const response = await apiRequest(`/grupos/${groupId}/students`, 'POST', studentData);
        return response;
    } catch (error) {
        console.error("Error al agregar el alumno:", error.message);
        throw new Error('No se pudo agregar el alumno al grupo.');
    }
}

// Función para eliminar un alumno de un grupo
async function removeStudentFromGroup(groupId, studentId) {
    try {
        const response = await apiRequest(`/grupos/${groupId}/students/${studentId}`, 'DELETE');
        return response;
    } catch (error) {
        console.error("Error al eliminar el alumno:", error.message);
        throw new Error('No se pudo eliminar el alumno del grupo.');
    }
}
////////////////////////////////////////////////////////////-FIN-GRUPOS-////////////////////////////////////////////////////////////

// Funciones de Feedback
////////////////////////////////////////////////////////////-FEEDBACK-////////////////////////////////////////////////////////////
// Función para obtener el feedback de un docente
async function getFeedback(id) {
    try {
        const response = await apiRequest(`/feedback/${id}`, 'GET');
        return response || {}; // Devuelve el feedback o un objeto vacío si no hay datos
    } catch (error) {
        console.error("Error al obtener el feedback:", error.message);
        return {}; // Devuelve un objeto vacío si hay un error
    }
}

// Función para enviar feedback sobre una estrategia
async function sendFeedback(feedbackData) {
    try {
        const response = await apiRequest('/feedback', 'POST', feedbackData);
        return response;
    } catch (error) {
        console.error("Error al enviar feedback:", error.message);
        throw new Error('No se pudo enviar el feedback.');
    }
}
////////////////////////////////////////////////////////////-FIN-FEEDBACK-////////////////////////////////////////////////////////////

// Funciones de Historial
////////////////////////////////////////////////////////////-HISTORIAL-////////////////////////////////////////////////////////////
// Función para obtener el historial de acciones importantes
async function getHistorial() {
    try {
        const response = await apiRequest('/historial', 'GET');
        return response || []; // Devuelve el historial o un array vacío si no hay datos
    } catch (error) {
        console.error("Error al obtener el historial:", error.message);
        return []; // Devuelve un array vacío si hay un error
    }
}
////////////////////////////////////////////////////////////-FIN-HISTORIAL-////////////////////////////////////////////////////////////

// Funciones de Recomendaciones
////////////////////////////////////////////////////////////-RECOMENDACIONES-////////////////////////////////////////////////////////////
// Función para obtener todas las recomendaciones
async function getRecommendations() {
    try {
        const response = await apiRequest('/recommendations', 'GET');
        return response || []; // Devuelve las recomendaciones o un array vacío si no hay
    } catch (error) {
        console.error("Error al obtener las recomendaciones:", error.message);
        return []; // Devuelve un array vacío si hay un error
    }
}

// Función para crear una nueva recomendación
async function createRecommendation(recommendationData) {
    try {
        const response = await apiRequest('/recommendations', 'POST', recommendationData);
        return response;
    } catch (error) {
        console.error("Error al crear la recomendación:", error.message);
        throw new Error('No se pudo crear la recomendación.');
    }
}

// Función para obtener una recomendación por ID
async function getRecommendationById(id) {
    try {
        const response = await apiRequest(`/recommendations/${id}`, 'GET');
        return response || {}; // Devuelve la recomendación o un objeto vacío si no hay
    } catch (error) {
        console.error("Error al obtener la recomendación:", error.message);
        return {}; // Devuelve un objeto vacío si hay un error
    }
}

// Función para actualizar una recomendación existente
async function updateRecommendation(id, recommendationData) {
    try {
        const response = await apiRequest(`/recommendations/${id}`, 'PUT', recommendationData);
        return response;
    } catch (error) {
        console.error("Error al actualizar la recomendación:", error.message);
        throw new Error('No se pudo actualizar la recomendación.');
    }
}

// Función para eliminar una recomendación
async function deleteRecommendation(id) {
    try {
        const response = await apiRequest(`/recommendations/${id}`, 'DELETE');
        return response;
    } catch (error) {
        console.error("Error al eliminar la recomendación:", error.message);
        throw new Error('No se pudo eliminar la recomendación.');
    }
}
////////////////////////////////////////////////////////////-FIN-RECOMENDACIONES-////////////////////////////////////////////////////////////

// Funciones de Reportes
////////////////////////////////////////////////////////////-REPORTES-////////////////////////////////////////////////////////////
// Función para generar reporte PDF de una clase
async function generateClassReport(classId) {
    try {
        const response = await apiRequest(`/reportes/clase/${classId}`, 'GET');
        return response;
    } catch (error) {
        console.error("Error al generar el reporte:", error.message);
        throw new Error('No se pudo generar el reporte.');
    }
}
////////////////////////////////////////////////////////////-FIN-REPORTES-////////////////////////////////////////////////////////////

// Funciones de Estilos de Aprendizaje
////////////////////////////////////////////////////////////-ESTILOS DE APRENDIZAJE-////////////////////////////////////////////////////////////
// Función para obtener todos los estilos de aprendizaje
async function getStyles() {
    try {
        const response = await apiRequest('/styles', 'GET');
        return response || []; // Devuelve los estilos o un array vacío si no hay
    } catch (error) {
        console.error("Error al obtener los estilos de aprendizaje:", error.message);
        return []; // Devuelve un array vacío si hay un error
    }
}

// Función para crear un nuevo estilo de aprendizaje
async function createStyle(styleData) {
    try {
        const response = await apiRequest('/styles', 'POST', styleData);
        return response;
    } catch (error) {
        console.error("Error al crear el estilo de aprendizaje:", error.message);
        throw new Error('No se pudo crear el estilo.');
    }
}

// Función para obtener un estilo de aprendizaje por ID
async function getStyleById(id) {
    try {
        const response = await apiRequest(`/styles/${id}`, 'GET');
        return response || {}; // Devuelve el estilo o un objeto vacío si no hay
    } catch (error) {
        console.error("Error al obtener el estilo de aprendizaje:", error.message);
        return {}; // Devuelve un objeto vacío si hay un error
    }
}

// Función para actualizar un estilo de aprendizaje
async function updateStyle(id, styleData) {
    try {
        const response = await apiRequest(`/styles/${id}`, 'PUT', styleData);
        return response;
    } catch (error) {
        console.error("Error al actualizar el estilo de aprendizaje:", error.message);
        throw new Error('No se pudo actualizar el estilo.');
    }
}

// Función para eliminar un estilo de aprendizaje
async function deleteStyle(id) {
    try {
        const response = await apiRequest(`/styles/${id}`, 'DELETE');
        return response;
    } catch (error) {
        console.error("Error al eliminar el estilo de aprendizaje:", error.message);
        throw new Error('No se pudo eliminar el estilo.');
    }
}
////////////////////////////////////////////////////////////-FIN-ESTILOS DE APRENDIZAJE-////////////////////////////////////////////////////////////

// Exportamos todas las funciones necesarias en una sola línea
export { 
    registerUser, 
    loginUser, 
    getGroups, 
    getStudentsByGroup, 
    addStudentToGroup, 
    removeStudentFromGroup, 
    getFeedback, 
    sendFeedback, 
    getHistorial,
    getRecommendations, 
    createRecommendation, 
    getRecommendationById, 
    updateRecommendation, 
    deleteRecommendation, 
    generateClassReport, 
    getStyles, 
    createStyle, 
    getStyleById, 
    updateStyle, 
    deleteStyle, 
    getActivities, 
    addActivity, 
    deleteActivity, 
    updateActivity 
};

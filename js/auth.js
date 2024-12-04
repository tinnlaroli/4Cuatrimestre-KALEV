const apiUrl = 'https://kalev.up.railway.app';

// Función para hacer solicitudes con el token JWT
async function apiRequest(endpoint, method = 'GET', body = null) {
    const token = localStorage.getItem('token');

    if (!token && endpoint !== '/usuarios/login' && endpoint !== '/usuarios/register') {
        window.location.href = 'login.html'; // Redirigir al login si no hay token
    }

    const options = {
        method: method,
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
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
        throw new Error('Hubo un problema con la solicitud a la API');
    }
}

// Función para iniciar sesión
async function loginUser(email, password) {
    try {
        const response = await apiRequest('/usuarios/login', 'POST', { correo: email, password: password });
        localStorage.setItem('token', response.token);
        window.location.href = 'dashboard.html'; // Redirigir a Dashboard después de login exitoso
    } catch (error) {
        console.error('Error al iniciar sesión:', error.message);
        alert('Error al iniciar sesión');
    }
}

// Función para registrar un nuevo usuario
// Función para registrar un nuevo usuario
async function registerUser(name, email, password) {
    try {
        // Incluimos el campo rol en el cuerpo de la solicitud
        const userData = {
            nombre: name,
            correo: email,
            password: password,
            rol: 'docente'  // Aquí agregamos el rol como 'docente'
        };
        
        // Realizamos la solicitud POST para el registro
        const response = await apiRequest('/usuarios/register', 'POST', userData);
 
        // Si la respuesta es exitosa, mostramos un mensaje y redirigimos al login
        alert('Usuario registrado con éxito');
        window.location.href = 'index.html'; // Redirigir a la página de login después del registro exitoso
    } catch (error) {
        // Si ocurre un error, lo mostramos en la consola y alertamos al usuario
        console.error('Error al registrar usuario:', error.message);
        alert('Error al registrar usuario');
    }
}


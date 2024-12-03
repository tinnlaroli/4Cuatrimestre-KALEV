import { registerUser, loginUser } from './api.js';

// Función para manejar el registro
export async function handleRegister(event) {
    event.preventDefault();

    const name = document.getElementById('registerName').value;
    const email = document.getElementById('registerEmail').value;
    const password = document.getElementById('registerPassword').value;

    // Validar si los campos están vacíos
    if (!name || !email || !password) {
        alert('Por favor, llena todos los campos.');
        return;
    }

    const newUser = {
        nombre: name,
        correo: email,
        password: password,
        rol: "docente"  // Solo "docente" en este caso
    };

    try {
        // Llamar a la API para registrar el nuevo usuario
        await registerUser(newUser);
        alert('Registro exitoso. Ahora puedes iniciar sesión.');
        toggleForms(); // Cambiar a formulario de login
    } catch (error) {
        console.error('Registro Error:', error);
        alert(`Error: ${error.message}`);
    }
}

// Función para manejar el login
export async function handleLogin(event) {
    event.preventDefault();

    const email = document.getElementById('loginEmail').value.trim();
    const password = document.getElementById('loginPassword').value.trim();

    // Validar si los campos están vacíos
    if (!email || !password) {
        alert('Por favor, ingresa tu correo y contraseña.');
        return;
    }

    try {
        // Llamar a la API para hacer login
        const data = await loginUser(email, password);

        // Verificar si se recibió un token
        if (data.token) {
            localStorage.setItem('token', data.token);  // Guardar token en el localStorage
            alert('Inicio de sesión exitoso.');
            window.location.href = 'dashboard.html';  // Redirigir al dashboard
        } else {
            throw new Error('No se recibió un token');
        }
    } catch (error) {
        console.error('Login Error:', error);
        alert(`Error: ${error.message}`);
    }
}

// Función para mostrar/ocultar formularios de login y registro
export function toggleForms() {
    const loginForm = document.getElementById('loginForm');
    const registerForm = document.getElementById('registerForm');
    
    // Alternar clases de visibilidad
    loginForm.classList.toggle('visible');
    registerForm.classList.toggle('visible');
}

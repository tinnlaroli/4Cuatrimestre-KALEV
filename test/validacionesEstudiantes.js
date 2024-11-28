// validaciones.js

export function validarNombre(nombre) {
    const regex = /^[A-Za-z\s]+$/; // Solo letras y espacios
    return regex.test(nombre);
}

export function estaEnClase(estudiante, clases) {
    return clases.some(clase => clase.estudiantes.includes(estudiante));
}

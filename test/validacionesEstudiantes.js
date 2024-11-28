// validaciones.js

export function validarNombre(nombre) {
    const regex = /^[A-Za-z\s]+$/; // Solo letras y espacios
    return regex.test(nombre);
}

export function estaEnClase(estudiante, clases) {
    return clases.some(clase => clase.estudiantes.includes(estudiante));
}

// Validación para el ID del juego (solo números)
function validarIDJuego(id) {
    const regex = /^[0-9]+$/;
    return regex.test(id);
  }
  
  // Validación para la asignación del juego (solo letras y espacios)
  function validarAsignacionEstudiante(nombre) {
    const regex = /^[a-zA-Z\s]+$/;
    return regex.test(nombre);
  }





  
  export { validarIDJuego, validarAsignacionEstudiante };
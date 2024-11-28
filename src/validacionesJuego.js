// Validar nombre del juego
export function validarNombreJuego(nombre) {
    const regex = /^[a-zA-Z]+( [a-zA-Z]+)*$/; // Solo letras y un espacio entre palabras
    return typeof nombre === 'string' &&
        regex.test(nombre) &&
        nombre.length <= 25 &&
        !nombre.includes('  ');
}

// Validar descripción del juego
export function validarDescripcion(descripcion) {
    return typeof descripcion === 'string' && /^[a-zA-Z ]+$/.test(descripcion);
}

// Validar dificultad del juego
export function validarDificultad(dificultad) {
    const opciones = ['fácil', 'intermedio', 'difícil'];
    return opciones.includes(dificultad.toLowerCase());
}

// Validar tipo de juego
export function validarTipoJuego(tipo) {
    const palabras = tipo.split(' ');
    return typeof tipo === 'string' &&
        /^[a-zA-Z ]+$/.test(tipo) &&
        palabras.length <= 20;
}

// Validar ID de clase
export function validarIdClase(idClase) {
    return typeof idClase === 'number' && idClase > 0;
}

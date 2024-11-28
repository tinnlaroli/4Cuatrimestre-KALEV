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
// games.js
const games = [
    { id: 1, name: "Chess" },
    { id: 2, name: "Monopoly" },
    { id: 3, name: "Scrabble" }
  ];
  
  export function getGameById(id) {
    if (typeof id !== "number" || isNaN(id)) {
      throw new Error("El ID debe ser un número.");
    }
  
    const game = games.find(game => game.id === id);
    if (!game) {
      throw new Error("Juego no encontrado.");
    }
  
    return game;
  }
// lógica para eliminar un juego
const juegos = new Map(); // simulamos una base de datos

function eliminarJuegoPorId(id) {
  if (typeof id !== 'number' || isNaN(id)) {
    throw new Error("El ID debe ser un número válido");
  }

  if (!juegos.has(id)) {
    throw new Error("El juego no existe");
  }

  juegos.delete(id);
  return true;
}

export { juegos, eliminarJuegoPorId };
  
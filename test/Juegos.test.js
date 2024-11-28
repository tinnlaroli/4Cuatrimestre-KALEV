import { expect } from 'chai';
import {validarNombreJuego,validarDescripcion,validarDificultad,validarTipoJuego,validarIdClase} from '../src/validacionesJuego.js'; // Cambia el nombre según tu archivo
import { getGameById } from "../src/validacionesJuego.js";
import { juegos, eliminarJuegoPorId } from "../src/validacionesJuego.js"; // ajusta la ruta según sea necesario


describe('Validaciones para crear un nuevo juego', () => {
    it('Validar nombre del juego', () => {
        expect(validarNombreJuego('Aventura Máxima')).to.be.true;
        expect(validarNombreJuego('Aventura123')).to.be.false;
        expect(validarNombreJuego('')).to.be.false;
        expect(validarNombreJuego('Aventura Máxima Extrema Muy Larga')).to.be.false; // Más de 25 caracteres
        expect(validarNombreJuego('Aventura  Máxima')).to.be.false; // Dos espacios
    });

    it('Validar descripción del juego', () => {
        expect(validarDescripcion('Juego de rol emocionante')).to.be.true;
        expect(validarDescripcion('123')).to.be.false;
        expect(validarDescripcion('Juego_emocionante')).to.be.false; // Caracteres especiales
    });

    it('Validar dificultad del juego', () => {
        expect(validarDificultad('fácil')).to.be.true;
        expect(validarDificultad('intermedio')).to.be.true;
        expect(validarDificultad('difícil')).to.be.true;
        expect(validarDificultad('avanzado')).to.be.false;
    });

    it('Validar tipo de juego', () => {
        expect(validarTipoJuego('Juego de aventuras')).to.be.true;
        expect(validarTipoJuego('Juego1')).to.be.false; // Contiene números
        expect(validarTipoJuego('Juego con un tipo de juego extremadamente largo para la prueba')).to.be.false; // Más de 20 palabras
    });

    it('Validar ID de la clase', () => {
        expect(validarIdClase(123)).to.be.true;
        expect(validarIdClase('123')).to.be.false; // Es string
        expect(validarIdClase(-1)).to.be.false; // Número negativo
        expect(validarIdClase(0)).to.be.false; // Cero no es válido
        expect(validarIdClase('')).to.be.false; // Espacio vacío
    });
});
describe("Pruebas para buscar un juego por su ID", () => {
    it("Debe retornar el juego si el ID es válido", () => {
      const game = getGameById(1);
      expect(game).to.be.an("object");
      expect(game).to.have.property("name", "Chess");
    });
  
    it("Debe lanzar un error si el ID no es un número", () => {
      expect(() => getGameById("abc")).to.throw("El ID debe ser un número.");
      expect(() => getGameById(null)).to.throw("El ID debe ser un número.");
      expect(() => getGameById(undefined)).to.throw("El ID debe ser un número.");
    });
  
    it("Debe lanzar un error si no encuentra el juego", () => {
      expect(() => getGameById(999)).to.throw("Juego no encontrado.");
    });
  });


describe("Validaciones para eliminar un juego por ID", () => {
  beforeEach(() => {
    // Configuramos el estado inicial antes de cada prueba
    juegos.set(1, { nombre: "Juego A" });
    juegos.set(2, { nombre: "Juego B" });
  });

  afterEach(() => {
    // Limpiamos los datos después de cada prueba
    juegos.clear();
  });

  it("Debería eliminar un juego si el ID es válido y existe", () => {
    const resultado = eliminarJuegoPorId(1);
    expect(resultado).to.be.true;
    expect(juegos.has(1)).to.be.false;
  });

  it("Debería lanzar un error si el ID no es un número", () => {
    expect(() => eliminarJuegoPorId("1a")).to.throw("El ID debe ser un número válido");
    expect(() => eliminarJuegoPorId("abc")).to.throw("El ID debe ser un número válido");
  });

  it("Debería lanzar un error si el juego no existe", () => {
    expect(() => eliminarJuegoPorId(99)).to.throw("El juego no existe");
  });

  it("Debería lanzar un error si el ID es NaN", () => {
    expect(() => eliminarJuegoPorId(NaN)).to.throw("El ID debe ser un número válido");
  });
});

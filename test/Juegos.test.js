import { expect } from 'chai';
import {validarNombreJuego,validarDescripcion,validarDificultad,validarTipoJuego,validarIdClase} from '../src/validacionesJuego.js'; // Cambia el nombre según tu archivo

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

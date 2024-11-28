import { expect } from 'chai';
import { validarNombre, estaEnClase } from "../src/validacionesEstudiantes.js";
import { validarIDJuego, validarAsignacionEstudiante } from '../src/validacionesEstudiantes.js';

describe("Validaciones de que un estudiante se una a una clase", () => {
    describe("Validar nombre", () => {
        it("Debería permitir solo letras y espacios", () => {
            expect(validarNombre("Juan Perez")).to.be.true;
        });

        it("No debería permitir números", () => {
            expect(validarNombre("Juan123")).to.be.false;
        });

        it("No debería permitir caracteres especiales", () => {
            expect(validarNombre("Juan@Perez")).to.be.false;
        });

        it("No debería permitir nombres vacíos", () => {
            expect(validarNombre("")).to.be.false;
        });
    });

    describe("Verificar si el estudiante está en clase", () => {
        const clases = [
            {
                nombre: "Matemáticas",
                estudiantes: ["Juan Perez", "Ana Lopez"]
            },
            {
                nombre: "Historia",
                estudiantes: ["Carlos Sanchez", "Ana Lopez"]
            }
        ];

        it("Debería devolver true si el estudiante está en al menos una clase", () => {
            expect(estaEnClase("Juan Perez", clases)).to.be.true;
        });

        it("Debería devolver false si el estudiante no está en ninguna clase", () => {
            expect(estaEnClase("Luis Gomez", clases)).to.be.false;
        });
    });
});
//
describe('Validaciones de asignación de juego a un estudiante', () => {

    // Test para validar el ID del juego
    describe('Validación del ID del juego', () => {
      it('debería ser válido si el ID es solo números', () => {
        const resultado = validarIDJuego('12345');
        expect(resultado).to.be.true;
      });
  
      it('debería ser inválido si el ID contiene letras o caracteres especiales', () => {
        const resultado = validarIDJuego('123a45');
        expect(resultado).to.be.false;
      });
  
      it('debería ser inválido si el ID está vacío', () => {
        const resultado = validarIDJuego('');
        expect(resultado).to.be.false;
      });
    });
  
    // Test para validar la asignación al estudiante
    describe('Validación de la asignación al estudiante', () => {
      it('debería ser inválido si el nombre contiene números', () => {
        const resultado = validarAsignacionEstudiante('Juan123 Pérez');
        expect(resultado).to.be.false;
      });
  
      it('debería ser inválido si el nombre contiene caracteres especiales', () => {
        const resultado = validarAsignacionEstudiante('Juan! Pérez');
        expect(resultado).to.be.false;
      });
  
      it('debería ser inválido si el nombre está vacío', () => {
        const resultado = validarAsignacionEstudiante('');
        expect(resultado).to.be.false;
      });
    });
  });
 
import { expect } from 'chai';
import { validarNombre, estaEnClase } from "../src/validacionesEstudiantes.js";

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
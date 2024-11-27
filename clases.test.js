import { expect } from 'chai';

// Funciones de validación
function validarNombreClase(nombre) {
  // Valida que solo contenga letras y tenga una longitud de hasta 100 caracteres
  const regex = /^[A-Za-záéíóúÁÉÍÓÚÑñ\s]*$/;
  if (nombre.length > 100) return false;
  return regex.test(nombre);
}

function validarCodigoClase(codigo) {
  // Valida que solo contenga números y letras y tenga una longitud de hasta 50 caracteres
  const regex = /^[A-Za-z0-9]*$/;
  if (codigo.length > 50) return false;
  return regex.test(codigo);
}

describe('Validaciones de clase', function() {
  it('debería validar el nombre de la clase correctamente', function() {
    // Prueba casos válidos
    expect(validarNombreClase("Matemáticas")).to.be.true;
    expect(validarNombreClase("Español")).to.be.true;
    expect(validarNombreClase("Ciencia")).to.be.true;
    expect(validarNombreClase("Geografia")).to.be.true;

    // Prueba casos inválidos
    expect(validarNombreClase("Matemáticas 101")).to.be.false; // Contiene un número
    expect(validarNombreClase("Español!!!")).to.be.false; // Contiene caracteres especiales
    expect(validarNombreClase("a".repeat(101))).to.be.false; // Longitud mayor a 100
  });

  it('debería validar el código de la clase correctamente', function() {
    // Prueba casos válidos
    expect(validarCodigoClase("ABC123")).to.be.true;
    expect(validarCodigoClase("12345ABC")).to.be.true;

    // Prueba casos inválidos
    expect(validarCodigoClase("ABC@123")).to.be.false; // Contiene un carácter especial
    expect(validarCodigoClase("ABC123!".repeat(10))).to.be.false; // Longitud mayor a 50
  });
});

describe('Crear Clase', function() {
  
    describe('validarNombreClase', function() {
      it('debería ser verdadero si el nombre solo tiene letras', function() {
        expect(validarNombreClase('Matematica')).to.be.true;
      });
      
      it('debería ser falso si el nombre tiene números', function() {
        expect(validarNombreClase('Matematica101')).to.be.false;
      });
      
      it('debería ser falso si el nombre tiene caracteres especiales', function() {
        expect(validarNombreClase('Matematica@')).to.be.false;
      });
      
      it('debería ser falso si el nombre está vacío', function() {
        expect(validarNombreClase('')).to.be.false;
      });
    });
  
    describe('validarCodigoClase', function() {
      it('debería ser verdadero si el código solo tiene números', function() {
        expect(validarCodigoClase('123456')).to.be.true;
      });
      
      it('debería ser falso si el código tiene letras', function() {
        expect(validarCodigoClase('123a56')).to.be.false;
      });
      
      it('debería ser falso si el código tiene caracteres especiales', function() {
        expect(validarCodigoClase('123$56')).to.be.false;
      });
      
      it('debería ser falso si el código está vacío', function() {
        expect(validarCodigoClase('')).to.be.false;
      });
    });
  });


import { expect } from 'chai';

// Funciones de validación
function validarNombreClase(nombre) {
  const regex = /^[A-Za-záéíóúÁÉÍÓÚÑñ\s]*$/;
  if (nombre.length > 100 || nombre === '') return false;
  return regex.test(nombre);
}

function validarCodigoClase(codigo) {
  const regex = /^[A-Za-z0-9]*$/;
  if (codigo.length > 50 || codigo === '') return false;
  return regex.test(codigo);
}

function consultarClasesDocente(docenteId) {
  // Simulación de la función consultarClasesDocente
  // En un caso real, esta función interactuaría con la base de datos o API
  const clases = [
    { docenteId: '12345', nombre: 'Matemáticas' },
    { docenteId: '12345', nombre: 'Español' },
    { docenteId: '67890', nombre: 'Ciencias' },
  ];
  return clases.filter(clase => clase.docenteId === docenteId);
}

function validateClassId(classId) {
  const regex = /^[0-9]*$/;
  return regex.test(classId) && classId !== '';
}

function validateGameId(gameId) {
  const regex = /^[0-9]*$/;
  return regex.test(gameId) && gameId !== '';
}

describe('Validaciones de clase', function() {
  it('debería validar el nombre de la clase correctamente', function() {
    expect(validarNombreClase("Matemáticas")).to.be.true;
    expect(validarNombreClase("Español")).to.be.true;
    expect(validarNombreClase("Ciencia")).to.be.true;
    expect(validarNombreClase("Geografia")).to.be.true;

    expect(validarNombreClase("Matemáticas 101")).to.be.false; 
    expect(validarNombreClase("Español!!!")).to.be.false; 
    expect(validarNombreClase("a".repeat(101))).to.be.false; 
  });

  it('debería validar el código de la clase correctamente', function() {
    expect(validarCodigoClase("ABC123")).to.be.true;
    expect(validarCodigoClase("12345ABC")).to.be.true;

    expect(validarCodigoClase("ABC@123")).to.be.false; 
    expect(validarCodigoClase("ABC123!".repeat(10))).to.be.false; 
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

  describe('Obtener una clase por su codigo', function() {
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

describe('Validación de código de clase', function() {
  it('Debe permitir solo letras y números en el código de clase', function() {
    const codigoValido = 'CLASE123';
    const codigoInvalido = 'CLASE@123';

    expect(validarCodigoClase(codigoValido)).to.be.true;
    expect(validarCodigoClase(codigoInvalido)).to.be.false;
  });
});

describe('Validación de Código de Clase', function() {
  it('debería ser válido si el código contiene solo letras y números', function() {
    expect(validarCodigoClase('Clase123')).to.be.true;
  });

  it('debería ser inválido si el código contiene caracteres especiales', function() {
    expect(validarCodigoClase('Clase@123')).to.be.false;
  });

  it('debería ser inválido si el código contiene espacios', function() {
    expect(validarCodigoClase('Clase 123')).to.be.false;
  });

  it('debería ser válido si el código tiene solo números', function() {
    expect(validarCodigoClase('123456')).to.be.true;
  });

  it('debería ser inválido si el código está vacío', function() {
    expect(validarCodigoClase('')).to.be.false;
  });
});

describe('Consulta de clases del docente', function() {
  it('debe retornar solo las clases impartidas por el docente con el ID especificado', async function() {
    const docenteId = '12345';
    const clases = await consultarClasesDocente(docenteId);

    expect(clases).to.be.an('array');
    clases.forEach(clase => {
      expect(clase.docenteId).to.equal(docenteId);
    });
  });
});

describe('Validaciones de Asignación de Juego a Clase', () => {
  describe('Validación del ID de la Clase', () => {
    it('debería ser válido si el ID de la clase contiene solo números', () => {
      expect(validateClassId('123')).to.be.true;
    });

    it('no debería ser válido si el ID de la clase contiene letras', () => {
      expect(validateClassId('abc')).to.be.false;
    });

    it('no debería ser válido si el ID de la clase contiene caracteres especiales', () => {
      expect(validateClassId('123@')).to.be.false;
    });

    it('no debería ser válido si el ID de la clase está vacío', () => {
      expect(validateClassId('')).to.be.false;
    });
  });

  describe('Validación del ID del Juego', () => {
    it('debería ser válido si el ID del juego contiene solo números', () => {
      expect(validateGameId('456')).to.be.true;
    });

    it('no debería ser válido si el ID del juego contiene letras', () => {
      expect(validateGameId('game123')).to.be.false;
    });

    it('no debería ser válido si el ID del juego contiene caracteres especiales', () => {
      expect(validateGameId('456!')).to.be.false;
    });

    it('no debería ser válido si el ID del juego está vacío', () => {
      expect(validateGameId('')).to.be.false;
    });
  });
});

describe('Buscar la clase por su código', () => {
  it('debería aceptar solo números', () => {
    expect(validateClassId('123456')).to.be.true;
  });

  it('debería rechazar letras', () => {
    expect(validateClassId('123ABC')).to.be.false;
  });

  it('debería rechazar caracteres especiales', () => {
    expect(validateClassId('123@#$')).to.be.false;
  });

  it('debería rechazar un string vacío', () => {
    expect(validateClassId('')).to.be.false;
  });
});

describe('Verificar si el estudiante ya está registrado en la clase', () => {
  it('debe ser válido cuando solo contiene letras y números', () => {
    expect(validarNombreClase('CLASE2024')).to.be.true;
  });

  it('debe ser inválido cuando contiene caracteres especiales', () => {
    expect(validarNombreClase('CLASE@2024')).to.be.false;
  });

  it('debe ser inválido cuando contiene espacios', () => {
    expect(validarNombreClase('CLASE 2024')).to.be.false;
  });

  it('debe ser inválido cuando está vacío', () => {
    expect(validarNombreClase('')).to.be.false;
  });
});

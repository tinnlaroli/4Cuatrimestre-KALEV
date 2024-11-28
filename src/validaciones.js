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
  
-- Crear los tipos ENUM
CREATE TYPE rol_type AS ENUM ('jugador', 'docente');
CREATE TYPE tipo_objeto_type AS ENUM ('secreto', 'objeto');

-- Crear la tabla Usuarios
CREATE TABLE Usuarios (
    id_usuario SERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    rol rol_type NOT NULL,
    correo VARCHAR(150) UNIQUE NOT NULL,
    contraseña VARCHAR(150) NOT NULL,
    fecha_registro TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Crear la tabla Clases
CREATE TABLE Clases (
    id_clase SERIAL PRIMARY KEY,
    nombre_clase VARCHAR(100) NOT NULL,
    codigo_clase VARCHAR(50) UNIQUE NOT NULL,
    id_docente INT REFERENCES Usuarios(id_usuario),
    fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Crear la tabla EstudiantesPorClase
CREATE TABLE EstudiantesPorClase (
    id_estudiante_clase SERIAL PRIMARY KEY,
    id_clase INT REFERENCES Clases(id_clase),
    id_estudiante INT REFERENCES Usuarios(id_usuario),
    fecha_union TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Crear la tabla EstilosDeAprendizaje
CREATE TABLE EstilosDeAprendizaje (
    id_estilo SERIAL PRIMARY KEY,
    nombre VARCHAR(50) NOT NULL,
    descripcion TEXT NOT NULL
);

-- Crear la tabla Casas
CREATE TABLE Casas (
    id_casa SERIAL PRIMARY KEY,
    nombre_casa VARCHAR(50) NOT NULL,
    id_estilo INT REFERENCES EstilosDeAprendizaje(id_estilo),
    descripcion TEXT NOT NULL
);

-- Crear la tabla PuertasCasa
CREATE TABLE PuertasCasa (
    id_puerta SERIAL PRIMARY KEY,
    id_casa INT REFERENCES Casas(id_casa),
    nombre_puerta VARCHAR(50) NOT NULL,
    descripcion TEXT NOT NULL
);

-- Crear la tabla DesbloqueoPuertas
CREATE TABLE DesbloqueoPuertas (
    id_desbloqueo SERIAL PRIMARY KEY,
    id_estudiante INT REFERENCES Usuarios(id_usuario),
    id_puerta INT REFERENCES PuertasCasa(id_puerta),
    fecha_desbloqueo TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Crear la tabla SecretosYObjetos
CREATE TABLE SecretosYObjetos (
    id_objeto SERIAL PRIMARY KEY,
    id_puerta INT REFERENCES PuertasCasa(id_puerta),
    nombre_objeto VARCHAR(100) NOT NULL,
    descripcion TEXT NOT NULL,
    tipo_objeto tipo_objeto_type NOT NULL
);

-- Crear la tabla Medallas
CREATE TABLE Medallas (
    id_medalla SERIAL PRIMARY KEY,
    id_estudiante INT REFERENCES Usuarios(id_usuario),
    nombre_medalla VARCHAR(100) NOT NULL,
    descripcion TEXT NOT NULL,
    estilo_aprendizaje INT REFERENCES EstilosDeAprendizaje(id_estilo),
    fecha_otorgada TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Crear la tabla HistorialDePremios
CREATE TABLE HistorialDePremios (
    id_historial SERIAL PRIMARY KEY,
    id_estudiante INT REFERENCES Usuarios(id_usuario),
    id_medalla INT REFERENCES Medallas(id_medalla),
    id_objeto INT REFERENCES SecretosYObjetos(id_objeto),
    id_puerta INT REFERENCES PuertasCasa(id_puerta),
    tipo_premio tipo_objeto_type NOT NULL,
    fecha_ganado TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Crear la tabla ProgresoEstilosDeAprendizaje
CREATE TABLE ProgresoEstilosDeAprendizaje (
    id_progreso SERIAL PRIMARY KEY,
    id_estudiante INT REFERENCES Usuarios(id_usuario),
    id_estilo INT REFERENCES EstilosDeAprendizaje(id_estilo),
    nivel INT DEFAULT 0,
    fecha_inicio TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
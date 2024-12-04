-- Creación de la base de datos KALEV con todas las buenas prácticas, triggers y logs.
-- Incluye los estilos de aprendizaje, perfiles de alumnos, grupos, actividades, estrategias y sistema de feedback.

-- Creación de esquemas para organización
CREATE SCHEMA kalev;
CREATE SCHEMA logs;

-- Tabla de Roles
CREATE TABLE kalev.roles (
    id_rol SERIAL PRIMARY KEY,
    nombre_rol VARCHAR(50) NOT NULL UNIQUE,
    descripcion TEXT
);

-- Tabla de Usuarios
CREATE TABLE kalev.usuarios (
    id_usuario SERIAL PRIMARY KEY,
    nombre_usuario VARCHAR(100) NOT NULL,
    correo VARCHAR(100) NOT NULL UNIQUE,
    contrasena VARCHAR(255) NOT NULL,
    id_rol INT NOT NULL REFERENCES kalev.roles(id_rol),
    fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabla de Docentes
CREATE TABLE kalev.docentes (
    id_docente SERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    apellido VARCHAR(100) NOT NULL,
    correo VARCHAR(100) NOT NULL,
    telefono VARCHAR(15),
    id_usuario INT NOT NULL REFERENCES kalev.usuarios(id_usuario)
);

-- Tabla de Directores
CREATE TABLE kalev.directores (
    id_director SERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    apellido VARCHAR(100) NOT NULL,
    correo VARCHAR(100) NOT NULL,
    telefono VARCHAR(15),
    fecha_designacion DATE NOT NULL,
    id_usuario INT NOT NULL REFERENCES kalev.usuarios(id_usuario)
);

-- Tabla de Alumnos
CREATE TABLE kalev.alumnos (
    id_alumno SERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    apellido VARCHAR(100) NOT NULL,
    fecha_nacimiento DATE NOT NULL,
    correo VARCHAR(100),
    telefono VARCHAR(15),
    id_grupo INT REFERENCES kalev.grupos(id_grupo),
    fecha_registro TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabla de Grupos
CREATE TABLE kalev.grupos (
    id_grupo SERIAL PRIMARY KEY,
    nombre_grupo VARCHAR(50) NOT NULL,
    id_docente INT NOT NULL REFERENCES kalev.docentes(id_docente),
    id_director INT NOT NULL REFERENCES kalev.directores(id_director),
    fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    grado VARCHAR(50) NOT NULL,
    codigo_unico VARCHAR(10) NOT NULL UNIQUE
);

-- Tabla de Estilos de Aprendizaje
CREATE TABLE kalev.estilos_aprendizaje (
    id_estilo SERIAL PRIMARY KEY,
    nombre_estilo VARCHAR(50) NOT NULL UNIQUE
);

-- Tabla de Resultados de Estilos de Aprendizaje
CREATE TABLE kalev.resultados_estilos (
    id_resultado SERIAL PRIMARY KEY,
    id_alumno INT NOT NULL REFERENCES kalev.alumnos(id_alumno),
    id_estilo INT NOT NULL REFERENCES kalev.estilos_aprendizaje(id_estilo),
    porcentaje NUMERIC(5, 2) NOT NULL,
    fecha_registro TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabla de Actividades Académicas
CREATE TABLE kalev.actividades_academicas (
    id_actividad SERIAL PRIMARY KEY,
    nombre_actividad VARCHAR(100) NOT NULL,
    descripcion TEXT,
    fecha_inicio DATE NOT NULL,
    fecha_fin DATE NOT NULL,
    id_grupo INT NOT NULL REFERENCES kalev.grupos(id_grupo),
    estilo_asociado INT REFERENCES kalev.estilos_aprendizaje(id_estilo)
);

-- Tabla de Actividades KALEV
CREATE TABLE kalev.actividades_kalev (
    id_actividad SERIAL PRIMARY KEY,
    nombre_actividad VARCHAR(100) NOT NULL,
    descripcion TEXT,
    fecha_inicio DATE NOT NULL,
    fecha_fin DATE NOT NULL,
    id_grupo INT NOT NULL REFERENCES kalev.grupos(id_grupo)
);

-- Relación Alumno-Actividad Académica
CREATE TABLE kalev.alumno_actividad_academica (
    id_alumno_actividad SERIAL PRIMARY KEY,
    id_alumno INT NOT NULL REFERENCES kalev.alumnos(id_alumno),
    id_actividad INT NOT NULL REFERENCES kalev.actividades_academicas(id_actividad),
    estado VARCHAR(50) NOT NULL,
    calificacion NUMERIC(5, 2)
);

-- Relación Alumno-Actividad KALEV
CREATE TABLE kalev.alumno_actividad_kalev (
    id_alumno_actividad_kalev SERIAL PRIMARY KEY,
    id_alumno INT NOT NULL REFERENCES kalev.alumnos(id_alumno),
    id_actividad INT NOT NULL REFERENCES kalev.actividades_kalev(id_actividad),
    estado VARCHAR(50) NOT NULL
);

-- Tabla de Estrategias de Enseñanza
CREATE TABLE kalev.estrategias_ensenanza (
    id_estrategia SERIAL PRIMARY KEY,
    descripcion TEXT NOT NULL,
    fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabla de Feedback de Estrategias
CREATE TABLE kalev.feedback_estrategias (
    id_feedback SERIAL PRIMARY KEY,
    id_estrategia INT NOT NULL REFERENCES kalev.estrategias_ensenanza(id_estrategia),
    id_docente INT NOT NULL REFERENCES kalev.docentes(id_docente),
    efectividad NUMERIC(3, 2) NOT NULL CHECK (efectividad >= 0 AND efectividad <= 10),
    comentario TEXT,
    fecha_registro TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


CREATE TABLE kalev.historial (
    id_historial SERIAL PRIMARY KEY,
    accion TEXT NOT NULL,
    fecha TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Logs de cambios
CREATE TABLE logs.cambios (
    id_log SERIAL PRIMARY KEY,
    tabla_afectada VARCHAR(50) NOT NULL,
    accion VARCHAR(10) NOT NULL,
    id_registro INT NOT NULL,
    fecha TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    usuario VARCHAR(100)
);

-- Trigger para registrar cambios
CREATE OR REPLACE FUNCTION logs.registrar_cambio()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO logs.cambios (tabla_afectada, accion, id_registro, usuario)
    VALUES (TG_TABLE_NAME, TG_OP, NEW.id, current_user);
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Aplicación de triggers a tablas importantes
CREATE TRIGGER log_cambios_usuarios
AFTER INSERT OR UPDATE OR DELETE ON kalev.usuarios
FOR EACH ROW EXECUTE FUNCTION logs.registrar_cambio();

CREATE TRIGGER log_cambios_alumnos
AFTER INSERT OR UPDATE OR DELETE ON kalev.alumnos
FOR EACH ROW EXECUTE FUNCTION logs.registrar_cambio();

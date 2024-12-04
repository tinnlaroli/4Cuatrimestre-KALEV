--
-- PostgreSQL database dump
--

-- Dumped from database version 16.3
-- Dumped by pg_dump version 16.4

-- Started on 2024-11-30 02:53:43

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- TOC entry 6 (class 2615 OID 33120)
-- Name: kalev; Type: SCHEMA; Schema: -; Owner: postgres
--

CREATE SCHEMA kalev;


ALTER SCHEMA kalev OWNER TO postgres;

--
-- TOC entry 7 (class 2615 OID 33121)
-- Name: logs; Type: SCHEMA; Schema: -; Owner: postgres
--

CREATE SCHEMA logs;


ALTER SCHEMA logs OWNER TO postgres;

--
-- TOC entry 249 (class 1255 OID 33408)
-- Name: registrar_cambio(); Type: FUNCTION; Schema: logs; Owner: postgres
--

CREATE FUNCTION logs.registrar_cambio() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
BEGIN
    INSERT INTO logs.cambios (tabla_afectada, accion, id_registro, usuario)
    VALUES (TG_TABLE_NAME, TG_OP, NEW.id, current_user);
    RETURN NEW;
END;
$$;


ALTER FUNCTION logs.registrar_cambio() OWNER TO postgres;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 234 (class 1259 OID 33300)
-- Name: actividades_academicas; Type: TABLE; Schema: kalev; Owner: postgres
--

CREATE TABLE kalev.actividades_academicas (
    id_actividad integer NOT NULL,
    nombre_actividad character varying(100) NOT NULL,
    descripcion text,
    fecha_inicio date NOT NULL,
    fecha_fin date NOT NULL,
    id_grupo integer NOT NULL,
    estilo_asociado integer
);


ALTER TABLE kalev.actividades_academicas OWNER TO postgres;

--
-- TOC entry 233 (class 1259 OID 33299)
-- Name: actividades_academicas_id_actividad_seq; Type: SEQUENCE; Schema: kalev; Owner: postgres
--

CREATE SEQUENCE kalev.actividades_academicas_id_actividad_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE kalev.actividades_academicas_id_actividad_seq OWNER TO postgres;

--
-- TOC entry 5077 (class 0 OID 0)
-- Dependencies: 233
-- Name: actividades_academicas_id_actividad_seq; Type: SEQUENCE OWNED BY; Schema: kalev; Owner: postgres
--

ALTER SEQUENCE kalev.actividades_academicas_id_actividad_seq OWNED BY kalev.actividades_academicas.id_actividad;


--
-- TOC entry 236 (class 1259 OID 33321)
-- Name: actividades_kalev; Type: TABLE; Schema: kalev; Owner: postgres
--

CREATE TABLE kalev.actividades_kalev (
    id_actividad integer NOT NULL,
    nombre_actividad character varying(100) NOT NULL,
    descripcion text,
    fecha_inicio date NOT NULL,
    fecha_fin date NOT NULL,
    id_grupo integer NOT NULL
);


ALTER TABLE kalev.actividades_kalev OWNER TO postgres;

--
-- TOC entry 235 (class 1259 OID 33320)
-- Name: actividades_kalev_id_actividad_seq; Type: SEQUENCE; Schema: kalev; Owner: postgres
--

CREATE SEQUENCE kalev.actividades_kalev_id_actividad_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE kalev.actividades_kalev_id_actividad_seq OWNER TO postgres;

--
-- TOC entry 5078 (class 0 OID 0)
-- Dependencies: 235
-- Name: actividades_kalev_id_actividad_seq; Type: SEQUENCE OWNED BY; Schema: kalev; Owner: postgres
--

ALTER SEQUENCE kalev.actividades_kalev_id_actividad_seq OWNED BY kalev.actividades_kalev.id_actividad;


--
-- TOC entry 238 (class 1259 OID 33335)
-- Name: alumno_actividad_academica; Type: TABLE; Schema: kalev; Owner: postgres
--

CREATE TABLE kalev.alumno_actividad_academica (
    id_alumno_actividad integer NOT NULL,
    id_alumno integer NOT NULL,
    id_actividad integer NOT NULL,
    estado character varying(50) NOT NULL,
    calificacion numeric(5,2)
);


ALTER TABLE kalev.alumno_actividad_academica OWNER TO postgres;

--
-- TOC entry 237 (class 1259 OID 33334)
-- Name: alumno_actividad_academica_id_alumno_actividad_seq; Type: SEQUENCE; Schema: kalev; Owner: postgres
--

CREATE SEQUENCE kalev.alumno_actividad_academica_id_alumno_actividad_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE kalev.alumno_actividad_academica_id_alumno_actividad_seq OWNER TO postgres;

--
-- TOC entry 5079 (class 0 OID 0)
-- Dependencies: 237
-- Name: alumno_actividad_academica_id_alumno_actividad_seq; Type: SEQUENCE OWNED BY; Schema: kalev; Owner: postgres
--

ALTER SEQUENCE kalev.alumno_actividad_academica_id_alumno_actividad_seq OWNED BY kalev.alumno_actividad_academica.id_alumno_actividad;


--
-- TOC entry 240 (class 1259 OID 33352)
-- Name: alumno_actividad_kalev; Type: TABLE; Schema: kalev; Owner: postgres
--

CREATE TABLE kalev.alumno_actividad_kalev (
    id_alumno_actividad_kalev integer NOT NULL,
    id_alumno integer NOT NULL,
    id_actividad integer NOT NULL,
    estado character varying(50) NOT NULL
);


ALTER TABLE kalev.alumno_actividad_kalev OWNER TO postgres;

--
-- TOC entry 239 (class 1259 OID 33351)
-- Name: alumno_actividad_kalev_id_alumno_actividad_kalev_seq; Type: SEQUENCE; Schema: kalev; Owner: postgres
--

CREATE SEQUENCE kalev.alumno_actividad_kalev_id_alumno_actividad_kalev_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE kalev.alumno_actividad_kalev_id_alumno_actividad_kalev_seq OWNER TO postgres;

--
-- TOC entry 5080 (class 0 OID 0)
-- Dependencies: 239
-- Name: alumno_actividad_kalev_id_alumno_actividad_kalev_seq; Type: SEQUENCE OWNED BY; Schema: kalev; Owner: postgres
--

ALTER SEQUENCE kalev.alumno_actividad_kalev_id_alumno_actividad_kalev_seq OWNED BY kalev.alumno_actividad_kalev.id_alumno_actividad_kalev;


--
-- TOC entry 228 (class 1259 OID 33259)
-- Name: alumnos; Type: TABLE; Schema: kalev; Owner: postgres
--

CREATE TABLE kalev.alumnos (
    id_alumno integer NOT NULL,
    nombre character varying(100) NOT NULL,
    apellido character varying(100) NOT NULL,
    fecha_nacimiento date NOT NULL,
    correo character varying(100),
    telefono character varying(15),
    id_grupo integer,
    fecha_registro timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE kalev.alumnos OWNER TO postgres;

--
-- TOC entry 227 (class 1259 OID 33258)
-- Name: alumnos_id_alumno_seq; Type: SEQUENCE; Schema: kalev; Owner: postgres
--

CREATE SEQUENCE kalev.alumnos_id_alumno_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE kalev.alumnos_id_alumno_seq OWNER TO postgres;

--
-- TOC entry 5081 (class 0 OID 0)
-- Dependencies: 227
-- Name: alumnos_id_alumno_seq; Type: SEQUENCE OWNED BY; Schema: kalev; Owner: postgres
--

ALTER SEQUENCE kalev.alumnos_id_alumno_seq OWNED BY kalev.alumnos.id_alumno;


--
-- TOC entry 224 (class 1259 OID 33219)
-- Name: directores; Type: TABLE; Schema: kalev; Owner: postgres
--

CREATE TABLE kalev.directores (
    id_director integer NOT NULL,
    nombre character varying(100) NOT NULL,
    apellido character varying(100) NOT NULL,
    correo character varying(100) NOT NULL,
    telefono character varying(15),
    fecha_designacion date NOT NULL,
    id_usuario integer NOT NULL
);


ALTER TABLE kalev.directores OWNER TO postgres;

--
-- TOC entry 223 (class 1259 OID 33218)
-- Name: directores_id_director_seq; Type: SEQUENCE; Schema: kalev; Owner: postgres
--

CREATE SEQUENCE kalev.directores_id_director_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE kalev.directores_id_director_seq OWNER TO postgres;

--
-- TOC entry 5082 (class 0 OID 0)
-- Dependencies: 223
-- Name: directores_id_director_seq; Type: SEQUENCE OWNED BY; Schema: kalev; Owner: postgres
--

ALTER SEQUENCE kalev.directores_id_director_seq OWNED BY kalev.directores.id_director;


--
-- TOC entry 222 (class 1259 OID 33207)
-- Name: docentes; Type: TABLE; Schema: kalev; Owner: postgres
--

CREATE TABLE kalev.docentes (
    id_docente integer NOT NULL,
    nombre character varying(100) NOT NULL,
    apellido character varying(100) NOT NULL,
    correo character varying(100) NOT NULL,
    telefono character varying(15),
    id_usuario integer NOT NULL
);


ALTER TABLE kalev.docentes OWNER TO postgres;

--
-- TOC entry 221 (class 1259 OID 33206)
-- Name: docentes_id_docente_seq; Type: SEQUENCE; Schema: kalev; Owner: postgres
--

CREATE SEQUENCE kalev.docentes_id_docente_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE kalev.docentes_id_docente_seq OWNER TO postgres;

--
-- TOC entry 5083 (class 0 OID 0)
-- Dependencies: 221
-- Name: docentes_id_docente_seq; Type: SEQUENCE OWNED BY; Schema: kalev; Owner: postgres
--

ALTER SEQUENCE kalev.docentes_id_docente_seq OWNED BY kalev.docentes.id_docente;


--
-- TOC entry 230 (class 1259 OID 33273)
-- Name: estilos_aprendizaje; Type: TABLE; Schema: kalev; Owner: postgres
--

CREATE TABLE kalev.estilos_aprendizaje (
    id_estilo integer NOT NULL,
    nombre_estilo character varying(50) NOT NULL
);


ALTER TABLE kalev.estilos_aprendizaje OWNER TO postgres;

--
-- TOC entry 229 (class 1259 OID 33272)
-- Name: estilos_aprendizaje_id_estilo_seq; Type: SEQUENCE; Schema: kalev; Owner: postgres
--

CREATE SEQUENCE kalev.estilos_aprendizaje_id_estilo_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE kalev.estilos_aprendizaje_id_estilo_seq OWNER TO postgres;

--
-- TOC entry 5084 (class 0 OID 0)
-- Dependencies: 229
-- Name: estilos_aprendizaje_id_estilo_seq; Type: SEQUENCE OWNED BY; Schema: kalev; Owner: postgres
--

ALTER SEQUENCE kalev.estilos_aprendizaje_id_estilo_seq OWNED BY kalev.estilos_aprendizaje.id_estilo;


--
-- TOC entry 242 (class 1259 OID 33369)
-- Name: estrategias_ensenanza; Type: TABLE; Schema: kalev; Owner: postgres
--

CREATE TABLE kalev.estrategias_ensenanza (
    id_estrategia integer NOT NULL,
    descripcion text NOT NULL,
    fecha_creacion timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE kalev.estrategias_ensenanza OWNER TO postgres;

--
-- TOC entry 241 (class 1259 OID 33368)
-- Name: estrategias_ensenanza_id_estrategia_seq; Type: SEQUENCE; Schema: kalev; Owner: postgres
--

CREATE SEQUENCE kalev.estrategias_ensenanza_id_estrategia_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE kalev.estrategias_ensenanza_id_estrategia_seq OWNER TO postgres;

--
-- TOC entry 5085 (class 0 OID 0)
-- Dependencies: 241
-- Name: estrategias_ensenanza_id_estrategia_seq; Type: SEQUENCE OWNED BY; Schema: kalev; Owner: postgres
--

ALTER SEQUENCE kalev.estrategias_ensenanza_id_estrategia_seq OWNED BY kalev.estrategias_ensenanza.id_estrategia;


--
-- TOC entry 244 (class 1259 OID 33379)
-- Name: feedback_estrategias; Type: TABLE; Schema: kalev; Owner: postgres
--

CREATE TABLE kalev.feedback_estrategias (
    id_feedback integer NOT NULL,
    id_estrategia integer NOT NULL,
    id_docente integer NOT NULL,
    efectividad numeric(3,2) NOT NULL,
    comentario text,
    fecha_registro timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT feedback_estrategias_efectividad_check CHECK (((efectividad >= (0)::numeric) AND (efectividad <= (10)::numeric)))
);


ALTER TABLE kalev.feedback_estrategias OWNER TO postgres;

--
-- TOC entry 243 (class 1259 OID 33378)
-- Name: feedback_estrategias_id_feedback_seq; Type: SEQUENCE; Schema: kalev; Owner: postgres
--

CREATE SEQUENCE kalev.feedback_estrategias_id_feedback_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE kalev.feedback_estrategias_id_feedback_seq OWNER TO postgres;

--
-- TOC entry 5086 (class 0 OID 0)
-- Dependencies: 243
-- Name: feedback_estrategias_id_feedback_seq; Type: SEQUENCE OWNED BY; Schema: kalev; Owner: postgres
--

ALTER SEQUENCE kalev.feedback_estrategias_id_feedback_seq OWNED BY kalev.feedback_estrategias.id_feedback;


--
-- TOC entry 226 (class 1259 OID 33239)
-- Name: grupos; Type: TABLE; Schema: kalev; Owner: postgres
--

CREATE TABLE kalev.grupos (
    id_grupo integer NOT NULL,
    nombre_grupo character varying(50) NOT NULL,
    id_docente integer NOT NULL,
    id_director integer NOT NULL,
    fecha_creacion timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    grado character varying(50) NOT NULL,
    codigo_unico character varying(10) NOT NULL
);


ALTER TABLE kalev.grupos OWNER TO postgres;

--
-- TOC entry 225 (class 1259 OID 33238)
-- Name: grupos_id_grupo_seq; Type: SEQUENCE; Schema: kalev; Owner: postgres
--

CREATE SEQUENCE kalev.grupos_id_grupo_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE kalev.grupos_id_grupo_seq OWNER TO postgres;

--
-- TOC entry 5087 (class 0 OID 0)
-- Dependencies: 225
-- Name: grupos_id_grupo_seq; Type: SEQUENCE OWNED BY; Schema: kalev; Owner: postgres
--

ALTER SEQUENCE kalev.grupos_id_grupo_seq OWNED BY kalev.grupos.id_grupo;


--
-- TOC entry 248 (class 1259 OID 40975)
-- Name: historial; Type: TABLE; Schema: kalev; Owner: postgres
--

CREATE TABLE kalev.historial (
    id_historial integer NOT NULL,
    accion text NOT NULL,
    fecha timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE kalev.historial OWNER TO postgres;

--
-- TOC entry 247 (class 1259 OID 40974)
-- Name: historial_id_historial_seq; Type: SEQUENCE; Schema: kalev; Owner: postgres
--

CREATE SEQUENCE kalev.historial_id_historial_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE kalev.historial_id_historial_seq OWNER TO postgres;

--
-- TOC entry 5088 (class 0 OID 0)
-- Dependencies: 247
-- Name: historial_id_historial_seq; Type: SEQUENCE OWNED BY; Schema: kalev; Owner: postgres
--

ALTER SEQUENCE kalev.historial_id_historial_seq OWNED BY kalev.historial.id_historial;


--
-- TOC entry 232 (class 1259 OID 33282)
-- Name: resultados_estilos; Type: TABLE; Schema: kalev; Owner: postgres
--

CREATE TABLE kalev.resultados_estilos (
    id_resultado integer NOT NULL,
    id_alumno integer NOT NULL,
    id_estilo integer NOT NULL,
    porcentaje numeric(5,2) NOT NULL,
    fecha_registro timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE kalev.resultados_estilos OWNER TO postgres;

--
-- TOC entry 231 (class 1259 OID 33281)
-- Name: resultados_estilos_id_resultado_seq; Type: SEQUENCE; Schema: kalev; Owner: postgres
--

CREATE SEQUENCE kalev.resultados_estilos_id_resultado_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE kalev.resultados_estilos_id_resultado_seq OWNER TO postgres;

--
-- TOC entry 5089 (class 0 OID 0)
-- Dependencies: 231
-- Name: resultados_estilos_id_resultado_seq; Type: SEQUENCE OWNED BY; Schema: kalev; Owner: postgres
--

ALTER SEQUENCE kalev.resultados_estilos_id_resultado_seq OWNED BY kalev.resultados_estilos.id_resultado;


--
-- TOC entry 218 (class 1259 OID 33181)
-- Name: roles; Type: TABLE; Schema: kalev; Owner: postgres
--

CREATE TABLE kalev.roles (
    id_rol integer NOT NULL,
    nombre_rol character varying(50) NOT NULL,
    descripcion text
);


ALTER TABLE kalev.roles OWNER TO postgres;

--
-- TOC entry 217 (class 1259 OID 33180)
-- Name: roles_id_rol_seq; Type: SEQUENCE; Schema: kalev; Owner: postgres
--

CREATE SEQUENCE kalev.roles_id_rol_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE kalev.roles_id_rol_seq OWNER TO postgres;

--
-- TOC entry 5090 (class 0 OID 0)
-- Dependencies: 217
-- Name: roles_id_rol_seq; Type: SEQUENCE OWNED BY; Schema: kalev; Owner: postgres
--

ALTER SEQUENCE kalev.roles_id_rol_seq OWNED BY kalev.roles.id_rol;


--
-- TOC entry 220 (class 1259 OID 33192)
-- Name: usuarios; Type: TABLE; Schema: kalev; Owner: postgres
--

CREATE TABLE kalev.usuarios (
    id_usuario integer NOT NULL,
    nombre_usuario character varying(100) NOT NULL,
    correo character varying(100) NOT NULL,
    contrasena character varying(255) NOT NULL,
    id_rol integer NOT NULL,
    fecha_creacion timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE kalev.usuarios OWNER TO postgres;

--
-- TOC entry 219 (class 1259 OID 33191)
-- Name: usuarios_id_usuario_seq; Type: SEQUENCE; Schema: kalev; Owner: postgres
--

CREATE SEQUENCE kalev.usuarios_id_usuario_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE kalev.usuarios_id_usuario_seq OWNER TO postgres;

--
-- TOC entry 5091 (class 0 OID 0)
-- Dependencies: 219
-- Name: usuarios_id_usuario_seq; Type: SEQUENCE OWNED BY; Schema: kalev; Owner: postgres
--

ALTER SEQUENCE kalev.usuarios_id_usuario_seq OWNED BY kalev.usuarios.id_usuario;


--
-- TOC entry 246 (class 1259 OID 33400)
-- Name: cambios; Type: TABLE; Schema: logs; Owner: postgres
--

CREATE TABLE logs.cambios (
    id_log integer NOT NULL,
    tabla_afectada character varying(50) NOT NULL,
    accion character varying(10) NOT NULL,
    id_registro integer NOT NULL,
    fecha timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    usuario character varying(100)
);


ALTER TABLE logs.cambios OWNER TO postgres;

--
-- TOC entry 245 (class 1259 OID 33399)
-- Name: cambios_id_log_seq; Type: SEQUENCE; Schema: logs; Owner: postgres
--

CREATE SEQUENCE logs.cambios_id_log_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE logs.cambios_id_log_seq OWNER TO postgres;

--
-- TOC entry 5092 (class 0 OID 0)
-- Dependencies: 245
-- Name: cambios_id_log_seq; Type: SEQUENCE OWNED BY; Schema: logs; Owner: postgres
--

ALTER SEQUENCE logs.cambios_id_log_seq OWNED BY logs.cambios.id_log;


--
-- TOC entry 4825 (class 2604 OID 33303)
-- Name: actividades_academicas id_actividad; Type: DEFAULT; Schema: kalev; Owner: postgres
--

ALTER TABLE ONLY kalev.actividades_academicas ALTER COLUMN id_actividad SET DEFAULT nextval('kalev.actividades_academicas_id_actividad_seq'::regclass);


--
-- TOC entry 4826 (class 2604 OID 33324)
-- Name: actividades_kalev id_actividad; Type: DEFAULT; Schema: kalev; Owner: postgres
--

ALTER TABLE ONLY kalev.actividades_kalev ALTER COLUMN id_actividad SET DEFAULT nextval('kalev.actividades_kalev_id_actividad_seq'::regclass);


--
-- TOC entry 4827 (class 2604 OID 33338)
-- Name: alumno_actividad_academica id_alumno_actividad; Type: DEFAULT; Schema: kalev; Owner: postgres
--

ALTER TABLE ONLY kalev.alumno_actividad_academica ALTER COLUMN id_alumno_actividad SET DEFAULT nextval('kalev.alumno_actividad_academica_id_alumno_actividad_seq'::regclass);


--
-- TOC entry 4828 (class 2604 OID 33355)
-- Name: alumno_actividad_kalev id_alumno_actividad_kalev; Type: DEFAULT; Schema: kalev; Owner: postgres
--

ALTER TABLE ONLY kalev.alumno_actividad_kalev ALTER COLUMN id_alumno_actividad_kalev SET DEFAULT nextval('kalev.alumno_actividad_kalev_id_alumno_actividad_kalev_seq'::regclass);


--
-- TOC entry 4820 (class 2604 OID 33262)
-- Name: alumnos id_alumno; Type: DEFAULT; Schema: kalev; Owner: postgres
--

ALTER TABLE ONLY kalev.alumnos ALTER COLUMN id_alumno SET DEFAULT nextval('kalev.alumnos_id_alumno_seq'::regclass);


--
-- TOC entry 4817 (class 2604 OID 33222)
-- Name: directores id_director; Type: DEFAULT; Schema: kalev; Owner: postgres
--

ALTER TABLE ONLY kalev.directores ALTER COLUMN id_director SET DEFAULT nextval('kalev.directores_id_director_seq'::regclass);


--
-- TOC entry 4816 (class 2604 OID 33210)
-- Name: docentes id_docente; Type: DEFAULT; Schema: kalev; Owner: postgres
--

ALTER TABLE ONLY kalev.docentes ALTER COLUMN id_docente SET DEFAULT nextval('kalev.docentes_id_docente_seq'::regclass);


--
-- TOC entry 4822 (class 2604 OID 33276)
-- Name: estilos_aprendizaje id_estilo; Type: DEFAULT; Schema: kalev; Owner: postgres
--

ALTER TABLE ONLY kalev.estilos_aprendizaje ALTER COLUMN id_estilo SET DEFAULT nextval('kalev.estilos_aprendizaje_id_estilo_seq'::regclass);


--
-- TOC entry 4829 (class 2604 OID 33372)
-- Name: estrategias_ensenanza id_estrategia; Type: DEFAULT; Schema: kalev; Owner: postgres
--

ALTER TABLE ONLY kalev.estrategias_ensenanza ALTER COLUMN id_estrategia SET DEFAULT nextval('kalev.estrategias_ensenanza_id_estrategia_seq'::regclass);


--
-- TOC entry 4831 (class 2604 OID 33382)
-- Name: feedback_estrategias id_feedback; Type: DEFAULT; Schema: kalev; Owner: postgres
--

ALTER TABLE ONLY kalev.feedback_estrategias ALTER COLUMN id_feedback SET DEFAULT nextval('kalev.feedback_estrategias_id_feedback_seq'::regclass);


--
-- TOC entry 4818 (class 2604 OID 33242)
-- Name: grupos id_grupo; Type: DEFAULT; Schema: kalev; Owner: postgres
--

ALTER TABLE ONLY kalev.grupos ALTER COLUMN id_grupo SET DEFAULT nextval('kalev.grupos_id_grupo_seq'::regclass);


--
-- TOC entry 4835 (class 2604 OID 40978)
-- Name: historial id_historial; Type: DEFAULT; Schema: kalev; Owner: postgres
--

ALTER TABLE ONLY kalev.historial ALTER COLUMN id_historial SET DEFAULT nextval('kalev.historial_id_historial_seq'::regclass);


--
-- TOC entry 4823 (class 2604 OID 33285)
-- Name: resultados_estilos id_resultado; Type: DEFAULT; Schema: kalev; Owner: postgres
--

ALTER TABLE ONLY kalev.resultados_estilos ALTER COLUMN id_resultado SET DEFAULT nextval('kalev.resultados_estilos_id_resultado_seq'::regclass);


--
-- TOC entry 4813 (class 2604 OID 33184)
-- Name: roles id_rol; Type: DEFAULT; Schema: kalev; Owner: postgres
--

ALTER TABLE ONLY kalev.roles ALTER COLUMN id_rol SET DEFAULT nextval('kalev.roles_id_rol_seq'::regclass);


--
-- TOC entry 4814 (class 2604 OID 33195)
-- Name: usuarios id_usuario; Type: DEFAULT; Schema: kalev; Owner: postgres
--

ALTER TABLE ONLY kalev.usuarios ALTER COLUMN id_usuario SET DEFAULT nextval('kalev.usuarios_id_usuario_seq'::regclass);


--
-- TOC entry 4833 (class 2604 OID 33403)
-- Name: cambios id_log; Type: DEFAULT; Schema: logs; Owner: postgres
--

ALTER TABLE ONLY logs.cambios ALTER COLUMN id_log SET DEFAULT nextval('logs.cambios_id_log_seq'::regclass);


--
-- TOC entry 5057 (class 0 OID 33300)
-- Dependencies: 234
-- Data for Name: actividades_academicas; Type: TABLE DATA; Schema: kalev; Owner: postgres
--

COPY kalev.actividades_academicas (id_actividad, nombre_actividad, descripcion, fecha_inicio, fecha_fin, id_grupo, estilo_asociado) FROM stdin;
\.


--
-- TOC entry 5059 (class 0 OID 33321)
-- Dependencies: 236
-- Data for Name: actividades_kalev; Type: TABLE DATA; Schema: kalev; Owner: postgres
--

COPY kalev.actividades_kalev (id_actividad, nombre_actividad, descripcion, fecha_inicio, fecha_fin, id_grupo) FROM stdin;
\.


--
-- TOC entry 5061 (class 0 OID 33335)
-- Dependencies: 238
-- Data for Name: alumno_actividad_academica; Type: TABLE DATA; Schema: kalev; Owner: postgres
--

COPY kalev.alumno_actividad_academica (id_alumno_actividad, id_alumno, id_actividad, estado, calificacion) FROM stdin;
\.


--
-- TOC entry 5063 (class 0 OID 33352)
-- Dependencies: 240
-- Data for Name: alumno_actividad_kalev; Type: TABLE DATA; Schema: kalev; Owner: postgres
--

COPY kalev.alumno_actividad_kalev (id_alumno_actividad_kalev, id_alumno, id_actividad, estado) FROM stdin;
\.


--
-- TOC entry 5051 (class 0 OID 33259)
-- Dependencies: 228
-- Data for Name: alumnos; Type: TABLE DATA; Schema: kalev; Owner: postgres
--

COPY kalev.alumnos (id_alumno, nombre, apellido, fecha_nacimiento, correo, telefono, id_grupo, fecha_registro) FROM stdin;
\.


--
-- TOC entry 5047 (class 0 OID 33219)
-- Dependencies: 224
-- Data for Name: directores; Type: TABLE DATA; Schema: kalev; Owner: postgres
--

COPY kalev.directores (id_director, nombre, apellido, correo, telefono, fecha_designacion, id_usuario) FROM stdin;
\.


--
-- TOC entry 5045 (class 0 OID 33207)
-- Dependencies: 222
-- Data for Name: docentes; Type: TABLE DATA; Schema: kalev; Owner: postgres
--

COPY kalev.docentes (id_docente, nombre, apellido, correo, telefono, id_usuario) FROM stdin;
\.


--
-- TOC entry 5053 (class 0 OID 33273)
-- Dependencies: 230
-- Data for Name: estilos_aprendizaje; Type: TABLE DATA; Schema: kalev; Owner: postgres
--

COPY kalev.estilos_aprendizaje (id_estilo, nombre_estilo) FROM stdin;
\.


--
-- TOC entry 5065 (class 0 OID 33369)
-- Dependencies: 242
-- Data for Name: estrategias_ensenanza; Type: TABLE DATA; Schema: kalev; Owner: postgres
--

COPY kalev.estrategias_ensenanza (id_estrategia, descripcion, fecha_creacion) FROM stdin;
\.


--
-- TOC entry 5067 (class 0 OID 33379)
-- Dependencies: 244
-- Data for Name: feedback_estrategias; Type: TABLE DATA; Schema: kalev; Owner: postgres
--

COPY kalev.feedback_estrategias (id_feedback, id_estrategia, id_docente, efectividad, comentario, fecha_registro) FROM stdin;
\.


--
-- TOC entry 5049 (class 0 OID 33239)
-- Dependencies: 226
-- Data for Name: grupos; Type: TABLE DATA; Schema: kalev; Owner: postgres
--

COPY kalev.grupos (id_grupo, nombre_grupo, id_docente, id_director, fecha_creacion, grado, codigo_unico) FROM stdin;
\.


--
-- TOC entry 5071 (class 0 OID 40975)
-- Dependencies: 248
-- Data for Name: historial; Type: TABLE DATA; Schema: kalev; Owner: postgres
--

COPY kalev.historial (id_historial, accion, fecha) FROM stdin;
\.


--
-- TOC entry 5055 (class 0 OID 33282)
-- Dependencies: 232
-- Data for Name: resultados_estilos; Type: TABLE DATA; Schema: kalev; Owner: postgres
--

COPY kalev.resultados_estilos (id_resultado, id_alumno, id_estilo, porcentaje, fecha_registro) FROM stdin;
\.


--
-- TOC entry 5041 (class 0 OID 33181)
-- Dependencies: 218
-- Data for Name: roles; Type: TABLE DATA; Schema: kalev; Owner: postgres
--

COPY kalev.roles (id_rol, nombre_rol, descripcion) FROM stdin;
\.


--
-- TOC entry 5043 (class 0 OID 33192)
-- Dependencies: 220
-- Data for Name: usuarios; Type: TABLE DATA; Schema: kalev; Owner: postgres
--

COPY kalev.usuarios (id_usuario, nombre_usuario, correo, contrasena, id_rol, fecha_creacion) FROM stdin;
\.


--
-- TOC entry 5069 (class 0 OID 33400)
-- Dependencies: 246
-- Data for Name: cambios; Type: TABLE DATA; Schema: logs; Owner: postgres
--

COPY logs.cambios (id_log, tabla_afectada, accion, id_registro, fecha, usuario) FROM stdin;
\.


--
-- TOC entry 5093 (class 0 OID 0)
-- Dependencies: 233
-- Name: actividades_academicas_id_actividad_seq; Type: SEQUENCE SET; Schema: kalev; Owner: postgres
--

SELECT pg_catalog.setval('kalev.actividades_academicas_id_actividad_seq', 1, false);


--
-- TOC entry 5094 (class 0 OID 0)
-- Dependencies: 235
-- Name: actividades_kalev_id_actividad_seq; Type: SEQUENCE SET; Schema: kalev; Owner: postgres
--

SELECT pg_catalog.setval('kalev.actividades_kalev_id_actividad_seq', 1, false);


--
-- TOC entry 5095 (class 0 OID 0)
-- Dependencies: 237
-- Name: alumno_actividad_academica_id_alumno_actividad_seq; Type: SEQUENCE SET; Schema: kalev; Owner: postgres
--

SELECT pg_catalog.setval('kalev.alumno_actividad_academica_id_alumno_actividad_seq', 1, false);


--
-- TOC entry 5096 (class 0 OID 0)
-- Dependencies: 239
-- Name: alumno_actividad_kalev_id_alumno_actividad_kalev_seq; Type: SEQUENCE SET; Schema: kalev; Owner: postgres
--

SELECT pg_catalog.setval('kalev.alumno_actividad_kalev_id_alumno_actividad_kalev_seq', 1, false);


--
-- TOC entry 5097 (class 0 OID 0)
-- Dependencies: 227
-- Name: alumnos_id_alumno_seq; Type: SEQUENCE SET; Schema: kalev; Owner: postgres
--

SELECT pg_catalog.setval('kalev.alumnos_id_alumno_seq', 1, false);


--
-- TOC entry 5098 (class 0 OID 0)
-- Dependencies: 223
-- Name: directores_id_director_seq; Type: SEQUENCE SET; Schema: kalev; Owner: postgres
--

SELECT pg_catalog.setval('kalev.directores_id_director_seq', 1, false);


--
-- TOC entry 5099 (class 0 OID 0)
-- Dependencies: 221
-- Name: docentes_id_docente_seq; Type: SEQUENCE SET; Schema: kalev; Owner: postgres
--

SELECT pg_catalog.setval('kalev.docentes_id_docente_seq', 1, false);


--
-- TOC entry 5100 (class 0 OID 0)
-- Dependencies: 229
-- Name: estilos_aprendizaje_id_estilo_seq; Type: SEQUENCE SET; Schema: kalev; Owner: postgres
--

SELECT pg_catalog.setval('kalev.estilos_aprendizaje_id_estilo_seq', 1, false);


--
-- TOC entry 5101 (class 0 OID 0)
-- Dependencies: 241
-- Name: estrategias_ensenanza_id_estrategia_seq; Type: SEQUENCE SET; Schema: kalev; Owner: postgres
--

SELECT pg_catalog.setval('kalev.estrategias_ensenanza_id_estrategia_seq', 1, false);


--
-- TOC entry 5102 (class 0 OID 0)
-- Dependencies: 243
-- Name: feedback_estrategias_id_feedback_seq; Type: SEQUENCE SET; Schema: kalev; Owner: postgres
--

SELECT pg_catalog.setval('kalev.feedback_estrategias_id_feedback_seq', 1, false);


--
-- TOC entry 5103 (class 0 OID 0)
-- Dependencies: 225
-- Name: grupos_id_grupo_seq; Type: SEQUENCE SET; Schema: kalev; Owner: postgres
--

SELECT pg_catalog.setval('kalev.grupos_id_grupo_seq', 1, false);


--
-- TOC entry 5104 (class 0 OID 0)
-- Dependencies: 247
-- Name: historial_id_historial_seq; Type: SEQUENCE SET; Schema: kalev; Owner: postgres
--

SELECT pg_catalog.setval('kalev.historial_id_historial_seq', 1, false);


--
-- TOC entry 5105 (class 0 OID 0)
-- Dependencies: 231
-- Name: resultados_estilos_id_resultado_seq; Type: SEQUENCE SET; Schema: kalev; Owner: postgres
--

SELECT pg_catalog.setval('kalev.resultados_estilos_id_resultado_seq', 1, false);


--
-- TOC entry 5106 (class 0 OID 0)
-- Dependencies: 217
-- Name: roles_id_rol_seq; Type: SEQUENCE SET; Schema: kalev; Owner: postgres
--

SELECT pg_catalog.setval('kalev.roles_id_rol_seq', 1, false);


--
-- TOC entry 5107 (class 0 OID 0)
-- Dependencies: 219
-- Name: usuarios_id_usuario_seq; Type: SEQUENCE SET; Schema: kalev; Owner: postgres
--

SELECT pg_catalog.setval('kalev.usuarios_id_usuario_seq', 1, false);


--
-- TOC entry 5108 (class 0 OID 0)
-- Dependencies: 245
-- Name: cambios_id_log_seq; Type: SEQUENCE SET; Schema: logs; Owner: postgres
--

SELECT pg_catalog.setval('logs.cambios_id_log_seq', 1, false);


--
-- TOC entry 4863 (class 2606 OID 33307)
-- Name: actividades_academicas actividades_academicas_pkey; Type: CONSTRAINT; Schema: kalev; Owner: postgres
--

ALTER TABLE ONLY kalev.actividades_academicas
    ADD CONSTRAINT actividades_academicas_pkey PRIMARY KEY (id_actividad);


--
-- TOC entry 4865 (class 2606 OID 33328)
-- Name: actividades_kalev actividades_kalev_pkey; Type: CONSTRAINT; Schema: kalev; Owner: postgres
--

ALTER TABLE ONLY kalev.actividades_kalev
    ADD CONSTRAINT actividades_kalev_pkey PRIMARY KEY (id_actividad);


--
-- TOC entry 4867 (class 2606 OID 33340)
-- Name: alumno_actividad_academica alumno_actividad_academica_pkey; Type: CONSTRAINT; Schema: kalev; Owner: postgres
--

ALTER TABLE ONLY kalev.alumno_actividad_academica
    ADD CONSTRAINT alumno_actividad_academica_pkey PRIMARY KEY (id_alumno_actividad);


--
-- TOC entry 4869 (class 2606 OID 33357)
-- Name: alumno_actividad_kalev alumno_actividad_kalev_pkey; Type: CONSTRAINT; Schema: kalev; Owner: postgres
--

ALTER TABLE ONLY kalev.alumno_actividad_kalev
    ADD CONSTRAINT alumno_actividad_kalev_pkey PRIMARY KEY (id_alumno_actividad_kalev);


--
-- TOC entry 4855 (class 2606 OID 33265)
-- Name: alumnos alumnos_pkey; Type: CONSTRAINT; Schema: kalev; Owner: postgres
--

ALTER TABLE ONLY kalev.alumnos
    ADD CONSTRAINT alumnos_pkey PRIMARY KEY (id_alumno);


--
-- TOC entry 4849 (class 2606 OID 33224)
-- Name: directores directores_pkey; Type: CONSTRAINT; Schema: kalev; Owner: postgres
--

ALTER TABLE ONLY kalev.directores
    ADD CONSTRAINT directores_pkey PRIMARY KEY (id_director);


--
-- TOC entry 4847 (class 2606 OID 33212)
-- Name: docentes docentes_pkey; Type: CONSTRAINT; Schema: kalev; Owner: postgres
--

ALTER TABLE ONLY kalev.docentes
    ADD CONSTRAINT docentes_pkey PRIMARY KEY (id_docente);


--
-- TOC entry 4857 (class 2606 OID 33280)
-- Name: estilos_aprendizaje estilos_aprendizaje_nombre_estilo_key; Type: CONSTRAINT; Schema: kalev; Owner: postgres
--

ALTER TABLE ONLY kalev.estilos_aprendizaje
    ADD CONSTRAINT estilos_aprendizaje_nombre_estilo_key UNIQUE (nombre_estilo);


--
-- TOC entry 4859 (class 2606 OID 33278)
-- Name: estilos_aprendizaje estilos_aprendizaje_pkey; Type: CONSTRAINT; Schema: kalev; Owner: postgres
--

ALTER TABLE ONLY kalev.estilos_aprendizaje
    ADD CONSTRAINT estilos_aprendizaje_pkey PRIMARY KEY (id_estilo);


--
-- TOC entry 4871 (class 2606 OID 33377)
-- Name: estrategias_ensenanza estrategias_ensenanza_pkey; Type: CONSTRAINT; Schema: kalev; Owner: postgres
--

ALTER TABLE ONLY kalev.estrategias_ensenanza
    ADD CONSTRAINT estrategias_ensenanza_pkey PRIMARY KEY (id_estrategia);


--
-- TOC entry 4873 (class 2606 OID 33388)
-- Name: feedback_estrategias feedback_estrategias_pkey; Type: CONSTRAINT; Schema: kalev; Owner: postgres
--

ALTER TABLE ONLY kalev.feedback_estrategias
    ADD CONSTRAINT feedback_estrategias_pkey PRIMARY KEY (id_feedback);


--
-- TOC entry 4851 (class 2606 OID 33247)
-- Name: grupos grupos_codigo_unico_key; Type: CONSTRAINT; Schema: kalev; Owner: postgres
--

ALTER TABLE ONLY kalev.grupos
    ADD CONSTRAINT grupos_codigo_unico_key UNIQUE (codigo_unico);


--
-- TOC entry 4853 (class 2606 OID 33245)
-- Name: grupos grupos_pkey; Type: CONSTRAINT; Schema: kalev; Owner: postgres
--

ALTER TABLE ONLY kalev.grupos
    ADD CONSTRAINT grupos_pkey PRIMARY KEY (id_grupo);


--
-- TOC entry 4877 (class 2606 OID 40983)
-- Name: historial historial_pkey; Type: CONSTRAINT; Schema: kalev; Owner: postgres
--

ALTER TABLE ONLY kalev.historial
    ADD CONSTRAINT historial_pkey PRIMARY KEY (id_historial);


--
-- TOC entry 4861 (class 2606 OID 33288)
-- Name: resultados_estilos resultados_estilos_pkey; Type: CONSTRAINT; Schema: kalev; Owner: postgres
--

ALTER TABLE ONLY kalev.resultados_estilos
    ADD CONSTRAINT resultados_estilos_pkey PRIMARY KEY (id_resultado);


--
-- TOC entry 4839 (class 2606 OID 33190)
-- Name: roles roles_nombre_rol_key; Type: CONSTRAINT; Schema: kalev; Owner: postgres
--

ALTER TABLE ONLY kalev.roles
    ADD CONSTRAINT roles_nombre_rol_key UNIQUE (nombre_rol);


--
-- TOC entry 4841 (class 2606 OID 33188)
-- Name: roles roles_pkey; Type: CONSTRAINT; Schema: kalev; Owner: postgres
--

ALTER TABLE ONLY kalev.roles
    ADD CONSTRAINT roles_pkey PRIMARY KEY (id_rol);


--
-- TOC entry 4843 (class 2606 OID 33200)
-- Name: usuarios usuarios_correo_key; Type: CONSTRAINT; Schema: kalev; Owner: postgres
--

ALTER TABLE ONLY kalev.usuarios
    ADD CONSTRAINT usuarios_correo_key UNIQUE (correo);


--
-- TOC entry 4845 (class 2606 OID 33198)
-- Name: usuarios usuarios_pkey; Type: CONSTRAINT; Schema: kalev; Owner: postgres
--

ALTER TABLE ONLY kalev.usuarios
    ADD CONSTRAINT usuarios_pkey PRIMARY KEY (id_usuario);


--
-- TOC entry 4875 (class 2606 OID 33406)
-- Name: cambios cambios_pkey; Type: CONSTRAINT; Schema: logs; Owner: postgres
--

ALTER TABLE ONLY logs.cambios
    ADD CONSTRAINT cambios_pkey PRIMARY KEY (id_log);


--
-- TOC entry 4896 (class 2620 OID 33410)
-- Name: alumnos log_cambios_alumnos; Type: TRIGGER; Schema: kalev; Owner: postgres
--

CREATE TRIGGER log_cambios_alumnos AFTER INSERT OR DELETE OR UPDATE ON kalev.alumnos FOR EACH ROW EXECUTE FUNCTION logs.registrar_cambio();


--
-- TOC entry 4895 (class 2620 OID 33409)
-- Name: usuarios log_cambios_usuarios; Type: TRIGGER; Schema: kalev; Owner: postgres
--

CREATE TRIGGER log_cambios_usuarios AFTER INSERT OR DELETE OR UPDATE ON kalev.usuarios FOR EACH ROW EXECUTE FUNCTION logs.registrar_cambio();


--
-- TOC entry 4886 (class 2606 OID 33313)
-- Name: actividades_academicas actividades_academicas_estilo_asociado_fkey; Type: FK CONSTRAINT; Schema: kalev; Owner: postgres
--

ALTER TABLE ONLY kalev.actividades_academicas
    ADD CONSTRAINT actividades_academicas_estilo_asociado_fkey FOREIGN KEY (estilo_asociado) REFERENCES kalev.estilos_aprendizaje(id_estilo);


--
-- TOC entry 4887 (class 2606 OID 33308)
-- Name: actividades_academicas actividades_academicas_id_grupo_fkey; Type: FK CONSTRAINT; Schema: kalev; Owner: postgres
--

ALTER TABLE ONLY kalev.actividades_academicas
    ADD CONSTRAINT actividades_academicas_id_grupo_fkey FOREIGN KEY (id_grupo) REFERENCES kalev.grupos(id_grupo);


--
-- TOC entry 4888 (class 2606 OID 33329)
-- Name: actividades_kalev actividades_kalev_id_grupo_fkey; Type: FK CONSTRAINT; Schema: kalev; Owner: postgres
--

ALTER TABLE ONLY kalev.actividades_kalev
    ADD CONSTRAINT actividades_kalev_id_grupo_fkey FOREIGN KEY (id_grupo) REFERENCES kalev.grupos(id_grupo);


--
-- TOC entry 4889 (class 2606 OID 33346)
-- Name: alumno_actividad_academica alumno_actividad_academica_id_actividad_fkey; Type: FK CONSTRAINT; Schema: kalev; Owner: postgres
--

ALTER TABLE ONLY kalev.alumno_actividad_academica
    ADD CONSTRAINT alumno_actividad_academica_id_actividad_fkey FOREIGN KEY (id_actividad) REFERENCES kalev.actividades_academicas(id_actividad);


--
-- TOC entry 4890 (class 2606 OID 33341)
-- Name: alumno_actividad_academica alumno_actividad_academica_id_alumno_fkey; Type: FK CONSTRAINT; Schema: kalev; Owner: postgres
--

ALTER TABLE ONLY kalev.alumno_actividad_academica
    ADD CONSTRAINT alumno_actividad_academica_id_alumno_fkey FOREIGN KEY (id_alumno) REFERENCES kalev.alumnos(id_alumno);


--
-- TOC entry 4891 (class 2606 OID 33363)
-- Name: alumno_actividad_kalev alumno_actividad_kalev_id_actividad_fkey; Type: FK CONSTRAINT; Schema: kalev; Owner: postgres
--

ALTER TABLE ONLY kalev.alumno_actividad_kalev
    ADD CONSTRAINT alumno_actividad_kalev_id_actividad_fkey FOREIGN KEY (id_actividad) REFERENCES kalev.actividades_kalev(id_actividad);


--
-- TOC entry 4892 (class 2606 OID 33358)
-- Name: alumno_actividad_kalev alumno_actividad_kalev_id_alumno_fkey; Type: FK CONSTRAINT; Schema: kalev; Owner: postgres
--

ALTER TABLE ONLY kalev.alumno_actividad_kalev
    ADD CONSTRAINT alumno_actividad_kalev_id_alumno_fkey FOREIGN KEY (id_alumno) REFERENCES kalev.alumnos(id_alumno);


--
-- TOC entry 4883 (class 2606 OID 33266)
-- Name: alumnos alumnos_id_grupo_fkey; Type: FK CONSTRAINT; Schema: kalev; Owner: postgres
--

ALTER TABLE ONLY kalev.alumnos
    ADD CONSTRAINT alumnos_id_grupo_fkey FOREIGN KEY (id_grupo) REFERENCES kalev.grupos(id_grupo);


--
-- TOC entry 4880 (class 2606 OID 33225)
-- Name: directores directores_id_usuario_fkey; Type: FK CONSTRAINT; Schema: kalev; Owner: postgres
--

ALTER TABLE ONLY kalev.directores
    ADD CONSTRAINT directores_id_usuario_fkey FOREIGN KEY (id_usuario) REFERENCES kalev.usuarios(id_usuario);


--
-- TOC entry 4879 (class 2606 OID 33213)
-- Name: docentes docentes_id_usuario_fkey; Type: FK CONSTRAINT; Schema: kalev; Owner: postgres
--

ALTER TABLE ONLY kalev.docentes
    ADD CONSTRAINT docentes_id_usuario_fkey FOREIGN KEY (id_usuario) REFERENCES kalev.usuarios(id_usuario);


--
-- TOC entry 4893 (class 2606 OID 33394)
-- Name: feedback_estrategias feedback_estrategias_id_docente_fkey; Type: FK CONSTRAINT; Schema: kalev; Owner: postgres
--

ALTER TABLE ONLY kalev.feedback_estrategias
    ADD CONSTRAINT feedback_estrategias_id_docente_fkey FOREIGN KEY (id_docente) REFERENCES kalev.docentes(id_docente);


--
-- TOC entry 4894 (class 2606 OID 33389)
-- Name: feedback_estrategias feedback_estrategias_id_estrategia_fkey; Type: FK CONSTRAINT; Schema: kalev; Owner: postgres
--

ALTER TABLE ONLY kalev.feedback_estrategias
    ADD CONSTRAINT feedback_estrategias_id_estrategia_fkey FOREIGN KEY (id_estrategia) REFERENCES kalev.estrategias_ensenanza(id_estrategia);


--
-- TOC entry 4881 (class 2606 OID 33253)
-- Name: grupos grupos_id_director_fkey; Type: FK CONSTRAINT; Schema: kalev; Owner: postgres
--

ALTER TABLE ONLY kalev.grupos
    ADD CONSTRAINT grupos_id_director_fkey FOREIGN KEY (id_director) REFERENCES kalev.directores(id_director);


--
-- TOC entry 4882 (class 2606 OID 33248)
-- Name: grupos grupos_id_docente_fkey; Type: FK CONSTRAINT; Schema: kalev; Owner: postgres
--

ALTER TABLE ONLY kalev.grupos
    ADD CONSTRAINT grupos_id_docente_fkey FOREIGN KEY (id_docente) REFERENCES kalev.docentes(id_docente);


--
-- TOC entry 4884 (class 2606 OID 33289)
-- Name: resultados_estilos resultados_estilos_id_alumno_fkey; Type: FK CONSTRAINT; Schema: kalev; Owner: postgres
--

ALTER TABLE ONLY kalev.resultados_estilos
    ADD CONSTRAINT resultados_estilos_id_alumno_fkey FOREIGN KEY (id_alumno) REFERENCES kalev.alumnos(id_alumno);


--
-- TOC entry 4885 (class 2606 OID 33294)
-- Name: resultados_estilos resultados_estilos_id_estilo_fkey; Type: FK CONSTRAINT; Schema: kalev; Owner: postgres
--

ALTER TABLE ONLY kalev.resultados_estilos
    ADD CONSTRAINT resultados_estilos_id_estilo_fkey FOREIGN KEY (id_estilo) REFERENCES kalev.estilos_aprendizaje(id_estilo);


--
-- TOC entry 4878 (class 2606 OID 33201)
-- Name: usuarios usuarios_id_rol_fkey; Type: FK CONSTRAINT; Schema: kalev; Owner: postgres
--

ALTER TABLE ONLY kalev.usuarios
    ADD CONSTRAINT usuarios_id_rol_fkey FOREIGN KEY (id_rol) REFERENCES kalev.roles(id_rol);


-- Completed on 2024-11-30 02:53:43

--
-- PostgreSQL database dump complete
--


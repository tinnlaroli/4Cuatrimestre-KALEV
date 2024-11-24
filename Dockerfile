# Usa la imagen oficial de Node.js
FROM node:16

# Directorio de trabajo
WORKDIR /usr/src/app

# Copia los archivos de tu proyecto
COPY package*.json ./

# Instala las dependencias
RUN npm install

# Copia el resto de los archivos
COPY . .

# Expone el puerto
EXPOSE 5000

# Comando para correr la API
CMD ["node", "src/server.js"]

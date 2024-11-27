FROM node:18

# Instalar dependencias necesarias para compilar bcrypt
RUN apt-get update && apt-get install -y build-essential python3

# Crear y definir el directorio de trabajo
WORKDIR /usr/src/app

# Copiar los archivos del proyecto
COPY package*.json ./ 

# Instalar las dependencias
RUN npm install

# Copiar el resto de los archivos de la aplicación
COPY . .

# Exponer el puerto de la aplicación
EXPOSE 3000

# Comando para iniciar la aplicación
CMD ["npm", "start"]

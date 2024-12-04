# Usamos una imagen base de nginx para servir los archivos estáticos
FROM nginx:alpine

# Copiamos los archivos de la aplicación al directorio predeterminado de nginx
COPY ./ /usr/share/nginx/html

# Exponemos el puerto 80
EXPOSE 80
 
# Iniciamos el servidor Nginx
CMD ["nginx", "-g", "daemon off;"]

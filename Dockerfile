FROM nginx:alpine

# Copiar los archivos de la aplicación al contenedor de Nginx
COPY ./ /usr/share/nginx/html

# Exponer el puerto 80
EXPOSE 80

# Iniciar Nginx
CMD ["nginx", "-g", "daemon off;"]

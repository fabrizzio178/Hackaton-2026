# 1. Utilizamos una imagen base ligera de Node 18
FROM node:18-alpine

# 2. Definimos el directorio de trabajo dentro del contenedor
WORKDIR /usr/src/app

# 3. Copiamos los archivos de dependencias primero (aprovecha la cache de Docker)
COPY package*.json ./

# 4. Instalamos las dependencias
RUN npm install

# 5. Copiamos el resto del código del backend
COPY . .

# 6. Exponemos el puerto. Azure App Service suele buscar el puerto 8080 por defecto.
# Asegurate de que tu index.js/app.js use: process.env.PORT || 8080
EXPOSE 8080

# 7. Comando para iniciar la aplicación
CMD [ "npm", "start" ]
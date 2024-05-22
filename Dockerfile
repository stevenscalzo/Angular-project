# Utiliza una imagen base de Node.js
FROM node:lts

# Establece el directorio de trabajo
WORKDIR /app

# Instala Angular CLI globalmente
RUN npm install -g @angular/cli@latest

# Copia los archivos de la aplicación
COPY . .

# Expone el puerto 4200 para la aplicación Angular
EXPOSE 4200

# Instala las dependencias
RUN npm install


# Comando para iniciar la aplicación Angular
CMD ["ng", "serve", "--host", "0.0.0.0"]
# Dockerfile para frontend React (Vite)
FROM node:22 AS build
WORKDIR /app

# Copiar archivos de dependencias
COPY package*.json ./

# Instalar dependencias de forma más robusta
RUN npm cache clean --force && \
    npm install --legacy-peer-deps --verbose

# Copiar código fuente
COPY . .

# Build de la aplicación
RUN npm run build

FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
COPY docker-entrypoint.sh /docker-entrypoint.sh
RUN chmod +x /docker-entrypoint.sh
EXPOSE 80
ENTRYPOINT ["/docker-entrypoint.sh"]

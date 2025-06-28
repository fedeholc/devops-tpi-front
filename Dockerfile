# Dockerfile para frontend React (Vite)
FROM node:22 AS build
WORKDIR /app

# Set locale for UTF-8 support
ENV LANG=C.UTF-8
ENV LC_ALL=C.UTF-8

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

# Install locale support
RUN apk add --no-cache \
    ca-certificates \
    tzdata

# Set timezone and locale
ENV TZ=America/Argentina/Buenos_Aires
ENV LANG=C.UTF-8
ENV LC_ALL=C.UTF-8

# Copy built application
COPY --from=build /app/dist /usr/share/nginx/html

# Copy custom nginx configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy and set permissions for entrypoint script
COPY docker-entrypoint.sh /docker-entrypoint.sh
RUN chmod +x /docker-entrypoint.sh

EXPOSE 80
ENTRYPOINT ["/docker-entrypoint.sh"]

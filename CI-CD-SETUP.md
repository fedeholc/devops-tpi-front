# Frontend CI/CD Setup

Este repositorio está configurado con GitHub Actions para automatizar el build, test, y deployment del frontend.

## Configuración de Secrets en GitHub

Para que el workflow funcione correctamente, necesitas configurar los siguientes secrets en GitHub:

### 1. Ir a Settings > Secrets and variables > Actions

### 2. Configurar estos Repository Secrets:

| Secret Name          | Descripción                        | Ejemplo                              |
| -------------------- | ---------------------------------- | ------------------------------------ |
| `DOCKERHUB_USERNAME` | Tu nombre de usuario de Docker Hub | `fedeholc`                           |
| `DOCKERHUB_TOKEN`    | Token de acceso de Docker Hub      | `dckr_pat_...`                       |
| `EC2_HOST`           | IP pública o dominio de tu EC2     | `3.85.123.456`                       |
| `EC2_USERNAME`       | Usuario SSH para conectar a EC2    | `ubuntu`                             |
| `EC2_SSH_KEY`        | Clave privada SSH (completa)       | `-----BEGIN RSA PRIVATE KEY-----...` |
| `EC2_PROJECT_PATH`   | Ruta absoluta del proyecto en EC2  | `/home/ubuntu/devops-tpi-infra`      |

### 3. Generar Docker Hub Token

1. Ve a [Docker Hub](https://hub.docker.com)
2. Settings > Security > Access Tokens
3. Crea un nuevo token con permisos de **Read, Write, Delete**
4. Copia el token y úsalo como `DOCKERHUB_TOKEN`

## Flujo de Trabajo

1. **Push a `main`** → Ejecuta build test
2. **Build exitoso** → Build de imagen Docker
3. **Build exitoso** → Push a Docker Hub
4. **Push exitoso** → Deploy automático a EC2

## Estructura de Tags

Las imágenes se tagean de la siguiente manera:

- `latest` - Última versión de la rama main
- `main-{sha}` - Versión específica con hash del commit

## Características del Workflow

### **Build Test Job**

- Instala dependencias con `npm ci`
- Ejecuta build de producción con `npm run build`
- Verifica que la aplicación compile correctamente

### **Build and Push Job**

- Construye imagen Docker multi-stage (Node + Nginx)
- Sube imagen a Docker Hub con tags automáticos
- Soporte para múltiples arquitecturas (amd64, arm64)

### **Deploy Job**

- Se conecta a EC2 via SSH
- Descarga nueva imagen del frontend
- Reinicia solo el servicio frontend
- Verifica estado y muestra logs para debugging

## Troubleshooting

### Error: "npm run build failed"

- Verifica que no haya errores de ESLint
- Revisa que todas las dependencias estén en package.json
- Verifica variables de entorno necesarias para build

### Error: "Docker build failed"

- Revisa el Dockerfile
- Verifica que el .dockerignore esté configurado correctamente
- Asegúrate de que el build de Vite produzca la carpeta `dist`

### Ver logs del frontend

```bash
# En EC2:
docker-compose logs frontend
```

### Verificar estado del frontend

```bash
# En EC2:
docker-compose ps frontend
curl http://localhost # o la URL de tu frontend
```

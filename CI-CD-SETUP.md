# Frontend CI/CD Setup

Este repositorio está configurado con GitHub Actions para automatizar el build, test, y deployment del frontend.

## Configuración de Secrets en GitHub

Para que el workflow funcione correctamente, hay que configurar los siguientes secrets en GitHub:

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

 
# API Schedule Monorepo

Backend modular basado en NestJS para la administración de agenda de una empresa. La solución se organiza como monorepo con microservicios independientes para usuarios, clientes, catálogo de servicios y agenda. El código compartido (configuración, utilidades, conexión MySQL) se expone a través de librerías reutilizables.

## Estructura

```
apps/
  gateway/
  auth/
  notifications/
  agenda/
  clients/
  services/
  users/
libs/
  common/
  database/
```

- `apps/gateway`: puerta de entrada HTTP que enruta solicitudes hacia los microservicios internos.
- `apps/auth`: autenticación y autorización.
- `apps/notifications`: entrega de notificaciones y recordatorios.
- `apps/<service>`: resto de microservicios verticales (usuarios, clientes, servicios, agenda).
- `libs/common`: Configuración global (variables de entorno, validaciones, helpers).
- `libs/database`: Módulo Sequelize configurado para MySQL, modelos compartidos y soft delete.

## Requisitos

- Node.js 20+
- pnpm 10+
- MySQL 8.x o compatible (MariaDB)

## Instalación

```bash
pnpm install
```

## Persistencia y modelos

- ORM: [Sequelize](https://sequelize.org/) con `sequelize-typescript`, configuración global `paranoid` (soft delete) y campos audit (`created_at`, `updated_at`, `deleted_at`).
- Modelos compartidos (ubicados en `libs/database/src/models`):
  - `Role`: código único y descripción. Relación 1:N con `User`.
  - `User`: nombres, email único, password hasheada (pendiente), pertenencia a `Role`.
  - `Client`: datos de contacto, RUT y email únicos, notas opcionales.
  - `Category`: agrupa servicios, incluye `display_order`.
  - `Service`: nombre, descripción, precio, duración opcional, pertenece a `Category`.
  - `Appointment`: combina fecha y hora en `scheduled_at`, estado (`scheduled/completed/cancelled`), método de pago (`cash/card/transfer/other`), giftcard y causa de cancelación opcional.
  - `NotificationTemplate`: define plantillas por canal (`email/sms/push`).
  - `NotificationLog`: registra envíos de notificaciones, destinatario, estado (`pending/sent/failed`) y trazabilidad.
- Cada microservicio importa sólo los modelos que necesita mediante `SequelizeModule.forFeature(...)`.

## Variables de entorno

Crea un archivo `.env` en la raíz con la configuración base:

```
NODE_ENV=development
APP_NAME=gateway
APP_PORT=3000

DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=secret
DB_NAME=schedule

USERS_SERVICE_URL=http://localhost:3001
CLIENTS_SERVICE_URL=http://localhost:3002
SERVICES_SERVICE_URL=http://localhost:3003
AGENDA_SERVICE_URL=http://localhost:3004
AUTH_SERVICE_URL=http://localhost:3005
NOTIFICATIONS_SERVICE_URL=http://localhost:3006
```

- Cada servicio puede sobreescribir `APP_NAME` y `APP_PORT` usando los scripts descritos abajo.
- Ajusta las credenciales de MySQL según tu entorno.
- Las URLs de microservicios sirven para que el gateway enrute las solicitudes. Ajusta a la infraestructura real.

## Ejecución

Los scripts usan `cross-env` para establecer el nombre/puerto por servicio. Se pueden lanzar en paralelo.

```bash
# Gateway
pnpm start:gateway      # modo normal
pnpm start:gateway:dev  # watch mode

# Auth
pnpm start:auth
pnpm start:auth:dev

# Notifications
pnpm start:notifications
pnpm start:notifications:dev

# Users
pnpm start:users
pnpm start:users:dev

# Clients
pnpm start:clients
pnpm start:clients:dev

# Services
pnpm start:services
pnpm start:services:dev

# Agenda
pnpm start:agenda
pnpm start:agenda:dev
```

### Builds

```bash
pnpm build              # compila gateway + microservicios
pnpm build:auth         # compila solo auth
pnpm build:notifications # compila solo notifications
pnpm build:users        # compila solo users
# ... idem para clients/services/agenda
```

## Tests

Pendiente de ajuste para entorno multi-app. Por ahora se mantiene configuración básica Jest.

```bash
pnpm test
pnpm test:e2e
pnpm test:cov
```

## Migraciones

El esquema se gestiona con `sequelize-cli`. Para crear las tablas:

```bash
pnpm migration:run          # aplica migraciones pendientes
pnpm migration:revert       # revierte la última migración
pnpm migration:generate --name add-new-table
```

Las migraciones viven en `database/migrations` y usan las variables definidas en `.env`.

## Próximos pasos

- Configurar migrations/seeders (p. ej. `sequelize-cli` o `umzug`) para versionar el esquema.
- Configurar pipelines CI/CD y estrategia de deployment (Docker / Kubernetes / etc.).
- Añadir comunicación síncrona/asíncrona entre servicios según necesidades del dominio.
- Elaborar políticas de seguridad (auth, rate limiting) en el gateway.
- Implementar hashing de contraseñas y emisión de tokens en `auth`.
- Crear flujos de negocio en cada microservicio aprovechando los modelos Sequelize.

## Docker (producción)

Cada microservicio y el gateway cuentan con su propio `Dockerfile` multi-stage. Ejemplo de build:

```bash
docker build -t api-schedule-gateway -f apps/gateway/Dockerfile .
docker build -t api-schedule-auth -f apps/auth/Dockerfile .
docker build -t api-schedule-notifications -f apps/notifications/Dockerfile .
docker build -t api-schedule-users -f apps/users/Dockerfile .
docker build -t api-schedule-clients -f apps/clients/Dockerfile .
docker build -t api-schedule-services -f apps/services/Dockerfile .
docker build -t api-schedule-agenda -f apps/agenda/Dockerfile .
```

Las imágenes exponen los puertos 3000-3006 respectivamente y ejecutan `node dist/apps/<servicio>/main`.

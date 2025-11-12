const DEFAULT_PORT = 3000;

export default () => ({
  app: {
    name: process.env.APP_NAME ?? 'api-schedule',
    env: process.env.NODE_ENV ?? 'development',
    port: parseInt(process.env.APP_PORT ?? `${DEFAULT_PORT}`, 10),
  },
  database: {
    host: process.env.DB_HOST ?? 'localhost',
    port: parseInt(process.env.DB_PORT ?? '3306', 10),
    username: process.env.DB_USER ?? 'root',
    password: process.env.DB_PASSWORD ?? '',
    name: process.env.DB_NAME ?? 'schedule',
  },
  services: {
    usersUrl: process.env.USERS_SERVICE_URL ?? 'http://localhost:3001',
    clientsUrl: process.env.CLIENTS_SERVICE_URL ?? 'http://localhost:3002',
    catalogUrl: process.env.SERVICES_SERVICE_URL ?? 'http://localhost:3003',
    agendaUrl: process.env.AGENDA_SERVICE_URL ?? 'http://localhost:3004',
    authUrl: process.env.AUTH_SERVICE_URL ?? 'http://localhost:3005',
    notificationsUrl:
      process.env.NOTIFICATIONS_SERVICE_URL ?? 'http://localhost:3006',
  },
});


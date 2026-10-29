import 'dotenv/config';
import http from 'http';
import { app } from './app';
import { sequelize } from './config/database';
import { initModels } from './model';

initModels();
 
const PORT = Number(process.env.NODE_PORT) || 3000;
const DB_RETRY_DELAY_MS = 5000;
 
let dbReady = false;
 
const server = http.createServer(app);
 
server.on('error', (err) => {
  console.error('Server error:', err);
  process.exit(1);
});
 
server.listen(PORT, () => {
  console.log(`HTTP server running at http://localhost:${PORT}`);
  console.log(`Swagger docs at http://localhost:${PORT}/api-docs`);
});
 
app.get('/health', (_req, res) => {
  res.status(dbReady ? 200 : 503).json({ db: dbReady ? 'ok' : 'unavailable' });
});
 
(async () => {
  while (!dbReady) {
    try {
      await sequelize.authenticate();
      dbReady = true;
      console.log('Database connected');
    } catch {
      await new Promise((r) => setTimeout(r, DB_RETRY_DELAY_MS));
    }
  }
})();
 
const shutdown = async (signal: string) => {
  console.log(`${signal} received, shutting down`);
  server.close(async () => {
    await sequelize.close();
    process.exit(0);
  });
};
 
process.on('SIGTERM', () => void shutdown('SIGTERM'));
process.on('SIGINT', () => void shutdown('SIGINT'));
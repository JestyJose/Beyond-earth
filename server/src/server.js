import app from './app.js';
import { config } from './config/env.js';

const PORT = config.port;

app.listen(PORT, () => {
  console.log(`===============================================`);
  console.log(`🚀 BEYOND EARTH API Server running on port ${PORT}`);
  console.log(`🛰️ Environment: ${config.nodeEnv}`);
  console.log(`🔭 Health Check: http://localhost:${PORT}/api/v1/health`);
  console.log(`📡 Hardware API: http://localhost:${PORT}/api/v1/hardware`);
  console.log(`🪐 Destinations: http://localhost:${PORT}/api/v1/destinations`);
  console.log(`⏳ Timeline API: http://localhost:${PORT}/api/v1/timeline`);
  console.log(`===============================================`);
});

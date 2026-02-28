const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');

const app = express();
const PORT = process.env.PORT || 8000;

// CORS middleware allowing all origins
app.use(cors());
app.use(express.json());

// Optional Postgres connection (only if DATABASE_URL is provided)
let pool = null;
if (process.env.DATABASE_URL) {
  pool = new Pool({ connectionString: process.env.DATABASE_URL });
}

// GET / — service info
app.get('/', (req, res) => {
  res.json({ service: 'test-backend-express', status: 'running' });
});

// GET /health — health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

// GET /api/items — returns a static list of items
app.get('/api/items', (req, res) => {
  res.json([{ id: 1, name: 'Test Item' }]);
});

app.listen(PORT, () => {
  console.log(`test-backend-express listening on port ${PORT}`);
});

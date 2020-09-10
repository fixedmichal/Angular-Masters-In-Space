import { createProxyMiddleware } from 'http-proxy-middleware';
import express from 'express';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const app = express();
const port = 4550;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const distRoot = path.resolve(__dirname, '../dist/space-app/browser');

app.use(express.static(distRoot));

app.use('/api', createProxyMiddleware({
  target: 'http://localhost:4510',
  pathRewrite: { '^/api': '' },
}));

app.get(/.*/, (req, res) => {
  res.sendFile('index.html', { root: distRoot });
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}...`);
});

import { bodyParser, create, defaults, rewriter, router } from 'json-server';
import { join } from 'path';
import { db } from './db';
import { privateVapidKey, publicVapidKey } from './push-config';
import { routes } from './routes';

const minimist = require('minimist');
const webpush = require('web-push');
const express = require('express');

// setup config
const argv = minimist(process.argv.slice(2));
const host = argv['host'] || 'localhost';
const port = argv['port'] || '4510';

// setup push
webpush.setVapidDetails('mailto:admin@localhost.com', publicVapidKey, privateVapidKey);

// create server
const server = create();
const middlewares = defaults();

// middlewares
server.use(rewriter({'/api/*': '/$1'}));
server.use(express.static(join(__dirname, 'public')));
server.use(middlewares);
server.use(bodyParser);

// connect db and custom routes
routes.forEach(({path, method, handler}) => server[method](path, handler));
server.use(router(db));

// run server
server.listen(port, host, () => {
  console.log(`Dev API is running at http://${host}:${port}...`);
});

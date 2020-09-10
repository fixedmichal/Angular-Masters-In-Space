import { mockedAppConfig, mockedLaunches, mockedSubscriptions } from '../space-api/mocks';
import { CustomRoute } from './custom-route';
import * as webpush from 'web-push';
import sharp from 'sharp';

interface Notification extends NotificationOptions {
  title: string;
  // added actions due to issue:
  // https://github.com/microsoft/TypeScript/issues/58674
  actions: {action: string, title: string}[]
}

export const routes: CustomRoute[] = [
  {
    path: '/app-config',
    method: 'get',
    handler: (req, res) => res.json(mockedAppConfig)
  },
  {
    path: '/launches/:id/details',
    method: 'post',
    handler: (req, res) => {
      const launch = mockedLaunches.find(l => l.id === +req.params['id']);
      if (!launch) { return res.status(404).json(null); }

      launch.details = req.body.details;
      return res.json(launch);
    }
  },
  {
    path: '/get-image',
    method: 'get',
    handler: async (req, res) => {
      const src = req.query['src']?.toString() ?? '';
      const width = req.query['width'] ? parseInt(req.query['width'].toString()) : null;

      if (!src) {
        return res.status(400).send('Missing "src" query param');
      }

      try {
        const image = await fetch(src);
        const buffer = Buffer.from(await image.arrayBuffer());
        const resBuffer = await sharp(buffer)
          .resize(width)
          .webp({ quality: 80 })
          .toBuffer();
        return res.contentType('image/webp').send(resBuffer);
      } catch (e) {
        return res.status(400).send(e instanceof Error ? e.message : 'Error occurred');
      }
    }
  },
  {
    path: '/push-notification',
    method: 'get',
    handler: (req, res) => {
      const payload: {notification: Notification} = {
        notification: {
          title: req.query['title'] as string ?? 'Web Push Works!',
          body: req.query['body'] as string ?? 'Click to focus app',
          actions: [
            {action: 'launches', title: 'Open Launches'},
            {action: 'labs', title: 'Open Labs'}
          ],
          data: {
            onActionClick: {
              default: {operation: 'focusLastFocusedOrOpen', url: ''},
              launches: {operation: 'openWindow', url: '/launches'},
              labs: {operation: 'openWindow', url: '/labs'}
            }
          }
        }
      };

      const payloadEncoded = JSON.stringify(payload);
      mockedSubscriptions.forEach(subscription =>
        webpush.sendNotification(subscription, payloadEncoded).catch(e => console.error(e))
      )

      return res.json(payload);
    }
  }
];

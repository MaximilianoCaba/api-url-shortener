import urlController from '../../controller/urlController';
import urlMiddleware from '../../middleware/urlMiddeleware';
import { get, post, put } from './schemas';

const urlRoute = async (app) => {
  app.get('/:id', { schema: get, onSend: urlMiddleware.interceptor, handler: urlController.get });

  app.post('/api/url', { schema: post, handler: urlController.save });

  app.put('/api/url/:id', { schema: put, handler: urlController.update });
};

module.exports = urlRoute;

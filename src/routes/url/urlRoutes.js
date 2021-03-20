import urlController from '../../controller/urlController';
import urlMiddleware from '../../middleware/urlmiddeleware';
import { get, post, put } from './schemas';

/*
const routes = [
  {
    method: 'GET',
    url: '/:id',
    onSend: urlMiddleware.interceptor,
    handler: urlController.get,
  },
  {
    method: 'POST',
    url: '/api/url',
    handler: urlController.save,
  },
  {
    method: 'PUT',
    url: '/api/url/:id',
    handler: urlController.update,
  },
];
*/

const urlRoute = async (app) => {
  app.get('/:id', { schema: get, onSend: urlMiddleware.interceptor, handler: urlController.get });

  app.post('/api/url', { schema: post, handler: urlController.save });

  app.put('/api/url/:id', { schema: put, handler: urlController.update });
};

module.exports = urlRoute;

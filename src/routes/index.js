import urlRoute from './url/urlRoutes';

const apiRoutes = async (app) => {
  app.register(urlRoute);
};

module.exports = apiRoutes;

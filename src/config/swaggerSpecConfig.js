module.exports = {
  routePrefix: '/documentation',
  exposeRoute: true,
  swagger: {
    info: {
      title: 'fastify demo api',
      description: 'docs',
      version: '0.1.0',
    },
    externalDocs: {
      url: 'https://swagger.io',
      description: 'Find more info here',
    },
    servers: [
      { url: `http://localhost:3004`, description: 'local development' },
      { url: 'https://dev.your-site.com', description: 'development' },
      { url: 'https://sta.your-site.com', description: 'staging' },
      { url: 'https://pro.your-site.com', description: 'production' },
    ],
    schemes: ['http'],
    consumes: ['application/json'],
    produces: ['application/json'],
    tags: [{ name: 'url', description: 'Url related end-points' }],
  },
};

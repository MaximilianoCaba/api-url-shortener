const paramUrlId = {
  type: 'object',
  properties: {
    id: {
      type: 'string',
      description: 'url to redirect',
    },
  },
};

const tags = ['url'];

const get = {
  tags,
  params: paramUrlId,
  response: {
    302: {
      description: 'redirect to original url',
      type: 'null',
    },
  },
};

const post = {
  tags,
  body: {
    url: {
      description: 'url original to redirect [url need include http:// || https:// protocol ]',
      type: 'string',
    },
  },
  response: {
    201: {
      description: 'get shortener url',
      type: 'object',
      properties: {
        url: {
          type: 'string',
        },
      },
      example: {
        url: 'https://myurl.fy/A1J',
      },
    },
  },
};

const put = {
  tags,
  body: {
    url: {
      description: 'new url to redirect',
      type: 'string',
    },
    enabled: {
      description: 'enabled or disabled to redirect',
      type: 'boolean',
      nullable: true,
    },
  },
  params: paramUrlId,
  response: {
    200: {
      description: 'object after updated',
      type: 'object',
      properties: {
        url: {
          type: 'string',
        },
        enabled: {
          type: 'boolean',
        },
      },
      example: {
        url: 'https://www.google.com',
        enabled: 'false',
      },
    },
  },
};

export { get, post, put };

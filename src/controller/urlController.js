import urlService from '../service/urlService';

const get = async (req, reply) => {
  const { id } = req.params;
  const url = await urlService.get(id);
  reply.status(302).redirect(url);
};

const save = async (req, reply) => {
  const url = await urlService.save(req.body);
  reply.status(201).send({ url });
};

const update = async (req, reply) => {
  const { id } = req.params;
  const urlDtoResponse = await urlService.update(id, req.body);
  reply.status(200).send(urlDtoResponse);
};

export default { get, save, update };

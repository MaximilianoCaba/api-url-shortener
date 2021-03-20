import { getStats, saveStats } from '../util/statsUtils';

const saveInFile = (id) => {
  const urlBase= process.env.URL_BASE;
  const stats = getStats();
  const event = `${urlBase}${id}`;
  stats[event] = stats[event] ? stats[event] + 1 : 1;
  saveStats(stats);
};

const interceptor = async (req, res, payload, done) => {
  if (!payload) {
    saveInFile(req.params.id);
  }
  done();
};

export default { interceptor };

import { getStats, saveStats } from '../util/statsUtils';

const saveInFile = (id) => {
  const stats = getStats();
  const event = `${id}`;
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

import fs from 'fs';
const FILE_PATH = 'stats.json';

const getStats = () => {
  let result = {};
  try {
    result = JSON.parse(fs.readFileSync(FILE_PATH));
  } catch (err) {
    console.error(err);
    fs.appendFile(FILE_PATH, '', function (err) {
      if (err) throw err;
      console.log('Saved!');
    });
  }
  return result;
};

const saveStats = (stats) => {
  try {
    fs.writeFileSync(FILE_PATH, JSON.stringify(stats), { flag: 'w+' });
  } catch (err) {
    console.error(err);
  }
};

export { getStats, saveStats };

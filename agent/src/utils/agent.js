const request = require('request-promise');
const Controllers = require('../controllers');

const generateURI = (rows = 1000, page = 1) => {
  return `https://www.assetstore.unity3d.com/api/en-US/search/results.json?q=updated%3A360&q=price%3A%3E0&q=rating%3A2%2B&rows=${rows}&page=${page}&order_by=popularity`;
};

const options = {
  headers: {
    'User-Agent':
      'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/62.0.3202.94 Safari/537.36'
  },
  json: true
};

const fetchAssets = async (rows = 1000, page = 1) => {
  options.uri = generateURI(rows, page);
  return request(options);
};

const syncAssets = async () => {
  const maxConcurrentDatabaseCalls = 5;
  const rows = 1000;
  let page = 1;
  let data = null;
  let assetCount = 0;
  do {
    data = await fetchAssets(rows, page++);
    const batchOps = [];
    for (let i = 0, len = data.results.length - 1; i <= len; i++) {
      batchOps.push(Controllers.Assets.update.asset(data.results[i]));
      if (batchOps.length === maxConcurrentDatabaseCalls || i === len) {
        await Promise.all(batchOps);
        assetCount += batchOps.length;
        batchOps.length = 0;
      }
    }
  } while (data.results.length > 0);
  return assetCount;
};

module.exports = {
  fetchAssets,
  syncAssets
};

const schedule = require('node-schedule');
const Controllers = require('../controllers');
const Agent = require('./agent');

let CRON = null;

// function timeout(ms) {
//   return new Promise(resolve => setTimeout(resolve, ms));
// }

const doFetch = async () => {
  try {
    await Controllers.Information.update({
      id: 'assets-agent',
      status: 'preparing to fetch'
    });

    const assetCount = await Agent.syncAssets();

    return Controllers.Information.update({
      id: 'assets-agent',
      status: 'fetch completed',
      fetchedAssets: assetCount
    });
  } catch (e) {
    return Controllers.Information.log.do({
      id: 'ERROR EVENT',
      message: e.message,
      error: e
    });
  }
};

function ops() {
  doFetch()
    .catch((err) => {
      Controllers.Information.log.do({
        id: 'ERROR EVENT',
        message: err.message,
        error: err
      }).then(() => {}).catch(() => {});
    });
}

module.exports = {
  startJob: () => {
    if (CRON !== null) {
      CRON.cancel();
    }
    CRON = schedule.scheduleJob('0 9/21 * * *', () => {
      ops();
    });
  },
  stopJob: () => {
    CRON.cancel();
  },
  doOnce: () => {
    ops();
  }
};

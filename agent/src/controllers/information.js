const Models = require('../models');

const Controller = {
  getAll: async () => Models.Information.find(),
  update: async (data) => {
    data.timestamps = new Date();
    await Models.Information.findOneAndUpdate(data.id, data, { upsert: true });
    return Models.Log.create(data);
  },
  log: {
    do: async (data) => {
      data.timestamps = new Date();
      return Models.Log.create(data);
    },
    getAll: async () => Models.Log.find()
  }
};

module.exports = Controller;

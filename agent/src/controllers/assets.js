const Models = require('../models');
const moment = require('moment');

const Controller = {
  update: {
    asset: async (data) => {
      data.updatedAt = Date.now();
      let asset = await Models.Assets.findOne({
        id: data.id
      });
      if (asset === null) {
        // If asset is brand new, then just create
        return Models.Assets.create(data);
      }
      asset = asset.toObject();
      if (Number.isNaN(data.price_usd) || Number.isNaN(asset.price_usd)) {
        throw new Error('price_usd not a number');
      }
      let assetSale = await Models.AssetsSale.findOne({
        id: data.id
      });

      const onSale = assetSale !== null;

      // If assets already on sale
      if (onSale) {
        assetSale = assetSale.toObject();
        if (parseFloat(data.price_usd) < parseFloat(assetSale.price_usd)) {
          // If asset is cheaper than the one on sale, then updates information on the sale coll
          return Models.AssetsSale.findOneAndUpdate(
            {
              id: data.id
            },
            data
          );
        } else if (
          parseFloat(data.price_usd) > parseFloat(assetSale.price_usd) ||
          moment().diff(moment(assetSale.updatedAt), 'days') > 7
        ) {
          // If asset is pricier than the one on sale or the one on sale coll is already a week
          // old, then delete the one on sale coll and update the one on asset coll
          await Models.AssetsSale.findOneAndRemove({ id: data.id });
          return Models.Assets.findOneAndUpdate({ id: data.id }, data);
        }
        // If asset price stays the same and younger than a week, then update information
        // but timestamps stays the same
        data.updatedAt = assetSale.updatedAt;
        return Models.AssetsSale.findOneAndUpdate({ id: data.id }, data);
      }

      // If asset is not on sale but the current price is cheaper, then insert to sale coll
      if (parseFloat(data.price_usd) < parseFloat(asset.price_usd)) {
        return Models.AssetsSale.create(data);
      }
      // If asset is not cheaper than the current asset on asset coll, then just updates information
      data.updatedAt = asset.updatedAt;
      return Models.Assets.findOneAndUpdate({ id: data.id }, data);
    }
  },
  delete: {}
};

module.exports = Controller;

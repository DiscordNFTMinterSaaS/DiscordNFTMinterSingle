const db = require("../modules/mongoose");
const nftStorageApiKeyModel = db.getModel("nftStorageApiKey");

exports.getApiKey = async userId => {
  return nftStorageApiKeyModel.findOne({ userId });
};

exports.upsertApiKey = async (query, data) => {
  return nftStorageApiKeyModel.findOneAndUpdate(query, { $set: data }, { upsert: true });
};
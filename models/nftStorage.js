const axios = require("axios");
const db = require("../modules/mongoose");
const nftStorageApiKeyModel = db.getModel("nftStorageApiKey");
const nftStorageItemsModel = db.getModel("nftStorageItems");
const { NFTStorage, Blob } = require("nft.storage");

const getApiKey =  async userId => {
  return nftStorageApiKeyModel.findOne({ userId });
};
exports.getApiKey = getApiKey;
exports.upsertApiKey = async (query, data) => {
  return nftStorageApiKeyModel.findOneAndUpdate(query, { $set: data }, { upsert: true });
};

exports.uploadFile = async ({ userId, url, name, guildId, channelId }) => {
  const { apiKey: token } = await getApiKey(userId);
  if (!token) {
    return {
      err: "apiKeyNotSet",
      msg: "Your nft.storage api key do not setup yet, pls use /nft-storage-set-api-key to setup"
    };
  }

  const storage = new NFTStorage({ token });
  const rzStore = await nftStorageItemsModel.create({
    userId, url, name, guildId, channelId
  });

  const storeId = rzStore._id + "";

  try {
    const img = await axios({
      method: "get",
      url,
      responseType: "arraybuffer"
    });
    console.log("====> img :", img);
    const cid = await storage.storeBlob(new Blob([img.data]));
    await nftStorageItemsModel.findByIdAndUpdate(storeId, { $set: { cid } });

    return {cid};
  } catch (e) {
    if (e.details) {
      return { err: e.reason, msg: e.details };
    }

    console.log("====> e :", e);
    return { err: "unknown", msg: e.toString() };
  }
};

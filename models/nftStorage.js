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

const blobDataCreator = {
  image: async data => {
    const url = data;
    const img = await axios({
      method: "get",
      url,
      responseType: "arraybuffer"
    });
    return new Blob([img.data]);
  },
  json: data => {
    return new Blob([JSON.stringify(data, null, 2)], {
      type: "application/json",
    });
  }
};

exports.uploadBlob = async ({ userId, data, name, guildId, channelId, uploadType }) => {
  const { apiKey: token } = await getApiKey(userId);
  if (!token) {
    return {
      err: "apiKeyNotSet",
      msg: "Your nft.storage api key do not setup yet, pls use /nft-storage-set-api-key to setup"
    };
  }

  const storage = new NFTStorage({ token });
  const rzStore = await nftStorageItemsModel.create({
    userId, data, name, guildId, channelId, uploadType
  });

  const storeId = rzStore._id + "";

  try {
    if (!blobDataCreator[uploadType]) {
      return {
        err: "unknownUploadType",
        msg: "the upload type is unknown"
      };
    }

    const theBlob = await blobDataCreator[uploadType](data);
    const cid = await storage.storeBlob(theBlob);
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

const ethers = require("ethers");

exports.run = async (client, message, args, level) => { // eslint-disable-line no-unused-vars
  const { attachments, author } = message;
  let { channelId, guildId } = message;
  guildId = guildId + "";
  channelId = channelId + "";

  const { id: userId } = author;
  const name = (args[0] || "").trim("");
  const walletAddress = (args[1] || "").trim("");

  if (!name) {
    return message.channel.send("You must input a file name");
  }
  if (!walletAddress) {
    return message.channel.send("You must input a wallet Address");
  }
  if (!ethers.utils.isAddress(walletAddress)) {
    return message.channel.send("Your wallet Address is not validate");
  }

  const attachment = attachments.first();
  if (!attachment) {
    return message.channel.send("You must attach an image as your NFT image");
  }
  message.channel.send("I'm minting your NFT, pls wait!");

  const { url } = attachment;

  // 1. upload img
  const nftStorageModel = require("../models/nftStorage");
  const imgUploadRz = await nftStorageModel.uploadBlob({
    userId,
    data: url,
    name: `${name}-img`,
    guildId,
    channelId,
    uploadType: "image"
  });
  if (!imgUploadRz.cid) {
    return message.channel.send(`upload image failed, reason: ${imgUploadRz.msg}`);
  }
  message.channel.send(`1. upload image success with IPFS CID: ${imgUploadRz.cid}`);

  // 2. upload json
  const jsonUploadRz = await nftStorageModel.uploadBlob({
    userId,
    name: `${name}-meta`,
    data: {
      name,
      image: `ipfs://${imgUploadRz.cid}`
    },
    guildId,
    channelId,
    uploadType: "json"
  });
  if (!jsonUploadRz.cid) {
    return message.channel.send(`add nft meta failed, reason: ${jsonUploadRz.msg}`);
  }
  message.channel.send(`2. add nft meta success with IPFS CID: ${jsonUploadRz.cid}`);

  // 3. mint nft
  const nftModel = require("../models/nft");
  const metaUrl = `ipfs://${jsonUploadRz.cid}`;
  const mintRz = await nftModel.mint({
    userId,
    name,
    walletAddress,
    metaUrl,
    guildId,
    channelId
  });
  if (mintRz.err) {
    return message.channel.send(`mint nft failed: ${mintRz.err}`);
  }
  message.channel.send(`3. start mint your nft, pls check here: ${nftModel.getLink(mintRz.hash)}`);
  const transactionReceipt = await nftModel.getMintResult(mintRz);
  if (transactionReceipt.status !== 1) {
    return message.channel.send(`mint nft failed: ${transactionReceipt}`);
  }
  const tokenId = ethers.BigNumber.from(transactionReceipt.logs[0].topics[3]).toNumber();
  message.channel.send(`!!!==== MINT your nft SUCCESSED!!! pls check on the opensea here(the image will be delay show pls don't worry about it!): ${nftModel.getOpenSeaLink(tokenId)}`);
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: "User"
};

exports.help = {
  name: "mint",
  category: "NFT",
  description: "Mint your NFT",
  usage: "mint [name] [walletAddress]"
};

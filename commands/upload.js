exports.run = async (client, message, args, level) => { // eslint-disable-line no-unused-vars
  const { attachments, author } = message;
  let { channelId, guildId } = message;
  guildId = guildId + "";
  channelId = channelId + "";

  const { id: userId } = author;
  const name = (args[0] || "").trim("");

  if (!name) {
    return message.channel.send("You must have a file name");
  }
  const attachment = attachments.first();
  if (!attachment) {
    return message.channel.send("you must attach an file");
  }
  const { url } = attachment;
  message.channel.send("I'm uploading your image, pls wait!");

  const nftStorageModel = require("../models/nftStorage");
  const rz = await nftStorageModel.uploadBlob({
    userId,
    data: url,
    name: `${name}-img`,
    guildId,
    channelId,
    uploadType: "image"
  });
  if (rz.cid) {
    return message.channel.send(`upload success with IPFS CID: ${rz.cid}, you can check the file here: https://${rz.cid}.ipfs.nftstorage.link`);
  }
  message.channel.send(`upload failed, reason: ${rz.msg}`);
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: "User"
};

exports.help = {
  name: "upload",
  category: "IPFS",
  description: "Upload file to IPFS",
  usage: "upload [name]"
};

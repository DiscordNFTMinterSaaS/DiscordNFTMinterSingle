exports.run = async (client, interaction) => {
  if (!interaction.isCommand()) return;
  const { id: _userId, username } = interaction.user;
  const userId = _userId.toString();

  const nftStorageModel = require("../models/nftStorage");
  await interaction.deferReply({ ephemeral: true });
  const rz = await nftStorageModel.getApiKey(userId);
  let content = `Hey ${username}, you do not setup your nft storage api key yet, input /nft-storage-set-api-key to set one.`;
  if (rz) {
    content = `Hey ${username}, Your nft storage api key is: ${rz.apiKey}`;
  }
  await interaction.followUp({
    ephemeral: true,
    content,
  });
};

exports.commandData = {
  name: "nft-storage-show-api-key",
  description: "show your nft storage api key",
  defaultPermission: true
};

exports.conf = {
  permLevel: "User",
  guildOnly: true
};
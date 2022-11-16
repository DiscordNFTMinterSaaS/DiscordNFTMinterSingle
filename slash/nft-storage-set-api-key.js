exports.run = async (client, interaction) => {
  if (!interaction.isCommand()) return;
  const { id: _userId, username } = interaction.user;
  const userId = _userId.toString();

  const nftStorageModel = require("../models/nftStorage");

  await interaction.deferReply({ ephemeral: true });

  const apiKey = interaction.options.getString("api_key");
  await interaction.followUp({
    ephemeral: true,
    content: "I'm saving your nft.storage api key now, pls be patient."
  });

  await nftStorageModel.upsertApiKey({ userId }, { apiKey });

  await interaction.followUp({
    ephemeral: true,
    content: "Your nft.storage api key save successed, pls input '~upload' command to upload your file to IPFS"
  });
};

exports.commandData = {
  name: "nft-storage-set-api-key",
  description: "Setup your nft.storage api key, Only you can see the message",
  // https://discord.js.org/#/docs/main/stable/typedef/ApplicationCommandOption
  options: [
    {
      type: "STRING",
      name: "api_key",
      description: "Pls add nft.storage API Key",
      required: true
    }
  ],
  defaultPermission: true
};

exports.conf = {
  permLevel: "User",
  guildOnly: true
};
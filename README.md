# DiscordNFTMinterSingle

This repo is base on the <https://github.com/AnIdiotsGuide/guidebot/>, and add features with <https://nft.storage/> and ethers.js to provide guild members to have the ability to upload with NFT.Storage and mint NFT in guild.

## setup

* `git clone git@github.com:DiscordNFTMinterSaaS/DiscordNFTMinterSingle.git`
* `npm i`
* Rename `config.js.example` to `config.js`
* Rename `.env-example` to `.env`
* `node index.js` to start the bot
* Get bot's token
  * Go to the <https://discord.com/developers/applications/me>
  * Create a `New Application`
  * Click `Bot`, `Add Bot` then finally click `Yes, do it`
  * Visit <https://discord.com/oauth2/authorize?client_id=APP_ID&scope=bot> , replacing `APP_ID` with the `Application ID` from the app page, to add the bot to your server (or ask a server admin to do it for you). If you're wanting slash commands as well, add `%20applications.commands` to the end of the URL above.
  * Copy the bot `TOKEN` and paste it in `.env` after `DISCORD_TOKEN=`

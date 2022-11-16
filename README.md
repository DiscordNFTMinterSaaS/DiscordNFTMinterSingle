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
* `npm run dev` for local development

## For mac in China

We need an http proxy to make our code connect to `discord.com` host.
If you have VPN running, this will just working, if don't, you can buy an VPN then, you can buy ExpressVPN [here](https://www.expressrefer.com/refer-a-friend/30-days-free?referrer_id=87831900&utm_campaign=referrals&utm_medium=copy_link&utm_source=referral_dashboard).

For me, I use a socks5 proxy on my Mac, so I need to forward http request into socks5 proxy:

* `pip3 install pproxy` <https://github.com/qwj/python-proxy>
* `pproxy -r socks5://127.0.0.1:1080 vv`
* now I have a http proxy listen on `http://127.0.0.1:8080`
* `npm run pdev`

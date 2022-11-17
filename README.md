# DiscordNFTMinterSingle

This repo is base on the <https://github.com/AnIdiotsGuide/guidebot/>, and add features with <https://nft.storage/> and ethers.js to provide guild members to have the ability to upload with NFT.Storage and mint NFT in guild.

## Setup

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
* Add `MONGODB_URI` in `.env` file, we can get a free plain from <https://cloud.mongodb.com/>
* Copy your discord user id and add to `OWNER` in `.env` file
* `npm run dev` for local development

## For mac in China

We need an http proxy to make our code connect to `discord.com` host.
If you have VPN running, this will just working, if don't, you can buy an VPN then, you can buy ExpressVPN [here](https://www.expressrefer.com/refer-a-friend/30-days-free?referrer_id=87831900&utm_campaign=referrals&utm_medium=copy_link&utm_source=referral_dashboard).

For me, I use a socks5 proxy on my Mac, so I need to forward http request into socks5 proxy:

* `pip3 install pproxy` <https://github.com/qwj/python-proxy>
* `pproxy -r socks5://127.0.0.1:1080 vv`
* now I have a http proxy listen on `http://127.0.0.1:8080`
* `npm run pdev`

## Add deploy config for Heroku

check the Procfile for more detail


# Guide Bot

A boilerplate of a Discord.js Bot Handler.
Updated and Maintained by the [Idiot's Guide Community](https://discord.gg/vXVxsAjSMF).

Guidebot is an attempt to show the basics of command and event handling, in clear, concise,
and commented code. Guidebot can be used as the template for any type of bot, and contains
most of the basic features you would need:

* A command handler
* A basic permission system
* An event handler
* Basic useful commands
* Per-server configuration system
* A logging system

Functionally [guidebot](https://github.com/AnIdiotsGuide/guidebot/) is identical to [guidebot class](https://github.com/AnIdiotsGuide/guidebot/tree/class), but the difference is that guidebot
class is created with classes whilst this version is purely function based.

Need support? Join the [Idiot's Guide Community](https://discord.gg/vXVxsAjSMF)!

## Requirements

* `git` command line ([Windows](https://git-scm.com/download/win) | [Linux](https://git-scm.com/download/linux) | [MacOS](https://git-scm.com/download/mac)) installed
* `node` [Version 16.x](https://nodejs.org)
* The node-gyp build tools. This is a pre-requisite for Enmap, but also for a **lot** of other modules. See [The Enmap Guide](https://enmap.evie.codes/install#pre-requisites) for details and requirements for your OS. Just follow what's in the tabbed block only, then come back here!

You also need your bot's token. This is obtained by creating an application in
the Developer section of discord.com. Check the [first section of this page](https://anidiots.guide/getting-started/getting-started-long-version)
for more info.

## Intents

You can enable privileged intents in your bot page
(the one you got your token from) under `Privileged Gateway Intents`.

By default GuideBot needs the Guilds, Guild Messages and Direct Messages intents to work.
For join messages to work you need Guild Members, which is privileged.
User counts that GuideBot has in places such as in the ready log, and the stats
command may be incorrect without the Guild Members intent.

Intents are loaded from the index.js file, and the installer is pre-set with the Guilds, Guild Messages and Direct Messages intents.

For more info about intents checkout the [official Discord.js guide page](https://discordjs.guide/popular-topics/intents.html) and the [official Discord docs page](https://discord.com/developers/docs/topics/gateway#gateway-intents).

## Downloading

Create a folder within your projects directory and run the following inside it:

`git clone https://github.com/anidiotsguide/guidebot.git .`

Once finished:

* In the folder from where you ran the git command, run `npm install`, which will install the required packages.
* **If you get any error about python or msibuild.exe or binding, read the requirements section again!**
* Rename `config.js.example` to `config.js`, and give it the required intents and any partials you may require.
* Rename `.env-example` to `.env` and put in your bot token in it and save.

## Starting the bot

To start the bot, in the command prompt, run the following command:
`node index.js`

## Inviting to a guild

To add the bot to your guild, you have to get an oauth link for it.

You can use this site to help you generate a full OAuth Link, which includes a calculator for the permissions:
[Permission Calculator](https://finitereality.github.io/permissions-calculator/?v=0)

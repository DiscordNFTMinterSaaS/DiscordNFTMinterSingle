# `NFTs are the Web3` 1. How to Build an Discord NFT Minter Bot for your guild members

`Using Discord.js, NFT.Storage and Node.JS`

In our `NFTs are the Web3` series articles, we will build a series of application that make your NFTs usefull with program funciton support and has any kind of impact
for your real-life business.

NFTs were JPGs for PFP project. Then they were games(AXie, StepN). Then they were everything as they finally stand for the ownership of anything!

Discord has become popular for the NFT projects. As it can be a powerful application for them to gather people and build a solid community.

It's obviously that NFTs are the Web3. And now if we can use Discord platform to integrated with NFTs then that would be greate for our Web3 ideas.

As we want more freedom to build whatever features for our `Discord NFT Bot`, that's why we don't just pick a bot service on the market such as `Collab.land`.

For our `Discord NFT Minter Bot`, we can apply it to any business you run in your real world, such as a coffee shop/shoes shop/clothes shop/training course/any club.

In this article, we will build a Discord Bot that can let your guild members to mint their NFT by input a `~mint` command with some params. This idea is what I build last year
and get some web3 hackathon prize then. It has these features:

* Bot owner can specific NFT contract address, NFT chain
* Bot owner can redeploy bot command, check stats
* Guild member can setup their own `NFT.Storage` api key to upload content to IPFS via `NFT.Storage` service in discord chat box
* Guild member can mint guild NFT by input `~mint` in chat box

As the article is a TL;DR style, we just list the setup we need to do here, do not explain too much.

## Create your application and bot in discord developer center

* You should already own an guild in discord or you can create a new guild, it's free
* Go to the <https://discord.com/developers/applications/me>
* Create a `New Application`
* Click `Bot`, `Add Bot` then finally click `Yes, do it`
* Visit <https://discord.com/oauth2/authorize?client_id=APP_ID&scope=bot> , replacing `APP_ID` with the `Application ID` from the app page, to add the bot to your server (or ask a server admin to do it for you). If you're wanting slash commands as well, add `%20applications.commands` to the end of the URL above.
* Copy the bot token and save somewhere as later we will need to use it

## Setup the code

* `git clone git@github.com:DiscordNFTMinterSaaS/DiscordNFTMinterSingle.git`
* `npm i`
* Rename `config.js.example` to `config.js`
* Rename `.env-example` to `.env`, all the fields in the file is required
* `node index.js` to start the bot

## [Deploy to Heroku](https://devcenter.heroku.com/articles/deploying-nodejs)

Heroku provides a solution that you can connect your GitHub repository to your Heroku app and it will do the deployment automatically
whenever you push your update to GitHub. Here is how we can achive this:

* Go to your Heroku app
* Under the deploy section, select the second option GitHub
* You will be able to see an input box and search your repo then click connect
* Once the repo is connected, you can select `enable automatic deploys`
* Whenever you push your code to GitHub, Heroku will automatically deploy the changes by the `Procfile` in our code

require('dotenv').config();
const search = require('youtube-search');

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
const toChannel = (member, ch) => member.voice.setChannel(ch);
const getChannelTitle = async (searchWord) => {
  const chOpts = { maxResults: 1, key: process.env.yt_key };

  const result = await search(searchWord, chOpts)
    .catch(err => { return console.log(`Please try again in a few seconds`)});

  return result.results[0].channelTitle;
}

module.exports = {
  sleep,
  toChannel,
  getChannelTitle
}
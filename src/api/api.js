import axios from 'axios';

const CLIENT_ID = 'c8a3wkkb56yqjhlcui7tcfyjvs65dy6';
const BASE_URL = 'https://api.twitch.tv/kraken/';

export function getChannelInfo(channel) {
  return axios.get(`${BASE_URL}channels/${channel}/?client_id=${CLIENT_ID}&callback=`);
}

export function getStreamInfo(channel) {
  return axios.get(`${BASE_URL}streams/${channel}/?client_id=${CLIENT_ID}&callback=`);
}

export function searchChannel(str) {
  return axios.get(`${BASE_URL}search/channels?q=${str}&client_id=${CLIENT_ID}`);
}

export function saveToStorage(data) {
  localStorage.setItem("channels", JSON.stringify(data));
}

export function getFromStorage(data) {
  return JSON.parse(localStorage.getItem(data))
}

export function update(name) {
  return new Promise((resolve) => {

    let channelInfo = {
      name: name,
      display_name: name,
      id: null,
      message: undefined,
      stream: undefined,
      online: undefined,
      logo: `img/no-logo.gif`
    };

    getChannelInfo(name).then((res) => {

      if (res.data.error) {
        channelInfo = {
          ...channelInfo,
          message: res.data.message,
        }

        resolve(channelInfo);

      } else {
        channelInfo = {
          ...channelInfo,
          name: res.data.name,
          display_name: res.data.display_name,
          id: res.data._id,
          stream: 'offline',
          logo: res.data.logo
        }

        getStreamInfo(name).then((res) => {
          if (res.data.stream) {
            channelInfo = {
              ...channelInfo,
              stream: res.data.stream.channel.status
            }
          }
          resolve(channelInfo);
        })
      }
    })
  });
}

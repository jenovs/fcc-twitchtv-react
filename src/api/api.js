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

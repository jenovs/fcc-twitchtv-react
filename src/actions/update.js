import { getStreamInfo, getChannelInfo } from './../api/api';

export function updateChannel(name) {
  // console.log(filter);
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

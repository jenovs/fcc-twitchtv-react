const initialChannels = ["freecodecamp", "monstercat", "ogamingsc2", "comster404", "ninety9lives", "spinninrecords", 'brunofin', 'sceneofactionmusic', 'thatsbamboo'];

const initialState = {
  names: initialChannels,
  channels: [],
  filter: 'all'
}

const channelsReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'CHANGE_FILTER':
      // console.log(state.channels);
      const filteredChannels = filterChannels(state.channels, action.payload)
      // console.log('filteredChannels', filteredChannels);
      return { ...state, filter: action.payload, filteredChannels: filteredChannels};
      break;
    // case 'UPDATE_CHANNELS':
    //   return {...state, filteredChannels: action.payload.filteredChannels};
    // // case 'UPDATE_CHANNELS':
    case 'UPDATE_CHANNEL':
      return {...state, channels: [...state.channels, action.payload.data]};
      break;
    case 'INIT_STATE':
      return {...state, names: action.payload.names, filter: action.payload.filter}
    case 'ADD_CHANNEL':
      console.log('in ADD_CHANNEL', action.payload.data);
      return {...state,
        names: [action.payload.data.name, ...state.names],
        channels: [action.payload.data, ...state.channels]}
    case 'DELETE_CHANNEL':
      console.log('in DELETE_CHANNEL');
      return {...state,
        names: state.names.filter(name => name !== action.payload),
        channels: state.channels.filter(channel => channel.name !== action.payload)
      }

      break;
    case 'FETCHING_DATA':
      return {...state, ...action.payload}
    default:
      return state;
  }
}

function filterChannels (channels, filter) {
  console.log('in filterChannels', channels, filter);
  if (filter === 'online') {
    return channels.filter(ch => {
      return (ch.stream && ch.stream !== 'offline')
    })
  } else if (filter === 'offline') {
    return channels.filter(ch => {
      return (ch.stream && ch.stream === 'offline')
    })
  } else {
    return channels;
  }
}


export default channelsReducer;

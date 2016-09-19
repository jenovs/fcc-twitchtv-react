import { getFromStorage, searchChannel, update } from './../api/api'

export const setFilter = (filter) => {
  const newFilter = changeFilter(filter)
  return {
    type: 'CHANGE_FILTER',
    payload: newFilter
  }
}

export const setSameFilter = (filter) => {
  return {
    type: 'CHANGE_FILTER',
    payload: filter
  }
}

const updateChannel = (data) => {
  return {
    type: 'UPDATE_CHANNEL',
    payload: {data}
  }
}

export const initState = (data) => {
  return {
    type: 'INIT_STATE',
    payload: data
  }
}

export const addChannel = (data) => {
  return {
    type: 'ADD_CHANNEL',
    payload: {data}
  }
}

export const updateSuggestions = (data) => {
  return {
    type: 'UPDATE_SUGGESTIONS',
    payload: data
  }
}

export const clearSuggestions = () => {
  return {
    type: 'CLEAR_SUGGESTIONS'
  }
}

export const handleDelete = (name) => {
  return {
    type: 'DELETE_CHANNEL',
    payload: name
  }
}

export const getSuggestionsAction = (text) => {
  return (dispatch, getState) => {
    searchChannel(text).then(res => {
      const result = res.data.channels.map(item => {
        return item.display_name;
      })
      dispatch(updateSuggestions(result));
    })
  }
}

export const fetchData = () => {

  return (dispatch, getState) => {
    let filter, names;
    if (getFromStorage('channels')) {
      filter = getFromStorage('channels').filter;
      names =  getFromStorage('channels').names;
    } else {
      filter = getState().channels.filter;
      names = getState().channels.names;
    }
    names.forEach((name) => {
      update(name).then(res => {
        dispatch(updateChannel(res));
      })
    })
  }
}

export const searchNewChannel = (text) => {
  return (dispatch, getState) => {
    searchChannel(text).then(res => {
      let name = res.data.channels[0].name;
      update(name).then(res => {
        let filter = getState().channels.filter;
        let currentNames = getState().channels.names;
        if (currentNames.indexOf(res.name) === -1) {
          dispatch(setSameFilter('all'));
          setTimeout(() => {
            dispatch(addChannel(res));
            setTimeout(() => {
              dispatch(setSameFilter(filter));
            }, 500)
          }, 500)
        }
      })
    })
  }
}

function changeFilter(filter) {
  switch (filter) {
    case 'all':
      return 'online'
      break;
    case 'online':
      return 'offline'
    case 'offline':
      return 'all'
    default:
      console.log('Error in changeFilter action');
  }
}

import { updateChannel as update } from './update'
import { getFromStorage, searchChannel } from './../api/api'

export const setFilter = (filter) => {
  console.log('Filter clicked', filter);
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
  console.log(data);
  return {
    type: 'ADD_CHANNEL',
    payload: {data}
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
        console.log('filter', filter);
        dispatch(addChannel(res));
        dispatch(setSameFilter('all'));
        setTimeout(() => {
          dispatch(setSameFilter(filter));
        }, 1000)

      })
    })
  }
}

export const handleDelete = (name) => {
  return {
    type: 'DELETE_CHANNEL',
    payload: name
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

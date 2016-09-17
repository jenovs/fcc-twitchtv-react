import React from 'react';
import ChannelList from 'ChannelList';
import Filter from 'Filter';
import Search from 'Search';
import { getStreamInfo, getChannelInfo, searchChannel, saveToStorage, getFromStorage } from './../api/api';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      names: ["freecodecamp", "noobs2ninjas", "monstercat", "OgamingSC2", "comster404", "ninety9lives", "spinninrecords", 'brunofin', 'evilfx', 'sceneofactionmusic', 'thatsbamboo'],
      channels: [],
      backupCh: [],
      filter: 'all',
      init: true
    }
  }

  componentWillMount() {

    // console.log('from storage', getFromStorage('channels'));
    let data = getFromStorage('channels');
    if (data === null) {
      this.initChannels()
    } else {
      // console.log('data', data);
      this.setState({
        names: data.names,
        filter: data.filter
      }, () => {
        this.initChannels()
      })
    }

    setTimeout(() => {
      this.filterChannels(this.state.filter)
    }, 2000)
  }

  handleSearch(value) {
		searchChannel(value).then(res => {
			if (res.data._total > 0 && this.state.names.indexOf(res.data.channels[0].name) === -1) {
        this.updateChannel(res.data.channels[0].name, 0)
      }
    })
  }

  updateChannel(name, i) {
    let channelInfo = {
      rawName: name,
      name: name,
      id: 0,
      message: undefined,
      stream: undefined,
      logo: `img/no-logo.gif`
    };

    getChannelInfo(name).then((res) => {

      if (res.data.error) {
        channelInfo = {
          ...channelInfo,
          rawName: name,
          name: name,
          id: i,
          message: res.data.message,
          stream: undefined,
        }
        this.setState({
          channels: [channelInfo, ...this.state.channels],
          backupCh: [channelInfo, ...this.state.backupCh],
          init: false
        }, () => {
  				saveToStorage({
  					names: this.state.names,
  					filter: this.state.filter
  				})
        })
      } else {
        channelInfo = {
          ...channelInfo,
          rawName: res.data.name,
          name: res.data.display_name,
          id: res.data._id,
          stream: 'offline',
          logo: res.data.logo
        }

        getStreamInfo(name).then((res) => {
          let names = [...this.state.names]
          // console.log('in getStreamInfo', name, res.data.stream);
          if (res.data.stream) {
            channelInfo = {
              ...channelInfo,
              stream: res.data.stream.channel.status
            }
          }
          if (this.state.names.indexOf(name) === -1) {
            names = [name, ...this.state.names]
          }

          this.setState({
            names,
            channels: [channelInfo, ...this.state.channels],
            backupCh: [channelInfo, ...this.state.backupCh],
            init: false
          }, () => {
    				saveToStorage({
    					names: this.state.names,
    					filter: this.state.filter
    				});
          })
        })
      }
    })
  }

  initChannels() {
    this.state.names.forEach((name, i) => {
      this.updateChannel(name, i);
    });
  }

  filterChannels(str) {
    // console.log('filterChannels', str);
    this.setState({
      channels: [...this.state.backupCh],
    })

    // console.log(this.state);

    let newChannels
    if (str === 'online') {
      // console.log('in if', str);
      newChannels = this.state.backupCh.filter(ch => {
        if (!ch.message && ch.stream !== 'offline') {
          return ch
        }
        return
      })
    } else if (str === 'offline') {
      newChannels = this.state.backupCh.filter(ch => {
        if (!ch.message && ch.stream === 'offline') {
          return ch
        }
        return
      })
    } else {
      newChannels = [...this.state.backupCh]
    }
    // console.log('newChannels', newChannels);
    this.setState({
      filter: str,
      channels: newChannels
    }, () => {
      saveToStorage({
        names: this.state.names,
        filter: this.state.filter
      })
    })
  }

  changeFilter() {
    // console.log('in changeFilter', this.state.filter);
    let { filter } = this.state

    if (filter === 'all') {
      this.filterChannels('online');
    } else if (filter === 'online') {
      this.filterChannels('offline');
    } else {
      this.filterChannels('all');
    }
  }

  handleClick(name) {
    console.log('click');
    window.open(`https://www.twitch.com/${name}`)
  }

  handleDelete(name) {
    console.log('click', name);
    let newChannels = this.state.backupCh.filter(ch => {
      if (ch.rawName !== name) {
        return ch
      }
      return
    })

    let showChannels = this.state.channels.filter(ch => {
      if (ch.rawName !== name) {
        return ch
      }
      return
    })

    let newNames = this.state.names.filter(ch => {
      if (ch.toLowerCase() !== name.toLowerCase()) {
        return ch
      }
      return
    })
    this.setState({
      names: newNames,
      channels: [...showChannels],
      backupCh: [...newChannels],
    }, () => {
      saveToStorage({
        names: this.state.names,
        filter: this.state.filter
      })
    })
  }


  render() {
    let { filter, channels, init } = this.state;
    return (
      <div>
        <h1 className='title'>TwitchTV Viewer</h1>
        <Search handleSearch={this.handleSearch.bind(this)}/>
        <Filter filter={filter} changeFilter={this.changeFilter.bind(this)}/>
        <ChannelList channels={channels} filter={filter} handleDelete={this.handleDelete.bind(this)} init={init}/>
      </div>
    );
  };
};

export default App;

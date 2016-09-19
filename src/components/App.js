import React from 'react';

import ChannelList from 'ChannelList';
import Filter from 'Filter';
import Search from 'Search';

class App extends React.Component {

  handleSearch(value) {
		searchChannel(value).then(res => {
			if (res.data._total > 0 && this.state.names.indexOf(res.data.channels[0].name) === -1) {
        this.updateChannel(res.data.channels[0].name, 0)
      }
    })
  }

  render() {
    return (
      <div>
        <h1 className='title'>TwitchTV Viewer</h1>
        <h4 className='git-link'>Source code on <a href="https://github.com/jenovs/fcc-twitchtv-react" target="_blank" rel="noopener noreferrer">GitHub</a></h4>
        <Search handleSearch={this.handleSearch.bind(this)}/>
        <Filter/>
        <ChannelList/>
      </div>
    );
  };

};

export default App;

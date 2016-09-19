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
        <Search handleSearch={this.handleSearch.bind(this)}/>
        <Filter/>
        <ChannelList/>
      </div>
    );
  };

};

export default App;

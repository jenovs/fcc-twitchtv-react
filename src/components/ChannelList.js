import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import Channel from 'Channel';
import FlipMove from 'react-flip-move';
import { handleDelete } from './../actions/index'

class ChannelList extends React.Component {

  getChannelList() {
    const { filter } = this.props;
    return this.props.channels
      .filter((channel) => {
        if (filter === 'online') {
          return (channel.stream !== 'offline' && channel.stream !== undefined)
        } else if (filter === 'offline') {
          return channel.stream === 'offline'
        } else {
          return true
        }
      })
      .map((channel, i) => {
        return <Channel key={channel.id ? channel.id : i} channel={channel} />
    });
  }

  handleDelete(name) {
    this.props.handleDelete(name);
  }

  render() {
    let channelList = this.getChannelList();
    return(
      <div className='container'>
        <FlipMove enterAnimation="accordionVertical" leaveAnimation="accordionVertical">
          {this.getChannelList()}
        </FlipMove>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    channels: state.channels.channels,
    names: state.channels.names,
    filter: state.channels.filter
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ handleDelete }, dispatch)
}


export default connect(mapStateToProps, mapDispatchToProps)(ChannelList);

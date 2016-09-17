import React from 'react';
import Channel from 'Channel';
import FlipMove from 'react-flip-move';

class ChannelList extends React.Component {

  getChannelList() {
    return this.props.channels.map((channel) => {
      return <Channel key={channel.id} data={channel} handleDelete={this.handleDelete.bind(this)}/>
    });
  }

  handleDelete(name) {
    this.props.handleDelete(name);
  }

  render() {
    console.log('ChannelList props', this.props);
    let channelList = this.getChannelList();
    if (!this.props.init && this.props.channels.length === 0) {
      channelList = <div className='no-channels-div'><h2 key='0' className='info-text'>No channels to show</h2></div>
      console.log(channelList);
    }
    console.log(channelList);
    return(
      <div className='container'>
        <FlipMove enterAnimation="accordionVertical" leaveAnimation="accordionVertical">
          {channelList}
        </FlipMove>
      </div>
    )
  }
}

export default ChannelList;

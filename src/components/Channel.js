import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { getStreamInfo } from './../api/api';
import { fetchData, handleDelete } from './../actions/index'

class Channel extends React.Component {

  openChannel() {
    if (!this.props.channel.message) {
      window.open(`http://www.twitch.com/${this.props.channel.name}`)
    }
  }

  handleDelete() {
    this.props.handleDelete(this.props.channel.name)
  }

  render() {
    let { display_name, name, message, logo, stream } = this.props.channel
    let classes;
    if (message) {
      classes = 'listItem no-exist'
    } else {
      classes = 'listItem ' + ((stream === undefined || stream === 'offline') ? 'offline' : 'online')
    }
    return (
      <div className={classes} >
        <div>
          <img className='logo' src={logo} width='50px' height='50px'/>
        </div>
        <div className='text-div canClick' onClick={this.openChannel.bind(this)}>
          <p className='text chan-title'>{display_name}</p>
          <p className='text chan-status'>{message ? message : stream}</p>
        </div>

        <button className='btn-delete' onClick={this.handleDelete.bind(this)}><i className="fa fa-close"></i></button>
      </div>
    )
  }
}

function mapStateToProps(state, ownProps) {
  // console.log('ownProps', ownProps);
  return {

  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({handleDelete, fetchData}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Channel);

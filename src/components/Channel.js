import React from 'react';
import { getStreamInfo } from './../api/api';

class Channel extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      stream: this.props.data.stream,
    }
  }

  // componentDidMount() {
  //   let update = setInterval(() => {
  //     this.updateChannel();
  //   }, 60000)
  //   this.setState({
  //     update: update
  //   })
  // }

  // componentWillUnmount() {
  //   clearInterval(this.state.update);
  // }

  // updateChannel() {
  //   if (!this.props.data.message) {
  //     getStreamInfo(this.props.data.name).then((res) => {
  //       console.log(res.data);
  //       if (res.data.stream && this.state.strea === 'offline') {
  //         this.setState({
  //           stream: res.data.stream.channel.status
  //         })
  //       }
  //     }).catch(error => {
  //       console.log(error);
  //     })
  //   }
  // }

  openChannel() {
    if (!this.props.data.message) {
      window.open(`http://www.twitch.com/${this.props.data.name}`)
    }
  }

  handleDelete() {
    this.props.handleDelete(this.props.data.rawName)
  }



  render() {
    let { name, rawName, message, logo, stream } = this.props.data
    // let stream = this.state.stream
    let classes;
    if (message) {
      classes = 'listItem no-exist'
    } else {
      classes = 'listItem ' + (stream == 'offline' ? 'offline' : 'online')
    }
    return (
        <div className={classes} >
          <div className='img-div'>
            <img src={logo} width='50px' height='50px'/>
          </div>
          <div className='text-div canClick' onClick={this.openChannel.bind(this)}>
            <p className='text chan-title'>{name}</p>
            <p className='text chan-status'>{message ? message : stream}</p>
          </div>

          <button className='btn-delete' onClick={this.handleDelete.bind(this)}><i className="fa fa-close"></i></button>
        </div>
    )
  }

}

export default Channel;

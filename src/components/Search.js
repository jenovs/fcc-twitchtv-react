import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { searchNewChannel } from './../actions/index'

class Search extends React.Component {

  searchNewChannel(e) {
    e.preventDefault();
    const inputText = this.refs.input.value;
    if (inputText !== '') {
      this.refs.input.value = ''
      const parsedText = inputText.replace(/\s/g, '')
      this.props.searchNewChannel(parsedText)
    }

  }
  render() {
    console.log(this.props);
    return (
      <form className='search-form' onSubmit={this.searchNewChannel.bind(this)}>
        <input ref='input' type='text' placeholder='Input channel name'/>
        <button type='submit'>Add Channel</button>
      </form>
    )
  }
}

function mapStateToProps(state) {
  return {
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ searchNewChannel }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Search);

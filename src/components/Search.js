import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { FormGroup, FormControl, ControlLabel } from 'react-bootstrap';

import { searchNewChannel, getSuggestionsAction, clearSuggestions } from './../actions/index'

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

  getSuggestions() {
    return this.props.suggestions.map((item, i) => {
      return <option key={i} value={item} />
    })
  }

  fetchSuggestions() {
    const inputText = this.refs.input.value;
    if (inputText.length > 0) {
      const parsedText = inputText.replace(/\s/g, '');
      this.props.getSuggestionsAction(parsedText);
    } else {
      this.props.clearSuggestions();
    }
  }

  render() {
    return (
      <div>
        <datalist id='suggestions'>{this.getSuggestions()}</datalist>
        <form className='search-form' onSubmit={this.searchNewChannel.bind(this)} onChange={this.fetchSuggestions.bind(this)}>
          <input ref='input' type='search' list='suggestions' autoComplete='false' placeholder='Input channel name'/>
          <button type='submit'>Add Channel</button>
        </form>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    suggestions: state.channels.suggestions
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ searchNewChannel, getSuggestionsAction, clearSuggestions }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Search);

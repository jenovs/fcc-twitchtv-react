import React from 'react';

class Search extends React.Component {
  handleSearch(e) {
    e.preventDefault();
    const inputText = this.refs.input.value;
    if (inputText !== '') {
      this.refs.input.value = ''
      const parsedText = inputText.replace(/\s/g, '')
      this.props.handleSearch(parsedText)
    }

  }
  render() {
    return (
      <form className='search-form' onSubmit={this.handleSearch.bind(this)}>
        <input ref='input' type='text' placeholder='Input channel name'/>
        <button type='submit'>Add Channel</button>
      </form>
    )
  }
}

export default Search;

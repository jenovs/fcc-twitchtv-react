import React from 'react';

class Filter extends React.Component {

  render() {
    return (
      <div className='filter-div' onClick={this.props.changeFilter}>
        <h1>Filter: <span className='filter'>{this.props.filter}</span></h1>
      </div>
    )
  }
}

export default Filter;

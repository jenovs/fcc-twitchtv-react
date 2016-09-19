import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { setFilter } from './../actions/index'

class Filter extends React.Component {

  render() {
    return (
      <div className='filter-div' onClick={() => {this.props.setFilter(this.props.filter)}}>
        <h1>Filter: <span className='filter'>{this.props.filter}</span></h1>
      </div>
    )
  }
}

function mapStateToProps(state) {
  // console.log(state);
  return {
    filter: state.channels.filter
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({setFilter}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Filter);

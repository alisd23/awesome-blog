import React from 'react';

export default class ProductContainer extends React.Component {

  render() {
    return (
      <div id="page-loader" className="cover">
        <div className="spinner"></div>
        <h5 className="small-caps m-t-3"><strong>Simulating page load delay</strong></h5>
      </div>
    )
  }
}

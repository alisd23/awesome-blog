import React from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';

const mapDispatchToProps = { push };

@connect(null, mapDispatchToProps)
export default class HeadlineContainer extends React.Component {
  static propTypes = {
    push: React.PropTypes.func,
  }

  render() {
    const { push } = this.props;
    return (
      <section id='not-found'>
        <h1>404</h1>
      </section>
    );
  }
}

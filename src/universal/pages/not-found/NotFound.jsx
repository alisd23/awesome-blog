import React from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import navbarType from '../../components/navbar/navbarTypeHOC';
import { TRANSPARENT } from '../../components/navbar/NavbarTypes';
import CoolSVG from './CoolSVG';

const mapDispatchToProps = { push };

@navbarType(TRANSPARENT)
@connect(null, mapDispatchToProps)
export default class HeadlineContainer extends React.Component {
  static propTypes = {
    push: React.PropTypes.func,
  }

  render() {
    const { push } = this.props;
    return (
      <section id='not-found'>
        <div className='container'>
          <CoolSVG />
          <button
            className='btn btn-lg btn-white-accent'
            onClick={() => push('/')}>
            Go Home
          </button>
        </div>
      </section>
    );
  }
}

import React from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import AuthenticatedComponent from '../../higher-order-components/AuthenticatedHOC';
import { SOLID } from '../../components/navbar/NavbarTypes';
import navbarType from '../../components/navbar/navbarTypeHOC';
import SlideTabs from '../../components/slide-tabs/SlideTabs';

const tabs = [
  {
    title: 'Profile',
    path: '/account/profile',
  },
  {
    title: 'Change Password',
    path: '/account/change-password',
  },
  {
    title: 'My Blogs',
    path: '/account/my-blogs',
  }
]

const mapDispatchToProps = { push };

@AuthenticatedComponent
@navbarType(SOLID)
@withRouter
@connect(null, mapDispatchToProps)
export default class AccountContainer extends React.Component {
  state = {
    transition: null
  };

  getTabIndex(path) {
    const tab = tabs.find(t => path === t.path);
    return tabs.indexOf(tab);
  }
  componentWillReceiveProps(nextProps) {
    const currentIndex = this.getTabIndex(this.props.location.pathname);
    const nextIndex = this.getTabIndex(nextProps.location.pathname);
    if (nextIndex < currentIndex) {
      this.setState({ transition: 'page-right' });
    } else if (nextIndex > currentIndex) {
      this.setState({ transition: 'page-left' });
    }
  }

  render() {
    const { children, route, push, location } = this.props;

    return (
      <section id='account-page'>
        <div className='account-header'>
          <div className='container'>
            <h2 className='m-b-md text-xs-center'>Account</h2>
            <SlideTabs
              path={location.pathname}
              tabs={tabs}
              onChange={tab => push(tab.path)}
            />
          </div>
        </div>
        <ReactCSSTransitionGroup
          className='account-child-wrapper'
          component='div'
          transitionName={this.state.transition}
          transitionEnterTimeout={500}
          transitionLeaveTimeout={500}
        >
          <div key={location.pathname}>
            {children}
          </div>
        </ReactCSSTransitionGroup>
      </section>
    )
  }
}

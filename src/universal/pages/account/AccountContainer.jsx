import React from 'react';
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
    path: 'profile',
  },
  {
    title: 'Change Password',
    path: 'change-password',
  },
  {
    title: 'My Blogs',
    path: 'my-blogs',
  }
]

const mapDispatchToProps = { push };

@AuthenticatedComponent
@navbarType(SOLID)
@withRouter
@connect(null, mapDispatchToProps)
export default class AccountContainer extends React.Component {
  render() {
    const { children, route, push } = this.props;

    return (
      <section id='account-page'>
        <div className='account-header'>
          <div className='container'>
            <h2 className='m-b-md text-xs-center'>Account</h2>
            <SlideTabs
              path={children.props.route.path}
              tabs={tabs}
              onChange={tab => push(`/account/${tab.path}`)}
            />
          </div>
        </div>
        {children}
      </section>
    )
  }
}

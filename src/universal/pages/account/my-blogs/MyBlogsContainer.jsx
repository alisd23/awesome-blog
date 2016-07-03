import React from 'react';
import { withRouter } from 'react-router';
import AuthenticatedComponent from '../../../higher-order-components/AuthenticatedHOC';

@AuthenticatedComponent
export default class MyBlogsContainer extends React.Component {
  render() {
    return (
      <section id='my-blogs-page'>
        <h3 className='m-b-lg text-xs-center'>My Blogs</h3>
      </section>
    )
  }
}

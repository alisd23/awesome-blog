import React from 'react';
import { connect } from 'react-redux'
// import HomePageComponent from '../components/Home';
import config from '../../config';
import Helmet from 'react-helmet';

@connect(mapStateToProps)
export default class ArticleContainer extends React.Component {
  static propTypes = {
    params: React.PropTypes.object, // React router gives this to us
    article: React.PropTypes.object,
    author: React.PropTypes.object
  }

  render() {
    return (
      <div>
        <Helmet {...config.app.head}/>
        <h1>ARTICLE</h1>
      </div>
    )
  }
}

function mapStateToProps(state, ownProps) {
  const article = state.articles[ownProps.params.id]
  return {
    article,
    author: state.authors[article.author],
  }
}

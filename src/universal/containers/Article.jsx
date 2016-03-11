import React from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import { mixin } from 'core-decorators';
import { NavbarTransparent } from '../mixins/navbar';
import HeadlineArticleComponent from '../components/headline/HeadlineArticle';
import ArticleBodyComponent from '../components/article/ArticleBody';
import config from '../../config';
import { toggleArticleLike } from '../redux/ducks/articles';
import { openModal } from '../redux/ducks/global';
import Modals from '../constants/Modals';

@connect(mapStateToProps)
@mixin(NavbarTransparent)
export default class ArticleContainer extends React.Component {
  static propTypes = {
    params: React.PropTypes.object, // React router gives this to us
    article: React.PropTypes.object,
    author: React.PropTypes.object
  }

  render() {
    const { article, author, user, isLiked, dispatch } = this.props;

    return (
      <div id="article">
        <Helmet {...config.app.head}/>

        <div className="article-banner">
          <HeadlineArticleComponent author={author} article={article} />
        </div>

        <ArticleBodyComponent
          author={author}
          article={article}
          user={user}
          isLiked={isLiked}
          handleLike={user
            ? (() => dispatch(toggleArticleLike(article)))
            : (() => dispatch(openModal(Modals.LOGIN)))} />

      </div>
    )
  }
}

function mapStateToProps(state: AppState, ownProps) {
  const article = state.articles[ownProps.params.id]
  return {
    article,
    author: state.authors[article.author],
    user: state.auth.user,
    isLiked: state.auth.user &&
             article.likes.indexOf(state.auth.user.id) !== -1
  }
}

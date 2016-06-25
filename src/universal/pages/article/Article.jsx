import React from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import { mixin } from 'core-decorators';
import { NavbarTransparent } from '../../components/navbar/navbarMixins';
import HeadlineArticleComponent from '../../components/headline/HeadlineArticle';
import ArticleBodyComponent from '../../components/article/ArticleBody';
import config from '../../head.config';
import { toggleArticleLike } from '../../redux/ducks/articles';
import { openModal } from '../../redux/ducks/global';
import ModalTypes from '../../components/modals/ModalTypes';

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
        <Helmet {...config}
          title={article.title} />

        <div className="article-banner">
          <HeadlineArticleComponent author={author} article={article} />
        </div>

        <ArticleBodyComponent
          author={author}
          article={article}
          user={user}
          isLiked={isLiked}
          handleLike={user
            ? (() => dispatch(toggleArticleLike(article.id)))
            : (() => dispatch(openModal(ModalTypes.LOGIN)))} />

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
             article.meta.likes.indexOf(state.auth.user.id) !== -1
  }
}

import React from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import { mixin } from 'core-decorators';
import { TRANSPARENT } from '../../components/navbar/NavbarTypes';
import navbarType from '../../components/navbar/navbarTypeHOC';
import HeadlineArticleComponent from '../../components/headline/HeadlineArticle';
import ArticleBodyComponent from '../../components/article/ArticleBody';
import NotFound from '../not-found/NotFound';
import config from '../../head.config';
import { toggleArticleLike, hasUserLikedArticle, getSelectedArticle }
  from '../../redux/ducks/articles';
import { openModal } from '../../redux/ducks/global';
import ModalTypes from '../../components/modals/ModalTypes';

const mapStateToProps = (state, ownProps) => {
  const selectorParams = { articleId: ownProps.params.id };
  const article = getSelectedArticle(state, selectorParams);
  return {
    article,
    author: article && state.authors[article.author],
    user: state.auth.user,
    isLiked: state.auth.user && hasUserLikedArticle(state, selectorParams)
  }
};
const mapDispatchToProps = { toggleArticleLike, openModal };

@navbarType(TRANSPARENT)
@connect(mapStateToProps, mapDispatchToProps)
export default class ArticleContainer extends React.Component {
  static propTypes = {
    params: React.PropTypes.object,
    article: React.PropTypes.object,
    author: React.PropTypes.object,
    user: React.PropTypes.object,
    isLiked: React.PropTypes.bool,
    toggleArticleLike: React.PropTypes.func,
    openModal: React.PropTypes.func,
  }

  render() {
    const { article, author, user, isLiked, toggleArticleLike, openModal }
      = this.props;

    if (!article)
      return <NotFound />;
      console.log(isLiked);

    return (
      <div id='article'>
        <Helmet {...config}
          title={article.title} />

        <div className='article-banner'>
          <HeadlineArticleComponent author={author} article={article} />
        </div>

        <ArticleBodyComponent
          author={author}
          article={article}
          user={user}
          isLiked={isLiked}
          handleLike={user
            ? (() => toggleArticleLike(article.id))
            : (() => openModal(ModalTypes.LOGIN))} />

      </div>
    )
  }
}

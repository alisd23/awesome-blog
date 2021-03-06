import React from 'react';
import classnames from 'classnames';
import { throttle } from 'core-decorators';
import likeBurst from './likeBurst';

export default class LikeButtonComponent extends React.Component {
  likeAnimation = null;

  componentDidMount() {
    const { iconWrapper, icon, count } = this.refs;
    this.likeAnimation = likeBurst(iconWrapper, icon, count);
  }

  render() {
    const { article, user, isLiked } = this.props;
    return (
      <div className={classnames(
        'likes-button flex-static m-y-md',
        {
          'clickable': user,
          'active': isLiked,
          'unliked': article.meta.likes.length === 0
        }
      )}>
        <div className='count m-r-sm' ref='count'>{article.meta.likes.length || 1}</div>
        <div ref='iconWrapper'>
          <i className='material-icons md-36 icon'
            ref='icon'
            onClick={::this.onLikeClicked}>thumb_up</i>
        </div>
      </div>
    );
  }

  @throttle(100)
  onLikeClicked() {
    this.likeAnimation
      && this.props.user
      && !this.props.isLiked
      && this.likeAnimation();

    this.props.handleLike
      && this.props.handleLike();
  }
};

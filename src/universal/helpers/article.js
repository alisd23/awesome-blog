import moment from 'moment';
import vagueTime from 'vague-time';

export const getArticleImageURL = (article) =>
  article.image
    ? `/assets/images/articles/${article.image}.jpg`
    : `/assets/images/articles/placeholder.jpg`;

export const getArticleCreatedPretty = (article) =>
  moment(new Date(article.created)).format('Mo MMM YYYY - h:mma');

export const getArticleCreatedFuzzy = (article) =>
  vagueTime.get({
    from: Date.now(),
    to: new Date(article.created).getTime(),
    units: 'ms'
  });

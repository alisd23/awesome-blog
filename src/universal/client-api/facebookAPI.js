
import config from '../../server/config';
/**
 * Open the share window for a facebook share
 * @param  {article}  - Article to share
 */
export function shareArticle(article) {
  if (!FB)
    return;

  FB.ui({
    method: 'share',
    href: window.location.href,
    picture: `${window.location.href}${article.imageURL}`,
    title: article.title
  }, function(response) {
    console.log(response);
  });
}

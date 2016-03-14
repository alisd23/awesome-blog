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
    picture: `${window.location.origin}${article.imageURL}`,
    title: article.title
  });
}

export function tweetArticle(article) {
  window.open(
    `https://twitter.com/intent/tweet/` +
    `?text=${article.title} - ` +
    `&url=${window.location.href}`
  );
}

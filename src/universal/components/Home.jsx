import React from 'react';
import HeadlineContainer from '../containers/articles/Headline';

const HomeComponent = ({ headlineArticle, otherArticles }) => (

  <div id="home-page">
    {
      headlineArticle &&
        <HeadlineContainer article={headlineArticle} />
    }
    <section className="container">
      <div className="articles-grid flex flex-wrap">
        {
          otherArticles.map((article: Article) =>
            <div className="article-wrapper col-sm-12" key={article.id}>
              <div className="article">
                <div className="article-image"
                     style={{backgroundImage: `url(${article.imageURL})`}}></div>
                <h4>{article.title}</h4>
                <p>{article.content}</p>
              </div>
            </div>
          )
        }
      </div>
    </section>
  </div>

);

export default HomeComponent;

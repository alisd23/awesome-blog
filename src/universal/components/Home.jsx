import React from 'react';
import { connect } from 'react-redux'
import { routeActions } from 'react-router-redux'

export default class Home extends React.Component {
  static propTypes = {
    articles: React.PropTypes.array
  }
  static defaultProps = {
    articles: []
  }

  render() {
    return (
      <div className="container">
        <h1>Home Page</h1>
        {
          this.props.articles.map((article: Article) =>
            <div key={article.id}>
              <h4>{article.title}</h4>
              <h4>{article.content}</h4>
            </div>
          )
        }
      </div>
    )
  }
}

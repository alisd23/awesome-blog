
import Article from '../models/Article';
import Author from '../models/Author';
import seeder from './seeder';
import loremIpsum from '../../../universal/utils/loremIpsum';

export default (connection) => {
  return Article.remove({})
    .then(() => {
      return Author.find().exec();
    })
    .then((authors) => {
      const articles: Article[] = [
        {
          title: 'Amazing First Blog post',
          content: loremIpsum,
          author: authors[0]._id,
          image: ''
        },
        {
          title: 'Amazing Second Blog post',
          content: loremIpsum,
          author: authors[1]._id,
          image: ''
        }
      ];

      return seeder('Article', articles, Article);
    });
}

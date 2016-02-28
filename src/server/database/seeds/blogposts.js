
import Blogpost from '../models/Blogpost';
import Author from '../models/Author';
import seeder from './seeder';
import loremIpsum from '../../../universal/utils/loremIpsum';

export default (connection) => {
  return Blogpost.remove({})
    .then(() => {
      return Author.find().exec();
    })
    .then((authors) => {
      const blogposts: Blogpost[] = [
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

      return seeder('Blogpost', blogposts, Blogpost);
    });
}

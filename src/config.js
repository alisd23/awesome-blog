
const environment = {
  development: {
    isProduction: false
  },
  production: {
    isProduction: true
  }
}[process.env.NODE_ENV || 'development'];

export default {
  app: {
    title: 'Fruks Blog',
    description: 'Funky blog posts for students',
    head: {
      titleTemplate: 'Fruks Blog: %s',
      meta: [
        {name: 'description', content: 'Student blogs'},
        {charset: 'utf-8'},
        {property: 'og:site_name', content: 'Fruks Blog'},
        {property: 'og:title', content: 'Fruks Blog'},
        {property: 'og:description', content: 'Funky blog posts for students.'},
      ]
    }
  },
  ...environment
};


const config = process.env.CONFIG === 'server'
  ? require('./server.config')
  : require('./local.config');

//-------------------------------//
// SHOULDN'T NEED TO TOUCH THESE //
//-------------------------------//

export const fb_app_id = '1500505256932291';

export const session = {
	secret: config.secret_key,
	cookie: {
		maxAge: 60 * 60 * 24 * 1000, /* 24 hours */
		secure: process.NODE_ENV === 'production',
	},
	name: 'awesomeBlog',
	resave: true,
	saveUninitialized: false
};

export default {
	fb_app_id,
	session,
  ...config
}

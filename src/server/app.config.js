import localConfig from './local.config';

//-------------------------------//
// SHOULDN'T NEED TO TOUCH THESE //
//-------------------------------//

export const fb_app_id = '1500505256932291';

export const session = {
	secret: localConfig.app_key,
	cookie: {
		maxAge: 60 * 60 * 24 * 1000, /* 24 hours */
		secure: process.NODE_ENV === 'production',
	},
	name: 'fruksBlog',
	resave: false,
	saveUninitialized: false
};

export default {
	fb_app_id,
	session
}

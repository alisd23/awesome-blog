

//-------------------------------//
// SET THESE TO BE YOUR SETTINGS //
//-------------------------------//
export const app_key = 'Jd72nShdlKnannfJdnswzoJeDNSjkWas';
export const port = 8000;
export const fruks_web_hostname = 'http://fruks.app';

export const sql = {
	user: 'homestead',
	password: 'secret',
	host: '192.168.10.10',
	database: 'homestead',
	port: '3306'
};

//-------------------------------//
// SHOULDN'T NEED TO TOUCH THESE //
//-------------------------------//
//
export const session = {
	secret: app_key,
	cookie: {
		maxAge: 60 * 60 * 24 * 1000, /* 24 hours */
		secure: process.NODE_ENV === 'production',
	},
	name: 'fruksBlog',
	resave: false,
	saveUninitialized: false
};

export default {
	app_key,
	fruks_web_hostname,
	sql,
	session,
	port
}

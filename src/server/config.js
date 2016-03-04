import expressSession from 'express-session';
import connectMongo from 'connect-mongo';
import mongoose from 'mongoose';

export const app_key = "Jd72nShdlKnannfJdnswzoJeDNSjkWas";

export const sql = {
	user: 'homestead',
	password: 'secret',
	host: '192.168.10.10',
	database: 'homestead',
	port: '3306'
};

const MongoStore = connectMongo(expressSession);

export const session = {
	secret: app_key,
	store: new MongoStore({ mongooseConnection: mongoose.connection }),
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
	sql,
	session
}

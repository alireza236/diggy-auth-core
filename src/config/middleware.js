 import express from 'express';
 import morgan from 'morgan';
 import compression from 'compression';
 import helmet from 'helmet';
 import passport from 'passport';
 
 const isDev = process.env.NODE_ENV === 'development';
 const isProd = process.env.NODE_ENV === 'production';
 
 export default app => {
     if (isProd) {
         app.use(compression());
         app.use(helmet());
     }
     
     app.use(express.json());
 
     app.use(express.urlencoded({
         extended: true
     }));

     app.use(passport.initialize());
 
     if (isDev) {
         app.use(morgan('dev'));
     }
 };
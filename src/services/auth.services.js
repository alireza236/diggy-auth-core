 import passport from 'passport';
 import { Strategy as JWTStrategy, ExtractJwt } from 'passport-jwt';
 import LocalStrategy from 'passport-local';
 import User from '../modules/user/user.model';
 import constants from '../config/constants';
 
 
 const localStrategy = new LocalStrategy({
     usernameField: 'email',
     passwordField: 'password'
   }, 
   async (email, password, done) => {
     try {
         const user = await User.findOne({
             email
         });
         if (!user) {
             return done(null, false);
         } else if (!user.authenticateUser(password)) {
             return done(null, false);
         }
         return done(null, user);
     } catch (e) {
         return done(e, false);
     }
 });
 
 // Jwt strategy
  const jwtOpts = {
   jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme('Bearer'),
   secretOrKey: process.env.JWT_SECRET,
 };
 
 const jwtStrategy = new JWTStrategy(jwtOpts, async (payload, done) => {
   try {
     //Identify user by ID
     const user = await User.findById(payload._id);
 
     if (!user) {
       return done(null, false);
     }
     return done(null, user);
   } catch (e) {
     return done(e, false);
   }
 }); 
 
 passport.use(localStrategy);
 passport.use(jwtStrategy);
 
 export const authLocal = passport.authenticate('local', { session: false });
 export const authJwt = passport.authenticate('jwt', { session: false });
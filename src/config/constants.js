import dotenv from 'dotenv'

dotenv.config()

const devConfig = {
	MONGO_URL :process.env.DB_URL,
  JWT_SECRET:process.env.JWT_SECRET
};
const testConfig = {};
const prodConfig = {};
const defaultConfig = { PORT: process.env.PORT || 3000 };

function envConfig(env) {
       switch (env) {
          case 'development':
             return devConfig;
         case 'test':
             return testConfig;
         default:
             return prodConfig;
     }
 }
 
 //Take defaultConfig and make it a single object 
 //So, we have concatenated two objects into one 
 export default { ...defaultConfig,
     ...envConfig(process.env.NODE_ENV),
 };
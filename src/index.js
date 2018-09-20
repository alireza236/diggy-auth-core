import express from 'express'; 
import constants from './config/constants';
import middlewaresConfig from './config/middleware';

const app = express();
middlewaresConfig(app);

const port = 3000

app.get('/', (req, res) => res.send('Hello World!'))

app.listen(port, () => console.log(`Example app listening on port ${port}!`))
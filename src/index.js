import express from 'express'; 
import constants from './config/constants';
import db from './config/database';
import Status from 'http-status';
import createError from 'http-errors';
import debug from 'debug';
import http from 'http';

import middlewaresConfig from './config/middleware';

const app = express();
middlewaresConfig(app);


app.get('/', function(req, res, next) {
  res.status(Status.OK).send({
  	status:"Success",
  	name:"diggy-auth-core-api",
  	description:" ",
  	data:{
  		version:"v1.0.0",
  		Author:"Ali Reza M",
  		 repository: {
           type: "git",
            url: "git+https://github.com/alireza236/diggy-auth-core.git"
        },
  		 License:"MIT",
  		 homepage: "https://github.com/alireza236/diggy-auth-core#readme"
  	  }
  })
});


 //apiRoutes(app);
 

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(Status.NOT_FOUND));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || Status.NOT_FOUND).send({message:err.message});
});


/**
 * Get port from environment and store in Express.
 */

const port = normalizePort(constants.PORT || '3000');
app.set('port', port);

/**
 * Create HTTP server.
 */

const server = http.createServer(app);

/**
 * Listen on provided port, on all network interfaces.
 */

server.listen(port,err =>{
	if (err) {
		throw err;
	}else{
		console.log(` Server running on port: ${constants.PORT} --- Running on ${process.env.NODE_ENV} --- Service is running`);
		 const bind = typeof server.address() === 'string'
                       ? 'pipe ' + server.address()
                       : 'port ' + server.address().port;
                       debug('Listening on ' + bind);
	    }
});

server.on('error', onError);
server.on('listening', onListening);

/**
 * Normalize a port into a number, string, or false.
 */

function normalizePort(val) {
  const port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
}

/**
 * Event listener for HTTP server "error" event.
 */

function onError(error) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  const bind = typeof port === 'string'
    ? 'Pipe ' + port
    : 'Port ' + port;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use');
      process.exit(1);
      break;
    default:
      throw error;
  }
}

/**
 * Event listener for HTTP server "listening" event.
 */

function onListening() {
  const addr = server.address();
  const bind = typeof addr === 'string'
    ? 'pipe ' + addr
    : 'port ' + addr.port;
  debug('Listening on ' + bind);
}

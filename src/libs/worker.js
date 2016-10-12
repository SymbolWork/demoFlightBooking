'use strict';

const RESTIFY = require('restify');
const os =require('os');
/*
 * Set up server
 */
let server;
class createServer {
  constructor(config,routes,settings) {
    server = RESTIFY.createServer(config);
    server.use(RESTIFY.acceptParser(server.acceptable));
    server.use(RESTIFY.queryParser());
    server.use(RESTIFY.bodyParser({ mapParams: false,
      keepExtensions: false,
      uploadDir: os.tmpdir(),
      multiples: true
    }));
    server.use(RESTIFY.authorizationParser());
    server.use(RESTIFY.gzipResponse());
    RESTIFY.CORS.ALLOW_HEADERS.push('access-token');
    RESTIFY.CORS.ALLOW_HEADERS.push('uid');
    server.use(RESTIFY.CORS({'origins': ['http://localhost','http://192.168.0.106']}));
    server.get(/\/uploads\/?.*/, RESTIFY.serveStatic({
        directory: __dirname+'/../../'
    }));
    server.on('NotFound', function (req, res) {
      res.send(404, req.url + ' was not found');
    });
    // DEFINE ROUTES
    server.post('/getAuthToken',settings.get('servicefilter').getAuthToken);
    for(let route in routes.get) {
        server.get(route,settings.get('servicefilter').getAuthentication);
    }

    for(let route in routes.post) {
        server.post(route,settings.get('servicefilter').postAuthentication);
    }
    
    server.get(/\/public\/?.*/, RESTIFY.serveStatic({
         directory: __dirname+'/../..',
         default: config.defaultIndex
    }));
  }

  getServer() {
   return server;
  }
}
module.exports = createServer;

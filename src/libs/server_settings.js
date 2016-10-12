'use strict';

  const CLUSTER = require('cluster');
  let config;
  let worker;
  class ServerFactory {
     constructor (confg,workr) {
      config = confg;
      worker = workr;
     }

    registerWorker () {
      let server = worker.getServer();
      // start listening
      let port = config.port || 8000;
      server.listen(port, function () {
        console.log(port);
      });
    }

    createCluster () {   
      // Set up cluster and start servers
      if (CLUSTER.isMaster) {
        let numCpus = require('os').cpus().length;
        console.log("number of cpus ",numCpus);

        // fork workers
        for (let i = 0; i < numCpus; i++) {
          CLUSTER.fork();
        }
        CLUSTER.on('listening', function () {
        });
        // if a worker dies, respawn
        CLUSTER.on('death', function () {
          CLUSTER.fork();
        });
      } 
      // Worker processes
      else {
        this.registerWorker();
      }
    }

    start () {
      if (Boolean(config.cluster)) {
        this.createCluster();
      }
      else {
        this.registerWorker();
      }

    }
  }

module.exports = ServerFactory;
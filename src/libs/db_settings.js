'use strict';

let oConstructor = {};
let PROMISE;
let pool = {};
class DBConfig { 

	constructor(config,commonSettings) {
		oConstructor.pg = commonSettings.getPg();
		oConstructor.mysql = commonSettings.getMySql();
		oConstructor.mssql = commonSettings.getMsSql();
		oConstructor.config = config;
		PROMISE = commonSettings.getPromise();
	}

	getDBServer(dbDialactName) {
		return oConstructor.config[dbDialactName].dialact;
	}

	getDBConnection(dbDialactName) {
		let dbConfig = oConstructor.config[dbDialactName];
		let conString = '';
		if(dbConfig.dialact === 'postgres') {
			conString = 'postgres://'+dbConfig.username+':'+dbConfig.password+'@'+dbConfig.host+'/'+dbConfig.database;
			return _privateDB._getPGConnection(conString);
		} else if(dbConfig.dialact === 'mysql') {
			let connLimit = dbConfig.connectionlimit;
			if(!connLimit) {
				connLimit = 10;
			}
			if(!pool[dbDialactName]) {
				pool[dbDialactName]  = oConstructor.mysql.createPool({
				    connectionLimit: connLimit,
				    host: dbConfig.host,
				    user: dbConfig.username,
				    password: dbConfig.password,
				    database: dbConfig.database,
				    multipleStatements: true
				});
			}
			return _privateDB._getMySqlConnection(pool[dbDialactName]);
		} else if(dbConfig.dialact === 'mssql') {
			let config = {
			    user: dbConfig.username,
			    password: dbConfig.password,
			    server: dbConfig.host,
			    database: dbConfig.database
			};
			return _privateDB._getMsSqlConnection(config);
		}
	}
}

class _privateDB{

	static _getPGConnection(conString) {
		var close;
	    return oConstructor.pg.connectAsync(conString).spread(function(client, done) {
	        close = done;
	        return client.queryAsync('BEGIN').then(function () {
	            return client;
	        });
	    }).disposer(function(client, promise) {
	        if (promise.isFulfilled()) {
	            return client.queryAsync('COMMIT').then(closeClient);
	        } else {
	            return client.queryAsync('ROLLBACK').then(closeClient);
	        }
	        function closeClient() {
	            if (close) close(client);
	        }
	    });
	}

	static _getMySqlConnection(pool) {
		return pool.getConnectionAsync().disposer(function(connection) {
	        try {
	            connection.release();
	        } catch(e) {
	        	throw new Error("mysql Connection error");
	        }
	    });
	}

	static _getMsSqlConnection(config) {
		let connection;
	    return new PROMISE(function(resolve, reject) {
	        connection = new oConstructor.mssql.Connection(config, function(err) {
	            if (err) {
	                connection = null;
	                return reject(err);
	            }
                var request = new oConstructor.mssql.Request(connection);

	            resolve(request);
	        });
	    }).disposer(function() {
	      if (connection) connection.close();
	   });
	}

}
module.exports = DBConfig;
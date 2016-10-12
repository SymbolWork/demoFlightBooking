'use strict'

module.exports = {
	server: {
  		port: 80,
  		name: 'FA',
  		version: '1.0.0',
  		defaultIndex : 'index.html',
  		cluster: true
  	},
  	databaseSql: {
	  	"flight_mgmnt":{
		  host: 'localhost',
		  database: 'flight_mgmnt',
		  username: 'root',
		  password: 'root',
		  dialact: 'mysql'
		}
	},
	email: {
		user: 'prateek.sarve@gmail.com',
		pass: '*******',
		from: 'prateek.sarve@gmail.com'
	}
}

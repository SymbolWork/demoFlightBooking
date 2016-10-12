'use strict';

const SETTINGS = require('../src/libs/settings'),
	  CONFIG = require('./config'),
	  WEBSERVER = require('../src/libs/server_settings'),
	  COMMONSETTINGS = require('../src/libs/common_settings'),
	  DBSETTINGS = require('../src/libs/db_settings'),
	  MAILSETTINGS = require('../src/libs/email_settings'),
	  SERVICEFILTER = require('../src/libs/service_filter'),
	  SERVERWORKER = require('../src/libs/worker');


const ROUTES = require('./routes');

const COMMONINTERACTOR = require('../src/interactor/common_interactor'),
	  FLIGHTMODEL = require('../src/models/flight_model'),
      FLIGHTCONTROLLER = require('../src/controllers/flight_controller'),
      COMMONHELPER = require('../src/helper/common_helper');


/**
 registering configuration modules
*/
SETTINGS.register('config', [], CONFIG.server);
SETTINGS.register('settings', [], SETTINGS);
SETTINGS.register('databaseConfig', [], CONFIG.databaseSql);
SETTINGS.register('emailConfig', [], CONFIG.email);
SETTINGS.register('commonsettings', [], COMMONSETTINGS);
SETTINGS.register('commonhelper', ['commonsettings'], COMMONHELPER);
SETTINGS.register('dbsettings', ['databaseConfig','commonsettings'], DBSETTINGS);
SETTINGS.register('mailsettings', ['commonsettings','emailConfig'], MAILSETTINGS);


/**
 registering server
*/
SETTINGS.register('routes', [], ROUTES);
SETTINGS.register('serverworker', ['config','routes','settings'], SERVERWORKER);
SETTINGS.register('servicefilter', ['routes','settings','commonsettings'], SERVICEFILTER);
SETTINGS.register('web', ['config','serverworker'], WEBSERVER);

/**
registering interactors
*/
SETTINGS.register('commoninteractor', ['commonsettings','dbsettings'], COMMONINTERACTOR);

/**
 registering models
*/
SETTINGS.register('flightmodel', ['commoninteractor','commonsettings'], FLIGHTMODEL);

/**
 registering controllers
*/
SETTINGS.register('flightcontroller', ['flightmodel','mailsettings','commonsettings'], FLIGHTCONTROLLER);

//export the configured DI container
module.exports = SETTINGS;

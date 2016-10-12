'use strict';
 
 let oConstructor={};

 class CommonSettings  {
  
  constructor() {
    oConstructor.nodemailer = require("nodemailer");
    oConstructor.smtpTransport = require("nodemailer-smtp-transport");
  	oConstructor.promise = require('bluebird');
  	oConstructor.pg = oConstructor.promise.promisifyAll(require('pg'),{multiArgs: true});
    oConstructor.mysql = require('mysql');
    oConstructor.promise.promisifyAll(require("mysql/lib/Connection").prototype);
    oConstructor.promise.promisifyAll(require("mysql/lib/Pool").prototype);
    oConstructor.mssql = oConstructor.promise.promisifyAll(require("mssql"));
    /*oConstructor.redis = require('redis');
    oConstructor.promise.promisifyAll(oConstructor.redis.RedisClient.prototype);
    oConstructor.promise.promisifyAll(oConstructor.redis.Multi.prototype);*/
    oConstructor.hat = require('hat');
    oConstructor.MD5 = require('md5');
    oConstructor.cheerio = require("cheerio");
    oConstructor.fs = require("fs");
    oConstructor.crypto = require('crypto');
/*    oConstructor.redis = oConstructor.redis.createClient();
*/  }
  
  getCrypto() {
    return oConstructor.crypto;
  }

  getModule(moduleName) {
    return oConstructor[moduleName];
  }

  getFS() {
    return oConstructor.fs; 
  }
  getCheerio() {
    return oConstructor.cheerio;
  }  
  getHat() {
    return oConstructor.hat;
  }

  getPromise() {
    return oConstructor.promise;
  }

  getPg() {
   	return oConstructor.pg;
  }

  getMySql() {
    return oConstructor.mysql;
  }

  getNodeMailer() {
    return oConstructor.nodemailer;
  }

  getSmtpTransport() {
    return oConstructor.smtpTransport;
  }

  getMsSql() {
    return oConstructor.mssql;
  }

 /* getRedis() {
    return oConstructor.redis;
  }*/
  
  getMD5() {
    return oConstructor.MD5;
  }

  
 }

module.exports = CommonSettings;

'use strict';

  let routes;
  let settings;
  let commonsettings;
  let _this;
class service_filter {

  constructor(route,setting,commonsetting) {
    routes = route;
    settings = setting;    
    commonsettings = commonsetting;
    _this = this;
  }

  getAuthToken(req, res) {
     let ip = req.headers['x-forwarded-for'] || 
     req.connection.remoteAddress || 
     req.socket.remoteAddress ||
     req.connection.socket.remoteAddress;
     ip = commonsettings.getMD5()(ip);
     let clientId = commonsettings.getMD5()(req.body.clientId);
     let uID = commonsettings.getMD5()(req.body.uID);
     let resAccessToken = commonsettings.getHat()();
     let accessToken = commonsettings.getMD5()(resAccessToken);
     let createdTime = new Date();
     let valueToEncrypt = clientId.length.toString().length.toString()+clientId.length+clientId+ip.length.toString().length.toString()+ip.length+ip+createdTime.toString().length.toString().length.toString()+createdTime.toString().length+createdTime+uID.length.toString().length.toString()+uID.length+uID;
     let encryptValue = _this.encrypt(valueToEncrypt,accessToken); 
     
     if (clientId && uID) {    
      res.send({"access-token":encryptValue});
     } else {
      res.send(401, 'Unrecognized request token');
     }   
  }

  postAuthentication(req, res, next) {
    let ip = req.headers['x-forwarded-for'] || 
    req.connection.remoteAddress || 
    req.socket.remoteAddress ||
    req.connection.socket.remoteAddress;
    ip = commonsettings.getMD5()(ip);
    let accessToken = req.headers['access-token'];
    let uid = commonsettings.getMD5()(req.headers.uid);
    try{
      let decryptValue = _this.decrypt(accessToken); 
      let authComponants = _this.authenticateServices(decryptValue);
      if(authComponants && ip == authComponants.ip && uid == authComponants.uID) {
        let service = routes.post[req.url].split('.');    
        settings.get(service[0])[service[1]](req, res, next);
      } else {
        res.send(401, 'Unrecognized request token');
    }
    } catch(error) {
      console.log(error);
      res.send(401, 'Unrecognized request token');
    }
  }

  getAuthentication(req, res, next) {
    let ip = req.headers['x-forwarded-for'] || 
    req.connection.remoteAddress || 
    req.socket.remoteAddress ||
    req.connection.socket.remoteAddress;
    ip = commonsettings.getMD5()(ip);
    let accessToken = req.headers['access-token'];
    let uid = commonsettings.getMD5()(req.headers.uid);
    try{
      let decryptValue = _this.decrypt(accessToken); 
      let authComponants = _this.authenticateServices(decryptValue);
      if(authComponants && ip == authComponants.ip && uid == authComponants.uID) {
        let service = routes.get[req.url.split('?')[0]].split('.');    
          settings.get(service[0])[service[1]](req, res, next);
      } else {
        console.log("Unrecognized");
        res.send(401, 'Unrecognized request token');
      }
    } catch(error) {
      res.send(401, 'Unrecognized request token');
    }
  }

  encrypt(text,password) {
    let cipher = commonsettings.getCrypto().createCipher('aes-256-ctr',password);
    let crypted = cipher.update(text,'utf8','hex');
    crypted += cipher.final('hex');
    return password.length.toString()+password+crypted+password.length.toString().length;
  }

  decrypt(text) {
    let password = text.substring(text.substring(0,text.charAt(text.length-1)).length,parseInt(text.substring(0,text.charAt(text.length-1)))+parseInt(text.substring(0,text.charAt(text.length-1)).length));
    let encryptValue = text.substring(text.substring(0,text.charAt(text.length-1)).length+parseInt(text.substring(0,text.charAt(text.length-1))),text.length-1);
    let decipher = commonsettings.getCrypto().createDecipher('aes-256-ctr',password);
    let dec = decipher.update(encryptValue,'hex','utf8');
    dec += decipher.final('utf8');
    return dec;
  }

  authenticateServices(accessToken) {
    let sPoint = parseInt(accessToken.substring(0,1));
    let authComponant = {};
    authComponant.clientId = accessToken.substring(sPoint+1,parseInt(accessToken.substring(1,parseInt(accessToken.substring(0,1))+1))+sPoint+1);
    accessToken = accessToken.substring(parseInt(accessToken.substring(1,parseInt(accessToken.substring(0,1))+1))+sPoint+1,accessToken.length);
    sPoint = parseInt(accessToken.substring(0,1));
    authComponant.ip = accessToken.substring(sPoint+1,parseInt(accessToken.substring(1,parseInt(accessToken.substring(0,1))+1))+sPoint+1);
    accessToken = accessToken.substring(parseInt(accessToken.substring(1,parseInt(accessToken.substring(0,1))+1))+sPoint+1,accessToken.length);
    sPoint = parseInt(accessToken.substring(0,1));
    authComponant.createdTime = accessToken.substring(sPoint+1,parseInt(accessToken.substring(1,parseInt(accessToken.substring(0,1))+1))+sPoint+1);
    accessToken = accessToken.substring(parseInt(accessToken.substring(1,parseInt(accessToken.substring(0,1))+1))+sPoint+1,accessToken.length);
    sPoint = parseInt(accessToken.substring(0,1));
    authComponant.uID = accessToken.substring(sPoint+1,parseInt(accessToken.substring(1,parseInt(accessToken.substring(0,1))+1))+sPoint+1);
    accessToken = accessToken.substring(parseInt(accessToken.substring(1,parseInt(accessToken.substring(0,1))+1))+sPoint+1,accessToken.length);
    return authComponant;
  }

}
module.exports = service_filter;

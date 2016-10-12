'use strict';
/*
    Here we are configuring our SMTP Server details.
    STMP is mail server which is responsible for sending and recieving email.
*/
let smtpTransport;
let PROMISE;
let fromMail;
class mailConfig {
    constructor(commonSettings,emailConfig) {
        smtpTransport = commonSettings.getNodeMailer().createTransport(commonSettings.getSmtpTransport()({
            host : "smtp.gmail.com",
            secureConnection : false,
            port: 587,
            auth : {
                user : emailConfig.user,
                pass : emailConfig.pass
            }
        }));
        PROMISE = commonSettings.getPromise();
        fromMail = emailConfig.from;
    }

    send(to,subject,body) {
        let mailOptions = {
            from : fromMail,
            to : to,
            subject : subject,
            html : body
        };
        return new Promise(function(resolve, reject) {

            smtpTransport.sendMail(mailOptions, function(error, response){
             if(error) {
                reject(error);
              /*  if(typeof callBackFunction == "function") {
                    console.log("error in sending mail "+from)
                    callBackFunction(error, callBackData);
                }*/
             } else {
                resolve(response);
                /*if(typeof callBackFunction == "function") {
                    console.log("mail send to "+from)
                    callBackFunction("sent", callBackData);
                }*/
             }
            });
        });
    }

}

module.exports = mailConfig;
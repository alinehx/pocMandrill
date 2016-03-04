'use strict';

var mandrill = require('mandrill-api/mandrill');
var mandrill_client = new mandrill.Mandrill('MANDRILL-KEY');
var mandrillNode = require('node-mandrill')('MANDRILL-KEY');

function objectEmail(req) {
    var message = {
        "html": req.body.message,
        "text": req.body.data,
        "subject": req.body.subject,
        "from_email": req.body.fromEmail,
        "from_name": req.body.fromName,
        "to": [{
            "email": req.body.toEmail,
            "name": req.body.toName,
            "type": "to"
        }]
    };

    return message;
};

function sendMandrill(object, res) {
    console.log('entaras');
    mandrill_client.messages.send({
        "message": object,
        "async": true
    }, function(result) {
        if (result[0].status === 'rejected') {
            console.log(result[0].status);
            res.status(400);
            res.json(result[0].reject_reason);

        } else {
            res.status(200);
            res.json(result);
        }

    }, function(e) {

        res.status(500);
        console.log('A mandrill error occurred: ' + e.name + ' - ' + e.message);
        res.json(e.message);
    });
};

function email(req, res, next) {
    sendMandrill(objectEmail(req), res);
}

function nodeMandril(req, res, next) {

    
    mandrillNode('/messages/send', {
        message: {
            to: [{
                email: req.body.toEmail,
                name: req.body.toName
            }],
            from_email: req.body.fromEmail,
            subject: req.body.subject,
            text: req.body.data
        }
    }, function(error, result) {
        if (error) {
          res.status(503);
          res.json(error);
        }  else if (result[0].status === 'rejected') {
            console.log(result[0].status);
            res.status(400);
            res.json(result[0].reject_reason);

        } else {
            res.status(200);
            res.json(result);
        }

    });
};

module.exports = {
    email: email,
    emailv2: nodeMandril
};
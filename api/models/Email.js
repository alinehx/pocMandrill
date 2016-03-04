/**
 * Email.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {
  attributes: {
    message: {
      type: 'string'
    },
    data: {
      type: 'string'
    },
    subject: {
      type: 'string'
    },
    fromEmail: {
      type: 'string'
    },
    fromName: {
      type: 'string'
    },
    toEmail:{
      type: 'string'
    },
    toName: {
      type: 'string'
    }
  }
};




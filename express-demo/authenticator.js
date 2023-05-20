"use strict";

function auth(req,res, next) {
    console.log('Authenticating...');
    next();
};

module.exports = auth;
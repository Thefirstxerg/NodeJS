"use strict";

const httpStatus = require("http-status-codes");

module.exports = {
  respondNoResourceFound: (req, res) => {
    res.status(httpStatus.NOT_FOUND);
    res.render("notfound");
  },

  internalServerError: (error, req, res, next) => {
    let errorCode = httpStatus.INTERNAL_SERVER_ERROR;
    console.log(`ERROR occurred: ${error.stack}`);
    res.status(errorCode);
    res.send(`${errorCode} | Sorry, our application is experiencing a problem!`);
  }
};
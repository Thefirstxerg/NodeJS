"use strict"; //Use strict is used to enforce strict mode in JavaScript
// This helps catch common coding errors and "unsafe" actions such as defining global variables
// It can also help with performance optimizations in some JavaScript engines

const messageModule = require("./messages");
messageModule.messages.forEach(m => console.log(m));

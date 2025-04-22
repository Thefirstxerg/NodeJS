const httpStatus = require("http-status-codes");

const htmlContentType = {
    "Content-Type": "text/html"
};
const plainTextContentType = {
    "Content-Type": "text/plain"
};

const routes = {
    "GET": {
        "/info": (req, res) => {
            res.writeHead(httpStatus.OK, htmlContentType)
            res.end("<h1>Welcome to the Info Page!<h1><p>This is the info page.</p>");
        },
        "/about": (req, res) => {
            res.writeHead(httpStatus.OK, htmlContentType);
            res.end("<h1>About</h1><p>This is the about page.</p>");
        },
        "/test": (req, res) => {
            res.writeHead(httpStatus.OK, htmlContentType);
            res.end("<h1>Test</h1><p>This is the test page.</p>");
        },
        "/plaintext": (req, res) => {
            res.writeHead(httpStatus.OK, plainTextContentType);
            res.end("Testing. This is a plain text response.");
        },
    },
    'POST': {

    }
};
exports.handle = (req, res) => {
    try {
        if (routes[req.method][req.url]) {
            routes[req.method][req.url](req, res);
        } else {
            res.writeHead(httpStatus.NOT_FOUND, htmlContentType);
            res.end("<h1>No such file exists</h1>");
        }
    } catch (ex) {
        console.log("error: " + ex);
    }
};
exports.get = (url, action) => {
    routes["GET"][url] = action;
};

exports.post = (url, action) => {
    routes["POST"][url] = action;
};
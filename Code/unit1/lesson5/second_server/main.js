"use strict";

const getJSONString = obj => {
    return JSON.stringify(obj, null, 2);
};

const routeResponseMap = {
    "/test": "<h1>Test Page, Paste more test here</h1>",
    "/info": "<h1>Info Page, Paste more info here</h1>",
    "/contact": "<h1>Contact Us, or don't</h1>",
    "/about": "<h1>Learn More About Us.</h1>",
    "/hello": "<h1>Say hello by emailing us here</h1>",
    "/error": "<h1>Sorry the page you are looking for is not here.</h1>"
};

const port = 3000,
    http = require("http"),
    httpStatus = require("http-status-codes"),
    app = http.createServer((req, res) => {
        let body = [];

        req.on("data", (bodyData) => {
            body.push(bodyData);
        });

        req.on("end", () => {
            body = Buffer.concat(body).toString();
            console.log(`Request Body: ${body}`);
            
            res.writeHead(200, {
                "Content-Type": "text/html"
            });
            if (routeResponseMap[req.url]) {
                res.end(routeResponseMap[req.url]);
            } else {
                res.end("<h1>This will show on the screen</h1>");
            }
            setTimeout(() => res.end(routeResponseMap[req.url]), 2000);
        });
    });

app.listen(port);
console.log(`The server has started and is listening on port number:${port}`);

app.on("request", (req, res) => {
    console.log(`Request URL: ${req.url}`);
    console.log(`Request Method: ${req.method}`);
    console.log(`Request Headers: ${getJSONString(req.headers)}`);
    console.log(`Response Status Code: ${res.statusCode}`);
});



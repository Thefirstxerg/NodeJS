"use strict"; // Enables strict mode for better error catching and performance

// Utility function to convert objects to formatted JSON strings
const getJSONString = obj => {
    return JSON.stringify(obj, null, 2);
};

// Object mapping routes to their corresponding HTML responses
const routeResponseMap = {
    "/test": "<h1>Test Page, Paste more test here</h1>",
    "/info": "<h1>Info Page, Paste more info here</h1>",
    "/contact": "<h1>Contact Us, or don't</h1>",
    "/about": "<h1>Learn More About Us.</h1>",
    "/hello": "<h1>Say hello by emailing us here</h1>",
    "/error": "<h1>Sorry the page you are looking for is not here.</h1>"
};

// Server configuration and setup
const port = 3000,
    http = require("http"), // Import HTTP module
    httpStatus = require("http-status-codes"), // Import HTTP status codes
    // Create HTTP server
    app = http.createServer((req, res) => {
        let body = []; // Array to store incoming request data

        // Event listener for receiving data chunks
        req.on("data", (bodyData) => {
            body.push(bodyData);
        });

        // Event listener for when the request is complete
        req.on("end", () => {
            // Convert received data to string
            body = Buffer.concat(body).toString();
            console.log(`Request Body: ${body}`);
            
            // Set response headers
            res.writeHead(200, {
                "Content-Type": "text/html"
            });

            // Check if requested route exists in routeResponseMap
            if (routeResponseMap[req.url]) {
                res.end(routeResponseMap[req.url]);
            } else {
                // Default response for undefined routes
                res.end("<h1>This will show on the screen</h1>");
            }

            // NOTE: This setTimeout might cause issues as it tries to write to response
            // after it's already ended
            setTimeout(() => res.end(routeResponseMap[req.url]), 2000);
        });
    });

// Start the server
app.listen(port);
console.log(`The server has started and is listening on port number:${port}`);

// Event listener for all incoming requests
app.on("request", (req, res) => {
    // Log request details
    console.log(`Request URL: ${req.url}`);
    console.log(`Request Method: ${req.method}`);
    console.log(`Request Headers: ${getJSONString(req.headers)}`);
    console.log(`Response Status Code: ${res.statusCode}`);
});


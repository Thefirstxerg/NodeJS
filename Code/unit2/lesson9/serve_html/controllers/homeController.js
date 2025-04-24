exports.sendReqParam = (req, res) => {
    let veg = req.params.vegetable;
    res.send(`This is the page for ${veg}`);
};

exports.sendPost = (req, res) => {
    console.log(req.body);
    console.log(req.query);
    res.send("POST Successful!");
};


const path = require("path");

exports.showHome = (req, res) => {
    res.sendFile(path.join(__dirname, "../views/index.html"));
};
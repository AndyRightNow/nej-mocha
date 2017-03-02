var express = require('express');
var path = require("path");
var cors = require('cors');

var specs = require('./get-all-specs');
var config = require("./config");

var app = express();

app.use(cors());
app.use(express.static(path.resolve(__dirname, "../", "../")));
app.set('view engine', 'ejs')

app.get('/testIndex', function(req, res, next) {
    res.render(path.resolve(__dirname, "index.ejs"), {
        testFiles: specs
    });
});

app.use(function (err, req, res, next) {
  console.log("ERROR:", err);

  next();
})

app.listen(config.PORT, function () {
    console.log("Test server is running on " + config.PORT);
});

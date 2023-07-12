const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.urlencoded({extended: true}));

app.set('view engine', 'ejs');

app.use(express.static("public"));

app.listen(3000, function() {
    console.log("Listening on port 3000");
})

app.get("/", function(req, res) {
    const title = "Blog Home Page";
    res.render("index", {title: title});
})

app.get("/about", function(req, res) {
    const title = "Blog About Page";
    res.render("about", {title: title});
})

app.get("/contact", function(req, res) {
    const title = "Blog Contact Page";
    res.render("contact", {title: title});
})

app.get("/create", function(req, res) {
    const title = "Create a Blog Post";
    res.render("create", {title: title});
})
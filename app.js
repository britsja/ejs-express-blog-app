const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.urlencoded({extended: true}));

app.set('view engine', 'ejs');

app.use(express.static("public"));

app.listen(3000, function() {
    console.log("Listening on port 3000");
})

const blogPostCollection = [['Example title 1', 'Example post data 1'],['Example Blog title 2', 'Post 2 data']];

app.get("/", function(req, res) {
    const title = "Blog Home Page";
    console.log(blogPostCollection);
    res.render("index", {title: title, blogPostCollection: blogPostCollection});
    
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

app.get("/blogpost", function(req, res) {
    const title = req.query.title;
    const blogPostNumber = req.query.blogNumber;
    const blogData = blogPostCollection[blogPostNumber][1];
    res.render("blogpost", {title: title, blogData: blogData});
})

app.post("/create", function(req, res) {
    const blogPost = req.body.newPost;
    const postTitle = req.body.postTitle;
    const postData = [postTitle, blogPost];
    blogPostCollection.push(postData);  
    res.redirect("/");

})
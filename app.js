const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
require('dotenv').config({path: __dirname + '/.env'});

const app = express();

app.use(bodyParser.urlencoded({extended: true}));

app.set('view engine', 'ejs');

app.use(express.static("public"));

console.log(process.env.MONGO_URL);

app.listen(3000, function() {
    console.log("Listening on port 3000");
})

const blogPostCollection = [
    ['Lorem Ipsum Post', 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Doloremque a temporibus laboriosam, assumenda facere perferendis quos doloribus, sequi, repellat eveniet blanditiis nostrum pariatur ut ipsam nam aliquid vel modi. Optio!'],
    ['Perspiciatis', 'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?']
];

app.get("/", function(req, res) {
    const title = "Blog Home Page";    
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
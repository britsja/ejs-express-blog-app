const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
require('dotenv').config({path: __dirname + '/.env'});

const app = express();

app.use(bodyParser.urlencoded({extended: true}));

app.set('view engine', 'ejs');

app.use(express.static("public"));

const uri = process.env.MONGO_URL;

app.listen(3000, function() {
    console.log("Listening on port 3000");
})

mongoose.connect(uri);
const connection = mongoose.connection;
connection.once('open', () => {
    console.log('MongoDB database connection established successfully');
})

const blogSchema = new mongoose.Schema ({
    name: String,
    content: String,
    date: Date
});

const Blogpost = mongoose.model("Blogpost", blogSchema);

const blogPostCollection = [
    ['Lorem Ipsum Post', 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Doloremque a temporibus laboriosam, assumenda facere perferendis quos doloribus, sequi, repellat eveniet blanditiis nostrum pariatur ut ipsam nam aliquid vel modi. Optio!'],
    ['Perspiciatis', 'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?']
];

app.get("/", function(req, res) {
    const title = "Blog Home Page";
    
    Blogpost.find().then((data) => {
        const blogPostData = [];
        data.forEach(function(post) {
            blogPostData.push(post);
        })
        
        console.log(blogPostData);
        res.render("index", {title: title, blogPostCollection: blogPostData});
    })
    
    
    
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
    Blogpost.findOne({name: title}).then((data) => {
        console.log(data[0]);
        res.render("blogpost", {title: data.name, blogData: data.content});
    });     
})

app.post("/create", async function(req, res) {
    const blogPost = req.body.newPost;
    const postTitle = req.body.postTitle;
    const date = new Date().toISOString().split('T')[0]

    const blogpost = new Blogpost({
        name: postTitle,
        content: blogPost,
        date: date
    })

    await blogpost.save()
    .then(() => {
        res.redirect("/");
    })
    .catch((error) => {
        console.log(error);
    })   

})
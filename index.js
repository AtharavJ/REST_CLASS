const express = require("express");
const app = express();
const port = 8080;
const path = require("path");

app.use(express.urlencoded({ extended: true })); //express will parse data of url form

app.set("view engine", "ejs"); //template file dir
app.set("views", path.join(__dirname, "views")); //for view dir

app.use(express.static(path.join(__dirname, "public"))); //for public dir

let posts = [
    {
        id: "1a",
        username: "aapnacollege",
        content: "I love coding"
    },
    {
        id: "1b",
        username: "atharav@123",
        content: "I am coder"
    },
    {
        id: "1c",
        username: "akshay@123",
        content: "I am react developer"
    },
    {
        id: "1d",
        username: "rishi",
        content: "I am designer"
    },
];

app.get("/", (req, res) => {
    res.send("Server working Well.");
});

app.get("/posts", (req, res) => {
    // res.send("You are at Post Page.");
    res.render("index.ejs", { posts }); //render data from mentioned ejs(template file)
});

app.get("/posts/new", (req, res) => { // open new form page
    res.render("new.ejs");
});

app.post("/posts", (req, res) => {
    // console.log(req.body);
    let { username, content } = req.body; // we accessed the new added data
    posts.push({ username, content }); // pushed new data in array
    // res.send("Post Submitted Successfully!!");
    res.redirect("/posts"); // it will redirect to posts page
});
app.get("/posts/:id", (req, res) => {
    let { id } = req.params; //
    let post = posts.find((p) => id === p.id);//compared provided id with id availab in posts
    // console.log(post);
    res.render("show.ejs", { post });
    // res.send("Reques Working!");
});

app.listen(port, () => {
    console.log(`app is listenig  on port ${port}`);
});

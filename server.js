const express = require("express");
const mongoose = require("mongoose");
const passport = require("passport");
const path = require("path");
const fs = require("fs");
const keys = require("./config/keys");

const cors = require('cors');

const app = express();
// Bodyparser middleware
console.log(__dirname);
app.use(express.json());
app.use('/images', express.static(__dirname + '/uploads/images'));
// app.use(express.static(__dirname + '/uploads'));



app.use(cors());
// DB Config
const db = require("./config/keys").mongoURI;
// Connect to MongoDB
mongoose.connect(db, { useNewUrlParser: true , useUnifiedTopology: true} )
  .then(() => console.log("MongoDB successfully connected"))
  .catch(err => console.log(err));


const users = require("./routes/api/users");
const cmsfileupload =  require("./routes/api/cmsfileupload");
const testimonial = require("./routes/api/testimonial");
const landingenquiry = require("./routes/api/landingenquiry");
const leadership = require("./routes/api/leadership");
const blog = require("./routes/api/blog");
const contact = require("./routes/api/contact");
const ic = require("./routes/api/ic");
const gallery = require("./routes/api/gallery");
const profilecontactdetails = require("./routes/api/profilecontactdetails")
app.use('/api/profilecontactdetails', profilecontactdetails);
app.use('/api/gallery', gallery);
app.use('/api/leadership', leadership);
app.use('/api/landingenquiry', landingenquiry);
app.use('/api/blog', blog);
app.use('/api/contact', contact);
app.use('/api/testimonial', testimonial);
app.use("/api/cmsfileupload", cmsfileupload);
app.use("/api/ic",ic);



// Passport middleware
app.use(passport.initialize());
// Passport config
require("./config/passport")(passport);
// Routes
app.use("/api/users", users);
// app.use("/api/cmsfileupload", cmsfileupload);





app.use('/static', express.static('./client/build/static'));

// app.get('*', (req,res) => {
//   res.sendFile(path.resolve(__dirname,'../public','index.html'));
// })


const PUBLIC_PATH = path.resolve(__dirname, "./client/public");
const PUBLIC_URL = keys.serverURL;


const indexHtml = path.join(PUBLIC_PATH, "index.html");
const indexHtmlContent = fs
.readFileSync(indexHtml, "utf-8")
.replace(/%PUBLIC_URL%/g, PUBLIC_URL);

app.get("*", (req, res) => {
res.send(indexHtmlContent);
});

app.use(express.static(path.join(PUBLIC_PATH)));


const port = process.env.PORT || 5000; // process.env.port is Heroku's port if you choose to deploy the app there
app.listen(port, () => console.log(`Server up and Running on port ${port} !`));
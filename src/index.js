const express = require("express");
const morgan = require("morgan");
const multer = require("multer");
const { v4 } = require("uuid");
const path = require("path");

const connectDatabase = require("./database");

const indexRoutes = require("./routes/index.routes");

//Initizalitions
const app = express();

//Settings
app.set("port", process.env.PORT || 3000);
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

//Middlewares
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const storage = multer.diskStorage({
    destination: path.join(__dirname, "public/uploads"),
    filename: (req, file, cb) => {
        cb(false, v4() + path.extname(file.originalname));
    }
})

app.use(multer({ storage }).single("image"));

//Routes
app.use(indexRoutes);

//Static files
app.use(express.static(path.join(__dirname, "public")));

//Start
const start = async () => {
    try {
        await app.listen(app.get("port"));
        await connectDatabase();

        console.log("Server on port", app.get("port"));
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
}

start();
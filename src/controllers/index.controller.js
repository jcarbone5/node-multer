const imageModel = require("../models/images.model");

const fs = require("fs-extra");
const path = require("path");

const indexController = {};

indexController.renderIndex = async (req, res) => {
    const Images = await imageModel.find({});

    res.render("index", { Images });
}

indexController.renderAdd = (req, res) => {
    res.render("add");
}

indexController.renderView = async (req, res) => {
    const { id } = req.params;

    const image = await imageModel.findById(id);
    
    res.render("view", { image });
}

indexController.add = async (req, res) => {
    const { name, description } = req.body;

    if(name === '' || description === '' || !req.file) {
        res.redirect("/add");
    }

    const { mimetype, size, filename } = req.file;

    let path = filename;

    const image = new imageModel({ 
        name, 
        description, 
        mimetype, 
        size, 
        path 
    });

    await image.save();

    res.redirect("/");
}

indexController.remove = async (req, res) => {
    const { id } = req.params;

    const image = await imageModel.findByIdAndRemove(id);

    await fs.unlink(path.resolve("src/public/uploads/" + image.path));

    res.redirect("/");
}

module.exports = indexController;
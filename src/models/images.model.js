const { Schema, model } = require("mongoose");

const imageSchema = new Schema({
    name: { type: String },
    description: { type: String },
    mimetype: { type: String },
    size: { type: Number },
    path: { type: String }
}, {
    timestamps: true
});

module.exports = model("image", imageSchema);
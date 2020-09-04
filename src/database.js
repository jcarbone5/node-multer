const { connect } = require("mongoose");

const connectDatabase = async () => {
    try {
        await connect("mongodb://localhost/node-multer", {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });

        console.log("DB is conected");
    } catch (error) {
        console.log(error);
    }
}

module.exports = connectDatabase;
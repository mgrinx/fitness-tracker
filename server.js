const express = require("express");
const exphbs = require("express-handlebars");
const mongoose = require("mongoose");

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

require("./routes/apiRoutes")(app);
require("./routes/htmlRoutes")(app);

// Connect to the Mongo DB
mongoose.connect(process.env.MONGODB_URI ||
    "mongodb://localhost/fitnesstracker", {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

// Start the API server
app.listen(PORT, () => {
    console.log(`Now listening on port: ${PORT}`);
});
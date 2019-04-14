require('dotenv').config();
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3001;

//Need to define middleware 
app.use(express.urlencoded({ extended: true}));
app.use(express.json());

if (process.env.NODE_ENV === "production") {
    app.use(express.static("client/build"));
}

const mongoose = require('mongoose');
const monogoURL = process.env.PROD_MONGODB || "enter connection here"
mongoose.connection(monogoURL, {useNewUrlParser: true})
.then(() => {
    console.log("🗄 ==> Successfully connected to mongoDB.");
  })
  .catch((err) => {
    console.log(`Error connecting to mongoDB: ${err}`);
  });

require("./routes/api-routes")(app);

app.listen(PORT, () => {
  console.log(`🌎 ==> API server now on port ${PORT}!`);
});
const dotenv = require('dotenv');
const express = require('express');
var cors = require('cors');
const app = express();
const path = require('path');
const mongoose = require('mongoose');
const port = process.env.PORT || 3000;

const result = dotenv.config()
 
if (result.error) {
  throw result.error
}

// console.log(result.parsed)


app.use(cors());
app.use(express.json());

//usuarios
const usuariosRoutes = require("./routes/users-routes");
app.use("/users", usuariosRoutes);


mongoose.connect(process.env.DB_CONNECTION, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false
});

app.listen(port, () => {
  console.log(`Server running on ${port}`)
});
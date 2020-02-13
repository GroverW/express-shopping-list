const express = require('express');
const itemRoutes = require("./itemRoutes")


const app = express();

app.use(express.json());
app.use("/items", itemRoutes);

// app.listen(3000, () => {
//   console.log('App is listening on port 3000');
// })

module.exports = app
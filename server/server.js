const express = require('express')
const app = express()
const port= 8888;
const path = require('path');

app.use('/', express.static(path.join(__dirname, "./../public")))

app.get('/', (req, res) => {
  return
})

app.listen(port, () => {
  console.log(__dirname);
  console.log(`Listening to port ${port}!`)
})
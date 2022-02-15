// require modules
const express = require('express');
const userHandlers = require('./user-handlers');

// create instance of express
const app = express();

// middleware
app.use(express.json());

// users endpoint
app
  .get('/users', (req, res) => {
    userHandlers.getReq(req, res);
  })
  .post('/users', (req, res) => {
    userHandlers.postReq(req, res);
  })
  .put('/users', (req, res) => {
    userHandlers.putReq(req, res);
  })
  .patch('/users', (req, res) => {
    userHandlers.patchReq(req, res);
  })
  .delete('/users', (req, res) => {
    userHandlers.deleteReq(req, res);
  });

// listen for server connections
const port = 8080;

app.listen(port, () => {
  console.log(`listening for connections on http://localhost:${port}`);
});

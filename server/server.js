const http = require('http');
const express = require('express');
const bodyParser = require('body-parser');
const TaskRoutes = require('./routes/Task');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

// Create the express application
const app = express();
const server = http.createServer(app);

/* { useNewUrlParser: true } To prevent MongoDb DepreciationWarning */
mongoose.connect(process.env.MONGO_DB_URI, { useNewUrlParser: true });

/* To prevent MongoDb DepreciationWarning */
mongoose.set('useFindAndModify', false);

// Parses the body of a request into Json making it accessible in req.body
app.use(bodyParser.json());
app.use(cors());

app.use('/api/tasks', TaskRoutes);

// Defines the port to be used by the server
const port = process.env.PORT || 3001;
const ip = process.env.IP || '0.0.0.0';

// Start the server
setImmediate(() => {
  server.listen(port, ip, function() {
    console.log('Server listening on ip ' + ip + ' on port ' + port);
  });
});

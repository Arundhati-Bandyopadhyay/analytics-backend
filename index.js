const express = require('express');
const csvParser = require('csv-parser');
const cors = require('cors');
const fs = require('fs');

// const serverless = require("serverless-http");
// const router = express.Router();

const app = express();
// const port = 3000; // You can change the port as needed
const port = process.env.PORT || 4000;
const corsOptions = {
    origin: '*', // Allow requests from this origin
    methods: 'GET, POST, PUT, DELETE', // Allow these HTTP methods
    allowedHeaders: ['Content-Type', 'Authorization'], // Allow these headers
};
// Use the cors middleware
app.use(cors(corsOptions));

app.get('/api/csv', (req, res) => {
    const data = [];
    fs.createReadStream('car_sales.csv')
        .pipe(csvParser())
        .on('data', (row) => {
            data.push(row);
          })
          .on('end', () => {
            res.json(data);
          });
});

app.get("/", (req, res) => {
  res.send("App is running..");
});

// app.use("/.netlify/functions/app", router);
// app.use("/.netlify/functions/api/csv", router);
// module.exports.handler = serverless(app);

// app.listen(port, () => {
//   console.log(`Server listening on port ${port}`);
// });

const server = app.listen(port, () => console.log(`Example app listening on port ${port}!`));
server.keepAliveTimeout = 120 * 1000;
server.headersTimeout = 120 * 1000;

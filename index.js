const express = require('express');
const csvParser = require('csv-parser');
const cors = require('cors');
const fs = require('fs');

const app = express();
const port = 3000; // You can change the port as needed
const corsOptions = {
    origin: '*', // Allow requests from this origin
    methods: 'GET, POST, PUT, DELETE', // Allow these HTTP methods
    allowedHeaders: ['Content-Type', 'Authorization'], // Allow these headers
};
// Use the cors middleware
app.use(cors(corsOptions));
// fs.createReadStream('car_sales.csv')
//     .pipe(csvParser())
//     .on('data', (data) => {
//       // Process the CSV data here, e.g., store it in an array
//       console.log(data);
//     })


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

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
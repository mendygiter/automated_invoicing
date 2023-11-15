const express = require('express');
const app = express();
const port = 3000;

app.use(express.json())
app.use(express.static("public"))
require("dotenv").config()


// Define your API routes here
app.get('/api', (req, res) => {
    res.send('Hello World!');
});

// Start the server
app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
});

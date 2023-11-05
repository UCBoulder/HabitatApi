const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.json());

const itemRoutes = require('./routes/Routes');
app.use('/', itemRoutes); // Use '/items' as the base path

app.listen(PORT, () => console.log('Server is running on http://localhost:3000'));

const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.json());

const itemRoutes = require('./routes/routes');
app.use('/', itemRoutes); // Use '/items' as the base path

app.listen(PORT, () => console.log('Server is running on http://localhost:3000'));

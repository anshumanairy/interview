const express = require('express');
const dotenv = require('dotenv');
const fs = require('fs');
const path = require('path');

const errorHandler = require('./middleware/errorHandler');

dotenv.config();
const app = express();
app.use(express.json());

const routesPath = path.join(__dirname, 'routes');

fs.readdirSync(routesPath).forEach((folder) => {
  const routePath = path.join(routesPath, folder, 'index.js');
  if (fs.existsSync(routePath)) {
    const route = require(routePath);
    app.use(`/${folder}`, route);
  }
});

app.use(errorHandler);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

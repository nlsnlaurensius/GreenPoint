const express = require('express');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use('/api/users', require('./src/routes/users.route'));
app.use('/api/waste_deposit', require('./src/routes/waste_deposit.route'));

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});


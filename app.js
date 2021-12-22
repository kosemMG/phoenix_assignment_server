const express = require('express');
const filesRouter = require('./routes/files');

const app = express();

app.use('/files', filesRouter);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}...`));

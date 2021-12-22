const express = require('express');
const cors = require('cors');
const fileUpload = require('express-fileupload');

const filesRouter = require('./routes/files');

const app = express();

app.use(cors());

app.use(fileUpload({}));

app.use('/api/files', filesRouter);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}...`));

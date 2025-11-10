const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config({ path: './config.env' });
const db = process.env.DATABASE.replace('<db_password>', process.env.DATABASE_PASSWORD);
console.log(db);

mongoose.connect(db).then(() => console.log('Connected to the db'));

const app = require('./app');
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));

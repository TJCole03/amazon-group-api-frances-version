require('dotenv').config();
const mongoose = require('mongoose');
const PORT = process.env.PORT || 3000;
const app = require('./app')



mongoose.connect(process.env.MONGO_URI);
mongoose.connection.once('open', () => console.log('Mongo is ALIVE'));


app.listen(PORT, () => {
  console.log(`Ready to go ${PORT}`);
});

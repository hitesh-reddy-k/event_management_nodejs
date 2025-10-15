const express = require('express');
const app = express();
const dotenv = require('dotenv');
const path = require('path');
const sequelize = require('./Database/Connectdb');
const eventRouter = require('./Router/eventRouter');
const userRouter = require('./Router/userRouter');

dotenv.config({ path: path.join(__dirname, 'config', '.env') });

app.use(express.json());       
app.use(express.urlencoded({ extended: true }));

console.log( process.env.PORT);

const port = process.env.PORT || 4000;



app.get('/', (req, res) => {
  res.send('Hello World!');
});
app.use("/api/events", eventRouter);
app.use("/api/users", userRouter);


sequelize.authenticate()
  .then(() => {
    console.log('has been connected');
    })
    
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

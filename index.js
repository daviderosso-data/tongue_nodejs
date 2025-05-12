//SpMugQFKhuL2IvZg

const sanitize = require('express-mongo-sanitize');

const express = require('express')
const app = express()

const coursePost = require('./routes/postRoutes')
const courseUser = require('./routes/userRoutes')
const courseInteraction = require('./routes/interactionRoutes')
const mongoose = require('mongoose');

require('dotenv').config();

const MONGO_KEY = process.env.MONGO_KEY;
const MONGO_USERNAME = process.env.MONGO_USERNAME;
const port = process.env.PORT || 3000;




app.get('/', (req, res) => {res.send('Hello World!')})

app.use(express.json());

app.use((req, res, next) => {
    sanitize.sanitize(req.body);
    sanitize.sanitize(req.query);
    sanitize.sanitize(req.params);
    next();
});



app.use('/api/posts', coursePost)
app.use('/api/users', courseUser)
app.use('/api/interactions', courseInteraction)



mongoose.connect(`mongodb+srv://${MONGO_USERNAME}:${MONGO_KEY}@tongue.xuhnj3i.mongodb.net/?retryWrites=true&w=majority&appName=TONGUE`)
.then(()=>{
  console.log('Connected to database.');
    app.listen(port, () => {
      console.log(`Listening on port ${port}`);
  });
})
.catch((error)=>{
  console.log('Connection failed:', error);
})




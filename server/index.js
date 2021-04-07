const express = require('express')
const mongoose = require('mongoose')

require('dotenv').config();

const app = express()

const PORT = process.env.PORT || 8000;

mongoose
    .connect(process.env.MONGODB_URI,
        {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true
        })
    .catch(error => console.log(error));

mongoose.connection.on('error', err => {
    console.log('Error connecting MongoDB',err);
});

app.use(express.json({extended: true}))
app.use("/api/auth", require('./Routes/auth.routes'))
app.use("/api/posts", require('./Routes/post.routes'))

app.listen(PORT, () => {
    console.log(`Server have been started on port ${PORT}`)
})



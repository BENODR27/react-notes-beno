const express = require('express');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 8082;

app.use(express.json());



// const exercisesRouter = require('./routes/exercises');
// const usersRouter = require('./routes/users');

// app.use('/exercises', exercisesRouter);
// app.use('/users', usersRouter);

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});

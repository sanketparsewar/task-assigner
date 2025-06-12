const express = require('express');
const app = express();
require('dotenv').config()
const { databaseConnection } = require('./src/database/connectDb');
const taskRouter = require('./src/routes/task.routes')
const customerRouter = require('./src/routes/customer.routes')
const dashboardRouter = require('./src/routes/dashboard.routes')
const userRouter = require('./src/routes/user.routes')
const cors = require('cors')

databaseConnection()

app.use(express.json());
app.use(cors())
app.use('/task', taskRouter)
app.use('/customer', customerRouter)
app.use('/dashboard', dashboardRouter)
app.use('/user', userRouter)


app.listen(process.env.PORT, () => {
    console.log(`Server connected on port ${process.env.PORT}`);
});
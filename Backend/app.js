const express = require('express');
const route = require('./routes/route');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const os = require('os');
const app = express();

mongoose.connect('mongodb://localhost:27017/project');
mongoose.connection.on('connected', ()=> {
    console.log('Database is connected now')
})
console.log(os.platform())

const port = 3000;

app.set('port',port);
app.use(bodyParser.json());
app.use((req, res, next) => {
    console.log('First middleware');
    next();
})

app.use('/api', route);


// app.use((req,res)=> {
//     res.send('Hii node ... its my first middleware');
// })

// app.get('/users', ((req, res) => {
//     res.send({
//         status: '200',
//         message: 'Users fetched successfully',
//         users: users
//     })
// }))



module.exports = app;
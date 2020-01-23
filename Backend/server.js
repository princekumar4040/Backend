const http = require('http');
const app = require("./app")


// const server = http.createServer((req, res)=> {
//     console.log('its my first node project')
//     res.end('hello world')
// })

const server = http.createServer(app);

server.listen(3000);
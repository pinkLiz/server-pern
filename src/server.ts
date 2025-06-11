import express from "express";

import router from "./router.js"

const server = express();

server.use('/', router);

// server.get('/',(req, res)=>{
//     res.send("Hola, ya casi pasas el parcial")
// })

// server.post('/',(req, res)=>{
//     res.send("Hola desde post")
// })



export default server
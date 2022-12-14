import mongoose from "mongoose"
import http, { IncomingMessage, ServerResponse } from "http"
import { loginUser, registerUser } from "./controllers/userAuth"
import { addComment, addData, getAllData, getClientData } from "./controllers/dataController"

mongoose.connect('mongodb://localhost:27017/client-management-system')

const server = http.createServer((req:IncomingMessage,res:ServerResponse)=>{
    if(req.url === '/register' && req.method === 'POST'){
        registerUser(req,res)
    }else if(req.url === '/login' && req.method === 'POST'){
        loginUser(req,res)
    }else if(req.url === '/addData' && req.method === 'POST'){
        addData(req,res)
    }else if(req.url === '/addComment' && req.method === 'POST'){
        addComment(req,res)
    }else if(req.url?.slice(0,14) === '/getClientData' && req.method === 'GET' ){
        getClientData(req,res)
    }else if(req.url === '/getAllClientData' && req.method === 'GET'){
        getAllData(req,res)
    }else if(req.url === '/hello' && req.method === 'GET'){
        return res.end(JSON.stringify({status:'ok',message:'hey'}))
    }else{
        res.writeHead(404, { 'Content-Type': 'application/json' });
        res.end(
          JSON.stringify({
            message: 'Route Not Found',
          })
        );
    }
})


server.listen(5000,()=>{
    console.log('server started at port 5000')
})
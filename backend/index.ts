import mongoose from "mongoose"
import http, { IncomingMessage, ServerResponse } from "http"
import { loginUser, registerUser } from "./controllers/userAuth"
import { addData, getAllData, getClientData } from "./controllers/dataController"

mongoose.connect('mongodb://localhost:27017/client-management-system')

const server = http.createServer((req:IncomingMessage,res:ServerResponse)=>{
    if(req.url === '/api/register' && req.method === 'POST'){
        registerUser(req,res)
    }else if(req.url === '/api/login' && req.method === 'POST'){
        loginUser(req,res)
    }else if(req.url === '/api/addData' && req.method === 'POST'){
        addData(req,res)
    }else if(req.url?.slice(0,18) === '/api/getClientData' && req.method === 'GET' ){
        getClientData(req,res)
    }else if(req.url === '/api/getAllClientData' && req.method === 'GET'){
        getAllData(req,res)
    }else if(req.url === '/api/hello' && req.method === 'GET'){
        return res.end(JSON.stringify({status:'ok',message:'hey'}))
    }
})


server.listen(5000,()=>{
    console.log('server started at port 5000')
})
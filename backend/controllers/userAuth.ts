import { IncomingMessage, ServerResponse } from "http"
import User from "../models/userModel"
import { getPostData, headers } from "../utls"

export const registerUser = async(req:IncomingMessage,res:ServerResponse)=>{
    try{
        const body = await getPostData(req)
        const {username, role, password} = JSON.parse(body);
        await User.create({
            username: username,
            role:role,
            password: password
        })
        res.writeHead(200, headers);
        return res.end(JSON.stringify({status:'ok'}))
    }catch(err){
        res.writeHead(400, headers);
        return res.end(JSON.stringify({status:'Bad_Request'}))
    }
}


export const loginUser = async(req:IncomingMessage,res:ServerResponse)=>{
    try{
        const body = await getPostData(req)
        const {username, password} = JSON.parse(body);

        const user = await User.findOne({
            username:username,
            password:password
        })
        if(user){
            res.writeHead(200, headers);
            return res.end(JSON.stringify({status:'ok',username:user.username,role:user.role}))
        }else{
            res.writeHead(200, headers);
            return res.end(JSON.stringify({status:"invalid user"}))
        }
        
    }catch(err){
        res.writeHead(401, headers);
        return res.end(JSON.stringify({status:'Bad_Request'}))
    }
}

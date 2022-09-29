import { IncomingMessage, ServerResponse } from "http";
import Data from "../models/dataModel"
import { getPostData, headers } from "../utls";

export const addData = async(req:IncomingMessage,res:ServerResponse)=>{
    try{
        const body = await getPostData(req)
        const {username, articleId, articleUrl,status,comments} = JSON.parse(body);
        const user = await Data.findOne({username:username})
        try{
            // console.log(user)
            if(user){
                await Data.updateOne(
                    {username:username},
                    {$push:{data: {
                            articleId:articleId,
                            articleUrl:articleUrl,
                            status:status,
                            comments:comments
                    }}}
                    ) 
             }else{
                 await Data.create({
                     username:username,
                     data:[{
                         articleId:articleId,
                         articleUrl:articleUrl,
                         status:status,
                         comments:comments
                     }]
                 })
             }
            res.writeHead(200, headers);
            return res.end(JSON.stringify({status:'ok'}))
        }catch(err){
            console.log(err)
            res.writeHead(400, headers);
            return res.end(JSON.stringify({status:'Bad_Request'}))
        }
    }catch(err){
        console.log(err)
        res.writeHead(400, headers);
        return res.end(JSON.stringify({status:'Bad_Request'}))
    }
}
export const addComment = async(req:IncomingMessage,res:ServerResponse)=>{
    try{
        const body = await getPostData(req)
        const {username,status,comments, id} = JSON.parse(body);
        await Data.updateOne(
            {username:username,"data._id":id},
            {$set:{
                "data.$.status":status,
                "data.$.comments":comments,
        }}
        )
        res.writeHead(200, headers);
        return res.end(JSON.stringify({status:'ok'}))
    }catch(err){
        console.log(err)
        res.writeHead(400, headers);
        return res.end(JSON.stringify({status:'Bad_Request'}))
    }
}  
export const getClientData = async(req:IncomingMessage,res:ServerResponse)=>{
    const username = req.url?.split('=')[1];
    try{
        const clientData = await Data.find({username:username})
        res.writeHead(200, headers);
        return res.end(JSON.stringify({data:clientData}))
    }catch(err){
        res.writeHead(400, headers);
        return res.end(JSON.stringify({status:'Bad_Request'}))
    }
}



export const getAllData = async(req:IncomingMessage,res:ServerResponse)=>{
    try{
        const allClientData = await Data.find()
        res.writeHead(200, headers);
        return res.end(JSON.stringify({data:allClientData}))
    }catch(err){
        res.writeHead(400, headers);
        return res.end(JSON.stringify({status:'Bad_Request'}))
    }
}
import { IncomingMessage } from "http"

export const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'POST, GET, OPTIONS, DELETE, PUT',
    // "Access-Control-Max-Age": 2592000,
    "Access-Control-Allow-Headers":"append,delete,entries,foreach,get,has,keys,set,values,Authorization",
    'Content-Type': 'application/json',
  };
export const getPostData = (req:IncomingMessage): Promise<any>=> {
    return new Promise((resolve, reject) => {
        try {
            let body = ''

            req.on('data', (chunk) => {
                body += chunk.toString()
            })

            req.on('end', () => {
                resolve(body)
            })
        } catch (error) {
            reject(error)
        }
    })
}
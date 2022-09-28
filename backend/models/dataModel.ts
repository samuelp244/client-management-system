import mongoose from 'mongoose';

const Data = new mongoose.Schema(
    {
        username:{type: String, required: true},
        data:[{
            articleId:{type:String},
            articleUrl:{type:String},
            status:{type:String},
            comments:{type:String}
        }]
    },
    {collection:'Data'}
)
const model = mongoose.model('Data',Data);

export default model
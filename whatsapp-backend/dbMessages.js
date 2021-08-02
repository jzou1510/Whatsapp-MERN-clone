import mongoose from 'mongoose';

//Will be defining data schema here

const whatsappSchema=mongoose.Schema({
    message: String,
    name: String,
    timestamp: String,
    received: Boolean
});

//collection
export default mongoose.model('messagecontent', whatsappSchema);
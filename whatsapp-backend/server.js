//importing
import express from 'express';
import mongoose from 'mongoose';
import Messages from './dbMessages.js';
// const Pusher = require("pusher");
import Pusher from 'pusher';

//app config
const app = express(); //creates the application instance and allows us to write api routes
const port =  process.env.PORT || 9000;

const pusher = new Pusher({
    appId: "1243717",
    key: "b4e76d9da3808453475b",
    secret: "c5b0d2adaaf6e101d33e",
    cluster: "us2",
    useTLS: true
  });

//middleware
app.use(express.json());

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', "*"); //allows request to come from any endpoint
    res.setHeader('Access-Control-Allow-Headers', '*');
    next();
});

//DB config
const connection_url = 'mongodb+srv://admin:QfwIkDFusKeacmaK@cluster0.u0maz.mongodb.net/whatsappdb?retryWrites=true&w=majority'
mongoose.connect(connection_url, {
    useCreateIndex: true,   //set to true to make Mongoose's default index build use createIndex() 
                            //instead of ensureIndex() to avoid deprecation warnings from the MongoDB driver
    useNewUrlParser: true,  
    useUnifiedTopology: true    //set to true to opt into using new connection management engine
});

//
const db = mongoose.connection;

db.once('open', ()=> {
    console.log("DB connected");

    const msgCollection = db.collection("messagecontents");
    const changeStream = msgCollection.watch();

    changeStream.on('change', (change) => {
        console.log('A change occured', change);
    
        if (change.operationType === 'insert') {
            const messageDetails = change.fullDocument;
            pusher.trigger('messages', 'inserted',
                {
                    name: messageDetails.name,
                    message: messageDetails.message
                }
            );
        } else {
            console.log('Error triggering Pusher');
        }
    });
});



//api routes
app.get('/', (req,res)=>res.status(200).send('hello world'));

app.get('/messages/sync', (req, res) => {
    Messages.find((err, data) => {
        if (err) {
            res.status(500).send(err)
        } else {
            res.status(200).send(data) //Okay
        }
    });
});

app.post('/messages/new', (req, res) => {
    const dbMessage = req.body

    Messages.create(dbMessage, (err, data) => {
        if (err) {
            res.status(500).send(err) //internal server error
        } else {
            res.status(201).send(data) //Created
        }
    });
});

//listener
app.listen(port,()=>console.log(`Listening on localhost:${port}`));
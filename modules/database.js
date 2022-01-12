var mongoose = require('mongoose');
const { MongoClient } = require('mongodb');
const ObjectId = require('mongodb').ObjectId;
// read .env file
require('dotenv').config();



const DATABASE_URL = "mongodb+srv://admin:Asd.456@cluster0.nstck.mongodb.net/test?authSource=admin&replicaSet=atlas-7obiau-shard-0&readPreference=primary&appname=MongoDB%20Compass&ssl=true"
const DATABASE_NAME = 'mongodb-limalimon';

class DataBase {
    constructor() {
        mongoose.connect(`${DATABASE_URL}/${DATABASE_NAME}`)
            .then(() => {
                console.log(`Se conecto a la base de datos ${DATABASE_NAME}`);
            }).catch(error => {
                console.log(error);
                console.log('error al conectarse a la base de datos');
            });
    }
}

const connect = async(url) => {

    // check params
    if (!url) throw Error('connect::missing required params');

    return MongoClient.connect(url, { useUnifiedTopology: true });
};

const connectToDatabase = async() => {
    try {
        if (!DATABASE_URL || !DATABASE_NAME) {
            console.log('DB required params are missing');
            console.log(`DB required params DATABASE_URL = ${DATABASE_URL}`);
            console.log(`DB required params DATABASE_NAME = ${DATABASE_NAME}`);
        }

        mongoConnection = await connect(DATABASE_URL);
        db = mongoConnection.db(DATABASE_NAME);

        console.log(`DB connected = ${!!db}`);

        return db;

    } catch (err) {
        console.log('DB not connected - err');
        console.log(err);
    }
}


module.exports = {
    connectToDatabase,
    DataBase
}
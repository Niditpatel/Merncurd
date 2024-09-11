const express = require('express');
const { default: mongoose } = require('mongoose');

const cors = require('cors');
const bodyParser = require('body-parser');

require('dotenv').config({path:'backend/config.env'})

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(express.json());

// auth apis
app.use('/',require('./Route/auth.route'));
// other apis
app.use('/user',require('./Route/user.route'));
app.use('/blog',require('./Route/blog.route'));

// connect databse
const ConnectDatabse = async()=>{
    try{
        await mongoose.connect(process.env.DB_URI);
        console.log("Mongo Db connected");
    }catch(e){
        console.log(e);
        process.exit(1);
    }
}
ConnectDatabse();


app.listen(4040,()=> console.log('server is connected.'))


app.get('/',(req,res)=>{
    res.send("welcome to the XYZ Website");
})



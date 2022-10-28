const express = require('express');
const app = express();
app.use(express.static('App'));
const bodyParser = require('body-parser');
const cors = require('cors');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());
let projectData = {};
let ClientData={Date:'5/4/2021', Temperature: 8, Feelings: 'Happy'};
const port= 8080;
app.listen(port,function(){
    console.log(`Connected to Port: ${port} `);
});
app.get('/AppData', function(req,res){
    res.send(ClientData);
    //console.log( ClientData);
})
app.post('/ClientData',function(req,res){
    ClientData = {
        Date:req.body.Date,
        Temperature:req.body.Temperature,
        Feelings: req.body.Feelings
    }
    //Collecting All Values in projectData
    projectData = Object.assign(projectData, ClientData);
    //console.log( projectData);
})


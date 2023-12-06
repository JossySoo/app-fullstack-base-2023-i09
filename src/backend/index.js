//=======[ Settings, Imports & Data ]==========================================

var PORT    = 3000;

var express = require('express');
var cors = require("cors");
var corsOptions = {origin:"*",optionSucessStatus:200};


var app     = express();
app.use(cors(corsOptions));

var utils   = require('./mysql-connector');

// to parse application/json
app.use(express.json()); 
// to serve static files
app.use(express.static('/home/node/app/static/'));

//=======[ Main module code ]==================================================
app.get("/oneDevice/:id",(req,res,next)=>{
    console.log("id",req.params.id)
    utils.query("select * from Devices where id="+req.params.id,(err,rsp,fields)=>{
        if(err==null){
            console.log("rsp",rsp);
            res.status(200).send(JSON.stringify(rsp));
        }else{
            console.log("err",err);
            res.status(409).send(err);
        }
        
        //console.log(fields);
    });
    
});
app.post("/device_state",(req,res,next)=>{
    utils.query("UPDATE Devices SET state="+req.body.state+" WHERE id = "+req.body.id,(err,rsp,fields)=>{
        if(err==null){
            console.log("rsp",rsp);
            res.status(200).send(JSON.stringify(rsp));
        }else{
            console.log("err",err);
            res.status(409).send(err);
        }
    });
});

app.post("/device",(req,res,next)=>{
    utils.query("UPDATE Devices SET name='"+req.body.name+"', description='"+req.body.description+"', type="+req.body.type+" WHERE id = "+req.body.id,(err,rsp,fields)=>{
        if(err==null){
            console.log("rsp",rsp);
            res.status(200).send(JSON.stringify(rsp));
        }else{
            console.log("err",err);
            res.status(409).send(err) ;
        }
    });
});

app.post("/device_new",(req,res,next)=>{
    let new_id;
    utils.query("SELECT MAX(ID) FROM Devices",(err,rsp,fields)=>{
        if(err==null){
            new_id=rsp[0]["MAX(ID)"]+1;
            utils.query(`INSERT INTO Devices (id, name, description,state,type) VALUES (${new_id}, '${req.body.name}', '${req.body.description}',${req.body.state},${req.body.type})`,
            (err,rsp,fields)=>{
                if(err==null){
                    console.log("rsp",rsp);
                    res.status(200).send(JSON.stringify(rsp));
                }else{
                    console.log("err",err);
                    res.status(409).send(err);
                }
            });
        }else{
            console.log("err",err);
            res.status(409).send(err);
        }
    });
});

app.post("/delete_device",(req,res,next)=>{
    utils.query("DELETE FROM Devices WHERE ID="+req.body.id,(err,rsp,fields)=>{
        if(err==null){
            console.log("rsp",rsp);
            res.status(200).send(JSON.stringify(rsp));
        }else{
            console.log("err",err);
            res.status(409).send(err) ;
        }
    });
});

app.get('/devices/', function(req, res, next) {

    utils.query("select * from Devices",(err,rsp,fields)=>{
        if(err==null){
            console.log("rsp",rsp);
            res.status(200).send(JSON.stringify(rsp));
        }else{
            console.log("err",err);
            res.status(409).send(err);
        }
    });
    
});

app.listen(PORT, function(req, res) {
    console.log("NodeJS API running correctly");
});

//=======[ End of file ]=======================================================

const express= require('express');
const bodyParser=require('body-parser')
const app=express();
app.use(bodyParser.urlencoded({extended: true}));
app.get('/',function(req,res){
  res.sendFile(__dirname + '/index.html');
});
app.post('/',function(req,res){
  var h= parseFloat(req.body.h);
  var w= parseFloat(req.body.w);
  var result=w/(h*h);

  res.send('Addition:'+result);
});
app.listen(3000,function(){
  console.log('server is listening...');
});

var connection = require('../config/dbconnection');
var express = require('express');
var router = express.Router();

module.exports = {
  signUp: signUp,
  login: login
}

function signUp(req , res, next) {
    var input = JSON.parse(JSON.stringify(req.body));
      var data ={
              username : input.username,
              email    : input.email,
              password : input.password,

      };
      console.log(req.body.email);  
      var qury = "SELECT username, email From user Where ?";
      var one = 1;
      var userMsg;
      var emailMsg;
      connection.query(qury,one,function(err,rows){
          if(err){
            res.send({'resp':'Database error occuredhh'});
            console.log("inserterrr");
            console.log("%s",err);
          }
          else{
            for(var i=0;i<rows.length;i++){
              if(data.username == rows[i].username){
                userMsg = 'username already exits';
                break;
              }
              else if(data.email == rows[i].email){
                userMsg ='email already exits';
                break;
              }
            }
            if(i < rows.length){
              res.send({"username":userMsg});
              console.log("urlerrr");
            }
            else{
                  var insertQury ="INSERT INTO user(username,email,password) VALUES ?";
                  console.log("username %s", input.username);
                  var values=[
                             [data.username , data.email , data.password]
                  ];
                  connection.query(insertQury,[values],function(err,result){
                    if(err) {
                      res.send({ "resp" : "database error"});
                      console.log("inserterrr");
                      console.log("%s",err);
                    }
                    else{
                      res.send({"status":1});//database save

                    }
                  });
            }
          }
      });

  }
  function login(req , res, next){
    var input = JSON.parse(JSON.stringify(req.body));
      var qry = "SELECT * FROM user WHERE email=?";
      console.log(input.email);
      connection.query(qry,[input.email],function(err,rows){
        if(err){
          res.send({'error':'AN error occured'});
          console.log(err);
        }
        else{
          if(rows.length==0){
            res.send({"error":"email does not exit"});
            console.log("errorhas email");
          }
          else if (input.password ==rows[0].password) {
            res.send({"id":rows[0].id , "email":rows[0].email,"username":rows[0].username,"password":rows[0].password});

          }
          else{
            res.send({"error":"password is wrong"});
            console.log("errorhas password");
          }
        }
      });

  }

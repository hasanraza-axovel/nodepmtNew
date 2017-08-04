var connection = require('../config/dbconnection');
var express = require('express');
var router = express.Router();

module.exports = {
  createProj: createProj,
  getProj: getProj
}

function createProj(req, res) {
    var input = JSON.parse(JSON.stringify(req.body));
      var data = {
        projName: input.projName,
        user_id:  input.id
      };
      console.log(data);
      var qry="INSERT INTO userproj(projName, user_id) VALUES ? ";
      var values=[[data.projName, data.user_id]];
      connection.query(qry, [values], function(err, result){
        if(err){
          res.send({"resp":"database error"});
        }
        else{
          res.send({"resp":"data saved into database"})
        }
      });

  }

  
  function getProj(req,res){
    var id = parseInt(req.params.id);

      var qry = "SELECT * FROM userproj where user_id=?";
      connection.query(qry,id,function(err,result){
        if(err){
          res.send({"resp":"database error"});
        }
        else{
          res.send(result);
        }
      });

  }

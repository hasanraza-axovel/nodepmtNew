var connection = require('../config/dbconnection');
var express = require('express');
var router = express.Router();

module.exports ={
  createProjLabel: createProjLabel,
  getProjLabel: getProjLabel
}

function createProjLabel(req, res) {
  var input = JSON.parse(JSON.stringify(req.body));
    var data = {
      labelName: input.labelName,
      proj_id:  input.projid,
    };
    // console.log(data);
    // res.send({"resp":"curret"});
    var qry="INSERT INTO projlabel(labelName, proj_id) VALUES ? ";
    var values=[[data.labelName, data.proj_id]];
    connection.query(qry, [values], function(err, result){
      if(err){
        res.send({"resp":"database error"});
      }
      else{
        res.send({"resp":"data saved into database"})
      }
    });

}
function getProjLabel(req,res){
  var id= req.params.id;

  console.log(id+'hh');
  console.log(typeof(id));

    var qry = "SELECT * FROM projlabel where proj_id=?";
    connection.query(qry,id,function(err,result){
      if(err){
        res.send({"resp":"database error"});
      }
      else{
        res.send(result);
      }
    });

}

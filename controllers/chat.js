var connection = require('../config/dbconnection');
var express = require('express');
var router = express.Router();

module.exports = {
  saveChat: saveChat,
  getChat: getChat
}

function saveChat(req, res) {
  var input = JSON.parse(JSON.stringify(req.body));
    var data = {
      message: input.message,
      user_id:  input.user_id,
      sentOn: input.sentOn,
      username: input.username
    };
    console.log(data);
    // res.send({"resp":"curret"});
    var qry="INSERT INTO groupChat(message, user_id, sentOn, username) VALUES ? ";
    var values=[[data.message, data.user_id, data.sentOn, data.username]];
    connection.query(qry, [values], function(err, result){
      if(err){
        res.send({"resp":"database error"});
      }
      else{
        res.send({"resp":"data saved into database"})
      }
    });
}

function getChat(req, res) {
  var qry = "SELECT * FROM groupChat WHERE ?";
  var one = 1;
  connection.query(qry, one, function(err, result) {
    if(err) {
      res.send({"resp": "database error"});
    }
    else {
      res.send(result);
    }
  });

}

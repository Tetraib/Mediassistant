// Copyright 2013 Thibaut CONSTANT
// This file is part of MEDIASSISTANT.
// 
//     Mediassistant is free software: you can redistribute it and/or modify
//     it under the terms of the GNU General Public License as published by
//     the Free Software Foundation, either version 3 of the License, or
//     (at your option) any later version.
// 
//     Mediassistant is distributed in the hope that it will be useful,
//     but WITHOUT ANY WARRANTY; without even the implied warranty of
//     MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
//     GNU General Public License for more details.
// 
//     You should have received a copy of the GNU General Public License
//     along with Mediassistant.  If not, see <http://www.gnu.org/licenses/>.
// 
"use strict";
var express = require("express"),
    app = express(),
    server = require('http').createServer(app);
app.configure(function() {
    app.use(express.static(__dirname + '/public'));
});
server.listen(process.env.PORT, process.env.IP);

//start moongoose
var mongoose = require('mongoose');
//connect to import mongo database
mongoose.connect("mongodb://test:test@dharma.mongohq.com:10028/app16615432");
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'mongodb connection error:'));
db.once('open', function callback() {
    console.log("mongodb connected to : " + "mongodb://dharma.mongohq.com:10028/app16615432");
    //Mongoose schema
    var patientSchema = mongoose.Schema({
        dob: String,
        fname: String,
        lname: String,
        sex: Number,
        address: String,
        address2: String,
        zip: Number,
        city: String,
        phone: String
    });
    // Mongoose model
    var patientModel = mongoose.model('patient', patientSchema);
    // DB queries and result
    app.get('/search', function(req, res) {
//respond to a queri : /search?qdob=<dob>
        var varQdob = req.query.qdob;
        
// find the patients matching dob
        patientModel.find({
            dob: varQdob
        }, function(err, schrpatient) {
            if (err) console.log("dob query error");
//addresult to object result for mustache templating
            var varResult = {
                result: schrpatient
            };
            //send result as json
            res.json(varResult);
            

        });
    });
});
// routeur
app.get('/', function(req, res) {
    res.redirect("../search.html");
});



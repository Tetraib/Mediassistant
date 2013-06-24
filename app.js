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
//----------START SERVER---------
var express = require("express"),
    app = express(),
    server = require('http').createServer(app),
    io = require('socket.io').listen(server);
app.configure(function() {
    app.use(express.static(__dirname + '/public'));
});
server.listen(process.env.PORT, process.env.IP);
//
//----------ROUTEUR----------
app.get('/', function(req, res) {
    res.sendfile(__dirname + '/index.html');
});
app.get('/patient', function(req, res) {
    res.sendfile(__dirname + "/public/patient.html");
});
app.get('/searchlist', function(req, res) {
    res.sendfile(__dirname + "/public/searchlist.html");
});
app.get('/advsearch', function(req, res) {
    res.sendfile(__dirname + "/public/advsearch.html");
});
//
//----------SOCKET.IO----------
//Connection check
io.sockets.on('connection', function(socket) {
    socket.emit('connected');
});
//----------DATABASE----------
//Fake db
var patient = {
    "name":"Thibaut",
    "lastname":"CONSTANT",
    "dob":"1986/04/07",
    "sexe":"2",
    "address":{
        "zip":"59000",
        "city":"LILLE",
        "address":"1 BIS RUE DE VALMY"        
    },
    "contact":{
        "phone":"0601145595",
        "mail":"thibaut.constant@isisphinx.com"
    }
};

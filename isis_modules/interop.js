var express = require("express"),
    app = express(),
    server = require('http').createServer(app);
app.configure(function() {
    //important pour le req.body
    app.use(express.bodyParser());
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
    //
    //response to mirth
    app.post('/interop', function(req, res) {
// render the req json
        console.log(req.body);
        //send OK to mirth
        res.send(200);
    });
});

var express = require('express')
var cmd = require('node-cmd');
var app = express()

// respond with "hello world" when a GET request is made to the homepage
app.get('/', function (req, res) {
    
    res.send('hello world')
})
app.get('/api/upload', function(req, res){
    var filename = req.body.time.toString() + ".mp4"
    
    cmd.run('python cnn.py ' + filename);
})

app.listen(3000)
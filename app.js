var express = require('express');
var path = require('path');
var logger = require('morgan');
var bodyParser = require('body-parser');
var cors = require('express-cors');
var fs = require('fs');
var compression = require('compression');
var helmet = require('helmet');
var formidable = require('formidable');
var multer = require('multer');
var cmd = require('node-cmd');

var app = express();
app.use(compression());
app.use(helmet());
app.use(logger({
  format: ':remote-addr :method :url' ,
  stream: fs.createWriteStream('app.log', {'flags': 'w'})
}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(__dirname + '/build'))

const storage = multer.diskStorage({
  destination: './build/videos/',
  filename: (req, file, cb) => {
    cb(null, req.body.time.toString() + '.mp4');
  }
})

const upload = multer({storage: storage});

app.post('/api/upload', upload.single('file'), (req, res, next) => {
  var filename = req.body.time.toString() + ".mp4"  
  cmd.run('python cnn.py ' + filename);
})

app.get('/api/getFiles', (req, res) => {
  fs.readdir('./build/videos', async (err, files) => {
    if (err) {
      res.send(err);
    }
    let r = [];
    files.forEach(file => {
      console.log(file);
      let ar = file.split('.');
      let resJson = JSON.parse(fs.readFileSync('./build/videos/' + ar[0] + '.json'));
      console.log(resJson);
      if (ar[1] === 'mp4') r = r.concat([{name: ar[0], scenes: resJson.scenes}]);
    })
    res.send({data: r});
  })
})

app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;

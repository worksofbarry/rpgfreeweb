
const RPG = require('./rpg/RPG');

const bodyParser = require('body-parser');
const express = require('express');
const formidable = require('formidable');
const fs = require('fs');
const app = express();
const port = 9123;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/', express.static('public'));

app.post('/convert', function(req, res) {
  var lines = req.body.lines;
  var indent = req.body.indent;
 
  lines.push('', '');
 
  var conv = new RPG(lines, Number(indent));
  conv.parse();

  res.send({lines, messages: conv.messages});
});

app.post('/fileupload', function(req, res) {
  console.log('2222'); 
    if (req.url == '/fileupload') {
      var form = new formidable.IncomingForm();
      form.parse(req, function (err, fields, files) {
        var oldpath = files.filetoupload.path;
        var newpath = 'C:/Users/krishna/Documents/a/' + files.filetoupload.name;
        fs.rename(oldpath, newpath, function (err) {
          if (err) throw err;
          var contents = fs.readFileSync(newpath, 'utf8');
          console.log('contents : ' + contents);
          //res.write('File uploaded and moved!');
          res.end();
        });
   });
    } else {

         }
  });
  

app.listen(port, () => console.log(`rpgfreeweb listening on port ${port}!`))

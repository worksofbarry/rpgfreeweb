
const RPG = require('./rpg/RPG');

const bodyParser = require('body-parser');
const formidable = require('formidable');
const readline = require('readline');
const express = require('express');
const fs = require('fs');
const app = express();
const port = 9123;

app.use(bodyParser.json({limit: '10mb', extended: true}));
app.use(bodyParser.urlencoded({limit: '10mb', extended: true }));

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
  if (req.url == '/fileupload') {
    var form = new formidable.IncomingForm();
      form.parse(req, function (err, fields, files) {
        var oldpath = files.filetoupload.path;
        // Use your system's path 
        var newpath = 'C:/Users/User-name/Documents/tmpRPG/' + files.filetoupload.name;
        var newLine = []; 
        fs.rename(oldpath, newpath, function (err) {
          if (err) throw err;
          const readInterface = readline.createInterface({
            input: fs.createReadStream(newpath),
            console: false
          });  
           
          readInterface.on('line', function(line) {
            newLine.push( line ) ; 
          });
          
          // on file close 
          readInterface.on('close', (line) => {
            var conv = new RPG(newLine, Number('2'));
            conv.parse();
              
            fs.unlink(newpath, (err) => {
              if (err) throw err;
              var file = fs.createWriteStream(newpath);
              file.on('error', function(err) { Console.log(err) });
              conv.lines.forEach(value => file.write(`${value}\r\n`));
              file.end();
              file.on('close', function() {
                res.download(newpath); 
              });
            });
          });

        });
      });
  } 
});
  
app.listen(port, () => console.log(`rpgfreeweb listening on port ${port}!`))

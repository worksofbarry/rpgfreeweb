
const RPG = require('./rpg/RPG');

const bodyParser = require('body-parser');
const formidable = require('formidable');
const readline = require('readline');
const express = require('express');
const fs = require('fs');
const app = express();
const port = 9123;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/', express.static('public'));

app.post('/convert', function(req, res) {
  var lines = req.body.lines;
  var indent = req.body.indent;
 // console.log(' lines in  :'  + lines ); 
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
        var newLine = ' ' ; 
        fs.rename(oldpath, newpath, function (err) {
          if (err) throw err;
            const readInterface = readline.createInterface({
              input: fs.createReadStream(newpath),
             // output: process.stdout,
              console: false
            });  
           
            let i = 0 ;  
            readInterface.on('line', function(line) {
            //console.log('line  '+ i++ + ' :' + line);
            newLine = newLine + line + ' ,' ; 
            //console.log(' new line  '+ newLine);
         
             });

            // end
            readInterface.on('close', function(line) {
              var conv = new RPG(newLine, Number('2'));
              conv.parse();
              let c = JSON.stringify(conv.lines); 
              console.log(' something: ' + c);
            }); 
                      
          res.end();
        });
   });
    } else {

         }
  });
  

app.listen(port, () => console.log(`rpgfreeweb listening on port ${port}!`))

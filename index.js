
const RPG = require('./rpg/RPG');

const bodyParser = require('body-parser');
const express = require('express')
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

app.listen(port, () => console.log(`rpgfreeweb listening on port ${port}!`))

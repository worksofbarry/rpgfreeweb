
function convertCode() {
  var input = document.getElementById('input');
  var userDefinedTab = document.getElementById('userDefinedTab');
  var output = document.getElementById('output');
  var messages = document.getElementById('messages');
  var inputstring = JSON.stringify(input);
  console.log('input '+ input.value);
  
  var lines = input.value.split('\n');
  var indent = userDefinedTab.value;
  //var lines = $('#input').val().split('\n');
  var linesstring = JSON.stringify(lines);
  console.log('lines '+ linesstring);
  
  var xhr = new XMLHttpRequest();
  xhr.open("POST", "/convert", true);
  xhr.setRequestHeader("Content-Type", "application/json");
  xhr.send(JSON.stringify({lines,indent}));
  xhr.onload = function () {
      var data = JSON.parse(this.responseText);
      output.value = data.lines.join('\n');

      var messageHTML = "";
      if (data.messages.length > 0) {
        for (var message of data.messages) {
          messageHTML += "<tr><td>" + message.line + "</td><td>" + message.text + "</td></tr>";
        }

        messages.innerHTML = messageHTML;
      }
  }

  //$('#myTextarea').val('');
}
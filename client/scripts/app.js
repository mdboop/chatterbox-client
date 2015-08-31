// YOUR CODE HERE:
var escaper = function(rawMessage){
  var escapes = {
    '&':'&amp;',
    '<':'&lt;',
    '>':'&gt;',
    '\'':'&#x27;',
    '"':'&quot;',
    '/':'&#x2F;'
  }
  var newMessage = ''
  if (rawMessage === null){
    return '';
  }
  for (var i = 0; i < rawMessage.length; i++){
    if(/[&<>"\\\/']/.test(rawMessage[i])) {
      newMessage += escapes[rawMessage[i]];
    } else {
      newMessage += rawMessage[i];
    }
  }

  return newMessage;
};


var fetch = function(callback) {

  $.ajax({
    // This is the url you should use to communicate with the parse API server.
    url: 'https://api.parse.com/1/classes/chatterbox',
    type: 'GET',
    // data: JSON,
    contentType: 'application/json',
    success: function (data) {
      callback(data);
    },
    error: function (data) {
      // See: https://developer.mozilla.org/en-US/docs/Web/API/console.error
      console.error('chatterbox: Failed to send message');
    }
  });

};

var displayMessages = function(data) {

  var $chat = $('#chats');
  var message;
  var cleanedName;
  var cleanedMessage;
  for(var i = 0; i < data.results.length; i++) {
    cleanedName = escaper(data.results[i].username);
    cleanedMessage = escaper(data.results[i].text);
    $message = '<div>' + i + ' - ' + cleanedName + ': ' + cleanedMessage + '</div>'
    $chat.append($message);
    // $message = $('div');
    // cleanedName = escaper(data.results[i].username);
    // cleanedMessage = escaper(data.results[i].text);
    // $message.text(cleanedName + ': ' + cleanedMessage);
    // $chat.append($message);
  }

};
// createdAt: "2015-08-31T22:41:38.512Z"
// objectId: "oBOg8Gi0LT"
// roomname: "4chan"
// text: "</div><script>while(true){console.log("you got hacked")}<!--"
// updatedAt: "2015-08-31T22:41:38.512Z"
// username: "dd"
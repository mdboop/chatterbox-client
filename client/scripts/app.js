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
  for (var i = 0; i < rawMessage.length; i++){
    if(/[&<>"\\\/']/.test(rawMessage[i])) {
      newMessage += escapes[rawMessage[i]];
    } else {
      newMessage += rawMessage[i];
    }
  }

  return newMessage;
};


var serverData = $.ajax({
  // This is the url you should use to communicate with the parse API server.
  url: 'https://api.parse.com/1/classes/chatterbox',
  type: 'GET',
  data: JSON,
  contentType: 'application/json',
  success: function (data) {
    console.log('chatterbox: Message sent');
  },
  error: function (data) {
    // See: https://developer.mozilla.org/en-US/docs/Web/API/console.error
    console.error('chatterbox: Failed to send message');
  }
});

var messages = serverData.responseJSON.results;

var $chat = $('#chats');

for(var i = 0; i < messages.length; i++) {
  var $message = $('div');
  var cleanedName = escaper(messages[i].username);
  var cleanedMessage = escaper(messages[i].text);
  $message.text(cleanedName + ': ' + cleanedMessage);
}



createdAt: "2015-08-31T22:41:38.512Z"
objectId: "oBOg8Gi0LT"
roomname: "4chan"
text: "</div><script>while(true){console.log("you got hacked")}<!--"
updatedAt: "2015-08-31T22:41:38.512Z"
username: "dd"
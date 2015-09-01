// YOUR CODE HERE:
var app = {
  server: 'https://api.parse.com/1/classes/chatterbox',
  refreshInterval: 3000,
  username: window.location.search.split('=')[1]
};
/***********************
 INITIALIZING FUNCTIONS
************************/
app.init = function(){
  app.fetch(displayMessages);

  setInterval(function() {
    app.fetch(displayMessages);
  },app.refreshInterval);
};

/***********************
 SEND MESSAGES
************************/

app.send = function(message){

};

/***********************
 FETCHING
************************/

app.fetch = function(callback) {

  $.ajax({
    // This is the url you should use to communicate with the parse API server.
    url: app.server,
    type: 'GET',
    data: JSON,
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
/***********************
 CHAT ROOM BEHAVIOR
************************/
app.clearMessages = function(){
  $('#chats').empty();
};



app.addMessage = function(message){
  var cleanUserName = escaper(message.username);
  var cleanText = escaper(message.text);
  var $message = $('<div class="message"></div>');
  var $username = $('<div class="username">' + cleanUserName + '</div>');
  var $text = $('<div class="text">' + cleanText + '</div>');
  $message.append($username);
  $message.append($text);
  $('#chats').append($message);
}

var displayMessages = function(data) {

  $('#chats > div').remove();
  var $chat = $('#chats');
  var message;
  var cleanedName;
  var cleanedMessage;
  for(var i = 0; i < data.results.length; i++) {
    cleanedName = escaper(data.results[i].username);
    cleanedMessage = escaper(data.results[i].text);
    $message = '<div>' + i + ' - ' + cleanedName + ': ' + cleanedMessage + '</div>'
    $chat.append($message);
  }

};

/***************
 SECURITY
****************/

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
  if (rawMessage === null || rawMessage === undefined){
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

/***************
 MAKE IT SO!
****************/
app.init();


// YOUR CODE HERE:
var app = {
  server: 'https://api.parse.com/1/classes/chatterbox',
  refreshInterval: 3000,
  username: window.location.search.split('=')[1],
  currentRoom: 'lobby',
  rooms: {},
  friends: {}
};
/***********************
 INITIALIZING FUNCTIONS
************************/
app.init = function(){
  app.update();
  setInterval(function() {
    app.update();
  },app.refreshInterval);
};

/***********************
 SEND MESSAGES
************************/

app.send = function(message){
  $.ajax({
    // This is the url you should use to communicate with the parse API server.
    url: app.server,
    type: 'POST',
    data: JSON.stringify(message),
    contentType: 'application/json',
    success: function (data) {
      console.log('chatterbox: Message sent');
    },
    error: function (data) {
      // See: https://developer.mozilla.org/en-US/docs/Web/API/console.error
      console.error('chatterbox: Failed to send message');
    }
  });
};

app.sendButtonHandler = function(){
  var textbox = $('.chatDraft');
  var text = textbox.val();
  var message = {
    username: app.username,
    text: text,
    roomname: app.currentRoom
  };
  textbox.val('');
  app.send(message);
  app.update();

}

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
app.update = function(){
  app.fetch(displayMessages);
  app.fetch(app.getRooms);
  app.displayRooms();
}

app.clearMessages = function(){
  $('#chats').empty();
};

app.addMessage = function(message){
  var cleanUserName = escaper(message.username);
  var cleanText = escaper(message.text);
  var $message = $('<div class="message"></div>');
  var $username = $('<span class="username">' + cleanUserName+ '</span>');
  var $text = $('<span class="text">' + cleanText + '</span>');
  $message.append($username);
  $message.append($text);
  if(app.friends[message.username]) {
    $text.addClass('friend');
  }
  $('#chats').append($message);
};

var displayMessages = function(data) {
  $('#chats > div').remove();
  var $chat = $('#chats');
  for(var i = 0; i < data.results.length; i++) {
    if(data.results[i].roomname === app.currentRoom) {
      app.addMessage(data.results[i]);
    }
  }
};

app.addRoom = function(roomName) {
  $('#roomSelector').append($('<option value="' + roomName + '"">' + roomName +'</option>'));
};

app.getRooms = function(data) {
  var chatData = data.results;
  app.rooms = {};
  for(var i = 0; i < chatData.length; i++) {
    app.rooms[escaper(chatData[i].roomname)] = true;
  }
};

app.changeRooms = function() {
  var room = $('#roomSelector').val();
  // untoggle currentRoom -> make unselected
  if(room === 'New room...'){
    app.currentRoom = prompt("Enter a room name:") || app.currentRoom;
    app.addRoom(app.currentRoom);
  } else {
  app.currentRoom = room;
  // toggle on new current room
  }
  app.fetch(displayMessages);
};

app.displayRooms = function(){
  $(document).ready(function(){
    $('#roomSelector').empty();
    for(var room in app.rooms){
      app.addRoom(room);
    }
    app.addRoom('New room...')
  });
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
  };
  var newMessage = '';
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
$(document).ready(function(){
  app.init();
});

$(document).ready(function() {
  $body = $('body');
  $('.chatSend').on('click', app.sendButtonHandler);
  $('.chatDraft').on('keyup', function( event ){
    if (event.which === 13){
      app.sendButtonHandler();
    }
  });


  $('body').on('click', '.message', function() {
    var friend = $(this).find('.username').text();
    if(friend in app.friends) {
      delete app.friends[friend];
    } else {
      app.friends[friend] = true;
    }
    app.update();
  });
});
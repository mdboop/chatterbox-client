//////////////////////////////////
// Backbone Refactor
//////////////////////////////////

var Message = Backbone.Model.extend({
  url: 'https://api.parse.com/1/classes/chatterbox',
  defaults: {
    username: '',
    text: ''
  },
});

var Messages = Backbone.Collection.extend({
  
  model: Message,
  url: 'https://api.parse.com/1/classes/chatterbox',


  loadMessages: function() {
    this.fetch({data: { order: '-createdAt'}});
  },
  parse: function(response, options) {
    return response.results;
  }
});

var MessageView = Backbone.View.extend({
  initialize: function() {
    this.model.on('change', this.render, this);
  },
  template: _.template('<div class=message id="<%- objectId %>" \
                        <div class="username"><%- username %></div> \
                        <div class="text"><%- text %></div> \
                        </div>'),
  render: function() {
    this.$el.html(this.template(this.model.attributes));
    return this.$el;
  }
});

var MessagesView = Backbone.View.extend({
  initialize: function() {
    this.collection.on('sync', this.render, this);
    this.messagesDisplayed = {};
  },
  render: function() {
    this.collection.forEach(this.renderMessage, this);
  },
  renderMessage: function(message) {
    if(!this.messagesDisplayed[message.get('objectId')]) {
      var messageView = new MessageView({model: message});
      this.$el.prepend(messageView.render());
      this.messagesDisplayed[message.get('objectId')] = true;
    }
  }
});

var FormView = Backbone.View.extend({
  initialize: function() {

  },
  events: {
    'submit #send' : 'handleSubmit'
  },
  handleSubmit: function(e) {
    console.log('hello');
    e.preventDefault();
    var $submission = this.$('.chatDraft');
    this.collection.create({
      username: window.location.search.substr(10),
      text: $submission.val()
    });
    $submission.val('');
  }
});


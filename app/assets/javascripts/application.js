//= require jquery
//= require jquery_ujs
//= require backbone

var $ = window.$;
var _ = window._;
var Backbone = window.Backbone;

$(function () {
  _.templateSettings = {
    interpolate: /\{\{\=(.+?)\}\}/g,
    evaluate: /\{\{(.+?)\}\}/g,
  };

  var UserModel = Backbone.Model.extend({});

  var UserCollection = Backbone.Collection.extend({
    url: '/api/users',
    model: UserModel,
  });

  var UserView = Backbone.View.extend({
    events: {
      'submit': 'updateUser',
    },

    template: _.template($('#user-template').html()),
    render: function () {
      this.$el.html(this.template(this.model.toJSON()));
      return this;
    },

    updateUser: function (e) {
      e.preventDefault();
      var self = this;
      var username = $(e.target).find('input').val();

      $.ajax({
        method: 'PUT',
        url: '/api/users/' + self.model.get('id') + '.json',
        data: {
          users: { username: username },
        },
      }).done(function () {
        self.model.set({ username: username });
      });
    },
  });

  var UsersList = Backbone.View.extend({
    initialize: function () {
      this.children = [];
      this.listenTo(this.collection, 'sync add remove', this.render);
    },

    render: function () {
      this.removeChildren();

      var html = _.map(this.collection.models, function (model) {
        return new UserView({
          model: model,
        }).render().el;
      }, this);

      this.$el.html(html);

      return this;
    },

    removeChildren: function () {
      this.children.forEach(function (view) {
        view.remove();
      });
    },

    remove: function () {
      this.removeChildren();
      Backbone.View.prototype.remove.apply(this, arguments);
    },
  });

  var users = new UserCollection();

  new UsersList({
    el: '.list-of-users',
    collection: users,
  });

  users.fetch();

  $('.new-user-form').on('submit', function (e) {
    e.preventDefault();
    $.ajax({
      url: '/api/users',
      method: 'POST',
      data: {
        users: {
          username: $(e.target).find('input').val(),
        },
      },
    }).done(users.add.bind(users));
  });
});

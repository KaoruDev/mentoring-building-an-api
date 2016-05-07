(function () {
  var $ = window.$;
  var _ = window._;
  var m = window.m;
  var store = window.Users.store;
  var actions = window.Users.actions;

  var Users = function (getState) {
    this.store = getState;
  };

  Users.prototype.createNew = function (e) {
    e.preventDefault();
    var username = $(e.currentTarget).find('input').val();
    m.startComputation();

    $.ajax({
      method: 'POST',
      url: '/api/users.json',
      data: {
        users: {
          username: username,
        },
      },
    }).done(function (response) {
      store.dispatch(window.Users.actions.create(response.user));
    }).always(m.endComputation);
  };

  var User = function (user, getState) {
    this.userId = user.id;
    this.getState = getState;
  };

  User.prototype.toggleEdit = function (e) {
    e.preventDefault();
    m.startComputation();
    store.dispatch(actions.update({ id: this.userId, editing: !this.myUser().editing }));
    m.endComputation();
  };

  User.prototype.updateUser = function (e) {
    e.preventDefault();
    var user = this.myUser();
    var username = $(e.currentTarget).find('input').val();
    m.startComputation();

    $.ajax({
      url: '/api/users/' + user.id + '.json',
      method: 'PUT',
      data: {
        users: {
          username: username,
        },
      },
    }).done(function (response) {
      store.dispatch(actions.update(_.extend({ editing: false }, response.user)));
    }).always(m.endComputation);
  };

  User.prototype.removeUser = function () {
    $.ajax({
      url: '/api/users/' + this.userId + '.json',
      method: 'DELETE',
    }).done(function () {
      store.dispatch(actions.remove(this.userId));
    }.bind(this)).always(m.endComputation);
  };

  User.prototype.myUser = function () {
    return _.find(this.getState().users, function (user) {
      return user.id === this.userId;
    }, this) || {};
  };

  window.Users.Vms = {
    Users: Users,
    User: User,
  };
})();

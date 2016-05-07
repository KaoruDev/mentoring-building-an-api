(function () {
  var _ = window._;
  var m = window.m;
  var NewUser = function () {};

  NewUser.prototype.controller = function (getState) {
    return new window.Users.Vms.Users(getState);
  };

  NewUser.prototype.view = function (vm) {
    return m('form', { action: '#', onsubmit: vm.createNew.bind(vm) }, [
      m('h2', 'New user'),
      m('label', [
        'Username: ',
        m('input', { name: 'users[username]' }),
        m('button', { type: 'submit' }, 'submit'),
      ]),
    ]);
  };

  var User = {
    controller: function (user, getState) {
      return new window.Users.Vms.User(user, getState);
    },

    view: function (vm, user) {
      if (vm.myUser().editing) {
        return m('form', { onsubmit: vm.updateUser.bind(vm) },
          m('input', { value: user.username }),
          m('button', 'submit'),
          m('span', { style: 'margin-left: 5px;' },
            m('a', { href: '#', onclick: vm.toggleEdit.bind(vm) }, 'cancel')
          ),
          m('span', { style: 'margin-left: 5px;' },
            m('a', { href: '#', onclick: vm.removeUser.bind(vm) }, 'delete')
          )
        );
      } else {
        return m('div', user.username,
          m('span', { style: 'margin-left: 5px;' },
            m('a', { href: '#', onclick: vm.toggleEdit.bind(vm) }, 'edit')
          ),
          m('span', { style: 'margin-left: 5px;' },
            m('a', { href: '#', onclick: vm.removeUser.bind(vm) }, 'delete')
          )
        );
      }
    },
  };

  var ListOfUsers = function () {};

  ListOfUsers.prototype.controller = function (getState) {
    return getState;
  };

  ListOfUsers.prototype.view = function (getState) {
    return m('div', [
      _.map(getState().users, function (user) {
        return m.component(User, user, getState);
      }),
    ]);
  };

  var Users = {
    controller: function (getState) {
      return getState;
    },

    view: function (getState) {
      return m('.users-app', [
        m.component(new NewUser(), getState),
        m.component(new ListOfUsers(), getState),
      ]);
    },
  };

  window.Users.Components = {
    Users: Users,
  };
})();

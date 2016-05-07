(function () {
  var _ = window._;
  var Redux = window.Redux;

  var users = function (store, action) {
    if (typeof store === 'undefined') {
      store = [];
    }

    switch (action.type) {
      case window.Users.actionsMap.create:
        return create(store, action);
      case window.Users.actionsMap.hydrate:
        return hydrate(action);
      case window.Users.actionsMap.remove:
        return remove(store, action);
      case window.Users.actionsMap.update:
        return update(store, action);
      default:
        return store;
    }
  };

  window.Users.createReducers = function () {
    return Redux.combineReducers({ users: users });
  };

  // private ==============================

  function create(store, action) {
    var dup = store.slice();
    dup.push(_.extend({}, action.payload));
    return dup;
  }

  function hydrate(action) {
    return _.map(action.payload, function (user) {
      return user;
    });
  }

  function remove(store, action) {
    return _.reject(store, function (user) {
      return user.id === action.payload.id;
    });
  }

  function update(store, action) {
    return _.map(store, function (user) {
      if (user.id === action.payload.id) {
        return _.extend({}, user, action.payload);
      }

      return user;
    });
  }

})();

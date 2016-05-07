(function () {
  var map = {
    create: 'CREATE',
    update: 'UPDATE',
    remove: 'REMOVE',
    hydrate: 'HYDRATE',
  };

  window.Users.actionsMap = map;

  window.Users.actions = {
    create: function (user) {
      return {
        type: map.create,
        payload: user,
      };
    },

    hydrate: function (users) {
      return {
        type: map.hydrate,
        payload: users,
      };
    },

    remove: function (id) {
      return {
        type: map.remove,
        payload: {
          id: id,
        },
      };
    },

    update: function (user) {
      return {
        type: map.update,
        payload: user,
      };
    },

  };
})();

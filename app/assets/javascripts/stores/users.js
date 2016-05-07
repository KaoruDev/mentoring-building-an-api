//= require stores/actions/users
//= require stores/reducers/users

(function () {
  var $ = window.$;
  var m = window.m;
  var reducers = window.Users.createReducers();
  var store = window.Redux.createStore(reducers);

  $.ajax({
    url: '/api/users.json',
  }).done(function (response) {
    store.dispatch(window.Users.actions.hydrate(response.users));
    m.redraw.strategy('diff');
    m.redraw(true);
  });

  window.Users.store = store;
})();

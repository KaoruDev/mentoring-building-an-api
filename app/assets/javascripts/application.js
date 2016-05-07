//= require jquery
//= require jquery_ujs
//= require users

var $ = window.$;
var m = window.m;

$(function () {
  m.mount(document.getElementsByClassName('users-app')[0],
    m.component(window.Users.Components.Users, window.Users.store.getState));
});

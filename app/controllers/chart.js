/* global moment:true */
import Ember from "ember";

export default Ember.Controller.extend({
  queryParams: ["todayString"],
  todayString: null,

  actions: {
    previousWeek: function() {
      this.changeToday(moment(this.get("today")).subtract(1, "weeks"));
    },
    nextWeek: function() {
      this.changeToday(moment(this.get("today")).add(1, "weeks"));
    },
  },

  changeToday: function(moment) {
    this.set("todayString", moment.format("YYYY-MM-DD"));
  },

  today: function() {
    var todayString = this.get("todayString");

    return todayString === null ? moment() : moment(todayString);
  }.property("todayString"),

  formattedToday: function() {
    return this.get("today").format("LL");
  }.property("today"),
});

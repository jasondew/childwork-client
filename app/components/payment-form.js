import Ember from 'ember';

export default Ember.Component.extend({
  actions: {
    pay: function() {
      this.get("store").createRecord("payment", {
        week: this.get("week"),
        year: this.get("year"),
        amount: this.get("amount")
      }).save().then(function() {
        console.log("PAID!");
      });
    },
  },

  week: function() {
    return this.get("today").week();
  }.property("today"),

  year: function() {
    return this.get("today").year();
  }.property("today"),

  paid: function() {
    var payments = this.get("payments"),
        week = this.get("week"),
        year = this.get("year");

    return payments.any(function(payment) {
      return (payment.get("week") === week) && (payment.get("year") === year);
    });
  }.property("today", "payments"),
});

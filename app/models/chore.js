import DS from 'ember-data';

export default DS.Model.extend({
  completedChores: DS.hasMany("completed-chore"),

  name: DS.attr("string"),
  rate: DS.attr("number"),
  notes: DS.attr("string"),
  repeating: DS.attr("boolean"),

  choreDay: function(date) {
    return this.store.createRecord("choreDay", {
      chore: this,
      date: date,
      complete: this.completedOn(date)
    });
  },

  completedOn: function(date) {
    return this.get("completedDates").indexOf(date.format("YYYY-MM-DD")) !== -1;
  },

  completedDates: function() {
    return this.get("completedChores")
               .filter(function(completedChore) {
                 return completedChore.get("completed_on") !== null;
               }).map(function(completedChore) {
                 return completedChore.get("completed_on").format("YYYY-MM-DD");
               });
  }.property("completedChores.@each"),
});

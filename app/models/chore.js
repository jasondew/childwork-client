import DS from 'ember-data';

export default DS.Model.extend({
  completedChores: DS.hasMany("completed-chore"),
  name: DS.attr("string"),
  rate: DS.attr("number"),
  notes: DS.attr("string"),
});

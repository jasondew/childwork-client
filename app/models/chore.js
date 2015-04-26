import DS from 'ember-data';

export default DS.Model.extend({
  name: DS.attr("string"),
  rate: DS.attr("string"),
  notes: DS.attr("string"),
  completedChores: DS.hasMany("completed-chore"),
});
